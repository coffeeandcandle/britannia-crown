"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { queryOne } from "../../../lib/portal/db";
import { requireFamily } from "../../../lib/portal/dal";
import { bookOrder } from "../../../lib/portal/booking";
import { alertTeam, sendEmail } from "../../../lib/email";
import { query } from "../../../lib/portal/db";
import { recordEvent } from "../../../lib/crm";
import { YEAR_GROUPS, FOCUS_AREAS } from "../../../lib/onboarding";
import { SITE_URL } from "../../../lib/site";
import { logActivity } from "../../../lib/portal/audit";

// A family books a paid session into a free slot. The family comes from the signed-in person, never the form.
export async function bookSession(fd: FormData) {
  const { family, viewer } = await requireFamily();
  const orderId = Number(fd.get("order_id"));
  const start = Number(fd.get("start"));
  if (!Number.isInteger(orderId) || !Number.isFinite(start)) redirect("/portal/book");

  const result = await bookOrder(family.id, orderId, start);
  if ("error" in result) redirect(`/portal/book?${new URLSearchParams({ error: result.error as string })}`);

  await logActivity({ kind: "family", id: family.id, name: family.name }, "session.book", { familyId: family.id, sessionId: result.sessionId, detail: result.title });
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

// After paying, the family tells us about their child before they can choose a time.
export async function saveSessionDetails(fd: FormData) {
  const { family } = await requireFamily();
  const orderId = Number(fd.get("order_id"));
  const text = (k: string, max: number) => String(fd.get(k) ?? "").trim().slice(0, max);
  const name = text("parent_name", 120);
  const phone = text("phone", 40);
  const childName = text("child_name", 80);
  const yearGroup = text("year_group", 40);
  const focusArea = text("focus_area", 60);
  const focus = text("focus", 400);
  const fail = (error: string): never => redirect(`/portal/book?${new URLSearchParams({ error })}`);
  if (!Number.isInteger(orderId)) redirect("/portal/book");
  if (name.length < 2) fail("Please enter your name.");
  if (phone.replace(/\D/g, "").length < 7) fail("Please enter a phone number we can reach you on.");
  if (!childName) fail("Please enter your child's first name.");
  if (!YEAR_GROUPS.includes(yearGroup)) fail("Please choose your child's year group.");
  if (!FOCUS_AREAS.includes(focusArea)) fail("Please tell us what you want help with.");
  if (focus.length < 3) fail("Please tell us a little about what you need.");

  const done = await queryOne<{ id: number }>(
    "UPDATE orders SET onboarding = $1, child = $2 WHERE id = $3 AND family_id = $4 AND onboarding IS NULL RETURNING id",
    [JSON.stringify({ parent: name, phone, child: childName, year_group: yearGroup, help_with: focusArea, about: focus }), childName, orderId, family.id],
  );
  if (!done) redirect("/portal/book");
  await query("UPDATE families SET name = $1, phone = $2 WHERE id = $3", [name, phone, family.id]);
  await query(
    `INSERT INTO children (family_id, name, year_group) SELECT $1, $2, $3
      WHERE NOT EXISTS (SELECT 1 FROM children WHERE family_id = $1 AND lower(name) = lower($2))`,
    [family.id, childName, yearGroup],
  );
  try {
    await recordEvent({ name, email: family.email, phone, type: "enquiry", summary: "Added details after paying for a session", details: { child: childName, year_group: yearGroup, help_with: focusArea, about: focus }, source: "paid session" });
  } catch (error) {
    console.error("Could not record booking details in the CRM (they are saved)", error);
  }
  await logActivity({ kind: "family", id: family.id, name: family.name }, "details.save", { familyId: family.id, detail: `${childName}, ${yearGroup}` });
  revalidatePath("/portal", "layout");
  redirect("/portal/book");
}
