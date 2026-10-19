import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import CalendlyEmbed from "../components/CalendlyEmbed";
import { CALENDLY_URL } from "../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Book a Free Consultation | Britannia Crown",
  description:
    "Book a free 30-minute consultation with a Britannia Crown education consultant to talk through tutoring, home education, school placement or qualifications for your child.",
  path: "/book-consultation",
});

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
