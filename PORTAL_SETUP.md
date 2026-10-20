# Client portal: setup

The portal lives at `/portal`. Families see upcoming sessions (with a "Join now" button 15 minutes before each one), their tutor's notes and their billing. Staff manage families, sessions, notes and the team at `/portal/admin`.

Until it's configured, `/portal` shows a "portal is on its way" page. Nothing else on the site depends on it.

## 1. Database (Neon, through Vercel)
1. In Vercel, open the project, then **Storage → Create → Neon** (the free plan is fine) and connect it to the project. This adds `DATABASE_URL` automatically.
2. Create the tables once, from a computer with the code checked out:
   `DATABASE_URL="<the pooled connection string>" ADMIN_EMAILS="you@example.com" npm run db:migrate`
   The migration is safe to run again after future updates.

## 2. Login (Clerk)
1. Create an application at clerk.com. Turn on **Email** (code or link) and **Google**.
2. In Vercel → **Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` (from Clerk → API keys)
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL` = `/portal/sign-in`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL` = `/portal/sign-in`
   - `ADMIN_EMAILS` = the owner's email address
3. In Clerk, switch to a **production instance** and add the britanniacrown.com domain when the site moves to it.
4. Redeploy.

## 3. Billing (optional)
The Billing tab uses the Stripe keys from the online payments setup (`.env.example`). In Stripe, turn on the **customer portal** (Settings → Billing → Customer portal) so families can update their card or cancel.

## Day to day
- **Add a family:** Staff area → Families → Add a family. Use the parent's email address. When they sign in with that address, their login links to the family automatically.
- **Add staff:** Staff area → Team (admins only).
  - Consultants manage families, sessions and notes.
  - Tutors see and write notes on their own sessions only.
- **Schedule sessions:** open a family and choose a date, time, tutor and joining link (Zoom, Meet or Teams). Use "Repeat weekly" for a block of lessons.
- **Write notes:** tutors open a session from their overview. "Needs a note" lists finished sessions without one. Notes are shared with the family unless you untick the box.

## Local development
Run `PORTAL_DEV_AUTH=1 DATABASE_URL=postgres://... npm run dev`, then sign in at `/portal/sign-in` with any email; no Clerk needed. This shortcut is disabled in production builds.
