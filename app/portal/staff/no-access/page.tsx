import Link from "next/link";
import { redirect } from "next/navigation";
import { requireViewer, recordApplicant, removeEmptyClientRecord } from "../../../lib/portal/dal";
import { STAFF_SIGN_IN_PATH, SIGN_IN_PATH } from "../../../lib/portal/config";
import { alertTeam } from "../../../lib/email";
import AuthFrame from "../../AuthFrame";

// Shown to someone who has signed up as a tutor or consultant but has not been given a role yet.
// Their sign-up is recorded as a team application for an admin to approve; it never becomes a client account.
export default async function StaffNoAccessPage() {
  const viewer = await requireViewer(STAFF_SIGN_IN_PATH);
  if (viewer.staff) redirect("/portal/admin");

  // Anyone reaching this page is applying to join the team. An empty client account made for them by
  // mistake is removed. The only exception is a real client (with purchases, children or lessons) who
  // came to the team login by accident: they are pointed back to the client login instead.
  if (viewer.family && !(await removeEmptyClientRecord(viewer.family.id, viewer.email))) {
    return (
      <AuthFrame area="Tutors and consultants" title="This is a client account" lead={<>You&apos;re signed in as <strong>{viewer.email}</strong>.</>}>
        <div className="enq-card uk-prose">
          <p>This email belongs to a family account, so it can&apos;t be used for the team area. Please use the <Link href={SIGN_IN_PATH}>parent and family login</Link>.</p>
          <p>If you&apos;re joining the team as a tutor or consultant, sign out and sign up with your work email address instead.</p>
        </div>
      </AuthFrame>
    );
  }
  const application = await recordApplicant(viewer);
  if (application?.created) {
    await alertTeam("New tutor or consultant sign-up", { Name: application.name, Email: application.email, Next: "Approve or decline under Team > Applications in the admin area" });
  }

  if (application?.status === "declined") {
    return (
      <AuthFrame area="Tutors and consultants" title="Your team application wasn't approved" lead={<>Signed in as <strong>{viewer.email}</strong>.</>}>
        <div className="enq-card uk-prose">
          <p>An admin has not given this account access to the team area. If you think this is a mistake, please email us and we&apos;ll look into it.</p>
        </div>
      </AuthFrame>
    );
  }

  return (
    <AuthFrame
      area="Tutors and consultants"
      title="Almost there: waiting for your role"
      lead={<>You&apos;re signed in as <strong>{viewer.email}</strong>. Your account is created, and an admin now chooses your role (tutor or consultant).</>}
    >
      <div className="enq-card uk-prose">
        <p>Your sign-up has been sent to the Britannia Crown admin team to approve. Once it&apos;s approved, log in again (or refresh this page) and your own area opens, with the menu for your role: your sessions, notes, availability and timetable.</p>
        <p>Roles are given by an admin so that only approved people can see families&apos; details. If you signed in with a different email by mistake, sign out from your account menu and try again.</p>
      </div>
    </AuthFrame>
  );
}
