import { requireStaff, listLessonRequests, listStaff } from "../../../lib/portal/dal";
import { formatDate } from "../../../lib/portal/time";
import { Flash } from "../../components";
import { PageHeader, Card, EmptyState, Field, Pill } from "../../ui";
import { SubmitButton } from "../../client-ui";
import { approveRequest, declineRequest } from "../request-actions";

export default async function RequestsPage({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  await requireStaff(["admin"]);
  const [pending, handled, team, msg] = await Promise.all([listLessonRequests("pending"), listLessonRequests("handled"), listStaff(), searchParams]);
  const active = team.filter((s) => s.active);

  return (
    <>
      <PageHeader title="Lesson requests" description="Families ask for lessons from their portal. Approve a request, choose who teaches it and when, and the lesson appears for the family and the tutor. Nothing is scheduled until you approve." />
      <Flash ok={msg.ok} error={msg.error} />

      <Card title={`Waiting for approval (${pending.length})`}>
        {pending.length === 0 ? (
          <EmptyState icon="✅" title="No requests waiting">New requests appear here and in your email.</EmptyState>
        ) : (
          <ul className="ui-rows">
            {pending.map((r) => (
              <li key={r.id} className="rq-item">
                <div className="rq-head">
                  <strong>{r.subject}</strong>
                  <span>{r.family_name}{r.child_name ? ` · ${r.child_name}` : ""} · {r.family_email} · asked {formatDate(new Date(r.created_at), "Europe/London")}</span>
                  {r.details && <p>{r.details}</p>}
                  {r.preferred && <p>Preferred times: {r.preferred}</p>}
                </div>
                <details className="tp-change">
                  <summary>Approve and assign</summary>
                  <form action={approveRequest} className="pt-form">
                    <input type="hidden" name="id" value={r.id} />
                    <Field label="Who will teach it" htmlFor={`ap-staff-${r.id}`}>
                      <select id={`ap-staff-${r.id}`} name="staff_id" defaultValue="" required>
                        <option value="">Choose a tutor or consultant</option>
                        {active.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.role})</option>)}
                      </select>
                    </Field>
                    <Field label="Lesson title" htmlFor={`ap-title-${r.id}`}>
                      <input id={`ap-title-${r.id}`} name="title" defaultValue={r.subject} />
                    </Field>
                    <Field label="First lesson, date and time (UK)" htmlFor={`ap-start-${r.id}`}>
                      <input id={`ap-start-${r.id}`} name="starts_at" type="datetime-local" required />
                    </Field>
                    <Field label="Length" htmlFor={`ap-min-${r.id}`}>
                      <select id={`ap-min-${r.id}`} name="minutes" defaultValue="60">
                        {[30, 45, 60, 90, 120].map((m) => <option key={m} value={m}>{m} minutes</option>)}
                      </select>
                    </Field>
                    <Field label="How often" htmlFor={`ap-rep-${r.id}`}>
                      <select id={`ap-rep-${r.id}`} name="repeat_weeks" defaultValue="1">
                        <option value="1">Just this once</option>
                        {[4, 6, 8, 10, 12].map((n) => <option key={n} value={n}>Every week for {n} weeks</option>)}
                      </select>
                    </Field>
                    <Field label="Video call link (optional)" htmlFor={`ap-url-${r.id}`}>
                      <input id={`ap-url-${r.id}`} name="join_url" type="url" placeholder="https://" />
                    </Field>
                    <SubmitButton className="btn-primary" pendingText="Approving…">Approve and schedule</SubmitButton>
                  </form>
                </details>
                <details className="tp-change">
                  <summary>Decline</summary>
                  <form action={declineRequest} className="pt-form">
                    <input type="hidden" name="id" value={r.id} />
                    <Field label="Message to the family (optional)" htmlFor={`dc-note-${r.id}`}>
                      <input id={`dc-note-${r.id}`} name="note" placeholder="e.g. We will call you to talk through options." />
                    </Field>
                    <SubmitButton className="btn-secondary" pendingText="Declining…">Decline request</SubmitButton>
                  </form>
                </details>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {handled.length > 0 && (
        <Card title="Recently handled">
          <ul className="ui-rows">
            {handled.map((r) => (
              <li key={r.id}>
                <div className="ui-row-link">
                  <span className="ui-row-main">
                    <strong>{r.subject}</strong>
                    <span>{r.family_name}{r.child_name ? ` · ${r.child_name}` : ""}</span>
                  </span>
                  {r.status === "approved" ? <Pill tone="good">Approved</Pill> : <Pill tone="muted">Declined</Pill>}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
}
