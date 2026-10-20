import Link from "next/link";
import { SIGN_IN_PATH, SIGN_UP_PATH, STAFF_SIGN_IN_PATH, STAFF_SIGN_UP_PATH } from "../lib/portal/config";

// Two large, clearly different options: parents and families on one side, the team on the other.
export default function AudienceChoice({ mode }: { mode: "in" | "up" }) {
  const signIn = mode === "in";
  return (
    <div className="ch-grid">
      <Link href={signIn ? SIGN_IN_PATH : SIGN_UP_PATH} className="ch-card ch-family">
        <span className="ch-tag">For parents and families</span>
        <strong>{signIn ? "Log in to my family account" : "Create my family account"}</strong>
        <span>{signIn ? "See lessons, tutor notes, homework and receipts, and buy more tutoring and services." : "Free. Buy tutoring and services, and keep lessons, notes and receipts in one place."}</span>
        <span className="ch-go">{signIn ? "Parent log in →" : "Create family account →"}</span>
      </Link>
      <Link href={signIn ? STAFF_SIGN_IN_PATH : STAFF_SIGN_UP_PATH} className="ch-card ch-team">
        <span className="ch-tag">For tutors, consultants and admins</span>
        <strong>{signIn ? "Log in to the team area" : "Join the Britannia Crown team"}</strong>
        <span>{signIn ? "Your timetable, session notes, families and the back office, depending on your role." : "For tutors and consultants. After you sign up, an admin confirms your role before your area opens."}</span>
        <span className="ch-go">{signIn ? "Team log in →" : "Team sign up →"}</span>
      </Link>
    </div>
  );
}

// A switch shown above the sign-in and sign-up forms so people can see which of the two they are on.
export function AudienceSwitch({ audience, mode }: { audience: "family" | "team"; mode: "in" | "up" }) {
  const family = mode === "in" ? SIGN_IN_PATH : SIGN_UP_PATH;
  const team = mode === "in" ? STAFF_SIGN_IN_PATH : STAFF_SIGN_UP_PATH;
  return (
    <div className="ch-switch" role="tablist" aria-label="Account type">
      <Link href={family} role="tab" aria-selected={audience === "family"} className={audience === "family" ? "is-on" : ""}>Parent or family</Link>
      <Link href={team} role="tab" aria-selected={audience === "team"} className={audience === "team" ? "is-on" : ""}>Tutor, consultant or admin</Link>
    </div>
  );
}
