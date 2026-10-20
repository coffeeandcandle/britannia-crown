import { SignIn } from "@clerk/nextjs";
import { clerkConfigured, devAuth, SIGN_UP_PATH, STAFF_SIGN_IN_PATH } from "../../../lib/portal/config";
import AuthFrame from "../../AuthFrame";
import DevSignIn from "../DevSignIn";

export default function FamilySignInPage() {
  return (
    <AuthFrame
      area="Client portal"
      title="Log in to your account"
      lead="Log in with your email address, or choose “Sign up” if you are new. Anything you have bought or booked with that email appears automatically."
      points={["Upcoming lessons and joining links", "Notes and homework from every session", "Your membership and invoices"]}
      switchLink={{ href: STAFF_SIGN_IN_PATH, label: "Tutor or consultant? Sign in here →" }}
    >
      {clerkConfigured ? (
        <SignIn path="/portal/sign-in" routing="path" signUpUrl={SIGN_UP_PATH} fallbackRedirectUrl="/portal" />
      ) : devAuth ? (
        <DevSignIn next="/portal" />
      ) : null}
    </AuthFrame>
  );
}
