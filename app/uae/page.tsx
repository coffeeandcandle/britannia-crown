import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "../lib/seo";
import Breadcrumbs from "../components/Breadcrumbs";
import HeroMedia from "../components/HeroMedia";
import EnquirySection from "../components/EnquirySection";
import JsonLd from "../components/JsonLd";
import { ORG_ID } from "../lib/schema";
import { SITE_URL } from "../lib/site";
import BuyButton from "../components/BuyButton";
import { getProduct } from "../lib/products";
import { offerForProduct, offerPath } from "../lib/offers";
import { paymentsEnabled } from "../lib/stripe";

export const metadata: Metadata = pageMetadata({
  title: "Moving to Dubai with Children? Schools & Tutoring | Britannia Crown",
  description:
    "Relocating to Dubai or the UAE? Nursery search, British school placement, IGCSE & A-Level tutoring and education concierge for families moving from the UK.",
  path: "/uae",
});

type Offer = { age: string; name: string; body: string; price: string; unit: string; value: number; service: string; productId?: string };

const offers: Offer[] = [
  {
    age: "Ages 0 to 4",
    name: "Nursery Search & Placement",
    body: "Finding the right EYFS nursery for your child. We research, shortlist, coordinate visits and handle the entire application process.",
    price: "£600",
    unit: "one-time",
    value: 600,
    service: "Nursery Search & Placement",
    productId: "uae-nursery-search",
  },
  {
    age: "Ages 4 to 18",
    name: "School Search & Placement",
    body: "Expert guidance through Dubai's British-curriculum schools, from FS1 through to Sixth Form, to find the right match for your family.",
    price: "£1,600",
    unit: "one-time",
    value: 1600,
    service: "School Search & Placement",
    productId: "uae-school-search",
  },
  {
    age: "All ages",
    name: "UK Curriculum Tutors in Dubai",
    body: "Private British tutors across all subjects: UK-qualified educators and experienced Dubai-based tutors for one-to-one tuition aligned to the British national curriculum.",
    price: "£60 to £70",
    unit: "per hour",
    value: 60,
    service: "Subject Tutoring",
  },
  {
    age: "Ages 14 to 18",
    name: "GCSE & A-Level Preparation",
    body: "Exam technique coaching from specialists, including actual GCSE examiners. Past papers, mark schemes, revision planning and mock exams.",
    price: "£1,000",
    unit: "per term",
    value: 1000,
    service: "GCSE & A-Level Preparation",
    productId: "uae-exam-prep-term",
  },
  {
    age: "All ages",
    name: "British Homeschool Support",
    body: "Full British-curriculum homeschool support for Dubai and GCC families: Cambridge and Edexcel curriculum design, UK tutor coordination, term planning and progress tracking.",
    price: "£1,400",
    unit: "per term",
    value: 1400,
    service: "Homeschool Support",
    productId: "uae-homeschool-term",
  },
  {
    age: "Ongoing",
    name: "Education Concierge",
    body: "Your dedicated UK-curriculum education manager in Dubai: monthly strategy, unlimited message support, and liaison with tutors and schools.",
    price: "£500",
    unit: "per month",
    value: 500,
    service: "Education Concierge",
    productId: "uae-concierge",
  },
];

const steps = [
  { title: "Tell us about the move", body: "Your timeline, where you'll live, your child's age and current school, and what matters most to you." },
  { title: "We research and shortlist", body: "KHDA ratings, fees, waitlists, curriculum fit and the commute, narrowed to a shortlist with honest reasoning." },
  { title: "Visits and applications", body: "We coordinate visits and assessments and guide you through each application, so nothing is missed from abroad." },
  { title: "Learning carries on", body: "UK-qualified tutors online, timed to Dubai, so your child keeps progressing before, during and after the move." },
];

export default function UaePage() {
  return (
    <>
      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Moving to the UAE", path: "/uae" }]} />
          <span className="uk-eyebrow">Moving to the UAE</span>
          <h1>Relocating to Dubai? Get your child&apos;s school sorted before you land.</h1>
          <p>We advise UK families moving to the UAE, from nursery and school placement to British-curriculum tutors in Dubai, so your child&apos;s education continues without a break.</p>
          <div className="uk-hero-actions uk-sub-actions">
            <Link href="/book-consultation" className="btn-primary">Book a free 30-minute call</Link>
            <Link href="#prices" className="btn-secondary">See services and prices</Link>
          </div>
          <HeroMedia name="dubai" />
        </div>
      </section>

      <section className="uk-section white" id="prices">
        <div className="uk-wrap">
          <div className="uk-head">
            <span className="uk-kicker">Services and prices</span>
            <h2 className="uk-h2">Clear, fixed prices for UAE families</h2>
            <p className="uk-lead">Pay securely online, or start with a free consultation if you&apos;d like to talk it through first.</p>
          </div>
          <div className="price-cards">
            {offers.map((o) => {
              const product = o.productId ? getProduct(o.productId) : undefined;
              const detail = o.productId ? offerForProduct(o.productId) : undefined;
              return (
                <article className="price-card" key={o.name}>
                  <span className="price-card-age">{o.age}</span>
                  <h3>{o.name}</h3>
                  <p>{o.body}</p>
                  <p className="price-card-price">{o.price} <small>{o.unit}</small></p>
                  {detail && <Link href={offerPath(detail)} className="price-card-more">See what is included →</Link>}
                  {product && paymentsEnabled ? (
                    <div className="price-card-actions">
                      <BuyButton product={product} enabled label={product.mode === "subscription" ? "Subscribe" : "Buy now"} />
                      <Link href={{ pathname: "/contact", query: { service: o.service } }}>Ask a question first</Link>
                    </div>
                  ) : (
                    <Link href={{ pathname: "/contact", query: { service: o.service } }} className="btn-secondary">
                      Enquire about this
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap">
          <div className="uk-head">
            <span className="uk-kicker">How it works</span>
            <h2 className="uk-h2">From first call to first day at school</h2>
          </div>
          <ol className="uk-steps mb-four">
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
            <span className="uk-kicker">Early years</span>
            <h2 className="uk-h2">EYFS nursery search for expat families</h2>
          </div>
          <div className="uk-prose">
            <p>The right British EYFS nursery in Dubai sets the foundation for your child&apos;s whole education. We know Dubai&apos;s nursery landscape and match families with settings that meet UK early years standards.</p>
            <p>From full-day care to part-time sessions, we guide you through KHDA ratings, staff qualifications and the move into FS1 at a British-curriculum school.</p>
            <Link href={{ pathname: "/contact", query: { service: "Nursery Search & Placement" } }} className="btn-primary">Ask about nurseries</Link>
          </div>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap uk-split">
          <div>
            <span className="uk-kicker">GCSE and A-Level</span>
            <h2 className="uk-h2">Exam preparation from people who mark the papers</h2>
          </div>
          <div className="uk-prose">
            <p>Exam technique coaching from actual GCSE and A-Level examiners. We don&apos;t just teach content: we teach students how to show what they know under exam conditions.</p>
            <p>Past paper practice, mark scheme analysis, revision planning, and mock exams that replicate the real thing.</p>
            <Link href={{ pathname: "/contact", query: { service: "GCSE & A-Level Preparation" } }} className="btn-primary">Ask about exam preparation</Link>
          </div>
        </div>
      </section>

      <section className="uk-section white">
        <div className="uk-wrap uk-split">
          <div>
            <span className="uk-kicker">Online tutoring</span>
            <h2 className="uk-h2">UK-qualified tutors, on Dubai time</h2>
          </div>
          <div className="uk-prose">
            <p>Work with qualified British tutors who teach in UK schools today. Online sessions are timed for the UAE, so your child gets authentic UK-curriculum tuition at home anywhere in Dubai and the GCC.</p>
            <p>Families moving mid-year often keep the same tutor through the move, so there is no gap in learning.</p>
            <Link href="/tutors" className="btn-secondary">Browse tutoring by subject</Link>
          </div>
        </div>
      </section>

      <EnquirySection
        title="Planning a move to the UAE?"
        lead="Tell us your timeline and your child's age, and an education consultant will call you back, usually within 24 hours."
        source="uae_page"
        defaultService="School Search & Placement"
        context="Moving to the UAE"
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Education consultancy for families moving to the UAE",
          serviceType: "Education consultancy",
          areaServed: { "@type": "Country", name: "United Arab Emirates" },
          url: `${SITE_URL}/uae`,
          provider: { "@id": ORG_ID },
          offers: offers.map((o) => ({
            "@type": "Offer",
            name: o.name,
            price: o.value,
            priceCurrency: "GBP",
          })),
        }}
      />
    </>
  );
}
