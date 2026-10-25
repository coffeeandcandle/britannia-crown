import { notFound } from "next/navigation";
import { requireFamily, familySession } from "../../../../../lib/portal/dal";
import { entryFor } from "../../../../../lib/portal/daily";
import { PageHeader } from "../../../../ui";
import LessonRoom from "../../../../LessonRoom";
import { logActivity } from "../../../../../lib/portal/audit";

export default async function FamilyRoomPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ full?: string }> }) {
  const { viewer, family } = await requireFamily();
  const id = Number((await params).id);
  const full = (await searchParams).full === "1";
  if (!Number.isInteger(id)) notFound();
  const session = await familySession(family.id, id);
  if (!session) notFound();
  const entry = await entryFor(session, { name: viewer.firstName || family.name, owner: false });
  if (entry.state === "ready") await logActivity({ kind: "family", id: family.id, name: viewer.firstName || family.name }, "room.open", { familyId: family.id, sessionId: session.id, detail: session.title });
  return (
    <>
      <PageHeader back={{ href: `/portal/sessions/${session.id}`, label: "Lesson details" }} title={session.title} description={session.tutor_name ? `With ${session.tutor_name}` : undefined} />
      <LessonRoom entry={entry} sessionId={session.id} backHref={`/portal/sessions/${session.id}`} roomHref={`/portal/sessions/${session.id}/room`} full={full} fallbackUrl={session.join_url} />
    </>
  );
}
