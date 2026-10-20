import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { pageMetadata } from "../lib/seo";
import Breadcrumbs from "../components/Breadcrumbs";
import ContactForm from "../components/ContactForm";
import { EMAIL, INSTAGRAM_URL } from "../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Britannia Crown | British Education Consultants",
  description:
    "Talk to Britannia Crown about tutoring, home education, school placement or qualifications, or moving to the UAE. We respond within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
          <h1>Talk to an education consultant</h1>
          <p>Looking for a tutor, planning home education, choosing a school, preparing for exams or moving to the UAE? Choose whichever way suits you. We reply within 24 hours.</p>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap">
          <div className="contact-options">
            <Link href="/book-consultation" className="contact-option">
              <strong>Book a free call</strong>
              <span>Pick a 30-minute slot that suits you. Free, with no obligation.</span>
            </Link>
            <a href="#enquiry-form" className="contact-option">
              <strong>Send an enquiry</strong>
              <span>Tell us about your child and we&apos;ll reply within 24 hours.</span>
            </a>
            <a href={`mailto:${EMAIL}`} className="contact-option">
              <strong>Email</strong>
              <span>{EMAIL}</span>
            </a>
          </div>

          <div className="contact-layout" id="enquiry-form">
            <div>
              <h2 className="uk-h2">Or send us a message</h2>
              <p className="uk-lead">Tell us a little about your child and what you need. An education consultant will read it and get back to you, usually the same day.</p>
              <ul className="uk-ticks">
                <li>Your details are only used to reply to you</li>
                <li>The first consultation is always free</li>
                <li>No pressure and no automated sales emails</li>
              </ul>
              <p className="uk-enquire-alt">
                You can also find us on <a href={INSTAGRAM_URL}>Instagram</a>.
              </p>
            </div>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
