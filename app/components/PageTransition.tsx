"use client";

import { ViewTransition } from "react";
import { usePathname } from "next/navigation";

// Softly crossfades whatever it wraps whenever the path changes. Only navigations animate:
// the first load and unrelated updates ("default none") never do. Styles live in site.css.
// Keyed by path so list → detail pages inside one section fade too.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <ViewTransition key={pathname} enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
