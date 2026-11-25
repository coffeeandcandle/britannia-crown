// Connects Stripe to the site so nobody has to click through the Stripe dashboard:
// creates the webhook that sends order notifications here, and the billing portal
// families use to update their card or cancel. Stripe only reveals a webhook's signing
// secret once, so it is stored in the app_settings table for the webhook route to read.
//
// Runs before every production build (a no-op once set up). It re-creates the webhook if
// the site's address changes or the Stripe key switches from test to live. It never fails
// the build: payments simply stay unconfirmed until the next deploy.
// Run by hand with: DATABASE_URL=... STRIPE_SECRET_KEY=... STRIPE_SITE_URL=https://... node scripts/stripe-setup.mjs --force
import pg from "pg";
import Stripe from "stripe";

// The Academic Partner member discount on the Advocacy Plan. Keep these in step with
// MEMBER_DISCOUNT_PERCENT in app/lib/membership.ts and the advocacy products in app/lib/products.ts.
// Makes sure the current coupon exists (limited to the Advocacy products), moves any subscription
// still on an older rate onto it, and deletes the older coupons so they can't be used again.
const MEMBER_DISCOUNT_PERCENT = 10;
const ADVOCACY_PRODUCTS = {
  "bc_advocacy-essential": "Advocacy Plan: Essential",
  "bc_advocacy-standard": "Advocacy Plan: Standard",
  "bc_advocacy-priority": "Advocacy Plan: Priority",
};

const EVENTS = [
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "checkout.session.async_payment_failed",
  "invoice.payment_failed",
  "customer.subscription.deleted",
];

const key = process.env.STRIPE_SECRET_KEY;
const url = process.env.DATABASE_URL;
const force = process.argv.includes("--force");
const host = process.env.STRIPE_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);

if (!key || !url || !host) {
  console.log("Stripe setup skipped: needs STRIPE_SECRET_KEY, DATABASE_URL and the site address.");
  process.exit(0);
}
if (!force && process.env.VERCEL_ENV !== "production") {
  console.log("Stripe setup skipped: only runs for production deploys.");
  process.exit(0);
}

const origin = host.replace(/\/$/, "");
const mode = /^(sk|rk)_live/.test(key) ? "live" : "test";
const stripe = new Stripe(key);
const local = /localhost|127\.0\.0\.1|\/var\/run/.test(url);
const db = new pg.Client({ connectionString: url, ssl: local ? false : { rejectUnauthorized: true } });

try {
  await db.connect();
  const settings = Object.fromEntries((await db.query("SELECT key, value FROM app_settings WHERE key LIKE 'stripe_%'")).rows.map((r) => [r.key, r.value]));
  const save = (k, v) =>
    db.query("INSERT INTO app_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = now()", [k, v]);

  await setupWebhook(settings, save);
  await setupBillingPortal(settings, save);
  await setupMemberDiscount();
} catch (error) {
  console.warn("Stripe setup did not finish; it will try again on the next deploy.", error.message ?? error);
} finally {
  await db.end().catch(() => {});
}

async function setupWebhook(settings, save) {
  const target = `${origin}/api/stripe/webhook`;
  if (settings.stripe_webhook_id && settings.stripe_webhook_url === target && settings.stripe_mode === mode) {
    const existing = await stripe.webhookEndpoints.retrieve(settings.stripe_webhook_id).catch(() => null);
    if (existing && existing.status === "enabled" && EVENTS.every((e) => existing.enabled_events.includes(e))) {
      console.log(`Stripe webhook ready (${mode}): ${target}`);
      return;
    }
  }

  // Replace any earlier endpoint for this site, so Stripe never sends events twice.
  const all = await stripe.webhookEndpoints.list({ limit: 100 });
  for (const ep of all.data) {
    if (ep.id === settings.stripe_webhook_id || ep.url === target) await stripe.webhookEndpoints.del(ep.id);
  }

  const created = await stripe.webhookEndpoints.create({
    url: target,
    enabled_events: EVENTS,
    api_version: Stripe.API_VERSION,
    description: "Britannia Crown website: order notifications",
  });
  await save("stripe_webhook_secret", created.secret);
  await save("stripe_webhook_id", created.id);
  await save("stripe_webhook_url", target);
  await save("stripe_mode", mode);
  console.log(`Stripe webhook created (${mode}): ${target}`);
}

async function setupBillingPortal(settings, save) {
  const params = {
    business_profile: {
      headline: "Britannia Crown: manage your payments and plan",
      privacy_policy_url: `${origin}/privacy-policy`,
      terms_of_service_url: `${origin}/terms-and-conditions`,
    },
    default_return_url: `${origin}/portal/billing`,
    features: {
      customer_update: { enabled: true, allowed_updates: ["name", "email", "address", "phone"] },
      invoice_history: { enabled: true },
      payment_method_update: { enabled: true },
      subscription_cancel: {
        enabled: true,
        mode: "at_period_end",
        cancellation_reason: { enabled: true, options: ["too_expensive", "unused", "switched_service", "other"] },
      },
    },
  };

  const existing = settings.stripe_portal_config && settings.stripe_mode === mode
    ? await stripe.billingPortal.configurations.retrieve(settings.stripe_portal_config).catch(() => null)
    : null;
  if (existing) {
    await stripe.billingPortal.configurations.update(existing.id, params);
    console.log("Stripe billing portal updated.");
    return;
  }
  const created = await stripe.billingPortal.configurations.create(params);
  await save("stripe_portal_config", created.id);
  console.log("Stripe billing portal created.");
}

async function setupMemberDiscount() {
  const couponId = `bc_member_advocacy_${MEMBER_DISCOUNT_PERCENT}`;
  for (const [id, name] of Object.entries(ADVOCACY_PRODUCTS)) {
    const exists = await stripe.products.retrieve(id).catch(() => null);
    if (!exists) await stripe.products.create({ id, name });
  }
  const coupon = await stripe.coupons.retrieve(couponId).catch(() => null);
  if (!coupon) {
    await stripe.coupons.create({
      id: couponId,
      percent_off: MEMBER_DISCOUNT_PERCENT,
      duration: "forever",
      name: `Academic Partner member: ${MEMBER_DISCOUNT_PERCENT}% off Advocacy`,
      applies_to: { products: Object.keys(ADVOCACY_PRODUCTS) },
    });
    console.log(`Member discount coupon created: ${couponId} (${MEMBER_DISCOUNT_PERCENT}% off Advocacy)`);
  } else {
    console.log(`Member discount coupon ready: ${couponId} (${coupon.percent_off}% off)`);
  }

  // Move subscriptions still on an older member coupon to the current one.
  const isOld = (id) => typeof id === "string" && id.startsWith("bc_member_advocacy_") && id !== couponId;
  let moved = 0;
  for await (const sub of stripe.subscriptions.list({ status: "all", limit: 100, expand: ["data.discounts"] })) {
    if (["canceled", "incomplete_expired"].includes(sub.status)) continue;
    const discounts = (sub.discounts ?? []).filter((d) => typeof d !== "string");
    const couponOf = (d) => (typeof d.source?.coupon === "string" ? d.source.coupon : d.source?.coupon?.id);
    if (!discounts.some((d) => isOld(couponOf(d)))) continue;
    const keep = discounts.filter((d) => !isOld(couponOf(d)) && couponOf(d) !== couponId).map((d) => ({ discount: d.id }));
    await stripe.subscriptions.update(sub.id, { discounts: [...keep, { coupon: couponId }] });
    moved++;
  }
  console.log(`Subscriptions moved to the ${MEMBER_DISCOUNT_PERCENT}% member discount: ${moved}`);

  // Delete older member coupons so they can't be applied again.
  for await (const c of stripe.coupons.list({ limit: 100 })) {
    if (isOld(c.id)) {
      await stripe.coupons.del(c.id);
      console.log(`Old member coupon deleted: ${c.id} (${c.percent_off}% off)`);
    }
  }
}
