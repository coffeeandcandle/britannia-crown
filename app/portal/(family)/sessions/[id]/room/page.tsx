import { notFound } from "next/navigation";
import { requireFamily, familySession } from "../../../../../lib/portal/dal";
import { entryFor } from "../../../../../lib/portal/daily";
import { PageHeader } from "../../../../ui";
import LessonRoom from "../../../../LessonRoom";

export default async function FamilyRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { viewer, family } = await requireFamily();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const session = await familySession(family.id, id);
  if (!session) notFound();
  const entry = await entryFor(session, { name: viewer.firstName || family.name, owner: false });
  return (
    <>
      <PageHeader back={{ href: `/portal/sessions/${session.id}`, label: "Lesson details" }} title={session.title} description={session.tutor_name ? `With ${session.tutor_name}` : undefined} />
      <LessonRoom entry={entry} backHref={`/portal/sessions/${session.id}`} fallbackUrl={session.join_url} />
    </>
  );
}
