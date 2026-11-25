import { getViewer, requireStaff, canManage, pendingRequestCount, pendingApplicantCount } from "../../lib/portal/dal";
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
  const [pendingRequests, pendingApplicants] = staff.role === "admin" ? await Promise.all([pendingRequestCount(), pendingApplicantCount()]) : [0, 0];
  const count = (label: string, n: number) => (n > 0 ? `${label} (${n})` : label);

  // Each role sees only the parts of its own area it can use.
  // Grouped by what each role comes to do, each item named after the action, with a hint underneath.
  const isAdmin = staff.role === "admin";
  const sections: NavSection[] = [
    {
      items: [
        isAdmin
          ? { href: "/portal/admin", label: "Business overview", hint: "Today, takings and what needs doing", icon: "home", exact: true }
          : { href: "/portal/admin", label: "My dashboard", hint: manager ? "Today and what needs doing" : "Today's lessons and notes to write", icon: "home", exact: true },
      ],
    },
    {
      title: "Lessons",
      items: [
        manager
          ? { href: "/portal/admin/sessions", label: "All lessons", hint: "Join, update, write notes", icon: "calendar" }
          : { href: "/portal/admin/sessions", label: "My lessons", hint: "Join, write notes, cancel", icon: "calendar" },
        ...(isAdmin ? [{ href: "/portal/admin/requests", label: count("Lesson requests to approve", pendingRequests), hint: "Families asking for a lesson", icon: "plus" as const }] : []),
        ...(manager ? [{ href: "/portal/admin/consultations", label: "Free consultation bookings", hint: "Calls booked from the website", icon: "calendar" as const }] : []),
        { href: "/portal/admin/availability", label: "My available times", hint: "When you can teach or take calls", icon: "calendar" },
      ],
    },
    ...(manager
      ? [
          {
            title: "Clients",
            items: [
              { href: "/portal/admin/families", label: "Families", hint: "Add a family, children, schedule lessons", icon: "families" as const },
              ...(isAdmin
                ? [
                    { href: "/portal/admin/contacts", label: "Enquiries and leads (CRM)", hint: "Everyone who has contacted us", icon: "chat" as const },
                    { href: "/portal/admin/orders", label: "Orders and payments", hint: "Everything bought online", icon: "card" as const },
                  ]
                : []),
            ],
          },
        ]
      : []),
    ...(isAdmin
      ? [
          {
            title: "Team",
            items: [
              { href: "/portal/admin/applications", label: count("Team sign-ups to approve", pendingApplicants), hint: "New tutors and consultants", icon: "plus" as const },
              { href: "/portal/admin/tutors", label: "Tutors", hint: "Their lessons and calendars", icon: "team" as const },
              { href: "/portal/admin/consultants", label: "Consultants", hint: "Their families and calendars", icon: "team" as const },
              { href: "/portal/admin/staff", label: "Roles and access", hint: "Add people, change roles", icon: "team" as const },
              { href: "/portal/admin/activity", label: "Activity log", hint: "Everything everyone did, with times", icon: "notes" as const },
            ],
          },
        ]
      : []),
    {
      items: [
        { href: "/portal/admin/help", label: isAdmin ? "Admin guide" : manager ? "Consultant guide" : "Tutor guide", hint: "How to do each task", icon: "help" },
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
