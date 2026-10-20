// The portal switches on when Clerk and the database are configured (Vercel environment
// variables). Until then /portal shows a holding page and the rest of the site is unaffected.
export const clerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);

// Local development only: sign in as any email without Clerk, by setting PORTAL_DEV_AUTH=1 and
// a `portal_dev_email` cookie. Never active in production builds.
export const devAuth = process.env.NODE_ENV === "development" && process.env.PORTAL_DEV_AUTH === "1";

export const portalEnabled = Boolean(process.env.DATABASE_URL) && (clerkConfigured || devAuth);

export const SIGN_IN_PATH = "/portal/sign-in";
export const STAFF_SIGN_IN_PATH = "/portal/staff/sign-in";
