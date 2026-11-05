"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { queryOne } from "../../../lib/portal/db";
import { requireFamily } from "../../../lib/portal/dal";
import { cancelOwnSession } from "../../../lib/portal/booking";
import { alertTeam, sendEmail } from "../../../lib/email";
import { logActivity } from "../../../lib/portal/audit";

// A family cancels one of their own upcoming sessions. The family comes from the sign-in, never the form.
export async function cancelSession(fd: FormData) {
  const { family } = await requireFamily();
  const id = Number(fd.get("session_id"));
  if (!Number.isInteger(id)) redirect("/portal/sessions");
  const back = `/portal/sessions/${id}`;

  const result = await cancelOwnSession(family.id, id);
  if ("error" in result) redirect(`${back}?${new URLSearchParams({ error: result.error as string })}`);

  const { session } = result;
  const when = new Intl.DateTimeFormat("en-GB", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/London" }).format(new Date(session.starts_at));
  await logActivity({ kind: "family", id: family.id, name: family.name }, "session.cancel", { familyId: family.id, sessionId: id, detail: session.title });
  try {
    const staff = session.staff_id ? await queryOne<{ email: string }>("SELECT email FROM staff WHERE id = $1", [session.staff_id]) : null;
    if (staff) {
      await sendEmail({ to: [staff.email], subject: `Cancelled: ${session.title} with ${family.name}`, text: `${family.name} cancelled their ${session.title.toLowerCase()} on ${when} (UK time). The time is free again.` });
    }
  } catch (error) {
    console.error("Cancellation email not sent (the cancellation is saved)", error);
  }
  await alertTeam("Session cancelled by family", { Session: session.title, Family: family.name, When: when }, family.email);
  revalidatePath("/portal", "layout");
  const next = result.credited ? "/portal/book" : "/portal/sessions";
  redirect(`${next}?ok=${encodeURIComponent(result.credited ? "Cancelled. Your paid session is back, so you can choose another time." : "Cancelled. Those hours are back in your plan.")}`);
}
