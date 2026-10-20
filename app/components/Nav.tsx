"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { services } from "../lib/services";
import { subjects, levels } from "../lib/subjects";
import { WHATSAPP_URL } from "../lib/site";
import Crown from "./Crown";

type PanelLink = { href: string; label: string; desc?: string };
type Menu = {
  id: string;
  label: string;
  href: string;
  columns?: { title: string; links: PanelLink[] }[];
  links?: PanelLink[];
  foot: PanelLink;
};

const menus: Menu[] = [
  {
    id: "services",
    label: "Services",
    href: "/services",
    links: [
      ...services.map((s) => ({ href: `/services/${s.slug}`, label: s.name, desc: s.short })),
      { href: "/membership", label: "Academic Partner Membership", desc: "Ongoing online tutoring with a consultant overseeing progress." },
      { href: "/uae", label: "Moving to the UAE", desc: "Schools, nurseries and tutoring for families relocating to Dubai." },
    ],
    foot: { href: "/services", label: "All services" },
  },
  {
    id: "tutors",
    label: "Find a tutor",
    href: "/tutors",
    columns: levels.map((level) => ({
      title: level,
      links: subjects.filter((s) => s.level === level).map((s) => ({ href: `/tutors/${s.slug}`, label: s.name })),
    })),
    foot: { href: "/tutors", label: "All subjects" },
  },
  {
    id: "resources",
    label: "Guides & tools",
    href: "/guides",
    columns: [
      {
        title: "Guides for parents",
        links: [
          { href: "/guides/school-admissions-england", label: "School admissions in England" },
          { href: "/guides/gcse-grades-explained", label: "GCSE grades explained" },
          { href: "/guides/choosing-a-private-tutor", label: "Choosing a private tutor" },
          { href: "/guides/home-education-england", label: "Home education in England" },
        ],
      },
      {
        title: "Free tools",
        links: [
          { href: "/tools/school-dates", label: "School dates calculator", desc: "Your child's year group and application deadlines." },
          { href: "/tools/gcse-grade-converter", label: "GCSE grade converter", desc: "What 9 to 1 means in the old letter grades." },
        ],
      },
    ],
    foot: { href: "/guides", label: "All guides and resources" },
  },
];

const plainLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

function Caret() {
  return (
    <svg className="nav-caret" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PanelItem({ link, onNavigate }: { link: PanelLink; onNavigate: () => void }) {
  return (
    <li>
      <Link href={link.href} onClick={onNavigate}>
        <strong>{link.label}</strong>
        {link.desc && <span>{link.desc}</span>}
      </Link>
    </li>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close everything when the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!openMenu && !mobileOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (openMenu) document.getElementById(`nav-btn-${openMenu}`)?.focus();
      setOpenMenu(null);
      setMobileOpen(false);
    }
    function onPointerDown(e: PointerEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openMenu, mobileOpen]);

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return (
    <header className="site-header">
      <div className="uk-wrap site-header-inner">
        <Link href="/" className="brand" aria-label="Britannia Crown, home">
          <Crown />
          <span>
            <span className="brand-name">Britannia Crown</span>
            <span className="brand-sub">Education Consultants</span>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Main" ref={navRef}>
          <ul>
            {menus.map((m) => {
              const expanded = openMenu === m.id;
              return (
                <li
                  className="nav-item"
                  key={m.id}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu((cur) => (cur === m.id ? null : cur));
                  }}
                >
                  <button
                    type="button"
                    id={`nav-btn-${m.id}`}
                    className="nav-link"
                    aria-expanded={expanded}
                    aria-controls={`nav-panel-${m.id}`}
                    data-active={isActive(pathname, m.href) || undefined}
                    onClick={() => setOpenMenu(expanded ? null : m.id)}
                  >
                    {m.label}
                    <Caret />
                  </button>
                  <div className="nav-panel" id={`nav-panel-${m.id}`} hidden={!expanded}>
                    {m.links ? (
                      <ul className="nav-panel-grid">
                        {m.links.map((l) => <PanelItem key={l.href} link={l} onNavigate={closeAll} />)}
                      </ul>
                    ) : (
                      <div className={`nav-panel-grid${m.columns!.length === 3 ? " cols-3" : ""}`}>
                        {m.columns!.map((c) => (
                          <div key={c.title}>
                            <p className="nav-panel-col-title">{c.title}</p>
                            <ul>
                              {c.links.map((l) => <PanelItem key={l.href} link={l} onNavigate={closeAll} />)}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="nav-panel-foot">
                      <Link href={m.foot.href} onClick={closeAll}>{m.foot.label} →</Link>
                    </div>
                  </div>
                </li>
              );
            })}
            {plainLinks.map((l) => (
              <li className="nav-item" key={l.href}>
                <Link href={l.href} className="nav-link" aria-current={isActive(pathname, l.href) ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <a href={WHATSAPP_URL} className="header-wa">
            WhatsApp
          </a>
          <Link href="/book-consultation" className="btn-primary">
            Book a free call
          </Link>
        </div>

        <button
          type="button"
          className="menu-button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <svg viewBox="0 0 18 18" aria-hidden="true">
            {mobileOpen ? (
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      <div className="mobile-menu" id="mobile-menu" hidden={!mobileOpen}>
        <nav aria-label="Mobile">
          {menus.map((m) => (
            <details key={m.id}>
              <summary>{m.label}</summary>
              <ul>
                {(m.links ?? m.columns!.flatMap((c) => c.links)).map((l) => (
                  <li key={l.href}><Link href={l.href} onClick={closeAll}>{l.label}</Link></li>
                ))}
                <li><Link href={m.foot.href} onClick={closeAll}><strong>{m.foot.label} →</strong></Link></li>
              </ul>
            </details>
          ))}
          {plainLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={closeAll}>{l.label}</Link>
          ))}
        </nav>
        <div className="mobile-menu-actions">
          <Link href="/book-consultation" className="btn-primary" onClick={closeAll}>
            Book a free 30-minute call
          </Link>
          <a href={WHATSAPP_URL} className="btn-secondary">
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
