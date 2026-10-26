import { notFound } from "next/navigation";
import { requireFamily, familySession, familyNotes } from "../../../../lib/portal/dal";
import { sessionWhen, tzLabel } from "../../../../lib/portal/time";
import { NoteCard } from "../../../components";
import { PageHeader, Card, EmptyState, Pill } from "../../../ui";
import { dailyEnabled } from "../../../../lib/portal/daily";
import { releasedSummary } from "../../../../lib/portal/transcripts";
import Link from "next/link";

export default async function FamilySessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { family } = await requireFamily();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const session = await familySession(family.id, id);
  if (!session) notFound();
  const notes = await familyNotes(family.id, { sessionId: session.id });
  const summary = await releasedSummary(session.id);
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
      {summary && (
        <Card title="Summary of the call" description="Written by AI from the call and checked by our team.">
          <p style={{ whiteSpace: "pre-wrap" }}>{summary.summary}</p>
        </Card>
      )}
    </>
  );
}
