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

## Articles, batch 1 (tutoring and exams)
Written from stable UK education facts; please check these before relying on them:
- **GCSE resits:** the rule that 16-18s in post-16 education without a grade 4 in English or maths must keep studying it,
  grade 3 normally resits the GCSE, grade 2 or below may take a stepping-stone qualification, and November resits exist for
  English language and maths.
- **KS2 SATs:** taken in May of Year 6; reading, maths and grammar/punctuation/spelling tests; scaled scores with 100 as the
  expected standard; results to parents in July; writing and science by teacher assessment.
- **A-Level and GCSE options:** typical timing (options in Year 8 or 9, A-Levels in Years 12 and 13) and typical sixth-form entry
  (grade 6) are general; schools set their own rules.
- **Private candidates:** centres set their own deadlines and fees; practical and non-exam elements are the hardest.
- **Costs:** the cost article quotes only the site's own published prices and gives no market rates.

## Articles, batch 2 (admissions, early years, home education)
Please check these statements before relying on them (they are accurate to the best of my knowledge but the rules change):
- **Admissions:** the national priority order (looked-after children, then EHCP-named schools, then each school's own
  criteria); admission authority types; local authorities coordinate applications (preference numbers vary by area).
- **Appeals:** at least 20 school days to lodge a main-round appeal; the two-stage panel test; infant class size limit of 30
  and the narrower grounds for appeals in Reception to Year 2; panel decisions are binding.
- **In-year admissions:** processes differ by local authority; fair access protocols exist for some vulnerable children.
- **11-plus:** timings, registration and test content differ by area; a pass does not guarantee a place.
- **Independent schools:** typical entry points (4, 7, 11, 13 and sixth form); scholarships versus means-tested bursaries.
- **Nurseries:** EYFS, Ofsted inspection (report formats have been changing) and funded childcare rules (check the
  government's childcare information, as entitlements have been changing).
- **Starting home education:** withdraw by writing to the head teacher; the school informs the local authority; consent
  may be needed first for a child at a special school under local authority arrangements; no duty to follow the National
  Curriculum; no funding for home education.
- **Length:** these articles are about 650 to 850 words each, shorter than ideal for the most competitive search terms.

## Articles, batch 3 (maths and English help, sciences, exam support, early years, home education, returning to the UK)
Statements to verify (accurate to the best of my knowledge, but rules change):
- **GCSE maths tiers:** foundation covers grades 1 to 5 and higher covers 4 to 9.
- **Combined vs separate science:** combined science is two GCSEs with a double grade; separate sciences are three GCSEs.
  Sixth-form entry requirements vary.
- **Access arrangements:** extra time commonly up to 25 per cent; applications are made by the exam centre through the JCQ
  system, usually need evidence and must be the student's normal way of working. JCQ rules are updated each year.
- **Results days:** A-Level results mid-August, GCSE about a week later; Clearing, Adjustment and reviews of marking (marks
  can go down). Check current UCAS and exam board rules.
- **Phonics check:** Year 1, June, 40 words, threshold published each year (historically 32).
- **Starting school:** compulsory school age starts on 31 August, 31 December or 31 March after the fifth birthday; summer-born
  children (1 April to 31 August) can request a delayed Reception start, decided by the admission authority.
- **Returning to the UK:** councils need a UK address; in-year applications; no guaranteed place.
- **Length:** most of these run about 600 to 730 words, below the 1,000+ ideal for competitive search terms.

## Deepened articles (top 8)
The tutor costs, GCSE options, admissions criteria, appeals, starting home education, A-Level choices, GCSE resits and
online-vs-face-to-face guides were expanded to about 900 to 1,300 words with tables, worked examples and timelines.
Extra statements worth checking:
- **Appeals:** panels usually have three members; decisions are given in writing within a few days; main-round hearings
  are usually in the summer term; hearings may be held remotely.
- **A-Level table:** the subject patterns for medicine, engineering, economics and law are general, not rules; every
  university and course sets its own requirements.
- **Resit timeline:** November series entry deadlines fall soon after August results; confirm with the exam centre.
- **Tutor types table:** descriptive only. It deliberately quotes no market rates.

## Technical SEO sweep
- Titles: every page title is now 60 characters or fewer (keyword first, brand last); descriptions 70 to 160.
- The home page title changed to "Private Tutors & Education Consultants | Britannia Crown".
- Sitemap no longer claims every page was modified at each build; only guides carry a real "updated" date.
- Newer guides were cross-linked so every page has at least three internal links pointing to it.
- Finder: new "Educational guidance" path (subjects, school route, whether a tutor is needed, exams and results, other).

## Onboarding before checkout
- Checkout now has a required step (`/checkout/details`, or `/portal/checkout` when signed in) collecting parent name, email, phone, child's name, year group, area of help, a short description and consent. Details are saved to the CRM before payment and to the family, child and order after payment.
- The "family portal" wording remains in the terms and pricing FAQ; the portal is now "client portal". Legal wording: please have the solicitor confirm.
- Customers who sign in, buy, book or reach consultation stage now get a portal account created automatically.

## How it works page (`/how-it-works`)
Research figures, each linked to its source on the page; please confirm you are happy to publish them:
- EEF Teaching and Learning Toolkit: one-to-one tuition about +5 months, small-group about +4 months (an average, for high-quality tuition linked to class teaching).
- Nickow, Oreopoulos and Quan (NBER 27476): pooled effect of tutoring 0.29 SD in the latest version (0.37 in the earlier one).
- Bloom (1984): the "2 sigma / 98th percentile" finding, labelled on the page as small-sample and contested.
- The page says these are general research findings, not Britannia Crown's own results. Do not replace them with our own claims unless real data exists.
- Checked on 2026-10-20 by web search; please re-check the live EEF page before publishing, as figures are updated.

## Admin business overview and account chooser
- `/portal/admin` for admins now opens a business overview: revenue (this month, MRR, 6-month chart), leads and lead-to-client rate, active clients, lessons, a needs-attention list, lead sources, team workload and a latest-activity feed. All numbers come from our own records (orders, contacts, sessions); revenue is Stripe "paid" amounts before refunds and fees.
- "Lead to client" = contacts at stage client divided by all contacts.
- Log in and Sign up now go to a two-option chooser (`/portal/login`, `/portal/join`): parents and families, or tutors, consultants and admins. The form pages carry a two-tab switch.

## Lesson requests and approval
- Families no longer book lessons directly: "Request a lesson" in their portal sends a request (and an email to the team inbox). An admin approves it under Lesson requests, chooses the tutor or consultant, date, length and weekly repeat, which creates the lesson(s). The family is emailed on approval or decline.
- Admins can still schedule directly from a family's page.
- The admin "Get set up" checklist can now be closed (remembered in that browser).

## Unified UI style
One design scale now covers the public site and the portal: radii (cards 14px, controls 8px), shadows, heading sizes, stat sizes and section spacing are shared variables at the top of `app/site.css`. Change them there to restyle everything at once.
