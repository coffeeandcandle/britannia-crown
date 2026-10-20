import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStaff, staffSession } from "../../../../../lib/portal/dal";
import { entryFor } from "../../../../../lib/portal/daily";
import { PageHeader } from "../../../../ui";
import LessonRoom from "../../../../LessonRoom";

export default async function StaffRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { staff } = await requireStaff();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const session = await staffSession(staff, id);
  if (!session) notFound();
  const entry = await entryFor(session, { name: staff.name, owner: true });
  return (
    <>
      <PageHeader
        back={{ href: `/portal/admin/sessions/${session.id}`, label: "Lesson details" }}
        title={session.title}
        description={`${session.family_name}${session.child_name ? ` · ${session.child_name}` : ""}`}
        actions={<Link href={`/portal/admin/sessions/${session.id}#write-note`} className="btn-secondary">Write the note</Link>}
      />
      <LessonRoom entry={entry} backHref={`/portal/admin/sessions/${session.id}`} fallbackUrl={session.join_url} />
    </>
  );
}
