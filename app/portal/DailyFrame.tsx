"use client";

import { useEffect, useRef, useState } from "react";
import DailyIframe from "@daily-co/daily-js";

// Puts the Daily call inside the page. The personal token is handed to Daily through its library rather than
// the web address, because Daily removes it from the address once someone joins, and a phone that reloads the
// page after the camera permission is granted would otherwise be turned away. A reload here simply asks the
// server for a fresh token.
export default function DailyFrame({ url, token, sessionId, full = false }: { url: string; token: string; sessionId: number; full?: boolean }) {
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
    // Tell the portal who joins and leaves, so the team has a record of every online lesson.
    const report = (event: string, detail?: string) => {
      void fetch("/api/portal/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, event, detail }),
        keepalive: true,
      }).catch(() => {});
    };
    const nameOf = (e: unknown) => (e as { participant?: { user_name?: string } } | undefined)?.participant?.user_name ?? "";
    frame.on("joined-meeting", () => report("room.joined"));
    frame.on("left-meeting", () => report("room.left"));
    frame.on("participant-joined", (e) => { if (!(e as { participant?: { local?: boolean } })?.participant?.local) report("room.participant_joined", nameOf(e)); });
    frame.on("participant-left", (e) => { if (!(e as { participant?: { local?: boolean } })?.participant?.local) report("room.participant_left", nameOf(e)); });
    frame.on("camera-error", (e) => report("room.camera_error", String((e as { errorMsg?: { errorMsg?: string } })?.errorMsg?.errorMsg ?? "")));
    frame.on("error", (e) => {
      report("room.error", String(e?.errorMsg ?? ""));
      setError(e?.errorMsg ?? "The call could not start.");
    });
    frame.join({ url, token }).catch((e: unknown) => setError(e instanceof Error ? e.message : "The call could not start."));
    return () => {
      void frame.destroy();
    };
  }, [url, token, sessionId, full]);

  return (
    <>
      <div ref={box} className={`lr-box${full ? " is-full" : ""}`} />
      {error && <p className="lr-error" role="alert">{error} Try refreshing the page.</p>}
    </>
  );
}
