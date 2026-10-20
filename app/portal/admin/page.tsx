import { Suspense } from "react";
import Link from "next/link";
import { requireStaff, staffUpcoming, staffNeedingNotes, staffStats, canManage } from "../../lib/portal/dal";
import { greeting } from "../../lib/portal/time";
import { SessionList, Flash } from "../components";
import AdminOverview from "./Overview";
import { PageHeader, Card, EmptyState, StatGrid, Stat, HelpBox } from "../ui";

// Staff see times in UK time; families see their own time zone.
const STAFF_TZ = "Europe/London";

export default async function StaffDashboard({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  const { staff } = await requireStaff();
  const manager = canManage(staff);
  const [upcoming, needingNotes, stats, msg] = await Promise.all([staffUpcoming(staff, 8), staffNeedingNotes(staff), staffStats(staff), searchParams]);
  const href = (s: { id: number }) => `/portal/admin/sessions/${s.id}`;
  const firstName = staff.name.split(" ")[0];

  // The first-time setup checklist was removed from the dashboard; the Checklist component stays in ui.tsx if it is wanted again.
  const setupDone = true;

  return (
    <>
      <Flash {...msg} />
      <PageHeader
        title={`${greeting()}, ${firstName}`}
        description={manager ? "Here's what's happening across Britannia Crown today. Times are in UK time." : "Your lessons and the notes you need to write. Times are in UK time."}
        actions={manager ? <Link href="/portal/admin/families" className="btn-primary">Schedule a lesson</Link> : undefined}
      />

      {staff.role === "admin" && (
        <>
          <Suspense fallback={<p className="ui-card-desc">Loading the business overview…</p>}>
            <AdminOverview />
          </Suspense>
          <h2 className="ov-h">Today&apos;s lessons and notes</h2>
        </>
      )}

      {staff.role !== "admin" && (<StatGrid>
        <Stat label="Lessons today" value={stats.today} href="/portal/admin/sessions" />
        <Stat label="Next 7 days" value={stats.week} href="/portal/admin/sessions" />
        <Stat
          label="Notes to write"
          value={stats.needs_note}
          tone={stats.needs_note > 0 ? "alert" : "good"}
          hint={stats.needs_note > 0 ? "Families are waiting" : "All caught up"}
          href="#needs-note"
        />
        {manager && <Stat label="Families" value={stats.families} href="/portal/admin/families" />}
      </StatGrid>)}

      <div className="pt-grid">
        <div className="pt-main">
          <Card
            id="needs-note"
            title="Notes to write"
            description="Finished lessons without a note. Families see your note in their portal, so try to add it the same day."
          >
            <SessionList
              sessions={needingNotes}
              tz={STAFF_TZ}
              hrefFor={href}
              showFamily
              action={(s) => <Link href={`${href(s)}#write-note`} className="btn-primary ui-btn-sm">Write note</Link>}
              empty={<EmptyState title="All caught up">Every finished lesson has a note.</EmptyState>}
            />
          </Card>
          <Card title="Coming up" action={<Link href="/portal/admin/sessions" className="ui-link">All sessions →</Link>}>
            <SessionList
              sessions={upcoming}
              tz={STAFF_TZ}
              hrefFor={href}
              showFamily
              empty={
                <EmptyState
                  title="No upcoming lessons"
                  action={manager ? <Link href="/portal/admin/families" className="btn-secondary">Schedule a lesson</Link> : undefined}
                >
                  {manager ? "Open a family to schedule their next lesson." : "Lessons assigned to you will appear here."}
                </EmptyState>
              }
            />
          </Card>
        </div>
        <aside className="pt-side">
          <HelpBox title="How your area works" open={!setupDone}>
            {manager ? (
              <ol>
                <li><strong>Families</strong> holds every family, their children and lessons.</li>
                <li><strong>Schedule</strong> lessons from a family&apos;s page and assign a tutor.</li>
                <li><strong>Tutors</strong> see only their own lessons and write notes after each one.</li>
                <li><strong>Families</strong> sign in with their email to see lessons, notes and homework.</li>
              </ol>
            ) : (
              <ol>
                <li>Your lessons appear under <strong>My sessions</strong>, with joining links.</li>
                <li>After each lesson, open it and <strong>write a note</strong>: what you covered, how it went and any homework.</li>
                <li>Notes are shared with the family unless you untick the box.</li>
              </ol>
            )}
            <p><Link href="/portal/admin/help">Read the guide →</Link></p>
          </HelpBox>
        </aside>
      </div>
    </>
  );
}
