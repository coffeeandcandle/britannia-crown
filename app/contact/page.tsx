import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";
import { Suspense } from "react";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import { WhatsAppIcon, EmailIcon, InstagramIcon } from "../components/Icons";

export const metadata: Metadata = pageMetadata({
  title: "Contact Britannia Crown | British Education Consultants",
  description:
    "Talk to Britannia Crown about tutoring, home education, school placement or qualifications — or moving to the UAE. We respond within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Nav />

      <section className="cta-section" id="contact" style={{ paddingTop: "140px" }}>
        <div className="cta-inner">
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            <span className="section-eyebrow-line"></span>
            <span className="section-eyebrow-text">Get Started</span>
            <span className="section-eyebrow-line"></span>
          </div>
          <h1 className="section-title">Talk to a Britannia Crown Education Consultant</h1>
          <p className="cta-desc">Whether you&apos;re looking for a tutor, planning home education, choosing a school or preparing for exams — or moving to the UAE — send us a message and we&apos;ll respond within 24 hours. Prefer to talk live? <Link href="/book-consultation" style={{ color: "var(--champagne)" }}>Book a free consultation</Link> instead.</p>

          <div className="cta-methods">
            <div className="cta-method">
              <WhatsAppIcon className="cta-method-icon" />
              <span className="cta-method-label">WhatsApp</span>
              <a href="https://wa.me/971502635427" className="cta-method-value">+971 50 263 5427</a>
            </div>
            <div className="cta-method">
              <EmailIcon className="cta-method-icon" />
              <span className="cta-method-label">Email</span>
              <a href="mailto:hello@britanniacrown.com" className="cta-method-value">hello@britanniacrown.com</a>
            </div>
            <div className="cta-method">
              <InstagramIcon className="cta-method-icon" />
              <span className="cta-method-label">Instagram</span>
              <a href="https://instagram.com/britanniacrowneducation" className="cta-method-value">@britanniacrowneducation</a>
            </div>
          </div>

          <div className="form-divider">
            <span className="form-divider-line"></span>
            <span className="form-divider-text">Or Send Us a Message</span>
            <span className="form-divider-line"></span>
          </div>

          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>

          <a href="https://wa.me/971502635427" className="btn-primary" style={{ marginTop: "40px" }}>Or Start on WhatsApp →</a>
        </div>
      </section>

      <Footer />
    </>
  );
}
