import type Stripe from "stripe";
import { getStripe } from "../../../lib/stripe";
import { getProduct } from "../../../lib/products";
import { query, queryOne } from "../../../lib/portal/db";
import { getSetting } from "../../../lib/settings";
import { recordEvent } from "../../../lib/crm";
import { alertTeam } from "../../../lib/email";

const hasDatabase = Boolean(process.env.DATABASE_URL);

// Stripe calls this endpoint after payments and subscription changes. Each event is
// verified with the webhook's signing secret (STRIPE_WEBHOOK_SECRET, or the one saved by
// scripts/stripe-setup.mjs). Orders are saved to the database, where staff see them under
// Orders and on the buyer's CRM contact, and the team is emailed.
export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET ?? (await getSetting("stripe_webhook_secret"));
  if (!stripe || !secret) return new Response("Payments are not configured", { status: 503 });

  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, secret);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      // With delayed payment methods (such as bank debits) a session completes before the
      // money arrives; those orders are recorded when async_payment_succeeded follows.
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const s = event.data.object;
        if (s.payment_status === "unpaid") break;
        const order = describe(s);
        const isNew = await saveOrder(s, order, "paid");
        // Stripe can send the same event more than once; only announce a new order.
        if (isNew) {
          if (hasDatabase && order.email) {
            await recordEvent({
              name: order.name || order.email,
              email: order.email,
              phone: order.phone,
              type: "order",
              summary: `Bought ${order.productName} online (${order.amountLabel})`,
              details: { child: order.child, stripe_session: s.id },
              source: s.metadata?.utm_source ?? s.metadata?.landing_page ?? "online order",
              stage: "client",
            });
          }
          await notifyTeam(`New online order: ${order.productName}`, {
            product: order.productName,
            amount: order.amountLabel,
            name: order.name,
            email: order.email,
            phone: order.phone,
            child: order.child,
            stripe_session: s.id,
            ...pick(s.metadata, ["landing_page", "referrer", "utm_source", "utm_medium", "utm_campaign", "page"]),
          });
        }
        break;
      }
      case "checkout.session.async_payment_failed": {
        const s = event.data.object;
        const order = describe(s);
        await saveOrder(s, order, "payment_failed");
        await notifyTeam("Online payment failed", { product: order.productName, name: order.name, email: order.email, stripe_session: s.id });
        break;
      }
      case "invoice.payment_failed": {
        const inv = event.data.object;
        await notifyTeam("Subscription payment failed", { email: inv.customer_email ?? "", name: inv.customer_name ?? "", invoice: inv.id ?? "" });
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object;
        if (hasDatabase) await query("UPDATE orders SET status = 'cancelled' WHERE stripe_subscription_id = $1", [sub.id]);
        await notifyTeam("Subscription cancelled", { product_id: sub.metadata?.product_id ?? "", subscription: sub.id });
        break;
      }
    }
  } catch (error) {
    // Ask Stripe to retry later rather than lose the order.
    console.error("Stripe webhook handling failed", error);
    return new Response("Handler error", { status: 500 });
  }

  return Response.json({ received: true });
}

type OrderDetails = { productId: string; productName: string; amountLabel: string; name: string; email: string; phone: string; child: string };

function describe(s: Stripe.Checkout.Session): OrderDetails {
  const product = getProduct(s.metadata?.product_id ?? "");
  const amount =
    s.amount_total == null
      ? ""
      : new Intl.NumberFormat("en-GB", { style: "currency", currency: (s.currency ?? "gbp").toUpperCase() }).format(s.amount_total / 100);
  return {
    productId: product?.id ?? s.metadata?.product_id ?? "",
    productName: product?.name ?? s.metadata?.product_id ?? "Online order",
    amountLabel: amount && s.mode === "subscription" ? `${amount} a month` : amount,
    name: s.customer_details?.name ?? "",
    email: s.customer_details?.email ?? "",
    phone: s.customer_details?.phone ?? "",
    child: s.custom_fields?.find((f) => f.key === "child")?.text?.value ?? "",
  };
}

// Records the order (once per checkout session) and links it to a portal family with the
// same email. Returns true when this is the first time we've seen the order.
async function saveOrder(s: Stripe.Checkout.Session, o: OrderDetails, status: "paid" | "payment_failed") {
  if (!hasDatabase) return true;
  const customer = typeof s.customer === "string" ? s.customer : (s.customer?.id ?? null);
  const subscription = typeof s.subscription === "string" ? s.subscription : (s.subscription?.id ?? null);
  const email = o.email.toLowerCase();
  const family = email ? await queryOne<{ id: number }>("SELECT id FROM families WHERE lower(email) = $1", [email]) : null;

  const saved = await queryOne<{ inserted: boolean }>(
    `INSERT INTO orders (stripe_session_id, product_id, product_name, amount_pence, currency, recurring, status,
                         customer_name, customer_email, customer_phone, child, family_id, stripe_customer_id, stripe_subscription_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
     ON CONFLICT (stripe_session_id) DO UPDATE SET status = EXCLUDED.status WHERE orders.status <> EXCLUDED.status
     RETURNING (xmax = 0) AS inserted`,
    [s.id, o.productId || null, o.productName, s.amount_total, s.currency ?? "gbp", s.mode === "subscription", status,
     o.name || null, email || null, o.phone || null, o.child || null, family?.id ?? null, customer, subscription],
  );

  // If the buyer already has a portal account, remember their Stripe customer for the billing page.
  if (family && customer) {
    await query("UPDATE families SET stripe_customer_id = $1 WHERE id = $2 AND stripe_customer_id IS NULL", [customer, family.id]);
  }
  return Boolean(saved?.inserted);
}

// Emails the team. The order is already saved in the portal, so this never fails the webhook.
async function notifyTeam(subject: string, fields: Record<string, string>) {
  await alertTeam(subject, fields, fields.email || undefined);
}

function pick(obj: Record<string, string> | null | undefined, keys: string[]) {
  const out: Record<string, string> = {};
  for (const k of keys) if (obj?.[k]) out[k] = obj[k];
  return out;
}
