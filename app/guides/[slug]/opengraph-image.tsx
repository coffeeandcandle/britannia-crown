import { renderOg } from "../../lib/og";
import { getGuide, guides } from "../../lib/guides";

export const alt = "Britannia Crown — Guides for parents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  return renderOg({ kicker: guide ? `Guide · ${guide.category}` : "Guides for Parents", title: guide?.title ?? "Guides for parents" });
}
