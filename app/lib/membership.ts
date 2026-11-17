import "server-only";
import type Stripe from "stripe";
import { queryOne } from "./portal/db";
import { products } from "./products";
import { priceIdFor } from "./stripe-catalog";

// Academic Partner members get 15% off the Advocacy Plan, applied automatically at checkout.
export const MEMBER_DISCOUNT_PERCENT = 15;
// v2: limited in Stripe to the Advocacy products, so it can never discount anything else.
const COUPON_ID = "bc_member_advocacy_15_v2";
const advocacyProducts = () => products.filter((p) => p.id.startsWith("advocacy-"));
// The only products the member discount is ever applied to: the Advocacy Plan tiers.
export const memberDiscountApplies = (productId: string) => advocacyProducts().some((p) => p.id === productId);

// True when this email has a paid Academic Partner Membership that has not been cancelled.
// The Stripe webhook marks an order cancelled when its subscription ends.
export async function hasActiveMembership(email: string) {
  if (!process.env.DATABASE_URL || !email) return false;
  try {
    const row = await queryOne<{ ok: boolean }>(
      `SELECT true AS ok FROM orders
        WHERE lower(customer_email) = lower($1) AND product_id LIKE 'membership-%' AND status = 'paid'
        LIMIT 1`,
      [email.trim()],
    );
    return Boolean(row);
  } catch (error) {
    console.error("Membership check failed", error);
    return false;
  }
}

// The Stripe coupon behind the discount, created the first time it is needed.
export async function memberCouponId(stripe: Stripe) {
  try {
    await stripe.coupons.retrieve(COUPON_ID);
  } catch {
    // The products must exist in Stripe before a coupon can be limited to them.
    for (const p of advocacyProducts()) await priceIdFor(stripe, p);
    await stripe.coupons.create({
      id: COUPON_ID,
      percent_off: MEMBER_DISCOUNT_PERCENT,
      duration: "forever",
      name: "Academic Partner member: 15% off Advocacy",
      applies_to: { products: advocacyProducts().map((p) => `bc_${p.id}`) },
    });
  }
  return COUPON_ID;
}

export const discounted = (amount: number) => Math.round(amount * (100 - MEMBER_DISCOUNT_PERCENT)) / 100;
