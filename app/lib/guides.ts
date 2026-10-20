import type { Faq } from "./schema";

// Metadata for every guide. The article body lives in content/guides/<slug>.mdx.
// To add a guide: write the .mdx file, then add an entry here (newest first).
export type GuideCategory =
  | "Exams & Qualifications"
  | "Choosing a School"
  | "Early Years & Primary"
  | "Home Education"
  | "Tutoring"
  | "Moving & International Families";

// The order categories appear in on the guides page.
export const guideCategories: GuideCategory[] = [
  "Tutoring",
  "Exams & Qualifications",
  "Choosing a School",
  "Early Years & Primary",
  "Home Education",
  "Moving & International Families",
];

export type Guide = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: GuideCategory;
  published: string;
  updated: string;
  faqs: Faq[];
  related: { services: string[]; subjects: string[]; guides: string[] };
  enquiry: { service: string; title: string; emphasis: string; lead: string };
};

export const guides: Guide[] = [
  {
    slug: "school-admissions-england",
    title: "School admissions in England: key dates and how to apply",
    seoTitle: "School Admissions in England: Key Dates & How to Apply | Britannia Crown",
    description:
      "Key dates for September 2027 entry, how primary and secondary applications work, how places are allocated, and what to do if you don't get the school you wanted.",
    category: "Choosing a School",
    published: "2026-10-19",
    updated: "2026-10-19",
    faqs: [
      {
        q: "When is the deadline for secondary school applications?",
        a: "The national closing date is 31 October in Year 6. For September 2027 entry that is Saturday 31 October 2026, although some councils have set a slightly later local closing date, so check your council's website.",
      },
      {
        q: "When will we find out which primary school we've been offered?",
        a: "Primary offers are sent on 16 April, or the next working day. For September 2027 entry that is Friday 16 April 2027.",
      },
      {
        q: "Does naming only one school improve our chances?",
        a: "No. Schools don't see how you ranked them, and listing a single school gives you no advantage. Naming several schools reduces the risk of being offered a school you didn't choose.",
      },
    ],
    related: { services: ["school-placement"], subjects: ["primary"], guides: ["home-education-england", "igcse-vs-gcse"] },
    enquiry: {
      service: "School Placement",
      title: "Choosing a school?",
      emphasis: "Let's talk it through.",
      lead: "Tell us about your child and the schools you're considering, and an education consultant will call you back to talk through your options.",
    },
  },
  {
    slug: "gcse-grades-explained",
    title: "GCSE grades explained: what 9 to 1 means for your child",
    seoTitle: "GCSE Grades Explained: The 9 to 1 Scale for Parents | Britannia Crown",
    description:
      "What GCSE grades 9 to 1 mean, how they compare with A* to G, what counts as a pass, how grade boundaries work and what to do on results day.",
    category: "Exams & Qualifications",
    published: "2026-10-19",
    updated: "2026-10-19",
    faqs: [
      {
        q: "Is a grade 4 a pass at GCSE?",
        a: "Yes. The Department for Education treats grade 4 as a 'standard pass' and grade 5 as a 'strong pass'. In England, students without at least a grade 4 in English and maths generally keep studying them after 16.",
      },
      {
        q: "What is a grade 7 equivalent to?",
        a: "The bottom of grade 7 lines up with the bottom of the old grade A, so a 7 is broadly equivalent to an A.",
      },
      {
        q: "Is grade 9 the same as an A*?",
        a: "Not exactly. Grade 9 is designed to be harder to achieve than the old A*, so fewer students receive it. Grades 8 and 9 together broadly cover the old A* range.",
      },
    ],
    related: {
      services: ["qualifications"],
      subjects: ["gcse-maths", "gcse-english", "gcse-science"],
      guides: ["how-to-revise-gcse-a-level", "igcse-vs-gcse"],
    },
    enquiry: {
      service: "Qualifications",
      title: "Aiming for a",
      emphasis: "higher grade?",
      lead: "Tell us about your child's subjects and target grades, and an education consultant will call you back to talk through the right support.",
    },
  },
  {
    slug: "home-education-england",
    title: "Home education in England: a practical guide for parents",
    seoTitle: "Home Education in England: A Parent's Guide | Britannia Crown",
    description:
      "What the law requires, how to take your child out of school, what the council's role is, how to plan a suitable education and how home-educated children sit exams.",
    category: "Home Education",
    published: "2026-10-19",
    updated: "2026-10-19",
    faqs: [
      {
        q: "Do I need permission to home educate my child?",
        a: "Not if your child attends a mainstream school: you tell the school in writing and it removes your child from the roll. Some children need council consent first, such as those at a special school, and the Children's Wellbeing and Schools Act 2026 extends consent requirements as its measures come into force.",
      },
      {
        q: "Do home-educated children have to sit exams?",
        a: "No. There's no legal requirement to sit GCSEs or other exams, but many families choose to, because qualifications keep options open for college, university and work.",
      },
      {
        q: "Can my child go back to school later?",
        a: "Yes. You can apply for a school place at any time through your area's in-year admissions process. Following a British-curriculum structure at home can make the return smoother.",
      },
    ],
    related: {
      services: ["home-education", "qualifications"],
      subjects: ["gcse-maths", "gcse-english"],
      guides: ["igcse-vs-gcse", "choosing-a-private-tutor"],
    },
    enquiry: {
      service: "Home Education",
      title: "Planning",
      emphasis: "home education?",
      lead: "Tell us about your child and your plans, and an education consultant will call you back to talk through curriculum, tutors and qualifications.",
    },
  },
  {
    slug: "choosing-a-private-tutor",
    title: "How to choose a private tutor: 10 questions to ask",
    seoTitle: "How to Choose a Private Tutor: 10 Questions to Ask | Britannia Crown",
    description:
      "Tutoring isn't regulated in the UK, so quality varies. Ten questions to ask about experience, safeguarding, progress and fit before you choose a tutor for your child.",
    category: "Tutoring",
    published: "2026-10-19",
    updated: "2026-10-19",
    faqs: [
      {
        q: "Do private tutors need a DBS check?",
        a: "There's no legal requirement for private tutors in the UK to have a DBS check, because tutoring isn't regulated. It's sensible to ask whether a tutor has a recent enhanced DBS certificate before they work with your child.",
      },
      {
        q: "How often should my child see a tutor?",
        a: "Once a week suits most students, as it leaves time to practise between sessions. Some students add sessions in the run-up to exams.",
      },
      {
        q: "Is online tutoring as effective as face to face?",
        a: "It can be, particularly for older students who are comfortable learning on screen. Younger children, or those who find it harder to concentrate online, may get more from face-to-face sessions.",
      },
    ],
    related: {
      services: ["tutoring"],
      subjects: ["gcse-maths", "gcse-english", "primary"],
      guides: ["how-to-revise-gcse-a-level", "gcse-grades-explained"],
    },
    enquiry: {
      service: "Tutoring",
      title: "Let us find",
      emphasis: "the right tutor.",
      lead: "Tell us about your child and the subject, and an education consultant will call you back to talk through a personally matched tutor.",
    },
  },
  {
    slug: "how-to-revise-gcse-a-level",
    title: "How to revise for GCSEs and A-Levels: methods that work",
    seoTitle: "How to Revise for GCSEs & A-Levels: Methods That Work | Britannia Crown",
    description:
      "Evidence-based revision techniques — retrieval practice, spacing, interleaving and past papers — plus how to build a realistic plan and how parents can help.",
    category: "Exams & Qualifications",
    published: "2026-10-19",
    updated: "2026-10-19",
    faqs: [
      {
        q: "When should my child start revising for GCSEs?",
        a: "Light, regular review can start in Year 10. For structured revision, aim to begin several months before the exams; many students build their timetable after their mock exams.",
      },
      {
        q: "What is the most effective revision technique?",
        a: "Research consistently points to retrieval practice (testing yourself) and spacing revision out over time as two of the most effective techniques, well ahead of re-reading or highlighting.",
      },
      {
        q: "How many hours a day should my child revise?",
        a: "Quality matters more than hours. Several focused sessions with breaks work better than long, unfocused stretches, and good sleep is essential for memory.",
      },
    ],
    related: {
      services: ["qualifications", "tutoring"],
      subjects: ["gcse-maths", "gcse-science", "a-level-chemistry"],
      guides: ["gcse-grades-explained", "choosing-a-private-tutor"],
    },
    enquiry: {
      service: "Qualifications",
      title: "Want a revision plan",
      emphasis: "that works?",
      lead: "Tell us about your child's subjects and exams, and an education consultant will call you back to talk through targeted support.",
    },
  },
  {
    slug: "igcse-vs-gcse",
    title: "IGCSE vs GCSE: what's the difference?",
    seoTitle: "IGCSE vs GCSE: What's the Difference? A Parent's Guide | Britannia Crown",
    description:
      "How International GCSEs differ from GCSEs in who offers them, content, assessment and grading, how universities view them, and which suits your child.",
    category: "Exams & Qualifications",
    published: "2026-10-19",
    updated: "2026-10-19",
    faqs: [
      {
        q: "Is an IGCSE equivalent to a GCSE?",
        a: "They are at the same level, and UK universities and employers generally treat them as equivalent. The main differences are in who offers them, their content and how they are assessed.",
      },
      {
        q: "Do state schools in England offer IGCSEs?",
        a: "Rarely. Since the GCSE reforms, International GCSEs don't count in school performance tables in England, so state schools almost always teach GCSEs. Many independent schools use IGCSEs in some subjects.",
      },
      {
        q: "Can a home-educated child take IGCSEs?",
        a: "Yes. International GCSEs are popular with private candidates because many have little or no coursework, and some are available in more than one exam series each year. You'll need an exam centre that accepts private candidates.",
      },
    ],
    related: {
      services: ["qualifications", "home-education"],
      subjects: ["gcse-maths", "gcse-science"],
      guides: ["gcse-grades-explained", "home-education-england"],
    },
    enquiry: {
      service: "Qualifications",
      title: "Choosing",
      emphasis: "the right qualifications?",
      lead: "Tell us about your child and their school or home-education plans, and an education consultant will call you back to talk through the options.",
    },
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);

// Guides that link to a given service or subject, for "related reading" on those pages.
export const guidesFor = (kind: "services" | "subjects", slug: string) =>
  guides.filter((g) => g.related[kind].includes(slug));
