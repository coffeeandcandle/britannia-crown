import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import { services, getService } from "../../lib/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.seoTitle, description: service.seoDescription };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <Nav />

      <section className="uk-sub-hero">
        <div className="uk-wrap uk-hero-load">
          <span className="uk-eyebrow">{service.name}</span>
          <h1>{service.headline}</h1>
          <p>{service.lead}</p>
          <span className="uk-chip">{service.ages}</span>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">What you get</span>
            <h2 className="uk-h2">Considered, personal and <em>accountable.</em></h2>
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
            <h2 className="uk-h2">Three steps, <em>one relationship.</em></h2>
          </Reveal>
          <Reveal>
            <div className="uk-steps">
              {service.steps.map((st, i) => (
                <div className="uk-step" key={st.title}>
                  <div className="uk-step-num">0{i + 1}</div>
                  <h3>{st.title}</h3>
                  <p>{st.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="uk-section white">
        <div className="uk-wrap">
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

      <section className="uk-cta">
        <Reveal>
          <span className="uk-kicker">Get started</span>
          <h2>Let&apos;s talk about <em>your child.</em></h2>
          <p>Book a free 30-minute consultation with one of our education consultants. No obligation — just a clear, honest conversation.</p>
          <div className="uk-hero-actions">
            <Link href="/book-consultation" className="btn-primary">Book Free Consultation</Link>
            <Link href={{ pathname: "/contact", query: { service: service.contactValue } }} className="btn-secondary">Enquire About {service.name}</Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
