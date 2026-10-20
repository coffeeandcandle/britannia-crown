import { requireStaff, listStaff } from "../../../lib/portal/dal";
import { Flash } from "../../components";
import { saveStaff } from "../actions";

const roleHelp = {
  admin: "Everything, including the team",
  consultant: "Families, sessions and notes",
  tutor: "Their own sessions and notes",
};

export default async function TeamPage({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  await requireStaff(["admin"]);
  const [team, msg] = await Promise.all([listStaff(), searchParams]);

  return (
    <>
      <h1 className="pt-title">Team</h1>
      <Flash {...msg} />
      <div className="pt-grid">
        <section className="pt-card pt-main">
          <table className="pt-table">
            <thead>
              <tr><th scope="col">Name</th><th scope="col">Role</th><th scope="col">Active</th><th scope="col"><span className="sr-only">Save</span></th></tr>
            </thead>
            <tbody>
              {team.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.name}</strong><br /><span className="pt-small">{s.email}</span></td>
                  <td colSpan={3}>
                    <form action={saveStaff} className="pt-inline-form">
                      <input type="hidden" name="id" value={s.id} />
                      <label className="sr-only" htmlFor={`role-${s.id}`}>Role for {s.name}</label>
                      <select id={`role-${s.id}`} name="role" defaultValue={s.role}>
                        <option value="admin">Admin</option>
                        <option value="consultant">Consultant</option>
                        <option value="tutor">Tutor</option>
                      </select>
                      <label className="pt-check"><input type="checkbox" name="active" defaultChecked={s.active} /> Active</label>
                      <button type="submit" className="btn-secondary">Save</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <aside className="pt-side">
          <section className="pt-card">
            <h2>Add a team member</h2>
            <form action={saveStaff} className="pt-form">
              <div className="form-group"><label htmlFor="st-name">Name</label><input id="st-name" name="name" required /></div>
              <div className="form-group"><label htmlFor="st-email">Email</label><input id="st-email" name="email" type="email" required /></div>
              <div className="form-group">
                <label htmlFor="st-role">Role</label>
                <select id="st-role" name="role" defaultValue="tutor">
                  {(Object.keys(roleHelp) as (keyof typeof roleHelp)[]).map((r) => (
                    <option key={r} value={r}>{r[0].toUpperCase() + r.slice(1)}: {roleHelp[r]}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="form-submit">Add to team</button>
              <p className="pt-small">They sign in at /portal with this email address.</p>
            </form>
          </section>
        </aside>
      </div>
    </>
  );
}
