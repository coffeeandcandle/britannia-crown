// Times are stored in UTC and shown in the family's time zone (UK or UAE families).
export const TIMEZONES = [
  { id: "Europe/London", label: "UK time" },
  { id: "Asia/Dubai", label: "UAE time" },
] as const;

export const tzLabel = (tz: string) => TIMEZONES.find((t) => t.id === tz)?.label ?? tz;

export function formatSessionTime(date: Date, tz: string) {
  const day = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: tz }).format(date);
  const time = new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: tz }).format(date);
  return `${day}, ${time.replace(" ", "").toLowerCase()}`;
}

export function formatDate(date: Date, tz: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: tz }).format(date);
}

// Offset of `tz` from UTC at the given instant, in milliseconds.
function tzOffset(at: Date, tz: string) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: tz,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(at)
      .map((p) => [p.type, p.value]),
  );
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
  return asUtc - at.getTime();
}

// Converts a <input type="datetime-local"> value entered in `tz` to a UTC Date.
export function zonedToUtc(local: string, tz: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(local);
  if (!m) return null;
  const guess = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
  // Two passes handle the hour either side of a clock change.
  let utc = guess - tzOffset(new Date(guess), tz);
  utc = guess - tzOffset(new Date(utc), tz);
  return new Date(utc);
}
