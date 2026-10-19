import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "./uk.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://britanniacrown.com"),
  title: "Britannia Crown | British Education Consultants — Tutoring, Home Education & School Placement",
  description:
    "British education consultants offering private tutoring, home education, school and nursery placement, and GCSE & A-Level support from UK-trained educators. Also advising families relocating to the UAE.",
  keywords:
    "education consultant UK, private tutor UK, home education support, school placement consultant, GCSE tutor, A-Level tutor, 11+ tutor, education consultancy, moving to Dubai schools",
  openGraph: {
    title: "Britannia Crown | British Education Consultants",
    description:
      "Private tutoring, home education, school placement and qualifications — personal advice from UK-trained educators.",
    type: "website",
    url: "https://britanniacrown.com",
    locale: "en_GB",
  },
  alternates: { canonical: "https://britanniacrown.com" },
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
    "British education consultants providing private tutoring, home education support, school and nursery placement and qualifications guidance, and advising UK families relocating to the UAE.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+971502635427",
    contactType: "customer service",
    availableLanguage: "English",
    contactOption: "TollFree",
  },
  sameAs: ["https://instagram.com/britanniacrowneducation", "https://wa.me/971502635427"],
  areaServed: [
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United Arab Emirates" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "British Education Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Private Tutoring", description: "UK-trained private tutors for primary, GCSE and A-Level, personally matched and overseen by a consultant" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Education", description: "British-curriculum home education planning, specialist tutors and qualifications guidance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "School & Nursery Placement", description: "Independent research, shortlisting and application support from nursery to Sixth Form" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Qualifications & Exam Success", description: "GCSE and A-Level teaching, exam technique and private-candidate support" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Moving to the UAE", description: "Education advice and placement for UK families relocating to Dubai and the UAE" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
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
