import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OfferPage from "../../components/OfferPage";
import { offers, getOffer, offerPath } from "../../lib/offers";
import { pageMetadata } from "../../lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return offers.filter((o) => o.section === "membership").map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOffer("membership", slug);
  if (!offer) return {};
  return pageMetadata({ title: offer.seoTitle, description: offer.seoDescription, path: offerPath(offer) });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const offer = getOffer("membership", slug);
  if (!offer) notFound();
  return <OfferPage offer={offer} />;
}
