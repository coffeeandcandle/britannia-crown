import { formatDate } from "../../lib/portal/time";
import type { OrderRow } from "../../lib/portal/dal";
import { Pill } from "../ui";

const money = (pence: number | null, currency: string) =>
  pence == null ? "" : new Intl.NumberFormat("en-GB", { style: "currency", currency: currency.toUpperCase() }).format(pence / 100);

const status: Record<OrderRow["status"], { label: string; tone: "good" | "warn" | "muted" }> = {
  paid: { label: "Paid", tone: "good" },
  payment_failed: { label: "Payment failed", tone: "warn" },
  cancelled: { label: "Cancelled", tone: "muted" },
};

// The services this family has bought online, read from our own order records so it works even when
// Stripe has nothing to show. Used on the portal overview and the billing page.
export default function Purchases({ orders, tz, limit }: { orders: OrderRow[]; tz: string; limit?: number }) {
  const shown = limit ? orders.slice(0, limit) : orders;
  return (
    <ul className="pt-list pt-purchases">
      {shown.map((o) => (
        <li key={o.id}>
          <strong>{o.product_name}</strong>
          <span>
            {[money(o.amount_pence, o.currency) && `${money(o.amount_pence, o.currency)}${o.recurring ? " a month" : ""}`, formatDate(new Date(o.created_at), tz), o.child && `For ${o.child}`]
              .filter(Boolean)
              .join(" · ")}
          </span>
          <Pill tone={status[o.status].tone}>{status[o.status].label}</Pill>
        </li>
      ))}
    </ul>
  );
}
