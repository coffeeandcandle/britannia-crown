import Link from "next/link";
import { requireStaff, staffUpcoming, staffNeedingNotes, canManage } from "../../lib/portal/dal";
import { SessionList, Flash } from "../components";

// Staff see times in UK time; families see their own time zone.
const STAFF_TZ = "Europe/London";

export default async function StaffOverview({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  const { staff } = await requireStaff();
  const [upcoming, needingNotes] = await Promise.all([staffUpcoming(staff), staffNeedingNotes(staff)]);
  const msg = await searchParams;
  const href = (s: { id: number }) => `/portal/admin/sessions/${s.id}`;

  return (
    <>
      <h1 className="pt-title">{canManage(staff) ? "All sessions" : "Your sessions"}</h1>
      <Flash {...msg} />
      <section className="pt-card">
        <div className="pt-card-head">
          <h2>Needs a note</h2>
          <span className="pt-small">{needingNotes.length} session{needingNotes.length === 1 ? "" : "s"}</span>
        </div>
        <SessionList sessions={needingNotes} tz={STAFF_TZ} hrefFor={href} showFamily empty="All caught up. Every past session has a note." />
      </section>
      <section className="pt-card">
        <div className="pt-card-head">
          <h2>Coming up</h2>
          {canManage(staff) && <Link href="/portal/admin/families">Schedule a session →</Link>}
        </div>
        <SessionList sessions={upcoming} tz={STAFF_TZ} hrefFor={href} showFamily empty="No upcoming sessions." />
        <p className="pt-small">Times shown in UK time.</p>
      </section>
    </>
  );
}
