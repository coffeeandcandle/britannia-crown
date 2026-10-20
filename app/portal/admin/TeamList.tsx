import Link from "next/link";
import { listTeamCards, type Role } from "../../lib/portal/dal";
import { PageHeader, Card, EmptyState, Avatar, Pill } from "../ui";

// A directory of one kind of team member. Click a person to open their profile, calendar and assignments.
export default async function TeamList({ role, title, blurb }: { role: Role; title: string; blurb: string }) {
  const people = await listTeamCards([role]);
  const consultant = role !== "tutor";
  return (
    <>
      <PageHeader
        title={title}
        description={blurb}
        actions={<Link href="/portal/admin/staff#add-staff" className="btn-primary">+ Add a team member</Link>}
      />
      <Card>
        {people.length === 0 ? (
          <EmptyState title={`No ${title.toLowerCase()} yet`} action={<Link href="/portal/admin/staff#add-staff" className="btn-secondary">Add one</Link>}>
            Add them under Team and access, then they appear here.
          </EmptyState>
        ) : (
          <ul className="ui-rows">
            {people.map((p) => (
              <li key={p.id} className={p.active ? undefined : "is-inactive"}>
                <Link href={`/portal/admin/team/${p.id}`} className="ui-row-link">
                  <Avatar name={p.name} />
                  <span className="ui-row-main">
                    <strong>{p.name}</strong>
                    <span>{p.email}</span>
                  </span>
                  {consultant && (
                    <span className="ui-row-cell">
                      <span className="ui-row-label">Families</span>
                      {p.families}
                    </span>
                  )}
                  <span className="ui-row-cell">
                    <span className="ui-row-label">Next 7 days</span>
                    {p.next7} lessons
                  </span>
                  <span className="ui-row-cell ui-hide-sm">
                    <span className="ui-row-label">Last 30 days</span>
                    {p.done30} lessons
                  </span>
                  {!p.active && <Pill tone="muted">Access off</Pill>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
