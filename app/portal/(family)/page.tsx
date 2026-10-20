import Link from "next/link";
import { dailyEnabled } from "../../lib/portal/daily";
import { requireFamily, familyChildren, familyConsultant, familyUpcoming, familyNotes, familyNoteCount, familyOrders } from "../../lib/portal/dal";
import { tzLabel, sessionWhen, greeting } from "../../lib/portal/time";
import { EMAIL } from "../../lib/site";
import { SessionList, NoteCard, DateTile } from "../components";
import { PageHeader, Card, EmptyState, StatGrid, Stat, HelpBox, Avatar } from "../ui";
import Purchases from "./Purchases";

export default async function FamilyDashboard() {
  const { viewer, family } = await requireFamily();
  const [children, consultant, upcoming, notes, noteCount, orders] = await Promise.all([
    familyChildren(family.id),
    familyConsultant(family),
    familyUpcoming(family.id, 6),
    familyNotes(family.id, { limit: 2 }),
    familyNoteCount(family.id),
    familyOrders(family, 20),
  ]);
  const [next, ...later] = upcoming;
  const tz = family.timezone;
  const nextWhen = next ? sessionWhen(new Date(next.starts_at), next.minutes, tz) : null;
  const contactEmail = consultant?.email ?? EMAIL;

  return (
    <>
      <PageHeader
        title={`${greeting(tz)}${viewer.firstName ? `, ${viewer.firstName}` : ""}`}
        description={<>Everything about {family.name}&apos;s lessons in one place. Times are shown in {tzLabel(tz)}.</>}
      />

      {next && nextWhen ? (
        <section className={`ui-next${next.is_joinable ? " is-live" : ""}`} aria-labelledby="next-title">
          <DateTile date={new Date(next.starts_at)} tz={tz} />
          <div className="ui-next-main">
            <p className="ui-next-kicker">{next.is_joinable ? "Your lesson is ready to join" : "Your next lesson"}</p>
            <h2 id="next-title">{next.title}</h2>
            <p className="ui-next-meta">
              <strong>{nextWhen.label}</strong> · {next.minutes} minutes · {nextWhen.relative}
            </p>
            <p className="ui-next-people">
              {[next.child_name, next.tutor_name ? `with ${next.tutor_name}` : null].filter(Boolean).join(" · ")}
            </p>
          </div>
          <div className="ui-next-action">
            {next.is_joinable && dailyEnabled() ? (
              <Link href={`/portal/sessions/${next.id}/room`} className="btn-primary">Join lesson now</Link>
            ) : next.is_joinable && next.join_url ? (
              <a href={next.join_url} className="btn-primary" target="_blank" rel="noopener noreferrer">Join lesson now</a>
            ) : dailyEnabled() || next.join_url ? (
              <p className="ui-next-hint">The <strong>Join</strong> button appears here 15 minutes before the lesson starts.</p>
            ) : (
              <p className="ui-next-hint">Your tutor will add the joining link before the lesson.</p>
            )}
            <Link href={`/portal/sessions/${next.id}`} className="ui-link">Lesson details</Link>
          </div>
        </section>
      ) : (
        <Card>
          <EmptyState
            icon="📅"
            title="No lessons booked yet"
            action={<><Link href="/portal/shop" className="btn-primary">Browse plans and services</Link> <Link href="/portal/request" className="btn-secondary">Request a lesson</Link></>}
          >
            When your consultant schedules lessons, the next one will appear here with a button to join it.
          </EmptyState>
        </Card>
      )}

      <StatGrid>
        <Stat label="Lessons coming up" value={upcoming.length} href="/portal/sessions" />
        <Stat label="Tutor notes" value={noteCount} href="/portal/notes" />
        <Stat label={children.length === 1 ? "Child" : "Children"} value={children.length} href="/portal/family" />
      </StatGrid>

      <div className="pt-grid">
        <div className="pt-main">
          {orders.length > 0 && (
            <Card
              title="Your services"
              description="What you've bought from us. Receipts and plan changes are under Billing."
              action={<Link href="/portal/billing" className="ui-link">Billing →</Link>}
            >
              <Purchases orders={orders} tz={tz} limit={4} />
            </Card>
          )}
          {later.length > 0 && (
            <Card title="Also coming up" action={<Link href="/portal/sessions" className="ui-link">All sessions →</Link>}>
              <SessionList sessions={later} tz={tz} hrefFor={(s) => `/portal/sessions/${s.id}`} empty={null} />
            </Card>
          )}

          <Card
            title="Latest notes from your tutor"
            description="After each lesson your tutor writes what was covered, how it went and any homework."
            action={notes.length > 0 ? <Link href="/portal/notes" className="ui-link">All notes →</Link> : undefined}
          >
            {notes.length === 0 ? (
              <EmptyState icon="📝" title="No notes yet">Notes appear here after your first lesson.</EmptyState>
            ) : (
              <div className="ui-notes">{notes.map((n) => <NoteCard key={n.id} note={n} tz={tz} />)}</div>
            )}
          </Card>
        </div>

        <aside className="pt-side">
          <Card tone="brand" title="Your consultant">
            {consultant ? (
              <div className="ui-person">
                <Avatar name={consultant.name} size="lg" />
                <div>
                  <p className="ui-person-name">{consultant.name}</p>
                  <p className="ui-person-role">Education consultant</p>
                </div>
              </div>
            ) : (
              <p>We&apos;ll introduce your consultant shortly.</p>
            )}
            <p className="ui-small-on-dark">Questions about lessons, timings or progress? Your consultant usually replies within a working day.</p>
            <div className="pt-actions">
              <a href={`mailto:${contactEmail}`} className="btn-primary">Email {consultant ? consultant.name.split(" ")[0] : "us"}</a>
              <Link href="/portal/request" className="btn-secondary">Request a lesson</Link>
            </div>
          </Card>

          <Card title={children.length === 1 ? "Your child" : "Your children"}>
            {children.length === 0 ? (
              <p className="ui-muted">Add your children so lessons and notes are linked to them. <Link href="/portal/family">Add them now</Link>.</p>
            ) : (
              <ul className="ui-people">
                {children.map((c) => (
                  <li key={c.id}>
                    <Avatar name={c.name} size="sm" />
                    <span><strong>{c.name}</strong>{c.year_group && <span>{c.year_group}</span>}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <HelpBox title="New here? How the portal works">
            <ol>
              <li><strong>Your consultant books lessons.</strong> They appear on this page and under Sessions.</li>
              <li><strong>Join from here.</strong> A Join button appears 15 minutes before each online lesson.</li>
              <li><strong>Read the notes.</strong> After each lesson your tutor adds notes and any homework.</li>
            </ol>
            <p><Link href="/portal/help">More help →</Link></p>
          </HelpBox>
        </aside>
      </div>
    </>
  );
}
