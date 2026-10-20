import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { query, queryOne } from "./db";
import { devAuth, SIGN_IN_PATH, STAFF_SIGN_IN_PATH } from "./config";
import { recordEvent } from "../crm";
import { alertTeam } from "../email";

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
export type Viewer = { userId: string; email: string; firstName: string; fullName: string; staff: Staff | null; family: Family | null };

const FAMILY_COLS = "id, name, email, phone, timezone, consultant_id, clerk_user_id, stripe_customer_id";

async function getIdentity() {
  if (devAuth) {
    const email = (await cookies()).get("portal_dev_email")?.value?.toLowerCase();
    return email ? { userId: `dev:${email}`, email, firstName: email.split("@")[0], fullName: "" } : null;
  }
  const user = await currentUser();
  if (!user) return null;
  const primary = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId);
  // Only a verified address can be matched to a family or staff record.
  if (!primary || primary.verification?.status !== "verified") return null;
  return {
    userId: user.id,
    email: primary.emailAddress.toLowerCase(),
    firstName: user.firstName ?? "",
    fullName: [user.firstName, user.lastName].filter(Boolean).join(" "),
  };
}

const adminEmails = () =>
  (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);

// Someone who has signed up through the client portal with a verified email we do not recognise gets an
// account of their own, so the portal works straight away (purchases made under this email link up
// automatically). They also appear in the CRM as a new lead, and the team is told.
// This runs only when a person reaches the client area, never in the staff area, so a tutor who signs up
// before an admin has added them is not turned into a parent account.
async function createFamilyFor(viewer: Viewer): Promise<Family | null> {
  const { email, userId, firstName } = viewer;
  const name = viewer.fullName || firstName || email.split("@")[0];
  const family = await queryOne<Family>(
    `INSERT INTO families (name, email, clerk_user_id) VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE SET clerk_user_id = COALESCE(families.clerk_user_id, EXCLUDED.clerk_user_id)
     RETURNING ${FAMILY_COLS}`,
    [name, email, userId],
  );
  if (family) {
    try {
      await recordEvent({ name, email, type: "enquiry", summary: "Created a portal account", source: "portal sign-up" });
      await query("UPDATE contacts SET family_id = $1 WHERE lower(email) = $2 AND family_id IS NULL", [family.id, email]);
      await query("UPDATE orders SET family_id = $1 WHERE family_id IS NULL AND lower(customer_email) = $2", [family.id, email]);
      await alertTeam("New portal sign-up", { Name: name, Email: email }, email);
    } catch (error) {
      console.error("Portal sign-up follow-up failed (the account was created)", error);
    }
  }
  return family;
}

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
    // First sign-in: attach any purchases made under this email before the account was linked.
    await query("UPDATE orders SET family_id = $1 WHERE family_id IS NULL AND lower(customer_email) = lower($2)", [family.id, family.email]);
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
  // Only people who are not on the team get a client account made for them.
  if (!viewer.family && !viewer.staff) viewer.family = await createFamilyFor(viewer);
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
  new_contacts: number;
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
       (SELECT count(*)::int FROM session_notes) AS notes,
       (SELECT count(*)::int FROM contacts WHERE stage = 'new') AS new_contacts`,
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

export type OrderRow = {
  id: number;
  product_name: string;
  amount_pence: number | null;
  currency: string;
  recurring: boolean;
  status: "paid" | "payment_failed" | "cancelled";
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  child: string | null;
  family_id: number | null;
  family_name: string | null;
  stripe_session_id: string;
  created_at: Date;
};

// Online purchases, newest first. Admins only (checked by the page).
export async function listOrders(limit = 200) {
  return query<OrderRow>(
    `SELECT o.id, o.product_name, o.amount_pence, o.currency, o.recurring, o.status, o.customer_name, o.customer_email,
            o.customer_phone, o.child, o.family_id, f.name AS family_name, o.stripe_session_id, o.created_at
       FROM orders o LEFT JOIN families f ON f.id = o.family_id
      ORDER BY o.created_at DESC LIMIT $1`,
    [limit],
  );
}

/* ── CRM ───────────────────────────────────────────────────────────── */

export type ContactRow = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  kind: "family" | "ambassador" | "other";
  stage: "new" | "contacted" | "consultation" | "client" | "closed";
  owner_id: number | null;
  owner_name: string | null;
  family_id: number | null;
  source: string | null;
  last_activity_at: Date;
  created_at: Date;
  last_summary: string | null;
};

const CONTACT_SELECT = `
  SELECT c.id, c.name, c.email, c.phone, c.kind, c.stage, c.owner_id, s.name AS owner_name, c.family_id, c.source,
         c.last_activity_at, c.created_at,
         (SELECT a.summary FROM activities a WHERE a.contact_id = c.id AND a.type <> 'stage' ORDER BY a.created_at DESC LIMIT 1) AS last_summary
    FROM contacts c LEFT JOIN staff s ON s.id = c.owner_id`;

export async function listContacts(filter: { stage?: string; q?: string; mine?: number }) {
  const where: string[] = [];
  const params: unknown[] = [];
  if (filter.stage) {
    params.push(filter.stage);
    where.push(`c.stage = $${params.length}`);
  }
  if (filter.q) {
    params.push(`%${filter.q.toLowerCase()}%`);
    where.push(`(lower(c.name) LIKE $${params.length} OR lower(c.email) LIKE $${params.length} OR c.phone LIKE $${params.length})`);
  }
  if (filter.mine) {
    params.push(filter.mine);
    where.push(`c.owner_id = $${params.length}`);
  }
  return query<ContactRow>(
    `${CONTACT_SELECT} ${where.length ? `WHERE ${where.join(" AND ")}` : ""} ORDER BY c.last_activity_at DESC LIMIT 300`,
    params,
  );
}

export async function contactStageCounts() {
  const rows = await query<{ stage: string; count: number }>("SELECT stage, count(*)::int AS count FROM contacts GROUP BY stage");
  return Object.fromEntries(rows.map((r) => [r.stage, r.count])) as Record<string, number>;
}

export async function getContact(id: number) {
  return queryOne<ContactRow>(`${CONTACT_SELECT} WHERE c.id = $1`, [id]);
}

export type ActivityRow = {
  id: number;
  type: "enquiry" | "guide" | "ambassador" | "booking" | "order" | "note" | "call" | "email" | "stage";
  summary: string;
  details: Record<string, string>;
  staff_name: string | null;
  created_at: Date;
};

export async function contactActivities(contactId: number) {
  return query<ActivityRow>(
    `SELECT a.id, a.type, a.summary, a.details, s.name AS staff_name, a.created_at
       FROM activities a LEFT JOIN staff s ON s.id = a.staff_id
      WHERE a.contact_id = $1 ORDER BY a.created_at DESC, a.id DESC`,
    [contactId],
  );
}

export async function contactOrders(email: string) {
  return query<OrderRow>(
    `SELECT o.id, o.product_name, o.amount_pence, o.currency, o.recurring, o.status, o.customer_name, o.customer_email,
            o.customer_phone, o.child, o.family_id, NULL::text AS family_name, o.stripe_session_id, o.created_at
       FROM orders o WHERE lower(o.customer_email) = lower($1) ORDER BY o.created_at DESC`,
    [email],
  );
}

// A family's online purchases, newest first: orders linked to the family, or placed under its email.
export async function familyOrders(family: Family, limit = 100) {
  return query<OrderRow>(
    `SELECT o.id, o.product_name, o.amount_pence, o.currency, o.recurring, o.status, o.customer_name, o.customer_email,
            o.customer_phone, o.child, o.family_id, NULL::text AS family_name, o.stripe_session_id, o.created_at
       FROM orders o WHERE o.family_id = $1 OR lower(o.customer_email) = lower($2)
      ORDER BY o.created_at DESC LIMIT $3`,
    [family.id, family.email, limit],
  );
}

export async function contactIdForFamily(familyId: number) {
  const row = await queryOne<{ id: number }>("SELECT id FROM contacts WHERE family_id = $1", [familyId]);
  return row?.id ?? null;
}

/* ── Admin business overview (everything here is read from data we already store) ── */

export type Overview = {
  money: { month: number; last_month: number; d30: number; all_time: number; mrr: number; orders30: number; failed30: number };
  months: { label: string; pence: number }[];
  funnel: { stage: string; n: number }[];
  leads30: number;
  clients: number;
  contacts: number;
  families: number;
  families30: number;
  children: number;
  delivery: { done30: number; next7: number; needs_note: number; unassigned: number };
  sources: { source: string; n: number }[];
  team: { role: string; n: number }[];
  workload: { name: string; role: string; done30: number; next7: number }[];
  attention: { no_consultant: number; stale_leads: number };
  activity: { id: number; type: string; summary: string; contact_name: string; contact_id: number; created_at: Date }[];
};

export async function adminOverview(): Promise<Overview> {
  const [money, months, funnel, counts, delivery, sources, team, workload, attention, activity] = await Promise.all([
    queryOne<Overview["money"]>(
      `SELECT
         COALESCE(sum(amount_pence) FILTER (WHERE status = 'paid' AND created_at >= date_trunc('month', now())), 0)::int AS month,
         COALESCE(sum(amount_pence) FILTER (WHERE status = 'paid' AND created_at >= date_trunc('month', now()) - interval '1 month' AND created_at < date_trunc('month', now())), 0)::int AS last_month,
         COALESCE(sum(amount_pence) FILTER (WHERE status = 'paid' AND created_at >= now() - interval '30 days'), 0)::int AS d30,
         COALESCE(sum(amount_pence) FILTER (WHERE status = 'paid'), 0)::int AS all_time,
         COALESCE(sum(amount_pence) FILTER (WHERE status = 'paid' AND recurring), 0)::int AS mrr,
         (count(*) FILTER (WHERE status = 'paid' AND created_at >= now() - interval '30 days'))::int AS orders30,
         (count(*) FILTER (WHERE status = 'payment_failed' AND created_at >= now() - interval '30 days'))::int AS failed30
       FROM orders`,
    ),
    query<{ label: string; pence: number }>(
      `SELECT to_char(m, 'Mon') AS label, COALESCE((SELECT sum(amount_pence) FROM orders o WHERE o.status = 'paid'
              AND date_trunc('month', o.created_at) = m), 0)::int AS pence
       FROM generate_series(date_trunc('month', now()) - interval '5 months', date_trunc('month', now()), interval '1 month') AS m ORDER BY m`,
    ),
    query<{ stage: string; n: number }>(
      `SELECT stage, count(*)::int AS n FROM contacts GROUP BY stage`,
    ),
    queryOne<{ leads30: number; clients: number; contacts: number; families: number; families30: number; children: number }>(
      `SELECT
         (SELECT count(*)::int FROM contacts WHERE created_at >= now() - interval '30 days') AS leads30,
         (SELECT count(*)::int FROM contacts WHERE stage = 'client') AS clients,
         (SELECT count(*)::int FROM contacts) AS contacts,
         (SELECT count(*)::int FROM families) AS families,
         (SELECT count(*)::int FROM families WHERE created_at >= now() - interval '30 days') AS families30,
         (SELECT count(*)::int FROM children) AS children`,
    ),
    queryOne<Overview["delivery"]>(
      `SELECT
         (SELECT count(*)::int FROM sessions WHERE status <> 'cancelled' AND starts_at + make_interval(mins => minutes) < now() AND starts_at >= now() - interval '30 days') AS done30,
         (SELECT count(*)::int FROM sessions WHERE status = 'scheduled' AND starts_at BETWEEN now() AND now() + interval '7 days') AS next7,
         (SELECT count(*)::int FROM sessions s WHERE s.status <> 'cancelled' AND s.starts_at + make_interval(mins => s.minutes) < now()
            AND NOT EXISTS (SELECT 1 FROM session_notes n WHERE n.session_id = s.id)) AS needs_note,
         (SELECT count(*)::int FROM sessions WHERE status = 'scheduled' AND staff_id IS NULL AND starts_at > now()) AS unassigned`,
    ),
    query<{ source: string; n: number }>(
      `SELECT COALESCE(NULLIF(source, ''), 'Not recorded') AS source, count(*)::int AS n FROM contacts
       WHERE created_at >= now() - interval '90 days' GROUP BY 1 ORDER BY n DESC LIMIT 6`,
    ),
    query<{ role: string; n: number }>("SELECT role, count(*)::int AS n FROM staff WHERE active GROUP BY role ORDER BY role"),
    query<Overview["workload"][number]>(
      `SELECT st.name, st.role,
         (SELECT count(*)::int FROM sessions s WHERE s.staff_id = st.id AND s.status <> 'cancelled' AND s.starts_at + make_interval(mins => s.minutes) < now() AND s.starts_at >= now() - interval '30 days') AS done30,
         (SELECT count(*)::int FROM sessions s WHERE s.staff_id = st.id AND s.status = 'scheduled' AND s.starts_at BETWEEN now() AND now() + interval '7 days') AS next7
       FROM staff st WHERE st.active AND st.role IN ('tutor', 'consultant') ORDER BY done30 DESC, st.name LIMIT 10`,
    ),
    queryOne<Overview["attention"]>(
      `SELECT
         (SELECT count(*)::int FROM families WHERE consultant_id IS NULL) AS no_consultant,
         (SELECT count(*)::int FROM contacts WHERE stage IN ('new', 'contacted') AND last_activity_at < now() - interval '3 days') AS stale_leads`,
    ),
    query<Overview["activity"][number]>(
      `SELECT a.id, a.type, a.summary, c.name AS contact_name, c.id AS contact_id, a.created_at
       FROM activities a JOIN contacts c ON c.id = a.contact_id ORDER BY a.created_at DESC LIMIT 15`,
    ),
  ]);
  return {
    money: money!,
    months,
    funnel: funnel.map((f) => ({ stage: f.stage, n: f.n })),
    ...counts!,
    delivery: delivery!,
    sources,
    team,
    workload,
    attention: attention!,
    activity,
  };
}
