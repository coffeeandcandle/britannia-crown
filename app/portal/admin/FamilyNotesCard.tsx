import type { FamilyNoteRow } from "../../lib/portal/dal";
import { formatDate } from "../../lib/portal/time";
import { Card, Pill } from "../ui";
import { SubmitButton } from "../client-ui";
import { markFamilyNotesSeen } from "./actions";

// Notes the family has written for the team from their portal. Managers can mark them read;
// tutors see them read-only on their lesson pages.
export default function FamilyNotesCard({ notes, familyId, canMark, tz = "Europe/London" }: { notes: FamilyNoteRow[]; familyId: number; canMark: boolean; tz?: string }) {
  if (notes.length === 0) return null;
  const unseen = notes.filter((n) => !n.seen_at).length;
  return (
    <Card
      id="from-family"
      title={unseen ? `From the family (${unseen} new)` : "From the family"}
      description="Concerns and things to know, written by the family in their portal. Keep these in mind when teaching."
      action={
        canMark && unseen > 0 ? (
          <form action={markFamilyNotesSeen}>
            <input type="hidden" name="family_id" value={familyId} />
            <SubmitButton className="btn-secondary ui-btn-sm" pendingText="Saving…">Mark as read</SubmitButton>
          </form>
        ) : undefined
      }
    >
      <div className="ui-notes">
        {notes.slice(0, 10).map((n) => (
          <article className="ui-note" key={n.id}>
            <header className="ui-note-head">
              <div>
                <p className="ui-note-author">{n.topic}</p>
                <p className="ui-note-meta">{n.child_name ? `About ${n.child_name} · ` : ""}{formatDate(new Date(n.created_at), tz)}</p>
              </div>
              {n.seen_at ? <Pill tone="muted">Read{n.seen_by_name ? ` by ${n.seen_by_name}` : ""}</Pill> : <Pill tone="warn">New</Pill>}
            </header>
            <p className="ui-note-body">{n.body}</p>
          </article>
        ))}
      </div>
    </Card>
  );
}
