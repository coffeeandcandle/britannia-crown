import { renderOg } from "../../lib/og";
import { getService, services } from "../../lib/services";

export const alt = "Britannia Crown | British Education Consultants";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return renderOg({
    kicker: service?.name ?? "Our Services",
    title: service?.headline ?? "Education, considered with care.",
  });
}
