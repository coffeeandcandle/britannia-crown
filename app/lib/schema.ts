import { EMAIL, INSTAGRAM_URL, LEGAL_NAME, PHONE_E164, SITE_NAME, SITE_URL, WHATSAPP_URL } from "./site";

export const ORG_ID = `${SITE_URL}/#organization`;

const abs = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": ORG_ID,
  name: LEGAL_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: EMAIL,
  description:
    "British education consultants providing private tutoring, home education support, school and nursery placement and qualifications guidance, and advising UK families relocating to the UAE.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE_E164,
    email: EMAIL,
    contactType: "customer service",
    availableLanguage: "English",
  },
  sameAs: [INSTAGRAM_URL, WHATSAPP_URL],
  areaServed: [
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United Arab Emirates" },
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: LEGAL_NAME,
  url: SITE_URL,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-GB",
};

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: abs(path),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United Kingdom" },
  };
}

export function articleSchema({
  title,
  description,
  path,
  published,
  updated,
}: {
  title: string;
  description: string;
  path: string;
  published: string;
  updated: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: published,
    dateModified: updated,
    author: { "@type": "Organization", name: LEGAL_NAME, url: SITE_URL },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: abs(path),
    image: `${abs(path)}/opengraph-image`,
    inLanguage: "en-GB",
  };
}

export type Faq = { q: string; a: string };

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
