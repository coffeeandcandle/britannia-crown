import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import Breadcrumbs from "../components/Breadcrumbs";
import SubjectGrid from "../components/SubjectGrid";
import EnquirySection from "../components/EnquirySection";
import { pageMetadata } from "../lib/seo";
import { getService } from "../lib/services";

export const metadata: Metadata = pageMetadata({
  title: "Find a Private Tutor | Primary, GCSE & A-Level Tutors | Britannia Crown",
  description:
    "UK-trained private tutors for primary, GCSE and A-Level — maths, English, the sciences and more — personally matched to your child and overseen by a consultant.",
  path: "/tutors",
});

export default function TutorsPage() {
  const steps = getService("tutoring")?.steps ?? [];

  return (
    <>
      <Nav />

      <section className="uk-sub-hero">
        <div className="uk-wrap uk-hero-load">
          <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Find a Tutor", path: "/tutors" }]} />
          <span className="uk-eyebrow">Find a Tutor</span>
          <h1>Private tutors, <em>personally matched.</em></h1>
          <p>Every Britannia Crown tutor is a UK-trained educator. Tell us about your child and we&apos;ll introduce a tutor chosen for their subject, stage and the way they learn — with a dedicated consultant overseeing progress.</p>
          <div className="uk-hero-actions uk-sub-actions">
            <Link href="#enquire" className="btn-primary">Request a Call Back</Link>
            <Link href="/book-consultation" className="btn-secondary">Book Free Consultation</Link>
          </div>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">By subject and stage</span>
            <h2 className="uk-h2">Choose a subject to <em>get started.</em></h2>
            <p className="uk-lead">Our most-requested subjects are below. We tutor across the curriculum — if your child&apos;s subject isn&apos;t listed, just ask.</p>
          </Reveal>
          <Reveal>
            <SubjectGrid />
          </Reveal>
        </div>
      </section>

      <section className="uk-section dark">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">How it works</span>
            <h2 className="uk-h2">The right tutor, <em>without the search.</em></h2>
          </Reveal>
          <Reveal>
            <div className="uk-steps">
              {steps.map((st, i) => (
                <div className="uk-step" key={st.title}>
                  <div className="uk-step-num">0{i + 1}</div>
                  <h3>{st.title}</h3>
                  <p>{st.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <EnquirySection
        title={<>Tell us about <em>your child.</em></>}
        lead="Share the subject and stage, and an education consultant will call you back to talk through the right tutor."
        source="tutors_hub"
        defaultService="Tutoring"
        context="Find a Tutor"
      />

      <Footer />
    </>
  );
}
