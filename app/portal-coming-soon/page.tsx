import type { Metadata } from "next";
import ComingSoon from "./ComingSoon";

// Shown in place of /portal until the portal is configured (see proxy.ts).
export const metadata: Metadata = {
  title: "Client portal | Britannia Crown",
  robots: { index: false, follow: false },
};

export default function PortalComingSoonPage() {
  return <ComingSoon />;
}
