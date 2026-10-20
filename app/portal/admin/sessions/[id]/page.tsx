import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStaff, staffSession, sessionNotesForStaff, getFamily, listStaff, canManage } from "../../../../lib/portal/dal";
import { formatSessionTime, tzLabel } from "../../../../lib/portal/time";
import { NoteCard, Flash } from "../../../components";
import { addNote, deleteNote, updateSession } from "../../actions";

export default async function AdminSessionPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const { staff } = await requireStaff();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const session = await staffSession(staff, id);
  if (!session) notFound();
  const manager = canManage(staff);
  const [notes, family, team, msg] = await Promise.all([
    sessionNotesForStaff(session.id),
    getFamily(session.family_id),
    manager ? listStaff() : Promise.resolve([]),
    searchParams,
  ]);
  const tz = family?.timezone ?? "Europe/London";

  return (
    <>
      <p className="pt-back">
        {manager ? <Link href={`/portal/admin/families/${session.family_id}`}>← {session.family_name}</Link> : <Link href="/portal/admin/sessions">← My sessions</Link>}
      </p>
      <h1 className="pt-title">{session.title}</h1>
      <p className="pt-small">
        {session.family_name}
        {session.child_name && ` · ${session.child_name}`} · {formatSessionTime(new Date(session.starts_at), "Europe/London")} UK time
        {tz !== "Europe/London" && ` (${formatSessionTime(new Date(session.starts_at), tz)} ${tzLabel(tz)})`} · {session.minutes} minutes
        {session.tutor_name && ` · with ${session.tutor_name}`}
      </p>
      <Flash {...msg} />

      <div className="pt-grid">
        <div className="pt-main">
          <section className="pt-card">
            <h2>Write a session note</h2>
            <form action={addNote} className="pt-form">
              <input type="hidden" name="session_id" value={session.id} />
              <div className="form-group">
                <label htmlFor="n-body">What you covered and how it went</label>
                <textarea id="n-body" name="body" rows={6} required placeholder="Topics covered, what went well, what to work on next" />
              </div>
              <div className="form-group">
                <label htmlFor="n-hw">Homework (optional)</label>
                <textarea id="n-hw" name="homework" rows={3} />
              </div>
              <label className="pt-check"><input type="checkbox" name="shared_with_family" defaultChecked /> Share with the family in their portal</label>
              <button type="submit" className="form-submit">Save note</button>
            </form>
          </section>

          <section className="pt-card">
            <h2>Notes</h2>
            {notes.length === 0 ? (
              <div className="pt-empty">No notes for this session yet.</div>
            ) : (
              <div className="pt-notes">
                {notes.map((n) => (
                  <div key={n.id}>
                    <NoteCard note={n} tz="Europe/London" showSession={false} staffView />
                    {(manager || n.author_name === staff.name) && (
                      <form action={deleteNote} className="pt-note-actions">
                        <input type="hidden" name="id" value={n.id} />
                        <input type="hidden" name="session_id" value={session.id} />
                        <button type="submit" className="pt-link-button">Delete note</button>
                      </form>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="pt-side">
          <section className="pt-card">
            <h2>Session</h2>
            <form action={updateSession} className="pt-form">
              <input type="hidden" name="id" value={session.id} />
              <div className="form-group">
                <label htmlFor="us-status">Status</label>
                <select id="us-status" name="status" defaultValue={session.status}>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              {manager && (
                <>
                  <div className="form-group">
                    <label htmlFor="us-staff">Tutor or consultant</label>
                    <select id="us-staff" name="staff_id" defaultValue={session.staff_id ?? ""}>
                      <option value="">Not assigned</option>
                      {team.filter((s) => s.active || s.id === session.staff_id).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="us-url">Joining link</label>
                    <input id="us-url" name="join_url" type="url" defaultValue={session.join_url ?? ""} placeholder="https://" />
                  </div>
                </>
              )}
              <button type="submit" className="btn-secondary">Update session</button>
            </form>
            {session.join_url && <p className="pt-small"><a href={session.join_url} target="_blank" rel="noopener noreferrer">Open joining link</a></p>}
          </section>
        </aside>
      </div>
    </>
  );
}
