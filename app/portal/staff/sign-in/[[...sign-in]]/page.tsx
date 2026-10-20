import { SignIn } from "@clerk/nextjs";
import { clerkConfigured, devAuth, STAFF_SIGN_IN_PATH, STAFF_SIGN_UP_PATH } from "../../../../lib/portal/config";
import AuthFrame from "../../../AuthFrame";
import DevSignIn from "../../../sign-in/DevSignIn";

export default function StaffSignInPage() {
  return (
    <AuthFrame
      area="Tutors and consultants"
      title="Tutor and consultant sign in"
      lead="For Britannia Crown tutors, consultants and administrators. Sign in with the work email address an admin added to the team."
      points={["Your sessions and teaching timetable", "Write session notes and set homework", "Manage families and the team (consultants and admins)"]}
      audience={{ who: "team", mode: "in" }}
    >
      {clerkConfigured ? (
        <SignIn path={STAFF_SIGN_IN_PATH} routing="path" signUpUrl={STAFF_SIGN_UP_PATH} fallbackRedirectUrl="/portal/admin" signUpFallbackRedirectUrl="/portal/admin" />
      ) : devAuth ? (
        <DevSignIn next="/portal/admin" />
      ) : null}
    </AuthFrame>
  );
}
