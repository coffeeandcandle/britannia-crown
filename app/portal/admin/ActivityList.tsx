import Link from "next/link";
import { ACTIONS, type LogRow } from "../../lib/portal/audit";
import { EmptyState, Pill } from "../ui";

const stamp = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Europe/London" }).format(new Date(d));

// A plain, readable record: when, who, what, and where from. Used on the Activity page, family pages and lesson pages.
export default function ActivityList({ rows, showFamily = true, empty = "Nothing recorded yet." }: { rows: LogRow[]; showFamily?: boolean; empty?: string }) {
  if (rows.length === 0) return <EmptyState title={empty} />;
  return (
    <div className="al-wrap">
      <table className="al-table">
        <thead>
          <tr><th>When (UK)</th><th>Who</th><th>What</th>{showFamily && <th>Family</th>}<th className="al-hide">From</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="al-when">{stamp(r.at)}</td>
              <td>
                {r.actor_name} <Pill tone={r.actor_kind === "staff" ? "brand" : "muted"}>{r.actor_kind === "staff" ? (r.actor_role ?? "Team") : "Client"}</Pill>
              </td>
              <td>
                {ACTIONS[r.action] ?? r.action}
                {r.detail && <span className="al-detail"> · {r.detail}</span>}
                {r.session_id && <> · <Link href={`/portal/admin/sessions/${r.session_id}`}>Lesson</Link></>}
              </td>
              {showFamily && <td>{r.family_id ? <Link href={`/portal/admin/families/${r.family_id}`}>{r.family_name ?? "Family"}</Link> : ""}</td>}
              <td className="al-hide al-ip">{r.ip ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
