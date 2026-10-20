import Link from "next/link";
import { adminOverview } from "../../lib/portal/dal";
import { formatDate } from "../../lib/portal/time";
import { Card, EmptyState, StatGrid, Stat, Pill } from "../ui";

const gbp = (pence: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(pence / 100);
const stageOrder = ["new", "contacted", "consultation", "client", "closed"] as const;
const stageLabel: Record<string, string> = { new: "New", contacted: "Contacted", consultation: "Consultation", client: "Client", closed: "Closed" };
const roleLabel: Record<string, string> = { admin: "Admins", consultant: "Consultants", tutor: "Tutors" };

// The company-wide picture for admins: money, leads, clients, delivery and the team, all from our own records.
export default async function AdminOverview() {
  const o = await adminOverview();
  const stage = Object.fromEntries(o.funnel.map((f) => [f.stage, f.n]));
  const maxMonth = Math.max(1, ...o.months.map((m) => m.pence));
  const maxFunnel = Math.max(1, ...stageOrder.map((s) => stage[s] ?? 0));
  const conversion = o.contacts > 0 ? Math.round((o.clients / o.contacts) * 100) : 0;
  const trend = o.money.last_month > 0 ? Math.round(((o.money.month - o.money.last_month) / o.money.last_month) * 100) : null;
  const attention: { text: string; href: string }[] = [
    ...(o.attention.requests > 0 ? [{ text: `${o.attention.requests} lesson ${o.attention.requests === 1 ? "request is" : "requests are"} waiting for approval`, href: "/portal/admin/requests" }] : []),
    ...(o.delivery.needs_note > 0 ? [{ text: `${o.delivery.needs_note} finished ${o.delivery.needs_note === 1 ? "lesson has" : "lessons have"} no tutor note`, href: "/portal/admin/sessions?view=past" }] : []),
    ...(o.delivery.unassigned > 0 ? [{ text: `${o.delivery.unassigned} upcoming ${o.delivery.unassigned === 1 ? "lesson has" : "lessons have"} no tutor assigned`, href: "/portal/admin/sessions" }] : []),
    ...(o.attention.stale_leads > 0 ? [{ text: `${o.attention.stale_leads} ${o.attention.stale_leads === 1 ? "lead has" : "leads have"} waited over 3 days`, href: "/portal/admin/contacts" }] : []),
    ...(o.attention.no_consultant > 0 ? [{ text: `${o.attention.no_consultant} ${o.attention.no_consultant === 1 ? "family has" : "families have"} no consultant`, href: "/portal/admin/families" }] : []),
    ...(o.money.failed30 > 0 ? [{ text: `${o.money.failed30} failed ${o.money.failed30 === 1 ? "payment" : "payments"} in the last 30 days`, href: "/portal/admin/orders" }] : []),
  ];

  return (
    <>
      <StatGrid>
        <Stat label="Revenue this month" value={gbp(o.money.month)} hint={trend == null ? "No earlier month to compare" : `${trend >= 0 ? "+" : ""}${trend}% vs last month`} href="/portal/admin/orders" />
        <Stat label="Monthly recurring" value={gbp(o.money.mrr)} hint="From paid subscriptions" href="/portal/admin/orders" />
        <Stat label="New leads, 30 days" value={o.leads30} href="/portal/admin/contacts" />
        <Stat label="Lead to client" value={`${conversion}%`} hint={`${o.clients} of ${o.contacts} contacts`} href="/portal/admin/contacts?stage=client" />
        <Stat label="Active clients" value={o.families} hint={`${o.families30} new in 30 days`} href="/portal/admin/families" />
        <Stat label="Lessons, last 30 days" value={o.delivery.done30} hint={`${o.delivery.next7} in the next 7 days`} href="/portal/admin/sessions" />
      </StatGrid>

      <div className="pt-grid">
        <div className="pt-main">
          <Card title="Needs attention" description="Things to look at today.">
            {attention.length === 0 ? (
              <EmptyState icon="🎉" title="Nothing needs attention">Notes, tutors, leads and payments are all up to date.</EmptyState>
            ) : (
              <ul className="ov-list">
                {attention.map((a) => (
                  <li key={a.text}><Link href={a.href}>{a.text} →</Link></li>
                ))}
              </ul>
            )}
          </Card>

          <Card title="Revenue by month" description={`${gbp(o.money.d30)} in the last 30 days from ${o.money.orders30} paid ${o.money.orders30 === 1 ? "order" : "orders"}. ${gbp(o.money.all_time)} in total.`}>
            <div className="ov-bars" role="img" aria-label="Revenue for the last six months">
              {o.months.map((m) => (
                <div key={m.label} className="ov-bar">
                  <span className="ov-bar-value">{m.pence > 0 ? gbp(m.pence) : ""}</span>
                  <span className="ov-bar-fill" style={{ height: `${Math.max(3, (m.pence / maxMonth) * 100)}%` }} />
                  <span className="ov-bar-label">{m.label}</span>
                </div>
              ))}
            </div>
            <p className="ui-card-desc">Money shown is what Stripe recorded as paid. Refunds and fees are not subtracted, so use Stripe for exact accounts.</p>
          </Card>

          <Card title="Leads to clients" description="Every contact by stage. They move along as your team contacts them and they buy.">
            <ul className="ov-funnel">
              {stageOrder.map((s) => (
                <li key={s}>
                  <span className="ov-funnel-label">{stageLabel[s]}</span>
                  <span className="ov-funnel-track"><span style={{ width: `${((stage[s] ?? 0) / maxFunnel) * 100}%` }} /></span>
                  <strong>{stage[s] ?? 0}</strong>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Where leads come from" description="New contacts in the last 90 days, by source.">
            {o.sources.length === 0 ? (
              <EmptyState icon="📈" title="No leads yet">Sources appear here as enquiries come in.</EmptyState>
            ) : (
              <ul className="ov-funnel">
                {o.sources.map((s) => (
                  <li key={s.source}>
                    <span className="ov-funnel-label">{s.source}</span>
                    <span className="ov-funnel-track"><span style={{ width: `${(s.n / o.sources[0].n) * 100}%` }} /></span>
                    <strong>{s.n}</strong>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <aside className="pt-side">
          <Card title="Latest activity" action={<Link href="/portal/admin/contacts" className="ui-link">All contacts →</Link>}>
            {o.activity.length === 0 ? (
              <EmptyState icon="🕒" title="No activity yet">Enquiries, bookings and orders appear here.</EmptyState>
            ) : (
              <ul className="ov-feed">
                {o.activity.map((a) => (
                  <li key={a.id}>
                    <Pill tone="muted">{a.type}</Pill>
                    <span>
                      <Link href={`/portal/admin/contacts/${a.contact_id}`}><strong>{a.contact_name}</strong></Link> {a.summary}
                      <span className="ov-when">{formatDate(new Date(a.created_at), "Europe/London")}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card title="Team" action={<Link href="/portal/admin/staff" className="ui-link">Manage →</Link>}>
            <p className="ui-card-desc">{o.team.map((t) => `${t.n} ${roleLabel[t.role] ?? t.role}`).join(" · ") || "No team members yet"}</p>
            {o.workload.length > 0 && (
              <table className="ov-table">
                <thead><tr><th>Name</th><th>Last 30 days</th><th>Next 7 days</th></tr></thead>
                <tbody>
                  {o.workload.map((w) => (
                    <tr key={w.name}><td>{w.name}</td><td>{w.done30}</td><td>{w.next7}</td></tr>
                  ))}
                </tbody>
              </table>
            )}
            <p className="ui-card-desc">{o.children} {o.children === 1 ? "child" : "children"} across {o.families} {o.families === 1 ? "family" : "families"}.</p>
          </Card>
        </aside>
      </div>
    </>
  );
}
