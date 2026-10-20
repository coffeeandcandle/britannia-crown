import Link from "next/link";
import BuyButton from "./BuyButton";
import PlansTabs from "./PlansTabs";
import { getProduct, formatPrice } from "../lib/products";
import { getOffer, offerForProduct, offerPath } from "../lib/offers";
import { paymentsEnabled } from "../lib/stripe";

// Monthly hours in each membership tier, to show what an hour costs (price divided by hours).
const tiers = [
  { id: "membership-foundation", slug: "foundation", hours: 4, tag: "Flexible" },
  { id: "membership-partner", slug: "partner", hours: 8, tag: "Most popular", featured: true },
  { id: "membership-full-partner", slug: "full-partner", hours: 14, tag: "Most support" },
];
const dubai = ["uae-nursery-search", "uae-school-search", "uae-exam-prep-term", "uae-homeschool-term", "uae-concierge"];

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
        Need home education, school placement or face-to-face tutoring? <Link href="/contact">Ask for a quote</Link>.
      </p>
    </>
  );

  const dubaiPanel = (
    <>
      <div className="plans-grid plans-grid--dubai">
        {dubai.map((id) => {
          const p = getProduct(id);
          const o = offerForProduct(id);
          if (!p) return null;
          return (
            <article className="plan" key={id}>
              <h3>{o?.shortName ?? p.name}</h3>
              <p className="plan-price">{formatPrice(p)} <small>{p.unit}</small></p>
              <p className="plan-value">{p.description}</p>
              <BuyButton product={p} enabled={paymentsEnabled} label={paymentsEnabled ? (p.mode === "subscription" ? "Subscribe" : "Buy now") : "Enquire"} className="btn-primary" />
              {o && <Link href={offerPath(o)} className="plan-more">See what is included →</Link>}
            </article>
          );
        })}
      </div>
      <p className="plans-note">Fixed prices for families moving to Dubai. Prefer to talk first? <Link href="/uae">See all Dubai services</Link>.</p>
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
            { id: "uk", label: "Online tutoring", hint: "Monthly membership, anywhere", panel: ukPanel },
            { id: "dubai", label: "Moving to Dubai", hint: "Fixed-price packages", panel: dubaiPanel },
          ]}
        />
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
