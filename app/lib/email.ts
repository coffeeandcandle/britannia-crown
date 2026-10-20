import "server-only";
import { EMAIL, SITE_URL } from "./site";
import { orderConfirmationEmail } from "./orderEmail";

// Sends email through Resend (resend.com) when RESEND_API_KEY is set. Team alerts go to
// NOTIFY_EMAIL (default: the main contact address). Until a sending domain is verified in
// Resend, leave EMAIL_FROM unset: Resend's shared address can only send to the account owner.
const FROM = process.env.EMAIL_FROM ?? "Britannia Crown <onboarding@resend.dev>";
export const emailEnabled = Boolean(process.env.RESEND_API_KEY);
export const teamInbox = () => (process.env.NOTIFY_EMAIL ?? EMAIL).split(",").map((e) => e.trim()).filter(Boolean);

type Message = { to: string[]; subject: string; text: string; replyTo?: string };

export async function sendEmail({ to, subject, text, replyTo }: Message) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to, subject, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return true;
}

// Emails the team. Never throws: everything is already saved in the CRM, so a failed alert
// is logged rather than allowed to lose a lead.
export async function alertTeam(subject: string, fields: Record<string, string | null | undefined>, replyTo?: string) {
  const lines = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`);
  try {
    await sendEmail({ to: teamInbox(), subject: `${subject} | Britannia Crown`, text: lines.join("\n"), replyTo });
  } catch (error) {
    console.error("Team alert email not sent (saved in the CRM)", error);
  }
}

// Emails the buyer a confirmation that points them to their client portal. Like alertTeam it never
// throws: the order is already saved, so a failed email is logged rather than failing the webhook.
export async function sendOrderConfirmation(to: string, order: { name: string; productName: string; amountLabel: string }) {
  if (!to) return;
  try {
    const { subject, text } = orderConfirmationEmail({ ...order, siteUrl: SITE_URL, contactEmail: EMAIL });
    await sendEmail({ to: [to], subject, text, replyTo: teamInbox()[0] });
  } catch (error) {
    console.error("Order confirmation email not sent (the order is saved in the portal)", error);
  }
}
