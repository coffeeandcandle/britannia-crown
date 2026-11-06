import { renderOg } from "../../lib/og";
import { getNews, news } from "../../lib/news";

export const alt = "Britannia Crown | News";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getNews(slug);
  return renderOg({ kicker: item ? `News · ${item.kind}` : "News", title: item?.title ?? "Education news for parents" });
}
