"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query, queryOne } from "../../lib/portal/db";
import { requireStaff } from "../../lib/portal/dal";
import { sendEmail, teamInbox } from "../../lib/email";
import { EMAIL } from "../../lib/site";

// Staff confirm or cancel the free consultation times families request on the website.
// Cancelling frees the time for someone else.
const PATH = "/portal/admin/consultations";
const MANAGERS = ["admin", "consultant"] as const;

function back(msg: { ok?: string; error?: string }): never {
  redirect(`${PATH}?${new URLSearchParams(msg as Record<string, string>).toString()}`);
}

const whenOf = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Europe/London" }).format(new Date(d));

async function setStatus(fd: FormData, status: "confirmed" | "cancelled") {
  await requireStaff([...MANAGERS]);
  const id = Number(fd.get("id"));
  if (!Number.isInteger(id) || id <= 0) back({ error: "Request not found." });
  const row = await queryOne<{ name: string; email: string; starts_at: Date }>(
    `UPDATE consultation_requests SET status = $2 WHERE id = $1 AND status <> $2 AND status <> 'cancelled' RETURNING name, email, starts_at`,
    [id, status],
  );
  if (!row) back({ error: "That request has already been handled." });
  const first = row.name.split(" ")[0];
  const text = status === "confirmed"
    ? `Hello ${first},\n\nYour free consultation is confirmed for ${whenOf(row.starts_at)} (UK time). We'll send the call details before then. If you need to change it, just reply to this email or write to ${EMAIL}.\n\nBritannia Crown`
    : `Hello ${first},\n\nSorry, we can't do ${whenOf(row.starts_at)} (UK time) for your free consultation after all. Please book another time at https://www.britanniacrown.com/book-consultation or reply to this email and we'll find one with you.\n\nBritannia Crown`;
  try {
    await sendEmail({ to: [row.email], subject: status === "confirmed" ? "Your free consultation is confirmed | Britannia Crown" : "About your free consultation | Britannia Crown", text, replyTo: teamInbox()[0] });
  } catch (error) {
    console.error("Consultation email not sent (the change is saved)", error);
  }
  revalidatePath(PATH);
  back({ ok: status === "confirmed" ? "Confirmed. The family has been emailed." : "Cancelled. The time is free again and the family has been emailed." });
}

export async function confirmConsultation(fd: FormData) {
  await setStatus(fd, "confirmed");
}

export async function cancelConsultation(fd: FormData) {
  await setStatus(fd, "cancelled");
}

export type ConsultationRow = { id: number; starts_at: Date; name: string; email: string; status: string; created_at: Date };

export const listConsultations = () =>
  query<ConsultationRow>(
    `SELECT id, starts_at, name, email, status, created_at FROM consultation_requests
     WHERE status <> 'cancelled' AND starts_at > now() - interval '1 day' ORDER BY starts_at`,
  );
