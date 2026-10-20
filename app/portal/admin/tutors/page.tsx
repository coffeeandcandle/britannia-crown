import { requireStaff } from "../../../lib/portal/dal";
import TeamList from "../TeamList";

export default async function TutorsPage() {
  await requireStaff(["admin"]);
  return <TeamList role="tutor" title="Tutors" blurb="Open a tutor to give them lessons, and to see and change their calendar." />;
}
