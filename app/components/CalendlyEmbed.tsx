"use client";

import { useEffect, useRef, useState } from "react";

type Prefill = { name?: string; email?: string; customAnswers?: Record<string, string> };
type Utm = { utmSource?: string; utmMedium?: string; utmCampaign?: string; utmContent?: string; utmTerm?: string };

type CalendlyEmbedProps = {
  url: string;
  prefill?: Prefill;
  utm?: Utm;
  // Called once Calendly confirms the booking.
  onScheduled?: () => void;
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement; prefill?: Prefill; utm?: Utm }) => void;
    };
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const INITIAL_HEIGHT = 900;

// Brand colours and a quieter layout: our page already shows the session details.
function withDisplayOptions(url: string) {
  const u = new URL(url);
  u.searchParams.set("hide_gdpr_banner", "1");
  u.searchParams.set("hide_event_type_details", "1");
  u.searchParams.set("primary_color", "6b1e3d");
  return u.toString();
}

export default function CalendlyEmbed({ url, prefill, utm, onScheduled }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(INITIAL_HEIGHT);
  const onScheduledRef = useRef(onScheduled);
  useEffect(() => {
    onScheduledRef.current = onScheduled;
  }, [onScheduled]);

  // Re-initialise only when the details passed to Calendly actually change.
  const optionsKey = JSON.stringify({ url, prefill, utm });

  useEffect(() => {
    let cancelled = false;
    const { url: u, prefill: p, utm: m } = JSON.parse(optionsKey) as { url: string; prefill?: Prefill; utm?: Utm };

    function init() {
      if (cancelled || !containerRef.current || !window.Calendly) return;
      containerRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({ url: withDisplayOptions(u), parentElement: containerRef.current, prefill: p, utm: m });
    }

    // Load the script once; reuse it across client-side navigations.
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (window.Calendly) {
      init();
    } else if (existing) {
      existing.addEventListener("load", init);
    } else {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.addEventListener("load", init);
      document.body.appendChild(script);
    }

    function onMessage(e: MessageEvent) {
      if (!e.origin.endsWith("calendly.com") || typeof e.data?.event !== "string") return;
      if (e.data.event === "calendly.page_height") {
        const newHeight = Number(e.data.payload?.height);
        if (newHeight > 0) setHeight(newHeight);
      }
      if (e.data.event === "calendly.event_scheduled") onScheduledRef.current?.();
    }
    window.addEventListener("message", onMessage);

    return () => {
      cancelled = true;
      existing?.removeEventListener("load", init);
      window.removeEventListener("message", onMessage);
    };
  }, [optionsKey]);

  return (
    <div className="calendly-embed">
      <div ref={containerRef} style={{ minWidth: "320px", height: `${height}px` }} />
    </div>
  );
}
