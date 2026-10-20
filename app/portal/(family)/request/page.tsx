import { requireFamily, familyChildren, familyRequests } from "../../../lib/portal/dal";
import { formatDate } from "../../../lib/portal/time";
import { Flash } from "../../components";
import { PageHeader, Card, EmptyState, Field, Pill } from "../../ui";
import { SubmitButton } from "../../client-ui";
import { requestLesson } from "./actions";

const status = {
  pending: <Pill tone="warn">Waiting for approval</Pill>,
  approved: <Pill tone="good">Approved and scheduled</Pill>,
  declined: <Pill tone="muted">Not going ahead</Pill>,
};

export default async function RequestLessonPage({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  const { family } = await requireFamily();
  const [children, requests, msg] = await Promise.all([familyChildren(family.id), familyRequests(family.id), searchParams]);

  return (
    <>
      <PageHeader title="Request a lesson" description="Tell us what you need. Our team approves each request and assigns the right tutor or consultant, then your lesson appears under Sessions." />
      <Flash ok={msg.ok} error={msg.error} />
      <div className="pt-grid">
        <div className="pt-main">
          <Card title="New request">
            <form action={requestLesson} className="pt-form">
              <Field label="Who is it for?" htmlFor="rq-child">
                <select id="rq-child" name="child_id" defaultValue={children.length === 1 ? String(children[0].id) : ""}>
                  <option value="">{children.length ? "Choose a child" : "Add a child first under Your family"}</option>
                  {children.map((c) => <option key={c.id} value={c.id}>{c.name}{c.year_group ? ` (${c.year_group})` : ""}</option>)}
                </select>
              </Field>
              <Field label="Subject or what it is for" htmlFor="rq-subject">
                <input id="rq-subject" name="subject" placeholder="e.g. GCSE Maths" required />
              </Field>
              <Field label="Tell us more (optional)" htmlFor="rq-details" hint="Exam board, current level, goals or anything we should know.">
                <textarea id="rq-details" name="details" rows={4} />
              </Field>
              <Field label="Best days and times (optional)" htmlFor="rq-pref">
                <input id="rq-pref" name="preferred" placeholder="e.g. weekday evenings after 5pm" />
              </Field>
              <SubmitButton pendingText="Sending…">Send request</SubmitButton>
            </form>
          </Card>
        </div>
        <aside className="pt-side">
          <Card title="Your requests">
            {requests.length === 0 ? (
              <EmptyState icon="📝" title="No requests yet">Requests you send appear here with their status.</EmptyState>
            ) : (
              <ul className="ui-rows">
                {requests.map((r) => (
                  <li key={r.id}>
                    <div className="ui-row-link">
                      <span className="ui-row-main">
                        <strong>{r.subject}</strong>
                        <span>{r.child_name ? `${r.child_name} · ` : ""}{formatDate(new Date(r.created_at), family.timezone)}</span>
                        {r.decision_note && <span>{r.decision_note}</span>}
                      </span>
                      {status[r.status]}
                    </div>
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
