"use client";

import { useEffect, useRef, useState } from "react";
import DailyIframe from "@daily-co/daily-js";

// Puts the Daily call inside the page. The personal token is handed to Daily through its library rather than
// the web address, because Daily removes it from the address once someone joins, and a phone that reloads the
// page after the camera permission is granted would otherwise be turned away. A reload here simply asks the
// server for a fresh token.
export default function DailyFrame({ url, token, full = false }: { url: string; token: string; full?: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const host = box.current;
    if (!host) return;
    const frame = DailyIframe.createFrame(host, {
      iframeStyle: { width: "100%", height: "100%", border: "0" },
      showLeaveButton: true,
      showFullscreenButton: !full,
    });
    frame.on("error", (e) => setError(e?.errorMsg ?? "The call could not start."));
    frame.join({ url, token }).catch((e: unknown) => setError(e instanceof Error ? e.message : "The call could not start."));
    return () => {
      void frame.destroy();
    };
  }, [url, token, full]);

  return (
    <>
      <div ref={box} className={`lr-box${full ? " is-full" : ""}`} />
      {error && <p className="lr-error" role="alert">{error} Try refreshing the page.</p>}
    </>
  );
}
