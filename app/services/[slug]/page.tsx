import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../components/Reveal";
import Breadcrumbs from "../../components/Breadcrumbs";
import FaqSection from "../../components/FaqSection";
import EnquirySection from "../../components/EnquirySection";
import SubjectGrid from "../../components/SubjectGrid";
import JsonLd from "../../components/JsonLd";
import GuideCards from "../../components/GuideCards";
import { services, getService } from "../../lib/services";
import { guidesFor } from "../../lib/guides";
import { pageMetadata } from "../../lib/seo";
import { serviceSchema } from "../../lib/schema";
import BuyButton from "../../components/BuyButton";
import AccountBand from "../../components/AccountBand";
import HeroMedia from "../../components/HeroMedia";
import { servicePhoto } from "../../lib/images";
import { products, getProduct, formatPrice } from "../../lib/products";
import { getOffer, offerPath, offerForProduct } from "../../lib/offers";
import { paymentsEnabled } from "../../lib/stripe";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.seoTitle, description: service.seoDescription, path: `/services/${service.slug}`, ownImage: true });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const others = services.filter((s) => s.slug !== service.slug);
  const reading = guidesFor("services", service.slug).slice(0, 3);
  const tiers = products.filter((p) => p.id.startsWith("membership-"));
  const from = tiers.length ? formatPrice(tiers.reduce((a, b) => (a.amount <= b.amount ? a : b))) : "";
  const dubai = service.start.dubai ? getOffer("uae", service.start.dubai.slug) : undefined;

  return (
    <>

      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.name, path },
            ]}
          />
          <span className="uk-eyebrow">{service.name}</span>
          <h1>{service.headline}</h1>
          <p>{service.lead}</p>
          <p className="offer-price offer-price--sm">
            {service.start.kind === "membership" ? (
              <>Online membership from {from} <small>a month, or a tailored quote after a free call</small></>
            ) : (
              <>Free first consultation <small>then a clear price before you commit</small></>
            )}
          </p>
          <div className="uk-hero-actions uk-sub-actions">
            <Link href="/book-consultation" className="btn-primary">Book a free 30-minute call</Link>
            <Link href="#start" className="btn-secondary">See how to get started</Link>
          </div>
          <ul className="offer-assure">
            {service.assurances.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <span className="uk-chip">{service.ages}</span>
          <HeroMedia name={servicePhoto[service.slug] ?? "tutoring"} />
        </div>
      </section>

      <section className="uk-section white">
        <div className="uk-wrap uk-split">
          <div>
            <span className="uk-kicker">Who it is for</span>
            <h2 className="uk-h2">Is {service.name.toLowerCase()} right for your family?</h2>
          </div>
          <div className="uk-prose">
            <ul className="offer-ticks">
              {service.audience.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap">
          <div className="uk-head">
            <span className="uk-kicker">The difference it makes</span>
            <h2 className="uk-h2">What changes for your child and for you</h2>
          </div>
          <div className="uk-points">
            {service.outcomes.map((o) => (
              <div className="uk-point" key={o.title}>
                <h3>{o.title}</h3>
                <p>{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="uk-section white">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">What you get</span>
            <h2 className="uk-h2">What&apos;s included</h2>
          </Reveal>
          <Reveal>
            <div className="uk-points">
              {service.points.map((p) => (
                <div className="uk-point" key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="uk-section dark">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">How it works</span>
            <h2 className="uk-h2">How it works</h2>
          </Reveal>
          <Reveal>
            <div className="uk-steps">
              {service.steps.map((st, i) => (
                <div className="uk-step" key={st.title}>
                  <div className="uk-step-num">{i + 1}</div>
                  <h3>{st.title}</h3>
                  <p>{st.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {service.showSubjects && (
        <section className="uk-section white">
          <div className="uk-wrap">
            <Reveal className="uk-head">
              <span className="uk-kicker">By subject</span>
              <h2 className="uk-h2">Find a tutor by subject</h2>
              <p className="uk-lead">Specialist support for the subjects families ask us about most — and we tutor across the curriculum.</p>
            </Reveal>
            <Reveal>
              <SubjectGrid />
            </Reveal>
          </div>
        </section>
      )}

      <section className="uk-section cream" id="start">
        <div className="uk-wrap">
          <div className="uk-head">
            <span className="uk-kicker">How to get started</span>
            <h2 className="uk-h2">Start in the way that suits you</h2>
            <p className="uk-lead">{service.start.intro}</p>
          </div>
          {service.start.kind === "membership" && (
            <div className="offer-free">
              <div>
                <h3>Not sure yet? Start with a free 30-minute consultation</h3>
                <p>A first conversation about your child with an education consultant, a clear recommendation and prices for any support we suggest. No obligation.</p>
              </div>
              <Link href="/book-consultation" className="btn-primary">Book a free call</Link>
            </div>
          )}
          <div className="price-cards">
            {service.start.kind === "quote" && (
              <article className="price-card">
                <span className="price-card-age">Free</span>
                <h3>30-minute consultation</h3>
                <p>A first conversation about your child with an education consultant, a clear recommendation and prices for any support we suggest. No obligation.</p>
                <Link href="/book-consultation" className="btn-primary">Book a free call</Link>
              </article>
            )}
            {service.start.kind === "membership" &&
              tiers.map((t) => {
                const o = offerForProduct(t.id);
                return (
                  <article className={`price-card${t.id === "membership-partner" ? " is-featured" : ""}`} key={t.id}>
                    <span className="price-card-age">{t.id === "membership-partner" ? "Most popular" : "Online membership"}</span>
                    <h3>{o?.shortName ?? t.name}</h3>
                    <p>{t.description}</p>
                    <p className="price-card-price">{formatPrice(t)} <small>{t.unit}</small></p>
                    <div className="price-card-actions">
                      <BuyButton product={getProduct(t.id)!} enabled={paymentsEnabled} label={paymentsEnabled ? "Join now" : "Enquire"} />
                      {o && <Link href={offerPath(o)}>See what is included →</Link>}
                    </div>
                  </article>
                );
              })}
            {service.start.kind === "quote" && (
              <article className="price-card">
                <span className="price-card-age">Tailored</span>
                <h3>A plan and a clear price</h3>
                <p>Tell us about your child and we will agree the plan and the price together, so you know exactly what you are paying for before you commit.</p>
                <Link href="#enquire" className="btn-secondary">Request a call back</Link>
              </article>
            )}
            {service.start.strategy && (
              <article className="price-card">
                <span className="price-card-age">In depth</span>
                <h3>Strategy session</h3>
                <p>{service.start.strategy}</p>
                <Link href="/book-consultation?session=strategy" className="btn-secondary">Request a strategy session</Link>
              </article>
            )}
          </div>
          {dubai && service.start.dubai && (
            <p className="offer-dubai">
              <Link href={offerPath(dubai)}>{service.start.dubai.label} →</Link>
            </p>
          )}
        </div>
      </section>

      <AccountBand variant="inline" location="service_page" />

      <FaqSection faqs={service.faqs} tone="white" />

      <EnquirySection
        title={<>Let&apos;s talk about your child</>}
        lead={`Tell us a little about your child and an education consultant will call you back to discuss ${service.name.toLowerCase()}.`}
        source="service_page"
        defaultService={service.contactValue}
        context={service.name}
      />

      <section className="uk-section white">
        <div className="uk-wrap">
          {reading.length > 0 && (
            <div className="gd-reading">
              <Reveal className="uk-head">
                <span className="uk-kicker">Further reading</span>
                <h2 className="uk-h2">Guides for parents</h2>
              </Reveal>
              <Reveal>
                <GuideCards items={reading} />
              </Reveal>
            </div>
          )}
          <Reveal className="uk-head">
            <span className="uk-kicker">Also from Britannia Crown</span>
          </Reveal>
          <Reveal>
            <div className="uk-others">
              {others.map((o) => (
                <Link href={`/services/${o.slug}`} className="uk-other" key={o.slug}>
                  <span>{o.numeral}</span>
                  <strong>{o.name}</strong>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.seoDescription,
          path,
          serviceType: service.serviceType,
        })}
      />

    </>
  );
}
