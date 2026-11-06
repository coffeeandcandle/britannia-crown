import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import Breadcrumbs from "../components/Breadcrumbs";
import NewsCards from "../components/NewsCards";
import ConsultationBand from "../components/ConsultationBand";
import { collectionSchema } from "../lib/schema";
import { pageMetadata } from "../lib/seo";
import { news } from "../lib/news";

export const metadata: Metadata = pageMetadata({
  title: "Education News for Parents | Britannia Crown",
  description:
    "What changes in schools, exams and admissions mean for your family, explained plainly by British education consultants, plus news from Britannia Crown.",
  path: "/news",
});

export default function NewsPage() {
  return (
    <>
      <JsonLd
        data={collectionSchema({
          name: "Britannia Crown news",
          description: "Education news explained for parents, and updates from Britannia Crown.",
          path: "/news",
          items: news.map((n) => ({ name: n.title, path: `/news/${n.slug}` })),
        })}
      />
      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "News", path: "/news" }]} />
          <h1>Education news for parents</h1>
          <p>What changes and deadlines in schools, exams and admissions mean for your family, plus updates from Britannia Crown. Looking for lasting advice? Read our <Link href="/guides">guides for parents</Link>.</p>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap">
          <NewsCards items={news} />
        </div>
      </section>

      <ConsultationBand tone="white" />
    </>
  );
}
