import type Stripe from "stripe";
import { getProduct } from "../../lib/products";
import { getStripe } from "../../lib/stripe";

const ATTRIBUTION_FIELDS = ["landing_page", "referrer", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

// Buy buttons post a plain form here; we create a Stripe Checkout session and redirect to it.
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  const form = await request.formData();
  const product = getProduct(String(form.get("product") ?? ""));
  const returnPath = safePath(String(form.get("return_path") ?? "/"));

  if (!product) return Response.redirect(`${origin}/contact`, 303);

  const stripe = getStripe();
  if (!stripe) {
    return Response.redirect(`${origin}/contact?service=${encodeURIComponent(product.service)}`, 303);
  }

  // Stripe metadata values are capped at 500 characters.
  const metadata: Record<string, string> = { product_id: product.id, page: returnPath };
  for (const key of ATTRIBUTION_FIELDS) {
    const value = form.get(key);
    if (typeof value === "string" && value) metadata[key] = value.slice(0, 500);
  }

  const params: Stripe.Checkout.SessionCreateParams = {
    mode: product.mode,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: product.currency,
          unit_amount: Math.round(product.amount * 100),
          product_data: { name: product.name, description: product.description },
          ...(product.mode === "subscription" ? { recurring: { interval: "month" as const } } : {}),
        },
      },
    ],
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}${returnPath}${returnPath.includes("?") ? "&" : "?"}checkout=cancelled`,
    billing_address_collection: "auto",
    phone_number_collection: { enabled: true },
    allow_promotion_codes: true,
    custom_fields: [
      {
        key: "child",
        label: { type: "custom", custom: "Child's name and year group" },
        type: "text",
        optional: true,
      },
    ],
    custom_text: {
      submit: {
        message: `An education consultant will contact you within one working day to get started. By paying you agree to our terms and our refunds and cancellations policy (${origin}/refunds-and-cancellations), including your 14-day right to cancel.`,
      },
    },
    metadata,
    ...(product.mode === "payment"
      ? { customer_creation: "always" as const, invoice_creation: { enabled: true }, payment_intent_data: { metadata } }
      : { subscription_data: { metadata } }),
  };

  try {
    const session = await stripe.checkout.sessions.create(params);
    if (!session.url) throw new Error("Checkout session has no URL");
    return Response.redirect(session.url, 303);
  } catch (error) {
    console.error("Stripe checkout failed", error);
    return Response.redirect(`${origin}${returnPath}${returnPath.includes("?") ? "&" : "?"}checkout=error`, 303);
  }
}

// Only allow redirects back to a path on this site.
function safePath(path: string) {
  return path.startsWith("/") && !path.startsWith("//") ? path.split("#")[0] : "/";
}
