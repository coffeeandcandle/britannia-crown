import { reserveSlot, slotStart } from "../../../lib/consultations";
import { sendEmail, teamInbox } from "../../../lib/email";
import { EMAIL } from "../../../lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Reserves a free consultation time, then emails the family to say we have it. The booking form saves the
// full details to the CRM and alerts the team in its own call, once this succeeds.
export async function POST(request: Request) {
  let body: { name?: string; email?: string; date?: string; time?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 200);
  const start = slotStart(String(body.date ?? ""), String(body.time ?? ""));
  if (!name || !EMAIL_RE.test(email) || !start) return Response.json({ ok: false, error: "Please check your details and choose a date and time." }, { status: 400 });
  if (!process.env.DATABASE_URL) return Response.json({ ok: false, error: "Not configured" }, { status: 503 });

  let reserved: boolean;
  try {
    reserved = await reserveSlot(start, name, email);
  } catch (error) {
    console.error("Reserving consultation time failed", error);
    return Response.json({ ok: false, error: "Could not save your request" }, { status: 500 });
  }
  if (!reserved) return Response.json({ ok: false, taken: true, error: "Sorry, that time has just been taken. Please choose another." }, { status: 409 });

  const when = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Europe/London" }).format(start);
  try {
    await sendEmail({
      to: [email],
      subject: "We've received your free consultation request | Britannia Crown",
      text: `Hello ${name.split(" ")[0]},\n\nThank you for requesting a free consultation on ${when} (UK time). We have held that time for you and will email again to confirm it, usually within 24 hours.\n\nIf you need to change the time or add anything, just reply to this email or write to ${EMAIL}.\n\nBritannia Crown`,
      replyTo: teamInbox()[0],
    });
  } catch (error) {
    console.error("Consultation acknowledgement not sent (the request is saved)", error);
  }
  return Response.json({ ok: true });
}
