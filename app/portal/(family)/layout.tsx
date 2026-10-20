import { getViewer, requireFamily, familyConsultant } from "../../lib/portal/dal";
import { EMAIL } from "../../lib/site";
import { Suspense } from "react";
import PortalShell from "../PortalShell";
import PortalFrameSkeleton from "../PortalFrameSkeleton";
import PortalRedirect from "../PortalRedirect";
import type { NavSection } from "../PortalNav";

async function FamilyFrame({ children }: { children: React.ReactNode }) {
  // Staff without a family record, and people with no account, are moved on with the skeleton
  // still showing (getViewer is cached, so requireFamily below doesn't query twice).
  const who = await getViewer();
  if (who && !who.family) return <PortalRedirect to={who.staff ? "/portal/admin" : "/portal/no-account"} />;
  const { viewer, family } = await requireFamily();
  const consultant = await familyConsultant(family);

  const sections: NavSection[] = [
    {
      items: [
        { href: "/portal", label: "Overview", icon: "home", exact: true },
        { href: "/portal/sessions", label: "Sessions", icon: "calendar" },
        { href: "/portal/notes", label: "Notes and homework", icon: "notes" },
        { href: "/portal/billing", label: "Billing", icon: "card" },
      ],
    },
    {
      title: "Get in touch",
      items: [
        { href: "/book-consultation", label: "Book a session", icon: "plus" },
        { href: `mailto:${consultant?.email ?? EMAIL}`, label: "Email your consultant", icon: "chat", external: true },
        { href: "/portal/help", label: "Help", icon: "help" },
      ],
    },
    {
      items: [
        ...(viewer.staff ? [{ href: "/portal/admin", label: "Switch to staff area", icon: "switch" as const }] : []),
        { href: "/", label: "Back to website", icon: "back" },
      ],
    },
  ];

  return (
    <PortalShell viewer={viewer} areaLabel="Family portal" who={family.name} role="Family account" sections={sections}>
      {children}
    </PortalShell>
  );
}

// The layout itself returns at once: the skeleton frame shows while the signed-in family's
// details load, so moving from the website into the portal never leaves a blank gap.
export default function FamilyLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<PortalFrameSkeleton />}>
      <FamilyFrame>{children}</FamilyFrame>
    </Suspense>
  );
}
