"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query, queryOne } from "../../lib/portal/db";
import { requireStaff } from "../../lib/portal/dal";
import { sendEmail } from "../../lib/email";
import { zonedToUtc } from "../../lib/portal/time";
import { SITE_URL } from "../../lib/site";

// Admins approve a family's lesson request and assign who teaches it, or decline it with a note.
const PATH = "/portal/admin/requests";
const TZ = "Europe/London";
const str = (fd: FormData, key: string, max = 500) => String(fd.get(key) ?? "").trim().slice(0, max);
const num = (fd: FormData, key: string) => {
  const n = Number(fd.get(key));
  return Number.isInteger(n) && n > 0 ? n : null;
};
function back(msg: { ok?: string; error?: string }): never {
  redirect(`${PATH}?${new URLSearchParams(msg as Record<string, string>).toString()}`);
}

async function tellFamily(to: string, subject: string, text: string) {
  try {
    await sendEmail({ to: [to], subject, text });
  } catch (error) {
    console.error("Lesson request email not sent (the decision is saved)", error);
  }
}

export async function approveRequest(fd: FormData) {
  const { staff } = await requireStaff(["admin"]);
  const id = num(fd, "id");
  const staffId = num(fd, "staff_id");
  const minutes = Number(fd.get("minutes"));
  const start = zonedToUtc(str(fd, "starts_at"), TZ);
  const repeat = Math.min(Math.max(Number(fd.get("repeat_weeks")) || 1, 1), 12);
  const joinRaw = str(fd, "join_url");
  let joinUrl: string | null = null;
  if (joinRaw) {
    try {
      const u = new URL(joinRaw);
      if (u.protocol !== "https:") back({ error: "The joining link must start with https://" });
      joinUrl = u.toString();
    } catch {
      back({ error: "The joining link must start with https://" });
    }
  }
  if (!id) back({ error: "Request not found." });
  if (!staffId) back({ error: "Choose who will teach this lesson." });
  if (!start) back({ error: "Please choose a date and time." });
  if (!Number.isInteger(minutes) || minutes < 5 || minutes > 480) back({ error: "Length must be between 5 and 480 minutes." });

  const request = await queryOne<{ id: number; family_id: number; child_id: number | null; subject: string; family_name: string; family_email: string }>(
    `SELECT r.id, r.family_id, r.child_id, r.subject, f.name AS family_name, f.email AS family_email
     FROM lesson_requests r JOIN families f ON f.id = r.family_id WHERE r.id = $1 AND r.status = 'pending'`,
    [id],
  );
  if (!request) back({ error: "That request has already been handled." });
  const teacher = await queryOne<{ name: string }>("SELECT name FROM staff WHERE id = $1 AND active", [staffId]);
  if (!teacher) back({ error: "That person isn't active." });

  const title = str(fd, "title", 120) || request!.subject;
  let first: number | null = null;
  for (let week = 0; week < repeat; week++) {
    const row = await queryOne<{ id: number }>(
      "INSERT INTO sessions (family_id, child_id, staff_id, title, starts_at, minutes, join_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      [request!.family_id, request!.child_id, staffId, title, new Date(start!.getTime() + week * 7 * 86400000), minutes, joinUrl],
    );
    first ??= row?.id ?? null;
  }
  await query("UPDATE lesson_requests SET status = 'approved', handled_by = $1, handled_at = now() WHERE id = $2", [staff.id, id]);
  await tellFamily(
    request!.family_email,
    "Your lesson is confirmed | Britannia Crown",
    `Hello ${request!.family_name.split(" ")[0]},\n\nYour lesson request for ${request!.subject} has been approved and scheduled with ${teacher!.name}. You can see the time and joining link under Sessions in your portal:\n${SITE_URL}/portal/sessions\n\nBritannia Crown`,
  );
  revalidatePath("/portal", "layout");
  back({ ok: repeat > 1 ? `Approved. ${repeat} weekly lessons scheduled with ${teacher!.name}.` : `Approved and scheduled with ${teacher!.name}.` });
}

export async function declineRequest(fd: FormData) {
  const { staff } = await requireStaff(["admin"]);
  const id = num(fd, "id");
  const note = str(fd, "note", 300);
  if (!id) back({ error: "Request not found." });
  const request = await queryOne<{ subject: string; family_name: string; family_email: string }>(
    `SELECT r.subject, f.name AS family_name, f.email AS family_email FROM lesson_requests r JOIN families f ON f.id = r.family_id WHERE r.id = $1 AND r.status = 'pending'`,
    [id],
  );
  if (!request) back({ error: "That request has already been handled." });
  await query("UPDATE lesson_requests SET status = 'declined', decision_note = $1, handled_by = $2, handled_at = now() WHERE id = $3", [note || null, staff.id, id]);
  await tellFamily(
    request!.family_email,
    "About your lesson request | Britannia Crown",
    `Hello ${request!.family_name.split(" ")[0]},\n\nWe can't go ahead with your lesson request for ${request!.subject} just yet.${note ? `\n\n${note}` : ""}\n\nYour consultant will be in touch, or you can reply to this email.\n\nBritannia Crown`,
  );
  revalidatePath("/portal", "layout");
  back({ ok: "Request declined and the family has been told." });
}
