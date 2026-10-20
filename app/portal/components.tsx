import Link from "next/link";
import type { NoteRow, SessionRow } from "../lib/portal/dal";
import { formatDate, sessionWhen, dateTile } from "../lib/portal/time";
import { Pill, Avatar } from "./ui";
import { Toast } from "./client-ui";

const statusPill = {
  scheduled: <Pill tone="brand">Scheduled</Pill>,
  completed: <Pill tone="good">Completed</Pill>,
  cancelled: <Pill tone="muted">Cancelled</Pill>,
} as const;

export function DateTile({ date, tz }: { date: Date; tz: string }) {
  const t = dateTile(date, tz);
  return (
    <span className="ui-date" aria-hidden="true">
      <span className="ui-date-wd">{t.weekday}</span>
      <span className="ui-date-day">{t.day}</span>
      <span className="ui-date-mon">{t.month}</span>
    </span>
  );
}

export function SessionList({
  sessions,
  tz,
  hrefFor,
  showFamily = false,
  empty,
  action,
}: {
  sessions: SessionRow[];
  tz: string;
  hrefFor: (s: SessionRow) => string;
  showFamily?: boolean;
  empty: React.ReactNode;
  // Optional extra button per session, e.g. "Write note" for staff.
  action?: (s: SessionRow) => React.ReactNode;
}) {
  if (sessions.length === 0) return <>{empty}</>;
  return (
    <ul className="ui-sessions">
      {sessions.map((s) => {
        const when = sessionWhen(new Date(s.starts_at), s.minutes, tz);
        return (
          <li key={s.id} className={`ui-session is-${s.status}${s.is_joinable ? " is-live" : ""}`}>
            <DateTile date={new Date(s.starts_at)} tz={tz} />
            <div className="ui-session-main">
              <Link href={hrefFor(s)} className="ui-session-title">{s.title}</Link>
              <span className="ui-session-meta">
                {when.time} · {s.minutes} min
                {s.is_upcoming && <> · <strong>{when.relative}</strong></>}
              </span>
              <span className="ui-session-people">
                {[showFamily ? s.family_name : null, s.child_name, s.tutor_name ? `with ${s.tutor_name}` : null].filter(Boolean).join(" · ")}
              </span>
            </div>
            <div className="ui-session-side">
              {/* Join links appear from 15 minutes before a session until it ends. */}
              {s.is_joinable && s.join_url ? (
                <a href={s.join_url} className="btn-primary ui-btn-sm" target="_blank" rel="noopener noreferrer">Join now</a>
              ) : (
                statusPill[s.status]
              )}
              {action?.(s)}
              {s.note_count > 0 && <span className="ui-session-notes">{s.note_count} note{s.note_count === 1 ? "" : "s"}</span>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function NoteCard({ note, tz, showSession = true, staffView = false }: { note: NoteRow; tz: string; showSession?: boolean; staffView?: boolean }) {
  return (
    <article className="ui-note">
      <header className="ui-note-head">
        <Avatar name={note.author_name ?? "Britannia Crown"} size="sm" />
        <div>
          <p className="ui-note-author">{note.author_name ?? "Britannia Crown"}</p>
          <p className="ui-note-meta">
            {showSession && <>{note.session_title}{note.child_name ? ` · ${note.child_name}` : ""} · </>}
            {formatDate(new Date(note.session_starts_at), tz)}
          </p>
        </div>
        {staffView && (note.shared_with_family ? <Pill tone="good">Shared with family</Pill> : <Pill tone="warn">Team only</Pill>)}
      </header>
      <p className="ui-note-body">{note.body}</p>
      {note.homework && (
        <div className="ui-homework">
          <strong>📝 Homework</strong>
          <p>{note.homework}</p>
        </div>
      )}
    </article>
  );
}

// Kept as the name pages already use; shows a toast for ?ok= and ?error= messages.
export function Flash({ ok, error }: { ok?: string; error?: string }) {
  return <Toast ok={ok} error={error} />;
}
