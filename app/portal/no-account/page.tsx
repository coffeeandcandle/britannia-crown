import Link from "next/link";
import { requireViewer } from "../../lib/portal/dal";
import { STAFF_SIGN_IN_PATH } from "../../lib/portal/config";
import { EMAIL } from "../../lib/site";
import AuthFrame from "../AuthFrame";

export default async function NoAccountPage() {
  const viewer = await requireViewer();

  return (
    <AuthFrame
      area="Client portal"
      title="We couldn't find your family's account"
      lead={<>You&apos;re signed in as <strong>{viewer.email}</strong>, but that address isn&apos;t linked to a family yet. Portal access is set up by your consultant once you&apos;ve started with us.</>}
      switchLink={{ href: STAFF_SIGN_IN_PATH, label: "Tutor or consultant? Use the tutor sign-in →" }}
    >
      <div className="enq-card uk-prose">
        <p>If you&apos;re already a client, email us and we&apos;ll add this email address to your account.</p>
        <a href={`mailto:${EMAIL}`} className="btn-primary">Email {EMAIL}</a>
        <Link href="/book-consultation" className="btn-secondary">New here? Book a free call</Link>
      </div>
    </AuthFrame>
  );
}
