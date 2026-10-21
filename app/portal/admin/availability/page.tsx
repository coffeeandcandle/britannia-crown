import { requireStaff, getTeamMember, listStaff } from "../../../lib/portal/dal";
import { query } from "../../../lib/portal/db";
import { WEEKDAYS, minutesToTime } from "../../../lib/portal/booking";
import { Flash } from "../../components";
import { PageHeader, Card, EmptyState, Field } from "../../ui";
import { SubmitButton, ConfirmSubmit } from "../../client-ui";
import { addAvailability, removeAvailability } from "../availability-actions";

type Props = { searchParams: Promise<{ staff?: string; ok?: string; error?: string }> };

// Weekly hours for paid bookings (strategy sessions with consultants and admins, trial lessons with tutors).
export default async function AvailabilityPage({ searchParams }: Props) {
  const { staff } = await requireStaff();
  const sp = await searchParams;
  const requested = Number(sp.staff);
  const targetId = staff.role === "admin" && Number.isInteger(requested) && requested > 0 ? requested : staff.id;
  const person = targetId === staff.id ? staff : await getTeamMember(targetId);
  const [rows, team] = await Promise.all([
    query<{ id: number; weekday: number; start_min: number; end_min: number }>(
      "SELECT id, weekday, start_min, end_min FROM availability WHERE staff_id = $1 ORDER BY weekday, start_min",
      [targetId],
    ),
    staff.role === "admin" ? listStaff() : Promise.resolve([]),
  ]);
  const order = [1, 2, 3, 4, 5, 6, 0];
  const takes = person?.role === "tutor" ? "trial lessons" : "strategy sessions";

  return (
    <>
      <Flash ok={sp.ok} error={sp.error} />
      <PageHeader
        title={targetId === staff.id ? "My availability" : `Availability: ${person?.name ?? ""}`}
        description={`The weekly hours when families can book ${takes} with ${targetId === staff.id ? "you" : "them"}, in UK time. Bookings are never made in the next 48 hours, and never over a lesson already in the calendar.`}
      />
      {staff.role === "admin" && (
        <form method="GET" className="av-switch">
          <label htmlFor="av-staff">Show hours for</label>
          <select id="av-staff" name="staff" defaultValue={targetId}>
            {team.filter((t) => t.active).map((t) => <option key={t.id} value={t.id}>{t.name} ({t.role})</option>)}
          </select>
          <button type="submit" className="btn-secondary ui-btn-sm">Show</button>
        </form>
      )}
      <div className="pt-grid">
        <div className="pt-main">
          <Card title="Weekly hours">
            {rows.length === 0 ? (
              <EmptyState title="No hours set">Families cannot book paid sessions with this person until hours are added.</EmptyState>
            ) : (
              <ul className="ui-rows">
                {order.flatMap((d) => rows.filter((r) => r.weekday === d)).map((r) => (
                  <li key={r.id}>
                    <div className="ui-row-link">
                      <span className="ui-row-main"><strong>{WEEKDAYS[r.weekday]}</strong><span>{minutesToTime(r.start_min)} to {minutesToTime(r.end_min)}</span></span>
                      <form action={removeAvailability}>
                        <input type="hidden" name="id" value={r.id} />
                        <input type="hidden" name="staff_id" value={targetId} />
                        <ConfirmSubmit message="Remove these hours?">Remove</ConfirmSubmit>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
        <aside className="pt-side">
          <Card title="Add hours">
            <form action={addAvailability} className="pt-form">
              <input type="hidden" name="staff_id" value={targetId} />
              <Field label="Day" htmlFor="av-day">
                <select id="av-day" name="weekday" defaultValue="1">
                  {order.map((d) => <option key={d} value={d}>{WEEKDAYS[d]}</option>)}
                </select>
              </Field>
              <Field label="From" htmlFor="av-start"><input id="av-start" name="start" type="time" step={1800} defaultValue="16:00" required /></Field>
              <Field label="Until" htmlFor="av-end"><input id="av-end" name="end" type="time" step={1800} defaultValue="19:00" required /></Field>
              <SubmitButton pendingText="Adding…">Add hours</SubmitButton>
            </form>
          </Card>
        </aside>
      </div>
    </>
  );
}
