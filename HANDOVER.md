# Handover notes (20 October 2026)

Britannia Crown website: Next.js 16 on Vercel (project `britannia-crown`, team Coffee and Candle),
live at https://britannia-crown.vercel.app. Pushes to `main` deploy to production automatically.
Read `AGENTS.md` first: this Next.js version differs from older docs (for example, `proxy.ts`
replaces middleware, and `params`/`searchParams` are Promises).

## What's live

- **Website**: services, tutors, guides, tools, Prices page (`/pricing`), terms, refunds policy. All prices are in GBP.
- **Booking**: `/book-consultation`, Calendly embed (`app/components/BookingFlow.tsx`).
- **Client portal** (`/portal`): Clerk sign-in, with Neon Postgres via `DATABASE_URL`. Setup is in `PORTAL_SETUP.md`.
  - Roles: **tutor** (own lessons and notes only), **consultant** (families and scheduling), **admin** (everything, plus Contacts, Orders, Team).
  - `ADMIN_EMAILS` in Vercel lists the admins.
- **Stripe** (sandbox, account "Britannia Crown sandbox"):
  - `STRIPE_SECRET_KEY` is set in Vercel.
  - Production builds run `scripts/stripe-setup.mjs`, which creates the webhook and billing portal and stores the signing secret in the `app_settings` table.
  - Checkout lives in `app/api/checkout/route.ts`. Catalogue prices are created on first use (`app/lib/stripe-catalog.ts`).
  - The webhook (`app/api/stripe/webhook/route.ts`) saves orders to the `orders` table.
  - A test purchase was verified end to end, and the order shows at Staff area → Orders.

## Just finished: CRM and form handling (this commit)

Formspree form `f/xyzypzkv` no longer exists ("Form not found"), so website enquiries were being lost.

- **Forms**: all website forms (contact, guide request, ambassador, booking) now post to `app/api/enquiry/route.ts`.
  - Each submission is saved to the CRM (`contacts` and `activities` tables), then the team is emailed via `app/lib/email.ts`.
  - The booking flow saves an entry when details are entered (status "started") and again when Calendly confirms ("booked").
- **CRM pages** (admin only):
  - `app/portal/admin/contacts` lists contacts, with stage tabs, search and add contact.
  - `contacts/[id]` shows the timeline; staff can log calls, emails and notes, change stage and owner, create a portal family, and delete a contact (data-removal requests).
  - Server actions are in `app/portal/admin/crm-actions.ts`. Core logic is in `app/lib/crm.ts`.
- **Orders**: Stripe orders are added to the buyer's contact timeline and move them to "client".
- **Dashboard**: admins see a "New enquiries" stat.
- **Privacy policy**: updated to list the services that process data.
- **Tested locally**:
  - Contact form submit, honeypot, invalid email, booking started/booked, ambassador and guide forms.
  - Stage tabs, logging a call, creating a portal family.
  - Tutors get 404 on Contacts, Orders and Families.

## To do next

1. **Email alerts need Resend**: until `RESEND_API_KEY` is set, enquiries are only saved in the CRM, with no email.
   - Sign up at resend.com, create an API key, and add it to Vercel as `RESEND_API_KEY` (sensitive).
   - Optionally add `NOTIFY_EMAIL` (comma-separated; it defaults to hello@britanniacrown.com).
   - Without a verified domain, Resend only delivers to the Resend account owner's email. Verify britanniacrown.com in Resend, then set `EMAIL_FROM`, e.g. `Britannia Crown <hello@britanniacrown.com>`.
2. **Check the deploy**: confirm the deploy of this commit is READY and that `/contact` submits successfully on the live site.
3. **Client decisions**:
   - Approve the GBP prices.
   - Confirm VAT status.
   - Provide paid session prices and Calendly links (`app/lib/sessions.ts`).
   - Confirm the £30 ambassador reward.
4. **Go live**:
   - Activate Stripe, then swap in a live restricted key (`rk_live_…`); the next deploy sets up the webhook and billing portal.
   - Move Clerk to a production instance.
   - Connect the britanniacrown.com domain.
5. **Legal**: have a solicitor review the terms and refunds policy.

## Local development

- `npm run dev` needs `DATABASE_URL` (local Postgres works).
- `PORTAL_DEV_AUTH=1` (development only) lets you sign in as any email via the dev sign-in page.
- `node scripts/db-migrate.mjs` applies `db/schema.sql`.
- See `.env.example` for all settings.
