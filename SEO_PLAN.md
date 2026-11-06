# SEO content plan (UK first)

Status: drafted 2026-11-06 from a read of the existing site, **not** from Search Console data. Treat the priorities as informed guesses. Once Search Console has data, re-rank by impressions and position.

## What exists

- 32 guides, all England-focused: tutoring (4), exams and qualifications (9), choosing a school (8), early years and primary (4), home education (3), moving (1).
- 8 subject pages under `/tutors`: Primary, GCSE Maths, English and Science, A-Level Maths, Chemistry, Biology and Physics.
- 4 service pages and the membership and UAE offer pages.

## Biggest gap: subject and stage pages

Subject pages are the highest-intent commercial pages (a parent searching "GCSE history tutor" is ready to enquire), and there are only 8. They are cheap to add because `app/lib/subjects.ts` drives the page, schema, sitemap and share image.

Tier 1 (most searched, closest to current offer):
1. 11+ tutors (the 11+ guide explains the system but nothing sells preparation)
2. KS3 tutors (Years 7 to 9)
3. A-Level English Literature
4. A-Level History
5. A-Level Economics
6. A-Level Further Maths
7. GCSE History
8. GCSE Geography
9. GCSE Computer Science
10. GCSE French / Spanish

Tier 2: A-Level Psychology, Business, Computer Science, Geography; 7+/8+ entrance prep; Common Entrance; tutors for dyslexia or SEN support (only if the tutors are qualified for it).

Only add a subject if there are tutors who can teach it. Each page needs real copy (exam boards, common problem areas, what a first lesson looks like), not a template with the subject name swapped.

## New guide topics (England unless noted)

High intent, answers a question parents ask before buying:
- How to prepare for the 11+ (what, when, how long, how much tutoring)
- Year 6 to Year 7 transition
- AQA vs Edexcel vs OCR: does the exam board matter?
- Ofsted ratings explained for parents
- School catchment areas and how they work
- How many GCSEs does my child need?
- Retaking A-Levels
- UCAS personal statement help for parents
- Oxbridge and Russell Group applications: what parents can do
- Predicted grades and how universities use them
- Flexi-schooling and part-time home education
- School refusal and when home education is a sensible step
- SEN support, EHCPs and when a tutor fits alongside them
- Mock exams: how to use them

Gap in jurisdiction: every guide is England-specific. Parents in Scotland, Wales and Northern Ireland search differently (different exams and admissions). Either say "England" clearly in titles, which most already do, or add a short comparison guide.

## Local pages (use with care)

Tutoring is online, so city pages (for example "tutors in Manchester") are only worth building if they carry something genuinely local: the area's admissions authority and deadlines, grammar school or selective-school context, and local exam-season specifics. A page that only swaps the city name is thin content and can hurt the whole site. Start with 3 to 5 cities where the business actually has families, and only if there is local content to say.

## Off-site (not code)

1. Verify `www.britanniacrown.com` in Google Search Console and submit `/sitemap.xml`.
2. Claim a Google Business Profile if the business can be listed (needs a real address or service area).
3. Get listed in UK tutoring and education directories; ask existing families for reviews on Google or Trustpilot, then add review markup using only real reviews.
4. UAE: guides for the British curriculum, school search and relocation have room to grow, but they are secondary to the UK work above.

## Process for every new page

- Facts checked against gov.uk or the exam board before publishing (admissions dates, rules and grade systems change).
- Add the entry in `app/lib/guides.ts` or `app/lib/subjects.ts`; the sitemap, schema and share image follow automatically.
- Link it from at least two related pages and add it to the `related` lists of relevant guides.
- Update `lastModified`/`updated` only when the content genuinely changes.
