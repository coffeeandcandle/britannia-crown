import { SignIn } from "@clerk/nextjs";
import { clerkConfigured, devAuth, SIGN_UP_PATH, STAFF_SIGN_IN_PATH } from "../../../lib/portal/config";
import AuthFrame from "../../AuthFrame";
import DevSignIn from "../DevSignIn";

export default function FamilySignInPage() {
  return (
    <AuthFrame
      area="Family portal"
      title="Sign in to your family portal"
      lead="Use the email address you gave your consultant. The first time, choose “Sign up” with that address and your account links automatically."
      points={["Upcoming lessons and joining links", "Notes and homework from every session", "Your membership and invoices"]}
      switchLink={{ href: STAFF_SIGN_IN_PATH, label: "Staff or tutor? Sign in here →" }}
    >
      {clerkConfigured ? (
        <SignIn path="/portal/sign-in" routing="path" signUpUrl={SIGN_UP_PATH} fallbackRedirectUrl="/portal" />
      ) : devAuth ? (
        <DevSignIn next="/portal" />
      ) : null}
    </AuthFrame>
  );
}
