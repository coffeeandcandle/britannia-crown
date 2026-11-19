import { requireStaff, listApplicants } from "../../../lib/portal/dal";
import { formatDate } from "../../../lib/portal/time";
import { Flash } from "../../components";
import { PageHeader, Card, EmptyState, Avatar, Pill, HelpBox } from "../../ui";
import { SubmitButton, ConfirmSubmit } from "../../client-ui";
import { approveApplicant, declineApplicant } from "../applicant-actions";

// Tutors and consultants who signed up on the team page and are waiting for an admin.
export default async function ApplicationsPage({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  await requireStaff(["admin"]);
  const [pending, decided, msg] = await Promise.all([listApplicants("pending"), listApplicants("decided"), searchParams]);

  return (
    <>
      <Flash {...msg} />
      <PageHeader
        title="Team applications"
        description="People who signed up on the tutor and consultant page. Approve them as a tutor or consultant to open their area, or decline."
      />
      <div className="pt-grid">
        <div className="pt-main">
          <Card title={`Waiting for you (${pending.length})`}>
            {pending.length === 0 ? (
              <EmptyState title="No one waiting">New tutor and consultant sign-ups appear here.</EmptyState>
            ) : (
              <ul className="ui-rows">
                {pending.map((a) => (
                  <li key={a.id}>
                    <div className="ui-row-link">
                      <Avatar name={a.name} />
                      <span className="ui-row-main">
                        <strong>{a.name}</strong>
                        <span><a href={`mailto:${a.email}`}>{a.email}</a> · signed up {formatDate(new Date(a.created_at), "Europe/London")}</span>
                      </span>
                      <form action={approveApplicant}>
                        <input type="hidden" name="id" value={a.id} />
                        <input type="hidden" name="role" value="tutor" />
                        <SubmitButton className="btn-primary ui-btn-sm" pendingText="Approving…">Approve as tutor</SubmitButton>
                      </form>
                      <form action={approveApplicant}>
                        <input type="hidden" name="id" value={a.id} />
                        <input type="hidden" name="role" value="consultant" />
                        <SubmitButton className="btn-secondary ui-btn-sm" pendingText="Approving…">Approve as consultant</SubmitButton>
                      </form>
                      <form action={declineApplicant}>
                        <input type="hidden" name="id" value={a.id} />
                        <ConfirmSubmit message={`Decline ${a.name}? They won't be able to see the team area.`}>Decline</ConfirmSubmit>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
          {decided.length > 0 && (
            <Card title="Already handled">
              <ul className="ui-rows">
                {decided.map((a) => (
                  <li key={a.id}>
                    <div className="ui-row-link">
                      <Avatar name={a.name} size="sm" />
                      <span className="ui-row-main"><strong>{a.name}</strong><span>{a.email}</span></span>
                      {a.status === "approved" ? <Pill tone="good">Approved</Pill> : <Pill tone="muted">Declined</Pill>}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
        <aside className="pt-side">
          <HelpBox title="How team sign-ups work" open>
            <ol>
              <li>A tutor or consultant signs up on the team page with their email.</li>
              <li>They appear here, and the team is emailed. They are never added to your clients or Contacts.</li>
              <li>Approve them as a tutor or consultant. Their area opens with the right menu straight away.</li>
            </ol>
            <p>Approved people are managed under Tutors, Consultants and Team and access.</p>
          </HelpBox>
        </aside>
      </div>
    </>
  );
}
