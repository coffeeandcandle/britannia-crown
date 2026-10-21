import Link from "next/link";
import { requireFamily } from "../../../lib/portal/dal";
import { unbookedOrders, availableSlots, BOOKABLE } from "../../../lib/portal/booking";
import { tzLabel } from "../../../lib/portal/time";
import { Flash } from "../../components";
import { PageHeader, Card, EmptyState } from "../../ui";
import { bookSession } from "./actions";

export default async function BookPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { family } = await requireFamily();
  const [orders, msg] = await Promise.all([unbookedOrders(family.id), searchParams]);
  const tz = family.timezone;
  const day = (d: Date) => new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: tz }).format(d);
  const time = (d: Date) => new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: tz }).format(d).replace(" ", "").toLowerCase();

  const sections = await Promise.all(
    orders.map(async (o) => {
      const slots = await availableSlots(o.product_id);
      const byDay = new Map<string, Date[]>();
      for (const s of slots) {
        const k = day(s.start);
        byDay.set(k, [...(byDay.get(k) ?? []), s.start]);
      }
      return { order: o, byDay };
    }),
  );

  return (
    <>
      <Flash error={msg.error} />
      <PageHeader
        title="Book your session"
        description={`Choose a time for the session you have paid for. Times are shown in ${tzLabel(tz)}. The earliest times start 48 hours from now, so we can prepare.`}
      />
      {sections.length === 0 ? (
        <Card>
          <EmptyState title="Nothing to book" action={<Link href="/portal/sessions" className="btn-secondary">See your sessions</Link>}>
            Sessions you have paid for appear here until you choose a time. To buy a strategy session or trial lesson, see Plans and services.
          </EmptyState>
        </Card>
      ) : (
        sections.map(({ order, byDay }) => (
          <Card key={order.id} title={BOOKABLE[order.product_id]?.title ?? order.product_name} description={`${BOOKABLE[order.product_id]?.minutes ?? 60} minutes, online in your portal.`}>
            {byDay.size === 0 ? (
              <EmptyState title="No times available right now">
                We are adding more times. Please check again soon, or email your consultant and we will arrange a time with you.
              </EmptyState>
            ) : (
              <div className="bk-days">
                {[...byDay.entries()].map(([label, starts]) => (
                  <section key={label} className="bk-day">
                    <h3>{label}</h3>
                    <div className="bk-times">
                      {starts.map((s) => (
                        <form key={s.getTime()} action={bookSession}>
                          <input type="hidden" name="order_id" value={order.id} />
                          <input type="hidden" name="start" value={s.getTime()} />
                          <button type="submit" className="btn-secondary ui-btn-sm">{time(s)}</button>
                        </form>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </Card>
        ))
      )}
    </>
  );
}
