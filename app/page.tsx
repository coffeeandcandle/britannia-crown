import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { TutorIcon, ConciergeIcon, ShareCodeIcon } from "./components/Icons";

export default function Home() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line"></span>
            <span className="hero-eyebrow-text">British Education Partner · Dubai & GCC</span>
          </div>
          <h1>Dubai&apos;s <em>British Education Partner</em> — IGCSE Tutors, School Placement &amp; Nursery Search</h1>
          <div className="age-range-pills">
            <span className="age-pill">0-4 Early Years</span>
            <span className="age-pill">4-11 Primary</span>
            <span className="age-pill">11-16 GCSE</span>
            <span className="age-pill">16-18 A-Level</span>
          </div>
          <p className="hero-desc">Dubai&apos;s leading British education consultant. Expert IGCSE &amp; A-Level tutors, EYFS nursery search, British school placement and homeschool support. UK curriculum specialists for expat families across Dubai and the GCC.</p>
          <div className="hero-actions">
            <Link href="/book-consultation" className="btn-primary">Book Free Consultation</Link>
            <Link href="/services" className="btn-secondary">Our Services</Link>
          </div>
          <div className="hero-trust-line">
            <span>6+ Years UK Experience</span>
            <span className="dot">·</span>
            <span>50+ UK Trained Educators</span>
            <span className="dot">·</span>
            <span>100% UK Curriculum Focus</span>
          </div>
        </div>
      </section>

      {/* Academic Partner Membership — Flagship */}
      <section className="flagship-banner">
        <div className="flagship-inner">
          <div>
            <span className="flagship-badge">Flagship Service</span>
            <h2 className="section-title">Your Tutor Left Dubai? <em>Stop Starting Over.</em></h2>
            <p className="flagship-desc">Tutors relocating suddenly, no way to verify who&apos;s actually qualified, endless re-vetting on Dubizzle and Facebook groups — the Academic Partner Membership ends the search for good. Ongoing access to vetted British tutors online, with your dedicated education consultant personally overseeing your child&apos;s academic journey.</p>
            <Link href="/membership" className="btn-primary">Explore Academic Partner Membership →</Link>
          </div>
          <div className="flagship-visual">
            <div className="flagship-visual-item">
              <TutorIcon className="flagship-visual-icon" />
              <span className="flagship-visual-text">Vetted, UK-qualified tutors — never a marketplace guess</span>
            </div>
            <div className="flagship-visual-item">
              <ConciergeIcon className="flagship-visual-icon" />
              <span className="flagship-visual-text">A dedicated education consultant overseeing progress</span>
            </div>
            <div className="flagship-visual-item">
              <ShareCodeIcon className="flagship-visual-icon" />
              <span className="flagship-visual-text">Cancel or pause anytime — no long-term contract</span>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer teaser */}
      <section className="services">
        <div className="section-inner">
          <div className="section-eyebrow">
            <span className="section-eyebrow-line"></span>
            <span className="section-eyebrow-text">What We Offer</span>
          </div>
          <h2 className="section-title">British Education Services Dubai — Birth to A-Level</h2>
          <p className="section-lead">From EYFS nursery search to expert IGCSE and A-Level tutors in Dubai — your UK curriculum partner for every stage of your child&apos;s education.</p>

          <div className="teaser-grid">
            <Link href="/membership" className="teaser-card">
              <span className="card-badge">New</span>
              <h3 className="teaser-card-title">Academic Partner Membership</h3>
              <p className="teaser-card-desc">Ongoing online tutoring membership with vetted British tutors and a dedicated education consultant.</p>
              <span className="teaser-card-link">See Membership →</span>
            </Link>
            <Link href="/services" className="teaser-card">
              <h3 className="teaser-card-title">Nursery &amp; School Placement</h3>
              <p className="teaser-card-desc">EYFS nursery search through to British curriculum school placement, FS1 to Sixth Form.</p>
              <span className="teaser-card-link">See Services →</span>
            </Link>
            <Link href="/services" className="teaser-card">
              <h3 className="teaser-card-title">Tutoring &amp; Exam Prep</h3>
              <p className="teaser-card-desc">UK-qualified tutors for all subjects, plus GCSE and A-Level exam technique coaching.</p>
              <span className="teaser-card-link">See Services →</span>
            </Link>
            <Link href="/services" className="teaser-card">
              <h3 className="teaser-card-title">Homeschool &amp; Concierge</h3>
              <p className="teaser-card-desc">Full British curriculum homeschool support, or a dedicated education concierge.</p>
              <span className="teaser-card-link">See Services →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us teaser */}
      <section className="why">
        <div className="section-inner">
          <div className="section-eyebrow">
            <span className="section-eyebrow-line"></span>
            <span className="section-eyebrow-text">Why Britannia Crown</span>
          </div>
          <h2 className="section-title">Dubai&apos;s Only Full-Service British Education Consultant</h2>
          <p className="section-lead">We&apos;re not a tutoring agency. We&apos;re not a relocation firm. We&apos;re your British education consultant in Dubai — one relationship, birth to A-Level.</p>
          <Link href="/about" className="btn-primary">Learn Why Families Choose Us</Link>
        </div>
      </section>

      {/* Free Guides teaser */}
      <section id="guides" style={{ background: "var(--white)", padding: "100px 60px", overflow: "hidden", width: "100%", maxWidth: "100%" }}>
        <div className="section-inner">
          <p style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--warm-gold-text)", fontWeight: 600, marginBottom: "14px" }}>Free Guides</p>
          <h2 className="section-title">Free Guides for British Expat Families in Dubai</h2>
          <p className="section-lead" style={{ maxWidth: "680px" }}>Four practical guides covering nursery search, school waitlists, IGCSE vs GCSE, and homeschooling — free, straight to your inbox.</p>
          <Link href="/guides" className="btn-primary">Get the Free Guides</Link>
        </div>
      </section>

      {/* Ambassador Teaser */}
      <section style={{ background: "var(--dark-burgundy)", padding: "60px", width: "100%", maxWidth: "100%" }}>
        <div className="section-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <span className="section-eyebrow-text" style={{ color: "var(--champagne)" }}>Britannia Crown · Ambassador Programme</span>
            <h3 style={{ fontSize: "26px", color: "var(--white)", marginTop: "8px" }}>Earn <em style={{ color: "var(--champagne)" }}>150 AED</em> for every family you refer</h3>
          </div>
          <Link href="/ambassador" className="btn-primary">Learn More →</Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            <span className="section-eyebrow-line"></span>
            <span className="section-eyebrow-text">Get Started</span>
            <span className="section-eyebrow-line"></span>
          </div>
          <h2 className="section-title">Book Your Free Consultation with Dubai&apos;s British Education Consultant</h2>
          <p className="cta-desc">Whether you need an EYFS nursery search, British school placement, IGCSE or A-Level tutors in Dubai, or homeschool support — start with a free 30-minute consultation.</p>
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
