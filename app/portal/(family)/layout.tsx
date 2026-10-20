import { requireFamily, familyConsultant } from "../../lib/portal/dal";
import { EMAIL } from "../../lib/site";
import PortalShell from "../PortalShell";
import type { NavSection } from "../PortalNav";

export default async function FamilyLayout({ children }: { children: React.ReactNode }) {
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
