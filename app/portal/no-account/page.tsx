import Link from "next/link";
import { requireViewer } from "../../lib/portal/dal";
import { WHATSAPP_URL } from "../../lib/site";

export default async function NoAccountPage() {
  const viewer = await requireViewer();

  return (
    <section className="uk-section cream">
      <div className="uk-wrap pt-signin">
        <div>
          <span className="uk-kicker">Client portal</span>
          <h1 className="uk-h2">We couldn&apos;t find your family&apos;s account</h1>
          <p className="uk-lead">
            You&apos;re signed in as <strong>{viewer.email}</strong>, but that address isn&apos;t linked to a family yet.
            Portal access is set up by your consultant once you&apos;ve started with us.
          </p>
        </div>
        <div className="enq-card uk-prose">
          <p>If you&apos;re already a client, send us a message and we&apos;ll add this email address to your account.</p>
          <div className="uk-hero-actions">
            <a href={WHATSAPP_URL} className="btn-primary">Message us on WhatsApp</a>
            <Link href="/book-consultation" className="btn-secondary">New here? Book a free call</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
