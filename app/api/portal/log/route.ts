import { getViewer, familySession, staffSession } from "../../../lib/portal/dal";
import { logActivity, ACTIONS } from "../../../lib/portal/audit";

// The lesson room reports who joined and left, so the team has a full record of each online lesson.
// Only people who may open that lesson can write to its log, and only known event types are accepted.
const ALLOWED = new Set(["room.joined", "room.left", "room.participant_joined", "room.participant_left", "room.camera_error", "room.error"]);

export async function POST(request: Request) {
  const viewer = await getViewer();
  if (!viewer) return new Response(null, { status: 401 });
  let body: { sessionId?: number; event?: string; detail?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(null, { status: 400 });
  }
  const sessionId = Number(body.sessionId);
  if (!Number.isInteger(sessionId) || !body.event || !ALLOWED.has(body.event) || !(body.event in ACTIONS)) return new Response(null, { status: 400 });

  if (viewer.staff) {
    const session = await staffSession(viewer.staff, sessionId);
    if (!session) return new Response(null, { status: 404 });
    await logActivity({ kind: "staff", id: viewer.staff.id, name: viewer.staff.name, role: viewer.staff.role }, body.event, { familyId: session.family_id, sessionId, detail: body.detail });
  } else if (viewer.family) {
    const session = await familySession(viewer.family.id, sessionId);
    if (!session) return new Response(null, { status: 404 });
    await logActivity({ kind: "family", id: viewer.family.id, name: viewer.firstName || viewer.family.name }, body.event, { familyId: viewer.family.id, sessionId, detail: body.detail });
  } else {
    return new Response(null, { status: 403 });
  }
  return new Response(null, { status: 204 });
}
