import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import Breadcrumbs from "../components/Breadcrumbs";
import FaqSection from "../components/FaqSection";
import EnquirySection from "../components/EnquirySection";
import JsonLd from "../components/JsonLd";
import { pageMetadata } from "../lib/seo";
import { ORG_ID } from "../lib/schema";
import { SITE_URL } from "../lib/site";
import BuyButton from "../components/BuyButton";
import { getProduct } from "../lib/products";
import { paymentsEnabled } from "../lib/stripe";

export const metadata: Metadata = pageMetadata({
  title: "Online Tutoring Membership | Academic Partner | Britannia Crown",
  description:
    "Ongoing online tutoring with vetted UK-qualified tutors and a dedicated education consultant overseeing your child's progress. Flexible monthly tiers from £200 a month. Cancel anytime.",
  path: "/membership",
});

const problems = [
  { title: "Tutors leave without warning", body: "A great tutor moves, changes job or simply disappears mid-term, and you are back to square one just before exams." },
  { title: "No way to verify qualifications", body: "Marketplaces and Facebook groups don't tell you who is a qualified UK teacher and who isn't. You are trusting a profile photo." },
  { title: "Constant re-vetting", body: "Every time a tutor falls through it is another round of messaging strangers, trial sessions and hoping this one works out." },
  { title: "No one watching the bigger picture", body: "A one-off tutor teaches a subject. No one is tracking whether your child's overall plan is on track." },
];

const different = [
  { title: "Vetted, not just listed", body: "Every tutor is UK-qualified and personally vetted by Britannia Crown before they ever teach your child. No marketplace guesswork." },
  { title: "Continuity built in", body: "If a tutor becomes unavailable we have a full bench ready to step in, so your child's progress doesn't stall." },
  { title: "Your consultant oversees it all", body: "A dedicated education consultant checks in on your child's whole academic journey, not just the tutoring hours." },
];

const tiers = [
  {
    name: "Foundation",
    price: "200",
    value: 200,
    features: [
      "4 hours/month online tutoring credit (flexible allocation, any subject)",
      "Monthly 15-minute parent check-in call",
      "Message support for academic questions (48-hour response)",
      "Subject strategy notes after each session",
    ],
    service: "Academic Partner Membership - Foundation",
    productId: "membership-foundation",
  },
  {
    name: "Partner",
    price: "360",
    value: 360,
    featured: true,
    features: [
      "8 hours/month online tutoring credit",
      "Fixed weekly slot with a dedicated tutor (same tutor every week)",
      "Monthly 30-minute call with your education consultant",
      "Message support, same-day response",
      "One subject-specific exam strategy session per term",
    ],
    service: "Academic Partner Membership - Partner",
    productId: "membership-partner",
  },
  {
    name: "Full Partner",
    price: "640",
    value: 640,
    features: [
      "14 hours/month online tutoring credit, split across up to 2 subjects",
      "Everything in Partner tier",
      "Termly academic plan review directly with your education consultant",
      "Priority access to school placement consultancy at a reduced rate if needed mid-term",
      "A direct line to your education consultant",
    ],
    service: "Academic Partner Membership - Full Partner",
    productId: "membership-full-partner",
  },
];

const peace = [
  { title: "Vetted British tutors", body: "Every tutor is UK-qualified and personally screened by Britannia Crown." },
  { title: "All online", body: "No geography risk. Your tutor never has to move away for lessons to continue, and you can learn from anywhere." },
  { title: "Cancel or pause anytime", body: "No long lock-in contracts. Change tiers or pause your membership whenever your family needs to." },
  { title: "A full bench, always", body: "If your tutor is ever unavailable, another vetted tutor steps in. Your child is never left without support." },
];

const faqs = [
  {
    q: "What if my tutor becomes unavailable?",
    a: "We have a full bench of vetted British tutors. If your assigned tutor is ever unavailable, we bring in a qualified replacement so your child is never left without support.",
  },
  {
    q: "Can I change subjects?",
    a: "Yes. Your monthly hours are flexible and can be allocated across subjects as your child's needs change — just let your consultant know.",
  },
  {
    q: "Is this different from a one-off consultation?",
    a: "Yes. The free 30-minute consultation is a one-time introduction to Britannia Crown. Academic Partner Membership is an ongoing monthly relationship with recurring tutoring hours and continuous consultant oversight.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes — there is no long-term contract. You can cancel or change tiers at any time.",
  },
  {
    q: "Is membership available to families in the UK?",
    a: "Membership is delivered online, so it works wherever your family lives. Prices are in pounds sterling and are the same wherever you live; card providers convert other currencies automatically.",
  },
  {
    q: "What if I'd rather have face-to-face tutoring?",
    a: "Face-to-face tutoring is available on request, with tailored pricing based on your child's exact needs and location. Get in touch and we will talk it through.",
  },
];

export default function MembershipPage() {
  return (
    <>

      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "Academic Partner Membership", path: "/membership" },
            ]}
          />
          <span className="uk-eyebrow">Academic Partner Membership</span>
          <h1>Tired of starting over with a new tutor?</h1>
          <p>Academic Partner Membership gives your child ongoing access to vetted, UK-qualified tutors online, with a dedicated education consultant personally overseeing their academic journey, so you never have to search for a tutor again.</p>
          <div className="uk-hero-actions uk-sub-actions">
            <Link href="#tiers" className="btn-primary">See membership tiers</Link>
            <Link href="#enquire" className="btn-secondary">Book a free 15-minute call</Link>
          </div>
          <span className="uk-chip">Online · Cancel anytime · No lock-in</span>
        </div>
      </section>

      <section className="uk-section white">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">We understand</span>
            <h2 className="uk-h2">The problems we hear about most</h2>
            <p className="uk-lead">We hear the same frustrations from families every week.</p>
          </Reveal>
          <Reveal>
            <div className="uk-points">
              {problems.map((p) => (
                <div className="uk-point" key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">How it&apos;s different</span>
            <h2 className="uk-h2">How membership is different</h2>
            <p className="uk-lead">Membership isn&apos;t another tutoring app. It&apos;s backed by Britannia Crown&apos;s full education consultancy, the same team behind our school placement and home education services.</p>
          </Reveal>
          <Reveal>
            <div className="uk-steps mb-three">
              {different.map((d, i) => (
                <div className="uk-step mb-light" key={d.title}>
                  <div className="uk-step-num">{i + 1}</div>
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="uk-section white" id="tiers">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">Membership tiers</span>
            <h2 className="uk-h2">Membership tiers and prices</h2>
            <p className="uk-lead">All tiers include vetted British tutors, online delivery and direct access to Britannia Crown&apos;s consultancy team.</p>
          </Reveal>
          <Reveal>
            <div className="mb-tiers">
              {tiers.map((t) => (
                <div className={`mb-tier${t.featured ? " featured" : ""}`} key={t.name}>
                  {t.featured && <span className="mb-badge">Most popular</span>}
                  <p className="mb-tier-name">{t.name}</p>
                  <p className="mb-price"><span>£{t.price}</span> / month</p>
                  <ul>
                    {t.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <BuyButton
                    product={getProduct(t.productId)!}
                    enabled={paymentsEnabled}
                    label={paymentsEnabled ? `Join ${t.name}` : `Start ${t.name}`}
                    className={t.featured ? "btn-primary" : "btn-secondary mb-btn-dark"}
                  />
                </div>
              ))}
            </div>
          </Reveal>
          <p className="mb-note">Cancel or change tiers anytime, with no long-term contract. Prices are in pounds sterling. See our <Link href="/refunds-and-cancellations">refunds and cancellations policy</Link>.</p>
        </div>
      </section>

      <section className="uk-section dark">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">Peace of mind</span>
            <h2 className="uk-h2">No lock-in, and no gaps in tutoring</h2>
          </Reveal>
          <Reveal>
            <div className="uk-steps mb-four">
              {peace.map((p) => (
                <div className="uk-step" key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection faqs={faqs} tone="cream" />

      <EnquirySection
        title={<>Book a free 15-minute call</>}
        lead="A short, no-pressure call to understand your child's needs and find the right Academic Partner tier, before you commit to anything."
        source="membership_page"
        defaultService="Academic Partner Membership"
        context="Academic Partner Membership"
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Academic Partner Membership",
          serviceType: "Online tutoring membership",
          description:
            "Ongoing online tutoring with vetted UK-qualified tutors and a dedicated education consultant overseeing progress.",
          url: `${SITE_URL}/membership`,
          provider: { "@id": ORG_ID },
          offers: tiers.map((t) => ({
            "@type": "Offer",
            name: `${t.name} membership`,
            price: t.value,
            priceCurrency: "GBP",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: t.value,
              priceCurrency: "GBP",
              billingDuration: 1,
              unitCode: "MON",
            },
          })),
        }}
      />

    </>
  );
}
