import { notFound } from "next/navigation";
import { requireFamily, familySession, familyNotes } from "../../../../lib/portal/dal";
import { sessionWhen, tzLabel } from "../../../../lib/portal/time";
import { NoteCard, Flash } from "../../../components";
import { cancelSession } from "../actions";
import { CANCEL_NOTICE_HOURS } from "../../../../lib/portal/booking";
import { PageHeader, Card, EmptyState, Pill } from "../../../ui";
import { dailyEnabled } from "../../../../lib/portal/daily";
import Link from "next/link";

export default async function FamilySessionPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ ok?: string; error?: string }> }) {
  const { family } = await requireFamily();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const session = await familySession(family.id, id);
  if (!session) notFound();
  const msg = await searchParams;
  const notes = await familyNotes(family.id, { sessionId: session.id });
  const when = sessionWhen(new Date(session.starts_at), session.minutes, family.timezone);

  const status =
    session.status === "cancelled" ? <Pill tone="muted">Cancelled</Pill>
    : session.is_upcoming ? <Pill tone="brand">{when.relative}</Pill>
    : <Pill tone="good">Completed</Pill>;

  return (
    <>
      <PageHeader
        back={{ href: "/portal/sessions", label: "All sessions" }}
        title={session.title}
        description={`${when.label} (${tzLabel(family.timezone)})`}
        actions={session.is_joinable && dailyEnabled() ? (
          <Link href={`/portal/sessions/${session.id}/room`} className="btn-primary">Join lesson now</Link>
        ) : session.is_joinable && session.join_url ? (
          <a href={session.join_url} className="btn-primary" target="_blank" rel="noopener noreferrer">Join lesson now</a>
        ) : undefined}
      />

      <Flash ok={msg.ok} error={msg.error} />
      <Card>
        <dl className="ui-facts">
          <div><dt>Status</dt><dd>{status}</dd></div>
          <div><dt>Length</dt><dd>{session.minutes} minutes</dd></div>
          {session.child_name && <div><dt>For</dt><dd>{session.child_name}</dd></div>}
          {session.tutor_name && <div><dt>Tutor</dt><dd>{session.tutor_name}</dd></div>}
          <div>
            <dt>Joining link</dt>
            <dd>
              {dailyEnabled()
                ? session.is_upcoming ? "In your portal. The Join button appears 15 minutes before the start." : "No longer needed"
                : session.join_url
                ? session.is_upcoming ? "Ready. The Join button appears 15 minutes before the start." : "No longer needed"
                : session.is_upcoming ? "Your tutor will add it before the lesson" : "None"}
            </dd>
          </div>
        </dl>
        {session.status === "scheduled" && session.is_upcoming && (
          <form action={cancelSession} className="pt-form">
            <input type="hidden" name="session_id" value={session.id} />
            <p className="booking-hint">Need a different time? Cancel up to {CANCEL_NOTICE_HOURS} hours before it starts and book another. Nothing is lost.</p>
            <button type="submit" className="btn-secondary ui-btn-sm">Cancel this session</button>
          </form>
        )}
      </Card>

      <Card title="Notes from this lesson" description="What was covered, how it went and any homework.">
        {notes.length === 0 ? (
          <EmptyState title={session.is_upcoming ? "Notes come after the lesson" : "No notes yet"}>
            {session.is_upcoming ? "Your tutor writes notes once the lesson has finished." : "Your tutor hasn't added notes for this lesson yet."}
          </EmptyState>
        ) : (
          <div className="ui-notes">{notes.map((n) => <NoteCard key={n.id} note={n} tz={family.timezone} showSession={false} />)}</div>
        )}
      </Card>
    </>
  );
}
