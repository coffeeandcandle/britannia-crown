import { devSignIn } from "./actions";

// Local development only: sign in as any email without Clerk (see PORTAL_DEV_AUTH in config).
export default function DevSignIn({ next }: { next: string }) {
  return (
    <form action={devSignIn} className="enq-card enq-form">
      <input type="hidden" name="next" value={next} />
      <p className="pt-small">Development sign-in (local only).</p>
      <div className="form-group">
        <label htmlFor="dev-email">Email</label>
        <input id="dev-email" name="email" type="email" required />
      </div>
      <button type="submit" className="form-submit">Sign in</button>
    </form>
  );
}
