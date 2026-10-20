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
    slug: "how-much-does-a-private-tutor-cost-uk",
    title: "How much does a private tutor cost in the UK?",
    seoTitle: "How Much Does a Private Tutor Cost in the UK? | Britannia Crown",
    description: "What affects the price of a private tutor in the UK, what to compare besides the hourly rate, and how to keep the cost sensible without losing quality.",
    category: "Tutoring",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "Why do tutor prices vary so much?", a: "Rates depend on the tutor's experience and qualifications, the subject and level, whether lessons are online or in person, and how the tutor is found. Exam-board experience and specialist subjects usually cost more." },
      { q: "Is a monthly plan cheaper than paying by the hour?", a: "A monthly plan makes the cost predictable and secures a regular slot. At Britannia Crown, Academic Partner Membership starts at £200 a month for 4 hours of tutoring, and the Partner plan is £360 a month for 8 hours with the same tutor each week." },
      { q: "Can I get a quote before committing?", a: "Yes. Tailored tutoring is quoted after a short conversation, so you know the price before you commit." },
    ],
    related: { services: ["tutoring"], subjects: [], guides: ["choosing-a-private-tutor", "online-vs-face-to-face-tutoring", "signs-your-child-needs-a-tutor"] },
    enquiry: { service: "Tutoring", title: "Want a clear price?", emphasis: "Let's talk it through.", lead: "Tell us about your child and an education consultant will explain the options and quote before you commit." },
  },
  {
    slug: "online-vs-face-to-face-tutoring",
    title: "Online or face-to-face tutoring: which is better?",
    seoTitle: "Online vs Face-to-Face Tutoring | Britannia Crown",
    description: "Online and in-person tutoring both work. Here is how to decide which suits your child, the subject and your family, and how to get the most from either.",
    category: "Tutoring",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "Does online tutoring work as well as face to face?", a: "For most students from about Year 5 upwards, yes. The quality of the tutor and the match matter more than the format." },
      { q: "Is online tutoring suitable for young children?", a: "Some younger children find it harder to stay engaged on screen. A trial lesson is a good way to find out, and in-person tutoring can suit very young learners." },
      { q: "Do you offer face-to-face tutoring?", a: "Face-to-face tutoring is available on request depending on your location, and is quoted after a short conversation. Most tutoring takes place online." },
    ],
    related: { services: ["tutoring"], subjects: ["primary", "gcse-maths"], guides: ["how-much-does-a-private-tutor-cost-uk", "choosing-a-private-tutor", "signs-your-child-needs-a-tutor"] },
    enquiry: { service: "Tutoring", title: "Not sure which format suits?", emphasis: "Let's decide together.", lead: "Tell us about your child and we will recommend the format and the tutor." },
  },
  {
    slug: "signs-your-child-needs-a-tutor",
    title: "Signs your child needs a tutor (and when they don't)",
    seoTitle: "Signs Your Child Needs a Tutor | Britannia Crown",
    description: "How to tell when extra help would make a difference: the signs to look for, why to speak to the school first, and when a tutor is not the right answer.",
    category: "Tutoring",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "How do I know if my child needs a tutor?", a: "Look for patterns over several weeks: slipping grades, avoiding a subject, homework that takes far too long or a drop in confidence. Speak to the teacher to find where the gap is." },
      { q: "Should I talk to the school first?", a: "Yes. The teacher can tell you where exactly your child is struggling, which keeps any tutoring focused. For wider concerns, the school's SENCo is the right person to speak to." },
      { q: "When is a tutor not the answer?", a: "When the real issue is wellbeing, tiredness or a possible learning need that should be assessed first, or when your child is not yet ready to be helped." },
    ],
    related: { services: ["tutoring"], subjects: ["primary", "gcse-maths", "gcse-english"], guides: ["choosing-a-private-tutor", "how-much-does-a-private-tutor-cost-uk", "how-to-revise-gcse-a-level"] },
    enquiry: { service: "Tutoring", title: "Wondering if tutoring would help?", emphasis: "Let's find out.", lead: "Book a free consultation and we will give you an honest view, including when tutoring is not the answer." },
  },
  {
    slug: "how-to-choose-gcse-options",
    title: "How to choose GCSE options: a guide for parents",
    seoTitle: "How to Choose GCSE Options: A Guide for Parents | Britannia Crown",
    description: "How GCSE options work in England, what to consider when choosing, common mistakes to avoid and the questions to ask your child's school.",
    category: "Exams & Qualifications",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "When do children choose GCSE options?", a: "Usually in Year 8 or Year 9, though schools decide. Courses are then studied over Years 10 and 11." },
      { q: "Which subjects are compulsory?", a: "Most schools require English language, English literature, maths and science, with options filling the remaining places. Always check your school's own booklet." },
      { q: "Can my child change their mind?", a: "Many schools allow changes early in the course, and most routes after GCSE remain flexible, so a choice is rarely final." },
    ],
    related: { services: ["qualifications"], subjects: ["gcse-maths", "gcse-english", "gcse-science"], guides: ["gcse-grades-explained", "a-level-subject-choices-and-university", "igcse-vs-gcse"] },
    enquiry: { service: "Qualifications", title: "Choosing GCSE options?", emphasis: "Get a second opinion.", lead: "Tell us about your child and an education consultant will talk through the options with you." },
  },
  {
    slug: "a-level-subject-choices-and-university",
    title: "A-Level subject choices and university requirements",
    seoTitle: "A-Level Subject Choices and Universities | Britannia Crown",
    description: "How to choose A-Level subjects: what to think about, when universities require particular subjects, and how to keep your options open.",
    category: "Exams & Qualifications",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "How many A-Levels should my child take?", a: "Most students take three. Most universities make offers based on three, and a fourth can lower the grades in the others." },
      { q: "Do universities require specific A-Level subjects?", a: "For some courses, such as medicine, veterinary science, engineering and many sciences, yes. Always check the entry requirements on the university's own course page." },
      { q: "Can my child change subject after starting?", a: "Many sixth forms allow changes in the first few weeks, but it becomes harder after that, so choose carefully." },
    ],
    related: { services: ["qualifications"], subjects: ["a-level-maths", "a-level-chemistry", "a-level-biology", "a-level-physics"], guides: ["how-to-choose-gcse-options", "gcse-grades-explained", "how-to-revise-gcse-a-level"] },
    enquiry: { service: "Qualifications", title: "Choosing A-Levels?", emphasis: "Let's talk it through.", lead: "Tell us about your child's strengths and plans and an education consultant will help you choose." },
  },
  {
    slug: "gcse-resits-english-and-maths",
    title: "GCSE resits in English and maths: how they work",
    seoTitle: "GCSE Resits in English and Maths: How They Work | Britannia Crown",
    description: "How GCSE English and maths resits work in England, who has to retake, when the exams are held and how to improve a grade.",
    category: "Exams & Qualifications",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "Do students have to resit if they don't get a grade 4?", a: "In England, students aged 16 to 18 in post-16 education who have not reached a grade 4 in GCSE English language or maths are generally expected to keep studying the subject. Check with your sixth form or college for the details." },
      { q: "When can GCSE English and maths be resat?", a: "In the November series as well as the main summer series. Other subjects are normally resat in the summer." },
      { q: "How can a tutor help with a resit?", a: "A tutor can pinpoint the skills that cost marks the first time, fix gaps in understanding and build exam technique." },
    ],
    related: { services: ["qualifications"], subjects: ["gcse-maths", "gcse-english"], guides: ["gcse-grades-explained", "private-candidate-gcse-how-to-enter", "how-to-revise-gcse-a-level"] },
    enquiry: { service: "Qualifications", title: "Planning a resit?", emphasis: "Get a clear plan.", lead: "Tell us which subject and exam board and an education consultant will help you plan." },
  },
  {
    slug: "private-candidate-gcse-how-to-enter",
    title: "Entering GCSEs as a private candidate: how it works",
    seoTitle: "Entering GCSEs as a Private Candidate | Britannia Crown",
    description: "How to sit GCSEs or IGCSEs as a private candidate: finding an exam centre, deadlines, costs and which subjects are hardest to take privately.",
    category: "Exams & Qualifications",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "What is a private candidate?", a: "Someone who sits public exams without being enrolled as a student at the exam centre. You arrange teaching, find a centre, enter on time and pay the fees." },
      { q: "When should I start looking for an exam centre?", a: "As early as possible, often in the autumn before a summer exam, because centres set their own entry deadlines well before the exams." },
      { q: "Which subjects are hardest to take privately?", a: "Those with practical, coursework or speaking elements, such as art, drama and some languages, because the centre must be able to supervise them." },
    ],
    related: { services: ["qualifications", "home-education"], subjects: ["gcse-maths", "gcse-english", "gcse-science"], guides: ["igcse-vs-gcse", "home-education-england", "gcse-resits-english-and-maths"] },
    enquiry: { service: "Qualifications", title: "Entering exams privately?", emphasis: "Let us plan it with you.", lead: "Tell us the subjects and your timeline and an education consultant will help you plan." },
  },
  {
    slug: "ks2-sats-explained",
    title: "KS2 SATs explained: what parents need to know",
    seoTitle: "KS2 SATs Explained: What Parents Need to Know | Britannia Crown",
    description: "What KS2 SATs are, when they happen, how scaled scores work, whether they matter and how to support your child without adding pressure.",
    category: "Early Years & Primary",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "When are KS2 SATs taken?", a: "In May of Year 6, when children are aged 10 to 11. Results are reported to parents in July." },
      { q: "What does a scaled score of 100 mean?", a: "A score of 100 shows your child has met the expected standard. Scores are on a limited scale and are best seen as a broad picture rather than a precise ranking." },
      { q: "Do SATs decide which secondary school my child goes to?", a: "No. Secondary admissions follow the local authority's rules, and selective schools use their own entrance tests." },
    ],
    related: { services: ["tutoring"], subjects: ["primary"], guides: ["school-admissions-england", "choosing-a-private-tutor", "signs-your-child-needs-a-tutor"] },
    enquiry: { service: "Tutoring", title: "Want a little extra help?", emphasis: "Let's keep it calm.", lead: "Tell us about your child and an education consultant will suggest what would help, without adding pressure." },
  },
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
