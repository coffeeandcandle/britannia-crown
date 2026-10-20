"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PortalFrameSkeleton from "./PortalFrameSkeleton";

// Moves someone to the right part of the portal (staff to their area, families to theirs) while
// keeping the frame skeleton on screen, so the hop never shows a blank page.
export default function PortalRedirect({ to }: { to: string }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(to);
  }, [router, to]);
  return <PortalFrameSkeleton />;
}
