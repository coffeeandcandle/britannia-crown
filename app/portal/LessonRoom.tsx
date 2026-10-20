import Link from "next/link";
import type { Entry } from "../lib/portal/daily";
import { Card, EmptyState } from "./ui";

// The lesson itself, shown inside the portal. The room address carries a personal token, so the iframe
// only works for the person it was issued to.
export default function LessonRoom({ entry, backHref, fallbackUrl }: { entry: Entry; backHref: string; fallbackUrl?: string | null }) {
  if (entry.state === "ready") {
    return (
      <>
        <div className="lr-frame">
          <iframe
            src={entry.url}
            title="Video lesson"
            allow="camera; microphone; fullscreen; display-capture; autoplay; clipboard-write"
          />
        </div>
        <p className="lr-help">
          Camera or microphone not turning on, or on a phone?{" "}
          <a href={entry.url} target="_blank" rel="noopener noreferrer">Open the lesson in full screen</a>. Your browser will ask to use your camera and
          microphone. Choose <strong>Allow</strong>. If you opened this from WhatsApp or another app, open it in Safari or Chrome instead.
        </p>
      </>
    );
  }
  const early = entry.state === "early";
  return (
    <Card>
      <EmptyState
        icon={early ? "⏳" : "🔒"}
        title={early ? "Your lesson room opens 15 minutes before the start" : entry.state === "closed" ? "This lesson has finished or was cancelled" : "In-portal video isn't switched on yet"}
        action={
          <>
            {fallbackUrl && entry.state === "unavailable" && <a href={fallbackUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">Open the video link</a>}
            <Link href={backHref} className="btn-secondary">Back to the lesson</Link>
          </>
        }
      >
        {early ? `Come back at ${new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Europe/London" }).format(entry.opens).replace(" ", "").toLowerCase()} UK time.` : "Please contact your consultant if this looks wrong."}
      </EmptyState>
    </Card>
  );
}
