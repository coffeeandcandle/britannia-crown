"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Phone-only action bar that slides in once the visitor scrolls past the hero.
export default function MobileCtaBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 260);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/book-consultation" || pathname === "/contact" || pathname.startsWith("/portal")) return null;

  return (
    <div className={`mcta${show ? " show" : ""}`} inert={!show}>
      <a href="/api/checkout?product=strategy-session&return_path=%2F" className="mcta-primary">Book strategy · £150</a>
      <Link href="/book-consultation" className="mcta-secondary">Free call</Link>
    </div>
  );
}
