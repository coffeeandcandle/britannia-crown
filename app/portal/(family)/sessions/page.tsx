import Link from "next/link";
import { requireFamily, familySessions } from "../../../lib/portal/dal";
import { tzLabel } from "../../../lib/portal/time";
import { SessionList, Flash } from "../../components";
import { PageHeader, Card, EmptyState } from "../../ui";

export default async function FamilySessionsPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const { family } = await requireFamily();
  const msg = await searchParams;
  const sessions = await familySessions(family.id);
  const upcoming = sessions.filter((s) => s.is_upcoming).reverse();
  const past = sessions.filter((s) => !s.is_upcoming);
  const href = (s: { id: number }) => `/portal/sessions/${s.id}`;

  return (
    <>
      <Flash ok={msg.ok} />
      <PageHeader
        title="Sessions"
        description={<>All your lessons, past and future. Open one to see its details and your tutor&apos;s notes. Times in {tzLabel(family.timezone)}.</>}
        actions={<Link href="/portal/request" className="btn-secondary">Request a lesson</Link>}
      />
      <Card title="Coming up" description="A Join button appears on a lesson 15 minutes before it starts.">
        <SessionList
          sessions={upcoming}
          tz={family.timezone}
          hrefFor={href}
          empty={<EmptyState title="Nothing booked yet">Your consultant will add lessons here once they&apos;re arranged.</EmptyState>}
        />
      </Card>
      <Card title="Past lessons">
        <SessionList
          sessions={past}
          tz={family.timezone}
          hrefFor={href}
          empty={<EmptyState title="No past lessons yet">Lessons you&apos;ve had will be listed here, with their notes.</EmptyState>}
        />
      </Card>
    </>
  );
}
