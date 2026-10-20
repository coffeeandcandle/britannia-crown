import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { clerkConfigured } from "../lib/portal/config";
import type { Viewer } from "../lib/portal/dal";
import PortalTabs from "./PortalTabs";

export type Tab = { href: string; label: string };

// Shared frame for the family and staff areas: title bar, tabs and account menu.
export default function PortalShell({
  viewer,
  area,
  tabs,
  switchTo,
  children,
}: {
  viewer: Viewer;
  area: string;
  tabs: Tab[];
  switchTo?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="pt-bar">
        <div className="uk-wrap pt-bar-inner">
          <div>
            <p className="pt-area">{area}</p>
            <p className="pt-who">{viewer.family && area === "Family portal" ? viewer.family.name : viewer.staff?.name ?? viewer.email}</p>
          </div>
          <div className="pt-account">
            {switchTo && <Link href={switchTo.href} className="pt-switch">{switchTo.label}</Link>}
            {clerkConfigured ? <UserButton /> : <span className="pt-dev">{viewer.email} (dev)</span>}
          </div>
        </div>
        <div className="uk-wrap">
          <PortalTabs tabs={tabs} />
        </div>
      </div>
      <div className="uk-wrap pt-body">{children}</div>
    </>
  );
}
