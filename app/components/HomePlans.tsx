import Link from "next/link";
import BuyButton from "./BuyButton";
import PlansTabs from "./PlansTabs";
import { getProduct, formatPrice } from "../lib/products";
import { getOffer, offerPath } from "../lib/offers";
import { getService } from "../lib/services";
import { paymentsEnabled } from "../lib/stripe";

// Monthly hours in each membership tier, to show what an hour costs (price divided by hours).
const tiers = [
  { id: "membership-foundation", slug: "foundation", hours: 4, tag: "Flexible" },
  { id: "membership-partner", slug: "partner", hours: 8, tag: "Most popular", featured: true },
  { id: "membership-full-partner", slug: "full-partner", hours: 14, tag: "Most support" },
];

const hourly = (amount: number, hours: number) => `£${Math.round(amount / hours)}`;

// "Start today": the quickest route from the home page to paying, with the plans people ask about most.
export default function HomePlans() {
  const ukPanel = (
    <>
      <div className="plans-grid">
        {tiers.map((t) => {
          const p = getProduct(t.id);
          const o = getOffer("membership", t.slug);
          if (!p || !o) return null;
          return (
            <article className={`plan${t.featured ? " is-featured" : ""}`} key={t.id}>
              <span className="plan-tag">{t.tag}</span>
              <h3>{o.shortName}</h3>
              <p className="plan-price">{formatPrice(p)} <small>a month</small></p>
              <p className="plan-value">{t.hours} hours of tutoring · about {hourly(p.amount, t.hours)} an hour</p>
              <ul className="plan-list">
                {o.included.slice(0, 4).map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <BuyButton product={p} enabled={paymentsEnabled} label={paymentsEnabled ? `Join ${o.shortName}` : "Enquire"} className={t.featured ? "btn-primary" : "btn-secondary"} />
              <Link href={offerPath(o)} className="plan-more">See everything included →</Link>
            </article>
          );
        })}
      </div>
      <p className="plans-note">
        Online tutoring with a vetted UK-qualified tutor, matched to your child. Cancel or pause anytime, no long-term contract.
        Want face-to-face or tailored tutoring? <Link href="/contact">Ask for a quote</Link>.
      </p>
    </>
  );

  const consultancy = [
    { slug: "", title: "Free consultation", tag: "Start here", price: "Free", unit: "30 minutes", body: "Talk through your child's needs with an education consultant and get a clear recommendation and prices for any support. No obligation.", href: "/book-consultation", cta: "Book a free call", featured: true },
    { slug: "school-placement", title: "School & nursery placement", tag: "Consultancy", price: "Tailored", unit: "quote after a call", cta: "Ask about placement" },
    { slug: "home-education", title: "Home education", tag: "Consultancy", price: "Tailored", unit: "quote after a call", cta: "Ask about home education" },
    { slug: "qualifications", title: "Qualifications & exams", tag: "Consultancy", price: "Tailored", unit: "quote after a call", cta: "Ask about exams" },
  ];

  const consultancyPanel = (
    <>
      <div className="plans-grid plans-grid--four">
        {consultancy.map((c) => {
          const svc = c.slug ? getService(c.slug) : undefined;
          return (
            <article className={`plan${c.featured ? " is-featured" : ""}`} key={c.title}>
              <span className="plan-tag">{c.tag}</span>
              <h3>{c.title}</h3>
              <p className={`plan-price${c.price === "Tailored" ? " plan-price--text" : ""}`}>{c.price === "Tailored" ? "Tailored quote" : c.price} <small>{c.price === "Tailored" ? "after a free call" : c.unit}</small></p>
              <p className="plan-value">{c.body ?? svc?.short}</p>
              <Link href={c.href ?? `/services/${c.slug}`} className={c.featured ? "btn-primary" : "btn-secondary"}>{c.cta}</Link>
              {svc && <Link href={`/services/${svc.slug}`} className="plan-more">Read about {svc.name.toLowerCase()} →</Link>}
            </article>
          );
        })}
      </div>
      <p className="plans-note">
        Every family is different, so consultancy is priced after a short conversation, and you will see a clear price before you commit.
      </p>
    </>
  );

  return (
    <section className="uk-section cream" id="plans" aria-labelledby="plans-title">
      <div className="uk-wrap">
        <div className="uk-head plans-head">
          <span className="uk-kicker">Start today</span>
          <h2 className="uk-h2" id="plans-title">Choose a plan and get started in minutes</h2>
          <p className="uk-lead">Pay securely online and we get to work straight away. Not ready? Your first consultation is free.</p>
        </div>
        <ul className="plans-trust">
          <li>Secure payment by Stripe</li>
          <li>Cancel or pause memberships anytime</li>
          <li>UK-trained, personally vetted tutors</li>
          <li>Free first consultation</li>
        </ul>
        <PlansTabs
          tabs={[
            { id: "uk", label: "Tutoring", hint: "Online membership, from £200 a month", panel: ukPanel },
            { id: "consultancy", label: "Consultancy", hint: "Schools, home education and exams", panel: consultancyPanel },
          ]}
        />
        <p className="plans-dubai">Relocating to Dubai? <Link href="/uae">See our Dubai packages</Link>.</p>
        <div className="plans-unsure">
          <div>
            <h3>Not sure which is right?</h3>
            <p>Talk it through with an education consultant. It is free, friendly and there is no obligation.</p>
          </div>
          <div className="plans-unsure-actions">
            <Link href="/book-consultation" className="btn-primary">Book a free 30-minute call</Link>
            <Link href="/contact" className="btn-secondary">Request a call back</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
