"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { services } from "../lib/services";
import { subjects, levels } from "../lib/subjects";
import { EMAIL, WHATSAPP_URL } from "../lib/site";
import Crown from "./Crown";

type PanelLink = { href: string; label: string; desc?: string };
type Feature = { kicker: string; title: string; body: string; href: string; cta: string };
type Menu = {
  id: string;
  label: string;
  href: string;
  columns?: { title: string; links: PanelLink[] }[];
  links?: PanelLink[];
  feature: Feature;
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
    feature: {
      kicker: "Not sure where to start?",
      title: "Free 30-minute consultation",
      body: "Talk it through with an education consultant and get a clear recommendation.",
      href: "/book-consultation",
      cta: "Book a free call",
    },
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
    feature: {
      kicker: "Personally matched",
      title: "50+ UK-trained tutors",
      body: "Tell us your child's subject, exam board and target grade, and we'll introduce the right tutor.",
      href: "/contact?service=Tutoring",
      cta: "Request a tutor",
    },
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
          { href: "/tools/school-dates", label: "School dates calculator" },
          { href: "/tools/gcse-grade-converter", label: "GCSE grade converter" },
        ],
      },
    ],
    feature: {
      kicker: "Free tool",
      title: "When does your child apply?",
      body: "Enter a date of birth to see their year group and every school application deadline.",
      href: "/tools/school-dates",
      cta: "Check the dates",
    },
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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="wa-icon">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"
      />
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
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close everything when the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <>
      <div className="utility-bar">
        <div className="uk-wrap utility-bar-inner">
          <p>British education consultants for families in the UK and the UAE</p>
          <ul>
            <li><Link href="/guides#tools">Free tools</Link></li>
            <li><Link href="/portal">Client login</Link></li>
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><a href={WHATSAPP_URL}><WhatsAppIcon /> +971 50 263 5427</a></li>
          </ul>
        </div>
      </div>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}${openMenu ? " has-open-menu" : ""}`}>
        <div className="uk-wrap site-header-inner">
          <Link href="/" className="brand" aria-label="Britannia Crown, home">
            <Crown light />
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
                      <div className="nav-panel-main">
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
                      <Link href={m.feature.href} className="nav-feature" onClick={closeAll}>
                        <span className="nav-feature-kicker">{m.feature.kicker}</span>
                        <strong>{m.feature.title}</strong>
                        <span>{m.feature.body}</span>
                        <span className="nav-feature-cta">{m.feature.cta} →</span>
                      </Link>
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
            <a href={WHATSAPP_URL} className="header-wa" aria-label="Message us on WhatsApp">
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>
            <Link href="/book-consultation" className="btn-primary header-cta">Book a free call</Link>
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
            <Link href="/book-consultation" className="btn-primary" onClick={closeAll}>Book a free 30-minute call</Link>
            <a href={WHATSAPP_URL} className="btn-secondary"><WhatsAppIcon /> Message us on WhatsApp</a>
          </div>
        </div>
      </header>
    </>
  );
}
