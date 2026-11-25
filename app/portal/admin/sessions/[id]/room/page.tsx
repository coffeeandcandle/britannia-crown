import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStaff, staffSession, noteDraft } from "../../../../../lib/portal/dal";
import { Flash } from "../../../../components";
import LiveNotes from "./LiveNotes";
import { entryFor } from "../../../../../lib/portal/daily";
import { PageHeader } from "../../../../ui";
import LessonRoom from "../../../../LessonRoom";
import { logActivity } from "../../../../../lib/portal/audit";

export default async function StaffRoomPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ full?: string; ok?: string; error?: string }> }) {
  const { staff } = await requireStaff();
  const id = Number((await params).id);
  const { full: fullParam, ok, error } = await searchParams;
  const full = fullParam === "1";
  if (!Number.isInteger(id)) notFound();
  const session = await staffSession(staff, id);
  if (!session) notFound();
  const [entry, draft] = await Promise.all([entryFor(session, { name: staff.name, owner: true }), noteDraft(session.id, staff.id)]);
  if (entry.state === "ready") await logActivity({ kind: "staff", id: staff.id, name: staff.name, role: staff.role }, "room.open", { familyId: session.family_id, sessionId: session.id, detail: session.title });
  return (
    <>
      <PageHeader
        back={{ href: `/portal/admin/sessions/${session.id}`, label: "Lesson details" }}
        title={session.title}
        description={`${session.family_name}${session.child_name ? ` · ${session.child_name}` : ""}`}
        actions={<Link href={`/portal/admin/sessions/${session.id}#notes`} className="btn-secondary">See saved notes</Link>}
      />
      <Flash ok={ok} error={error} />
      {/* Tutors' side only: the video with live notes beside it (below it on a phone). */}
      <div className="live-room">
        <div className="live-room-video">
          <LessonRoom entry={entry} sessionId={session.id} backHref={`/portal/admin/sessions/${session.id}`} roomHref={`/portal/admin/sessions/${session.id}/room`} full={full} fallbackUrl={session.join_url} />
        </div>
        {!full && (
          <aside className="live-room-notes">
            <LiveNotes
              key={ok ?? "notes"}
              sessionId={session.id}
              initialBody={draft?.body ?? ""}
              initialHomework={draft?.homework ?? ""}
              savedAt={draft ? new Date(draft.updated_at).toISOString() : null}
            />
          </aside>
        )}
      </div>
    </>
  );
}
