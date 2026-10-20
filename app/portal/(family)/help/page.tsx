import Link from "next/link";
import { requireFamily, familyConsultant } from "../../../lib/portal/dal";
import { EMAIL } from "../../../lib/site";
import { PageHeader, Card } from "../../ui";

const faqs = [
  {
    q: "How do I join a lesson?",
    a: "Go to Overview or Sessions. Fifteen minutes before an online lesson starts, a Join button appears next to it. Click it to open the video call in a new tab.",
  },
  {
    q: "I can't see a Join button",
    a: "The button only appears from 15 minutes before the start until the lesson ends. If it still isn't there at the start time, your tutor may not have added the link yet. Email your consultant and they'll sort it out.",
  },
  {
    q: "Where are my tutor's notes and homework?",
    a: "Under Notes and homework. Each lesson's notes are also on that lesson's page, which you can open from Sessions.",
  },
  {
    q: "How do I book another lesson or change a time?",
    a: "Use Book a session in the menu, or email your consultant and they'll arrange it for you.",
  },
  {
    q: "How do I update my card or cancel my membership?",
    a: "Go to Billing and choose Manage payment and plan. This opens Stripe's secure billing page, where you can update your card, download receipts or cancel.",
  },
  {
    q: "Why are the times shown the way they are?",
    a: "Times are shown in your family's time zone (UK or UAE time). If yours looks wrong, let your consultant know and they'll change it.",
  },
  {
    q: "How do I sign out?",
    a: "Click your account picture at the bottom of the menu and choose Sign out.",
  },
];

export default async function FamilyHelpPage() {
  const { family } = await requireFamily();
  const consultant = await familyConsultant(family);
  const email = consultant?.email ?? EMAIL;

  return (
    <>
      <PageHeader title="Help" description="Quick answers to common questions about your family portal." />
      <div className="pt-grid">
        <div className="pt-main">
          <Card>
            <div className="ui-faq">
              {faqs.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </Card>
        </div>
        <aside className="pt-side">
          <Card tone="brand" title="Still stuck?">
            <p>Email {consultant ? consultant.name : "us"} and we&apos;ll help, usually within a working day.</p>
            <div className="pt-actions">
              <a href={`mailto:${email}`} className="btn-primary">Email {email}</a>
              <Link href="/portal" className="btn-secondary">Back to overview</Link>
            </div>
          </Card>
        </aside>
      </div>
    </>
  );
}
