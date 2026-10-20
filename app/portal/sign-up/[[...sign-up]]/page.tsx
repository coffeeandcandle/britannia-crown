import { SignUp } from "@clerk/nextjs";
import { clerkConfigured, SIGN_IN_PATH, SIGN_UP_PATH, STAFF_SIGN_IN_PATH } from "../../../lib/portal/config";
import AuthFrame from "../../AuthFrame";

export default function FamilySignUpPage() {
  return (
    <AuthFrame
      area="Family portal"
      title="Create your family portal account"
      lead="Sign up with the same email address you used when you paid or spoke to your consultant, and your purchases and lessons appear automatically."
      points={["Your services and receipts in one place", "Upcoming lessons and joining links", "Notes and homework from every session"]}
      switchLink={{ href: STAFF_SIGN_IN_PATH, label: "Staff or tutor? Sign in here →" }}
    >
      {clerkConfigured ? (
        <SignUp path={SIGN_UP_PATH} routing="path" signInUrl={SIGN_IN_PATH} fallbackRedirectUrl="/portal" />
      ) : null}
    </AuthFrame>
  );
}
