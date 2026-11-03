import "server-only";
import { query } from "./portal/db";
import { addDaysKey, dayKeyOf, zonedToUtc } from "./portal/time";

// Free consultation times offered on the website: every day from tomorrow for 30 days, half-hour starts from
// 9am to 5:30pm UK time. A time disappears once someone has requested it, or once every consultant is in a
// lesson or meeting at that time.
const TZ = "Europe/London";
export const DAYS = 30;
export const MINUTES = 30;
export const TIMES = Array.from({ length: 18 }, (_, i) => {
  const m = 9 * 60 + i * 30;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${m % 60 === 0 ? "00" : "30"}`;
});

export const allDays = () => {
  const today = dayKeyOf(new Date(), TZ);
  return Array.from({ length: DAYS }, (_, i) => addDaysKey(today, i + 1));
};

export const slotStart = (date: string, time: string) => (allDays().includes(date) && TIMES.includes(time) ? zonedToUtc(`${date}T${time}`, TZ) : null);

// { "2026-11-04": ["09:00", "09:30", ...] }, leaving out days with nothing left.
export async function freeSlots() {
  const days = allDays();
  const from = zonedToUtc(`${days[0]}T00:00`, TZ)!;
  const to = zonedToUtc(`${days[days.length - 1]}T23:59`, TZ)!;
  const taken = await query<{ starts_at: Date }>("SELECT starts_at FROM consultation_requests WHERE status <> 'cancelled' AND starts_at >= $1 AND starts_at <= $2", [from, to]);
  const team = await query<{ id: number }>("SELECT id FROM staff WHERE active AND role IN ('consultant', 'admin')");
  const busy = team.length
    ? await query<{ staff_id: number; starts_at: Date; minutes: number }>(
        `SELECT staff_id, starts_at, minutes FROM sessions WHERE staff_id = ANY($1::int[]) AND status <> 'cancelled' AND starts_at < $3 AND starts_at + make_interval(mins => minutes) > $2`,
        [team.map((t) => t.id), from, to],
      )
    : [];
  const takenMs = new Set(taken.map((t) => new Date(t.starts_at).getTime()));
  const out: Record<string, string[]> = {};
  for (const day of days) {
    const times = TIMES.filter((time) => {
      const start = zonedToUtc(`${day}T${time}`, TZ)!.getTime();
      if (takenMs.has(start)) return false;
      const end = start + MINUTES * 60000;
      if (team.length === 0) return true;
      return team.some((t) => !busy.some((b) => b.staff_id === t.id && new Date(b.starts_at).getTime() < end && new Date(b.starts_at).getTime() + b.minutes * 60000 > start));
    });
    if (times.length) out[day] = times;
  }
  return out;
}

// Reserves a time. Returns false if it was just taken (the unique index makes this safe when two people click together).
export async function reserveSlot(start: Date, name: string, email: string) {
  try {
    const rows = await query<{ id: number }>(
      `INSERT INTO consultation_requests (starts_at, minutes, name, email) SELECT $1::timestamptz, $2::int, $3::text, $4::text
       WHERE (SELECT count(*) FROM staff WHERE active AND role IN ('consultant', 'admin')) = 0
          OR EXISTS (SELECT 1 FROM staff st WHERE st.active AND st.role IN ('consultant', 'admin') AND NOT EXISTS (
               SELECT 1 FROM sessions s WHERE s.staff_id = st.id AND s.status <> 'cancelled'
                 AND s.starts_at < $1::timestamptz + make_interval(mins => $2::int) AND s.starts_at + make_interval(mins => s.minutes) > $1::timestamptz))
       RETURNING id`,
      [start, MINUTES, name, email],
    );
    return rows.length > 0;
  } catch (error) {
    if ((error as { code?: string }).code === "23505") return false;
    throw error;
  }
}
