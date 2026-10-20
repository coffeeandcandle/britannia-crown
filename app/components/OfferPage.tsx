import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import FaqSection from "./FaqSection";
import EnquirySection from "./EnquirySection";
import JsonLd from "./JsonLd";
import GuideCards from "./GuideCards";
import BuyButton from "./BuyButton";
import HeroMedia from "./HeroMedia";
import { offerPhoto } from "../lib/images";
import { getProduct, formatPrice } from "../lib/products";
import { paymentsEnabled } from "../lib/stripe";
import { offers, offerPath, type Offer } from "../lib/offers";
import { guides } from "../lib/guides";
import { ORG_ID } from "../lib/schema";
import { SITE_URL, SITE_NAME } from "../lib/site";

const sectionInfo = {
  uae: { label: "Moving to the UAE", path: "/uae", country: "United Arab Emirates" },
  membership: { label: "Membership", path: "/membership", country: "United Kingdom" },
} as const;

// A selling page for one product: what it is, who it is for, what you get, how it works, the price
// with a buy button (at the top and again mid-page), the alternatives, and the questions people ask.
export default function OfferPage({ offer }: { offer: Offer }) {
  const product = getProduct(offer.productId);
  if (!product) return null;
  const info = sectionInfo[offer.section];
  const path = offerPath(offer);
  const price = formatPrice(product);
  const buyLabel = product.mode === "subscription" ? "Subscribe" : "Buy now";
  const others = offers.filter((o) => o.section === offer.section && o.slug !== offer.slug);
  const reading = guides.filter((g) => offer.guides.includes(g.slug));

  const buy = (
    <div className="offer-buy">
      <BuyButton product={product} enabled={paymentsEnabled} label={paymentsEnabled ? `${buyLabel} for ${price}` : "Enquire about this"} />
      <Link href="/book-consultation" className="btn-secondary">Book a free 30-minute call</Link>
    </div>
  );

  return (
    <>
      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: info.label, path: info.path },
              { name: offer.shortName, path },
            ]}
          />
          <span className="uk-eyebrow">{offer.eyebrow}</span>
          <h1>{offer.headline}</h1>
          <p>{offer.lead}</p>
          <p className="offer-price">
            {price} <small>{product.unit}</small>
          </p>
          {buy}
          <ul className="offer-assure">
            {offer.assurances.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <HeroMedia name={offerPhoto[offer.slug] ?? "tutoring"} />
        </div>
      </section>

      <section className="uk-section white">
        <div className="uk-wrap uk-split">
          <div>
            <span className="uk-kicker">Who it is for</span>
            <h2 className="uk-h2">Is this right for you?</h2>
          </div>
          <div className="uk-prose">
            <ul className="offer-ticks">
              {offer.audience.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap">
          <div className="uk-head">
            <span className="uk-kicker">What you get</span>
            <h2 className="uk-h2">The difference it makes</h2>
          </div>
          <div className="uk-points">
            {offer.outcomes.map((o) => (
              <div className="uk-point" key={o.title}>
                <h3>{o.title}</h3>
                <p>{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="uk-section white">
        <div className="uk-wrap uk-split">
          <div>
            <span className="uk-kicker">What is included</span>
            <h2 className="uk-h2">Everything in {offer.shortName}</h2>
          </div>
          <div className="uk-prose">
            <ul className="offer-ticks">
              {offer.included.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="uk-section dark">
        <div className="uk-wrap">
          <div className="uk-head">
            <span className="uk-kicker">How it works</span>
            <h2 className="uk-h2">From your first step to your first result</h2>
          </div>
          <ol className="uk-steps">
            {offer.steps.map((s, i) => (
              <li className="uk-step" key={s.title}>
                <div className="uk-step-num" aria-hidden="true">{i + 1}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="uk-section cream" id="buy">
        <div className="uk-wrap">
          <div className="offer-panel">
            <div>
              <span className="uk-kicker">Ready to start?</span>
              <h2 className="uk-h2">{offer.shortName}</h2>
              <p className="offer-panel-price">
                {price} <small>{product.unit}</small>
              </p>
              <p>{product.description}</p>
              <p className="offer-panel-note">
                Secure payment by card through Stripe. See our <Link href="/refunds-and-cancellations">refunds and cancellations policy</Link>.
              </p>
            </div>
            <div className="offer-panel-actions">
              {buy}
              <Link href={{ pathname: "/contact", query: { service: product.service } }}>Have a question first? Send us a message</Link>
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="uk-section white">
          <div className="uk-wrap">
            <div className="uk-head">
              <span className="uk-kicker">Compare your options</span>
              <h2 className="uk-h2">{offer.section === "membership" ? "Other membership tiers" : "Other ways we can help"}</h2>
            </div>
            <div className="price-cards">
              {others.map((o) => {
                const p = getProduct(o.productId);
                return (
                  <article className="price-card" key={o.slug}>
                    <h3>{o.shortName}</h3>
                    <p>{o.lead}</p>
                    {p && <p className="price-card-price">{formatPrice(p)} <small>{p.unit}</small></p>}
                    <Link href={offerPath(o)} className="btn-secondary">See what is included</Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <FaqSection faqs={offer.faqs} tone="cream" />

      <EnquirySection
        title="Prefer to talk it through?"
        lead="Tell us a little about your situation and an education consultant will call you back, usually within 24 hours."
        source="offer_page"
        defaultService={product.service}
        context={offer.name}
      />

      {reading.length > 0 && (
        <section className="uk-section white">
          <div className="uk-wrap">
            <div className="uk-head">
              <span className="uk-kicker">Further reading</span>
              <h2 className="uk-h2">Guides for parents</h2>
            </div>
            <GuideCards items={reading} />
          </div>
        </section>
      )}

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: offer.name,
            description: offer.seoDescription,
            url: `${SITE_URL}${path}`,
            brand: { "@type": "Brand", name: SITE_NAME },
            offers: {
              "@type": "Offer",
              price: product.amount,
              priceCurrency: "GBP",
              availability: "https://schema.org/InStock",
              url: `${SITE_URL}${path}`,
              seller: { "@id": ORG_ID },
              ...(product.mode === "subscription"
                ? { priceSpecification: { "@type": "UnitPriceSpecification", price: product.amount, priceCurrency: "GBP", billingDuration: "P1M", unitCode: "MON" } }
                : {}),
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: offer.name,
            description: offer.seoDescription,
            url: `${SITE_URL}${path}`,
            provider: { "@id": ORG_ID },
            areaServed: { "@type": "Country", name: info.country },
          },
        ]}
      />
    </>
  );
}
