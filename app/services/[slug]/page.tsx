import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
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

  return (
    <>
      <Nav />

      <section className="uk-sub-hero">
        <div className="uk-wrap uk-hero-load">
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
          <div className="uk-hero-actions uk-sub-actions">
            <Link href="#enquire" className="btn-primary">Request a Call Back</Link>
            <Link href="/book-consultation" className="btn-secondary">Book Free Consultation</Link>
          </div>
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

      {service.showSubjects && (
        <section className="uk-section white">
          <div className="uk-wrap">
            <Reveal className="uk-head">
              <span className="uk-kicker">By subject</span>
              <h2 className="uk-h2">Find a tutor for <em>your child&apos;s subject.</em></h2>
              <p className="uk-lead">Specialist support for the subjects families ask us about most — and we tutor across the curriculum.</p>
            </Reveal>
            <Reveal>
              <SubjectGrid />
            </Reveal>
          </div>
        </section>
      )}

      <FaqSection faqs={service.faqs} tone="cream" />

      <EnquirySection
        title={<>Let&apos;s talk about <em>your child.</em></>}
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
                <h2 className="uk-h2">Guides for <em>parents.</em></h2>
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

      <Footer />
    </>
  );
}
