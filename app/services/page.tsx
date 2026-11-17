import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";
import Link from "next/link";
import Reveal from "../components/Reveal";
import Breadcrumbs from "../components/Breadcrumbs";
import { services } from "../lib/services";
import ConsultationBand from "../components/ConsultationBand";

const toRoman = (n: number) => ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][n - 1] ?? String(n);

export const metadata: Metadata = pageMetadata({
  title: "Tutoring & Education Consultancy | Britannia Crown",
  description:
    "Private tutoring, home education, school and nursery placement, and qualifications support from UK-trained educators and dedicated education consultants.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>

      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
          <h1>Education advice from the first day to the final exam</h1>
          <p>One consultancy for every stage of your child&apos;s education, tutoring, home education, school placement and qualifications, with a dedicated consultant who knows your family.</p>
          <div className="uk-hero-actions uk-sub-actions">
            <Link href="/book-consultation" className="btn-primary">Book a free call</Link>
            <Link href="/tutors" className="btn-secondary">Find a Tutor</Link>
          </div>
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
              <Link href="/advocacy-plan" className="uk-row">
                <span className="uk-row-num">{toRoman(services.length + 1)}</span>
                <span className="uk-row-name">Advocacy Plan</span>
                <span className="uk-row-desc">A dedicated consultant who speaks to your child&apos;s school for you, from SEN support to bullying.</span>
                <span className="uk-row-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="uk-uae">
        <div className="uk-uae-inner">
          <div>
            <h2>Moving to the UAE?</h2>
            <p>Nursery and school placement, British-curriculum tutors and education concierge for UK families relocating to Dubai.</p>
          </div>
          <Link href="/uae" className="btn-primary">Moving to the UAE →</Link>
        </div>
      </section>

      <ConsultationBand tone="cream" />
    </>
  );
}
