import { requireFamily } from "../../lib/portal/dal";
import PortalShell from "../PortalShell";

const tabs = [
  { href: "/portal", label: "Overview" },
  { href: "/portal/sessions", label: "Sessions" },
  { href: "/portal/notes", label: "Notes" },
  { href: "/portal/billing", label: "Billing" },
];

export default async function FamilyLayout({ children }: { children: React.ReactNode }) {
  const { viewer } = await requireFamily();
  return (
    <PortalShell
      viewer={viewer}
      area="Family portal"
      tabs={tabs}
      switchTo={viewer.staff ? { href: "/portal/admin", label: "Staff area" } : undefined}
    >
      {children}
    </PortalShell>
  );
}
