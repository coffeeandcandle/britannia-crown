import Link from "next/link";
import { requireFamily } from "../../../lib/portal/dal";
import { findCustomerId, billingSummary, type BillingSummary } from "../../../lib/portal/billing";
import { paymentsEnabled } from "../../../lib/stripe";
import { formatDate } from "../../../lib/portal/time";
import { Flash } from "../../components";
import { openBillingPortal } from "./actions";

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
      <h1 className="pt-title">Billing</h1>
      <Flash error={error ? errors[error] ?? undefined : loadFailed ? errors.portal : undefined} />

      {!summary ? (
        <section className="pt-card">
          <h2>No online payments yet</h2>
          <p className="pt-small">
            Memberships and packages bought on our website appear here, with invoices and a way to manage your plan.
          </p>
          <div className="pt-actions">
            <Link href="/membership" className="btn-primary">See membership options</Link>
          </div>
        </section>
      ) : (
        <>
          <section className="pt-card">
            <div className="pt-card-head">
              <h2>Your plan</h2>
              <form action={openBillingPortal}>
                <button type="submit" className="btn-secondary">Manage payment and plan</button>
              </form>
            </div>
            {summary.subscriptions.length === 0 ? (
              <div className="pt-empty">No active subscriptions. One-off purchases are listed under invoices.</div>
            ) : (
              <ul className="pt-list pt-subs">
                {summary.subscriptions.map((s) => (
                  <li key={s.id}>
                    <strong>{s.name}</strong>
                    <span>
                      {s.amount}
                      {s.renews && s.status !== "canceled" && ` · ${s.cancelsAtPeriodEnd ? "ends" : "renews"} ${formatDate(s.renews, family.timezone)}`}
                    </span>
                    <span className={`pt-status is-${s.status === "active" || s.status === "trialing" ? "scheduled" : "cancelled"}`}>
                      {statusText[s.status] ?? s.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <p className="pt-small">Update your card, download receipts, or change or cancel your membership through Stripe&apos;s secure billing page.</p>
          </section>

          <section className="pt-card">
            <h2>Invoices and receipts</h2>
            {summary.invoices.length === 0 ? (
              <div className="pt-empty">No invoices yet.</div>
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
          </section>
        </>
      )}
    </>
  );
}
