"use client";

import Link from "next/link";
import { track } from "../lib/track";

// A link to the sign-up page that records where on the site it was clicked.
export default function SignupLink({ location, className, onClick, children }: { location: string; className?: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <Link
      href="/portal/join"
      className={className}
      onClick={() => {
        track("signup_click", { location });
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}
