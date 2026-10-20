import Link from "next/link";
import { requireFamily, familySessions } from "../../../lib/portal/dal";
import { tzLabel } from "../../../lib/portal/time";
import { SessionList } from "../../components";

export default async function FamilySessionsPage() {
  const { family } = await requireFamily();
  const sessions = await familySessions(family.id);
  const upcoming = sessions.filter((s) => s.is_upcoming).reverse();
  const past = sessions.filter((s) => !s.is_upcoming);
  const href = (s: { id: number }) => `/portal/sessions/${s.id}`;

  return (
    <>
      <h1 className="pt-title">Sessions</h1>
      <p className="pt-small">Times shown in {tzLabel(family.timezone)}.</p>
      <section className="pt-card">
        <h2>Coming up</h2>
        <SessionList sessions={upcoming} tz={family.timezone} hrefFor={href} empty={<>Nothing booked. <Link href="/book-consultation">Book a session</Link>.</>} />
      </section>
      <section className="pt-card">
        <h2>Past sessions</h2>
        <SessionList sessions={past} tz={family.timezone} hrefFor={href} empty="Your past sessions will be listed here." />
      </section>
    </>
  );
}
