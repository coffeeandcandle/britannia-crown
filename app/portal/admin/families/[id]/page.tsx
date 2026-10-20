import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStaff, getFamily, familyChildren, familySessions, listStaff } from "../../../../lib/portal/dal";
import { TIMEZONES, tzLabel } from "../../../../lib/portal/time";
import { SessionList, Flash } from "../../../components";
import { saveFamily, addChild, removeChild, scheduleSession } from "../../actions";

export default async function AdminFamilyPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  await requireStaff(["admin", "consultant"]);
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const family = await getFamily(id);
  if (!family) notFound();
  const [children, sessions, team, msg] = await Promise.all([familyChildren(id), familySessions(id), listStaff(), searchParams]);
  const active = team.filter((s) => s.active);
  const consultants = active.filter((s) => s.role !== "tutor");

  return (
    <>
      <p className="pt-back"><Link href="/portal/admin/families">← All families</Link></p>
      <h1 className="pt-title">{family.name}</h1>
      <p className="pt-small">
        {family.email}
        {family.phone && ` · ${family.phone}`} · {tzLabel(family.timezone)} ·{" "}
        {family.clerk_user_id ? "Has signed in to the portal" : "Hasn't signed in yet"}
      </p>
      <Flash {...msg} />

      <div className="pt-grid">
        <div className="pt-main">
          <section className="pt-card">
            <h2>Schedule a session</h2>
            <form action={scheduleSession} className="pt-form pt-form-grid">
              <input type="hidden" name="family_id" value={family.id} />
              <div className="form-group pt-span-2"><label htmlFor="ss-title">Title</label><input id="ss-title" name="title" required placeholder="e.g. GCSE Maths" /></div>
              <div className="form-group">
                <label htmlFor="ss-child">Child</label>
                <select id="ss-child" name="child_id" defaultValue={children.length === 1 ? String(children[0].id) : ""}>
                  <option value="">Whole family</option>
                  {children.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ss-staff">Tutor or consultant</label>
                <select id="ss-staff" name="staff_id" defaultValue="">
                  <option value="">Not assigned</option>
                  {active.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.role})</option>)}
                </select>
              </div>
              <div className="form-group"><label htmlFor="ss-start">Date and time</label><input id="ss-start" name="starts_at" type="datetime-local" required /></div>
              <div className="form-group">
                <label htmlFor="ss-tz">Entered in</label>
                <select id="ss-tz" name="timezone" defaultValue="Europe/London">
                  {TIMEZONES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </div>
              <div className="form-group"><label htmlFor="ss-min">Length (minutes)</label><input id="ss-min" name="minutes" type="number" min={5} max={480} step={5} defaultValue={60} required /></div>
              <div className="form-group">
                <label htmlFor="ss-repeat">Repeat weekly</label>
                <select id="ss-repeat" name="repeat_weeks" defaultValue="1">
                  <option value="1">Just once</option>
                  {[4, 6, 8, 10, 12].map((n) => <option key={n} value={n}>For {n} weeks</option>)}
                </select>
              </div>
              <div className="form-group pt-span-2"><label htmlFor="ss-url">Joining link (Zoom, Google Meet or Teams)</label><input id="ss-url" name="join_url" type="url" placeholder="https://" /></div>
              <button type="submit" className="form-submit pt-span-2">Schedule</button>
            </form>
          </section>

          <section className="pt-card">
            <h2>Sessions</h2>
            <SessionList sessions={sessions} tz={family.timezone} hrefFor={(s) => `/portal/admin/sessions/${s.id}`} empty="No sessions yet." />
            <p className="pt-small">Times shown in the family&apos;s time zone ({tzLabel(family.timezone)}).</p>
          </section>
        </div>

        <aside className="pt-side">
          <section className="pt-card">
            <h2>Children</h2>
            {children.length > 0 && (
              <ul className="pt-list">
                {children.map((c) => (
                  <li key={c.id}>
                    <strong>{c.name}</strong>
                    {c.year_group && <span>{c.year_group}</span>}
                    <form action={removeChild}>
                      <input type="hidden" name="id" value={c.id} />
                      <input type="hidden" name="family_id" value={family.id} />
                      <button type="submit" className="pt-link-button" aria-label={`Remove ${c.name}`}>Remove</button>
                    </form>
                  </li>
                ))}
              </ul>
            )}
            <form action={addChild} className="pt-form">
              <input type="hidden" name="family_id" value={family.id} />
              <div className="form-group"><label htmlFor="ac-name">Child&apos;s name</label><input id="ac-name" name="name" required /></div>
              <div className="form-group"><label htmlFor="ac-year">Year group</label><input id="ac-year" name="year_group" placeholder="e.g. Year 10" /></div>
              <button type="submit" className="btn-secondary">Add child</button>
            </form>
          </section>

          <section className="pt-card">
            <h2>Family details</h2>
            <form action={saveFamily} className="pt-form">
              <input type="hidden" name="id" value={family.id} />
              <div className="form-group"><label htmlFor="ef-name">Family name</label><input id="ef-name" name="name" defaultValue={family.name} required /></div>
              <div className="form-group"><label htmlFor="ef-email">Parent&apos;s email</label><input id="ef-email" name="email" type="email" defaultValue={family.email} required /></div>
              <div className="form-group"><label htmlFor="ef-phone">Phone</label><input id="ef-phone" name="phone" type="tel" defaultValue={family.phone ?? ""} /></div>
              <div className="form-group">
                <label htmlFor="ef-tz">Time zone</label>
                <select id="ef-tz" name="timezone" defaultValue={family.timezone}>
                  {TIMEZONES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ef-consultant">Consultant</label>
                <select id="ef-consultant" name="consultant_id" defaultValue={family.consultant_id ?? ""}>
                  <option value="">Not assigned</option>
                  {consultants.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <button type="submit" className="btn-secondary">Save details</button>
            </form>
          </section>
        </aside>
      </div>
    </>
  );
}
