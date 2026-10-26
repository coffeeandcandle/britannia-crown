import "server-only";
import { headers } from "next/headers";
import { query, queryOne } from "./db";

// A simple record of what people do in the portal, for security, safeguarding and support.
// Logging never breaks the page it is called from.
export type Actor = { kind: "staff" | "family"; id: number; name: string; role?: string };

export const ACTIONS: Record<string, string> = {
  sign_in: "Signed in",
  "document.view": "Opened a document",
  "document.open": "Team opened a document",
  "document.sign": "Signed a document",
  "document.upload": "Uploaded a document",
  "document.delete": "Deleted a document",
  "session.book": "Booked a session",
  "lesson.request": "Requested a lesson",
  "details.save": "Added details after paying",
  "room.open": "Opened the lesson room",
  "room.joined": "Joined the call",
  "room.left": "Left the call",
  "room.participant_joined": "Someone else joined the call",
  "room.participant_left": "Someone else left the call",
  "room.camera_error": "Camera or microphone problem",
  "room.error": "Call error",
  "transcript.release": "Released a call summary to the family",
  "transcript.hide": "Withdrew a call summary from the family",
  "transcript.delete": "Deleted a call transcript",
};

async function context() {
  try {
    const h = await headers();
    const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || null;
    return { ip, agent: (h.get("user-agent") ?? "").slice(0, 300) || null };
  } catch {
    return { ip: null, agent: null };
  }
}

export async function logActivity(
  actor: Actor,
  action: string,
  extra: { familyId?: number | null; sessionId?: number | null; detail?: string | null } = {},
) {
  try {
    const { ip, agent } = await context();
    await query(
      `INSERT INTO activity_log (actor_key, actor_kind, actor_name, actor_role, family_id, session_id, action, detail, ip, agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [`${actor.kind}:${actor.id}`, actor.kind, actor.name.slice(0, 120), actor.role ?? null, extra.familyId ?? null, extra.sessionId ?? null, action, extra.detail?.slice(0, 400) ?? null, ip, agent],
    );
  } catch (error) {
    console.error("Activity log write failed", error);
  }
}

// One "signed in" entry per person per two hours, so ordinary browsing does not fill the log.
export async function logVisit(actor: Actor) {
  try {
    const key = `${actor.kind}:${actor.id}`;
    const recent = await queryOne<{ id: number }>(
      "SELECT id FROM activity_log WHERE actor_key = $1 AND action = 'sign_in' AND at > now() - interval '2 hours' LIMIT 1",
      [key],
    );
    if (!recent) await logActivity(actor, "sign_in", { familyId: actor.kind === "family" ? actor.id : null });
  } catch (error) {
    console.error("Visit log failed", error);
  }
}

export type LogRow = {
  id: number;
  at: Date;
  actor_kind: "staff" | "family";
  actor_name: string;
  actor_role: string | null;
  family_id: number | null;
  family_name: string | null;
  session_id: number | null;
  action: string;
  detail: string | null;
  ip: string | null;
};

const SELECT = `SELECT l.id, l.at, l.actor_kind, l.actor_name, l.actor_role, l.family_id, f.name AS family_name,
  l.session_id, l.action, l.detail, l.ip FROM activity_log l LEFT JOIN families f ON f.id = l.family_id`;

export const recentActivity = (opts: { familyId?: number; kind?: string; limit?: number } = {}) =>
  query<LogRow>(
    `${SELECT} WHERE ($1::int IS NULL OR l.family_id = $1) AND ($2::text IS NULL OR l.action LIKE $2 || '%')
     ORDER BY l.at DESC LIMIT $3`,
    [opts.familyId ?? null, opts.kind ?? null, opts.limit ?? 200],
  );

export const sessionLog = (sessionId: number) =>
  query<LogRow>(`${SELECT} WHERE l.session_id = $1 ORDER BY l.at`, [sessionId]);
