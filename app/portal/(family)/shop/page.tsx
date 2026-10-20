import Link from "next/link";
import { requireFamily } from "../../../lib/portal/dal";
import { getProduct, formatPrice } from "../../../lib/products";
import { getOffer, offerPath } from "../../../lib/offers";
import { getService } from "../../../lib/services";
import { paymentsEnabled } from "../../../lib/stripe";
import BuyButton from "../../../components/BuyButton";
import { PageHeader, Card } from "../../ui";

const tiers = [
  { id: "membership-foundation", slug: "foundation", hours: 4, tag: "Flexible" },
  { id: "membership-partner", slug: "partner", hours: 8, tag: "Most popular", featured: true },
  { id: "membership-full-partner", slug: "full-partner", hours: 14, tag: "Most support" },
];
const consultancy = ["school-placement", "home-education", "qualifications"] as const;

// Where a signed-in customer can browse and buy without leaving the portal. Their email is passed to checkout,
// so what they buy is linked to this account straight away.
export default async function PlansAndServicesPage() {
  const { family } = await requireFamily();

  return (
    <>
      <PageHeader
        title="Plans and services"
        description="Choose a plan and pay securely online. Purchases appear in your account straight away, under Purchases and billing."
      />

      <Card title="Online tutoring" description="Regular lessons with a vetted UK-qualified tutor, overseen by your education consultant. Cancel or pause anytime.">
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
                <p className="plan-value">{t.hours} hours of tutoring · about £{Math.round(p.amount / t.hours)} an hour</p>
                <ul className="plan-list">
                  {o.included.slice(0, 3).map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <BuyButton
                  product={p}
                  enabled={paymentsEnabled}
                  email={family.email}
                  label={paymentsEnabled ? `Join ${o.shortName}` : "Enquire"}
                  className={t.featured ? "btn-primary" : "btn-secondary"}
                />
                <Link href={offerPath(o)} className="plan-more">See everything included →</Link>
              </article>
            );
          })}
        </div>
      </Card>

      <Card title="Education consultancy" description="Advice and support from your education consultant. Priced after a short conversation, so you see a clear price first.">
        <div className="plans-grid">
          <article className="plan is-featured">
            <span className="plan-tag">Start here</span>
            <h3>Free consultation</h3>
            <p className="plan-price plan-price--text">Free <small>30 minutes, no obligation</small></p>
            <p className="plan-value">Talk through your child&apos;s needs and get a clear recommendation and prices for any support.</p>
            <Link href="/book-consultation" className="btn-primary">Book a free call</Link>
          </article>
          {consultancy.map((slug) => {
            const s = getService(slug);
            if (!s) return null;
            return (
              <article className="plan" key={slug}>
                <span className="plan-tag">Consultancy</span>
                <h3>{s.name}</h3>
                <p className="plan-price plan-price--text">Tailored quote <small>after a free call</small></p>
                <p className="plan-value">{s.short}</p>
                <Link href={{ pathname: "/contact", query: { service: s.contactValue } }} className="btn-secondary">Request a quote</Link>
                <Link href={`/services/${s.slug}`} className="plan-more">Read more →</Link>
              </article>
            );
          })}
        </div>
      </Card>

      <p className="plans-dubai">
        Relocating to Dubai? <Link href="/uae">See our Dubai packages</Link>. Questions about a plan? <Link href="/portal/help">Ask for help</Link>.
      </p>
    </>
  );
}
