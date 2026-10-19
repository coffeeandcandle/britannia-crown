import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { services } from "../lib/services";

export const metadata: Metadata = {
  title: "Education Consultancy Services — Tutoring, Home Education, School Placement | Britannia Crown",
  description:
    "Private tutoring, home education, school and nursery placement, and qualifications support from UK-trained educators and dedicated education consultants.",
};

export default function ServicesPage() {
  return (
    <>
      <Nav />

      <section className="uk-sub-hero">
        <div className="uk-wrap uk-hero-load">
          <span className="uk-eyebrow">Our Services</span>
          <h1>Education advice, <em>from the first day to the final exam.</em></h1>
          <p>One consultancy for every stage of your child&apos;s education — tutoring, home education, school placement and qualifications — with a dedicated consultant who knows your family.</p>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap">
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
          <div>
            <span className="uk-kicker" style={{ color: "var(--champagne)" }}>Relocating abroad</span>
            <h2>Moving to the UAE? <em>We advise families on the move.</em></h2>
            <p>Nursery and school placement, British-curriculum tutors and education concierge for UK families relocating to Dubai.</p>
          </div>
          <Link href="/uae" className="btn-primary">Moving to the UAE →</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
