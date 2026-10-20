import Link from "next/link";
import { requireStaff, listOrders, type OrderRow } from "../../../lib/portal/dal";
import { formatDate } from "../../../lib/portal/time";
import { PageHeader, Card, EmptyState, Avatar, Pill, HelpBox } from "../../ui";

const statusPill: Record<OrderRow["status"], React.ReactNode> = {
  paid: <Pill tone="good">Paid</Pill>,
  payment_failed: <Pill tone="warn">Payment failed</Pill>,
  cancelled: <Pill tone="muted">Cancelled</Pill>,
};

function amount(o: OrderRow) {
  if (o.amount_pence == null) return "";
  const value = new Intl.NumberFormat("en-GB", { style: "currency", currency: o.currency.toUpperCase() }).format(o.amount_pence / 100);
  return o.recurring ? `${value} a month` : value;
}

export default async function OrdersPage() {
  await requireStaff(["admin"]);
  const orders = await listOrders();
  const stripeBase = /^(sk|rk)_live/.test(process.env.STRIPE_SECRET_KEY ?? "") ? "https://dashboard.stripe.com" : "https://dashboard.stripe.com/test";

  return (
    <>
      <PageHeader
        title="Orders"
        description="Everything bought online through the Prices page, newest first. Contact new customers within one working day."
      />
      <div className="pt-grid">
        <div className="pt-main">
          <Card>
            {orders.length === 0 ? (
              <EmptyState icon="🧾" title="No orders yet">
                When a family pays online, the order appears here straight away.
              </EmptyState>
            ) : (
              <ul className="ui-rows">
                {orders.map((o) => (
                  <li key={o.id}>
                    <div className="ui-row-link">
                      <Avatar name={o.customer_name ?? o.customer_email ?? "?"} />
                      <span className="ui-row-main">
                        <strong>{o.product_name}</strong>
                        <span>
                          {o.customer_name ?? "No name"}
                          {o.customer_email && <> · <a href={`mailto:${o.customer_email}`}>{o.customer_email}</a></>}
                          {o.customer_phone && <> · <a href={`tel:${o.customer_phone}`}>{o.customer_phone}</a></>}
                        </span>
                        {o.child && <span>Child: {o.child}</span>}
                      </span>
                      <span className="ui-row-cell">
                        <span className="ui-row-label">Amount</span>
                        {amount(o)}
                      </span>
                      <span className="ui-row-cell ui-hide-sm">
                        <span className="ui-row-label">Date</span>
                        {formatDate(new Date(o.created_at), "Europe/London")}
                      </span>
                      <span className="ui-row-cell ui-hide-sm">
                        <span className="ui-row-label">Family</span>
                        {o.family_id ? <Link href={`/portal/admin/families/${o.family_id}`}>{o.family_name}</Link> : "Not in portal yet"}
                      </span>
                      {statusPill[o.status]}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
        <aside className="pt-side">
          <HelpBox title="After someone buys">
            <ol>
              <li>Email or call them to welcome them and arrange the first step.</li>
              <li>If they&apos;ll have lessons, add them under <Link href="/portal/admin/families">Families</Link> with the same email, so the order links to their account.</li>
              <li>Refunds, receipts and card details are handled in <a href={`${stripeBase}/payments`} target="_blank" rel="noreferrer">Stripe</a>.</li>
            </ol>
          </HelpBox>
        </aside>
      </div>
    </>
  );
}
