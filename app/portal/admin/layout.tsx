import { requireStaff, canManage } from "../../lib/portal/dal";
import PortalShell from "../PortalShell";

const roleNames = { admin: "Admin", consultant: "Consultant", tutor: "Tutor" } as const;

export default async function StaffLayout({ children }: { children: React.ReactNode }) {
  const { viewer, staff } = await requireStaff();
  const tabs = [
    { href: "/portal/admin", label: "Overview" },
    ...(canManage(staff) ? [{ href: "/portal/admin/families", label: "Families" }] : []),
    ...(staff.role === "admin" ? [{ href: "/portal/admin/staff", label: "Team" }] : []),
  ];

  return (
    <PortalShell
      viewer={viewer}
      area={`Staff area · ${roleNames[staff.role]}`}
      tabs={tabs}
      switchTo={viewer.family ? { href: "/portal", label: "Family view" } : undefined}
    >
      {children}
    </PortalShell>
  );
}
