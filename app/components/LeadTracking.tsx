"use client";

import { useEffect } from "react";
import { track } from "../lib/track";
import { recordAttribution } from "../lib/attribution";

// One delegated listener tracks every lead-intent link on the site,
// so new pages and buttons are covered without extra wiring.
function eventFor(href: string) {
  if (href.startsWith("https://wa.me")) return "whatsapp_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("/book-consultation")) return "book_consultation_click";
  return null;
}

export default function LeadTracking() {
  useEffect(() => {
    recordAttribution();
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.("a");
      const href = link?.getAttribute("href");
      const event = href ? eventFor(href) : null;
      if (!link || !event) return;
      track(event, {
        link_text: link.textContent?.trim().slice(0, 80),
        page_path: window.location.pathname,
      });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
