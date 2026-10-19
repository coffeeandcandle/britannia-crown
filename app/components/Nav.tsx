"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={scrolled ? "scrolled" : undefined}>
        <Link href="/" className="nav-brand">
          <svg className="nav-crown" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,120 L35,50 L70,90 L100,30 L130,90 L165,50 L180,120 Z" fill="#E8C89C" stroke="#E8C89C" strokeWidth="3" />
            <rect x="15" y="120" width="170" height="26" fill="#E8C89C" rx="3" />
            <circle cx="100" cy="40" r="10" fill="#4A0E29" />
          </svg>
          <div className="nav-brand-text">
            <span className="nav-brand-name">BRITANNIA CROWN</span>
            <span className="nav-brand-sub">Education Consultants</span>
          </div>
        </Link>
        <ul className="nav-links">
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/tutors">Find a Tutor</Link></li>
          <li><Link href="/uae">Moving to the UAE</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/guides">Guides</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/book-consultation" className="nav-cta">Book Consultation</Link></li>
        </ul>
        <button
          type="button"
          className={`menu-toggle${open ? " active" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="nav-mobile-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`nav-backdrop${open ? " active" : ""}`} onClick={close} aria-hidden="true"></div>
      <div id="nav-mobile-menu" className={`nav-mobile${open ? " active" : ""}`}>
        <ul className="nav-mobile-links">
          <li><Link href="/" onClick={close}>Home</Link></li>
          <li><Link href="/services" onClick={close}>Services</Link></li>
          <li><Link href="/tutors" onClick={close}>Find a Tutor</Link></li>
          <li><Link href="/uae" onClick={close}>Moving to the UAE</Link></li>
          <li><Link href="/membership" onClick={close}>Membership</Link></li>
          <li><Link href="/about" onClick={close}>About</Link></li>
          <li><Link href="/guides" onClick={close}>Guides</Link></li>
          <li><Link href="/ambassador" onClick={close}>Ambassador</Link></li>
          <li><Link href="/contact" onClick={close}>Contact</Link></li>
        </ul>
        <Link href="/book-consultation" className="nav-mobile-cta" onClick={close}>Book Consultation</Link>
      </div>
    </>
  );
}
