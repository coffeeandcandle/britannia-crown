import "server-only";
import { createHmac, createHash, timingSafeEqual } from "node:crypto";

// Short-lived signed links so Microsoft's document viewer can read a single file once the portal has
// checked the person is allowed to see it. The key is derived from the database address, which only
// our server knows, so no extra secret is needed. Links stop working after 10 minutes.
const key = () => createHash("sha256").update(`doc-links:${process.env.DATABASE_URL ?? ""}`).digest();
const TTL_MS = 10 * 60 * 1000;

export function signDocLink(id: number, origin: string) {
  const exp = Date.now() + TTL_MS;
  const sig = createHmac("sha256", key()).update(`${id}.${exp}`).digest("hex");
  return `${origin}/api/doc/${id}?exp=${exp}&sig=${sig}`;
}

export function verifyDocLink(id: number, exp: string | null, sig: string | null) {
  const e = Number(exp);
  if (!sig || !Number.isFinite(e) || e < Date.now() || e > Date.now() + TTL_MS + 1000) return false;
  const good = createHmac("sha256", key()).update(`${id}.${e}`).digest();
  const given = Buffer.from(sig, "hex");
  return given.length === good.length && timingSafeEqual(given, good);
}

export const OFFICE_MIMES = new Set([
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.oasis.opendocument.text",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.presentation",
  "application/rtf",
  "text/csv",
]);
