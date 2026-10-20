"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Phone-only action bar that slides in once the visitor scrolls past the hero.
export default function MobileCtaBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/book-consultation" || pathname.startsWith("/portal")) return null;

  return (
    <div className={`mcta${show ? " show" : ""}`} inert={!show}>
      <Link href="/book-consultation" className="mcta-primary">Book a free call</Link>
      <Link href="/contact" className="mcta-secondary">Enquire</Link>
    </div>
  );
}
