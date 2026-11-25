"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query, queryOne } from "../../../lib/portal/db";
import { requireFamily, FAMILY_NOTE_TOPICS, familyTeamMembers } from "../../../lib/portal/dal";
import { alertTeam, sendEmail } from "../../../lib/email";
import { logActivity } from "../../../lib/portal/audit";
import { recordEvent } from "../../../lib/crm";

// A family leaves a note for one of their tutors or consultants, or the admin team only.
// Admins always see every note (and are emailed); the chosen person sees it and is emailed too.
const PATH = "/portal/notes-for-team";
const str = (fd: FormData, key: string, max: number) => String(fd.get(key) ?? "").trim().slice(0, max);

function back(msg: { ok?: string; error?: string }): never {
  redirect(`${PATH}?${new URLSearchParams(msg as Record<string, string>).toString()}`);
}

export async function addFamilyNote(fd: FormData) {
  const { family } = await requireFamily();
  const topic = str(fd, "topic", 60);
  const body = str(fd, "body", 3000);
  const childId = Number(fd.get("child_id"));
  // "admin" or "staff:<id>", where the person must be connected to this family.
  const to = str(fd, "recipient", 40);
  const team = await familyTeamMembers(family.id);
  const recipient = to.startsWith("staff:") ? team.find((m) => m.id === Number(to.slice(6))) : null;
  if (to !== "admin" && !recipient) back({ error: "Please choose who should see your note." });
  if (!FAMILY_NOTE_TOPICS.includes(topic)) back({ error: "Please choose what your note is about." });
  if (body.length < 3) back({ error: "Please write your note before sending." });

  // The child must belong to this family.
  const child = Number.isInteger(childId) && childId > 0
    ? await queryOne<{ id: number; name: string }>("SELECT id, name FROM children WHERE id = $1 AND family_id = $2", [childId, family.id])
    : null;

  await query(
    "INSERT INTO family_notes (family_id, child_id, topic, body, recipient_kind, recipient_id) VALUES ($1, $2, $3, $4, $5, $6)",
    [family.id, child?.id ?? null, topic, body, recipient ? "staff" : "admin", recipient?.id ?? null],
  );
  const sentTo = recipient ? recipient.name : "the admin team";
  if (recipient) {
    try {
      const email = await queryOne<{ email: string }>("SELECT email FROM staff WHERE id = $1", [recipient.id]);
      if (email) {
        await sendEmail({
          to: [email.email],
          subject: `Note from ${family.name}: ${topic} | Britannia Crown`,
          text: `${family.name} sent you a note from their client portal${child ? ` about ${child.name}` : ""}:\n\n${body}\n\nReply to this email to answer them directly, or see it on the family's page in the staff area.`,
          replyTo: family.email,
        });
      }
    } catch (error) {
      console.error("Note email to team member not sent (saved in the portal)", error);
    }
  }
  await logActivity({ kind: "family", id: family.id, name: family.name }, "family.note", { familyId: family.id, detail: `${topic}, for ${sentTo}` });
  try {
    await recordEvent({ name: family.name, email: family.email, type: "note", summary: `Note from the family (${topic}${child ? `, about ${child.name}` : ""}): ${body}`.slice(0, 1000) });
  } catch (error) {
    console.error("Could not add the family note to the CRM", error);
  }
  await alertTeam(
    `Note from a family: ${topic}`,
    { Family: family.name, Email: family.email, "Sent to": sentTo, Child: child?.name, Note: body, View: "Sign in to the staff area and open this family" },
    family.email,
  );
  revalidatePath("/portal", "layout");
  back({ ok: `Thank you. Your note has been sent to ${sentTo}.` });
}
