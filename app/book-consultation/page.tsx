import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "../lib/seo";
import Breadcrumbs from "../components/Breadcrumbs";
import CalendlyEmbed from "../components/CalendlyEmbed";
import { CALENDLY_URL, WHATSAPP_URL } from "../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Book a Free Consultation | Britannia Crown",
  description:
    "Book a free 30-minute consultation with a Britannia Crown education consultant to talk through tutoring, home education, school placement or qualifications for your child.",
  path: "/book-consultation",
});

export default function BookConsultationPage() {
  return (
    <>
      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Book a free consultation", path: "/book-consultation" }]} />
          <span className="uk-eyebrow">Free 30-minute consultation</span>
          <h1>Book your free consultation</h1>
          <p>Pick a time that works for you. We&apos;ll talk through your child&apos;s needs and agree the next steps. It&apos;s free, with no obligation.</p>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap book-grid">
          <aside className="book-side">
            <div className="uk-point">
              <h2 className="book-side-title">What happens on the call</h2>
              <ol className="book-steps">
                <li><strong>You tell us about your child.</strong> Their age, school, strengths and what&apos;s worrying you.</li>
                <li><strong>We ask a few questions.</strong> About goals, timings and how your child learns best.</li>
                <li><strong>You get a clear recommendation.</strong> The right tutor, school route or plan, and what it costs.</li>
              </ol>
            </div>
            <div className="uk-point">
              <h2 className="book-side-title">Good to know</h2>
              <ul className="uk-ticks">
                <li>30 minutes, by phone or video</li>
                <li>With an education consultant, not a salesperson</li>
                <li>No obligation to go ahead</li>
              </ul>
            </div>
            <p className="book-alt">
              Can&apos;t find a time? <a href={WHATSAPP_URL}>Message us on WhatsApp</a> or <Link href="/contact">request a call back</Link>.
            </p>
          </aside>
          <CalendlyEmbed url={CALENDLY_URL} />
        </div>
      </section>
    </>
  );
}
