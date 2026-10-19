import type { Metadata } from "next";
import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import SubjectGrid from "./components/SubjectGrid";
import GuideCards from "./components/GuideCards";
import { services } from "./lib/services";
import { guides } from "./lib/guides";
import { pageMetadata } from "./lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Britannia Crown | British Education Consultants & Private Tutors",
  description:
    "Private tutoring, home education, school placement and GCSE & A-Level support from UK-trained educators, overseen by a dedicated education consultant.",
  path: "/",
});

const stages = ["Early Years", "Primary", "Secondary", "GCSE", "A-Level", "Home Education", "School Placement", "Private Tutoring"];

const principles = [
  { mark: "i", title: "UK-trained educators", body: "Every tutor is trained in the British curriculum. No anonymous marketplace, no guesswork." },
  { mark: "ii", title: "One consultant, one relationship", body: "A dedicated consultant who knows your child and oversees the whole journey." },
  { mark: "iii", title: "Honest, child-first advice", body: "Our recommendations are built around your child, your priorities and your family's circumstances." },
];

export default function Home() {
  return (
    <>
      <Nav />

      <section className="uk-hero" id="home">
        <svg className="uk-hero-crown" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20,120 L35,50 L70,90 L100,30 L130,90 L165,50 L180,120 Z" fill="#E8C89C" />
          <rect x="15" y="120" width="170" height="26" fill="#E8C89C" rx="3" />
        </svg>
        <div className="uk-hero-inner uk-hero-load">
          <span className="uk-eyebrow">British Education Consultants</span>
          <h1>Education, <em>considered</em> with care.</h1>
          <p className="uk-hero-lead">Private tutoring, home education, school placement and qualifications — personal advice from UK-trained educators, for families who want it done properly.</p>
          <div className="uk-hero-actions">
            <Link href="/book-consultation" className="btn-primary">Book Free Consultation</Link>
            <Link href="/services" className="btn-secondary">Explore Our Services</Link>
          </div>
        </div>
        <div className="uk-hero-stats">
          <div className="uk-hero-stats-inner">
            <div className="uk-stat"><span className="uk-stat-num">6+</span><span className="uk-stat-label">Years of UK<br />experience</span></div>
            <div className="uk-stat"><span className="uk-stat-num">50+</span><span className="uk-stat-label">UK-trained<br />educators</span></div>
            <div className="uk-stat"><span className="uk-stat-num">100%</span><span className="uk-stat-label">British curriculum<br />focus</span></div>
          </div>
        </div>
      </section>

      <div className="uk-strip" aria-hidden="true">
        <div className="uk-strip-track">
          {[0, 1].map((n) => (
            <span key={n}>{stages.map((s) => <span key={s + n} style={{ gap: 0 }}>{s}</span>)}</span>
          ))}
        </div>
      </div>

      <section className="uk-section cream">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">What we do</span>
            <h2 className="uk-h2">Four ways we help your child <em>thrive.</em></h2>
            <p className="uk-lead">From a single subject to a whole education plan, every service is led by a consultant who takes responsibility for the result.</p>
          </Reveal>
          <Reveal>
            <div className="uk-rows">
              {services.map((s) => (
                <Link href={`/services/${s.slug}`} className="uk-row" key={s.slug}>
                  <span className="uk-row-num">{s.numeral}</span>
                  <span className="uk-row-name">{s.name}</span>
                  <span className="uk-row-desc">{s.short}</span>
                  <span className="uk-row-arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="uk-section white">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">Find a tutor</span>
            <h2 className="uk-h2">Specialist tutors, <em>subject by subject.</em></h2>
            <p className="uk-lead">From first phonics to final A-Level papers — choose a subject to see how we help, or <Link href="/tutors">browse all tutoring</Link>.</p>
          </Reveal>
          <Reveal>
            <SubjectGrid />
          </Reveal>
        </div>
      </section>

      <section className="uk-section dark">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">How we work</span>
            <h2 className="uk-h2">Simple to start. <em>Thorough throughout.</em></h2>
          </Reveal>
          <Reveal>
            <div className="uk-steps">
              <div className="uk-step"><div className="uk-step-num">01</div><h3>Talk to us</h3><p>A free 30-minute consultation to understand your child, your goals and your concerns.</p></div>
              <div className="uk-step"><div className="uk-step-num">02</div><h3>A plan, personally made</h3><p>We recommend the right tutor, school or programme — and explain exactly why.</p></div>
              <div className="uk-step"><div className="uk-step-num">03</div><h3>We stay involved</h3><p>Your consultant oversees progress and adapts the plan as your child grows.</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="uk-section white">
        <div className="uk-wrap uk-split">
          <Reveal>
            <span className="uk-kicker">Why Britannia Crown</span>
            <h2 className="uk-h2">Not an agency. <em>A partner.</em></h2>
            <p className="uk-lead">We are not a tutoring marketplace and we are not a school directory. We are education consultants — one relationship for the whole journey, from first nursery to final exam.</p>
            <div style={{ marginTop: 36 }}><Link href="/about" className="btn-primary">About Us</Link></div>
          </Reveal>
          <Reveal delay={120}>
            <div className="uk-principles">
              {principles.map((p) => (
                <div className="uk-principle" key={p.title}>
                  <span className="uk-principle-mark">{p.mark}</span>
                  <div><h3>{p.title}</h3><p>{p.body}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="uk-uae">
        <div className="uk-uae-inner">
          <Reveal>
            <span className="uk-kicker" style={{ color: "var(--champagne)" }}>Relocating abroad</span>
            <h2>Moving to the UAE? <em>We advise families on the move.</em></h2>
            <p>We help UK families relocating to Dubai find the right nursery or school, and keep British-curriculum tutoring going without a break.</p>
          </Reveal>
          <Link href="/uae" className="btn-primary">Moving to the UAE →</Link>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">Guides for parents</span>
            <h2 className="uk-h2">Practical guidance, <em>freely shared.</em></h2>
            <p className="uk-lead">Clear, honest guides on school applications, exams, tutors and home education.</p>
          </Reveal>
          <Reveal>
            <GuideCards items={guides.slice(0, 3)} />
          </Reveal>
          <div style={{ marginTop: 40 }}><Link href="/guides" className="btn-primary">All Guides</Link></div>
        </div>
      </section>

      <section className="uk-cta">
        <Reveal>
          <span className="uk-kicker">Get started</span>
          <h2>Let&apos;s talk about <em>your child.</em></h2>
          <p>Book a free 30-minute consultation with one of our education consultants. No obligation — just a clear, honest conversation.</p>
          <div className="uk-hero-actions">
            <Link href="/book-consultation" className="btn-primary">Book Free Consultation</Link>
            <Link href="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
