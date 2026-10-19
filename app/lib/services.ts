export type Service = {
  slug: string;
  numeral: string;
  name: string;
  short: string;
  headline: string;
  lead: string;
  ages: string;
  points: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  seoTitle: string;
  seoDescription: string;
  contactValue: string;
};

export const services: Service[] = [
  {
    slug: "tutoring",
    numeral: "I",
    name: "Private Tutoring",
    short: "UK-qualified tutors, matched personally to your child — in person or online.",
    headline: "The right tutor, chosen for your child — not assigned from a list.",
    lead: "Every Britannia Crown tutor is a UK-trained educator. We take time to understand how your child learns, then match them with a tutor who fits — and we stay involved, so progress is overseen, not left to chance.",
    ages: "Primary to A-Level",
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
    seoTitle: "Private Tutors — UK-Qualified, Personally Matched | Britannia Crown",
    seoDescription:
      "UK-trained private tutors for primary, GCSE and A-Level, matched personally to your child and overseen by a dedicated education consultant.",
    contactValue: "Tutoring",
  },
  {
    slug: "home-education",
    numeral: "II",
    name: "Home Education",
    short: "Structured British-curriculum home education, with expert planning and support.",
    headline: "Home education with the structure of a great school.",
    lead: "Whether you are home educating by choice or by circumstance, we help you build a British-curriculum programme that is rigorous, flexible and sustainable — with specialist tutors and a consultant alongside you.",
    ages: "Early Years to Sixth Form",
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
    seoTitle: "Home Education Support — British Curriculum | Britannia Crown",
    seoDescription:
      "Expert home education support for UK families: British-curriculum planning, specialist tutors and guidance on qualifications, with a dedicated consultant.",
    contactValue: "Home Education",
  },
  {
    slug: "school-placement",
    numeral: "III",
    name: "School & Nursery Placement",
    short: "Independent advice to find, shortlist and secure the right school or nursery.",
    headline: "Finding the right school is a decision worth getting right.",
    lead: "From nursery to Sixth Form, we research, shortlist and guide you through visits and applications. Our advice is independent and centred entirely on your child — not on any school's prospectus.",
    ages: "Nursery to Sixth Form",
    points: [
      { title: "Independent advice", body: "Recommendations built around your child, your priorities and your practical constraints." },
      { title: "Research and shortlisting", body: "We do the groundwork and present a considered shortlist." },
      { title: "Visits and applications", body: "Support through open days, assessments and the application process." },
      { title: "Every transition", body: "Nursery to primary, 11+, secondary, Sixth Form, and mid-year moves." },
    ],
    steps: [
      { title: "Brief", body: "We learn what matters most to your family — and what doesn't." },
      { title: "Shortlist", body: "A researched shortlist with honest reasoning, not a long list of names." },
      { title: "Secure", body: "Guidance through visits, applications and decisions until a place is confirmed." },
    ],
    seoTitle: "School & Nursery Placement Consultants | Britannia Crown",
    seoDescription:
      "Independent school and nursery placement advice for UK families: research, shortlisting, visits and application support from nursery to Sixth Form.",
    contactValue: "School Placement",
  },
  {
    slug: "qualifications",
    numeral: "IV",
    name: "Qualifications & Exam Success",
    short: "Expert guidance and teaching for GCSE, A-Level and the exams that shape futures.",
    headline: "Qualifications that open the right doors.",
    lead: "From GCSE and A-Level choices to exam technique, resits and private candidacy, we help students and parents make informed decisions and prepare with confidence.",
    ages: "KS4 to Sixth Form",
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
    seoTitle: "GCSE & A-Level Qualifications Support | Britannia Crown",
    seoDescription:
      "GCSE and A-Level guidance, exam technique and private-candidate support from UK-trained educators, with pathway advice for students and parents.",
    contactValue: "Qualifications",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
