import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingProgress, GuideToc } from "../../components/GuideReader";
import Breadcrumbs from "../../components/Breadcrumbs";
import FaqSection from "../../components/FaqSection";
import EnquirySection from "../../components/EnquirySection";
import GuideCards from "../../components/GuideCards";
import GuideHelp from "../../components/GuideHelp";
import AccountBand from "../../components/AccountBand";
import Photo from "../../components/Photo";
import { categoryPhoto } from "../../lib/images";
import JsonLd from "../../components/JsonLd";
import { guides, getGuide } from "../../lib/guides";
import { readGuideSource } from "../../lib/guide-source";
import { getService } from "../../lib/services";
import { getSubject } from "../../lib/subjects";
import { pageMetadata } from "../../lib/seo";
import { articleSchema } from "../../lib/schema";
import { EMAIL } from "../../lib/site";
import ConsultationBand from "../../components/ConsultationBand";

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
      <ReadingProgress target="#guide-body" />

      <section className="uk-sub-hero gd-hero">
        <div className="uk-wrap">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
              { name: guide.title, path },
            ]}
          />
          <h1>{guide.title}</h1>
          <p>{guide.description}</p>
          <p className="gd-meta">
            By Britannia Crown · Updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time> · {minutes} min read
          </p>
          <div className="gd-hero-img">
            <Photo name={categoryPhoto[guide.category] ?? "tutoring"} sizes="(min-width: 1200px) 1180px, 100vw" priority />
          </div>
        </div>
      </section>

      <div className="gd-body">
        <div className="uk-wrap gd-layout">
          <div>
            {toc.length > 0 && (
              <details className="gd-toc-mobile">
                <summary>On this page</summary>
                <ol>
                  {toc.map((t) => (
                    <li key={t.id}><a href={`#${t.id}`}>{t.text}</a></li>
                  ))}
                </ol>
              </details>
            )}
            <article className="gd-prose" id="guide-body">
              <Body />
            </article>
            <section className="gd-next" aria-labelledby="gd-next-title">
              <h2 id="gd-next-title">Want advice on your child&apos;s situation?</h2>
              <p>Our consultants answer questions like these every day. Choose whichever is easiest for you.</p>
              <div className="gd-next-options">
                <Link href="/book-consultation" className="gd-next-option">
                  <strong>Book a free call</strong>
                  <span>Pick a 30-minute slot with an education consultant.</span>
                </Link>
                <Link href="#enquire" className="gd-next-option">
                  <strong>Request a call back</strong>
                  <span>Leave your details and we&apos;ll ring you within 24 hours.</span>
                </Link>
                <a href={`mailto:${EMAIL}`} className="gd-next-option">
                  <strong>Email us</strong>
                  <span>Ask a quick question at {EMAIL} and get a reply from a person.</span>
                </a>
              </div>
            </section>
          </div>
          <aside className="gd-aside">
            <div className="gd-aside-inner">
              {toc.length > 0 && <GuideToc toc={toc} />}
              <div className="gd-aside-cta">
                <p className="gd-aside-cta-title">Talk to an education consultant</p>
                <p>A free, no-obligation 30-minute consultation about your child.</p>
                <Link href="#enquire" className="btn-primary">Request a call back</Link>
                <Link href="/book-consultation" className="gd-cta-link">or book a consultation →</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <GuideHelp guide={guide} service={relatedServices[0]} />

      <ConsultationBand tone="cream" />
      <AccountBand variant="inline" location="guide_page" />

      <FaqSection faqs={guide.faqs} tone="cream" />

      <EnquirySection
        title={`${guide.enquiry.title} ${guide.enquiry.emphasis}`}
        lead={guide.enquiry.lead}
        source="guide_page"
        defaultService={guide.enquiry.service}
        context={`Guide: ${guide.title}`}
      />

      <section className="uk-section white">
        <div className="uk-wrap">
          <div className="uk-head">
            <h2 className="uk-h2">Related guides</h2>
          </div>
          <GuideCards items={relatedGuides} />
          {(relatedServices.length > 0 || relatedSubjects.length > 0) && (
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

    </>
  );
}
