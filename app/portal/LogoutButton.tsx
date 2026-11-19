"use client";

import { useClerk } from "@clerk/nextjs";
import { useState } from "react";

// A plain "Log out" button for pages outside the portal menu, such as the "waiting for your role"
// page, so nobody is stuck signed in. Sends them to the login choice page afterwards.
export default function LogoutButton({ className = "btn-secondary" }: { className?: string }) {
  const { signOut } = useClerk();
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      className={className}
      disabled={busy}
      onClick={() => {
        setBusy(true);
        signOut({ redirectUrl: "/portal/login" });
      }}
    >
      {busy ? "Logging out…" : "Log out"}
    </button>
  );
}
