"use client";

import { useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Wraps a panel with a close button. Closing hides it on this device (remembered in the browser) and it
// comes back if they clear their browser data. Works without storage too: it still closes for the visit.
export default function Dismissible({ id, label = "Close", children }: { id: string; label?: string; children: React.ReactNode }) {
  const key = `bc-dismissed:${id}`;
  const stored = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return localStorage.getItem(key) === "1";
      } catch {
        return false;
      }
    },
    () => false,
  );
  const [closed, setClosed] = useState(false);
  if (stored || closed) return null;

  return (
    <div className="dismissible">
      <button
        type="button"
        className="dismissible-x"
        aria-label={label}
        title={label}
        onClick={() => {
          setClosed(true);
          try {
            localStorage.setItem(key, "1");
          } catch {
            /* storage unavailable: closed for this visit only */
          }
        }}
      >
        ×
      </button>
      {children}
    </div>
  );
}
