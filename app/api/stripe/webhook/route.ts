import type Stripe from "stripe";
import { getStripe } from "../../../lib/stripe";
import { getProduct, formatPrice } from "../../../lib/products";
import { FORMSPREE_ENQUIRY } from "../../../lib/site";

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

function pick(obj: Record<string, string> | null | undefined, keys: string[]) {
  const out: Record<string, string> = {};
  for (const k of keys) if (obj?.[k]) out[k] = obj[k];
  return out;
}
