import "server-only";
import { query, queryOne } from "./db";
import { addDaysKey, dayKeyOf, zonedToUtc } from "./time";
import type { Role } from "./dal";

// Paid sessions are booked inside the portal after payment, so they land straight in the shared calendar
// (admin, the person teaching and the family all see them). Free meetings stay on Calendly.

export const TZ = "Europe/London";
const NOTICE_MS = 48 * 60 * 60 * 1000; // nothing can be booked in the next 48 hours, to give time to prepare
const DAYS_AHEAD = 21;
const STEP_MIN = 30;

export const BOOKABLE: Record<string, { title: string; minutes: number; roles: Role[] }> = {
  "strategy-session": { title: "Strategy session", minutes: 60, roles: ["consultant", "admin"] },
  "trial-lesson": { title: "Trial tutoring lesson", minutes: 45, roles: ["tutor"] },
};
const BOOKABLE_IDS = Object.keys(BOOKABLE);

export type UnbookedOrder = { id: number; product_id: string; product_name: string; created_at: Date; has_details: boolean };

// Paid sessions this family has bought but not yet booked.
export const unbookedOrders = (familyId: number) =>
  query<UnbookedOrder>(
    `SELECT id, product_id, product_name, created_at, (onboarding IS NOT NULL) AS has_details FROM orders
     WHERE family_id = $1 AND status = 'paid' AND session_id IS NULL AND product_id = ANY($2::text[])
     ORDER BY created_at`,
    [familyId, BOOKABLE_IDS],
  );

export type Slot = { start: Date; staffIds: number[] };

// Every start time with at least one suitable, free person, from 48 hours from now for three weeks.
export async function availableSlots(productId: string): Promise<Slot[]> {
  const kind = BOOKABLE[productId];
  if (!kind) return [];
  const now = Date.now();
  const earliest = now + NOTICE_MS;
  const today = dayKeyOf(new Date(), TZ);
  const lastDay = addDaysKey(today, DAYS_AHEAD);

  const windows = await query<{ staff_id: number; weekday: number; start_min: number; end_min: number }>(
    `SELECT a.staff_id, a.weekday, a.start_min, a.end_min FROM availability a JOIN staff s ON s.id = a.staff_id
     WHERE s.active AND s.role = ANY($1::text[])`,
    [kind.roles],
  );
  if (windows.length === 0) return [];
  const staffIds = [...new Set(windows.map((w) => w.staff_id))];
  const busy = await query<{ staff_id: number; starts_at: Date; minutes: number }>(
    `SELECT staff_id, starts_at, minutes FROM sessions
     WHERE staff_id = ANY($1::int[]) AND status <> 'cancelled' AND starts_at < $3 AND starts_at + make_interval(mins => minutes) > $2`,
    [staffIds, new Date(earliest), zonedToUtc(`${lastDay}T23:59`, TZ)],
  );

  const slots = new Map<number, number[]>();
  for (let d = 0; d <= DAYS_AHEAD; d++) {
    const key = addDaysKey(today, d);
    const [y, m, dd] = key.split("-").map(Number);
    const weekday = new Date(Date.UTC(y, m - 1, dd)).getUTCDay();
    for (const w of windows.filter((x) => x.weekday === weekday)) {
      for (let t = w.start_min; t + kind.minutes <= w.end_min; t += STEP_MIN) {
        const hh = String(Math.floor(t / 60)).padStart(2, "0");
        const mm = String(t % 60).padStart(2, "0");
        const start = zonedToUtc(`${key}T${hh}:${mm}`, TZ);
        if (!start || start.getTime() < earliest) continue;
        const end = start.getTime() + kind.minutes * 60000;
        const clash = busy.some(
          (b) => b.staff_id === w.staff_id && new Date(b.starts_at).getTime() < end && new Date(b.starts_at).getTime() + b.minutes * 60000 > start.getTime(),
        );
        if (clash) continue;
        const list = slots.get(start.getTime()) ?? [];
        if (!list.includes(w.staff_id)) list.push(w.staff_id);
        slots.set(start.getTime(), list);
      }
    }
  }
  return [...slots.entries()].sort((a, b) => a[0] - b[0]).map(([t, ids]) => ({ start: new Date(t), staffIds: ids }));
}

// Books one paid order into one slot. Re-checks everything, so a slot taken a moment ago cannot be double-booked.
export async function bookOrder(familyId: number, orderId: number, startMs: number) {
  const order = await queryOne<{ id: number; product_id: string }>(
    "SELECT id, product_id FROM orders WHERE id = $1 AND family_id = $2 AND status = 'paid' AND session_id IS NULL",
    [orderId, familyId],
  );
  if (!order || !BOOKABLE[order.product_id]) return { error: "This session has already been booked, or could not be found." } as const;
  const kind = BOOKABLE[order.product_id];
  const slot = (await availableSlots(order.product_id)).find((s) => s.start.getTime() === startMs);
  if (!slot) return { error: "Sorry, that time has just been taken. Please choose another." } as const;
  const child = await queryOne<{ id: number }>("SELECT id FROM children WHERE family_id = $1 ORDER BY id LIMIT 1", [familyId]);

  for (const staffId of slot.staffIds) {
    // Insert only if this person is still free for the whole slot.
    const created = await queryOne<{ id: number }>(
      `INSERT INTO sessions (family_id, child_id, staff_id, title, starts_at, minutes)
       SELECT $1, $2, $3, $4, $5, $6
       WHERE NOT EXISTS (
         SELECT 1 FROM sessions WHERE staff_id = $3 AND status <> 'cancelled'
           AND starts_at < $5::timestamptz + make_interval(mins => $6) AND starts_at + make_interval(mins => minutes) > $5::timestamptz)
       RETURNING id`,
      [familyId, child?.id ?? null, staffId, kind.title, slot.start, kind.minutes],
    );
    if (!created) continue;
    const linked = await queryOne<{ id: number }>("UPDATE orders SET session_id = $1 WHERE id = $2 AND session_id IS NULL RETURNING id", [created.id, orderId]);
    if (!linked) {
      await query("DELETE FROM sessions WHERE id = $1", [created.id]);
      return { error: "This session has already been booked." } as const;
    }
    return { sessionId: created.id, staffId, start: slot.start, title: kind.title } as const;
  }
  return { error: "Sorry, that time has just been taken. Please choose another." } as const;
}

export const minutesToTime = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
