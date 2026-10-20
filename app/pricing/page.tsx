import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "../lib/seo";
import Breadcrumbs from "../components/Breadcrumbs";
import BuyButton from "../components/BuyButton";
import FaqSection from "../components/FaqSection";
import { products, formatPrice, type Product } from "../lib/products";
import { sessionTypes, isBookable, priceLabel } from "../lib/sessions";
import { paymentsEnabled } from "../lib/stripe";

export const metadata: Metadata = pageMetadata({
  title: "Prices | Tutoring Membership & Education Services | Britannia Crown",
  description:
    "Clear prices for Britannia Crown's tutoring membership, consultations and UAE relocation packages. Pay securely online or start with a free consultation.",
  path: "/pricing",
});

const membershipIds = ["membership-foundation", "membership-partner", "membership-full-partner"];
const membershipPerks: Record<string, string[]> = {
  "membership-foundation": ["4 hours of online tutoring a month", "Monthly 15-minute parent check-in", "Message support (48-hour reply)", "Notes after every session"],
  "membership-partner": ["8 hours of online tutoring a month", "The same tutor, at a fixed weekly time", "Monthly 30-minute consultant call", "Same-day message support", "A termly exam strategy session"],
  "membership-full-partner": ["14 hours a month, across up to 2 subjects", "Everything in Partner", "Termly plan review with your consultant", "A direct line to your consultant"],
};
const uaeIds = ["uae-nursery-search", "uae-school-search", "uae-exam-prep-term", "uae-homeschool-term", "uae-concierge"];

const pick = (ids: string[]) => ids.map((id) => products.find((p) => p.id === id)).filter((p): p is Product => Boolean(p));

const faqs = [
  { q: "How does paying online work?", a: "Choose a service and you'll go to a secure Stripe checkout page. You can pay by card, Apple Pay or Google Pay. You get a receipt by email straight away, and an education consultant contacts you within one working day to get started." },
  { q: "Can I cancel a membership?", a: "Yes. Memberships are monthly with no long-term contract. You can cancel or change your plan at any time from the Billing page in your family portal, or by emailing us." },
  { q: "What currency are the prices in?", a: "All prices are in pounds sterling (GBP) and include all fees. If you pay with a card in another currency, such as UAE dirhams, your card provider converts it automatically." },
  { q: "What if I change my mind?", a: "You can cancel within 14 days of buying for a refund, less the value of any sessions already delivered. Memberships can be cancelled at any time and stop at the end of the month you've paid for. Our refunds and cancellations policy has the full details." },
  { q: "I'm not sure which option is right for us", a: "Book a free 30-minute consultation. We'll talk through your child's needs and recommend the right option, with no obligation to buy anything." },
  { q: "Is my payment secure?", a: "Payments are handled by Stripe, which is used by millions of businesses. We never see or store your card details." },
];

function ProductCard({ p, perks, featured }: { p: Product; perks?: string[]; featured?: boolean }) {
  return (
    <article className={`shop-card${featured ? " is-featured" : ""}`}>
      {featured && <span className="shop-badge">Most popular</span>}
      <h3>{p.name.replace("Academic Partner Membership: ", "").replace(" (Dubai)", "")}</h3>
      <p className="shop-price">
        <span>{formatPrice(p)}</span> {p.unit}
      </p>
      <p className="shop-desc">{p.description}</p>
      {perks && (
        <ul className="shop-perks">
          {perks.map((x) => <li key={x}>{x}</li>)}
        </ul>
      )}
      <div className="shop-actions">
        <BuyButton
          product={p}
          enabled={paymentsEnabled}
          label={paymentsEnabled ? (p.mode === "subscription" ? "Start membership" : "Buy now") : "Enquire about this"}
          className={featured ? "btn-primary" : "btn-secondary"}
        />
        {p.mode === "subscription" && <span className="shop-note">Monthly · cancel anytime</span>}
      </div>
    </article>
  );
}

export default function PricingPage() {
  const memberships = pick(membershipIds);
  const uae = pick(uaeIds);

  return (
    <>
      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Prices", path: "/pricing" }]} />
          <span className="uk-eyebrow">Prices</span>
          <h1>Clear prices, and you can pay online</h1>
          <p>Choose a service and pay securely, or start with a free consultation if you&apos;d like advice first.</p>
          <ul className="shop-trust">
            <li>Secure payment by Stripe</li>
            <li>Memberships cancel anytime</li>
            <li>First consultation free</li>
          </ul>
        </div>
      </section>

      <nav className="shop-jump uk-wrap" aria-label="On this page">
        <a href="#consultations">Consultations</a>
        <a href="#membership">Tutoring membership</a>
        <a href="#uae">Moving to the UAE</a>
        <a href="#tailored">Tailored services</a>
      </nav>

      <section className="uk-section cream" id="consultations">
        <div className="uk-wrap">
          <div className="uk-head">
            <span className="uk-kicker">Start here</span>
            <h2 className="uk-h2">Consultations and trial lessons</h2>
            <p className="uk-lead">Not sure what you need? Most families start with a free call.</p>
          </div>
          <div className="shop-grid">
            {sessionTypes.map((s) => (
              <article className={`shop-card${s.price === null ? " is-featured" : ""}`} key={s.id}>
                <h3>{s.name}</h3>
                <p className="shop-price">
                  <span>{isBookable(s) || s.price === null ? priceLabel(s) : "Paid session"}</span> {s.minutes} minutes
                </p>
                <p className="shop-desc">{s.summary}</p>
                <ul className="shop-perks">{s.includes.map((x) => <li key={x}>{x}</li>)}</ul>
                <div className="shop-actions">
                  <Link href={`/book-consultation?session=${s.id}`} className={s.price === null ? "btn-primary" : "btn-secondary"}>
                    {isBookable(s) ? "Choose a time" : "Request this session"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="uk-section white" id="membership">
        <div className="uk-wrap">
          <div className="uk-head">
            <span className="uk-kicker">Ongoing tutoring</span>
            <h2 className="uk-h2">Academic Partner Membership</h2>
            <p className="uk-lead">
              Regular online tutoring with vetted UK tutors, overseen by your own education consultant.{" "}
              <Link href="/membership">How membership works</Link>.
            </p>
          </div>
          <div className="shop-grid">
            {memberships.map((p) => (
              <ProductCard key={p.id} p={p} perks={membershipPerks[p.id]} featured={p.id === "membership-partner"} />
            ))}
          </div>
        </div>
      </section>

      <section className="uk-section cream" id="uae">
        <div className="uk-wrap">
          <div className="uk-head">
            <span className="uk-kicker">Moving to the UAE</span>
            <h2 className="uk-h2">Packages for families relocating to Dubai</h2>
            <p className="uk-lead">
              Fixed prices for school and nursery placement, exam preparation and ongoing support.{" "}
              <Link href="/uae">More about our UAE services</Link>.
            </p>
          </div>
          <div className="shop-grid">
            {uae.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      <section className="uk-section white" id="tailored">
        <div className="uk-wrap uk-split">
          <div>
            <span className="uk-kicker">Tailored to your child</span>
            <h2 className="uk-h2">Tutoring, home education and school placement in the UK</h2>
          </div>
          <div className="uk-prose">
            <p>These services depend on your child&apos;s subjects, stage and goals, so we quote after a short conversation. You&apos;ll get a clear price before you commit to anything.</p>
            <div className="uk-hero-actions">
              <Link href="/contact" className="btn-primary">Ask for a quote</Link>
              <Link href="/book-consultation" className="btn-secondary">Book a free call</Link>
            </div>
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} tone="cream" />

      <section className="uk-section white">
        <div className="uk-wrap">
          <p className="shop-terms">
            Prices include all fees. By paying online you agree to our <Link href="/terms-and-conditions">terms and conditions</Link> and <Link href="/refunds-and-cancellations">refunds and cancellations policy</Link>.
            Questions before you buy? <Link href="/contact">Send us an enquiry</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
