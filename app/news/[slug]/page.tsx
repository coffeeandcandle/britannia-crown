import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../components/Breadcrumbs";
import EnquirySection from "../../components/EnquirySection";
import GuideCards from "../../components/GuideCards";
import ConsultationBand from "../../components/ConsultationBand";
import JsonLd from "../../components/JsonLd";
import { news, getNews } from "../../lib/news";
import { getGuide } from "../../lib/guides";
import { getService } from "../../lib/services";
import { readGuideSource } from "../../lib/guide-source";
import { pageMetadata } from "../../lib/seo";
import { articleSchema } from "../../lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getNews(slug);
  if (!item) return {};
  return pageMetadata({
    title: item.seoTitle,
    description: item.description,
    path: `/news/${item.slug}`,
    ownImage: true,
    article: { published: item.published, updated: item.updated },
  });
}

const enquiryService: Record<string, string> = {
  tutoring: "Tutoring",
  "home-education": "Home Education",
  "school-placement": "School Placement",
  qualifications: "Qualifications",
};

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

export default async function NewsItemPage({ params }: Props) {
  const { slug } = await params;
  const item = getNews(slug);
  if (!item) notFound();

  const { default: Body } = await import(`@/content/news/${item.slug}.mdx`);
  const { minutes } = await readGuideSource(item.slug, "news");
  const path = `/news/${item.slug}`;
  const guides = item.related.guides.map(getGuide).filter((g) => g !== undefined);
  const services = item.related.services.map(getService).filter((s) => s !== undefined);

  return (
    <>
      <section className="uk-sub-hero gd-hero">
        <div className="uk-wrap">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "News", path: "/news" },
              { name: item.title, path },
            ]}
          />
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <p className="gd-meta">
            {item.kind} · By Britannia Crown · <time dateTime={item.published}>{formatDate(item.published)}</time>
            {item.updated !== item.published && <> · Updated <time dateTime={item.updated}>{formatDate(item.updated)}</time></>} · {minutes} min read
          </p>
        </div>
      </section>

      <div className="gd-body">
        <div className="uk-wrap gd-layout">
          <article className="gd-prose" id="guide-body">
            <Body />
          </article>
          <aside className="gd-aside">
            <div className="gd-aside-inner">
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

      <ConsultationBand tone="cream" />

      <EnquirySection
        title="Want advice on your child's situation?"
        lead="Tell us a little about your child and an education consultant will call you back, usually within 24 hours."
        source="news_page"
        defaultService={enquiryService[services[0]?.slug ?? ""] ?? "General Enquiry"}
        context={`News: ${item.title}`}
      />

      {(guides.length > 0 || services.length > 0) && (
        <section className="uk-section white">
          <div className="uk-wrap">
            {guides.length > 0 && (
              <>
                <div className="uk-head">
                  <h2 className="uk-h2">Related guides</h2>
                </div>
                <GuideCards items={guides} />
              </>
            )}
            {services.length > 0 && (
              <div className="uk-others gd-related-links">
                {services.map((s) => (
                  <Link href={`/services/${s.slug}`} className="uk-other" key={s.slug}>
                    <span>Service</span>
                    <strong>{s.name}</strong>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <JsonLd data={articleSchema({ title: item.title, description: item.description, path, published: item.published, updated: item.updated })} />
    </>
  );
}
