"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query, queryOne } from "../../lib/portal/db";
import { requireStaff } from "../../lib/portal/dal";
import { zonedToUtc } from "../../lib/portal/time";

// Admin and consultant actions for assigning work and amending a person's calendar.
// Each one re-checks the caller, because a server action can be called directly.

const TZ = "Europe/London";

function back(path: string, msg: { ok?: string; error?: string }): never {
  const qs = new URLSearchParams(msg as Record<string, string>).toString();
  redirect(`${path}${path.includes("?") ? "&" : "?"}${qs}`);
}
const num = (fd: FormData, key: string) => {
  const n = Number(fd.get(key));
  return Number.isInteger(n) && n > 0 ? n : null;
};
// Only return to a profile page on this site.
const returnTo = (fd: FormData) => {
  const p = String(fd.get("return") ?? "");
  return /^\/portal\/admin\/team\/\d+(\?[\w=&-]*)?$/.test(p) ? p : "/portal/admin";
};

export async function assignFamilyToConsultant(fd: FormData) {
  await requireStaff(["admin", "consultant"]);
  const path = returnTo(fd);
  const familyId = num(fd, "family_id");
  const staffId = num(fd, "staff_id"); // null = remove the consultant
  if (!familyId) back(path, { error: "Family not found." });
  if (staffId) {
    const target = await queryOne("SELECT 1 FROM staff WHERE id = $1 AND active AND role IN ('admin', 'consultant')", [staffId]);
    if (!target) back(path, { error: "Families can only be assigned to an active consultant or admin." });
  }
  await query("UPDATE families SET consultant_id = $1 WHERE id = $2", [staffId, familyId]);
  revalidatePath("/portal", "layout");
  back(path, { ok: staffId ? "Family assigned." : "Family unassigned." });
}

export async function assignSessionToStaff(fd: FormData) {
  await requireStaff(["admin", "consultant"]);
  const path = returnTo(fd);
  const sessionId = num(fd, "session_id");
  const staffId = num(fd, "staff_id");
  if (!sessionId || !staffId) back(path, { error: "Choose a lesson and a person." });
  const target = await queryOne("SELECT 1 FROM staff WHERE id = $1 AND active", [staffId]);
  if (!target) back(path, { error: "That person isn't active." });
  await query("UPDATE sessions SET staff_id = $1 WHERE id = $2", [staffId, sessionId]);
  revalidatePath("/portal", "layout");
  back(path, { ok: "Lesson assigned." });
}

export async function amendSession(fd: FormData) {
  await requireStaff(["admin", "consultant"]);
  const path = returnTo(fd);
  const id = num(fd, "id");
  const minutes = Number(fd.get("minutes"));
  const status = String(fd.get("status") ?? "");
  const start = zonedToUtc(String(fd.get("starts_at") ?? ""), TZ);
  const staffId = num(fd, "staff_id");
  if (!id) back(path, { error: "Lesson not found." });
  if (!start) back(path, { error: "Please choose a valid date and time." });
  if (!Number.isInteger(minutes) || minutes < 5 || minutes > 480) back(path, { error: "Length must be between 5 and 480 minutes." });
  if (!["scheduled", "completed", "cancelled"].includes(status)) back(path, { error: "Unknown status." });
  if (staffId) {
    const target = await queryOne("SELECT 1 FROM staff WHERE id = $1 AND active", [staffId]);
    if (!target) back(path, { error: "That person isn't active." });
  }
  await query("UPDATE sessions SET starts_at = $1, minutes = $2, status = $3, staff_id = $4 WHERE id = $5", [start, minutes, status, staffId, id]);
  revalidatePath("/portal", "layout");
  back(path, { ok: "Lesson updated." });
}
