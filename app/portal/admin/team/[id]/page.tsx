import Link from "next/link";
import { notFound } from "next/navigation";
import {
  requireStaff, getTeamMember, listStaff, staffCalendar, familiesOfConsultant, familiesOfTutor, unassignedFamilies, unassignedSessions, type SessionRow,
} from "../../../../lib/portal/dal";
import { addDaysKey, dayKeyOf, mondayOfKey, toLocalInput, zonedToUtc, dateTile, sessionWhen } from "../../../../lib/portal/time";
import { Flash } from "../../../components";
import { PageHeader, Card, EmptyState, Avatar, Pill, StatGrid, Stat, Field } from "../../../ui";
import { SubmitButton } from "../../../client-ui";
import { assignFamilyToConsultant, assignSessionToStaff, amendSession } from "../../team-actions";

const TZ = "Europe/London";
const roleName = { admin: "Admin", consultant: "Consultant", tutor: "Tutor" } as const;
const statusPill: Record<SessionRow["status"], React.ReactNode> = {
  scheduled: <Pill tone="brand">Scheduled</Pill>,
  completed: <Pill tone="good">Completed</Pill>,
  cancelled: <Pill tone="muted">Cancelled</Pill>,
};

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ week?: string; ok?: string; error?: string }> };

export default async function TeamProfilePage({ params, searchParams }: Props) {
  await requireStaff(["admin"]);
  const { id: rawId } = await params;
  const sp = await searchParams;
  const id = Number(rawId);
  const person = Number.isInteger(id) ? await getTeamMember(id) : null;
  if (!person) notFound();

  const today = dayKeyOf(new Date(), TZ);
  const weekKey = mondayOfKey(/^\d{4}-\d{2}-\d{2}$/.test(sp.week ?? "") ? sp.week! : today);
  const days = Array.from({ length: 7 }, (_, i) => addDaysKey(weekKey, i));
  const from = zonedToUtc(`${weekKey}T00:00`, TZ)!;
  const to = zonedToUtc(`${addDaysKey(weekKey, 7)}T00:00`, TZ)!;
  const isConsultant = person.role !== "tutor";

  const [week, team, families, freeFamilies, freeSessions] = await Promise.all([
    staffCalendar(person.id, from, to),
    listStaff(),
    isConsultant ? familiesOfConsultant(person.id) : familiesOfTutor(person.id),
    isConsultant ? unassignedFamilies() : Promise.resolve([]),
    unassignedSessions(),
  ]);
  const active = team.filter((s) => s.active);
  const here = `/portal/admin/team/${person.id}${weekKey === mondayOfKey(today) ? "" : `?week=${weekKey}`}`;
  const weekHref = (key: string) => `/portal/admin/team/${person.id}?week=${key}`;
  const listHref = isConsultant ? "/portal/admin/consultants" : "/portal/admin/tutors";
  const rangeLabel = `${new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(`${weekKey}T00:00:00Z`))} to ${new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${days[6]}T00:00:00Z`))}`;

  const byDay = (key: string) => week.filter((s) => dayKeyOf(new Date(s.starts_at), TZ) === key);
  const upcomingCount = week.filter((s) => s.status === "scheduled").length;

  return (
    <>
      <Flash ok={sp.ok} error={sp.error} />
      <PageHeader
        title={person.name}
        description={<>{roleName[person.role]} · {person.email}{!person.active && " · Access is off"}</>}
        actions={<Link href={listHref} className="btn-secondary">← All {isConsultant ? "consultants" : "tutors"}</Link>}
      />

      <StatGrid>
        <Stat label="Lessons this week" value={week.filter((s) => s.status !== "cancelled").length} hint={`${upcomingCount} still to come`} />
        <Stat label={isConsultant ? "Families" : "Families taught"} value={families.length} />
        <Stat label="Waiting for a tutor" value={freeSessions.length} hint="Unassigned lessons across the company" />
      </StatGrid>

      <Card
        title="Calendar"
        description={`${rangeLabel}. Times are UK time. Open “Change” on a lesson to move it, reassign it or cancel it.`}
        action={
          <span className="tp-weeknav">
            <Link href={weekHref(addDaysKey(weekKey, -7))} className="btn-secondary ui-btn-sm">← Previous</Link>
            <Link href={weekHref(mondayOfKey(today))} className="btn-secondary ui-btn-sm">This week</Link>
            <Link href={weekHref(addDaysKey(weekKey, 7))} className="btn-secondary ui-btn-sm">Next →</Link>
          </span>
        }
      >
        <div className="tp-week">
          {days.map((key) => {
            const items = byDay(key);
            const tile = dateTile(new Date(`${key}T12:00:00Z`), "UTC");
            return (
              <section key={key} className={`tp-day${key === today ? " is-today" : ""}`} aria-label={`${tile.weekday} ${tile.day} ${tile.month}`}>
                <h3>{tile.weekday} <span>{tile.day} {tile.month}</span></h3>
                {items.length === 0 ? (
                  <p className="tp-free">Free</p>
                ) : (
                  items.map((s) => {
                    const when = sessionWhen(new Date(s.starts_at), s.minutes, TZ);
                    return (
                      <article key={s.id} className={`tp-slot is-${s.status}`}>
                        <p className="tp-time">{when.time} · {s.minutes} min {statusPill[s.status]}</p>
                        <p className="tp-title"><Link href={`/portal/admin/sessions/${s.id}`}>{s.title}</Link></p>
                        <p className="tp-meta">{s.family_name}{s.child_name ? ` · ${s.child_name}` : ""}</p>
                        <details className="tp-change">
                          <summary>Change</summary>
                          <form action={amendSession} className="pt-form">
                            <input type="hidden" name="id" value={s.id} />
                            <input type="hidden" name="return" value={here} />
                            <Field label="Date and time (UK)" htmlFor={`am-start-${s.id}`}>
                              <input id={`am-start-${s.id}`} name="starts_at" type="datetime-local" defaultValue={toLocalInput(new Date(s.starts_at), TZ)} required />
                            </Field>
                            <Field label="Length (minutes)" htmlFor={`am-min-${s.id}`}>
                              <input id={`am-min-${s.id}`} name="minutes" type="number" min={5} max={480} step={5} defaultValue={s.minutes} required />
                            </Field>
                            <Field label="Who is teaching" htmlFor={`am-staff-${s.id}`}>
                              <select id={`am-staff-${s.id}`} name="staff_id" defaultValue={s.staff_id ?? ""}>
                                <option value="">Not assigned</option>
                                {active.map((m) => <option key={m.id} value={m.id}>{m.name} ({roleName[m.role]})</option>)}
                              </select>
                            </Field>
                            <Field label="Status" htmlFor={`am-status-${s.id}`}>
                              <select id={`am-status-${s.id}`} name="status" defaultValue={s.status}>
                                <option value="scheduled">Scheduled</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </Field>
                            <SubmitButton className="btn-primary ui-btn-sm">Save change</SubmitButton>
                          </form>
                        </details>
                      </article>
                    );
                  })
                )}
              </section>
            );
          })}
        </div>
      </Card>

      <div className="pt-grid">
        <div className="pt-main">
          <Card
            title="Assign lessons"
            description={`Lessons with no tutor yet. Give them to ${person.name.split(" ")[0]} with one click.`}
          >
            {freeSessions.length === 0 ? (
              <EmptyState title="Every upcoming lesson has someone assigned" />
            ) : (
              <ul className="ui-rows">
                {freeSessions.map((s) => (
                  <li key={s.id}>
                    <form action={assignSessionToStaff} className="ui-row-form">
                      <input type="hidden" name="session_id" value={s.id} />
                      <input type="hidden" name="staff_id" value={person.id} />
                      <input type="hidden" name="return" value={here} />
                      <span className="ui-row-main">
                        <strong>{s.title}</strong>
                        <span>{s.family_name}{s.child_name ? ` · ${s.child_name}` : ""} · {sessionWhen(new Date(s.starts_at), s.minutes, TZ).label}</span>
                      </span>
                      <SubmitButton className="btn-secondary ui-btn-sm">Assign to {person.name.split(" ")[0]}</SubmitButton>
                    </form>
                  </li>
                ))}
              </ul>
            )}
            <p className="ui-card-desc">To create a new lesson, open a family and choose Schedule a lesson. You can pick {person.name.split(" ")[0]} as the teacher there. <Link href="/portal/admin/families" className="ui-link">Open families →</Link></p>
          </Card>

          {isConsultant && (
            <Card title="Assign families" description={`Families with no consultant yet.`}>
              {freeFamilies.length === 0 ? (
                <EmptyState title="Every family has a consultant" />
              ) : (
                <ul className="ui-rows">
                  {freeFamilies.map((f) => (
                    <li key={f.id}>
                      <form action={assignFamilyToConsultant} className="ui-row-form">
                        <input type="hidden" name="family_id" value={f.id} />
                        <input type="hidden" name="staff_id" value={person.id} />
                        <input type="hidden" name="return" value={here} />
                        <span className="ui-row-main">
                          <strong>{f.name}</strong>
                          <span>{f.email}</span>
                        </span>
                        <SubmitButton className="btn-secondary ui-btn-sm">Assign to {person.name.split(" ")[0]}</SubmitButton>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          )}
        </div>

        <aside className="pt-side">
          <Card title={isConsultant ? `${person.name.split(" ")[0]}'s families` : "Families they teach"}>
            {families.length === 0 ? (
              <EmptyState title="None yet">{isConsultant ? "Assign families from the list on the left." : "Families appear once they have a lesson."}</EmptyState>
            ) : (
              <ul className="ui-rows">
                {families.map((f) => (
                  <li key={f.id}>
                    {isConsultant ? (
                      <form action={assignFamilyToConsultant} className="ui-row-form">
                        <input type="hidden" name="family_id" value={f.id} />
                        <input type="hidden" name="return" value={here} />
                        <Avatar name={f.name} size="sm" />
                        <span className="ui-row-main">
                          <strong><Link href={`/portal/admin/families/${f.id}`}>{f.name}</Link></strong>
                          <span>{f.child_count} {f.child_count === 1 ? "child" : "children"}</span>
                        </span>
                        <label className="sr-only" htmlFor={`mv-${f.id}`}>Move {f.name} to</label>
                        <select id={`mv-${f.id}`} name="staff_id" defaultValue={person.id}>
                          <option value="">Unassign</option>
                          {active.filter((s) => s.role !== "tutor").map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                        <SubmitButton className="btn-secondary ui-btn-sm">Move</SubmitButton>
                      </form>
                    ) : (
                      <Link href={`/portal/admin/families/${f.id}`} className="ui-row-link">
                        <Avatar name={f.name} size="sm" />
                        <span className="ui-row-main"><strong>{f.name}</strong><span>{f.child_count} {f.child_count === 1 ? "child" : "children"}</span></span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </aside>
      </div>
    </>
  );
}
