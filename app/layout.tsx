import type { Metadata } from "next";
import Script from "next/script";
import { Libre_Caslon_Text, Public_Sans } from "next/font/google";
import JsonLd from "./components/JsonLd";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import LeadTracking from "./components/LeadTracking";
import MobileCtaBar from "./components/MobileCtaBar";
import CheckoutNotice from "./components/CheckoutNotice";
import ScrollMotion from "./components/ScrollMotion";
import EngagementPrompt from "./components/EngagementPrompt";
import { Suspense } from "react";
import { organizationSchema, websiteSchema } from "./lib/schema";
import { SITE_NAME, SITE_URL } from "./lib/site";
import "./site.css";

// Headings: Libre Caslon, a revival of William Caslon's 18th-century London type.
// Body and interface: Public Sans, a plain, highly legible sans.
const display = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const defaultTitle = "Britannia Crown | British Education Consultants for Tutoring, Home Education & School Placement";
const defaultDescription =
  "British education consultants offering private tutoring, home education, school and nursery placement, and GCSE & A-Level support from UK-trained educators. Also advising families relocating to the UAE.";

// No canonical here on purpose: a layout-level canonical is inherited by every page
// that doesn't set its own. Each page declares its own via pageMetadata().
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: defaultTitle,
  description: defaultDescription,
  applicationName: SITE_NAME,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  referrer: "no-referrer-when-downgrade",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
  themeColor: "#FBF8F4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable}`}>
      <head>
        <JsonLd data={[organizationSchema, websiteSchema]} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
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

        <Nav />
        <Suspense fallback={null}>
          <CheckoutNotice />
        </Suspense>
        <main id="main">{children}</main>
        <Footer />

        <MobileCtaBar />
        <LeadTracking />
        <ScrollMotion />
        <EngagementPrompt />
      </body>
    </html>
  );
}
