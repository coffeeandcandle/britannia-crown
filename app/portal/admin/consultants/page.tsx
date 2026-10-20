import { requireStaff } from "../../../lib/portal/dal";
import TeamList from "../TeamList";

export default async function ConsultantsPage() {
  await requireStaff(["admin"]);
  return <TeamList role="consultant" title="Consultants" blurb="Open a consultant to assign them families and lessons, and to see and change their calendar." />;
}
