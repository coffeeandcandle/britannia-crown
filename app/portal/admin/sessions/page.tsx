import Link from "next/link";
import { requireStaff, staffUpcoming, staffPast, canManage } from "../../../lib/portal/dal";
import { SessionList } from "../../components";
import { PageHeader, Card, EmptyState } from "../../ui";

export default async function StaffSessionsPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const { staff } = await requireStaff();
  const past = (await searchParams).view === "past";
  const sessions = past ? await staffPast(staff) : await staffUpcoming(staff, 100);
  const manager = canManage(staff);
  const href = (s: { id: number }) => `/portal/admin/sessions/${s.id}`;

  return (
    <>
      <PageHeader
        title={manager ? "All sessions" : "My sessions"}
        description={manager ? "Every lesson across all families. Open one to update it or read its notes. Times are in UK time." : "The lessons you're teaching. Open one to join it or write its note. Times are in UK time."}
        actions={manager ? <Link href="/portal/admin/families" className="btn-primary">+ Schedule a lesson</Link> : undefined}
      />
      <nav className="ui-tabs" aria-label="Sessions">
        <Link href="/portal/admin/sessions" aria-current={past ? undefined : "page"}>Coming up</Link>
        <Link href="/portal/admin/sessions?view=past" aria-current={past ? "page" : undefined}>Past</Link>
      </nav>
      <Card>
        <SessionList
          sessions={sessions}
          tz="Europe/London"
          hrefFor={href}
          showFamily
          action={past ? (s) => (s.note_count === 0 && s.status !== "cancelled" ? <Link href={`${href(s)}#write-note`} className="btn-primary ui-btn-sm">Write note</Link> : null) : undefined}
          empty={
            <EmptyState
              icon={past ? "🕰️" : "📅"}
              title={past ? "No past lessons yet" : "Nothing coming up"}
              action={!past && manager ? <Link href="/portal/admin/families" className="btn-secondary">Schedule a lesson</Link> : undefined}
            >
              {past ? "Finished lessons will be listed here." : manager ? "Open a family to schedule a lesson." : "Lessons assigned to you will appear here."}
            </EmptyState>
          }
        />
      </Card>
    </>
  );
}
