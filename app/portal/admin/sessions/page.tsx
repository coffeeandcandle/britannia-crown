import Link from "next/link";
import { requireStaff, staffUpcoming, staffPast, canManage } from "../../../lib/portal/dal";
import { SessionList } from "../../components";

export default async function StaffSessionsPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const { staff } = await requireStaff();
  const past = (await searchParams).view === "past";
  const sessions = past ? await staffPast(staff) : await staffUpcoming(staff, 100);
  const manager = canManage(staff);

  return (
    <>
      <h1 className="pt-title">{manager ? "All sessions" : "My sessions"}</h1>
      <nav className="pt-tabs" aria-label="Sessions">
        <Link href="/portal/admin/sessions" aria-current={past ? undefined : "page"}>Coming up</Link>
        <Link href="/portal/admin/sessions?view=past" aria-current={past ? "page" : undefined}>Past</Link>
      </nav>
      <section className="pt-card">
        <SessionList
          sessions={sessions}
          tz="Europe/London"
          hrefFor={(s) => `/portal/admin/sessions/${s.id}`}
          showFamily
          empty={past ? "No past sessions yet." : manager ? <>No upcoming sessions. Schedule one from a <Link href="/portal/admin/families">family&apos;s page</Link>.</> : "No upcoming sessions assigned to you."}
        />
        <p className="pt-small">Times shown in UK time.</p>
      </section>
    </>
  );
}
