import Link from "next/link";
import { requireFamily } from "../../../lib/portal/dal";
import { unbookedOrders, availableSlots, BOOKABLE } from "../../../lib/portal/booking";
import { tzLabel } from "../../../lib/portal/time";
import { Flash } from "../../components";
import { PageHeader, Card, EmptyState, Field } from "../../ui";
import { bookSession, saveSessionDetails } from "./actions";
import { SubmitButton } from "../../client-ui";
import { YEAR_GROUPS, FOCUS_AREAS } from "../../../lib/onboarding";
import { familyChildren } from "../../../lib/portal/dal";

export default async function BookPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { family } = await requireFamily();
  const [orders, msg, children] = await Promise.all([unbookedOrders(family.id), searchParams, familyChildren(family.id)]);
  const tz = family.timezone;
  const day = (d: Date) => new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: tz }).format(d);
  const time = (d: Date) => new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: tz }).format(d).replace(" ", "").toLowerCase();

  const sections = await Promise.all(
    orders.map(async (o) => {
      const slots = o.has_details ? await availableSlots(o.product_id) : [];
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
            {!order.has_details ? (
              <form action={saveSessionDetails} className="pt-form">
                <input type="hidden" name="order_id" value={order.id} />
                <p className="booking-hint">Thank you for your payment. Tell us a little about your child so your session can focus on what matters, then choose a time.</p>
                <Field label="Your full name" htmlFor={`sd-name-${order.id}`}><input id={`sd-name-${order.id}`} name="parent_name" defaultValue={family.name} autoComplete="name" required /></Field>
                <Field label="Mobile number" htmlFor={`sd-phone-${order.id}`}><input id={`sd-phone-${order.id}`} name="phone" type="tel" defaultValue={family.phone ?? ""} autoComplete="tel" required /></Field>
                <Field label="Child's first name" htmlFor={`sd-child-${order.id}`}><input id={`sd-child-${order.id}`} name="child_name" defaultValue={children[0]?.name ?? ""} required /></Field>
                <Field label="Year group" htmlFor={`sd-year-${order.id}`}>
                  <select id={`sd-year-${order.id}`} name="year_group" defaultValue={children[0]?.year_group ?? ""} required>
                    <option value="">Choose one…</option>
                    {YEAR_GROUPS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </Field>
                <Field label="Main area of help" htmlFor={`sd-area-${order.id}`}>
                  <select id={`sd-area-${order.id}`} name="focus_area" defaultValue="" required>
                    <option value="">Choose one…</option>
                    {FOCUS_AREAS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </Field>
                <Field label="Tell us a little" htmlFor={`sd-focus-${order.id}`}><textarea id={`sd-focus-${order.id}`} name="focus" rows={3} required placeholder="For example: choosing a secondary school, or GCSE maths at grade 4 aiming for 6." /></Field>
                <SubmitButton pendingText="Saving…">Continue and choose a time</SubmitButton>
              </form>
            ) : byDay.size === 0 ? (
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
