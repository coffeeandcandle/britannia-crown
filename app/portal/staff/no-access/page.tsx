import Link from "next/link";
import { requireViewer } from "../../../lib/portal/dal";
import { STAFF_SIGN_IN_PATH } from "../../../lib/portal/config";
import AuthFrame from "../../AuthFrame";

// Shown to someone who has signed up as a tutor or consultant but has not been given a role yet.
export default async function StaffNoAccessPage() {
  const viewer = await requireViewer(STAFF_SIGN_IN_PATH);

  return (
    <AuthFrame
      area="Tutors and consultants"
      title="Almost there: waiting for your role"
      lead={<>You&apos;re signed in as <strong>{viewer.email}</strong>. Your account is created, and an admin now chooses your role (tutor or consultant).</>}
    >
      <div className="enq-card uk-prose">
        <p>As soon as an admin adds this email address under <strong>Team and access</strong>, refresh this page and you will go straight to your own area, with your sessions, notes and timetable.</p>
        <p>Roles are given by an admin so that only approved people can see families&apos; details. If you signed in with a different email by mistake, sign out from your account menu and try again.</p>
        {viewer.family && <Link href="/portal" className="btn-primary">Go to your client portal</Link>}
      </div>
    </AuthFrame>
  );
}
