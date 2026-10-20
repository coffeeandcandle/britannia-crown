import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import AccountBand from "../components/AccountBand";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How It Works: Onboarding & Proven Results | Britannia Crown",
  description:
    "How we onboard every family, step by step, and what independent research says about the impact of high-quality tutoring on learning.",
  path: "/how-it-works",
});

const steps = [
  { title: "Tell us about your child", body: "Create a free account or start a purchase. We ask for your details, your child's name and year group, and what you want help with, so nothing has to be repeated later." },
  { title: "A consultant calls you", body: "Within one working day, an education consultant confirms your child's goals, subjects and any deadlines." },
  { title: "We match a tutor", body: "UK-trained, vetted tutors are matched personally to your child, never assigned from a list." },
  { title: "Lessons begin, and you can see everything", body: "Your client portal shows lessons, tutor notes and receipts in one place, and your consultant stays involved as your child progresses." },
];

const stats = [
  {
    big: "+5 months",
    label: "of extra progress over a year from one-to-one tuition",
    note: "Average from the Education Endowment Foundation's Teaching and Learning Toolkit. The EEF says this is for tuition that is high quality and linked to what is taught in class, and it is an average, not a promise for every pupil.",
    source: "Education Endowment Foundation",
    href: "https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/one-to-one-tuition",
  },
  {
    big: "+4 months",
    label: "of extra progress from small-group tuition",
    note: "Also from the EEF's guidance on tutoring. One-to-one tuition is estimated to add about a month more than small groups.",
    source: "EEF tutoring guide (2022)",
    href: "https://dera.ioe.ac.uk/id/eprint/40911/1/Tutoring_Guide_2022_V1.2.pdf",
  },
  {
    big: "0.29 SD",
    label: "average gain across randomised controlled trials of tutoring",
    note: "A meta-analysis of experimental studies by Nickow, Oreopoulos and Quan found consistent, statistically significant gains. An earlier version of the paper reported 0.37 SD; the latest reports 0.29 SD. Effects were larger for teacher and paraprofessional tutors than for non-professional or parent tutors.",
    source: "Nickow, Oreopoulos and Quan, NBER Working Paper 27476",
    href: "https://www.nber.org/papers/w27476",
  },
  {
    big: "98th",
    label: "percentile: the classic finding on personal tutoring",
    note: "In 1984 Benjamin Bloom reported that students taught one to one with mastery learning scored about two standard deviations above a conventional class, which puts the average tutored student above 98% of that class. It rests on a small number of studies and later work finds smaller effects, so treat it as an illustration of a large effect, not a forecast.",
    source: "Bloom, B. S. (1984), Educational Researcher",
    href: "",
  },
];

const benefits = [
  { title: "Teaching built around your child", body: "Lessons start from what your child already knows, so time is spent on the gaps, not on repeating what is secure." },
  { title: "A consultant, not just a tutor", body: "Tutoring works best when it is linked to school work. Your consultant joins up lessons, exams, school choices and goals." },
  { title: "Everything in one account", body: "Lessons, notes, receipts and your family's details live in your client portal, and you can buy more services from inside it." },
  { title: "Honest advice", body: "We recommend what suits your child and explain why. No one can promise a particular grade or school place, and we will not pretend otherwise." },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "How it works", path: "/how-it-works" }]} />
          <h1>From first hello to first lesson, in four steps</h1>
          <p>
            Every family follows the same simple path, so we always know your child, your goals and your deadlines before the first lesson begins.
          </p>
          <div className="uk-hero-actions uk-sub-actions">
            <Link href="/pricing" className="btn-primary">See plans and prices</Link>
            <Link href="/book-consultation" className="btn-secondary">Book a free call</Link>
          </div>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap">
          <h2 className="uk-h2">How we welcome every family</h2>
          <ol className="hiw-steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="hiw-num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="uk-section dark">
        <div className="uk-wrap">
          <h2 className="uk-h2">What the research says about tutoring</h2>
          <p className="hiw-lede">
            These figures come from independent studies of tutoring in general. They are not Britannia Crown&apos;s own results, and effects vary with the quality of the tutoring.
          </p>
          <div className="hiw-stats">
            {stats.map((s) => (
              <figure key={s.big} className="hiw-stat">
                <strong className="hiw-big">{s.big}</strong>
                <figcaption>
                  <span className="hiw-label">{s.label}</span>
                  <span className="hiw-note">{s.note}</span>
                  <span className="hiw-source">
                    Source: {s.href ? <a href={s.href} target="_blank" rel="noopener noreferrer">{s.source}</a> : s.source}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="uk-section">
        <div className="uk-wrap">
          <h2 className="uk-h2">What you get with Britannia Crown</h2>
          <div className="hiw-benefits">
            {benefits.map((b) => (
              <div key={b.title} className="hiw-benefit">
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
          <p className="hiw-facts">Six years running a UK tutoring company · 50+ vetted tutors · a free 30-minute consultation · a reply within one working day</p>
        </div>
      </section>

      <section className="uk-cta">
        <h2>Start with a free conversation</h2>
        <p>Tell us about your child and we will recommend the right next step.</p>
        <div className="uk-hero-actions">
          <Link href="/book-consultation" className="btn-primary">Book a free consultation</Link>
          <Link href="/pricing" className="btn-secondary">See plans</Link>
        </div>
      </section>
      <AccountBand variant="inline" location="how_it_works" />
    </>
  );
}
