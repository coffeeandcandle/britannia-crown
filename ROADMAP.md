# Britannia Crown: roadmap

The site now runs one clear path: a parent searches Google, lands on a guide, tool or service page, gets an answer, and contacts us by booking a call, requesting a call back or sending a WhatsApp message. Every form records which page the visitor first landed on, plus any UTM tags. The next phases build on that path.

## Phase 1: Sell directly on the website
- **Stripe Checkout** for fixed-price products: UAE placement packages, membership tiers (monthly subscriptions) and tutoring hour bundles.
- A `/pricing` page that lists what can be bought online; consultancy work that needs a quote stays as an enquiry.
- Stripe webhooks to confirm payment, email a receipt and notify the team.
- Needs from the client: sterling prices, which products can be sold without a call first, refund and cancellation terms (the terms page is still a template awaiting legal review).

## Phase 2: Book consultations directly
- Currently: Calendly embed on `/book-consultation`, tracked as `consultation_booked`.
- Next: pass UTM and landing-page data into Calendly (`utm_*` URL parameters) so bookings carry the same attribution as forms.
- Optional: paid consultations (e.g. a 60-minute school strategy session) through Calendly + Stripe, or a native booking flow if we move to the portal below.

## Phase 3: Client portal
- Login for families (email magic link or Google), built on Next.js with a hosted auth provider (Clerk or Auth.js) and a Postgres database (Neon or Supabase via Vercel).
- For families: upcoming sessions, joining links for online lessons, tutor notes after each session, invoices and membership management (Stripe customer portal).
- For tutors: their timetable, session notes and availability.
- For consultants: an overview of each child's plan and progress.
- Video lessons: start with links to Zoom or Google Meet, and add embedded video (e.g. Daily or Whereby) later if needed.

## Ongoing: content and SEO
- One or two new guides a month, aimed at questions parents search for (admissions, 11+, exam boards, revision, home education, relocation).
- More free tools: an 11+ readiness checklist, a revision timetable builder, and a UK to Dubai school year converter.
- Add the britanniacrown.com domain to Vercel and submit the sitemap in Google Search Console.
