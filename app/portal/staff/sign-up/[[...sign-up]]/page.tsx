import { SignUp } from "@clerk/nextjs";
import { clerkConfigured, STAFF_SIGN_IN_PATH, STAFF_SIGN_UP_PATH } from "../../../../lib/portal/config";
import AuthFrame from "../../../AuthFrame";

export default function StaffSignUpPage() {
  return (
    <AuthFrame
      area="Tutors and consultants"
      title="Create your tutor or consultant account"
      lead="Sign up with the work email address an admin added to the team, and you will go straight to your own area."
      points={["Your sessions and teaching timetable", "Write session notes and set homework", "Manage families and the team (consultants and admins)"]}
      audience={{ who: "team", mode: "up" }}
    >
      {clerkConfigured ? (
        <SignUp path={STAFF_SIGN_UP_PATH} routing="path" signInUrl={STAFF_SIGN_IN_PATH} fallbackRedirectUrl="/portal/admin" />
      ) : null}
    </AuthFrame>
  );
}
