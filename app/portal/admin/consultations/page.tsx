import { requireStaff } from "../../../lib/portal/dal";
import { Flash } from "../../components";
import { PageHeader, Card, EmptyState, Pill } from "../../ui";
import { ConfirmSubmit, SubmitButton } from "../../client-ui";
import { confirmConsultation, cancelConsultation, listConsultations } from "../consultation-actions";

const when = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Europe/London" }).format(new Date(d));

export default async function ConsultationsPage({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  await requireStaff(["admin", "consultant"]);
  const [rows, msg] = await Promise.all([listConsultations(), searchParams]);
  const waiting = rows.filter((r) => r.status === "requested");

  return (
    <>
      <PageHeader title="Free consultations" description="Times families have asked for on the website. Confirm a time and the family is emailed; cancel it and the time opens up again for someone else." />
      <Flash ok={msg.ok} error={msg.error} />
      <Card title={`Upcoming (${rows.length}) · waiting for you (${waiting.length})`}>
        {rows.length === 0 ? (
          <EmptyState title="Nothing booked">Requests appear here, and the team is emailed when one arrives.</EmptyState>
        ) : (
          <ul className="ui-rows">
            {rows.map((r) => (
              <li key={r.id} className="rq-item">
                <div className="rq-head">
                  <strong>{when(r.starts_at)} (UK time)</strong>
                  <span>{r.name} · {r.email}</span>
                  <span>{r.status === "confirmed" ? <Pill tone="good">Confirmed</Pill> : <Pill tone="brand">Needs confirming</Pill>}</span>
                </div>
                <div className="uk-hero-actions">
                  {r.status === "requested" && (
                    <form action={confirmConsultation}>
                      <input type="hidden" name="id" value={r.id} />
                      <SubmitButton className="btn-primary" pendingText="Confirming…">Confirm and email family</SubmitButton>
                    </form>
                  )}
                  <form action={cancelConsultation}>
                    <input type="hidden" name="id" value={r.id} />
                    <ConfirmSubmit message="Cancel this time? The family is emailed and the time opens up again.">Cancel</ConfirmSubmit>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
