import { SignIn } from "@clerk/nextjs";
import { clerkConfigured, devAuth, SIGN_IN_PATH, STAFF_SIGN_IN_PATH, STAFF_SIGN_UP_PATH } from "../../../../lib/portal/config";
import AuthFrame from "../../../AuthFrame";
import DevSignIn from "../../../sign-in/DevSignIn";

export default function StaffSignInPage() {
  return (
    <AuthFrame
      area="Staff area"
      title="Staff and tutor sign in"
      lead="For Britannia Crown consultants, tutors and administrators. Sign in with the work email address an admin added to the team."
      points={["Your sessions and teaching timetable", "Write session notes and set homework", "Manage families and the team (consultants and admins)"]}
      switchLink={{ href: SIGN_IN_PATH, label: "Are you a parent? Go to the family portal →" }}
    >
      {clerkConfigured ? (
        <SignIn path={STAFF_SIGN_IN_PATH} routing="path" signUpUrl={STAFF_SIGN_UP_PATH} fallbackRedirectUrl="/portal/admin" signUpFallbackRedirectUrl="/portal/admin" />
      ) : devAuth ? (
        <DevSignIn next="/portal/admin" />
      ) : null}
    </AuthFrame>
  );
}
