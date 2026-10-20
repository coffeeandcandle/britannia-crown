import type { Metadata } from "next";
import Link from "next/link";
import { ClerkProvider } from "@clerk/nextjs";
import { portalEnabled, clerkConfigured, SIGN_IN_PATH } from "../lib/portal/config";
import { WHATSAPP_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "Client portal | Britannia Crown",
  robots: { index: false, follow: false },
};

function ComingSoon() {
  return (
    <>
      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <span className="uk-eyebrow">Client portal</span>
          <h1>Your family&apos;s portal is on its way</h1>
          <p>Soon you&apos;ll be able to see upcoming lessons, read your tutor&apos;s notes after each session and manage your membership here.</p>
        </div>
      </section>
      <section className="uk-section cream">
        <div className="uk-wrap uk-prose">
          <p>In the meantime, your consultant is a message away.</p>
          <div className="uk-hero-actions">
            <a href={WHATSAPP_URL} className="btn-primary">Message us on WhatsApp</a>
            <Link href="/contact" className="btn-secondary">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  if (!portalEnabled) return <ComingSoon />;
  const content = <div className="pt">{children}</div>;
  return clerkConfigured ? (
    <ClerkProvider
      signInUrl={SIGN_IN_PATH}
      signInFallbackRedirectUrl="/portal"
      afterSignOutUrl="/"
      appearance={{
        variables: {
          colorPrimary: "#6b1e3d",
          colorForeground: "#2a0d1a",
          fontFamily: "var(--font-body), system-ui, sans-serif",
          borderRadius: "6px",
        },
      }}
    >
      {content}
    </ClerkProvider>
  ) : (
    content
  );
}
