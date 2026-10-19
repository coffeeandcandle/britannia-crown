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
    ],
    showSubjects: true,
    seoTitle: "Private Tutors — UK-Trained, Personally Matched | Britannia Crown",
    seoDescription:
      "UK-trained private tutors for primary, GCSE and A-Level, matched personally to your child and overseen by a dedicated education consultant. Online or face to face.",
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
    ],
    seoTitle: "Home Education Support — British Curriculum | Britannia Crown",
    seoDescription:
      "Expert home education support for UK families: British-curriculum planning, specialist tutors and guidance on sitting GCSEs and A-Levels, with a dedicated consultant.",
    contactValue: "Home Education",
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
    ],
    seoTitle: "School & Nursery Placement Consultants | Britannia Crown",
    seoDescription:
      "School and nursery placement advice for UK families: research, shortlisting, visits and application support from nursery to Sixth Form, with a dedicated consultant.",
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
    ],
    showSubjects: true,
    seoTitle: "GCSE & A-Level Qualifications Support | Britannia Crown",
    seoDescription:
      "GCSE and A-Level guidance, exam technique and private-candidate support from UK-trained educators, with pathway advice for students and parents.",
    contactValue: "Qualifications",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
