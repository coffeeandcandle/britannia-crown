"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type IconName = "home" | "calendar" | "notes" | "card" | "families" | "team" | "plus" | "chat" | "back" | "switch" | "help";
export type NavItem = { href: string; label: string; icon: IconName; external?: boolean; exact?: boolean };
export type NavSection = { title?: string; items: NavItem[] };

const paths: Record<IconName, string> = {
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  calendar: "M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
  notes: "M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM14 3v5h5M9 13h7M9 17h5",
  card: "M3 6h18v12H3zM3 10h18M7 15h4",
  families: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14 20c0-2.6 1.6-5 4-5s4 1.6 4 4",
  team: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4.4 3.6-8 8-8s8 3.6 8 8",
  plus: "M12 5v14M5 12h14",
  chat: "M4 5h16v11H9l-5 4z",
  back: "M15 6l-6 6 6 6",
  switch: "M7 7h13l-3-3M17 17H4l3 3",
  help: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17.5v.01",
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ptn-icon">
      <path d={paths[name]} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Sidebar navigation for the portal; becomes a slide-out menu on phones.
export default function PortalNav({
  areaLabel,
  sections,
  account,
}: {
  areaLabel: string;
  sections: NavSection[];
  account: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // The most specific matching link is the current page ("/portal" shouldn't match "/portal/notes").
  const all = sections.flatMap((s) => s.items).filter((i) => !i.external);
  const current = all
    .filter((i) => pathname === i.href || (!i.exact && pathname.startsWith(`${i.href}/`)))
    .sort((a, b) => b.href.length - a.href.length)[0];

  return (
    <>
      <div className="ptn-topbar">
        <Link href="/" className="ptn-brand" aria-label="Britannia Crown website">
          <BrandMark />
          <span>
            <span className="ptn-brand-name">Britannia Crown</span>
            <span className="ptn-brand-sub">{areaLabel}</span>
          </span>
        </Link>
        <button type="button" className="ptn-menu-button" aria-expanded={open} aria-controls="portal-nav" onClick={() => setOpen((o) => !o)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <aside className={`ptn${open ? " is-open" : ""}`} id="portal-nav">
        <Link href="/" className="ptn-brand ptn-brand-side" aria-label="Britannia Crown website">
          <BrandMark />
          <span>
            <span className="ptn-brand-name">Britannia Crown</span>
            <span className="ptn-brand-sub">{areaLabel}</span>
          </span>
        </Link>
        <nav aria-label="Portal">
          {sections.map((s, i) => (
            <div className="ptn-section" key={s.title ?? i}>
              {s.title && <p className="ptn-section-title">{s.title}</p>}
              <ul>
                {s.items.map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a href={item.href} className="ptn-link" {...(item.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
                        <Icon name={item.icon} />
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className="ptn-link" aria-current={item === current ? "page" : undefined}>
                        <Icon name={item.icon} />
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="ptn-account">{account}</div>
      </aside>
      {open && <button type="button" className="ptn-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />}
    </>
  );
}

function BrandMark() {
  return (
    <svg viewBox="0 0 200 160" aria-hidden="true" className="ptn-crown">
      <path d="M20,120 L35,50 L70,90 L100,30 L130,90 L165,50 L180,120 Z" fill="#E8C89C" />
      <rect x="15" y="120" width="170" height="26" rx="3" fill="#E8C89C" />
    </svg>
  );
}
