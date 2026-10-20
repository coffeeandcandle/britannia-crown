import { requireStaff, canManage } from "../../lib/portal/dal";
import PortalShell from "../PortalShell";
import type { NavSection } from "../PortalNav";

const roleNames = { admin: "Admin", consultant: "Consultant", tutor: "Tutor" } as const;

export default async function StaffLayout({ children }: { children: React.ReactNode }) {
  const { viewer, staff } = await requireStaff();
  const manager = canManage(staff);

  // Each role sees only the parts of the staff area it can use.
  const sections: NavSection[] = [
    {
      items: [
        { href: "/portal/admin", label: manager ? "Dashboard" : "My dashboard", icon: "home", exact: true },
        { href: "/portal/admin/sessions", label: manager ? "All sessions" : "My sessions", icon: "calendar" },
      ],
    },
    ...(manager
      ? [{ title: "Clients", items: [
            { href: "/portal/admin/families", label: "Families", icon: "families" as const },
          ] }]
      : []),
    ...(staff.role === "admin"
      ? [
          {
            title: "Admin",
            items: [
              { href: "/portal/admin/contacts", label: "Contacts", icon: "chat" as const },
              { href: "/portal/admin/orders", label: "Orders", icon: "card" as const },
              { href: "/portal/admin/staff", label: "Team and access", icon: "team" as const },
            ],
          },
        ]
      : []),
    {
      items: [
        { href: "/portal/admin/help", label: "Staff guide", icon: "help" },
        ...(viewer.family ? [{ href: "/portal", label: "Switch to family view", icon: "switch" as const }] : []),
        { href: "/", label: "Back to website", icon: "back" },
      ],
    },
  ];

  return (
    <PortalShell viewer={viewer} areaLabel="Staff area" who={staff.name} role={roleNames[staff.role]} sections={sections}>
      {children}
    </PortalShell>
  );
}
