import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import CalendlyEmbed from "../components/CalendlyEmbed";

export const metadata: Metadata = {
  title: "Book a Free Consultation | Britannia Crown — British Education Consultants Dubai",
  description: "Book a free 30-minute consultation with Britannia Crown to discuss nursery search, school placement, tutoring, or homeschool support for your family in Dubai.",
};

const CALENDLY_URL = "https://calendly.com/miramayhis/30min";

export default function BookConsultationPage() {
  return (
    <>
      <Nav />

      <section className="cta-section" style={{ paddingTop: "140px" }}>
        <div className="cta-inner">
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            <span className="section-eyebrow-line"></span>
            <span className="section-eyebrow-text">Free 30-Minute Consultation</span>
            <span className="section-eyebrow-line"></span>
          </div>
          <h1 className="section-title">Book Your Free Consultation</h1>
          <p className="cta-desc">Pick a time that works for you. We&apos;ll talk through your child&apos;s needs — nursery search, school placement, tutoring, or homeschool support — and map out next steps. Free, no obligation.</p>

          <CalendlyEmbed url={CALENDLY_URL} />

          <p className="form-note" style={{ marginTop: "24px" }}>
            Prefer to message us first? <a href="https://wa.me/971502635427" style={{ color: "var(--champagne)" }}>Start on WhatsApp</a> or use our <a href="/contact" style={{ color: "var(--champagne)" }}>contact form</a>.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
