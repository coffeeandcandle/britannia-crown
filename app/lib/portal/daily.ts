import "server-only";
import { randomBytes } from "node:crypto";
import { queryOne } from "./db";

// In-portal video lessons using Daily (daily.co). Each lesson gets one private room, created the first time
// someone joins. Nobody can enter without a personal, time-limited token that we only issue to the lesson's
// family, its tutor and the team. Without DAILY_API_KEY everything falls back to the lesson's own link.

const API = process.env.DAILY_API_URL ?? "https://api.daily.co/v1";
const EARLY_MS = 15 * 60 * 1000;
const LATE_MS = 30 * 60 * 1000;

export const dailyEnabled = () => Boolean(process.env.DAILY_API_KEY);

async function daily<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.DAILY_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Daily ${path} failed (${res.status}): ${(await res.text()).slice(0, 200)}`);
  return (await res.json()) as T;
}

// When a lesson's room is open: 15 minutes before the start until 30 minutes after the end.
export function roomWindow(startsAt: Date, minutes: number) {
  const start = startsAt.getTime();
  return { opens: new Date(start - EARLY_MS), closes: new Date(start + minutes * 60000 + LATE_MS) };
}

async function ensureRoom(sessionId: number, closes: Date) {
  const existing = await queryOne<{ room_url: string | null }>("SELECT room_url FROM sessions WHERE id = $1", [sessionId]);
  if (existing?.room_url) return existing.room_url;
  const room = await daily<{ url: string }>("/rooms", {
    name: `bc-${sessionId}-${randomBytes(6).toString("hex")}`,
    privacy: "private",
    properties: { exp: Math.floor(closes.getTime() / 1000) + 24 * 3600, enable_chat: true, enable_screenshare: true, enable_knocking: false },
  });
  // If two people joined at once, keep whichever room was saved first.
  const saved = await queryOne<{ room_url: string }>("UPDATE sessions SET room_url = COALESCE(room_url, $1) WHERE id = $2 RETURNING room_url", [room.url, sessionId]);
  return saved?.room_url ?? room.url;
}

export type Entry = { state: "ready"; url: string } | { state: "early"; opens: Date } | { state: "closed" } | { state: "unavailable" };

// Works out whether this person may enter now and, if so, returns their personal room address.
export async function entryFor(session: { id: number; starts_at: Date; minutes: number; status: string }, person: { name: string; owner: boolean }): Promise<Entry> {
  if (!dailyEnabled()) return { state: "unavailable" };
  if (session.status === "cancelled") return { state: "closed" };
  const { opens, closes } = roomWindow(new Date(session.starts_at), session.minutes);
  const now = Date.now();
  if (now > closes.getTime()) return { state: "closed" };
  if (now < opens.getTime()) return { state: "early", opens };

  const roomUrl = await ensureRoom(session.id, closes);
  const roomName = new URL(roomUrl).pathname.replace(/^\//, "");
  const { token } = await daily<{ token: string }>("/meeting-tokens", {
    properties: {
      room_name: roomName,
      user_name: person.name.slice(0, 60),
      is_owner: person.owner,
      nbf: Math.floor(opens.getTime() / 1000),
      exp: Math.floor(closes.getTime() / 1000),
    },
  });
  return { state: "ready", url: `${roomUrl}?t=${encodeURIComponent(token)}` };
}
