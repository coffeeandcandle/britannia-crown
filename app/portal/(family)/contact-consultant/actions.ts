"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query } from "../../../lib/portal/db";
import { requireFamily, familyConsultant } from "../../../lib/portal/dal";
import { sendEmail, alertTeam } from "../../../lib/email";
import { logActivity } from "../../../lib/portal/audit";
import { EMAIL } from "../../../lib/site";

// A family messages their consultant from the portal. It is emailed to the consultant (reply goes
// straight to the family), copied to the team, and saved with the family's notes for the team.
const PATH = "/portal/contact-consultant";

function back(msg: { ok?: string; error?: string }): never {
  redirect(`${PATH}?${new URLSearchParams(msg as Record<string, string>).toString()}`);
}

export async function messageConsultant(fd: FormData) {
  const { family } = await requireFamily();
  const body = String(fd.get("body") ?? "").trim().slice(0, 3000);
  if (body.length < 3) back({ error: "Please write your message before sending." });
  const consultant = await familyConsultant(family);

  await query("INSERT INTO family_notes (family_id, topic, body) VALUES ($1, $2, $3)", [family.id, "Message for my consultant", body]);
  await logActivity({ kind: "family", id: family.id, name: family.name }, "family.note", { familyId: family.id, detail: "Message for their consultant" });
  try {
    await sendEmail({
      to: [consultant?.email ?? EMAIL],
      subject: `Message from ${family.name} | Britannia Crown`,
      text: `${family.name} sent you a message from their client portal:\n\n${body}\n\nReply to this email to answer them directly.`,
      replyTo: family.email,
    });
  } catch (error) {
    console.error("Consultant message email not sent (saved in the portal)", error);
  }
  if (consultant) await alertTeam(`Message to ${consultant.name} from a family`, { Family: family.name, Email: family.email, Message: body }, family.email);
  revalidatePath("/portal", "layout");
  back({ ok: `Message sent${consultant ? ` to ${consultant.name}` : ""}. They will reply by email.` });
}
