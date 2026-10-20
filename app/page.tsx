import type { Metadata } from "next";
import Link from "next/link";
import Photo from "./components/Photo";
import HomePlans from "./components/HomePlans";
import FlagshipBand from "./components/FlagshipBand";
import AccountBand from "./components/AccountBand";
import SignupLink from "./components/SignupLink";
import SubjectGrid from "./components/SubjectGrid";
import GuideCards from "./components/GuideCards";
import Finder from "./components/Finder";
import EnquirySection from "./components/EnquirySection";
import { services } from "./lib/services";
import { guides } from "./lib/guides";
import { pageMetadata } from "./lib/seo";
import ConsultationBand from "./components/ConsultationBand";

export const metadata: Metadata = pageMetadata({
  title: "Private Tutors & Education Consultants | Britannia Crown",
  description:
    "Private tutoring, home education, school placement and GCSE & A-Level support from UK-trained educators, overseen by a dedicated education consultant.",
  path: "/",
});

const reasons = [
  { title: "UK-trained educators", body: "A network of 50+ tutors, vetted by us, including teachers working in British schools today. Personally matched to your child, never picked from a list." },
  { title: "One consultant for the whole journey", body: "The same person oversees tutoring, school choices and exams, so nothing falls between the gaps as your child grows." },
  { title: "Six years running a UK tutoring company", body: "We know the curriculum, the exam boards and the admissions process in detail, and we explain our advice so you can question it." },
];

const steps = [
  { title: "Tell us about your child", body: "Book a free 30-minute call or send a message. We'll ask about your child, your goals and what's worrying you." },
  { title: "Get a clear recommendation", body: "The right tutor, school route or plan, with honest reasons and clear prices." },
  { title: "We stay involved", body: "Your consultant checks progress and adjusts the plan as your child's needs change." },
];

export default function Home() {
  return (
    <>
      <section className="hm-hero">
        <div className="hm-hero-bg" aria-hidden="true">
          <Photo name="tutoring" sizes="100vw" priority />
        </div>
        <div className="uk-wrap hm-hero-grid">
          <div>
            <h1>Tutoring, school places and exam support for your child</h1>
            <p className="hm-hero-lead">
              Personal advice and teaching from UK-trained educators, from early years to A-Level, with one consultant
              who knows your child and stays involved.
            </p>
            <div className="uk-hero-actions">
              <Link href="/book-consultation" className="btn-primary">Book a free consultation</Link>
              <Link href="#partner" className="btn-secondary">Start tutoring today</Link>
            </div>
            <p className="hm-signup">
              New here? <SignupLink location="home_hero">Create your free account</SignupLink> to track lessons, notes and receipts.
            </p>
            <ul className="hm-proof">
              <li>50+ vetted UK-trained tutors</li>
              <li>Reply within 24 hours</li>
              <li>First consultation free</li>
              <li>Online lessons held in your own portal</li>
            </ul>
          </div>
          <Finder />
        </div>
      </section>

      <section className="uk-section white" id="portal-lessons">
        <div className="uk-wrap uk-split">
          <div>
            <h2 className="uk-h2">Online lessons happen inside your portal</h2>
            <p className="uk-lead">
              No video links to chase and nothing to install. Log in to your Britannia Crown account, press Join, and your tutor is there.
              It works on a phone, a tablet or a laptop.
            </p>
            <div className="uk-hero-actions">
              <SignupLink location="home_portal_lessons" className="btn-primary">Create your free account</SignupLink>
              <Link href="/portal/login" className="btn-secondary">Log in</Link>
            </div>
          </div>
          <div className="uk-points">
            <div className="uk-point">
              <h3>Join in one press</h3>
              <p>The Join button appears 15 minutes before each lesson. Your camera and microphone are set up in a single step.</p>
            </div>
            <div className="uk-point">
              <h3>A private room for every lesson</h3>
              <p>Only your family, your tutor and our team can enter. There is no public link to share or lose.</p>
            </div>
            <div className="uk-point">
              <h3>Notes and homework straight after</h3>
              <p>Your tutor writes up what was covered and what to practise, and it appears in the same account.</p>
            </div>
            <div className="uk-point">
              <h3>Everything in one place</h3>
              <p>Upcoming lessons, past notes, receipts and new lesson requests, all under one login.</p>
            </div>
          </div>
        </div>
      </section>

      <FlagshipBand />

      <HomePlans />

      <ConsultationBand tone="white" />
      <AccountBand variant="band" location="home_band" />

      <section className="uk-section white">
        <div className="uk-wrap">
          <div className="uk-head">
            <h2 className="uk-h2">How we can help</h2>
            <p className="uk-lead">From a single subject to a whole education plan, each service is led by a consultant who takes responsibility for the result.</p>
          </div>
          <div className="uk-rows">
            {services.map((s) => (
              <Link href={`/services/${s.slug}`} className="uk-row" key={s.slug}>
                <span className="uk-row-name">{s.name}</span>
                <span className="uk-row-desc">{s.short}</span>
                <span className="uk-row-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap">
          <div className="uk-head">
            <h2 className="uk-h2">Answers for parents</h2>
            <p className="uk-lead">Plain-English guides to school applications, exams, tutors and home education, written by our consultants.</p>
          </div>
          <GuideCards items={guides.slice(0, 3)} />
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
          <p className="hm-more"><Link href="/guides">See all guides →</Link></p>
        </div>
      </section>

      <section className="uk-section dark">
        <div className="uk-wrap">
          <div className="uk-head">
            <h2 className="uk-h2">Three steps to the right support</h2>
          </div>
          <ol className="uk-steps">
            {steps.map((s, i) => (
              <li className="uk-step" key={s.title}>
                <div className="uk-step-num" aria-hidden="true">{i + 1}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="uk-section white">
        <div className="uk-wrap uk-split">
          <div>
            <h2 className="uk-h2">Education consultants, not a tutoring marketplace</h2>
            <p className="uk-lead">One relationship for the whole journey, from first nursery to final exam.</p>
            <div className="uk-sub-actions"><Link href="/about" className="btn-secondary">About us</Link></div>
          </div>
          <div className="uk-principles">
            {reasons.map((r) => (
              <div className="uk-principle" key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap">
          <div className="uk-head">
            <h2 className="uk-h2">Tutors by subject</h2>
            <p className="uk-lead">Choose a subject to see how we help, or <Link href="/tutors">browse all tutoring</Link>.</p>
          </div>
          <SubjectGrid />
        </div>
      </section>

      <section className="uk-uae">
        <div className="uk-uae-inner">
          <div>
            <h2>Moving to the UAE?</h2>
            <p>We help UK families relocating to Dubai find the right nursery or school, and keep British-curriculum tutoring going without a break.</p>
          </div>
          <Link href="/uae" className="btn-primary">Education advice for the UAE</Link>
        </div>
      </section>

      <EnquirySection
        title="Talk to an education consultant"
        lead="Tell us a little about your child and we'll call you back, usually within 24 hours."
        source="home_page"
        defaultService=""
        context="Home page"
      />
    </>
  );
}
