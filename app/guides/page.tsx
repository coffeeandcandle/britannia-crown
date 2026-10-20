import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import Breadcrumbs from "../components/Breadcrumbs";
import GuideCards from "../components/GuideCards";
import GuideRequestForm from "../components/GuideRequestForm";
import { pageMetadata } from "../lib/seo";
import { guides } from "../lib/guides";

export const metadata: Metadata = pageMetadata({
  title: "Guides for Parents: Schools, Exams & Home Education | Britannia Crown",
  description:
    "Clear, practical guides for parents on school admissions, GCSE grades, revision, choosing a tutor, IGCSEs and home education — from British education consultants.",
  path: "/guides",
});

// Downloadable PDF guides for families moving to Dubai (sent by email on request).
const dubaiGuides = [
  {
    label: "Guide 1 · Ages 0–4",
    title: "Finding the Right EYFS Nursery in Dubai",
    desc: "KHDA ratings explained, what to look for on visits, how waitlists work, and the transition from nursery to FS1.",
    subject: "Guide Request: EYFS Nursery Dubai",
    guide: "Guide 1 — Finding the Right EYFS Nursery in Dubai",
  },
  {
    label: "Guide 2 · Ages 4–18",
    title: "British School Waitlists in Dubai — Explained",
    desc: "How waitlists work, a strategic approach to applications, understanding KHDA ratings, and how to give your child the best chance.",
    subject: "Guide Request: British School Waitlists Dubai",
    guide: "Guide 2 — British School Waitlists Dubai",
  },
  {
    label: "Guide 3 · Ages 11–18",
    title: "IGCSE vs GCSE — What Dubai Parents Need to Know",
    desc: "The difference between IGCSE and GCSE, which exam board your child's school uses, and what it means for tutoring and university applications.",
    subject: "Guide Request: IGCSE vs GCSE Dubai",
    guide: "Guide 3 — IGCSE vs GCSE Dubai",
  },
  {
    label: "Guide 4 · All Ages",
    title: "Homeschooling in Dubai — The British Curriculum Guide",
    desc: "Is home education legal in Dubai? Cambridge vs Edexcel, how to sit exams as a private candidate, and building a curriculum that works.",
    subject: "Guide Request: Homeschooling Dubai",
    guide: "Guide 4 — Homeschooling in Dubai",
  },
];

export default function GuidesPage() {
  return (
    <>

      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }]} />
          <span className="uk-eyebrow">Guides for parents</span>
          <h1>Guides for parents on schools, exams and home education</h1>
          <p>Practical guides from our education consultants on the questions parents ask us most, from school applications and GCSE grades to revision, tutors and home education.</p>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap">
          <div className="uk-head">
            <span className="uk-kicker">All guides</span>
            <h2 className="uk-h2">Latest guides</h2>
          </div>
          <GuideCards items={guides} feature />
        </div>
      </section>

      <section className="uk-section white" id="tools">
        <div className="uk-wrap">
          <div className="uk-head">
            <span className="uk-kicker">Free tools</span>
            <h2 className="uk-h2">Check your child&apos;s dates and grades</h2>
          </div>
          <div className="hm-tools">
            <Link href="/tools/school-dates" className="hm-tool">
              <strong>School dates calculator</strong>
              <span>Enter your child&apos;s date of birth to see their year group and every application deadline.</span>
            </Link>
            <Link href="/tools/gcse-grade-converter" className="hm-tool">
              <strong>GCSE grade converter</strong>
              <span>See what each 9 to 1 grade means, and how it compares with the old A* to G grades.</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="uk-section cream" id="dubai-guides">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">Moving to Dubai</span>
            <h2 className="uk-h2">Free downloadable guides for families relocating</h2>
            <p className="uk-lead">Four practical guides for British families moving to Dubai. Enter your name and email and we&apos;ll send the PDF to your inbox. It&apos;s free. See also our <Link href="/uae">relocation advice</Link>.</p>
          </Reveal>
          <Reveal>
            <div className="gd-dl-grid">
              {dubaiGuides.map((g, i) => (
                <div className="gd-dl" key={g.guide}>
                  <div className="gd-dl-head">
                    <span>{g.label}</span>
                    <h3>{g.title}</h3>
                  </div>
                  <div className="gd-dl-body">
                    <p>{g.desc}</p>
                    <GuideRequestForm guide={g.guide} subject={g.subject} id={`dubai-guide-${i + 1}`} />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="uk-cta">
        <Reveal>
          <span className="uk-kicker">Prefer to talk?</span>
          <h2>Have a question about your child?</h2>
          <p>Book a free 30-minute consultation with one of our education consultants for advice tailored to your child.</p>
          <div className="uk-hero-actions">
            <Link href="/book-consultation" className="btn-primary">Book a free call</Link>
            <Link href="/contact" className="btn-secondary">Contact us</Link>
          </div>
        </Reveal>
      </section>

    </>
  );
}
