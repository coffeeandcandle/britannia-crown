import { getViewer, requireFamily, familyConsultant } from "../../lib/portal/dal";
import { Suspense } from "react";
import PortalShell from "../PortalShell";
import PortalFrameSkeleton from "../PortalFrameSkeleton";
import PortalRedirect from "../PortalRedirect";
import type { NavSection } from "../PortalNav";

async function FamilyFrame({ children }: { children: React.ReactNode }) {
  // Staff without a family record, and people with no account, are moved on with the skeleton
  // still showing (getViewer is cached, so requireFamily below doesn't query twice).
  const who = await getViewer();
  if (who && !who.family && who.staff) return <PortalRedirect to="/portal/admin" />;
  const { viewer, family } = await requireFamily();
  const consultant = await familyConsultant(family);

  // Grouped by what families come to do, each item named after the action.
  const sections: NavSection[] = [
    {
      items: [{ href: "/portal", label: "Home", hint: "Your next lesson and what's new", icon: "home", exact: true }],
    },
    {
      title: "Lessons",
      items: [
        { href: "/portal/sessions", label: "My lessons", hint: "Upcoming and past, join or cancel", icon: "calendar" },
        { href: "/portal/book", label: "Book a session", hint: "Choose a time for a paid session", icon: "plus" },
        { href: "/portal/request", label: "Ask for a new lesson", hint: "Tell us the subject and times", icon: "plus" },
        { href: "/portal/notes", label: "Tutor notes and homework", hint: "What the tutor wrote after each lesson", icon: "notes" },
      ],
    },
    {
      title: "My account",
      items: [
        { href: "/portal/family", label: "My children and details", hint: "Add a child, update your details", icon: "families" },
        { href: "/portal/documents", label: "Documents to read or sign", hint: "Forms, letters and reports", icon: "notes" },
        { href: "/portal/shop", label: "Buy a plan or service", hint: "Tutoring, advocacy and sessions", icon: "card" },
        { href: "/portal/billing", label: "Payments and receipts", hint: "Invoices, card and cancelling a plan", icon: "card" },
      ],
    },
    {
      title: "Contact us",
      items: [
        { href: "/portal/notes-for-team", label: "Send a note to the team", hint: "Concerns or things we should know", icon: "chat" },
        { href: "/portal/contact-consultant", label: "Contact my consultant", hint: consultant ? `Message ${consultant.name}` : "Message the Britannia Crown team", icon: "chat" },
        { href: "/portal/help", label: "Help and FAQs", hint: "How the portal works", icon: "help" },
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
    <PortalShell viewer={viewer} areaLabel="Client portal" who={family.name} role="Client account" sections={sections}>
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
