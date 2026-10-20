import "server-only";
import { headers } from "next/headers";

// The address the site is being served from, so links shared with families point at the live site.
export async function siteOrigin() {
  const h = await headers();
  return `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host")}`;
}
