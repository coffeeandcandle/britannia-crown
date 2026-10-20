import { requireFamily, familyNotes } from "../../../lib/portal/dal";
import { NoteCard } from "../../components";
import { PageHeader, Card, EmptyState } from "../../ui";

export default async function FamilyNotesPage() {
  const { family } = await requireFamily();
  const notes = await familyNotes(family.id);
  const homework = notes.filter((n) => n.homework);

  return (
    <>
      <PageHeader
        title="Notes and homework"
        description="After every lesson your tutor writes what was covered, how it went and what to practise. The newest notes are at the top."
      />
      {homework.length > 0 && (
        <Card tone="soft" title="Latest homework" description="Set in the most recent lesson.">
          <p className="ui-homework-latest">{homework[0].homework}</p>
          <p className="ui-muted">From {homework[0].session_title}{homework[0].child_name ? ` · ${homework[0].child_name}` : ""}</p>
        </Card>
      )}
      {notes.length === 0 ? (
        <Card>
          <EmptyState icon="📝" title="No notes yet">Your tutor&apos;s notes appear here after your first lesson.</EmptyState>
        </Card>
      ) : (
        <div className="ui-notes">{notes.map((n) => <NoteCard key={n.id} note={n} tz={family.timezone} />)}</div>
      )}
    </>
  );
}
