import Link from "next/link";
import { notFound } from "next/navigation";
import { requireFamily, familySession, familyNotes } from "../../../../lib/portal/dal";
import { formatSessionTime, tzLabel } from "../../../../lib/portal/time";
import { SessionList, NoteCard } from "../../../components";

export default async function FamilySessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { family } = await requireFamily();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const session = await familySession(family.id, id);
  if (!session) notFound();
  const notes = await familyNotes(family.id, { sessionId: session.id });

  return (
    <>
      <p className="pt-back"><Link href="/portal/sessions">← All sessions</Link></p>
      <h1 className="pt-title">{session.title}</h1>
      <p className="pt-small">{formatSessionTime(new Date(session.starts_at), family.timezone)} ({tzLabel(family.timezone)})</p>
      <section className="pt-card">
        <SessionList sessions={[session]} tz={family.timezone} hrefFor={() => `/portal/sessions/${session.id}`} empty="" />
      </section>
      <section className="pt-card">
        <h2>Notes from this session</h2>
        {notes.length === 0 ? (
          <div className="pt-empty">Your tutor&apos;s notes will appear here after the session.</div>
        ) : (
          <div className="pt-notes">{notes.map((n) => <NoteCard key={n.id} note={n} tz={family.timezone} showSession={false} />)}</div>
        )}
      </section>
    </>
  );
}
