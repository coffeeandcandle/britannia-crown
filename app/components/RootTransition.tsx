"use client";

import { ViewTransition } from "react";
import { usePathname } from "next/navigation";

// Fades marketing pages into one another. Anything involving the portal (in or out) swaps
// without a fade: the portal brings its own frame and skeleton, and fading across the two
// would leave a half-empty page while it loads.
export default function RootTransition({ children }: { children: React.ReactNode }) {
  const inPortal = usePathname().startsWith("/portal");
  if (inPortal) return <>{children}</>;
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
