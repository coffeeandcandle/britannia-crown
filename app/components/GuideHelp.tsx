import Link from "next/link";
import BuyButton from "./BuyButton";
import { getProduct, formatPrice } from "../lib/products";
import { offerForProduct, offerPath } from "../lib/offers";
import { paymentsEnabled } from "../lib/stripe";
import { helpFor } from "../lib/guideHelp";
import type { Guide } from "../lib/guides";
import type { Service } from "../lib/services";

// "Ways we can help": the end-of-article route from reading to buying. Real products get a buy button
// and a link to their selling page; services we quote individually get an honest tailored-quote card.
export default function GuideHelp({ guide, service }: { guide: Guide; service?: Service }) {
  const help = helpFor(guide.category);
  const items = help.productIds.map((id) => getProduct(id)).filter((p) => p !== undefined);
  const service_ = service ? { href: `/services/${service.slug}`, name: service.name } : null;

  return (
    <section className="uk-section white" id="help" aria-labelledby="help-title">
      <div className="uk-wrap">
        <div className="uk-head">
          <h2 className="uk-h2" id="help-title">{help.title}</h2>
          <p className="uk-lead">{help.lead}</p>
        </div>
        <div className="price-cards">
          {items.map((p) => {
            const o = offerForProduct(p.id);
            return (
              <article className={`price-card${p.id === "membership-partner" ? " is-featured" : ""}`} key={p.id}>
                {p.id === "membership-partner" && <span className="price-card-age">Most popular</span>}
                <h3>{o?.shortName ?? p.name}</h3>
                <p>{p.description}</p>
                <p className="price-card-price">{formatPrice(p)} <small>{p.unit}</small></p>
                <div className="price-card-actions">
                  <BuyButton product={p} enabled={paymentsEnabled} label={p.mode === "subscription" ? (paymentsEnabled ? "Join now" : "Enquire") : paymentsEnabled ? "Buy now" : "Enquire"} />
                  {o && <Link href={offerPath(o)}>See what is included →</Link>}
                </div>
              </article>
            );
          })}
          {help.quote && (
            <article className="price-card">
              <span className="price-card-age">Tailored</span>
              <h3>{help.quote.title}</h3>
              <p>{help.quote.body}</p>
              <div className="price-card-actions">
                <Link href="#enquire" className="btn-secondary">Request a call back</Link>
                {service_ && <Link href={service_.href}>{service_.name} →</Link>}
              </div>
            </article>
          )}
          <article className="price-card">
            <span className="price-card-age">Free</span>
            <h3>30-minute consultation</h3>
            <p>Talk it through with an education consultant, get a clear recommendation and prices for any support we suggest. No obligation.</p>
            <Link href="/book-consultation" className="btn-primary">Book a free call</Link>
          </article>
        </div>
      </div>
    </section>
  );
}
