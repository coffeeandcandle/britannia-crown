import Link from "next/link";
import Photo from "./Photo";
import type { NewsItem } from "../lib/news";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

export default function NewsCards({ items }: { items: NewsItem[] }) {
  return (
    <div className="gd-cards">
      {items.map((n) => (
        <Link href={`/news/${n.slug}`} className="gd-card" key={n.slug}>
          <span className="gd-card-img" aria-hidden="true">
            <Photo name={n.kind === "Company news" ? "tutoring" : "classroom"} sizes="(min-width: 1000px) 33vw, 100vw" />
          </span>
          <span className="gd-card-cat">{n.kind}</span>
          <strong className="gd-card-title">{n.title}</strong>
          <span className="gd-card-desc">{n.description}</span>
          <span className="gd-card-meta">
            <time dateTime={n.published}>{formatDate(n.published)}</time>
            <span aria-hidden="true">→</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
