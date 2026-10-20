import Link from "next/link";
import { requireFamily, familyOrders } from "../../../lib/portal/dal";
import { findCustomerId, billingSummary, type BillingSummary } from "../../../lib/portal/billing";
import { paymentsEnabled } from "../../../lib/stripe";
import { formatDate } from "../../../lib/portal/time";
import { Flash } from "../../components";
import { PageHeader, Card, EmptyState, Pill } from "../../ui";
import { SubmitButton } from "../../client-ui";
import { openBillingPortal } from "./actions";
import Purchases from "../Purchases";

const statusText: Record<string, string> = {
  active: "Active",
  trialing: "Trial",
  past_due: "Payment due",
  unpaid: "Unpaid",
  canceled: "Cancelled",
  paused: "Paused",
  incomplete: "Incomplete",
};

const errors: Record<string, string> = {
  "no-account": "We couldn't find any online payments for your email address. If you pay another way, ask your consultant.",
  portal: "Sorry, billing couldn't be opened just now. Please try again in a moment.",
};

export default async function BillingPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { family } = await requireFamily();
  const { error } = await searchParams;
  const orders = await familyOrders(family);

  let summary: BillingSummary | null = null;
  let loadFailed = false;
  if (paymentsEnabled) {
    try {
      const customerId = await findCustomerId(family);
      if (customerId) summary = await billingSummary(customerId);
    } catch (e) {
      console.error("Billing summary failed", e);
      loadFailed = true;
    }
  }

  return (
    <>
      <PageHeader
        title="Purchases and billing"
        description={<>What you&apos;ve bought, your plan, payments and receipts. Changes to your card or plan are made securely through Stripe. See our <Link href="/refunds-and-cancellations">refunds and cancellations policy</Link>.</>}
      />
      <Flash error={error ? errors[error] ?? undefined : loadFailed ? errors.portal : undefined} />

      {orders.length > 0 && (
        <Card title="Your purchases" description="Everything you've bought from us online.">
          <Purchases orders={orders} tz={family.timezone} />
        </Card>
      )}

      {!summary ? (
        orders.length > 0 ? null : <Card>
          <EmptyState
            title="No online payments yet"
            action={<Link href="/membership" className="btn-primary">See membership options</Link>}
          >
            Memberships and packages bought on our website appear here, with receipts and a way to manage your plan.
            If you pay another way, your consultant can help with billing questions.
          </EmptyState>
        </Card>
      ) : (
        <>
          <Card
            title="Your plan"
            description="Update your card, change or cancel your membership, and download receipts."
            action={
              <form action={openBillingPortal}>
                <SubmitButton className="btn-primary" pendingText="Opening…">Manage payment and plan</SubmitButton>
              </form>
            }
          >
            {summary.subscriptions.length === 0 ? (
              <EmptyState title="No active subscription">One-off purchases are listed under receipts below.</EmptyState>
            ) : (
              <ul className="pt-list pt-subs">
                {summary.subscriptions.map((s) => (
                  <li key={s.id}>
                    <strong>{s.name}</strong>
                    <span>
                      {s.amount}
                      {s.renews && s.status !== "canceled" && ` · ${s.cancelsAtPeriodEnd ? "ends" : "renews"} ${formatDate(s.renews, family.timezone)}`}
                    </span>
                    <Pill tone={s.status === "active" || s.status === "trialing" ? "good" : s.status === "past_due" || s.status === "unpaid" ? "warn" : "muted"}>
                      {statusText[s.status] ?? s.status}
                    </Pill>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card title="Receipts and invoices">
            {summary.invoices.length === 0 ? (
              <EmptyState title="No receipts yet" />
            ) : (
              <table className="pt-table">
                <thead>
                  <tr><th scope="col">Date</th><th scope="col">Invoice</th><th scope="col">Amount</th><th scope="col">Status</th><th scope="col"><span className="sr-only">Link</span></th></tr>
                </thead>
                <tbody>
                  {summary.invoices.map((inv) => (
                    <tr key={inv.id}>
                      <td>{formatDate(inv.date, family.timezone)}</td>
                      <td>{inv.number ?? "–"}</td>
                      <td>{inv.amount}</td>
                      <td>{inv.status === "paid" ? "Paid" : inv.status === "open" ? "Due" : inv.status ?? ""}</td>
                      <td>{inv.url && <a href={inv.url} target="_blank" rel="noopener noreferrer">View</a>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </>
      )}
    </>
  );
}
