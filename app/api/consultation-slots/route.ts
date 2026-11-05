import { freeSlots } from "../../lib/consultations";

// The dates and times still open for a free consultation. Times only, nothing about who booked them.
export async function GET() {
  if (!process.env.DATABASE_URL) return Response.json({ ok: false }, { status: 503 });
  try {
    return Response.json({ ok: true, slots: await freeSlots() }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Loading consultation times failed", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
