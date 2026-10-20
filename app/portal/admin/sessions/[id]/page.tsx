import { notFound } from "next/navigation";
import { requireStaff, staffSession, sessionNotesForStaff, getFamily, listStaff, canManage } from "../../../../lib/portal/dal";
import { sessionWhen, tzLabel } from "../../../../lib/portal/time";
import { NoteCard, Flash } from "../../../components";
import { PageHeader, Card, EmptyState, Pill, Field, HelpBox } from "../../../ui";
import { SubmitButton, ConfirmSubmit } from "../../../client-ui";
import { addNote, deleteNote, updateSession } from "../../actions";

export default async function AdminSessionPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const { staff } = await requireStaff();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const session = await staffSession(staff, id);
  if (!session) notFound();
  const manager = canManage(staff);
  const [notes, family, team, msg] = await Promise.all([
    sessionNotesForStaff(session.id),
    getFamily(session.family_id),
    manager ? listStaff() : Promise.resolve([]),
    searchParams,
  ]);
  const tz = family?.timezone ?? "Europe/London";
  const ukWhen = sessionWhen(new Date(session.starts_at), session.minutes, "Europe/London");
  const familyWhen = sessionWhen(new Date(session.starts_at), session.minutes, tz);
  const finished = !session.is_upcoming;

  const status =
    session.status === "cancelled" ? <Pill tone="muted">Cancelled</Pill>
    : session.is_joinable ? <Pill tone="brand">Happening now</Pill>
    : session.is_upcoming ? <Pill tone="brand">{ukWhen.relative}</Pill>
    : <Pill tone="good">Finished</Pill>;

  return (
    <>
      <Flash {...msg} />
      <PageHeader
        back={manager ? { href: `/portal/admin/families/${session.family_id}`, label: session.family_name } : { href: "/portal/admin/sessions", label: "My sessions" }}
        title={session.title}
        description={`${session.family_name}${session.child_name ? ` · ${session.child_name}` : ""} · ${ukWhen.label} UK time`}
        actions={session.join_url && session.is_upcoming ? (
          <a href={session.join_url} className="btn-primary" target="_blank" rel="noopener noreferrer">Open video call</a>
        ) : undefined}
      />

      <Card>
        <dl className="ui-facts">
          <div><dt>Status</dt><dd>{status}</dd></div>
          <div><dt>When (UK)</dt><dd>{ukWhen.label}</dd></div>
          {tz !== "Europe/London" && <div><dt>Family&apos;s time ({tzLabel(tz)})</dt><dd>{familyWhen.label}</dd></div>}
          <div><dt>Length</dt><dd>{session.minutes} minutes</dd></div>
          <div><dt>Teaching</dt><dd>{session.tutor_name ?? "Not assigned"}</dd></div>
          <div><dt>Video link</dt><dd>{session.join_url ? "Added" : "Not added yet"}</dd></div>
        </dl>
      </Card>

      <div className="pt-grid">
        <div className="pt-main">
          <Card
            id="write-note"
            title={finished ? "Write a session note" : "Session note"}
            description={finished ? "This is what the family reads in their portal. Keep it short, specific and encouraging." : "You can write the note once the lesson has finished."}
          >
            <form action={addNote} className="pt-form">
              <input type="hidden" name="session_id" value={session.id} />
              <Field
                label="What you covered and how it went"
                htmlFor="n-body"
                hint="A good note covers: what you worked on, what went well, and what to focus on next time."
              >
                <textarea
                  id="n-body"
                  name="body"
                  rows={6}
                  required
                  placeholder={"Covered: simultaneous equations by substitution.\nWent well: confident with the method by the end.\nNext time: elimination method and worded problems."}
                />
              </Field>
              <Field label="Homework (optional)" htmlFor="n-hw" hint="Shown to the family as homework.">
                <textarea id="n-hw" name="homework" rows={2} placeholder="e.g. Exercise 4B, questions 1 to 10" />
              </Field>
              <fieldset className="ui-choice">
                <legend>Who can see this note?</legend>
                <label><input type="radio" name="shared_with_family" value="on" defaultChecked /> <span><strong>The family and staff</strong> Appears in the family&apos;s portal.</span></label>
                <label><input type="radio" name="shared_with_family" value="off" /> <span><strong>Staff only</strong> For internal notes the family shouldn&apos;t see.</span></label>
              </fieldset>
              <SubmitButton>Save note</SubmitButton>
            </form>
          </Card>

          <Card title={`Notes (${notes.length})`}>
            {notes.length === 0 ? (
              <EmptyState icon="📝" title="No notes yet">{finished ? "Write the first note above." : "Notes appear here after the lesson."}</EmptyState>
            ) : (
              <div className="ui-notes">
                {notes.map((n) => (
                  <div key={n.id}>
                    <NoteCard note={n} tz="Europe/London" showSession={false} staffView />
                    {(manager || n.author_name === staff.name) && (
                      <form action={deleteNote} className="ui-note-actions">
                        <input type="hidden" name="id" value={n.id} />
                        <input type="hidden" name="session_id" value={session.id} />
                        <ConfirmSubmit message="Delete this note? The family will no longer see it.">Delete note</ConfirmSubmit>
                      </form>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <aside className="pt-side">
          <Card title="Update this lesson">
            <form action={updateSession} className="pt-form">
              <input type="hidden" name="id" value={session.id} />
              <Field label="Status" htmlFor="us-status" hint="Lessons are marked finished automatically when you write a note afterwards.">
                <select id="us-status" name="status" defaultValue={session.status}>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </Field>
              {manager && (
                <>
                  <Field label="Who's teaching?" htmlFor="us-staff">
                    <select id="us-staff" name="staff_id" defaultValue={session.staff_id ?? ""}>
                      <option value="">Not assigned</option>
                      {team.filter((s) => s.active || s.id === session.staff_id).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </Field>
                  <Field label="Video call link" htmlFor="us-url" hint="Zoom, Google Meet or Teams.">
                    <input id="us-url" name="join_url" type="url" defaultValue={session.join_url ?? ""} placeholder="https://" />
                  </Field>
                </>
              )}
              <SubmitButton className="btn-secondary">Save changes</SubmitButton>
            </form>
          </Card>
          <HelpBox title="Tips for great notes">
            <ul>
              <li>Name the topic, so parents can follow along.</li>
              <li>Mention one thing that went well. It keeps motivation up.</li>
              <li>Be specific about homework: pages, questions and how long it should take.</li>
            </ul>
          </HelpBox>
        </aside>
      </div>
    </>
  );
}
