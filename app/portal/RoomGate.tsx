"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

type Stage = "checking" | "ask" | "denied" | "joined";

const noop = () => () => {};
// Chat apps and social apps open links in their own browser, which usually blocks the camera outright.
const inApp = () => /FBAN|FBAV|Instagram|WhatsApp|Line\/|Snapchat|MicroMessenger|TikTok|; wv\)|GSA\//i.test(navigator.userAgent);

async function permissionState(): Promise<"granted" | "denied" | "unknown"> {
  try {
    const [cam, mic] = await Promise.all([
      navigator.permissions.query({ name: "camera" as PermissionName }),
      navigator.permissions.query({ name: "microphone" as PermissionName }),
    ]);
    if (cam.state === "denied" || mic.state === "denied") return "denied";
    if (cam.state === "granted" && mic.state === "granted") return "granted";
  } catch {
    /* Safari does not report camera permission: fall through to asking */
  }
  return "unknown";
}

// Runs before the call so the browser's camera and microphone question is asked once, on a tap, on our own page.
// If they are already allowed it joins straight away; if they were blocked earlier it shows how to fix that.
export default function RoomGate({ children }: { children: React.ReactNode }) {
  const [stage, setStage] = useState<Stage>("checking");
  const [copied, setCopied] = useState(false);
  const inAppBrowser = useSyncExternalStore(noop, inApp, () => false);

  useEffect(() => {
    let live = true;
    void permissionState().then((s) => {
      if (!live) return;
      setStage(s === "granted" ? "joined" : s === "denied" ? "denied" : "ask");
    });
    return () => {
      live = false;
    };
  }, []);

  async function turnOn() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      stream.getTracks().forEach((t) => t.stop());
      setStage("joined");
    } catch (e) {
      // Blocked: show help. Any other reason (for example no camera fitted): let the call handle it.
      setStage(e instanceof DOMException && (e.name === "NotAllowedError" || e.name === "SecurityError") ? "denied" : "joined");
    }
  }

  if (stage === "joined") return <>{children}</>;
  if (stage === "checking") return <p className="rg-note">Checking your camera and microphone…</p>;

  return (
    <div className="rg">
      {inAppBrowser && (
        <div className="rg-warn" role="alert">
          <strong>You are in an app&apos;s built-in browser.</strong> Those often block the camera. Open this page in <strong>Safari</strong> or <strong>Chrome</strong> instead.
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              void navigator.clipboard?.writeText(location.href).then(() => setCopied(true)).catch(() => {});
            }}
          >
            {copied ? "Link copied. Paste it in your browser" : "Copy this page's link"}
          </button>
        </div>
      )}
      {stage === "ask" ? (
        <>
          <h2>Ready to join?</h2>
          <p>We will ask to use your camera and microphone so your tutor can see and hear you. Choose <strong>Allow</strong> when your phone asks.</p>
          <button type="button" className="btn-primary" onClick={turnOn}>Turn on camera and microphone, then join</button>
          <button type="button" className="rg-link" onClick={() => setStage("joined")}>Join without camera or microphone</button>
        </>
      ) : (
        <>
          <h2>Your camera or microphone is blocked</h2>
          <p>Your phone is blocking this site, and it will not ask again by itself. Allow it once and you are set for every future lesson:</p>
          <ul>
            <li><strong>iPhone (Safari):</strong> tap <strong>aA</strong> in the address bar, then <strong>Website Settings</strong>, and set Camera and Microphone to <strong>Allow</strong>.</li>
            <li><strong>Android (Chrome):</strong> tap the padlock in the address bar, then <strong>Permissions</strong>, and allow Camera and Microphone.</li>
          </ul>
          <button type="button" className="btn-primary" onClick={turnOn}>I have allowed it. Try again</button>
          <button type="button" className="rg-link" onClick={() => setStage("joined")}>Join without camera or microphone</button>
        </>
      )}
    </div>
  );
}
