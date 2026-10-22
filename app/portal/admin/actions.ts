"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query, queryOne } from "../../lib/portal/db";
import { requireStaff, staffSession, canManage, type Role } from "../../lib/portal/dal";
import { TIMEZONES, zonedToUtc } from "../../lib/portal/time";

// Every action re-checks who is calling: the forms are only shown to the right people,
// but a server action can be called directly, so the check here is what actually protects data.

const MANAGERS: Role[] = ["admin", "consultant"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function back(path: string, msg: { ok?: string; error?: string }): never {
  const qs = new URLSearchParams(msg as Record<string, string>).toString();
  redirect(`${path}${path.includes("?") ? "&" : "?"}${qs}`);
}

const str = (fd: FormData, key: string, max = 500) => String(fd.get(key) ?? "").trim().slice(0, max);
const int = (fd: FormData, key: string) => {
  const n = Number(fd.get(key));
  return Number.isInteger(n) && n > 0 ? n : null;
};
const validTz = (tz: string) => TIMEZONES.some((t) => t.id === tz);
const safeUrl = (u: string) => {
  if (!u) return null;
  try {
    const url = new URL(u);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
};

/* ── Families ──────────────────────────────────────────────────────── */

export async function saveFamily(fd: FormData) {
  await requireStaff(MANAGERS);
  const id = int(fd, "id");
  const name = str(fd, "name", 120);
  const email = str(fd, "email", 200).toLowerCase();
  const phone = str(fd, "phone", 40) || null;
  const timezone = str(fd, "timezone");
  const consultantId = int(fd, "consultant_id");
  const returnTo = id ? `/portal/admin/families/${id}` : "/portal/admin/families";

  if (!name || !EMAIL_RE.test(email)) back(returnTo, { error: "Please enter a family name and a valid email address." });
  if (!validTz(timezone)) back(returnTo, { error: "Please choose a time zone." });

  try {
    if (id) {
      // Changing the email unlinks the old login, so the new address can sign in.
      await query(
        `UPDATE families SET name = $1, email = $2, phone = $3, timezone = $4, consultant_id = $5,
         clerk_user_id = CASE WHEN lower(email) = $2 THEN clerk_user_id ELSE NULL END WHERE id = $6`,
        [name, email, phone, timezone, consultantId, id],
      );
    } else {
      const row = await queryOne<{ id: number }>(
        "INSERT INTO families (name, email, phone, timezone, consultant_id) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [name, email, phone, timezone, consultantId],
      );
      revalidatePath("/portal/admin", "layout");
      back(`/portal/admin/families/${row!.id}`, { ok: "Family added. Ask them to sign in with this email address." });
    }
  } catch (e) {
    if ((e as { code?: string }).code === "23505") back(returnTo, { error: "Another family already uses that email address." });
    throw e;
  }
  revalidatePath("/portal/admin", "layout");
  back(returnTo, { ok: "Family details saved." });
}

export async function deleteFamily(fd: FormData) {
  await requireStaff(["admin"]);
  const id = int(fd, "id");
  if (!id) back("/portal/admin/families", { error: "Family not found." });

  const family = await queryOne<{ name: string }>(
    "DELETE FROM families WHERE id = $1 RETURNING name",
    [id],
  );
  if (!family) back("/portal/admin/families", { error: "Family not found." });

  revalidatePath("/portal/admin", "layout");
  back("/portal/admin/families", { ok: `${family.name} was deleted.` });
}

export async function addChild(fd: FormData) {
  await requireStaff(MANAGERS);
  const familyId = int(fd, "family_id");
  const name = str(fd, "name", 80);
  const yearGroup = str(fd, "year_group", 60) || null;
  if (!familyId) back("/portal/admin/families", { error: "Family not found." });
  if (!name) back(`/portal/admin/families/${familyId}`, { error: "Please enter the child's name." });
  await query("INSERT INTO children (family_id, name, year_group) VALUES ($1, $2, $3)", [familyId, name, yearGroup]);
  revalidatePath(`/portal/admin/families/${familyId}`);
  back(`/portal/admin/families/${familyId}`, { ok: `${name} added.` });
}

export async function removeChild(fd: FormData) {
  await requireStaff(MANAGERS);
  const id = int(fd, "id");
  const familyId = int(fd, "family_id");
  await query("DELETE FROM children WHERE id = $1 AND family_id = $2", [id, familyId]);
  revalidatePath(`/portal/admin/families/${familyId}`);
  back(`/portal/admin/families/${familyId}`, { ok: "Child removed." });
}

/* ── Sessions ──────────────────────────────────────────────────────── */

export async function scheduleSession(fd: FormData) {
  await requireStaff(MANAGERS);
  const familyId = int(fd, "family_id");
  if (!familyId) back("/portal/admin/families", { error: "Family not found." });
  const path = `/portal/admin/families/${familyId}`;

  const title = str(fd, "title", 120);
  const childId = int(fd, "child_id");
  const staffId = int(fd, "staff_id");
  const minutes = Number(fd.get("minutes"));
  const tz = str(fd, "timezone");
  const joinUrl = safeUrl(str(fd, "join_url", 500));
  const repeat = Math.min(Math.max(Number(fd.get("repeat_weeks")) || 1, 1), 12);
  const start = validTz(tz) ? zonedToUtc(str(fd, "starts_at"), tz) : null;

  if (!title) back(path, { error: "Please give the session a title, for example \"GCSE Maths\"." });
  if (!start) back(path, { error: "Please choose a valid date and time." });
  if (!Number.isInteger(minutes) || minutes < 5 || minutes > 480) back(path, { error: "Length must be between 5 and 480 minutes." });
  if (joinUrl === undefined) back(path, { error: "The joining link must start with https://" });
  if (childId) {
    const child = await queryOne("SELECT 1 FROM children WHERE id = $1 AND family_id = $2", [childId, familyId]);
    if (!child) back(path, { error: "That child isn't in this family." });
  }

  for (let week = 0; week < repeat; week++) {
    const startsAt = new Date(start!.getTime() + week * 7 * 24 * 60 * 60 * 1000);
    await query(
      "INSERT INTO sessions (family_id, child_id, staff_id, title, starts_at, minutes, join_url) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [familyId, childId, staffId, title, startsAt, minutes, joinUrl],
    );
  }
  revalidatePath("/portal", "layout");
  back(path, { ok: repeat > 1 ? `${repeat} weekly sessions scheduled.` : "Session scheduled." });
}

export async function updateSession(fd: FormData) {
  const { staff } = await requireStaff();
  const id = int(fd, "id");
  const session = id ? await staffSession(staff, id) : null;
  if (!session) back("/portal/admin", { error: "Session not found." });
  const path = `/portal/admin/sessions/${id}`;

  const status = str(fd, "status");
  if (!["scheduled", "completed", "cancelled"].includes(status)) back(path, { error: "Unknown status." });

  if (canManage(staff)) {
    const joinUrl = safeUrl(str(fd, "join_url", 500));
    if (joinUrl === undefined) back(path, { error: "The joining link must start with https://" });
    await query("UPDATE sessions SET status = $1, join_url = $2, staff_id = $3 WHERE id = $4", [status, joinUrl, int(fd, "staff_id"), id]);
  } else {
    // Tutors can only update the status of their own sessions.
    await query("UPDATE sessions SET status = $1 WHERE id = $2 AND staff_id = $3", [status, id, staff.id]);
  }
  revalidatePath("/portal", "layout");
  back(path, { ok: "Session updated." });
}

/* ── Notes ─────────────────────────────────────────────────────────── */

export async function addNote(fd: FormData) {
  const { staff } = await requireStaff();
  const sessionId = int(fd, "session_id");
  const session = sessionId ? await staffSession(staff, sessionId) : null;
  if (!session) back("/portal/admin", { error: "Session not found." });
  const path = `/portal/admin/sessions/${sessionId}`;

  const body = str(fd, "body", 5000);
  const homework = str(fd, "homework", 2000) || null;
  const shared = fd.get("shared_with_family") === "on";
  if (!body) back(path, { error: "Please write a note before saving." });

  await query(
    "INSERT INTO session_notes (session_id, author_id, body, homework, shared_with_family) VALUES ($1, $2, $3, $4, $5)",
    [sessionId, staff.id, body, homework, shared],
  );
  // Writing up a session that has ended marks it as completed (not one still in progress,
  // so the family keeps their joining link until the end).
  await query(
    "UPDATE sessions SET status = 'completed' WHERE id = $1 AND status = 'scheduled' AND starts_at + make_interval(mins => minutes) < now()",
    [sessionId],
  );
  revalidatePath("/portal", "layout");
  back(path, { ok: shared ? "Note saved and shared with the family." : "Internal note saved." });
}

export async function deleteNote(fd: FormData) {
  const { staff } = await requireStaff();
  const id = int(fd, "id");
  const sessionId = int(fd, "session_id");
  // Authors can delete their own notes; managers can delete any.
  await query("DELETE FROM session_notes WHERE id = $1 AND session_id = $2 AND ($3 OR author_id = $4)", [id, sessionId, canManage(staff), staff.id]);
  revalidatePath("/portal", "layout");
  back(`/portal/admin/sessions/${sessionId}`, { ok: "Note deleted." });
}

/* ── Staff (admins only) ───────────────────────────────────────────── */

export async function saveStaff(fd: FormData) {
  const { staff: me } = await requireStaff(["admin"]);
  const id = int(fd, "id");
  const role = str(fd, "role") as Role;
  if (!["admin", "consultant", "tutor"].includes(role)) back("/portal/admin/staff", { error: "Choose a role." });

  if (id) {
    const active = fd.get("active") === "on";
    if (id === me.id && (!active || role !== "admin")) back("/portal/admin/staff", { error: "You can't remove your own admin access." });
    await query("UPDATE staff SET role = $1, active = $2 WHERE id = $3", [role, active, id]);
    revalidatePath("/portal/admin", "layout");
    back("/portal/admin/staff", { ok: "Team member updated." });
  }

  const name = str(fd, "name", 120);
  const email = str(fd, "email", 200).toLowerCase();
  if (!name || !EMAIL_RE.test(email)) back("/portal/admin/staff", { error: "Please enter a name and a valid email address." });
  try {
    await query("INSERT INTO staff (email, name, role) VALUES ($1, $2, $3)", [email, name, role]);
  } catch (e) {
    if ((e as { code?: string }).code === "23505") back("/portal/admin/staff", { error: "That email address is already on the team." });
    throw e;
  }
  revalidatePath("/portal/admin", "layout");
  back("/portal/admin/staff", { ok: `${name} added. They can sign in with ${email}.` });
}

export async function deleteStaff(fd: FormData) {
  const { staff: me } = await requireStaff(["admin"]);
  const id = int(fd, "id");
  if (!id) back("/portal/admin/staff", { error: "Team member not found." });
  if (id === me.id) back("/portal/admin/staff", { error: "You can't delete your own account." });
  const person = await queryOne<{ name: string; role: Role; active: boolean }>("SELECT name, role, active FROM staff WHERE id = $1", [id]);
  if (!person) back("/portal/admin/staff", { error: "Team member not found." });
  if (person!.role === "admin" && person!.active) {
    const others = await queryOne<{ n: number }>("SELECT count(*)::int AS n FROM staff WHERE role = 'admin' AND active AND id <> $1", [id]);
    if (!others || others.n < 1) back("/portal/admin/staff", { error: "There must be at least one active admin." });
  }
  // Their lessons stay but show as not assigned; families lose this consultant; notes keep their text.
  await query("DELETE FROM staff WHERE id = $1", [id]);
  revalidatePath("/portal", "layout");
  back("/portal/admin/staff", { ok: `${person!.name} was deleted. Their lessons now show as not assigned.` });
}
