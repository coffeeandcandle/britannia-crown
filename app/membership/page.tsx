import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { TutorIcon, ConciergeIcon, ShareCodeIcon, FamilyBooksIcon } from "../components/Icons";

export const metadata: Metadata = {
  title: "Online Tutoring Membership Dubai | Academic Partner Membership | Britannia Crown",
  description: "Ongoing online tutoring membership for expat families in Dubai. Vetted British tutors, flexible hours, direct access to your education consultant. From AED 1,000/month.",
};

export default function MembershipPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="Academic Partner Membership"
        title={<>Your Tutor Left Dubai? Not Sure If They&apos;re Even <em>Qualified?</em> Stop Starting Over.</>}
        subtitle="Britannia Crown's Academic Partner Membership gives your child ongoing access to vetted, qualified British tutors online — with your dedicated education consultant personally overseeing your child's academic journey, so you never have to search Dubizzle or Facebook groups again."
      />

      <div style={{ background: "var(--dark-burgundy)", padding: "0 60px 60px", width: "100%" }}>
        <div className="section-inner" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <Link href="#pricing" className="btn-primary">See Membership Tiers</Link>
          <Link href="/contact?service=Academic+Partner+Membership" className="btn-secondary">Book a Free 15-Minute Membership Call</Link>
        </div>
      </div>

      {/* The Problem */}
      <section style={{ background: "var(--white)" }}>
        <div className="section-inner">
          <div className="section-eyebrow">
            <span className="section-eyebrow-line"></span>
            <span className="section-eyebrow-text">We Understand</span>
          </div>
          <h2 className="section-title">The Tutoring Search Every Dubai Parent Knows Too Well</h2>
          <p className="section-lead">Dubai&apos;s expat tutor market moves fast — and that&apos;s exactly the problem. We hear the same frustrations from families every week.</p>

          <div className="problem-grid">
            <div className="problem-item">
              <h3 className="problem-item-title">Tutors Leave Without Warning</h3>
              <p className="problem-item-text">A great tutor gets a new visa, relocates, or simply disappears mid-term — and you&apos;re back to square one right before exams.</p>
            </div>
            <div className="problem-item">
              <h3 className="problem-item-title">No Way to Verify Qualifications</h3>
              <p className="problem-item-text">Dubizzle and Facebook groups don&apos;t tell you who&apos;s actually a qualified UK teacher and who isn&apos;t. You&apos;re trusting a profile photo.</p>
            </div>
            <div className="problem-item">
              <h3 className="problem-item-title">Constant Re-Vetting</h3>
              <p className="problem-item-text">Every time a tutor falls through, it&apos;s another round of messaging strangers, trial sessions, and hoping this one works out.</p>
            </div>
            <div className="problem-item">
              <h3 className="problem-item-title">No One Overseeing the Bigger Picture</h3>
              <p className="problem-item-text">One-off tutors teach a subject. No one is tracking whether your child&apos;s overall academic plan is actually on track.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It's Different */}
      <section style={{ background: "var(--off-white)" }}>
        <div className="section-inner">
          <div className="section-eyebrow">
            <span className="section-eyebrow-line"></span>
            <span className="section-eyebrow-text">How It&apos;s Different</span>
          </div>
          <h2 className="section-title">A Consultancy Relationship, Not Just a Subscription</h2>
          <p className="section-lead">Academic Partner Membership isn&apos;t another tutoring app. It&apos;s backed by Britannia Crown&apos;s full education consultancy — the same team behind our school placement and homeschool support services.</p>

          <div className="problem-grid">
            <div className="problem-item">
              <h3 className="problem-item-title">Vetted, Not Just Listed</h3>
              <p className="problem-item-text">Every tutor is UK-qualified and personally vetted by Britannia Crown before they ever teach your child — no marketplace guesswork.</p>
            </div>
            <div className="problem-item">
              <h3 className="problem-item-title">Continuity Built In</h3>
              <p className="problem-item-text">If a tutor becomes unavailable, we have a full bench ready to step in — your child&apos;s progress doesn&apos;t stall.</p>
            </div>
            <div className="problem-item">
              <h3 className="problem-item-title">Your Consultant Oversees It All</h3>
              <p className="problem-item-text">A dedicated education consultant checks in on your child&apos;s academic journey directly — not just the tutoring hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ background: "var(--white)" }}>
        <div className="section-inner">
          <div className="section-eyebrow">
            <span className="section-eyebrow-line"></span>
            <span className="section-eyebrow-text">Membership Tiers</span>
          </div>
          <h2 className="section-title">Choose Your Academic Partner Tier</h2>
          <p className="section-lead">All tiers include vetted British tutors, online delivery, and direct access to Britannia Crown&apos;s consultancy team.</p>

          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-tier-name">Foundation</div>
              <div className="pricing-amount">
                <span className="pricing-amount-value">AED 1,000</span>
                <span className="pricing-amount-unit">/ month</span>
              </div>
              <ul className="pricing-features">
                <li>4 hours/month online tutoring credit (flexible allocation, any subject)</li>
                <li>Monthly 15-minute parent check-in call</li>
                <li>WhatsApp access for academic questions (48hr response)</li>
                <li>Subject strategy notes after each session</li>
              </ul>
              <Link href="/contact?service=Academic+Partner+Membership+-+Foundation" className="pricing-cta">Start Foundation</Link>
            </div>

            <div className="pricing-card featured">
              <span className="pricing-popular-badge">Most Popular</span>
              <div className="pricing-tier-name">Partner</div>
              <div className="pricing-amount">
                <span className="pricing-amount-value">AED 1,800</span>
                <span className="pricing-amount-unit">/ month</span>
              </div>
              <ul className="pricing-features">
                <li>8 hours/month online tutoring credit</li>
                <li>Fixed weekly slot with a dedicated tutor (same tutor every week)</li>
                <li>Monthly 30-minute consultant call with your education consultant</li>
                <li>WhatsApp access, same-day response</li>
                <li>One subject-specific exam strategy session per term</li>
              </ul>
              <Link href="/contact?service=Academic+Partner+Membership+-+Partner" className="pricing-cta">Start Partner</Link>
            </div>

            <div className="pricing-card">
              <div className="pricing-tier-name">Full Partner</div>
              <div className="pricing-amount">
                <span className="pricing-amount-value">AED 3,200</span>
                <span className="pricing-amount-unit">/ month</span>
              </div>
              <ul className="pricing-features">
                <li>14 hours/month online tutoring credit, split across up to 2 subjects</li>
                <li>Everything in Partner tier</li>
                <li>Termly academic plan review with your education consultant directly</li>
                <li>Priority access to school placement/British Council consultancy at a reduced rate if needed mid-term</li>
                <li>Direct WhatsApp line to your education consultant</li>
              </ul>
              <Link href="/contact?service=Academic+Partner+Membership+-+Full+Partner" className="pricing-cta">Start Full Partner</Link>
            </div>
          </div>

          <p className="pricing-trust-line">Cancel or change tiers anytime — no long-term contract.</p>

          <p className="face-to-face-note">
            Need face-to-face support instead? Face-to-face tutoring is available on request with tailored pricing based on your child&apos;s exact needs and location. <Link href="/contact?service=Face-to-Face+Tutoring">Contact us</Link> to discuss.
          </p>
        </div>
      </section>

      {/* Trust / Reassurance */}
      <section style={{ background: "var(--dark-burgundy)" }}>
        <div className="section-inner">
          <div className="section-eyebrow">
            <span className="section-eyebrow-line"></span>
            <span className="section-eyebrow-text" style={{ color: "var(--champagne)" }}>Peace of Mind</span>
          </div>
          <h2 className="section-title" style={{ color: "var(--white)" }}>Built Around Flexibility, Not Lock-In</h2>
          <div className="problem-grid">
            <div className="problem-item problem-item-dark">
              <TutorIcon className="service-icon problem-item-icon" />
              <h3 className="problem-item-title">Vetted British Tutors</h3>
              <p className="problem-item-text">Every tutor is UK-qualified and personally screened by Britannia Crown.</p>
            </div>
            <div className="problem-item problem-item-dark">
              <ConciergeIcon className="service-icon problem-item-icon" />
              <h3 className="problem-item-title">All Online</h3>
              <p className="problem-item-text">No visa, relocation, or geography risk — your tutor never has to &quot;leave Dubai&quot; again.</p>
            </div>
            <div className="problem-item problem-item-dark">
              <ShareCodeIcon className="service-icon problem-item-icon" />
              <h3 className="problem-item-title">Cancel or Pause Anytime</h3>
              <p className="problem-item-text">No long lock-in contracts. Change tiers or pause your membership whenever your family needs to.</p>
            </div>
            <div className="problem-item problem-item-dark">
              <FamilyBooksIcon className="service-icon problem-item-icon" />
              <h3 className="problem-item-title">A Full Bench, Always</h3>
              <p className="problem-item-text">If your tutor is ever unavailable, another vetted tutor steps in — your child is never left without support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="section-inner">
          <div className="section-eyebrow">
            <span className="section-eyebrow-line"></span>
            <span className="section-eyebrow-text">Questions Answered</span>
          </div>
          <h2 className="section-title">Frequently Asked Questions</h2>

          <div className="faq-grid">
            <div className="faq-item">
              <h3 className="faq-q">What if my tutor becomes unavailable?</h3>
              <p className="faq-a">We have a full bench of vetted British tutors. If your assigned tutor is ever unavailable, we bring in a qualified replacement so your child is never left without support.</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-q">Can I change subjects?</h3>
              <p className="faq-a">Yes. Your monthly hours are flexible and can be allocated across subjects as your child&apos;s needs change — just let your consultant know.</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-q">Is this different from a one-off consultation?</h3>
              <p className="faq-a">Yes. The free 30-minute consultation is a one-time introduction to Britannia Crown. Academic Partner Membership is an ongoing monthly relationship with recurring tutoring hours and continuous consultant oversight.</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-q">Can I cancel anytime?</h3>
              <p className="faq-a">Yes — there is no long-term contract. You can cancel or change tiers at any time.</p>
            </div>
          </div>
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
          <h2 className="section-title">Book a Free 15-Minute Membership Call</h2>
          <p className="cta-desc">A short, no-pressure call to understand your child&apos;s needs and find the right Academic Partner tier — before you commit to anything.</p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact?service=Academic+Partner+Membership" className="btn-primary">Book a Free 15-Minute Call</Link>
            <Link href="/services" className="btn-secondary">See All Services</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
