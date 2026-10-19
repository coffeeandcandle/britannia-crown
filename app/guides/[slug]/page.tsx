import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import Breadcrumbs from "../../components/Breadcrumbs";
import FaqSection from "../../components/FaqSection";
import EnquirySection from "../../components/EnquirySection";
import GuideCards from "../../components/GuideCards";
import JsonLd from "../../components/JsonLd";
import { guides, getGuide } from "../../lib/guides";
import { readGuideSource } from "../../lib/guide-source";
import { getService } from "../../lib/services";
import { getSubject } from "../../lib/subjects";
import { pageMetadata } from "../../lib/seo";
import { articleSchema } from "../../lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.seoTitle,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    ownImage: true,
    article: { published: guide.published, updated: guide.updated },
  });
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const { default: Body } = await import(`@/content/guides/${guide.slug}.mdx`);
  const { toc, minutes } = await readGuideSource(guide.slug);

  const path = `/guides/${guide.slug}`;
  const relatedGuides = guide.related.guides.map(getGuide).filter((g) => g !== undefined);
  const relatedServices = guide.related.services.map(getService).filter((s) => s !== undefined);
  const relatedSubjects = guide.related.subjects.map(getSubject).filter((s) => s !== undefined);

  return (
    <>
      <Nav />

      <section className="uk-sub-hero gd-hero">
        <div className="uk-wrap uk-hero-load">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
              { name: guide.title, path },
            ]}
          />
          <span className="uk-eyebrow">{guide.category}</span>
          <h1>{guide.title}</h1>
          <p>{guide.description}</p>
          <p className="gd-meta">
            By Britannia Crown · Updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time> · {minutes} min read
          </p>
        </div>
      </section>

      <div className="gd-body">
        <div className="uk-wrap gd-layout">
          <article className="gd-prose">
            <Body />
          </article>
          <aside className="gd-aside">
            <div className="gd-aside-inner">
              {toc.length > 0 && (
                // Not a <nav>: globals.css styles every nav element as the fixed site header.
                <div className="gd-toc" role="navigation" aria-label="On this page">
                  <p className="gd-toc-title">On this page</p>
                  <ol>
                    {toc.map((t) => (
                      <li key={t.id}>
                        <a href={`#${t.id}`}>{t.text}</a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              <div className="gd-aside-cta">
                <p className="gd-aside-cta-title">Talk to an education consultant</p>
                <p>A free, no-obligation 30-minute consultation about your child.</p>
                <Link href="#enquire" className="btn-primary">Request a Call Back</Link>
                <Link href="/book-consultation" className="gd-cta-link">or book a consultation →</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <FaqSection faqs={guide.faqs} tone="cream" />

      <EnquirySection
        title={<>{guide.enquiry.title} <em>{guide.enquiry.emphasis}</em></>}
        lead={guide.enquiry.lead}
        source="guide_page"
        defaultService={guide.enquiry.service}
        context={`Guide: ${guide.title}`}
      />

      <section className="uk-section white">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">Keep reading</span>
            <h2 className="uk-h2">Related <em>guides.</em></h2>
          </Reveal>
          <Reveal>
            <GuideCards items={relatedGuides} />
          </Reveal>
          {(relatedServices.length > 0 || relatedSubjects.length > 0) && (
            <Reveal>
              <div className="uk-others gd-related-links">
                {relatedServices.map((s) => (
                  <Link href={`/services/${s.slug}`} className="uk-other" key={s.slug}>
                    <span>Service</span>
                    <strong>{s.name}</strong>
                  </Link>
                ))}
                {relatedSubjects.map((s) => (
                  <Link href={`/tutors/${s.slug}`} className="uk-other" key={s.slug}>
                    <span>{s.level} tutoring</span>
                    <strong>{s.name} tutors</strong>
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <JsonLd
        data={articleSchema({
          title: guide.title,
          description: guide.description,
          path,
          published: guide.published,
          updated: guide.updated,
        })}
      />

      <Footer />
    </>
  );
}
