import type { Metadata } from "next";
import { SITE_NAME } from "./site";

// Default share image (app/opengraph-image.tsx). Setting openGraph on a page replaces the
// inherited image, so it is added back here. Routes with their own opengraph-image file pass
// ownImage, because an explicit image here would override the generated one.
const defaultImage = { url: "/opengraph-image", width: 1200, height: 630, alt: "Britannia Crown — British Education Consultants" };

// Every page gets its own canonical URL and matching Open Graph/Twitter tags.
// Paths are relative; the root layout's metadataBase turns them into absolute URLs.
export function pageMetadata({
  title,
  description,
  path,
  ownImage = false,
  article,
}: {
  title: string;
  description: string;
  path: string;
  ownImage?: boolean;
  article?: { published: string; updated: string };
}): Metadata {
  const shared = {
    title,
    description,
    url: path,
    siteName: SITE_NAME,
    locale: "en_GB",
    ...(ownImage ? {} : { images: [defaultImage] }),
  };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: article
      ? { ...shared, type: "article", publishedTime: article.published, modifiedTime: article.updated }
      : { ...shared, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ownImage ? {} : { images: [defaultImage.url] }),
    },
  };
}
