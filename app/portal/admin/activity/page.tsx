import { requireStaff } from "../../../lib/portal/dal";
import { recentActivity } from "../../../lib/portal/audit";
import { PageHeader, Card } from "../../ui";
import ActivityList from "../ActivityList";

const filters = [
  { id: "", label: "Everything" },
  { id: "sign_in", label: "Sign-ins" },
  { id: "document", label: "Documents" },
  { id: "room", label: "Online lessons" },
  { id: "session", label: "Bookings" },
  { id: "lesson", label: "Lesson requests" },
];

export default async function ActivityPage({ searchParams }: { searchParams: Promise<{ kind?: string; family?: string }> }) {
  await requireStaff(["admin"]);
  const sp = await searchParams;
  const kind = filters.some((f) => f.id === sp.kind) ? sp.kind || undefined : undefined;
  const familyId = Number(sp.family);
  const rows = await recentActivity({ kind, familyId: Number.isInteger(familyId) && familyId > 0 ? familyId : undefined, limit: 300 });
  return (
    <>
      <PageHeader title="Activity log" description="Who signed in, which documents were opened or signed, who booked what, and who joined and left each online lesson. The latest 300 entries, newest first. Times are UK time." />
      <nav className="al-filters" aria-label="Filter the log">
        {filters.map((f) => (
          <a key={f.id} href={`/portal/admin/activity${f.id ? `?kind=${f.id}` : ""}`} className={(kind ?? "") === f.id ? "is-on" : ""}>{f.label}</a>
        ))}
      </nav>
      <Card>
        <ActivityList rows={rows} />
      </Card>
    </>
  );
}
