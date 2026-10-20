import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { portalEnabled, clerkConfigured, SIGN_IN_PATH } from "../lib/portal/config";
import ComingSoon from "../portal-coming-soon/ComingSoon";

export const metadata: Metadata = {
  title: "Client portal | Britannia Crown",
  robots: { index: false, follow: false },
};

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
