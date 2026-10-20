# Handover notes (20 October 2026, updated after go-live)

Britannia Crown website: Next.js 16 on Vercel (project `britannia-crown`, team Coffee and Candle),
live at https://www.britanniacrown.com (also britannia-crown.vercel.app). Pushes to `main` deploy to production automatically.
Read `AGENTS.md` first: this Next.js version differs from older docs (for example, `proxy.ts`
replaces middleware, and `params`/`searchParams` are Promises).

## What's live

- **Website**: services, tutors, guides, tools, Prices page (`/pricing`), terms, refunds policy. All prices are in GBP.
- **Booking**: `/book-consultation`, Calendly embed (`app/components/BookingFlow.tsx`).
- **Client portal** (`/portal`): Clerk sign-in (production instance, email and Google), with Neon Postgres via `DATABASE_URL`. Setup is in `PORTAL_SETUP.md`.
  - Roles: **tutor** (own lessons and notes only), **consultant** (families and scheduling), **admin** (everything, plus Contacts, Orders, Team).
  - `ADMIN_EMAILS` in Vercel lists the admins.
- **Stripe** (live mode, restricted key `rk_live_…` in `STRIPE_SECRET_KEY`):
  - Production builds run `scripts/stripe-setup.mjs`, which creates the live webhook (`https://www.britanniacrown.com/api/stripe/webhook`) and billing portal and stores the signing secret in the `app_settings` table. Keys starting `sk_live` or `rk_live` count as live.
  - Checkout lives in `app/api/checkout/route.ts`. Catalogue prices are created on first use (`app/lib/stripe-catalog.ts`).
  - The webhook (`app/api/stripe/webhook/route.ts`) saves orders to the `orders` table.
  - The key needs Write on Checkout Sessions, Products, Prices, Customer portal and Webhook Endpoints, and Read on Customers, Subscriptions and Invoices.
  - A live test purchase has **not** been made yet (see "To do next").
- **Email** (Resend): `RESEND_API_KEY`, `NOTIFY_EMAIL=hello@britanniacrown.com` and `EMAIL_FROM=Britannia Crown <hello@britanniacrown.com>` are set in Vercel. britanniacrown.com is verified in Resend. Team alerts were confirmed to send without errors; check the hello@ inbox (and spam) to confirm they arrive.
- **Domain**: britanniacrown.com and www.britanniacrown.com are attached to the Vercel project (the apex redirects to www).
- **Clerk**: production instance on britanniacrown.com (DNS verified, Google sign-in with custom credentials). The production keys were meant for the Production environment only, with Preview left on the development keys; confirm this in Vercel. Signed in successfully with Google on the live site.

## CRM and form handling (commit 22b4a84)

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

1. **Roll exposed keys.** The live Stripe key, Clerk secret key and Resend key were pasted into a chat session. For each: create a new key, set it in Vercel, redeploy, then delete the old one.
2. **Delete test data**: three contacts named "TEST … (delete me)" in Staff area → Contacts.
3. **Real test purchase**: buy the cheapest item on /pricing, check it appears in Staff area → Orders and that the team email arrives, then refund it in Stripe.
4. **Client decisions**:
   - Approve the GBP prices.
   - Confirm VAT status.
   - Provide paid session prices and Calendly links (`app/lib/sessions.ts`).
   - Confirm the £30 ambassador reward.
5. **Legal**: have a solicitor review the terms and refunds policy.
6. **Optional**: add a second email provider in Clerk for deliverability.

## Local development

- `npm run dev` needs `DATABASE_URL` (local Postgres works).
- `PORTAL_DEV_AUTH=1` (development only) lets you sign in as any email via the dev sign-in page.
- `node scripts/db-migrate.mjs` applies `db/schema.sql`.
- See `.env.example` for all settings.
