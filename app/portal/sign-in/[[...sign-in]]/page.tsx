import { SignIn } from "@clerk/nextjs";
import { clerkConfigured, devAuth } from "../../../lib/portal/config";
import { devSignIn } from "./actions";

export default function PortalSignInPage() {
  return (
    <section className="uk-section cream">
      <div className="uk-wrap pt-signin">
        <div>
          <span className="uk-kicker">Client portal</span>
          <h1 className="uk-h2">Sign in to your family portal</h1>
          <p className="uk-lead">
            Use the email address you gave your consultant. The first time, choose &ldquo;Sign up&rdquo; with that address
            and we&apos;ll link your account automatically.
          </p>
        </div>
        {clerkConfigured ? (
          <SignIn path="/portal/sign-in" routing="path" fallbackRedirectUrl="/portal" />
        ) : devAuth ? (
          <form action={devSignIn} className="enq-card enq-form">
            <p className="pt-small">Development sign-in (local only).</p>
            <div className="form-group">
              <label htmlFor="dev-email">Email</label>
              <input id="dev-email" name="email" type="email" required />
            </div>
            <button type="submit" className="form-submit">Sign in</button>
          </form>
        ) : null}
      </div>
    </section>
  );
}
