"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "../lib/track";

type CalendlyEmbedProps = {
  url: string;
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const INITIAL_HEIGHT = 900;

export default function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(INITIAL_HEIGHT);

  useEffect(() => {
    let cancelled = false;

    function init() {
      if (cancelled || !containerRef.current || !window.Calendly) return;
      containerRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({ url, parentElement: containerRef.current });
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
      if (typeof e.data?.event !== "string" || !e.data.event.startsWith("calendly.")) return;
      if (e.data.event === "calendly.page_height") {
        const newHeight = Number(e.data.payload?.height);
        if (newHeight > 0) setHeight(newHeight);
      }
      // A booked consultation is the strongest lead signal on the site.
      if (e.data.event === "calendly.event_scheduled" && e.origin.endsWith("calendly.com")) {
        track("consultation_booked", { method: "calendly", page_path: window.location.pathname });
      }
    }
    window.addEventListener("message", onMessage);

    return () => {
      cancelled = true;
      existing?.removeEventListener("load", init);
      window.removeEventListener("message", onMessage);
    };
  }, [url]);

  return (
    <div className="calendly-embed">
      <div ref={containerRef} style={{ minWidth: "320px", height: `${height}px` }} />
    </div>
  );
}
