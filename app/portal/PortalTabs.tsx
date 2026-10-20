"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Tab } from "./PortalShell";

export default function PortalTabs({ tabs }: { tabs: Tab[] }) {
  const pathname = usePathname();
  // The most specific matching tab is the current one ("/portal" shouldn't match "/portal/notes").
  const current = tabs
    .filter((t) => pathname === t.href || pathname.startsWith(`${t.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0];

  return (
    <nav className="pt-tabs" aria-label="Portal">
      {tabs.map((t) => (
        <Link key={t.href} href={t.href} aria-current={t === current ? "page" : undefined}>
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
