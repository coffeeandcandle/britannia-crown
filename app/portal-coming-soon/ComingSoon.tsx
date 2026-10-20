import Link from "next/link";
import { WHATSAPP_URL } from "../lib/site";

export default function ComingSoon() {
  return (
    <>
      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <span className="uk-eyebrow">Client portal</span>
          <h1>Your family&apos;s portal is on its way</h1>
          <p>Soon you&apos;ll be able to see upcoming lessons, read your tutor&apos;s notes after each session and manage your membership here.</p>
        </div>
      </section>
      <section className="uk-section cream">
        <div className="uk-wrap uk-prose">
          <p>In the meantime, your consultant is a message away.</p>
          <div className="uk-hero-actions">
            <a href={WHATSAPP_URL} className="btn-primary">Message us on WhatsApp</a>
            <Link href="/contact" className="btn-secondary">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
