import { requireFamily, familyNotes } from "../../../lib/portal/dal";
import { NoteCard } from "../../components";

export default async function FamilyNotesPage() {
  const { family } = await requireFamily();
  const notes = await familyNotes(family.id);

  return (
    <>
      <h1 className="pt-title">Session notes</h1>
      <p className="pt-small">What was covered, how it went, and any homework, written by your tutor after each session.</p>
      {notes.length === 0 ? (
        <div className="pt-empty">No notes yet. They&apos;ll appear here after your first session.</div>
      ) : (
        <div className="pt-notes">{notes.map((n) => <NoteCard key={n.id} note={n} tz={family.timezone} />)}</div>
      )}
    </>
  );
}
