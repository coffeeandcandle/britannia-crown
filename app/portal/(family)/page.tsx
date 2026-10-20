import Link from "next/link";
import { requireFamily, familyChildren, familyConsultant, familyUpcoming, familyNotes } from "../../lib/portal/dal";
import { tzLabel } from "../../lib/portal/time";
import { WHATSAPP_URL } from "../../lib/site";
import { SessionList, NoteCard } from "../components";

export default async function FamilyDashboard() {
  const { viewer, family } = await requireFamily();
  const [children, consultant, upcoming, notes] = await Promise.all([
    familyChildren(family.id),
    familyConsultant(family),
    familyUpcoming(family.id, 4),
    familyNotes(family.id, { limit: 3 }),
  ]);

  return (
    <div className="pt-grid">
      <div className="pt-main">
        <h1 className="pt-title">Hello{viewer.firstName ? `, ${viewer.firstName}` : ""}</h1>

        <section className="pt-card">
          <div className="pt-card-head">
            <h2>Upcoming sessions</h2>
            <Link href="/portal/sessions">All sessions →</Link>
          </div>
          <SessionList
            sessions={upcoming}
            tz={family.timezone}
            hrefFor={(s) => `/portal/sessions/${s.id}`}
            empty={<>No sessions booked yet. <Link href="/book-consultation">Book a session</Link> or message your consultant.</>}
          />
          <p className="pt-small">Times shown in {tzLabel(family.timezone)}. A &ldquo;Join now&rdquo; button appears 15 minutes before each online session.</p>
        </section>

        <section className="pt-card">
          <div className="pt-card-head">
            <h2>Latest notes</h2>
            <Link href="/portal/notes">All notes →</Link>
          </div>
          {notes.length === 0 ? (
            <div className="pt-empty">Notes from your tutor will appear here after each session.</div>
          ) : (
            <div className="pt-notes">{notes.map((n) => <NoteCard key={n.id} note={n} tz={family.timezone} />)}</div>
          )}
        </section>
      </div>

      <aside className="pt-side">
        <section className="pt-card">
          <h2>Your children</h2>
          {children.length === 0 ? (
            <p className="pt-small">Your consultant will add your children&apos;s details.</p>
          ) : (
            <ul className="pt-list">
              {children.map((c) => (
                <li key={c.id}><strong>{c.name}</strong>{c.year_group && <span>{c.year_group}</span>}</li>
              ))}
            </ul>
          )}
        </section>

        <section className="pt-card pt-card-dark">
          <h2>Your consultant</h2>
          {consultant ? (
            <>
              <p className="pt-consultant">{consultant.name}</p>
              <p><a href={`mailto:${consultant.email}`}>{consultant.email}</a></p>
            </>
          ) : (
            <p>We&apos;ll introduce your consultant shortly.</p>
          )}
          <div className="pt-actions">
            <a href={WHATSAPP_URL} className="btn-primary">Message on WhatsApp</a>
            <Link href="/book-consultation" className="btn-secondary">Book a session</Link>
          </div>
        </section>
      </aside>
    </div>
  );
}
