import { getViewer, familySession, staffSession } from "../../../lib/portal/dal";
import { roomWindow } from "../../../lib/portal/daily";
import { addSegments, transcribeClip, transcribeEnabled } from "../../../lib/portal/transcripts";

// The lesson room sends each person's own microphone here in short clips while the call runs. Only people who
// may open that lesson can send, only during its room window, and the speaker's name comes from their sign-in.
const MAX_BYTES = 3_000_000;

export async function POST(request: Request) {
  if (!transcribeEnabled()) return new Response(null, { status: 204 });
  const viewer = await getViewer();
  if (!viewer) return new Response(null, { status: 401 });
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return new Response(null, { status: 400 });
  }
  const sessionId = Number(form.get("sessionId"));
  const startedAt = new Date(String(form.get("startedAt") ?? ""));
  const audio = form.get("audio");
  if (!Number.isInteger(sessionId) || Number.isNaN(startedAt.getTime()) || !(audio instanceof Blob) || audio.size < 1500 || audio.size > MAX_BYTES) {
    return new Response(null, { status: 400 });
  }

  const session = viewer.staff ? await staffSession(viewer.staff, sessionId) : viewer.family ? await familySession(viewer.family.id, sessionId) : null;
  if (!session) return new Response(null, { status: 404 });
  const { opens, closes } = roomWindow(new Date(session.starts_at), session.minutes);
  const now = Date.now();
  if (now < opens.getTime() || now > closes.getTime() + 5 * 60_000) return new Response(null, { status: 403 });

  const speaker = viewer.staff ? viewer.staff.name : viewer.firstName || viewer.family?.name || "Family";
  const ext = audio.type.includes("mp4") ? "mp4" : audio.type.includes("ogg") ? "ogg" : "webm";
  try {
    await addSegments(sessionId, speaker, startedAt, await transcribeClip(audio, `clip.${ext}`));
  } catch (error) {
    console.error("Transcription failed", error);
    return new Response(null, { status: 502 });
  }
  return new Response(null, { status: 204 });
}
