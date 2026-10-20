"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "../lib/track";

// One small, dismissible nudge towards booking a free call. Designed to be helpful rather than pushy:
//  - shown at most once every 14 days, and never again once dismissed or clicked
//  - never on pages where someone is already acting (booking, contact, checkout, the portal, legal pages)
//  - never while they are typing in a form
//  - desktop: when the pointer leaves through the top of the window (they are about to go)
//  - phones: after about 45 seconds of real reading (and some scrolling)
//  - returning visitors get a "welcome back" wording
const QUIET_PATHS = [/^\/book-consultation/, /^\/contact/, /^\/checkout/, /^\/portal/, /^\/privacy-policy/, /^\/terms-and-conditions/, /^\/refunds-and-cancellations/, /^\/pricing/];
const SNOOZE_KEY = "bc-prompt-until";
const VISITS_KEY = "bc-visits";
const DAY = 24 * 60 * 60 * 1000;

function read(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function write(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage blocked: the prompt simply may repeat sooner */
  }
}

export default function EngagementPrompt() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [returning, setReturning] = useState(false);
  const shown = useRef(false);

  // Count visits (one per browsing session) so returning visitors can be greeted differently.
  useEffect(() => {
    try {
      if (!window.sessionStorage.getItem("bc-counted")) {
        window.sessionStorage.setItem("bc-counted", "1");
        write(VISITS_KEY, String((Number(read(VISITS_KEY)) || 0) + 1));
      }
    } catch {
      /* ignore */
    }
    setReturning((Number(read(VISITS_KEY)) || 0) >= 2);
  }, []);

  useEffect(() => {
    if (shown.current || QUIET_PATHS.some((re) => re.test(pathname))) return;
    if (Number(read(SNOOZE_KEY)) > Date.now()) return;

    const typing = () => {
      const a = document.activeElement;
      return a instanceof HTMLElement && a.matches("input, textarea, select");
    };
    const present = (how: string) => {
      if (shown.current || typing() || document.querySelector(".mobile-menu:not([hidden])")) return;
      shown.current = true;
      setOpen(true);
      track("prompt_shown", { how, returning });
    };

    const t0 = Date.now();
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget && Date.now() - t0 > 15000) present("exit_intent");
    };
    if (finePointer) document.addEventListener("mouseout", onLeave);

    const timer = window.setTimeout(function check() {
      if (window.scrollY > 500) present("engaged");
      else window.setTimeout(check, 5000); // not scrolled yet: look again shortly
    }, finePointer ? 90000 : 45000);

    return () => {
      document.removeEventListener("mouseout", onLeave);
      window.clearTimeout(timer);
    };
  }, [pathname, returning]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close("escape");
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function close(how: string) {
    write(SNOOZE_KEY, String(Date.now() + 14 * DAY));
    track("prompt_closed", { how });
    setOpen(false);
  }

  if (!open) return null;
  return (
    <aside className="nudge" role="dialog" aria-modal="false" aria-labelledby="nudge-title">
      <button type="button" className="nudge-close" onClick={() => close("dismiss")} aria-label="Close this message">
        ×
      </button>
      <p className="nudge-title" id="nudge-title">
        {returning ? "Ready for a free 30-minute call?" : "Talk it through with an education consultant"}
      </p>
      <p className="nudge-body">Free, friendly and no obligation. We reply within 24 hours.</p>
      <div className="nudge-actions">
        <Link href="/book-consultation" className="btn-primary" onClick={() => { track("prompt_click", { to: "book" }); close("book"); }}>
          Book a free call
        </Link>
        <Link href="/contact" className="btn-secondary" onClick={() => { track("prompt_click", { to: "enquire" }); close("enquire"); }}>
          Send an enquiry
        </Link>
      </div>
    </aside>
  );
}
