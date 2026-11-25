import { requireFamily, familyChildren, familyNotesToTeam, FAMILY_NOTE_TOPICS } from "../../../lib/portal/dal";
import { formatDate } from "../../../lib/portal/time";
import { Flash } from "../../components";
import { PageHeader, Card, EmptyState, Field, Pill, HelpBox } from "../../ui";
import { SubmitButton } from "../../client-ui";
import { addFamilyNote } from "./actions";

// Where a family tells the team anything they should know: concerns, changes, or things about a child.
export default async function NotesForTeamPage({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  const { family } = await requireFamily();
  const [children, notes, msg] = await Promise.all([familyChildren(family.id), familyNotesToTeam(family.id), searchParams]);

  return (
    <>
      <PageHeader
        title="Notes for the team"
        description="Tell us about any concerns, or anything your consultant and tutors should know about your family or your child."
      />
      <Flash ok={msg.ok} error={msg.error} />
      <div className="pt-grid">
        <div className="pt-main">
          <Card title="Write a note">
            <form action={addFamilyNote} className="pt-form">
              <div className="pt-form-grid">
                <Field label="What is it about?" htmlFor="fn-topic">
                  <select id="fn-topic" name="topic" required defaultValue="">
                    <option value="">Choose one…</option>
                    {FAMILY_NOTE_TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Which child? (optional)" htmlFor="fn-child">
                  <select id="fn-child" name="child_id" defaultValue={children.length === 1 ? String(children[0].id) : ""}>
                    <option value="">The whole family</option>
                    {children.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Your note" htmlFor="fn-body" hint="For example: a worry about school, a recent diagnosis, an upcoming exam, or a change to your routine.">
                <textarea id="fn-body" name="body" rows={6} required maxLength={3000} />
              </Field>
              <SubmitButton pendingText="Sending…">Send to the team</SubmitButton>
            </form>
          </Card>

          <Card title="Your notes">
            {notes.length === 0 ? (
              <EmptyState title="No notes yet">Notes you send appear here, with whether the team has read them.</EmptyState>
            ) : (
              <div className="ui-notes">
                {notes.map((n) => (
                  <article className="ui-note" key={n.id}>
                    <header className="ui-note-head">
                      <div>
                        <p className="ui-note-author">{n.topic}</p>
                        <p className="ui-note-meta">{n.child_name ? `About ${n.child_name} · ` : ""}{formatDate(new Date(n.created_at), family.timezone)}</p>
                      </div>
                      {n.seen_at ? <Pill tone="good">Read by the team</Pill> : <Pill tone="warn">Sent</Pill>}
                    </header>
                    <p className="ui-note-body">{n.body}</p>
                  </article>
                ))}
              </div>
            )}
          </Card>
        </div>
        <aside className="pt-side">
          <HelpBox title="Who sees your notes?" open>
            <p>Your consultant, the Britannia Crown team and your child&apos;s tutors. They are private to your family and never shared with anyone else.</p>
            <p>For anything urgent, please also email or call your consultant.</p>
          </HelpBox>
        </aside>
      </div>
    </>
  );
}
