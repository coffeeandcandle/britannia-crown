import Link from "next/link";
import { requireStaff, listFamilies, listStaff } from "../../../lib/portal/dal";
import { TIMEZONES, formatSessionTime } from "../../../lib/portal/time";
import { Flash } from "../../components";
import { saveFamily } from "../actions";

export default async function FamiliesPage({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string; q?: string }> }) {
  await requireStaff(["admin", "consultant"]);
  const { q, ...msg } = await searchParams;
  const [families, team] = await Promise.all([listFamilies(), listStaff()]);
  const term = (q ?? "").trim().toLowerCase();
  const shown = term ? families.filter((f) => `${f.name} ${f.email}`.toLowerCase().includes(term)) : families;
  const consultants = team.filter((s) => s.active && s.role !== "tutor");

  return (
    <>
      <h1 className="pt-title">Families</h1>
      <Flash {...msg} />
      <div className="pt-grid">
        <section className="pt-card pt-main">
          <form className="pt-search" role="search">
            <label htmlFor="family-q" className="sr-only">Search families</label>
            <input id="family-q" name="q" type="search" defaultValue={q} placeholder="Search by name or email" />
            <button type="submit" className="btn-secondary">Search</button>
          </form>
          {shown.length === 0 ? (
            <div className="pt-empty">{term ? "No families match that search." : "No families yet. Add the first one."}</div>
          ) : (
            <table className="pt-table">
              <thead>
                <tr><th scope="col">Family</th><th scope="col">Consultant</th><th scope="col">Children</th><th scope="col">Next session</th><th scope="col">Portal</th></tr>
              </thead>
              <tbody>
                {shown.map((f) => (
                  <tr key={f.id}>
                    <td><Link href={`/portal/admin/families/${f.id}`}><strong>{f.name}</strong></Link><br /><span className="pt-small">{f.email}</span></td>
                    <td>{f.consultant_name ?? "–"}</td>
                    <td>{f.child_count}</td>
                    <td>{f.next_session ? formatSessionTime(new Date(f.next_session), "Europe/London") : "–"}</td>
                    <td>{f.clerk_user_id ? <span className="pt-status is-completed">Signed in</span> : <span className="pt-status">Invited</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <aside className="pt-side">
          <section className="pt-card">
            <h2>Add a family</h2>
            <form action={saveFamily} className="pt-form">
              <div className="form-group"><label htmlFor="nf-name">Family name</label><input id="nf-name" name="name" required placeholder="e.g. The Patel family" /></div>
              <div className="form-group"><label htmlFor="nf-email">Parent&apos;s email</label><input id="nf-email" name="email" type="email" required /></div>
              <div className="form-group"><label htmlFor="nf-phone">Phone</label><input id="nf-phone" name="phone" type="tel" /></div>
              <div className="form-group">
                <label htmlFor="nf-tz">Time zone</label>
                <select id="nf-tz" name="timezone" defaultValue="Europe/London">
                  {TIMEZONES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="nf-consultant">Consultant</label>
                <select id="nf-consultant" name="consultant_id" defaultValue="">
                  <option value="">Not assigned</option>
                  {consultants.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <button type="submit" className="form-submit">Add family</button>
              <p className="pt-small">The parent signs in at /portal with this email address. Their account links automatically.</p>
            </form>
          </section>
        </aside>
      </div>
    </>
  );
}
