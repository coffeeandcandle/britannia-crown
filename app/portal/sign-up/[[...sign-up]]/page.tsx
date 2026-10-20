import { SignUp } from "@clerk/nextjs";
import { clerkConfigured, SIGN_IN_PATH, SIGN_UP_PATH } from "../../../lib/portal/config";
import AuthFrame from "../../AuthFrame";

export default function FamilySignUpPage() {
  return (
    <AuthFrame
      area="Client portal"
      title="Create your free account"
      lead="Sign up with the same email address you used when you paid or spoke to your consultant, and your purchases and lessons appear automatically."
      points={["Your services and receipts in one place", "Upcoming lessons and joining links", "Notes and homework from every session"]}
      audience={{ who: "family", mode: "up" }}
    >
      {clerkConfigured ? (
        <SignUp path={SIGN_UP_PATH} routing="path" signInUrl={SIGN_IN_PATH} fallbackRedirectUrl="/portal" />
      ) : null}
    </AuthFrame>
  );
}
