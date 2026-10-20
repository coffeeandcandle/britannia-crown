import "server-only";
import type Stripe from "stripe";
import { getStripe } from "../stripe";
import { query } from "./db";
import type { Family } from "./dal";

// Finds the family's Stripe customer: the saved id, or a customer with the family's email
// (saved for next time). Returns null if they've never paid online.
export async function findCustomerId(family: Family) {
  const stripe = getStripe();
  if (!stripe) return null;
  if (family.stripe_customer_id) return family.stripe_customer_id;
  const found = await stripe.customers.list({ email: family.email, limit: 1 });
  const id = found.data[0]?.id ?? null;
  if (id) await query("UPDATE families SET stripe_customer_id = $1 WHERE id = $2", [id, family.id]);
  return id;
}

export type BillingSummary = {
  subscriptions: { id: string; name: string; status: Stripe.Subscription.Status; amount: string; renews: Date | null; cancelsAtPeriodEnd: boolean }[];
  invoices: { id: string; number: string | null; date: Date; amount: string; status: string | null; url: string | null }[];
};

const money = (minor: number, currency: string) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: currency.toUpperCase(), currencyDisplay: "code" }).format(minor / 100);

export async function billingSummary(customerId: string): Promise<BillingSummary> {
  const stripe = getStripe()!;
  const [subs, invoices] = await Promise.all([
    stripe.subscriptions.list({ customer: customerId, status: "all", limit: 10, expand: ["data.items.data.price.product"] }),
    stripe.invoices.list({ customer: customerId, limit: 12 }),
  ]);

  return {
    subscriptions: subs.data
      .filter((s) => s.status !== "incomplete_expired")
      .map((s) => {
        const item = s.items.data[0];
        const product = item?.price.product;
        const name = product && typeof product === "object" && "name" in product ? product.name : "Subscription";
        const end = item?.current_period_end;
        return {
          id: s.id,
          name,
          status: s.status,
          amount: item?.price.unit_amount != null ? `${money(item.price.unit_amount, item.price.currency)} a month` : "",
          renews: end ? new Date(end * 1000) : null,
          cancelsAtPeriodEnd: s.cancel_at_period_end,
        };
      }),
    invoices: invoices.data.map((inv) => ({
      id: inv.id ?? "",
      number: inv.number,
      date: new Date(inv.created * 1000),
      amount: money(inv.amount_paid || inv.amount_due, inv.currency),
      status: inv.status,
      url: inv.hosted_invoice_url ?? null,
    })),
  };
}
