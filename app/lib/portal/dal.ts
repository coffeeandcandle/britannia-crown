import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { query, queryOne } from "./db";
import { devAuth, SIGN_IN_PATH, STAFF_SIGN_IN_PATH } from "./config";

// Data access layer: every portal page and action gets the signed-in person here, and every
// query is scoped to what that person may see. Pages never query the database directly.

export type Role = "admin" | "consultant" | "tutor";
export type Staff = { id: number; email: string; name: string; role: Role };
export type Family = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  timezone: string;
  consultant_id: number | null;
  clerk_user_id: string | null;
  stripe_customer_id: string | null;
};
export type Viewer = { userId: string; email: string; firstName: string; staff: Staff | null; family: Family | null };

const FAMILY_COLS = "id, name, email, phone, timezone, consultant_id, clerk_user_id, stripe_customer_id";

async function getIdentity() {
  if (devAuth) {
    const email = (await cookies()).get("portal_dev_email")?.value?.toLowerCase();
    return email ? { userId: `dev:${email}`, email, firstName: email.split("@")[0] } : null;
  }
  const user = await currentUser();
  if (!user) return null;
  const primary = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId);
  // Only a verified address can be matched to a family or staff record.
  if (!primary || primary.verification?.status !== "verified") return null;
  return { userId: user.id, email: primary.emailAddress.toLowerCase(), firstName: user.firstName ?? "" };
}

const adminEmails = () =>
  (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);

export const getViewer = cache(async (): Promise<Viewer | null> => {
  const id = await getIdentity();
  if (!id) return null;

  let staff = await queryOne<Staff>("SELECT id, email, name, role FROM staff WHERE email = $1 AND active", [id.email]);
  if (!staff && adminEmails().includes(id.email)) {
    staff = await queryOne<Staff>(
      `INSERT INTO staff (email, name, role) VALUES ($1, $2, 'admin')
       ON CONFLICT (email) DO UPDATE SET active = true RETURNING id, email, name, role`,
      [id.email, id.firstName || id.email.split("@")[0]],
    );
  }

  // A login already linked to a family wins; otherwise match the family by verified email and link it.
  const family = await queryOne<Family>(
    `SELECT ${FAMILY_COLS} FROM families
     WHERE clerk_user_id = $1 OR (clerk_user_id IS NULL AND lower(email) = $2)
     ORDER BY (clerk_user_id = $1) DESC NULLS LAST LIMIT 1`,
    [id.userId, id.email],
  );
  if (family && !family.clerk_user_id) {
    await query("UPDATE families SET clerk_user_id = $1 WHERE id = $2 AND clerk_user_id IS NULL", [id.userId, family.id]);
    family.clerk_user_id = id.userId;
  }

  return { ...id, staff, family };
});

export async function requireViewer(signInPath = SIGN_IN_PATH) {
  const viewer = await getViewer();
  if (!viewer) redirect(signInPath);
  return viewer;
}

export async function requireFamily() {
  const viewer = await requireViewer();
  if (!viewer.family) redirect(viewer.staff ? "/portal/admin" : "/portal/no-account");
  return { viewer, family: viewer.family };
}

// Signed-in people without a staff record are sent to an explanation page; staff without the
// required role for a page get a 404, so the page's existence isn't revealed.
export async function requireStaff(roles: Role[] = ["admin", "consultant", "tutor"]) {
  const viewer = await requireViewer(STAFF_SIGN_IN_PATH);
  if (!viewer.staff) redirect("/portal/staff/no-access");
  if (!roles.includes(viewer.staff.role)) notFound();
  return { viewer, staff: viewer.staff };
}

export const canManage = (s: Staff) => s.role === "admin" || s.role === "consultant";

/* ── Family-facing queries (always scoped by family id) ─────────────── */

export type SessionRow = {
  id: number;
  title: string;
  starts_at: Date;
  minutes: number;
  join_url: string | null;
  status: "scheduled" | "completed" | "cancelled";
  child_name: string | null;
  tutor_name: string | null;
  family_id: number;
  family_name: string;
  staff_id: number | null;
  note_count: number;
  is_upcoming: boolean;
  is_joinable: boolean;
};

// Families only ever count notes shared with them; staff count all notes.
const sessionSelect = (sharedOnly: boolean) => `
  SELECT s.id, s.title, s.starts_at, s.minutes, s.join_url, s.status, s.family_id, s.staff_id,
         c.name AS child_name, st.name AS tutor_name, f.name AS family_name,
         (s.status = 'scheduled' AND s.starts_at + make_interval(mins => s.minutes) > now()) AS is_upcoming,
         (s.status = 'scheduled' AND s.join_url IS NOT NULL AND now() BETWEEN s.starts_at - interval '15 minutes' AND s.starts_at + make_interval(mins => s.minutes)) AS is_joinable,
         (SELECT count(*)::int FROM session_notes n WHERE n.session_id = s.id${sharedOnly ? " AND n.shared_with_family" : ""}) AS note_count
  FROM sessions s
  JOIN families f ON f.id = s.family_id
  LEFT JOIN children c ON c.id = s.child_id
  LEFT JOIN staff st ON st.id = s.staff_id`;
const FAMILY_SESSION_SELECT = sessionSelect(true);
const SESSION_SELECT = sessionSelect(false);

export type NoteRow = {
  id: number;
  session_id: number;
  body: string;
  homework: string | null;
  shared_with_family: boolean;
  created_at: Date;
  author_name: string | null;
  session_title: string;
  session_starts_at: Date;
  child_name: string | null;
};

const NOTE_SELECT = `
  SELECT n.id, n.session_id, n.body, n.homework, n.shared_with_family, n.created_at,
         a.name AS author_name, s.title AS session_title, s.starts_at AS session_starts_at, c.name AS child_name
  FROM session_notes n
  JOIN sessions s ON s.id = n.session_id
  LEFT JOIN staff a ON a.id = n.author_id
  LEFT JOIN children c ON c.id = s.child_id`;

export type Child = { id: number; name: string; year_group: string | null };

export async function familyChildren(familyId: number) {
  return query<Child>("SELECT id, name, year_group FROM children WHERE family_id = $1 ORDER BY name", [familyId]);
}

export async function familyConsultant(family: Family) {
  if (!family.consultant_id) return null;
  return queryOne<{ name: string; email: string }>("SELECT name, email FROM staff WHERE id = $1", [family.consultant_id]);
}

export async function familyUpcoming(familyId: number, limit = 5) {
  return query<SessionRow>(
    `${FAMILY_SESSION_SELECT} WHERE s.family_id = $1 AND s.status = 'scheduled'
     AND s.starts_at + make_interval(mins => s.minutes) > now() ORDER BY s.starts_at LIMIT $2`,
    [familyId, limit],
  );
}

export async function familySessions(familyId: number) {
  return query<SessionRow>(`${FAMILY_SESSION_SELECT} WHERE s.family_id = $1 ORDER BY s.starts_at DESC`, [familyId]);
}

export async function familySession(familyId: number, sessionId: number) {
  return queryOne<SessionRow>(`${FAMILY_SESSION_SELECT} WHERE s.family_id = $1 AND s.id = $2`, [familyId, sessionId]);
}

export async function familyNotes(familyId: number, opts: { sessionId?: number; limit?: number } = {}) {
  return query<NoteRow>(
    `${NOTE_SELECT} WHERE s.family_id = $1 AND n.shared_with_family
     AND ($2::int IS NULL OR n.session_id = $2) ORDER BY n.created_at DESC LIMIT $3`,
    [familyId, opts.sessionId ?? null, opts.limit ?? 200],
  );
}

/* ── Staff queries ─────────────────────────────────────────────────── */

// Tutors only ever see their own sessions; admins and consultants see all.
export async function staffUpcoming(staff: Staff, limit = 20) {
  return query<SessionRow>(
    `${SESSION_SELECT} WHERE s.status = 'scheduled' AND s.starts_at + make_interval(mins => s.minutes) > now()
     AND ($1::int IS NULL OR s.staff_id = $1) ORDER BY s.starts_at LIMIT $2`,
    [canManage(staff) ? null : staff.id, limit],
  );
}

export async function staffPast(staff: Staff, limit = 60) {
  return query<SessionRow>(
    `${SESSION_SELECT} WHERE NOT (s.status = 'scheduled' AND s.starts_at + make_interval(mins => s.minutes) > now())
     AND ($1::int IS NULL OR s.staff_id = $1) ORDER BY s.starts_at DESC LIMIT $2`,
    [canManage(staff) ? null : staff.id, limit],
  );
}

// Finished sessions with no note yet: the tutor's to-do list.
export async function staffNeedingNotes(staff: Staff) {
  return query<SessionRow>(
    `${SESSION_SELECT} WHERE s.status <> 'cancelled' AND s.starts_at + make_interval(mins => s.minutes) < now()
     AND NOT EXISTS (SELECT 1 FROM session_notes n WHERE n.session_id = s.id)
     AND ($1::int IS NULL OR s.staff_id = $1) ORDER BY s.starts_at DESC LIMIT 30`,
    [canManage(staff) ? null : staff.id],
  );
}

export async function staffSession(staff: Staff, sessionId: number) {
  return queryOne<SessionRow>(
    `${SESSION_SELECT} WHERE s.id = $1 AND ($2::int IS NULL OR s.staff_id = $2)`,
    [sessionId, canManage(staff) ? null : staff.id],
  );
}

export async function sessionNotesForStaff(sessionId: number) {
  return query<NoteRow>(`${NOTE_SELECT} WHERE n.session_id = $1 ORDER BY n.created_at DESC`, [sessionId]);
}

export type FamilyListRow = Family & { consultant_name: string | null; child_count: number; next_session: Date | null };

export async function listFamilies() {
  return query<FamilyListRow>(
    `SELECT f.${FAMILY_COLS.split(", ").join(", f.")}, st.name AS consultant_name,
            (SELECT count(*)::int FROM children c WHERE c.family_id = f.id) AS child_count,
            (SELECT min(s.starts_at) FROM sessions s WHERE s.family_id = f.id AND s.status = 'scheduled' AND s.starts_at > now()) AS next_session
     FROM families f LEFT JOIN staff st ON st.id = f.consultant_id ORDER BY f.name`,
  );
}

export async function getFamily(id: number) {
  return queryOne<Family>(`SELECT ${FAMILY_COLS} FROM families WHERE id = $1`, [id]);
}

export async function listStaff() {
  return query<Staff & { active: boolean }>("SELECT id, email, name, role, active FROM staff ORDER BY active DESC, name");
}

/* ── Dashboard figures ─────────────────────────────────────────────── */

export type StaffStats = {
  today: number;
  week: number;
  needs_note: number;
  families: number;
  team: number;
  children: number;
  sessions: number;
  notes: number;
};

// Headline numbers for the staff dashboard. Tutors' figures cover only their own sessions.
export async function staffStats(staff: Staff) {
  return (await queryOne<StaffStats>(
    `SELECT
       (SELECT count(*)::int FROM sessions s WHERE s.status <> 'cancelled' AND ($1::int IS NULL OR s.staff_id = $1)
          AND (s.starts_at AT TIME ZONE 'Europe/London')::date = (now() AT TIME ZONE 'Europe/London')::date) AS today,
       (SELECT count(*)::int FROM sessions s WHERE s.status = 'scheduled' AND ($1::int IS NULL OR s.staff_id = $1)
          AND s.starts_at BETWEEN now() AND now() + interval '7 days') AS week,
       (SELECT count(*)::int FROM sessions s WHERE s.status <> 'cancelled' AND ($1::int IS NULL OR s.staff_id = $1)
          AND s.starts_at + make_interval(mins => s.minutes) < now()
          AND NOT EXISTS (SELECT 1 FROM session_notes n WHERE n.session_id = s.id)) AS needs_note,
       (SELECT count(*)::int FROM families) AS families,
       (SELECT count(*)::int FROM staff WHERE active) AS team,
       (SELECT count(*)::int FROM children) AS children,
       (SELECT count(*)::int FROM sessions) AS sessions,
       (SELECT count(*)::int FROM session_notes) AS notes`,
    [canManage(staff) ? null : staff.id],
  ))!;
}

export async function familyNoteCount(familyId: number) {
  const row = await queryOne<{ n: number }>(
    `SELECT count(*)::int AS n FROM session_notes n JOIN sessions s ON s.id = n.session_id
     WHERE s.family_id = $1 AND n.shared_with_family`,
    [familyId],
  );
  return row?.n ?? 0;
}
