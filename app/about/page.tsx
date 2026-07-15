import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "About Us — Why Choose Britannia Crown | British Education Consultants Dubai",
  description: "Britannia Crown is Dubai's only full-service British education consultant, covering EYFS nursery search through to A-Level tutoring for expat families across Dubai and the GCC.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="About Britannia Crown"
        title="Dubai's Only Full-Service British Education Consultant"
        subtitle="We're not a tutoring agency. We're not a relocation firm. We're your British education consultant in Dubai — providing expert IGCSE tutors, A-Level tutors, school placement and nursery search under one relationship for expat families."
      />

      <section className="why" id="why">
        <div className="section-inner">
          <div className="image-text-section">
            <div className="image-text-content">
              <h2 className="section-title" style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>Not just a tutoring agency</h2>
              <p>We cover the full journey — birth to A-Level — under one relationship, so you never need a second consultant as your child grows.</p>
            </div>
            <div className="image-text-media">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="UK curriculum education consultant Dubai British school placement"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="why-grid">
            <div>
              <h2 style={{ fontSize: "22px", color: "var(--dark-burgundy)", marginBottom: "28px" }}>Four reasons families choose us</h2>

              <div className="why-points">
                <div className="why-point">
                  <span className="why-point-num">01</span>
                  <div>
                    <h3 className="why-point-title">Birth to A-Level — One British Education Partner</h3>
                    <p className="why-point-text">The only British education consultant in Dubai covering EYFS nursery search through to A-Level tutoring and university preparation. One relationship, 18 years of support.</p>
                  </div>
                </div>
                <div className="why-point">
                  <span className="why-point-num">02</span>
                  <div>
                    <h3 className="why-point-title">UK Curriculum Specialists — Cambridge &amp; Edexcel</h3>
                    <p className="why-point-text">Built over 6 years running a UK tutoring company. Deep expertise in IGCSE, GCSE, A-Level, Cambridge and Edexcel. Not a relocation firm — a genuine UK curriculum specialist.</p>
                  </div>
                </div>
                <div className="why-point">
                  <span className="why-point-num">03</span>
                  <div>
                    <h3 className="why-point-title">Dubai British School Experts — KHDA &amp; Waitlists</h3>
                    <p className="why-point-text">We know Dubai&apos;s British school landscape inside out — KHDA ratings, fee structures, waitlist dynamics and the specific challenges British expat families face when finding the right school or tutor.</p>
                  </div>
                </div>
                <div className="why-point">
                  <span className="why-point-num">04</span>
                  <div>
                    <h3 className="why-point-title">50+ Vetted British Tutors in Dubai &amp; UK</h3>
                    <p className="why-point-text">A network of 50+ vetted UK curriculum specialists — qualified British tutors in Dubai, IGCSE and A-Level tutors in Dubai, and UK-based educators teaching in British schools today.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="why-visual">
              <div className="why-stat">
                <div className="why-stat-number">10+</div>
                <div className="why-stat-label">Year Client Relationships</div>
              </div>
              <div className="why-divider"></div>
              <div className="why-stat">
                <div className="why-stat-number">144K</div>
                <div className="why-stat-label">Students in UK Curriculum Schools (Dubai)</div>
              </div>
              <div className="why-divider"></div>
              <div className="why-stat">
                <div className="why-stat-number">240K+</div>
                <div className="why-stat-label">British Nationals in Dubai</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--dark-burgundy)", padding: "80px 60px", textAlign: "center", width: "100%", maxWidth: "100%" }}>
        <div className="section-inner">
          <h2 className="section-title" style={{ color: "var(--white)" }}>Ready to talk about your child&apos;s education?</h2>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", maxWidth: "560px", margin: "0 auto 32px" }}>Start with a free 30-minute consultation, or send us a message and we&apos;ll respond within 24 hours.</p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book-consultation" className="btn-primary">Book Free Consultation</Link>
            <Link href="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
