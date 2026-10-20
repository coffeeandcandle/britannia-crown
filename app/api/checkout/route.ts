import type Stripe from "stripe";
import { getProduct } from "../../lib/products";
import { getStripe } from "../../lib/stripe";
import { priceIdFor } from "../../lib/stripe-catalog";
import { parseOnboarding } from "../../lib/onboarding";
import { recordEvent } from "../../lib/crm";

const ATTRIBUTION_FIELDS = ["landing_page", "referrer", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

// Buy buttons post a plain form here; we create a Stripe Checkout session and redirect to it.
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  const form = await request.formData();
  const product = getProduct(String(form.get("product") ?? ""));
  const returnPath = safePath(String(form.get("return_path") ?? "/"));

  if (!product) return Response.redirect(`${origin}/contact`, 303);
  // Bots fill the hidden field; send them nowhere useful.
  if (form.get("_gotcha")) return Response.redirect(`${origin}${returnPath}`, 303);

  // Nobody reaches payment without giving us their details. The form checks too, but a form can be bypassed.
  const portalForm = String(form.get("return_path") ?? "") === "/portal/shop";
  const detailsUrl = (error: string) =>
    `${origin}${portalForm ? "/portal/checkout" : "/checkout/details"}?${new URLSearchParams({ product: product.id, return_path: returnPath, error })}`;
  const parsed = parseOnboarding(form);
  if ("error" in parsed) return Response.redirect(detailsUrl(parsed.error), 303);
  const o = parsed.data;

  const stripe = getStripe();
  if (!stripe) {
    return Response.redirect(`${origin}/contact?service=${encodeURIComponent(product.service)}`, 303);
  }

  // Save the lead now, so the details are in the CRM even if they never finish paying.
  if (process.env.DATABASE_URL) {
    try {
      await recordEvent({
        name: o.name,
        email: o.email,
        phone: o.phone,
        type: "enquiry",
        summary: `Started checkout: ${product.name}`,
        details: { child: o.childName, year_group: o.yearGroup, help_with: o.focusArea, about: o.focus, best_times: o.times },
        source: String(form.get("utm_source") ?? "") || String(form.get("landing_page") ?? "") || "checkout",
      });
    } catch (error) {
      console.error("Could not save checkout lead", error);
    }
  }

  // Stripe metadata values are capped at 500 characters. The webhook reads these to build the family, child and order.
  const metadata: Record<string, string> = {
    product_id: product.id,
    page: returnPath,
    parent_name: o.name,
    phone: o.phone,
    child_name: o.childName,
    year_group: o.yearGroup,
    help_with: o.focusArea,
    focus: o.focus,
    ...(o.times ? { times: o.times } : {}),
  };
  for (const key of ATTRIBUTION_FIELDS) {
    const value = form.get(key);
    if (typeof value === "string" && value) metadata[key] = value.slice(0, 500);
  }

  // Use the catalogue price in Stripe; if that lookup fails, charge the same amount inline
  // so a Stripe hiccup never blocks a sale.
  let lineItem: Stripe.Checkout.SessionCreateParams.LineItem;
  try {
    lineItem = { quantity: 1, price: await priceIdFor(stripe, product) };
  } catch (error) {
    console.error("Stripe catalogue lookup failed; using inline price", error);
    lineItem = {
      quantity: 1,
      price_data: {
        currency: product.currency,
        unit_amount: Math.round(product.amount * 100),
        product_data: { name: product.name, description: product.description },
        ...(product.mode === "subscription" ? { recurring: { interval: "month" as const } } : {}),
      },
    };
  }

  const params: Stripe.Checkout.SessionCreateParams = {
    mode: product.mode,
    // Labels these sessions in the Stripe dashboard so website sales can be compared with other flows.
    integration_identifier: "bc_website_checkout_qmvtrhzk",
    line_items: [lineItem],
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    customer_email: o.email,
    cancel_url: `${origin}${returnPath}${returnPath.includes("?") ? "&" : "?"}checkout=cancelled`,
    billing_address_collection: "auto",
    allow_promotion_codes: true,
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
