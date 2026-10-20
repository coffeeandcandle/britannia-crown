import type Stripe from "stripe";
import { getStripe } from "../../../lib/stripe";
import { getProduct, formatPrice } from "../../../lib/products";
import { FORMSPREE_ENQUIRY } from "../../../lib/site";
import { query } from "../../../lib/portal/db";

// Stripe calls this endpoint after payments and subscription changes. Each event is
// verified with STRIPE_WEBHOOK_SECRET, then the team is emailed via the enquiry form inbox
// so a new order is followed up the same way as any other lead.
export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
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
      case "checkout.session.completed": {
        const s = event.data.object;
        const product = getProduct(s.metadata?.product_id ?? "");
        const child = s.custom_fields?.find((f) => f.key === "child")?.text?.value ?? "";
        await notifyTeam(`New online order: ${product?.name ?? "Unknown product"}`, {
          product: product?.name ?? s.metadata?.product_id ?? "",
          amount: product ? `${formatPrice(product)} ${product.unit}` : "",
          payment_status: s.payment_status,
          name: s.customer_details?.name ?? "",
          email: s.customer_details?.email ?? "",
          phone: s.customer_details?.phone ?? "",
          child,
          stripe_session: s.id,
          ...pick(s.metadata, ["landing_page", "referrer", "utm_source", "utm_medium", "utm_campaign", "page"]),
        });
        await linkCustomerToFamily(s);
        break;
      }
      case "invoice.payment_failed": {
        const inv = event.data.object;
        await notifyTeam("Subscription payment failed", {
          email: inv.customer_email ?? "",
          name: inv.customer_name ?? "",
          invoice: inv.id ?? "",
        });
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object;
        await notifyTeam("Subscription cancelled", {
          product_id: sub.metadata?.product_id ?? "",
          subscription: sub.id,
        });
        break;
      }
    }
  } catch (error) {
    // Ask Stripe to retry later rather than lose the notification.
    console.error("Stripe webhook handling failed", error);
    return new Response("Handler error", { status: 500 });
  }

  return Response.json({ received: true });
}

async function notifyTeam(subject: string, fields: Record<string, string>) {
  const res = await fetch(FORMSPREE_ENQUIRY, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ _subject: `${subject} | Britannia Crown`, source: "stripe", ...fields }),
  });
  if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
}

// If the buyer already has a portal account, remember their Stripe customer for the billing page.
async function linkCustomerToFamily(s: Stripe.Checkout.Session) {
  const customer = typeof s.customer === "string" ? s.customer : s.customer?.id;
  const email = s.customer_details?.email?.toLowerCase();
  if (!process.env.DATABASE_URL || !customer || !email) return;
  try {
    await query("UPDATE families SET stripe_customer_id = $1 WHERE lower(email) = $2 AND stripe_customer_id IS NULL", [customer, email]);
  } catch (error) {
    // The order email has already gone; a missing link is found again from the email on the billing page.
    console.error("Linking Stripe customer to family failed", error);
  }
}

function pick(obj: Record<string, string> | null | undefined, keys: string[]) {
  const out: Record<string, string> = {};
  for (const k of keys) if (obj?.[k]) out[k] = obj[k];
  return out;
}
