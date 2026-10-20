import Link from "next/link";
import type { NoteRow, SessionRow } from "../lib/portal/dal";
import { formatSessionTime, formatDate } from "../lib/portal/time";

const statusLabel = { scheduled: "Scheduled", completed: "Completed", cancelled: "Cancelled" } as const;

export function SessionList({
  sessions,
  tz,
  hrefFor,
  showFamily = false,
  empty,
}: {
  sessions: SessionRow[];
  tz: string;
  hrefFor: (s: SessionRow) => string;
  showFamily?: boolean;
  empty: React.ReactNode;
}) {
  if (sessions.length === 0) return <div className="pt-empty">{empty}</div>;
  return (
    <ul className="pt-sessions">
      {sessions.map((s) => (
        <li key={s.id} className={`pt-session is-${s.status}`}>
          <div className="pt-session-when">
            <strong>{formatSessionTime(new Date(s.starts_at), tz)}</strong>
            <span>{s.minutes} minutes</span>
          </div>
          <div className="pt-session-what">
            <Link href={hrefFor(s)}>{s.title}</Link>
            <span>
              {[showFamily ? s.family_name : null, s.child_name, s.tutor_name ? `with ${s.tutor_name}` : null].filter(Boolean).join(" · ")}
            </span>
          </div>
          <div className="pt-session-side">
            {/* Join links appear from 15 minutes before a session until it ends. */}
            {s.is_joinable && s.join_url ? (
              <a href={s.join_url} className="btn-primary pt-join" target="_blank" rel="noopener noreferrer">Join now</a>
            ) : (
              <span className={`pt-status is-${s.status}`}>{statusLabel[s.status]}</span>
            )}
            {s.note_count > 0 && <span className="pt-note-count">{s.note_count} note{s.note_count === 1 ? "" : "s"}</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function NoteCard({ note, tz, showSession = true, staffView = false }: { note: NoteRow; tz: string; showSession?: boolean; staffView?: boolean }) {
  return (
    <article className="pt-note">
      <header>
        {showSession && (
          <p className="pt-note-session">
            {note.session_title}
            {note.child_name ? ` · ${note.child_name}` : ""} · {formatDate(new Date(note.session_starts_at), tz)}
          </p>
        )}
        <p className="pt-note-meta">
          {note.author_name ?? "Britannia Crown"} · {formatDate(new Date(note.created_at), tz)}
          {staffView && <span className={`pt-badge${note.shared_with_family ? "" : " is-internal"}`}>{note.shared_with_family ? "Shared with family" : "Staff only"}</span>}
        </p>
      </header>
      <p className="pt-note-body">{note.body}</p>
      {note.homework && (
        <div className="pt-homework">
          <strong>Homework</strong>
          <p>{note.homework}</p>
        </div>
      )}
    </article>
  );
}

export function Flash({ ok, error }: { ok?: string; error?: string }) {
  if (error) return <p className="pt-flash is-error" role="alert">{error}</p>;
  if (ok) return <p className="pt-flash" role="status">{ok}</p>;
  return null;
}
