import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import Breadcrumbs from "../components/Breadcrumbs";
import HeroMedia from "../components/HeroMedia";
import EnquirySection from "../components/EnquirySection";
import JsonLd from "../components/JsonLd";
import { pageMetadata } from "../lib/seo";
import { services } from "../lib/services";
import { ORG_ID } from "../lib/schema";
import { SITE_URL } from "../lib/site";
import ConsultationBand from "../components/ConsultationBand";

export const metadata: Metadata = pageMetadata({
  title: "About Britannia Crown | British Education Consultants",
  description:
    "A British education consultancy built on six years of running a UK tutoring company: UK-trained tutors and advice on schools, qualifications and exams.",
  path: "/about",
});

const reasons = [
  {
    title: "One partner from early years to A-Level",
    body: "Tutoring, home education, school placement and qualifications under one relationship, so you never need a second consultant as your child grows.",
  },
  {
    title: "British curriculum specialists",
    body: "Built over six years running a UK tutoring company. Deep expertise in GCSE, IGCSE, A-Level, Cambridge and Edexcel. We teach and advise on the curriculum, not just match names to a list.",
  },
  {
    title: "A network of 50+ vetted tutors",
    body: "UK-trained educators, vetted by us before they work with your child, including tutors teaching in British schools today. Personally matched, never assigned from a list.",
  },
  {
    title: "A consultant who stays involved",
    body: "Every family has a dedicated education consultant who oversees the whole journey: progress, plans and decisions, not just the tutoring hours.",
  },
];

const approach = [
  { title: "We listen first", body: "A free 30-minute consultation to understand your child, your goals and your concerns, before anything is recommended." },
  { title: "We recommend, and explain why", body: "The right tutor, school or programme for your child, with honest reasoning you can question." },
  { title: "We stay with you", body: "Your consultant oversees progress and adapts the plan as your child grows and circumstances change." },
];

export default function AboutPage() {
  return (
    <>

      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
          <h1>Education advice you can trust, from early years to A-Level</h1>
          <p>We are not a tutoring marketplace, and we are not a school directory. Britannia Crown is a British education consultancy: UK-trained educators and a dedicated consultant for every family, with one relationship for the whole journey.</p>
          <div className="uk-hero-actions uk-sub-actions">
            <Link href="#enquire" className="btn-primary">Request a call back</Link>
            <Link href="/book-consultation" className="btn-secondary">Book a free call</Link>
          </div>
          <HeroMedia name="classroom" />
        </div>
      </section>

      <section className="uk-section white">
        <div className="uk-wrap">
          <Reveal>
            <div className="ab-stats">
              <div className="ab-stat"><span className="ab-stat-num">6+</span><span className="ab-stat-label">Years running a UK tutoring company</span></div>
              <div className="ab-stat"><span className="ab-stat-num">50+</span><span className="ab-stat-label">Vetted UK-trained educators</span></div>
              <div className="ab-stat"><span className="ab-stat-num">100%</span><span className="ab-stat-label">British curriculum focus</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap uk-split">
          <Reveal>
            <h2 className="uk-h2">Why families choose us</h2>
            <p className="uk-lead">Choosing education support is a high-stakes decision, often made in a hurry. We built Britannia Crown to make it easier to get right.</p>
          </Reveal>
          <Reveal>
            <div className="uk-principles">
              {reasons.map((r, i) => (
                <div className="uk-principle" key={r.title}>
                  <span className="uk-principle-mark">{["i", "ii", "iii", "iv"][i]}</span>
                  <div><h3>{r.title}</h3><p>{r.body}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="uk-section dark">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <h2 className="uk-h2">How we work</h2>
          </Reveal>
          <Reveal>
            <div className="uk-steps">
              {approach.map((a, i) => (
                <div className="uk-step" key={a.title}>
                  <div className="uk-step-num">{i + 1}</div>
                  <h3>{a.title}</h3>
                  <p>{a.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="uk-section white">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <h2 className="uk-h2">What we do</h2>
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

      <section className="uk-uae">
        <div className="uk-uae-inner">
          <Reveal>
            <h2>Advising families who are moving to Dubai</h2>
            <p>We also help UK families relocating to the UAE: understanding KHDA ratings, fees and waitlists, finding a British-curriculum school or nursery, and keeping tutoring going without a break. There are around 144,000 students in UK-curriculum schools in Dubai and more than 240,000 British nationals living there, so the choices are many and the competition for places is real.</p>
          </Reveal>
          <Link href="/uae" className="btn-primary">Moving to the UAE →</Link>
        </div>
      </section>

      <ConsultationBand tone="cream" />
      <EnquirySection
        title={<>Let&apos;s talk about your child</>}
        lead="Tell us a little about your child and an education consultant will call you back, usually within 24 hours."
        source="about_page"
        defaultService=""
        context="About page"
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Britannia Crown",
          url: `${SITE_URL}/about`,
          about: { "@id": ORG_ID },
          inLanguage: "en-GB",
        }}
      />

    </>
  );
}
