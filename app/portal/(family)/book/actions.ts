"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { queryOne } from "../../../lib/portal/db";
import { requireFamily } from "../../../lib/portal/dal";
import { bookOrder } from "../../../lib/portal/booking";
import { alertTeam, sendEmail } from "../../../lib/email";
import { SITE_URL } from "../../../lib/site";

// A family books a paid session into a free slot. The family comes from the signed-in person, never the form.
export async function bookSession(fd: FormData) {
  const { family, viewer } = await requireFamily();
  const orderId = Number(fd.get("order_id"));
  const start = Number(fd.get("start"));
  if (!Number.isInteger(orderId) || !Number.isFinite(start)) redirect("/portal/book");

  const result = await bookOrder(family.id, orderId, start);
  if ("error" in result) redirect(`/portal/book?${new URLSearchParams({ error: result.error as string })}`);

  const when = new Intl.DateTimeFormat("en-GB", { dateStyle: "full", timeStyle: "short", timeZone: family.timezone }).format(result.start);
  const staff = await queryOne<{ name: string; email: string }>("SELECT name, email FROM staff WHERE id = $1", [result.staffId]);
  const link = `${SITE_URL}/portal/sessions/${result.sessionId}`;
  try {
    await sendEmail({
      to: [viewer.email],
      subject: `Your ${result.title.toLowerCase()} is booked | Britannia Crown`,
      text: `Hello ${family.name.split(" ")[0]},\n\nYour ${result.title.toLowerCase()} is booked for ${when}${staff ? ` with ${staff.name}` : ""}.\n\nIt happens in your client portal. The Join button appears 15 minutes before the start:\n${link}\n\nBritannia Crown`,
    });
    if (staff) {
      await sendEmail({
        to: [staff.email],
        subject: `New booking: ${result.title} with ${family.name}`,
        text: `${family.name} booked a ${result.title.toLowerCase()} with you on ${new Intl.DateTimeFormat("en-GB", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/London" }).format(result.start)} (UK time).\n\nIt is in your sessions in the portal:\n${SITE_URL}/portal/admin/sessions/${result.sessionId}`,
      });
    }
  } catch (error) {
    console.error("Booking emails not sent (the booking is saved)", error);
  }
  await alertTeam("Paid session booked", { Session: result.title, Family: family.name, With: staff?.name, When: when }, family.email);
  revalidatePath("/portal", "layout");
  redirect(`/portal/sessions/${result.sessionId}?ok=${encodeURIComponent("Booked. It is now in your calendar.")}`);
}
