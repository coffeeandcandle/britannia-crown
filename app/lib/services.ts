import type { Faq } from "./schema";

export type Service = {
  slug: string;
  numeral: string;
  name: string;
  short: string;
  headline: string;
  lead: string;
  ages: string;
  serviceType: string;
  points: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  faqs: Faq[];
  showSubjects?: boolean;
  seoTitle: string;
  seoDescription: string;
  contactValue: string;
  // Who it suits, what changes for the family, and how to start (shown above the FAQs).
  audience: string[];
  outcomes: { title: string; body: string }[];
  assurances: string[];
  start: {
    // "membership": sell the online membership tiers here; "quote": tailored, priced after a conversation.
    kind: "membership" | "quote";
    intro: string;
    // Offer to point Dubai families to, e.g. "school-search" under /uae.
    dubai?: { slug: string; label: string };
    // A 60-minute paid strategy session is also available for this service.
    strategy?: string;
  };
};

export const services: Service[] = [
  {
    slug: "tutoring",
    numeral: "I",
    name: "Private Tutoring",
    short: "UK-qualified tutors, matched personally to your child — online or face to face.",
    headline: "The right tutor, chosen for your child — not assigned from a list.",
    lead: "Every Britannia Crown tutor is a UK-trained educator. We take time to understand how your child learns, then match them with a tutor who fits — and we stay involved, so progress is overseen, not left to chance.",
    ages: "Primary to A-Level",
    serviceType: "Private tutoring",
    points: [
      { title: "UK-trained educators", body: "Tutors trained in the British curriculum, not a marketplace of unverified profiles." },
      { title: "Matched, not assigned", body: "We consider learning style, personality and goals before introducing a tutor." },
      { title: "Overseen by a consultant", body: "A dedicated consultant keeps an eye on progress and adjusts the plan as your child grows." },
      { title: "Every key stage", body: "From KS1 foundations through GCSE and A-Level exam technique." },
    ],
    steps: [
      { title: "Consultation", body: "A free 30-minute conversation about your child, their goals and where they need support." },
      { title: "Matching", body: "We introduce a tutor chosen for your child's subject, stage and temperament." },
      { title: "Ongoing oversight", body: "Regular check-ins keep learning on track and goals visible." },
    ],
    faqs: [
      {
        q: "How do you choose the right tutor for my child?",
        a: "It starts with a free consultation. We learn about your child's subjects, stage, goals and how they like to learn, then introduce a UK-trained tutor we believe is the right fit — not simply whoever is available.",
      },
      {
        q: "Is tutoring online or face to face?",
        a: "Most tutoring takes place online, which gives you access to the best-matched tutor wherever you live. Face-to-face tutoring is available on request, depending on your location.",
      },
      {
        q: "Which subjects and levels do you cover?",
        a: "We tutor across the curriculum, from primary reading, writing and maths through to GCSE and A-Level, including International GCSE (IGCSE) specifications.",
      },
      {
        q: "Will I know how my child is getting on?",
        a: "Yes. Every family has a dedicated education consultant who oversees progress, keeps you informed and adjusts the plan as your child's needs change.",
      },
      {
        q: "How much does tutoring cost?",
        a: "For ongoing online tutoring, Academic Partner Membership starts at £200 a month for 4 hours, and the full prices are on our membership page. Tailored and face-to-face tutoring is quoted after a short conversation, so you always know the price before you commit.",
      },
      {
        q: "Can my child try a tutor before we commit?",
        a: "Yes. A trial tutoring lesson is a first one-to-one lesson with a matched tutor, online, so your child can try it before committing. Ask us and we will arrange it, or start with a free 30-minute consultation.",
      },
    ],
    showSubjects: true,
    seoTitle: "UK-Trained Private Tutors | Britannia Crown",
    seoDescription:
      "UK-trained private tutors for primary, GCSE and A-Level, matched to your child and overseen by an education consultant. Online or face to face.",
    contactValue: "Tutoring",
    audience: [
      "Parents of children from primary school to A-Level who want a tutor who genuinely fits",
      "Families who have tried marketplaces or social media groups and want more reassurance about who is teaching",
      "Students preparing for GCSE, IGCSE or A-Level who need targeted, subject-specific support",
    ],
    outcomes: [
      { title: "A tutor chosen for your child", body: "We consider how your child learns, their personality and their goals before introducing anyone, so the match is right from the first lesson." },
      { title: "Confidence in who is teaching", body: "Every tutor is a UK-trained educator, personally vetted by us. You are not trusting a profile photo." },
      { title: "Progress you can see", body: "Your dedicated consultant oversees progress, keeps you informed and adjusts the plan as your child grows." },
      { title: "Help that fits your life", body: "Most tutoring is online, so you can have the best-matched tutor wherever you live. Face to face is available on request." },
    ],
    assurances: ["Free first consultation", "UK-trained, personally vetted tutors", "Online or face to face"],
    start: {
      kind: "membership",
      intro: "For ongoing online tutoring, choose a monthly membership and start straight away. For tailored or face-to-face tuition, we quote after a short conversation, so you know the price before you commit.",
    },
  },
  {
    slug: "home-education",
    numeral: "II",
    name: "Home Education",
    short: "Structured British-curriculum home education, with expert planning and support.",
    headline: "Home education with the structure of a great school.",
    lead: "Whether you are home educating by choice or by circumstance, we help you build a British-curriculum programme that is rigorous, flexible and sustainable — with specialist tutors and a consultant alongside you.",
    ages: "Early Years to Sixth Form",
    serviceType: "Home education support",
    points: [
      { title: "Curriculum planning", body: "A clear, British-curriculum roadmap for every year, so nothing is left to guesswork." },
      { title: "Specialist tutors", body: "Subject experts for the areas you'd rather not teach alone." },
      { title: "Pathway to qualifications", body: "Guidance on sitting GCSEs and A-Levels as a private candidate." },
      { title: "A consultant beside you", body: "Someone to call on when you need advice, reassurance or a change of plan." },
    ],
    steps: [
      { title: "Understand your family", body: "Your reasons, your child, your routines and your ambitions." },
      { title: "Build the programme", body: "A curriculum and timetable that fits — with tutors where they add most value." },
      { title: "Review and refine", body: "Regular reviews keep the plan responsive as your child develops." },
    ],
    faqs: [
      {
        q: "Is home education legal in England?",
        a: "Yes. Parents are legally responsible for making sure their child receives a suitable, full-time education, and that can be provided at home rather than at school. We help you plan an education that meets that standard with confidence.",
      },
      {
        q: "Do we have to follow the National Curriculum?",
        a: "No — home-educated children in England don't have to follow the National Curriculum. Many families still choose a British-curriculum structure because it keeps the route to GCSEs and A-Levels clear, and that's where we help most.",
      },
      {
        q: "Can a home-educated child take GCSEs and A-Levels?",
        a: "Yes, as a private candidate at an exam centre that accepts external candidates. Many home-educated students take International GCSEs, which generally have fewer coursework requirements. We'll help you choose subjects, exam boards and centres, and plan the timeline.",
      },
      {
        q: "How much does home education support cost?",
        a: "It depends on your child's age, subjects and how much support you want, so we quote after a short conversation. You will know the price before you commit. A free 30-minute consultation is the best first step.",
      },
    ],
    seoTitle: "Home Education Support | Britannia Crown",
    seoDescription:
      "Expert home education support for UK families: British-curriculum planning, specialist tutors and GCSE and A-Level guidance, with a dedicated consultant.",
    contactValue: "Home Education",
    audience: [
      "Families who are home educating by choice, or because circumstances have made it the right option",
      "Parents who want a British-curriculum structure without having to design it alone",
      "Families who want specialist tutors for the subjects they would rather not teach themselves",
    ],
    outcomes: [
      { title: "Structure you can trust", body: "A clear British-curriculum roadmap for every year, so nothing is left to guesswork." },
      { title: "Expert help where it counts", body: "Specialist tutors for the subjects you would rather not teach alone." },
      { title: "A clear route to qualifications", body: "Guidance on sitting GCSEs and A-Levels as a private candidate, including subjects, exam boards and centres." },
      { title: "Someone to call on", body: "A consultant beside you when you need advice, reassurance or a change of plan." },
    ],
    assurances: ["Free first consultation", "British-curriculum structure", "Early Years to Sixth Form"],
    start: {
      kind: "quote",
      intro: "Home education plans depend on your child and your family, so we agree the plan and the price together after a short conversation. You will see a clear price before you commit to anything.",
      strategy: "An in-depth 60-minute session on your home education plan, with a written summary within two working days.",
    },
  },
  {
    slug: "school-placement",
    numeral: "III",
    name: "School & Nursery Placement",
    short: "Expert advice to find, shortlist and secure the right school or nursery.",
    headline: "Finding the right school is a decision worth getting right.",
    lead: "From nursery to Sixth Form, we research, shortlist and guide you through visits and applications — with advice built around your child, your priorities and your family's practical needs.",
    ages: "Nursery to Sixth Form",
    serviceType: "School placement consultancy",
    points: [
      { title: "Advice centred on your child", body: "Recommendations built around your child, your priorities and your practical constraints." },
      { title: "Research and shortlisting", body: "We do the groundwork and present a considered shortlist." },
      { title: "Visits and applications", body: "Support through open days, assessments and the application process." },
      { title: "Every transition", body: "Starting nursery or school, moving up to secondary, Sixth Form, and moves between schools." },
    ],
    steps: [
      { title: "Brief", body: "We learn what matters most to your family — and what doesn't." },
      { title: "Shortlist", body: "A researched shortlist with honest reasoning, not a long list of names." },
      { title: "Secure", body: "Guidance through visits, applications and decisions until a place is confirmed." },
    ],
    faqs: [
      {
        q: "When should we start looking for a school?",
        a: "As early as you can — ideally a year or more ahead. For state schools in England, applications for secondary places close on 31 October and for primary (Reception) places on 15 January, in the school year before your child starts. Independent schools set their own timelines, often with assessments.",
      },
      {
        q: "Can you help if we're moving to a new area mid-year?",
        a: "Yes. Applying outside the main admissions round works differently, and places depend on availability. We'll help you understand your options in the new area and act quickly.",
      },
      {
        q: "Do you help with nurseries as well as schools?",
        a: "Yes — we support families from nursery right through to Sixth Form, so the same consultant can guide each transition.",
      },
      {
        q: "How much does school placement cost?",
        a: "In the UK it depends on your child and how much support you want, so we quote after a short conversation. You will know the price before you commit. For families moving to Dubai, School Search & Placement is a fixed £1,600 and Nursery Search & Placement a fixed £600.",
      },
    ],
    seoTitle: "School & Nursery Placement Consultants | Britannia Crown",
    seoDescription:
      "School and nursery placement advice for UK families: research, shortlisting, visits and applications from nursery to Sixth Form, with a dedicated consultant.",
    contactValue: "School Placement",
    audience: [
      "Parents choosing a nursery or school, from first nursery to Sixth Form",
      "Families moving to a new area, including mid-year moves outside the main admissions round",
      "Families facing a transition, such as moving up to secondary school or into Sixth Form",
    ],
    outcomes: [
      { title: "A shortlist with honest reasoning", body: "We do the groundwork and present a considered shortlist, not a long list of names." },
      { title: "Deadlines you will not miss", body: "In England, secondary applications close on 31 October and primary (Reception) applications on 15 January. We help you plan well ahead of them." },
      { title: "Support through every step", body: "Visits, open days, assessments and applications, all guided until a place is confirmed." },
      { title: "One consultant for every transition", body: "The same person can guide your family from nursery right through to Sixth Form." },
    ],
    assurances: ["Free first consultation", "Nursery to Sixth Form", "Clear price before you commit"],
    start: {
      kind: "quote",
      intro: "Every family's search is different, so we quote after a short conversation about your child and your priorities. You will know the price before you commit.",
      dubai: { slug: "school-search", label: "Moving to Dubai? See School Search & Placement" },
      strategy: "An in-depth 60-minute session that produces a school shortlist, with a written summary within two working days.",
    },
  },
  {
    slug: "qualifications",
    numeral: "IV",
    name: "Qualifications & Exam Success",
    short: "Expert guidance and teaching for GCSE, A-Level and the exams that shape futures.",
    headline: "Qualifications that open the right doors.",
    lead: "From GCSE and A-Level choices to exam technique, resits and private candidacy, we help students and parents make informed decisions and prepare with confidence.",
    ages: "KS4 to Sixth Form",
    serviceType: "Exam preparation and qualifications guidance",
    points: [
      { title: "GCSE and A-Level", body: "Subject teaching and exam technique led by UK-trained educators." },
      { title: "Choosing pathways", body: "Honest guidance on subject choices and routes towards university and careers." },
      { title: "Private candidates", body: "Support entering and preparing for exams outside a school setting." },
      { title: "Exam-ready confidence", body: "Practice, feedback and strategy so students walk in prepared." },
    ],
    steps: [
      { title: "Plan", body: "Map the qualifications, exam boards and timelines your child needs." },
      { title: "Prepare", body: "Targeted teaching and exam technique with a matched tutor." },
      { title: "Perform", body: "Mock exams, feedback and final preparation ahead of the real thing." },
    ],
    faqs: [
      {
        q: "What do GCSE grades 4 and 5 mean?",
        a: "GCSEs are graded 9 to 1, with 9 the highest. A grade 4 is a 'standard pass' and a grade 5 a 'strong pass'. Sixth forms often ask for a grade 6 or above in the subjects a student wants to take at A-Level.",
      },
      {
        q: "Can my child sit exams as a private candidate?",
        a: "Yes. Students who aren't at school — or who want to resit — can enter as private candidates through an exam centre that accepts them. Science A-Levels need extra planning because of the practical endorsement.",
      },
      {
        q: "When are GCSE and A-Level exams?",
        a: "The main exam series runs from May to June, with A-Level results in mid-August and GCSE results about a week later. There is also a November resit series for GCSE English Language and Maths.",
      },
      {
        q: "How much does exam support cost?",
        a: "For ongoing online tutoring, Academic Partner Membership starts at £200 a month. Tailored qualifications plans and private-candidate support are quoted after a short conversation, so you know the price before you commit.",
      },
    ],
    showSubjects: true,
    seoTitle: "GCSE & A-Level Qualifications Support | Britannia Crown",
    seoDescription:
      "GCSE and A-Level guidance, exam technique and private-candidate support from UK-trained educators, with pathway advice for students and parents.",
    contactValue: "Qualifications",
    audience: [
      "Students from Key Stage 4 to Sixth Form working towards GCSEs, IGCSEs or A-Levels",
      "Parents helping a child choose subjects and routes towards university and careers",
      "Private candidates and anyone resitting an exam outside a school setting",
    ],
    outcomes: [
      { title: "Choices made with confidence", body: "Honest guidance on subject choices and routes towards university and careers." },
      { title: "Technique as well as content", body: "UK-trained educators teach the subject and how to show what you know under exam conditions." },
      { title: "A plan with dates", body: "We map the qualifications, exam boards and timelines your child needs, so nothing is left late." },
      { title: "Walk in prepared", body: "Practice, feedback and strategy, including mock exams, ahead of the real thing." },
    ],
    assurances: ["Free first consultation", "UK-trained educators", "GCSE, IGCSE and A-Level"],
    start: {
      kind: "membership",
      intro: "For ongoing online tutoring alongside exam preparation, choose a monthly membership. For a tailored qualifications plan or private-candidate support, we quote after a short conversation.",
      dubai: { slug: "exam-preparation", label: "In Dubai? See GCSE & A-Level Preparation" },
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
