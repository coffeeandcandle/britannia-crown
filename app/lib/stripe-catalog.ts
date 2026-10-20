import "server-only";
import type Stripe from "stripe";
import type { Product } from "./products";

// Keeps a real Product and Price in Stripe for each item in products.ts, so the Stripe
// dashboard, receipts and reports show one clear entry per service. products.ts stays the
// source of truth: the price's lookup key includes the amount, so editing a price there
// creates a new Stripe price on the next checkout and the old one simply stops being used.
const cache = new Map<string, string>();

export async function priceIdFor(stripe: Stripe, product: Product) {
  const interval = product.mode === "subscription" ? "month" : "once";
  const lookupKey = `bc_${product.id}_${product.currency}_${Math.round(product.amount * 100)}_${interval}`;
  const cached = cache.get(lookupKey);
  if (cached) return cached;

  const found = await stripe.prices.list({ lookup_keys: [lookupKey], active: true, limit: 1 });
  if (found.data[0]) {
    cache.set(lookupKey, found.data[0].id);
    return found.data[0].id;
  }

  const productId = await ensureProduct(stripe, product);
  const price = await stripe.prices.create({
    product: productId,
    currency: product.currency,
    unit_amount: Math.round(product.amount * 100),
    lookup_key: lookupKey,
    transfer_lookup_key: true,
    ...(product.mode === "subscription" ? { recurring: { interval: "month" as const } } : {}),
    metadata: { product_id: product.id },
  });
  await stripe.products.update(productId, { default_price: price.id });
  cache.set(lookupKey, price.id);
  return price.id;
}

async function ensureProduct(stripe: Stripe, product: Product) {
  const id = `bc_${product.id}`;
  const details = { name: product.name, description: product.description, metadata: { product_id: product.id } };
  try {
    await stripe.products.update(id, { ...details, active: true });
  } catch (error) {
    if ((error as Stripe.errors.StripeError).code !== "resource_missing") throw error;
    await stripe.products.create({ id, ...details });
  }
  return id;
}
