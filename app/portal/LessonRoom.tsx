import Link from "next/link";
import type { Entry } from "../lib/portal/daily";
import DailyFrame from "./DailyFrame";
import RoomGate from "./RoomGate";
import { Card, EmptyState } from "./ui";

// The lesson itself, shown inside the portal. The room address carries a personal token, so the iframe
// only works for the person it was issued to.
export default function LessonRoom({ entry, sessionId, backHref, roomHref, full = false, fallbackUrl }: { entry: Entry; sessionId: number; backHref: string; roomHref: string; full?: boolean; fallbackUrl?: string | null }) {
  if (entry.state === "ready") {
    if (full) {
      return (
        <div className="lr-fullscreen">
          <a href={backHref} className="lr-exit">← Back to the lesson page</a>
          <RoomGate><DailyFrame url={entry.url} token={entry.token} sessionId={sessionId} full /></RoomGate>
        </div>
      );
    }
    return (
      <RoomGate>
        <div className="lr-frame">
          <DailyFrame url={entry.url} token={entry.token} sessionId={sessionId} />
        </div>
        <p className="lr-help">
          Having trouble on a phone? <a href={`${roomHref}?full=1`}>Open the lesson in full screen</a>. If you opened this from WhatsApp or another app, open it in Safari or Chrome instead.
        </p>
      </RoomGate>
    );
  }
  const early = entry.state === "early";
  return (
    <Card>
      <EmptyState
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
