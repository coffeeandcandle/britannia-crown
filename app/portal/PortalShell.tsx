import { UserButton } from "@clerk/nextjs";
import { clerkConfigured } from "../lib/portal/config";
import type { Viewer } from "../lib/portal/dal";
import PortalNav, { type NavSection } from "./PortalNav";

// The portal's own frame: sidebar menu for the person's role, account details and content area.
// The marketing site's header and footer are hidden on portal pages (see .pt-app in site.css).
export default function PortalShell({
  viewer,
  areaLabel,
  who,
  role,
  sections,
  children,
}: {
  viewer: Viewer;
  areaLabel: string;
  who: string;
  role: string;
  sections: NavSection[];
  children: React.ReactNode;
}) {
  const account = (
    <div className="ptn-user">
      {clerkConfigured ? <UserButton /> : <span className="ptn-avatar" aria-hidden="true">{who.slice(0, 1).toUpperCase()}</span>}
      <span className="ptn-user-text">
        <strong>{who}</strong>
        <span>{role}</span>
        <span className="ptn-user-email">{viewer.email}</span>
      </span>
    </div>
  );

  return (
    <div className="pt-app">
      <PortalNav areaLabel={areaLabel} sections={sections} account={account} />
      <div className="pt-content">
        <div className="pt-body">{children}</div>
      </div>
    </div>
  );
}
