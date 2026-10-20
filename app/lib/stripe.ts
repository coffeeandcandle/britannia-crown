import Stripe from "stripe";

// Online payment switches on when STRIPE_SECRET_KEY is set (in Vercel project settings).
// Without it, buy buttons fall back to the enquiry form, so the site never shows a broken checkout.
export const paymentsEnabled = Boolean(process.env.STRIPE_SECRET_KEY);

let client: Stripe | null = null;

// Created on first use rather than at import, so builds work without the key.
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  client ??= new Stripe(key, { appInfo: { name: "Britannia Crown website" } });
  return client;
}
