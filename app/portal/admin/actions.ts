"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query, queryOne } from "../../lib/portal/db";
import { requireStaff, staffSession, canManage, type Role } from "../../lib/portal/dal";
import { TIMEZONES, zonedToUtc } from "../../lib/portal/time";
import { logActivity } from "../../lib/portal/audit";

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
  const { staff: me } = await requireStaff(MANAGERS);
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
  await logActivity({ kind: "staff", id: me.id, name: me.name, role: me.role }, "session.schedule", {
    familyId,
    detail: `${title}, ${start!.toISOString().slice(0, 16).replace("T", " ")} UTC${repeat > 1 ? `, weekly x${repeat}` : ""}`,
  });
  revalidatePath("/portal", "layout");
  back(path, { ok: repeat > 1 ? `${repeat} weekly sessions scheduled.` : "Session scheduled." });
}

const STATUS_LABEL: Record<string, string> = { scheduled: "Scheduled", completed: "Completed", cancelled: "Cancelled" };

export async function updateSession(fd: FormData) {
  const { staff } = await requireStaff();
  const id = int(fd, "id");
  const session = id ? await staffSession(staff, id) : null;
  if (!session) back("/portal/admin", { error: "Session not found." });
  const path = `/portal/admin/sessions/${id}`;
  const isAdmin = staff.role === "admin";
  const actor = { kind: "staff" as const, id: staff.id, name: staff.name, role: staff.role };

  const status = str(fd, "status");
  if (!["scheduled", "completed", "cancelled"].includes(status)) back(path, { error: "Unknown status." });
  // Only admins can mark a lesson completed (or change one that is already completed). For everyone else
  // it completes automatically once they have joined the lesson and its time has ended.
  if (!isAdmin && status === "completed" && session.status !== "completed") back(path, { error: "Lessons are marked completed automatically once you've taught them in the portal." });
  if (!isAdmin && session.status === "completed" && status !== "completed") back(path, { error: "This lesson is completed. Ask an admin if it needs changing." });

  // A cancellation must say who cancelled it.
  const cancelledBy = str(fd, "cancelled_by", 160);
  if (status === "cancelled" && session.status !== "cancelled" && !cancelledBy) back(path, { error: "Please choose who cancelled the lesson." });

  if (canManage(staff)) {
    const joinUrl = safeUrl(str(fd, "join_url", 500));
    if (joinUrl === undefined) back(path, { error: "The joining link must start with https://" });
    const newStaffId = int(fd, "staff_id");
    await query("UPDATE sessions SET join_url = $1, staff_id = $2 WHERE id = $3", [joinUrl, newStaffId, id]);
    if ((newStaffId ?? null) !== (session.staff_id ?? null)) {
      const who = newStaffId ? (await queryOne<{ name: string }>("SELECT name FROM staff WHERE id = $1", [newStaffId]))?.name : null;
      await logActivity(actor, "session.assign", { familyId: session.family_id, sessionId: id, detail: `${session.title}: now taught by ${who ?? "nobody (unassigned)"}, was ${session.tutor_name ?? "unassigned"}` });
    }
  } else if (session.staff_id !== staff.id) {
    back(path, { error: "Only the person teaching this lesson can update it." });
  }

  if (status !== session.status) {
    await query(
      `UPDATE sessions SET status = $1,
         cancelled_by = CASE WHEN $1 = 'cancelled' THEN $2 ELSE NULL END,
         cancelled_at = CASE WHEN $1 = 'cancelled' THEN now() ELSE NULL END
       WHERE id = $3`,
      [status, cancelledBy || null, id],
    );
    await logActivity(actor, "session.status", {
      familyId: session.family_id,
      sessionId: id,
      detail: `${session.title}: ${STATUS_LABEL[session.status]} → ${STATUS_LABEL[status]}${status === "cancelled" ? ` (cancelled by ${cancelledBy})` : ""}`,
    });
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
  // Saved from the lesson room, the tutor goes back to the room; otherwise to the lesson page.
  const path = fd.get("from") === "room" ? `/portal/admin/sessions/${sessionId}/room` : `/portal/admin/sessions/${sessionId}`;

  const body = str(fd, "body", 5000);
  const homework = str(fd, "homework", 2000) || null;
  const shared = fd.get("shared_with_family") === "on";
  if (!body) back(path, { error: "Please write a note before saving." });

  await query(
    "INSERT INTO session_notes (session_id, author_id, body, homework, shared_with_family) VALUES ($1, $2, $3, $4, $5)",
    [sessionId, staff.id, body, homework, shared],
  );
  // The live draft has become a real note, so clear it.
  await query("DELETE FROM session_note_drafts WHERE session_id = $1 AND author_id = $2", [sessionId, staff.id]);
  // Lessons are no longer completed by writing a note; see completeFinishedLessons.
  await logActivity({ kind: "staff", id: staff.id, name: staff.name, role: staff.role }, "note.add", {
    familyId: session.family_id,
    sessionId,
    detail: `${session.title} (${shared ? "shared with the family" : "team only"})`,
  });
  revalidatePath("/portal", "layout");
  back(path, { ok: shared ? "Note saved and shared with the family." : "Internal note saved." });
}

// Autosaves the tutor's live notes from the lesson room. Called every few seconds while they type,
// so it returns a result instead of redirecting.
export async function saveNoteDraft(sessionId: number, body: string, homework: string) {
  const { staff } = await requireStaff();
  const session = Number.isInteger(sessionId) ? await staffSession(staff, sessionId) : null;
  if (!session) return { ok: false as const };
  await query(
    `INSERT INTO session_note_drafts (session_id, author_id, body, homework, updated_at) VALUES ($1, $2, $3, $4, now())
     ON CONFLICT (session_id, author_id) DO UPDATE SET body = EXCLUDED.body, homework = EXCLUDED.homework, updated_at = now()`,
    [sessionId, staff.id, body.slice(0, 5000), homework.slice(0, 2000)],
  );
  return { ok: true as const, savedAt: new Date().toISOString() };
}

export async function deleteNote(fd: FormData) {
  const { staff } = await requireStaff();
  const id = int(fd, "id");
  const sessionId = int(fd, "session_id");
  // Authors can delete their own notes; managers can delete any.
  const removed = await queryOne<{ family_id: number; title: string }>(
    `DELETE FROM session_notes n USING sessions s WHERE n.id = $1 AND n.session_id = $2 AND s.id = n.session_id AND ($3 OR n.author_id = $4)
     RETURNING s.family_id, s.title`,
    [id, sessionId, canManage(staff), staff.id],
  );
  if (removed) await logActivity({ kind: "staff", id: staff.id, name: staff.name, role: staff.role }, "note.delete", { familyId: removed.family_id, sessionId, detail: removed.title });
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
    // Adding someone by hand also settles any team application they made.
    await query("UPDATE staff_applicants SET status = 'approved', decided_at = now() WHERE lower(email) = $1 AND status = 'pending'", [email]);
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

// Marks a family's notes to the team as read, so the family sees "Read by the team".
export async function markFamilyNotesSeen(fd: FormData) {
  const { staff } = await requireStaff(MANAGERS);
  const familyId = int(fd, "family_id");
  if (!familyId) back("/portal/admin/families", { error: "Family not found." });
  // Admins mark every note read; anyone else only the notes they can see (sent to them, or to everyone).
  await query(
    `UPDATE family_notes SET seen_at = now(), seen_by = $1
      WHERE family_id = $2 AND seen_at IS NULL
        AND ($3 OR recipient_kind = 'everyone' OR (recipient_kind = 'staff' AND recipient_id = $1))`,
    [staff.id, familyId, staff.role === "admin"],
  );
  revalidatePath("/portal", "layout");
  back(`/portal/admin/families/${familyId}#from-family`, { ok: "Marked as read. The family can see their note has been read." });
}
