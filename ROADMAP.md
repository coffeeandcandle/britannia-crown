# Britannia Crown: roadmap

The site now runs one clear path: a parent searches Google, lands on a guide, tool or service page, gets an answer, and contacts us by booking a call, requesting a call back or sending a WhatsApp message. Every form records which page the visitor first landed on, plus any UTM tags. The next phases build on that path.

## Phase 1: Sell directly on the website (built; switch on with Stripe keys)
- **Built:** Stripe Checkout for the fixed-price products in `app/lib/products.ts`: four one-off UAE packages, the Education Concierge, and the three membership tiers as monthly subscriptions. Prices are set in that file and sent to Stripe at checkout, so no products need creating in the Stripe dashboard.
- Buy buttons are on `/membership` and `/uae`. Until `STRIPE_SECRET_KEY` is set, they fall back to the enquiry form, so nothing is broken in the meantime.
- `/api/stripe/webhook` emails the team (through the Formspree enquiry inbox) for each new order, failed subscription payment and cancellation.
- `/checkout/success` confirms the order and sends a GA4 `purchase` event; `begin_checkout` fires on click. First landing page and UTM tags are stored on every Stripe payment.
- **To switch on:** see `.env.example`. Create a Stripe account, add `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in Vercel, add the webhook endpoint in Stripe, and redeploy. Test with test keys first.
- **Still needed:** sterling prices for UK families; which UK services can be bought without a call first; refund and cancellation terms (the terms page is a template awaiting legal review). Turn on the Stripe customer portal so subscribers can manage or cancel their plan from their emails.

## Phase 2: Book consultations online (built on Calendly)
- **Built:** a three-step booking flow on `/book-consultation`: choose a session, enter details, pick a time in the embedded Calendly. Then a confirmation screen.
- Session types live in `app/lib/sessions.ts`: free 30-minute consultation (live), strategy session (60 min, placeholder £120) and trial tutoring lesson (45 min, placeholder £45).
- Details entered on our page are passed to Calendly (name, email, and year group and notes as the first custom question), along with UTM tags and the first landing page.
- GA4 events: `booking_session_selected`, `booking_details_entered`, `consultation_booked` (with session type and value).
- Deep links: `/book-consultation?session=trial-lesson` (used on every tutor subject page) and `?session=strategy`.
- **To switch on paid sessions:** in Calendly, connect Stripe (Integrations → Stripe), create a 60-minute and a 45-minute event type with their prices, and add a first question such as "What would you like to talk about?" to each. Then paste each event link into `calendlyUrl` in `app/lib/sessions.ts` and confirm the price. Until then, those sessions show a request form and no price.
- Later: move to a native booking system with its own database when the client portal is built.

## Phase 3: Client portal (built; switch on with Clerk and Neon)
- **Built:** `/portal` for families (overview, sessions with "Join now" links, tutor notes and homework, billing via Stripe) and `/portal/admin` for staff (families, children, scheduling including weekly blocks, session notes, team roles).
- Login with Clerk; data in Postgres (Neon). Each person's access is checked on the server for every page and action. Tutors only see their own sessions; families only see their own data and the notes shared with them.
- **To switch on:** see `PORTAL_SETUP.md`.
- **Next:** email families when a new note is posted; a family-visible progress summary each term; tutor availability and families booking lessons directly from the portal (this would replace Calendly for existing clients); video lessons embedded in the portal.

## Ongoing: content and SEO
- One or two new guides a month, aimed at questions parents search for (admissions, 11+, exam boards, revision, home education, relocation).
- More free tools: an 11+ readiness checklist, a revision timetable builder, and a UK to Dubai school year converter.
- Add the britanniacrown.com domain to Vercel and submit the sitemap in Google Search Console.
