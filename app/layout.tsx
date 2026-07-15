import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "British Education Consultant Dubai | IGCSE & A-Level Tutor Dubai | Nursery Search | Britannia Crown",
  description:
    "British Education Partner in Dubai. Nursery search, school placement, tutoring, GCSE & A-Level prep, homeschool support. Birth to Eighteen. UK curriculum specialists serving expat families across Dubai and GCC.",
  keywords:
    "British education consultant Dubai, IGCSE tutor Dubai, A-level tutor Dubai, GCSE tutor Dubai, British tutor Dubai, UK curriculum tutor Dubai, nursery search Dubai expat, EYFS nursery Dubai, British school placement Dubai, school placement Dubai expat, homeschool support Dubai British, education concierge Dubai, British education partner Dubai, private tutor Dubai British curriculum, UK exam preparation Dubai, GCC British curriculum tutor, find British school Dubai, home tutor Dubai British school",
  openGraph: {
    title: "Britannia Crown | British Education Consultant Dubai | IGCSE & A-Level Tutors Dubai",
    description:
      "Dubai's trusted British education consultant. IGCSE tutors, A-level tutors, nursery search, British school placement and homeschool support for expat families in Dubai and GCC.",
    type: "website",
    url: "https://britanniacrown.com",
  },
  alternates: {
    canonical: "https://britanniacrown.com",
  },
  referrer: "no-referrer-when-downgrade",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
};

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Britannia Crown Education Consultants",
  alternateName: "Britannia Crown",
  url: "https://britanniacrown.com",
  logo: "https://britanniacrown.com/logo.png",
  description:
    "British education consultant in Dubai providing IGCSE tutoring, A-level tutoring, nursery search, British school placement and homeschool support for expat families across Dubai and the GCC.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+971502635427",
    contactType: "customer service",
    availableLanguage: "English",
    contactOption: "TollFree",
  },
  sameAs: ["https://instagram.com/britanniacrowneducation", "https://wa.me/971502635427"],
  areaServed: [
    { "@type": "City", name: "Dubai" },
    { "@type": "City", name: "Abu Dhabi" },
    { "@type": "Country", name: "United Arab Emirates" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "British Education Services Dubai",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "IGCSE Tutor Dubai", description: "Expert IGCSE tutoring from UK curriculum specialists in Dubai" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "A-Level Tutor Dubai", description: "A-Level preparation and tutoring for British expat families in Dubai" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "GCSE Tutor Dubai", description: "GCSE tutoring and exam preparation by qualified UK educators in Dubai" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "British School Placement Dubai", description: "Expert school search and placement for British curriculum schools in Dubai" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nursery Search Dubai", description: "EYFS nursery search and placement for expat families in Dubai" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Homeschool Support Dubai", description: "British curriculum homeschool support and coordination in Dubai and GCC" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Education Concierge Dubai", description: "Full-service British education concierge for expat families in Dubai" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MRW79LDC"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MRW79LDC');`}
        </Script>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-CNNVL7TWK0" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-CNNVL7TWK0');`}
        </Script>

        {children}
      </body>
    </html>
  );
}
