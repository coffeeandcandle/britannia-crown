import { getViewer, requireStaff, canManage } from "../../lib/portal/dal";
import { Suspense } from "react";
import PortalShell from "../PortalShell";
import PortalFrameSkeleton from "../PortalFrameSkeleton";
import PortalRedirect from "../PortalRedirect";
import type { NavSection } from "../PortalNav";

const roleNames = { admin: "Admin", consultant: "Consultant", tutor: "Tutor" } as const;

async function StaffFrame({ children }: { children: React.ReactNode }) {
  const who = await getViewer();
  if (who && !who.staff) return <PortalRedirect to="/portal/staff/no-access" />;
  const { viewer, staff } = await requireStaff();
  const manager = canManage(staff);

  // Each role sees only the parts of its own area it can use.
  const sections: NavSection[] = [
    {
      items: [
        { href: "/portal/admin", label: staff.role === "admin" ? "Business overview" : manager ? "Dashboard" : "My dashboard", icon: "home", exact: true },
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
        { href: "/portal/admin/help", label: "Guide", icon: "help" },
        ...(viewer.family ? [{ href: "/portal", label: "Switch to client view", icon: "switch" as const }] : []),
        { href: "/", label: "Back to website", icon: "back" },
      ],
    },
  ];

  return (
    <PortalShell viewer={viewer} areaLabel={`${roleNames[staff.role]} area`} who={staff.name} role={roleNames[staff.role]} sections={sections}>
      {children}
    </PortalShell>
  );
}

// The layout itself returns at once: the skeleton frame shows while the person's details load.
export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<PortalFrameSkeleton />}>
      <StaffFrame>{children}</StaffFrame>
    </Suspense>
  );
}
