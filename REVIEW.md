# Content to confirm before relying on it

The service and package pages (`/uae/*` and `/membership/*`, copy in `app/lib/offers.ts`) were written
using only facts already published on the site. These are the statements worth a second look from the client.

## Carried over from existing pages (confirm they are still true)
- "Exam technique coaching from specialists, including actual GCSE examiners" (UAE exam preparation).
- "UK-qualified" and "personally vetted" tutors, and "a full bench" of replacements (membership).
- Nursery search covers KHDA ratings and staff qualifications; school search covers KHDA ratings, fees,
  waitlists, curriculum fit and the commute.
- Homeschool support covers Cambridge and Edexcel curriculum design.
- Membership tiers, hours, call lengths and response times, exactly as on the membership page.
- Prices, as in `app/lib/products.ts` (the file notes they were converted from AED and need client approval).

## New wording added (confirm or edit)
- **No guarantees:** "no one can promise a particular place" (nursery and school search) and "no one can
  promise particular grades" (exam preparation).
- **Hourly rates** worked out from published prices: Foundation £200 / 4 hours = £50, Partner £360 / 8 = £45,
  Full Partner £640 / 14 = about £46.
- **Comparison** on the Partner page: "UK-curriculum tutors booked individually in Dubai are listed at £60 to
  £70 an hour" (from the Dubai page).
- **Payment:** "pay by card through Stripe; we never see or store your card details".
- **Timing:** exam preparation and homeschool sessions are "online and timed for the UAE".
- **Cancellation:** pages point to the refunds and cancellations policy rather than stating terms. Check that
  the policy covers monthly subscriptions (Education Concierge and memberships) the way you intend.
- Members of Full Partner: "priority access to school placement consultancy at a reduced rate", as on the
  membership page.

## Not included, because there is nothing verified to say yet
- Testimonials, star ratings, case studies and results. Add real, permissioned ones; never placeholders.
- Photos of the team or tutors.
- Any success rate or number of families helped.

## UK service pages (`app/lib/services.ts`)
- **No prices are shown for the four UK services** because the site quotes them after a conversation.
  The tutoring and qualifications pages sell the membership tiers (from the real catalogue) and a free consultation.
- The strategy session (£120) and trial lesson (£45) exist in `app/lib/sessions.ts` but are not bookable yet, so their
  prices are deliberately not shown. The pages offer to "request" them.
- New "How much does it cost?" FAQs state the quote-first approach and the real fixed prices for Dubai and membership.
- Admissions dates quoted on the school placement page (secondary applications close 31 October, primary 15 January)
  come from the existing FAQ; please confirm they are still correct for the current admissions year.
- The tutoring page title was shortened to "UK-Trained Private Tutors | Britannia Crown" (the old one was truncated in search).

## Photography
- All photos are free-to-use Unsplash stock (see `app/lib/images.ts` for ids and photographer credit). They illustrate the
  subject and are never presented as Britannia Crown's own tutors, clients or children.
- Replace any of them with the client's own photography by editing the id in `app/lib/images.ts` (or adding real files to
  `public/` and pointing `photoUrl` at them). Genuine photos of real tutors and families, with permission, convert best.
- A footer line credits Unsplash contributors.

## Home page "Start today" section
- Buy buttons use the real catalogue and prices. Hourly values are worked out from published prices
  (Foundation £200 / 4 h = £50, Partner £360 / 8 h = £45, Full Partner £640 / 14 h = about £46).
