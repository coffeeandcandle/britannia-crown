import { notFound } from "next/navigation";
import { requireStaff, getFamily, familyChildren, familySessions, listStaff } from "../../../../lib/portal/dal";
import { TIMEZONES, tzLabel } from "../../../../lib/portal/time";
import { siteOrigin } from "../../../../lib/portal/origin";
import { SIGN_IN_PATH } from "../../../../lib/portal/config";
import { dailyEnabled } from "../../../../lib/portal/daily";
import { SessionList, Flash } from "../../../components";
import { PageHeader, Card, EmptyState, Checklist, Avatar, Pill, Field } from "../../../ui";
import { SubmitButton, ConfirmSubmit, CopyButton } from "../../../client-ui";
import { saveFamily, addChild, removeChild, scheduleSession } from "../../actions";

const subjectSuggestions = [
  "GCSE Maths", "GCSE English", "GCSE Science", "GCSE Chemistry", "GCSE Biology", "GCSE Physics",
  "A-Level Maths", "A-Level Chemistry", "A-Level Biology", "A-Level Physics",
  "Primary Maths", "Primary English", "11+ preparation", "Consultation", "School placement meeting",
];

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
  const [children, sessions, team, msg, origin] = await Promise.all([familyChildren(id), familySessions(id), listStaff(), searchParams, siteOrigin()]);
  const active = team.filter((s) => s.active);
  const consultants = active.filter((s) => s.role !== "tutor");
  const consultant = team.find((s) => s.id === family.consultant_id);
  const upcoming = sessions.filter((s) => s.is_upcoming).reverse();
  const past = sessions.filter((s) => !s.is_upcoming);
  const signInLink = `${origin}${SIGN_IN_PATH}`;
  const href = (s: { id: number }) => `/portal/admin/sessions/${s.id}`;

  const steps = [
    { done: children.length > 0, title: "Add a child", body: "So lessons and notes can be linked to them.", href: "#children", cta: "Add a child" },
    { done: sessions.length > 0, title: "Schedule their first lesson", body: "Choose a date, tutor and joining link.", href: "#schedule", cta: "Schedule" },
    { done: Boolean(family.clerk_user_id), title: "Family signs in", body: `Send ${family.email} the sign-in link. They choose Sign up with that email.` },
  ];
  const setupDone = steps.every((s) => s.done);

  return (
    <>
      <Flash {...msg} />
      <PageHeader
        back={{ href: "/portal/admin/families", label: "All families" }}
        title={family.name}
        description={
          <span className="ui-inline">
            {family.email} · {tzLabel(family.timezone)} · {consultant ? `Consultant: ${consultant.name}` : "No consultant yet"} ·{" "}
            {family.clerk_user_id ? <Pill tone="good">Using portal</Pill> : <Pill tone="warn">Not signed in yet</Pill>}
          </span>
        }
        actions={<a href="#schedule" className="btn-primary">+ Schedule a lesson</a>}
      />

      {!setupDone && (
        <>
          <Checklist title={`Next steps for ${family.name}`} steps={steps} />
          {!family.clerk_user_id && (
            <div className="ui-copy-row ui-copy-callout">
              <span>Portal sign-in link to send them:</span>
              <code>{signInLink}</code>
              <CopyButton value={signInLink} />
            </div>
          )}
        </>
      )}

      <div className="pt-grid">
        <div className="pt-main">
          <Card id="schedule" title="Schedule a lesson" description={dailyEnabled() ? "The family sees it straight away. The lesson happens in the portal, with a Join button 15 minutes before it starts." : "The family sees it straight away, with a Join button 15 minutes before it starts."}>
            <form action={scheduleSession} className="pt-form pt-form-grid">
              <input type="hidden" name="family_id" value={family.id} />
              <Field label="What's the lesson?" htmlFor="ss-title" hint="Start typing or pick a suggestion." span>
                <input id="ss-title" name="title" required placeholder="e.g. GCSE Maths" list="subject-suggestions" />
              </Field>
              <datalist id="subject-suggestions">
                {subjectSuggestions.map((s) => <option key={s} value={s} />)}
              </datalist>
              <Field label="Which child?" htmlFor="ss-child">
                <select id="ss-child" name="child_id" defaultValue={children.length === 1 ? String(children[0].id) : ""}>
                  <option value="">Whole family</option>
                  {children.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
              <Field label="Who's teaching?" htmlFor="ss-staff" hint="They'll see it in their sessions and write the note.">
                <select id="ss-staff" name="staff_id" defaultValue="">
                  <option value="">Choose later</option>
                  {active.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.role})</option>)}
                </select>
              </Field>
              <Field label="Date and time" htmlFor="ss-start">
                <input id="ss-start" name="starts_at" type="datetime-local" required />
              </Field>
              <Field
                label="That time is in"
                htmlFor="ss-tz"
                hint={family.timezone === "Europe/London" ? "The family is in the UK too." : `Enter it in UK time; the family sees it converted to ${tzLabel(family.timezone)}.`}
              >
                <select id="ss-tz" name="timezone" defaultValue="Europe/London">
                  {TIMEZONES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </Field>
              <Field label="Length" htmlFor="ss-min">
                <select id="ss-min" name="minutes" defaultValue="60">
                  {[30, 45, 60, 90, 120].map((m) => <option key={m} value={m}>{m} minutes</option>)}
                </select>
              </Field>
              <Field label="How often?" htmlFor="ss-repeat" hint="Weekly lessons are added for you, same day and time.">
                <select id="ss-repeat" name="repeat_weeks" defaultValue="1">
                  <option value="1">Just this once</option>
                  {[4, 6, 8, 10, 12].map((n) => <option key={n} value={n}>Every week for {n} weeks</option>)}
                </select>
              </Field>
              {!dailyEnabled() && (
                <Field label="Video call link (optional)" htmlFor="ss-url" hint="Paste a Zoom, Google Meet or Teams link. You can add it later." span>
                  <input id="ss-url" name="join_url" type="url" placeholder="https://meet.google.com/…" />
                </Field>
              )}
              <div className="pt-span-2"><SubmitButton pendingText="Scheduling…">Schedule lesson</SubmitButton></div>
            </form>
          </Card>

          <Card title="Upcoming lessons" description={`Times shown in the family's time zone (${tzLabel(family.timezone)}).`}>
            <SessionList
              sessions={upcoming}
              tz={family.timezone}
              hrefFor={href}
              empty={<EmptyState icon="📅" title="Nothing scheduled">Use the form above to book their next lesson.</EmptyState>}
            />
          </Card>
          {past.length > 0 && (
            <Card title="Past lessons">
              <SessionList sessions={past} tz={family.timezone} hrefFor={href} empty={null} />
            </Card>
          )}
        </div>

        <aside className="pt-side">
          <Card id="children" title="Children" description="Lessons and notes can be linked to each child.">
            {children.length > 0 && (
              <ul className="ui-people">
                {children.map((c) => (
                  <li key={c.id}>
                    <Avatar name={c.name} size="sm" />
                    <span><strong>{c.name}</strong>{c.year_group && <span>{c.year_group}</span>}</span>
                    <form action={removeChild}>
                      <input type="hidden" name="id" value={c.id} />
                      <input type="hidden" name="family_id" value={family.id} />
                      <ConfirmSubmit message={`Remove ${c.name}? Their past lessons stay, but won't be linked to them.`}>Remove</ConfirmSubmit>
                    </form>
                  </li>
                ))}
              </ul>
            )}
            <form action={addChild} className="pt-form ui-inline-form">
              <input type="hidden" name="family_id" value={family.id} />
              <Field label="Child's first name" htmlFor="ac-name">
                <input id="ac-name" name="name" required />
              </Field>
              <Field label="Year group" htmlFor="ac-year">
                <input id="ac-year" name="year_group" placeholder="e.g. Year 10" list="year-groups" />
              </Field>
              <datalist id="year-groups">
                {["Nursery", "Reception", ...Array.from({ length: 13 }, (_, i) => `Year ${i + 1}`)].map((y) => <option key={y} value={y} />)}
              </datalist>
              <SubmitButton className="btn-secondary" pendingText="Adding…">Add child</SubmitButton>
            </form>
          </Card>

          <details className="ui-card ui-collapsible">
            <summary>Edit family details</summary>
            <form action={saveFamily} className="pt-form">
              <input type="hidden" name="id" value={family.id} />
              <Field label="Family name" htmlFor="ef-name"><input id="ef-name" name="name" defaultValue={family.name} required /></Field>
              <Field label="Parent's email" htmlFor="ef-email" hint="Changing this means they'll sign in with the new address.">
                <input id="ef-email" name="email" type="email" defaultValue={family.email} required />
              </Field>
              <Field label="Phone" htmlFor="ef-phone"><input id="ef-phone" name="phone" type="tel" defaultValue={family.phone ?? ""} /></Field>
              <Field label="Where they live" htmlFor="ef-tz">
                <select id="ef-tz" name="timezone" defaultValue={family.timezone}>
                  {TIMEZONES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </Field>
              <Field label="Their consultant" htmlFor="ef-consultant">
                <select id="ef-consultant" name="consultant_id" defaultValue={family.consultant_id ?? ""}>
                  <option value="">Not assigned</option>
                  {consultants.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </Field>
              <SubmitButton className="btn-secondary">Save changes</SubmitButton>
            </form>
          </details>
        </aside>
      </div>
    </>
  );
}
