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
    slug: "how-to-help-your-child-with-maths-at-home",
    title: "How to help your child with maths at home",
    seoTitle: "How to Help Your Child With Maths at Home | Britannia Crown",
    description: "Practical ways parents can help with maths at home, from primary number skills to GCSE, and how to tell when a tutor would help.",
    category: "Tutoring",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "Do I need to be good at maths to help?", a: "No. Confidence, regular short practice and asking your child to explain their thinking help more than knowing the answers." },
      { q: "How much should we practise?", a: "Little and often works best. Ten focused minutes a day is more useful than one long session a week." },
      { q: "When should we consider a tutor?", a: "When there is a clear gap, falling confidence, a big exam ahead or homework is becoming a battle at home." },
    ],
    related: { services: ["tutoring"], subjects: ["primary", "gcse-maths", "a-level-maths"], guides: ["signs-your-child-needs-a-tutor", "how-to-revise-gcse-a-level", "gcse-grades-explained"] },
    enquiry: { service: "Tutoring", title: "Struggling with maths at home?", emphasis: "Let's help.", lead: "Tell us about your child and an education consultant will suggest the right level of support." },
  },
  {
    slug: "how-to-improve-gcse-english-language-and-literature",
    title: "How to improve GCSE English Language and Literature",
    seoTitle: "Improve GCSE English Language and Literature | Britannia Crown",
    description: "How the two English GCSEs work, what examiners reward and practical habits that raise grades, from planning answers to using quotations.",
    category: "Exams & Qualifications",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "What is the difference between English Language and Literature?", a: "Language tests reading unfamiliar texts and writing for different purposes. Literature tests knowledge of set texts and the ability to analyse them in essays." },
      { q: "Why do students lose marks in English?", a: "Most often by not answering the exact question, describing instead of analysing, or not backing points with short, well-chosen evidence." },
      { q: "Can a tutor help with English?", a: "Yes. A tutor who knows the exam boards can show where marks are lost and teach planning, analysis and timed writing." },
    ],
    related: { services: ["qualifications", "tutoring"], subjects: ["gcse-english"], guides: ["gcse-grades-explained", "gcse-resits-english-and-maths", "how-to-revise-gcse-a-level"] },
    enquiry: { service: "Qualifications", title: "Stuck on a grade in English?", emphasis: "Let's find the marks.", lead: "Tell us the exam board and where marks are being lost and an education consultant will suggest a plan." },
  },
  {
    slug: "gcse-science-combined-or-separate",
    title: "GCSE science: combined or separate (triple) science?",
    seoTitle: "GCSE Science: Combined or Triple Science? | Britannia Crown",
    description: "The difference between combined and separate GCSE sciences, which suits your child, and how the choice can affect A-Level science options.",
    category: "Exams & Qualifications",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "What is the difference between combined and triple science?", a: "Combined science covers biology, chemistry and physics in one course worth two GCSEs, with a double grade. Separate sciences are three GCSEs, each graded 9 to 1." },
      { q: "Do you need triple science for A-Level science?", a: "Requirements vary. Some sixth forms prefer separate sciences for some subjects, while others accept strong combined grades, so check your sixth form's published entry requirements." },
      { q: "Is combined science easier?", a: "It covers less depth, but grades matter more than the route. A secure combined result is more useful than a weak triple science result." },
    ],
    related: { services: ["qualifications"], subjects: ["gcse-science", "a-level-chemistry", "a-level-biology", "a-level-physics"], guides: ["how-to-choose-gcse-options", "a-level-subject-choices-and-university", "gcse-grades-explained"] },
    enquiry: { service: "Qualifications", title: "Choosing a science route?", emphasis: "Let's decide together.", lead: "Tell us about your child's strengths and plans and an education consultant will help you choose." },
  },
  {
    slug: "exam-access-arrangements-extra-time",
    title: "Exam access arrangements: extra time and other adjustments",
    seoTitle: "Exam Access Arrangements and Extra Time | Britannia Crown",
    description: "How access arrangements such as extra time, rest breaks and readers work for GCSE and A-Level, who applies, what evidence is needed and when to start.",
    category: "Exams & Qualifications",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "What are access arrangements?", a: "Changes to how an exam is taken, such as extra time or a reader, that remove a barrier for a student with a disability or learning difficulty without giving an unfair advantage." },
      { q: "Who applies for them?", a: "The school or exam centre applies on the student's behalf, usually led by the SENCo, and they must be approved before the exam." },
      { q: "Do they need to be the student's normal way of working?", a: "Generally yes. Centres need to show the arrangement is already used in lessons and mock exams, so start early." },
    ],
    related: { services: ["qualifications", "tutoring"], subjects: [], guides: ["private-candidate-gcse-how-to-enter", "gcse-resits-english-and-maths", "how-to-support-a-child-through-exam-stress"] },
    enquiry: { service: "Qualifications", title: "Planning exam adjustments?", emphasis: "Let's plan the timeline.", lead: "Tell us about your child's needs and an education consultant will help you plan the evidence and the conversation with the school." },
  },
  {
    slug: "results-day-gcse-a-level-what-to-do",
    title: "Results day: what to do after GCSE and A-Level results",
    seoTitle: "Results Day: What to Do Next | Britannia Crown",
    description: "What to do on GCSE and A-Level results day: clearing, adjustment, reviews of marking, resits and alternative routes, and how to support your child.",
    category: "Exams & Qualifications",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "When are GCSE and A-Level results released?", a: "A-Level results come out in mid-August and GCSE results about a week later." },
      { q: "What can we do if A-Level grades are lower than needed?", a: "Speak to the university, look at Clearing, consider a review of marking, a resit or another route such as an apprenticeship or gap year." },
      { q: "Can marks go down after a review?", a: "Yes. Marks can go up, stay the same or go down, so ask the school's exams officer before requesting one." },
    ],
    related: { services: ["qualifications"], subjects: ["gcse-maths", "gcse-english"], guides: ["gcse-resits-english-and-maths", "gcse-grades-explained", "how-to-support-a-child-through-exam-stress"] },
    enquiry: { service: "Qualifications", title: "Unsure what to do after results?", emphasis: "Let's plan the next step.", lead: "Tell us the results and your child's plans and an education consultant will talk through the options." },
  },
  {
    slug: "how-to-support-a-child-through-exam-stress",
    title: "How to support a child through exam stress",
    seoTitle: "How to Support a Child Through Exam Stress | Britannia Crown",
    description: "Signs of exam stress, practical ways parents can help, what to do on exam day and when to seek further support.",
    category: "Exams & Qualifications",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "Is some exam stress normal?", a: "Yes. Some nerves can help focus the mind. Persistent distress, sleep problems or panic are signs that more support is needed." },
      { q: "What is the most helpful thing a parent can do?", a: "Keep routines steady, make revision manageable, listen without rushing to fix, and keep expectations realistic." },
      { q: "When should I speak to the school or GP?", a: "If your child is persistently very low or anxious, not sleeping or eating, having panic attacks or avoiding school or exams. Seek urgent help if you are worried about their safety." },
    ],
    related: { services: ["tutoring", "qualifications"], subjects: [], guides: ["how-to-revise-gcse-a-level", "exam-access-arrangements-extra-time", "results-day-gcse-a-level-what-to-do"] },
    enquiry: { service: "Tutoring", title: "Is revision overwhelming?", emphasis: "Let's make a plan.", lead: "Tell us about your child and an education consultant will suggest how to make revision calmer and clearer." },
  },
  {
    slug: "phonics-and-learning-to-read-in-england",
    title: "Phonics and learning to read: a guide for parents",
    seoTitle: "Phonics and Learning to Read | Britannia Crown",
    description: "How phonics works in English schools, what the Year 1 phonics screening check involves and practical ways to help your child learn to read at home.",
    category: "Early Years & Primary",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "What is phonics?", a: "A way of teaching children the sounds that letters and letter groups make and how to blend them to read words." },
      { q: "What is the Year 1 phonics check?", a: "A short one-to-one check in June in which children read 40 words, some of them made-up. The threshold is published each year, and children who do not meet it get extra support and usually retake it in Year 2." },
      { q: "How can I help my child at home?", a: "Read together every day, listen to them sound out words, use pure sounds, play sound games and keep sessions short and positive." },
    ],
    related: { services: ["tutoring"], subjects: ["primary"], guides: ["ks2-sats-explained", "starting-reception-what-to-expect", "signs-your-child-needs-a-tutor"] },
    enquiry: { service: "Tutoring", title: "Worried about reading?", emphasis: "Let's help gently.", lead: "Tell us about your child and an education consultant will suggest the right support." },
  },
  {
    slug: "starting-reception-what-to-expect",
    title: "Starting Reception: what to expect and how to prepare",
    seoTitle: "Starting Reception: What to Expect | Britannia Crown",
    description: "When children start school in England, what happens in Reception, how to prepare and what to know about summer-born children and delayed entry.",
    category: "Early Years & Primary",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "When does my child start school?", a: "Most children start Reception in the September after they turn four. Children must be in education from the term after their fifth birthday." },
      { q: "Can summer-born children start later?", a: "Parents of summer-born children can request a later start in Reception at compulsory school age. The admission authority considers each request, so ask early." },
      { q: "Do children need to read before starting?", a: "No. Independence, language, social skills and familiar routines matter most." },
    ],
    related: { services: ["school-placement"], subjects: ["primary"], guides: ["school-admissions-england", "how-to-choose-a-nursery-england", "phonics-and-learning-to-read-in-england"] },
    enquiry: { service: "School Placement", title: "Choosing a primary school?", emphasis: "We can help.", lead: "Tell us your area and your child's age and an education consultant will help you plan applications." },
  },
  {
    slug: "home-education-curriculum-choices",
    title: "Home education curriculum choices: what should we teach?",
    seoTitle: "Home Education Curriculum Choices | Britannia Crown",
    description: "The main approaches to home education curriculum in England, how to choose what suits your child and how to plan the route to GCSEs.",
    category: "Home Education",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "Do home educators have to follow the National Curriculum?", a: "No. You must provide a suitable, efficient, full-time education, but there is no requirement to follow a set curriculum or timetable." },
      { q: "Which curriculum is best?", a: "There is no single best. Many families follow a British-curriculum structure for a clear route to GCSEs and A-Levels, while others use boxed programmes, child-led learning or a mix." },
      { q: "When should I plan for GCSEs?", a: "Around 18 to 24 months ahead, choosing subjects and boards, finding an exam centre and checking deadlines." },
    ],
    related: { services: ["home-education"], subjects: ["gcse-maths", "gcse-english"], guides: ["how-to-start-home-education-england", "home-education-england", "private-candidate-gcse-how-to-enter"] },
    enquiry: { service: "Home Education", title: "Planning a curriculum?", emphasis: "Let's design it together.", lead: "Tell us about your child and an education consultant will help you plan a programme that fits." },
  },
  {
    slug: "returning-to-the-uk-with-children-school-places",
    title: "Returning to the UK with children: finding school places",
    seoTitle: "Returning to the UK: School Places | Britannia Crown",
    description: "How to find school places when returning to the UK from abroad: applying in-year, documents, curriculum differences and keeping learning going.",
    category: "Moving & International Families",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "When can I apply for a school place?", a: "Councils usually need a UK address, though some accept applications with evidence of a confirmed move. Contact your new local authority early." },
      { q: "Are school places guaranteed when we return?", a: "No. Places depend on availability, and oversubscription criteria apply. Apply to several schools and ask about waiting lists." },
      { q: "How can we avoid a gap in learning?", a: "Plan reading, maths practice and, if helpful, tutoring in the weeks before a place is confirmed, and ask the new school how it will assess and settle your child." },
    ],
    related: { services: ["school-placement", "tutoring"], subjects: [], guides: ["in-year-school-admissions-moving-mid-year", "school-admissions-england", "igcse-vs-gcse"] },
    enquiry: { service: "School Placement", title: "Returning to the UK?", emphasis: "We can plan it.", lead: "Tell us your dates and area and an education consultant will help you plan schools and timing." },
  },
  {
    slug: "how-school-admissions-criteria-work",
    title: "How school admissions criteria work (and how to read them)",
    seoTitle: "How School Admissions Criteria Work | Britannia Crown",
    description: "How oversubscription criteria decide who gets a place at a state school: siblings, distance, catchment, faith, and how to read a school's admission policy.",
    category: "Choosing a School",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "What are oversubscription criteria?", a: "The published rules a state school uses to rank applicants when it has more applicants than places. Each school's admission authority sets the order, within the national School Admissions Code." },
      { q: "Does living in the catchment area guarantee a place?", a: "No. If a school is oversubscribed, children are ranked by its criteria, and catchment is only one of them. Some schools have no catchment at all." },
      { q: "How is distance measured?", a: "Usually as a straight line from your home to the school gate, though some schools or authorities use walking distance. The admission policy states exactly how." },
    ],
    related: { services: ["school-placement"], subjects: ["primary"], guides: ["school-admissions-england", "school-admission-appeals-england", "questions-to-ask-when-visiting-a-school"] },
    enquiry: { service: "School Placement", title: "Reading the admission rules?", emphasis: "Let's talk it through.", lead: "Tell us your postcode and the schools you like and an education consultant will explain your realistic chances." },
  },
  {
    slug: "school-admission-appeals-england",
    title: "School admission appeals in England: how they work",
    seoTitle: "School Admission Appeals in England | Britannia Crown",
    description: "Your right to appeal a refused school place in England, the deadlines, what the panel considers, infant class size appeals and how to prepare a strong case.",
    category: "Choosing a School",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "How long do I have to appeal?", a: "The refusal letter gives the deadline. For the main admissions round it must allow at least 20 school days from the date of the letter, but do not leave it to the last day." },
      { q: "What does the appeal panel consider?", a: "Whether the admission arrangements were lawful and applied correctly to your child, and then whether the harm to the school of admitting your child outweighs the harm to your child of being refused." },
      { q: "Why are infant class size appeals harder?", a: "The law limits a class in Reception, Year 1 and Year 2 to 30 children per teacher, so a panel can uphold the appeal only on narrow grounds." },
    ],
    related: { services: ["school-placement"], subjects: ["primary"], guides: ["how-school-admissions-criteria-work", "school-admissions-england", "in-year-school-admissions-moving-mid-year"] },
    enquiry: { service: "School Placement", title: "Preparing an appeal?", emphasis: "We can help.", lead: "Tell us about your refusal and the deadline and an education consultant will help you plan your case." },
  },
  {
    slug: "in-year-school-admissions-moving-mid-year",
    title: "In-year school admissions: finding a place when you move mid-year",
    seoTitle: "In-Year School Admissions: Moving Mid-Year | Britannia Crown",
    description: "How to apply for a school place outside the main admissions round in England: who handles applications, waiting lists, moving from abroad and what to do if refused.",
    category: "Choosing a School",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "How do I apply for a school place mid-year?", a: "Check your local authority's website. In some areas the council handles in-year applications, and in others you apply directly to each school." },
      { q: "Is a place guaranteed if I move?", a: "No. Places depend on availability in the year group, and oversubscription criteria apply if there are more applicants than places." },
      { q: "What if my child has no school place?", a: "Tell the local authority, which has duties to help. Some vulnerable children are covered by fair access protocols that give them priority." },
    ],
    related: { services: ["school-placement"], subjects: [], guides: ["how-school-admissions-criteria-work", "school-admission-appeals-england", "questions-to-ask-when-visiting-a-school"] },
    enquiry: { service: "School Placement", title: "Moving mid-year?", emphasis: "We can move fast.", lead: "Tell us your dates and area and an education consultant will help you find and apply for the right school." },
  },
  {
    slug: "11-plus-and-grammar-schools-explained",
    title: "The 11-plus and grammar schools explained",
    seoTitle: "The 11-Plus and Grammar Schools Explained | Britannia Crown",
    description: "What grammar schools and the 11-plus are, how the test and applications work, whether a pass guarantees a place and how to prepare without pressure.",
    category: "Choosing a School",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "What is the 11-plus?", a: "An entrance test for selective grammar schools, usually taken in Year 6. The content varies by area but often includes English, maths and reasoning." },
      { q: "Does passing guarantee a grammar school place?", a: "No. If the school is oversubscribed it ranks children who qualify using its criteria or scores, and you must still apply through your local authority." },
      { q: "Should my child have tuition for the 11-plus?", a: "Preparation is optional. If you prepare, focus on core skills and familiarity with the format, and keep it proportionate." },
    ],
    related: { services: ["school-placement", "tutoring"], subjects: ["primary"], guides: ["how-school-admissions-criteria-work", "school-admissions-england", "independent-school-entry-assessments-and-bursaries"] },
    enquiry: { service: "School Placement", title: "Thinking about the 11-plus?", emphasis: "Let's plan it calmly.", lead: "Tell us your area and your child's age and an education consultant will explain what is involved." },
  },
  {
    slug: "independent-school-entry-assessments-and-bursaries",
    title: "Independent school entry: assessments, scholarships and bursaries",
    seoTitle: "Independent School Entry and Bursaries | Britannia Crown",
    description: "How independent school admissions work in the UK: entry points, assessments, early registration, and how scholarships and bursaries differ.",
    category: "Choosing a School",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "When do children usually enter independent schools?", a: "Common entry points are ages 4, 7, 11 and 13, with some schools also admitting at sixth form. Each school sets its own process and dates." },
      { q: "What is the difference between a scholarship and a bursary?", a: "Scholarships reward talent in areas such as academics, music, sport or art. Bursaries are means-tested help with fees based on family finances." },
      { q: "How early should I register?", a: "Many popular schools ask families to register early, sometimes a year or more ahead, so contact them as soon as you are interested." },
    ],
    related: { services: ["school-placement"], subjects: ["primary"], guides: ["11-plus-and-grammar-schools-explained", "how-school-admissions-criteria-work", "questions-to-ask-when-visiting-a-school"] },
    enquiry: { service: "School Placement", title: "Considering independent schools?", emphasis: "Let's compare them.", lead: "Tell us about your child and an education consultant will help you shortlist and plan registration." },
  },
  {
    slug: "how-to-choose-a-nursery-england",
    title: "How to choose a nursery in England",
    seoTitle: "How to Choose a Nursery in England | Britannia Crown",
    description: "How nurseries, preschools and childminders work in England, what to look for on a visit, questions to ask and how to think about costs and funded hours.",
    category: "Early Years & Primary",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "What is the EYFS?", a: "The Early Years Foundation Stage sets out how children from birth to the end of Reception learn, develop and are kept safe in registered early years settings." },
      { q: "How do I check a nursery's inspection report?", a: "Registered settings are inspected and reports are published on Ofsted's website. Read the detail, not just the headline, and visit in person too." },
      { q: "Is there funding for early years care?", a: "Many families are eligible for government-funded hours depending on the child's age and circumstances. Rules change, so check the official childcare information or ask the nursery." },
    ],
    related: { services: ["school-placement"], subjects: ["primary"], guides: ["school-admissions-england", "how-school-admissions-criteria-work", "ks2-sats-explained"] },
    enquiry: { service: "School Placement", title: "Choosing a nursery?", emphasis: "We can help.", lead: "Tell us your area and your child's age and an education consultant will help you shortlist and visit." },
  },
  {
    slug: "questions-to-ask-when-visiting-a-school",
    title: "Questions to ask when visiting a school",
    seoTitle: "Questions to Ask When Visiting a School | Britannia Crown",
    description: "What to look for on a school visit and the questions worth asking about teaching, behaviour, wellbeing, practical matters and admissions.",
    category: "Choosing a School",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "What should I look for on a school visit?", a: "Watch how staff speak to pupils, how children behave and whether the atmosphere feels calm and purposeful. People matter more than buildings." },
      { q: "How many schools should we visit?", a: "More than one, so you can compare. If possible, see a normal school day as well as an open event." },
      { q: "What questions should I ask about behaviour and wellbeing?", a: "How the school handles behaviour and bullying in practice, who a worried child goes to, and how it supports wellbeing and special educational needs." },
    ],
    related: { services: ["school-placement"], subjects: [], guides: ["how-school-admissions-criteria-work", "school-admissions-england", "in-year-school-admissions-moving-mid-year"] },
    enquiry: { service: "School Placement", title: "Comparing schools?", emphasis: "Get a second opinion.", lead: "Tell us about your child and an education consultant will help you compare the schools you have seen." },
  },
  {
    slug: "how-to-start-home-education-england",
    title: "How to start home education in England",
    seoTitle: "How to Start Home Education in England | Britannia Crown",
    description: "The first steps to home educating in England: what the law says, how to withdraw from school, choosing an approach, records and exams.",
    category: "Home Education",
    published: "2026-10-20",
    updated: "2026-10-20",
    faqs: [
      { q: "Do I need permission to home educate?", a: "In most cases no. If your child is on a school roll you write to the head teacher to withdraw them. If they attend a special school under a local authority arrangement, consent may be needed first." },
      { q: "Do I have to follow the National Curriculum?", a: "No, but you must provide an efficient, full-time education suitable to your child's age, ability and aptitude and any special educational needs." },
      { q: "Can home-educated children take GCSEs?", a: "Yes, as private candidates at an exam centre that accepts external entries, so plan early because centres set their own deadlines." },
    ],
    related: { services: ["home-education"], subjects: ["gcse-maths", "gcse-english"], guides: ["home-education-england", "private-candidate-gcse-how-to-enter", "igcse-vs-gcse"] },
    enquiry: { service: "Home Education", title: "Thinking about home education?", emphasis: "Let's plan it together.", lead: "Tell us about your family and an education consultant will help you plan a programme that works." },
  },
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
