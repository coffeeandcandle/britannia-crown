import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import Breadcrumbs from "../components/Breadcrumbs";
import SubjectFilter from "../components/SubjectFilter";
import EnquirySection from "../components/EnquirySection";
import { pageMetadata } from "../lib/seo";
import { getService } from "../lib/services";

export const metadata: Metadata = pageMetadata({
  title: "Find a Private Tutor | Britannia Crown",
  description:
    "UK-trained private tutors for primary, GCSE and A-Level — maths, English, the sciences and more — personally matched to your child and overseen by a consultant.",
  path: "/tutors",
});

export default function TutorsPage() {
  const steps = getService("tutoring")?.steps ?? [];

  return (
    <>

      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Find a Tutor", path: "/tutors" }]} />
          <span className="uk-eyebrow">Find a Tutor</span>
          <h1>Private tutors, personally matched to your child</h1>
          <p>Every Britannia Crown tutor is a UK-trained educator. Tell us about your child and we&apos;ll introduce a tutor chosen for their subject, stage and the way they learn — with a dedicated consultant overseeing progress.</p>
          <div className="uk-hero-actions uk-sub-actions">
            <Link href="#enquire" className="btn-primary">Request a call back</Link>
            <Link href="/book-consultation" className="btn-secondary">Book a free call</Link>
          </div>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">By subject and stage</span>
            <h2 className="uk-h2">Choose a subject</h2>
            <p className="uk-lead">Our most-requested subjects are below. We tutor across the curriculum — if your child&apos;s subject isn&apos;t listed, just ask.</p>
          </Reveal>
          <Reveal>
            <SubjectFilter />
          </Reveal>
        </div>
      </section>

      <section className="uk-section dark">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">How it works</span>
            <h2 className="uk-h2">How we find the right tutor</h2>
          </Reveal>
          <Reveal>
            <div className="uk-steps">
              {steps.map((st, i) => (
                <div className="uk-step" key={st.title}>
                  <div className="uk-step-num">{i + 1}</div>
                  <h3>{st.title}</h3>
                  <p>{st.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <EnquirySection
        title={<>Tell us about your child</>}
        lead="Share the subject and stage, and an education consultant will call you back to talk through the right tutor."
        source="tutors_hub"
        defaultService="Tutoring"
        context="Find a Tutor"
      />

    </>
  );
}
