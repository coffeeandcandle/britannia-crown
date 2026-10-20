import type { Faq } from "./schema";

export type Subject = {
  slug: string;
  level: "Primary" | "GCSE" | "A-Level";
  name: string;
  tagline: string;
  lead: string;
  glance: { label: string; value: string }[];
  help: { title: string; body: string }[];
  faqs: Faq[];
  related: string[];
  seoTitle: string;
  seoDescription: string;
};

export const levels: Subject["level"][] = ["Primary", "GCSE", "A-Level"];

export const subjects: Subject[] = [
  {
    slug: "primary",
    level: "Primary",
    name: "Primary School",
    tagline: "building confidence that lasts.",
    lead: "The primary years lay the foundations for everything that follows. Our tutors help children read with fluency and understanding, become confident with number and write clearly, while keeping learning positive, so children enjoy making progress.",
    glance: [
      { label: "Key Stage 1", value: "Years 1 and 2 (ages 5 to 7)" },
      { label: "Key Stage 2", value: "Years 3 to 6 (ages 7 to 11)" },
      { label: "National checks (England)", value: "Phonics screening in Year 1; multiplication tables check in Year 4" },
      { label: "Year 6 SATs", value: "Key Stage 2 tests in May, reported as scaled scores" },
    ],
    help: [
      { title: "Reading", body: "From phonics to comprehension, we help children read fluently and talk confidently about what they've read." },
      { title: "Number fluency", body: "Secure times tables, place value and fractions make every later maths topic easier. We make sure the basics are rock solid." },
      { title: "Writing", body: "We help children plan, structure and punctuate their writing, so their ideas come across clearly." },
      { title: "Confidence", body: "Short, encouraging sessions build the self-belief that helps children try harder questions and keep going." },
    ],
    faqs: [
      {
        q: "How are Year 6 SATs results reported?",
        a: "Results are given as scaled scores from 80 to 120. A score of 100 or more means a child has met the expected standard.",
      },
      {
        q: "Is my child too young for a tutor?",
        a: "Not usually. Short, engaging sessions can help children from Key Stage 1 onwards, whether they need to catch up or would benefit from more challenge.",
      },
      {
        q: "Can you support a child who is ahead?",
        a: "Yes. Tutoring isn't only for catching up. We can stretch confident learners with challenge that goes beyond the classroom.",
      },
    ],
    related: ["gcse-english", "gcse-maths"],
    seoTitle: "Primary Tutors | KS1, KS2 & SATs Support | Britannia Crown",
    seoDescription:
      "Primary tutoring for Key Stage 1 and 2: reading, writing, maths and Year 6 SATs preparation from UK-trained educators, personally matched to your child.",
  },
  {
    slug: "gcse-maths",
    level: "GCSE",
    name: "GCSE Maths",
    tagline: "built on understanding, not memorising.",
    lead: "A strong GCSE Maths grade opens doors to A-Levels, apprenticeships and university, and a grade 4 or above is widely expected by sixth forms, colleges and employers. Our UK-trained tutors close gaps, build problem-solving confidence and make sure your child knows exactly how marks are won and lost on each paper.",
    glance: [
      { label: "Grades", value: "9 to 1, with 4 a standard pass and 5 a strong pass" },
      { label: "Tiers", value: "Foundation (grades 1–5) or Higher (grades 4–9)" },
      { label: "Exams", value: "Three 1 hour 30 minute papers, one without a calculator" },
      { label: "Exam boards", value: "AQA, Pearson Edexcel and OCR, plus International GCSE" },
    ],
    help: [
      { title: "Multi-step problem solving", body: "Many questions combine several topics in an unfamiliar context. We teach students to break problems into steps they recognise, rather than freezing when a question looks new." },
      { title: "The non-calculator paper", body: "Fluency with fractions, percentages, ratio and mental methods makes the non-calculator paper far less daunting, and frees up time for harder questions." },
      { title: "Choosing the right tier", body: "Foundation caps at grade 5; Higher is needed for grades 6 to 9. We help you understand what your child is capable of, so the right entry decision can be made with their school." },
      { title: "Method marks and exam technique", body: "Clear working earns marks even when the final answer is wrong. We build the habits, showing method, checking units, reading the question twice. That protect every mark." },
    ],
    faqs: [
      {
        q: "What grade does my child need in GCSE Maths?",
        a: "A grade 4 is a 'standard pass' and a grade 5 a 'strong pass'. Sixth forms often ask for a 6 or 7 to study A-Level Maths. In England, students who don't achieve at least a grade 4 generally have to keep studying maths after 16.",
      },
      {
        q: "Should my child sit Foundation or Higher tier?",
        a: "Foundation papers allow grades 1 to 5; Higher papers allow grades 4 to 9. If your child is aiming for a 6 or above, they'll need Higher. Schools make the final entry decision, and tutoring can help show what your child is capable of.",
      },
      {
        q: "When should GCSE Maths tutoring start?",
        a: "Ideally in Year 10 or earlier, so there's time to close gaps before revision season. Focused support in Year 11 can still make a real difference, especially on exam technique.",
      },
      {
        q: "Do you tutor IGCSE Maths?",
        a: "Yes. International GCSE Maths is common in independent schools and for private candidates, and we'll match your child with a tutor who knows their specification.",
      },
    ],
    related: ["a-level-maths", "gcse-science", "gcse-english"],
    seoTitle: "GCSE Maths Tutors (UK-Trained) | Britannia Crown",
    seoDescription:
      "GCSE Maths tutoring from UK-trained educators. Foundation and Higher tier, AQA, Edexcel, OCR and IGCSE, matched to your child and overseen by a consultant.",
  },
  {
    slug: "gcse-english",
    level: "GCSE",
    name: "GCSE English",
    tagline: "for readers and writers who think for themselves.",
    lead: "Most students take two English GCSEs, Language and Literature, and both reward independent thinking, precise analysis and confident writing under time pressure. Our tutors help students move beyond spotting techniques to explaining their effects, and to write with structure, control and flair.",
    glance: [
      { label: "Qualifications", value: "English Language and English Literature, two separate GCSEs" },
      { label: "English Language", value: "Two exams on reading and writing, plus a spoken language endorsement" },
      { label: "English Literature", value: "Closed-book exams on Shakespeare, a 19th-century novel, a modern text and poetry" },
      { label: "Grades", value: "9 to 1, with 4 a standard pass and 5 a strong pass" },
    ],
    help: [
      { title: "Analysis that goes deeper", body: "Top grades come from explaining how and why a writer creates an effect, not just naming the technique. We model precise, perceptive analysis until it becomes second nature." },
      { title: "Writing with control", body: "Creative and persuasive writing are marked on structure, vocabulary and accuracy. We practise planning quickly and writing with purpose under timed conditions." },
      { title: "Knowing the set texts", body: "Literature exams are closed book, so students need key quotations, characters, themes and context at their fingertips. We build that knowledge methodically." },
      { title: "Unseen texts and poetry", body: "Unfamiliar extracts and unseen poems unsettle many students. A reliable approach to reading and annotating makes them an opportunity rather than a risk." },
    ],
    faqs: [
      {
        q: "Is GCSE English Literature closed book?",
        a: "Yes. Students can't take their texts into the exam, so they need to know key quotations, characters, themes and context well. Some questions print an extract, but the rest relies on what students remember.",
      },
      {
        q: "Does my child need a grade 4 in English?",
        a: "A grade 4 is the 'standard pass', and many sixth forms, colleges and employers expect it. In England, students who don't achieve at least a grade 4 in English generally have to keep studying it after 16.",
      },
      {
        q: "Can you help with my child's set texts?",
        a: "Yes. Tell us the texts and exam board your child's school uses, Macbeth, A Christmas Carol and An Inspector Calls are common examples, and we'll match a tutor who knows them well.",
      },
    ],
    related: ["gcse-maths", "gcse-science", "primary"],
    seoTitle: "GCSE English Tutors: Language & Literature | Britannia Crown",
    seoDescription:
      "GCSE English Language and Literature tutoring from UK-trained educators: analysis, essay writing, set texts and exam technique, matched to your child.",
  },
  {
    slug: "gcse-science",
    level: "GCSE",
    name: "GCSE Science",
    tagline: "from required practicals to six-mark answers.",
    lead: "Whether your child is taking Combined Science or the three separate sciences, GCSE Science demands secure knowledge, confident maths and the ability to explain clearly. Our tutors make the content manageable and teach the exam skills that turn understanding into marks.",
    glance: [
      { label: "Routes", value: "Combined Science (worth two GCSEs) or separate Biology, Chemistry and Physics" },
      { label: "Grades", value: "9-9 to 1-1 for Combined Science; 9 to 1 for each separate science" },
      { label: "Tiers", value: "Foundation or Higher, as in GCSE Maths" },
      { label: "Practicals", value: "Required practicals are assessed through questions in the written exams" },
    ],
    help: [
      { title: "Required practicals", body: "Exams test how practicals are planned and carried out: variables, accuracy, results and conclusions. We make sure students can explain each one confidently." },
      { title: "Maths in science", body: "Calculations, graphs and rearranging equations appear across all three sciences, particularly physics. We build the maths fluency science questions assume." },
      { title: "Extended answers", body: "Longer six-mark questions reward clear, logically ordered explanations. We teach a structure students can rely on under pressure." },
      { title: "A lot of content", body: "Three sciences add up to a great deal to remember. Regular retrieval practice and a clear revision plan keep knowledge secure through to the exams." },
    ],
    faqs: [
      {
        q: "What's the difference between Combined and Triple Science?",
        a: "Combined Science covers biology, chemistry and physics and is worth two GCSEs. Triple Science means three separate GCSEs with more content in each. Both can lead to science A-Levels, though sixth forms set their own entry requirements.",
      },
      {
        q: "Can one tutor cover all three sciences?",
        a: "Often, yes, particularly for Combined Science. For Triple Science, or students aiming for the very top grades, we may suggest a specialist for the subject your child finds hardest.",
      },
      {
        q: "Do you tutor IGCSE Science?",
        a: "Yes. We also support International GCSE sciences, which are common in independent schools and for private candidates.",
      },
    ],
    related: ["a-level-chemistry", "a-level-biology", "a-level-physics"],
    seoTitle: "GCSE Science Tutors: Bio, Chem & Physics | Britannia Crown",
    seoDescription:
      "GCSE Combined and Triple Science tutoring from UK-trained educators: required practicals, maths skills and exam technique, personally matched to your child.",
  },
  {
    slug: "a-level-maths",
    level: "A-Level",
    name: "A-Level Maths",
    tagline: "for the leap beyond GCSE.",
    lead: "A-Level Maths is required or preferred for many university courses in science, engineering, economics and beyond, and it is one of the biggest steps up from GCSE. Our tutors strengthen the algebra everything else depends on, then build the reasoning and problem-solving the top grades require.",
    glance: [
      { label: "Content", value: "Pure maths (about two-thirds), plus statistics and mechanics" },
      { label: "Exams", value: "Three 2-hour papers at the end of the two-year course" },
      { label: "Calculators", value: "Allowed in all papers" },
      { label: "Grades", value: "A* to E" },
    ],
    help: [
      { title: "The step up from GCSE", body: "Fluent algebra is the foundation of every topic. We close any GCSE gaps early so new content has something solid to build on." },
      { title: "Proof and reasoning", body: "Students must construct mathematical arguments, not just reach answers. We teach clear, logical written reasoning." },
      { title: "Statistics and the large data set", body: "Each exam board sets a large data set students are expected to know. We make sure your child is familiar with it and can interpret it in context." },
      { title: "Mechanics and modelling", body: "Turning a physical situation into a mathematical model is a distinct skill. We practise it until it feels routine." },
    ],
    faqs: [
      {
        q: "How is A-Level Maths assessed?",
        a: "Entirely by exams at the end of the course: three papers of two hours each, covering pure maths, statistics and mechanics. Calculators are allowed throughout.",
      },
      {
        q: "How much harder is A-Level Maths than GCSE?",
        a: "It's a significant step up, mainly because of the algebra and the depth of reasoning required. Students who secure their GCSE foundations early usually make the transition far more comfortably.",
      },
      {
        q: "When is the best time to start A-Level Maths tutoring?",
        a: "Early in Year 12 is ideal, before small gaps become big ones. Many students also benefit from targeted support before the Year 13 exams.",
      },
    ],
    related: ["gcse-maths", "a-level-physics", "a-level-chemistry"],
    seoTitle: "A-Level Maths Tutors (UK-Trained) | Britannia Crown",
    seoDescription:
      "A-Level Maths tutoring from UK-trained educators: pure maths, statistics, mechanics and exam technique for AQA, Edexcel and OCR, matched to your child.",
  },
  {
    slug: "a-level-chemistry",
    level: "A-Level",
    name: "A-Level Chemistry",
    tagline: "where understanding beats memorising.",
    lead: "A-Level Chemistry is a gateway to medicine, pharmacy, chemical engineering and many other degrees, and it rewards students who understand why reactions happen, not just what happens. Our tutors untangle the trickiest topics and build the calculation and practical skills the exams test.",
    glance: [
      { label: "Exams", value: "Three written papers at the end of the two-year course" },
      { label: "Practical endorsement", value: "Reported separately as Pass or Not Classified" },
      { label: "Maths", value: "At least 20% of marks assess mathematical skills" },
      { label: "Grades", value: "A* to E" },
    ],
    help: [
      { title: "Organic mechanisms", body: "Curly arrows and reaction pathways cause many students difficulty. We teach the logic behind mechanisms so they can be worked out, not just recalled." },
      { title: "Chemical calculations", body: "Moles, equilibrium constants, pH and energetics calculations appear throughout. We build accuracy and confidence step by step." },
      { title: "Practical skills on paper", body: "Written exams include questions on practical methods, data and uncertainty. We make sure students can analyse and evaluate experiments confidently." },
      { title: "Connecting topics", body: "The best answers link ideas across physical, inorganic and organic chemistry. We help students see the connections examiners reward." },
    ],
    faqs: [
      {
        q: "What is the A-Level practical endorsement?",
        a: "Over the course, students carry out at least 12 practical activities and are assessed on their practical competence by their teachers. The result, Pass or Not Classified, is reported alongside their A-Level grade.",
      },
      {
        q: "Can a private candidate take A-Level Chemistry?",
        a: "Yes, but plan early. Private candidates can sit the written exams, but the practical endorsement must be assessed by an exam centre, and many universities expect a Pass for science courses.",
      },
      {
        q: "How much maths is in A-Level Chemistry?",
        a: "At least 20% of the marks assess mathematical skills, so confident calculation is essential. We often strengthen maths alongside the chemistry itself.",
      },
    ],
    related: ["a-level-biology", "a-level-physics", "gcse-science"],
    seoTitle: "A-Level Chemistry Tutors | Britannia Crown",
    seoDescription:
      "A-Level Chemistry tutoring from UK-trained educators: organic mechanisms, calculations, practical skills and exam technique, personally matched to your child.",
  },
  {
    slug: "a-level-biology",
    level: "A-Level",
    name: "A-Level Biology",
    tagline: "precise, thorough and exam-ready.",
    lead: "A-Level Biology covers a vast amount of content, and examiners reward precise terminology, clear explanation and confident handling of data. Our tutors help students organise their knowledge, write answers that hit the mark scheme and approach unfamiliar data with confidence.",
    glance: [
      { label: "Exams", value: "Three written papers at the end of the two-year course" },
      { label: "Practical endorsement", value: "Reported separately as Pass or Not Classified" },
      { label: "Maths", value: "At least 10% of marks assess mathematical skills, including statistics" },
      { label: "Grades", value: "A* to E" },
    ],
    help: [
      { title: "Precise terminology", body: "Marks are often lost to vague wording. We train students to use exact scientific language that matches what examiners look for." },
      { title: "Data and statistics", body: "Students must interpret graphs, analyse data and apply statistical tests. We make these questions familiar and manageable." },
      { title: "Extended writing", body: "Longer answers, including AQA's 25-mark essay, reward breadth and connections across the course. We practise planning and writing them." },
      { title: "Retaining a large course", body: "Spaced retrieval practice and well-organised notes keep two years of content secure for the final exams." },
    ],
    faqs: [
      {
        q: "Is A-Level Biology needed for medicine?",
        a: "Most UK medical schools require A-Level Chemistry, and many also ask for Biology or another science. Entry requirements vary, so always check each university's current requirements.",
      },
      {
        q: "How much maths is in A-Level Biology?",
        a: "At least 10% of the marks assess mathematical skills, including data handling and statistical tests. It's less than in Chemistry or Physics, but it matters for top grades.",
      },
      {
        q: "Do you help with the practical endorsement?",
        a: "Practical work is assessed in school, but the written exams also test practical knowledge. We make sure students understand the required practicals and can answer questions on them confidently.",
      },
    ],
    related: ["a-level-chemistry", "a-level-physics", "gcse-science"],
    seoTitle: "A-Level Biology Tutors | Britannia Crown",
    seoDescription:
      "A-Level Biology tutoring from UK-trained educators: terminology, data and statistics, essay writing and exam technique, matched to your child.",
  },
  {
    slug: "a-level-physics",
    level: "A-Level",
    name: "A-Level Physics",
    tagline: "where maths meets the real world.",
    lead: "A-Level Physics is one of the most mathematical A-Levels and is commonly required or preferred for engineering and physical science degrees. Our tutors help students master the maths, understand the concepts behind the equations and apply them to problems they've never seen before.",
    glance: [
      { label: "Exams", value: "Three written papers at the end of the two-year course" },
      { label: "Practical endorsement", value: "Reported separately as Pass or Not Classified" },
      { label: "Maths", value: "At least 40% of marks assess mathematical skills" },
      { label: "Grades", value: "A* to E" },
    ],
    help: [
      { title: "Mathematical fluency", body: "With at least 40% of marks assessing maths skills, confident algebra, graphs and trigonometry are essential. We strengthen these alongside the physics." },
      { title: "Concepts behind the equations", body: "Students who understand the physics, not just the formula, cope far better with unfamiliar questions. We focus on genuine understanding." },
      { title: "Uncertainty and data", body: "Practical questions test uncertainties, graph analysis and evaluation. We make sure these marks are secure." },
      { title: "Multi-step problems", body: "Many questions chain several ideas together. We teach students to plan a route through the problem before calculating." },
    ],
    faqs: [
      {
        q: "Does my child need A-Level Maths to study A-Level Physics?",
        a: "It isn't always required, but many sixth forms recommend it, and at least 40% of A-Level Physics marks assess mathematical skills. Taking both often helps each subject.",
      },
      {
        q: "Is A-Level Physics needed for engineering?",
        a: "Most engineering degrees require A-Level Maths, and many also ask for Physics. Requirements vary, so check the courses your child is considering.",
      },
      {
        q: "Can you help with the practical endorsement?",
        a: "The endorsement is assessed in school, but practical skills are also examined in the written papers. We make sure students can handle those questions confidently.",
      },
    ],
    related: ["a-level-maths", "a-level-chemistry", "gcse-science"],
    seoTitle: "A-Level Physics Tutors | Britannia Crown",
    seoDescription:
      "A-Level Physics tutoring from UK-trained educators: maths skills, core concepts, practical and data questions and exam technique, matched to your child.",
  },
];

export const getSubject = (slug: string) => subjects.find((s) => s.slug === slug);
