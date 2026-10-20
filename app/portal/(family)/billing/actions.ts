"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { requireFamily } from "../../../lib/portal/dal";
import { findCustomerId } from "../../../lib/portal/billing";
import { getStripe } from "../../../lib/stripe";
import { getSetting } from "../../../lib/settings";

// Opens Stripe's customer portal, where the family can update their card, change or cancel a plan.
export async function openBillingPortal() {
  const { family } = await requireFamily();
  const stripe = getStripe();
  const customerId = await findCustomerId(family);
  if (!stripe || !customerId) redirect("/portal/billing?error=no-account");

  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host")}`;
  let url: string;
  try {
    // Uses the portal settings created by scripts/stripe-setup.mjs (cancel at period end, invoices, card updates).
    const configuration = (await getSetting("stripe_portal_config")) ?? undefined;
    const session = await stripe.billingPortal.sessions.create({ customer: customerId, configuration, return_url: `${origin}/portal/billing` });
    url = session.url;
  } catch (error) {
    console.error("Billing portal failed", error);
    redirect("/portal/billing?error=portal");
  }
  redirect(url);
}
