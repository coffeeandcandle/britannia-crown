import Link from "next/link";
import type { Guide } from "../lib/guides";
import { readGuideSource } from "../lib/guide-source";

// Server component: reads each guide's source for its reading time.
export default async function GuideCards({ items, feature = false }: { items: Guide[]; feature?: boolean }) {
  const minutes = await Promise.all(items.map((g) => readGuideSource(g.slug).then((s) => s.minutes)));

  return (
    <div className={`gd-cards${feature ? " gd-cards--feature" : ""}`}>
      {items.map((g, i) => (
        <Link href={`/guides/${g.slug}`} className="gd-card" key={g.slug}>
          <span className="gd-card-cat">{g.category}</span>
          <strong className="gd-card-title">{g.title}</strong>
          <span className="gd-card-desc">{g.description}</span>
          <span className="gd-card-meta">
            <span>{minutes[i]} min read</span>
            <span aria-hidden="true">→</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
