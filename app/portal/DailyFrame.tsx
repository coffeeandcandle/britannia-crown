"use client";

import { useEffect, useRef, useState } from "react";
import DailyIframe from "@daily-co/daily-js";

// Puts the Daily call inside the page. The personal token is handed to Daily through its library rather than
// the web address, because Daily removes it from the address once someone joins, and a phone that reloads the
// page after the camera permission is granted would otherwise be turned away. A reload here simply asks the
// server for a fresh token.
// Records this person's own microphone in short clips and sends each to the portal to be transcribed.
// Each clip is a complete audio file (the recorder is restarted every CLIP_MS), so a lost clip never spoils the rest.
const CLIP_MS = 45_000;
function startTranscribing(sessionId: number) {
  if (typeof MediaRecorder === "undefined" || !navigator.mediaDevices?.getUserMedia) return () => {};
  const mime = ["audio/webm;codecs=opus", "audio/mp4", "audio/ogg;codecs=opus"].find((m) => MediaRecorder.isTypeSupported(m));
  let stopped = false;
  let stream: MediaStream | null = null;
  let recorder: MediaRecorder | null = null;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const record = () => {
    if (stopped || !stream) return;
    const startedAt = new Date();
    const chunks: Blob[] = [];
    const r = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
    recorder = r;
    r.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
    r.onstop = () => {
      const blob = new Blob(chunks, { type: r.mimeType });
      if (blob.size > 1500) {
        const body = new FormData();
        body.set("sessionId", String(sessionId));
        body.set("startedAt", startedAt.toISOString());
        body.set("audio", blob);
        void fetch("/api/portal/transcribe", { method: "POST", body, keepalive: blob.size < 60_000 }).catch(() => {});
      }
      if (!stopped) record();
    };
    r.start();
    timer = setTimeout(() => { if (r.state === "recording") r.stop(); }, CLIP_MS);
  };

  navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })
    .then((s) => { if (stopped) s.getTracks().forEach((t) => t.stop()); else { stream = s; record(); } })
    .catch(() => {});

  return () => {
    stopped = true;
    clearTimeout(timer);
    if (recorder && recorder.state === "recording") recorder.stop();
    stream?.getTracks().forEach((t) => t.stop());
  };
}

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
    let stopTranscribing = () => {};
    frame.on("joined-meeting", () => {
      report("room.joined");
      stopTranscribing = startTranscribing(sessionId);
    });
    frame.on("left-meeting", () => {
      report("room.left");
      stopTranscribing();
    });
    frame.on("participant-joined", (e) => { if (!(e as { participant?: { local?: boolean } })?.participant?.local) report("room.participant_joined", nameOf(e)); });
    frame.on("participant-left", (e) => { if (!(e as { participant?: { local?: boolean } })?.participant?.local) report("room.participant_left", nameOf(e)); });
    frame.on("camera-error", (e) => report("room.camera_error", String((e as { errorMsg?: { errorMsg?: string } })?.errorMsg?.errorMsg ?? "")));
    frame.on("error", (e) => {
      report("room.error", String(e?.errorMsg ?? ""));
      setError(e?.errorMsg ?? "The call could not start.");
    });
    frame.join({ url, token }).catch((e: unknown) => setError(e instanceof Error ? e.message : "The call could not start."));
    return () => {
      stopTranscribing();
      void frame.destroy();
    };
  }, [url, token, sessionId, full]);

  return (
    <>
      <div ref={box} className={`lr-box${full ? " is-full" : ""}`} />
      <p className="lr-help" role="note">This call is transcribed and summarised by AI so the team can write up the conversation. Your microphone is recorded in short clips for this and sent to our transcription service. Only the team can read the transcript.</p>
      {error && <p className="lr-error" role="alert">{error} Try refreshing the page.</p>}
    </>
  );
}
