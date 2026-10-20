import Link from "next/link";
import { requireViewer } from "../../../lib/portal/dal";
import { STAFF_SIGN_IN_PATH } from "../../../lib/portal/config";
import AuthFrame from "../../AuthFrame";

export default async function StaffNoAccessPage() {
  const viewer = await requireViewer(STAFF_SIGN_IN_PATH);

  return (
    <AuthFrame
      area="Staff area"
      title="This account isn't on the team yet"
      lead={<>You&apos;re signed in as <strong>{viewer.email}</strong>, which hasn&apos;t been given staff access.</>}
    >
      <div className="enq-card uk-prose">
        <p>Ask a Britannia Crown admin to add this email address under <strong>Team and access</strong>. Then refresh this page.</p>
        <p>If you signed in with a different address by mistake, sign out using your account menu and try again.</p>
        {viewer.family && (
          <Link href="/portal" className="btn-primary">Go to your client portal</Link>
        )}
      </div>
    </AuthFrame>
  );
}
