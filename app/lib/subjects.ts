import type { Faq } from "./schema";

export type Subject = {
  slug: string;
  level: "Primary" | "KS3" | "GCSE" | "A-Level";
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

export const levels: Subject["level"][] = ["Primary", "KS3", "GCSE", "A-Level"];

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
    slug: "11-plus",
    level: "Primary",
    name: "11+",
    tagline: "calm preparation for selective school entry.",
    lead: "The 11+ is the entrance test for grammar schools and many independent schools, and much of it is unlike anything a child meets in the classroom. Our tutors build the English and maths a child needs, introduce verbal and non-verbal reasoning step by step and teach them to work calmly against the clock, so the test feels familiar rather than frightening.",
    glance: [
      { label: "Who sits it", value: "Children applying to selective schools, usually in Year 6 (ages 10 to 11)" },
      { label: "When", value: "Often the autumn of Year 6, with registration earlier. Dates vary by area and school" },
      { label: "What it covers", value: "Commonly English, maths, verbal reasoning and non-verbal reasoning. The mix varies" },
      { label: "Who sets it", value: "Test publishers such as GL Assessment or CEM, or the school itself" },
    ],
    help: [
      { title: "Verbal reasoning", body: "Word puzzles, codes and sequences are new to most children. We teach the common question types and the strategies for each, so they approach them with a method rather than a guess." },
      { title: "Non-verbal reasoning", body: "Shapes, patterns and spatial puzzles reward practice and a clear way of looking. We build speed and accuracy gradually, starting with the simplest patterns." },
      { title: "English and maths at test standard", body: "Comprehension, vocabulary, spelling, fractions, ratio and problem solving are often tested beyond the school curriculum. We close gaps and stretch what your child already knows." },
      { title: "Timing, technique and confidence", body: "Short timed sections, unfamiliar layouts and answer sheets can unsettle a child who knows the content. We practise the format in a relaxed way, so the day itself holds no surprises." },
    ],
    faqs: [
      {
        q: "When should 11+ preparation start?",
        a: "There is no single right time, and it depends on the child and the test. Many families who choose tutoring begin in Year 5, and some start earlier with reading and number fluency. A little regular practice over a longer period is usually calmer than intensive cramming.",
      },
      {
        q: "Does tutoring guarantee a grammar school place?",
        a: "No, and no tutor can promise that. Passing the test shows a child has reached the school's standard, but oversubscribed schools rank those who qualify and you must still apply through your local authority. Tutoring builds skills and familiarity with the format.",
      },
      {
        q: "Are all 11+ tests the same?",
        a: "No. Tests differ by area and by school. Some use papers from publishers such as GL Assessment or CEM, others set their own, and the subjects, format and timings vary. Check your target school's website first, then tell us which test your child will sit.",
      },
      {
        q: "Is the 11+ only for grammar schools?",
        a: "Grammar schools are state-funded and only exist in some parts of England. Many independent schools also run their own entrance assessments for entry at 11, often called the 11+, with their own dates and content. Our guide to the 11+ explains the difference.",
      },
      {
        q: "Will tutoring put too much pressure on my child?",
        a: "It shouldn't. Short, encouraging sessions that build understanding work better than long drilling, and we keep the focus on confidence. If selective entry doesn't suit your child, we will say so honestly.",
      },
    ],
    related: ["primary", "gcse-maths", "gcse-english"],
    seoTitle: "11+ Tutors | Grammar School Entrance Prep | Britannia Crown",
    seoDescription:
      "11+ tutoring for grammar and independent school entrance tests: English, maths, verbal and non-verbal reasoning from UK-trained educators.",
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
  {
    slug: "ks3",
    level: "KS3",
    name: "KS3 (Years 7 to 9)",
    tagline: "a strong start to secondary school.",
    lead: "Key Stage 3 is where secondary school gets harder: more subjects, more independence and less hand-holding. Gaps that open here often surface as GCSE problems later. Our tutors help children settle in, secure the English and maths skills everything else depends on, and build study habits before the pressure of exams begins.",
    glance: [
      { label: "Years", value: "7, 8 and 9 (ages 11 to 14)" },
      { label: "National tests", value: "None. Progress is judged by school assessments, which vary between schools" },
      { label: "Core focus", value: "English, maths and science, alongside humanities and languages" },
      { label: "What follows", value: "GCSE options are usually chosen in Year 8 or 9" },
    ],
    help: [
      { title: "The Year 6 to Year 7 step", body: "Many children arrive with uneven maths or writing, hidden by primary school support. We find the gaps early and close them before they snowball." },
      { title: "Maths foundations", body: "Fractions, algebra and ratio are the base of GCSE Maths. Secure them now and Years 10 and 11 are far calmer." },
      { title: "Writing and reading", body: "Structured essays, analysing texts and writing with accuracy are needed in almost every subject, not only English." },
      { title: "Study skills and choices", body: "We help children organise homework, revise for school tests and think about which subjects they enjoy and are good at before choosing GCSE options." },
    ],
    faqs: [
      {
        q: "Does my child need a tutor in Years 7 to 9?",
        a: "Not necessarily. Tutoring helps most when a child is struggling to settle, has fallen behind in a core subject or would enjoy extra challenge. Without national tests at this stage, a tutor can also give you a clearer picture of where your child really is.",
      },
      {
        q: "Which subjects matter most at KS3?",
        a: "English and maths, because nearly every other subject builds on them, followed by science. Strong foundations here make GCSE courses much easier to start.",
      },
      {
        q: "Can tutoring help with choosing GCSE options?",
        a: "A tutor sees how your child works in a subject, which is useful evidence alongside school advice. Our guide to choosing GCSE options explains the process.",
      },
    ],
    related: ["primary", "gcse-maths", "gcse-english"],
    seoTitle: "KS3 Tutors | Year 7, 8 & 9 Support | Britannia Crown",
    seoDescription:
      "KS3 tutoring for Years 7 to 9: English, maths and science foundations, study skills and a confident start to secondary school from UK-trained educators.",
  },
  {
    slug: "gcse-history",
    level: "GCSE",
    name: "GCSE History",
    tagline: "from remembering facts to building arguments.",
    lead: "GCSE History is assessed entirely by exam, and the marks go to students who can weigh sources, explain causes and consequences and write a sustained argument, not to those who simply remember the most. Our tutors teach the structures behind top-mark answers and help students learn large amounts of content in a way that sticks.",
    glance: [
      { label: "Grades", value: "9 to 1" },
      { label: "Assessment", value: "Usually two or three exam papers, with no coursework" },
      { label: "Content", value: "A mix of modern, medieval or early modern, and British depth and thematic studies. Topics depend on the board" },
      { label: "Exam boards", value: "AQA, Pearson Edexcel and OCR" },
    ],
    help: [
      { title: "Source and interpretation questions", body: "These questions test how well a student uses a source, not what they remember. We teach a repeatable method for provenance, content and context." },
      { title: "Essay structure", body: "Explaining why something happened and how important it was needs a clear argument. We practise planning and writing timed paragraphs that earn the higher levels." },
      { title: "Learning the content", body: "There is a lot to know. We build timelines, flashcards and retrieval practice so revision is active rather than rereading notes." },
      { title: "Knowing your specification", body: "Topics and question styles differ between boards. We work from the exact specification your child is studying." },
    ],
    faqs: [
      {
        q: "Is there coursework in GCSE History?",
        a: "No. GCSE History is assessed by exams. There is a requirement for a depth of study across periods, and your school chooses the topics within the board's specification.",
      },
      {
        q: "How is GCSE History marked?",
        a: "Answers are marked against levels that reward analysis and judgement. Long answers also carry marks for spelling, punctuation and grammar in some questions, so accuracy matters.",
      },
      {
        q: "Which exam board does my child sit?",
        a: "Ask the school or check the exam entry details. Tell us the board and the topics and we will plan around them.",
      },
    ],
    related: ["gcse-english", "a-level-history", "gcse-geography"],
    seoTitle: "GCSE History Tutors | Britannia Crown",
    seoDescription:
      "GCSE History tutoring from UK-trained educators: source questions, essay structure and revision methods for AQA, Edexcel and OCR.",
  },
  {
    slug: "gcse-geography",
    level: "GCSE",
    name: "GCSE Geography",
    tagline: "knowing the case studies and how to use them.",
    lead: "GCSE Geography rewards students who combine secure knowledge with the ability to apply it: using data, maps and case studies to support a point. Our tutors help students learn the physical and human content, handle the skills questions confidently and use their fieldwork well in the exam.",
    glance: [
      { label: "Grades", value: "9 to 1" },
      { label: "Assessment", value: "Written exams, with no coursework" },
      { label: "Fieldwork", value: "Students complete fieldwork in at least two contrasting environments, then answer questions on it in the exams" },
      { label: "Exam boards", value: "AQA, Pearson Edexcel and OCR" },
    ],
    help: [
      { title: "Case studies", body: "Strong answers use specific places, facts and figures. We help students learn them efficiently and know when each one fits." },
      { title: "Skills and data questions", body: "Graphs, maps and statistics appear throughout the papers. We build confidence reading and interpreting them accurately." },
      { title: "Extended answers", body: "Longer questions ask students to assess or justify. We practise building a balanced argument with evidence." },
      { title: "Fieldwork and decision-making", body: "Questions about enquiry methods and issue-based decisions are easy to lose marks on. We rehearse both." },
    ],
    faqs: [
      {
        q: "Is there coursework in GCSE Geography?",
        a: "No. Fieldwork is required, but it is assessed through the written exams rather than as coursework.",
      },
      {
        q: "How much maths is in GCSE Geography?",
        a: "Some questions need graphs, percentages and basic statistics. Weak number skills can cost marks, so we support these alongside the geography.",
      },
      {
        q: "How do I know which case studies to learn?",
        a: "Your child's school chooses them within the specification. We work from their notes and the board's list.",
      },
    ],
    related: ["gcse-history", "gcse-science", "gcse-maths"],
    seoTitle: "GCSE Geography Tutors | Britannia Crown",
    seoDescription:
      "GCSE Geography tutoring from UK-trained educators: case studies, data skills, fieldwork and extended answers for AQA, Edexcel and OCR.",
  },
  {
    slug: "a-level-english-literature",
    level: "A-Level",
    name: "A-Level English Literature",
    tagline: "reading closely, arguing independently.",
    lead: "A-Level English Literature asks for more than a good essay on a set text. Students compare texts, bring in critical views and develop an argument of their own. Our tutors help them read closely, plan precise essays and move from describing a text to making a case about it.",
    glance: [
      { label: "Grades", value: "A* to E" },
      { label: "Assessment", value: "Mostly exams, plus a non-exam assessment (NEA) essay worth around 20%" },
      { label: "Texts", value: "Prose, poetry and drama, including at least one Shakespeare play" },
      { label: "Exam boards", value: "AQA, Pearson Edexcel and OCR" },
    ],
    help: [
      { title: "Close reading", body: "We train students to notice how language, structure and form shape meaning, and to say why it matters." },
      { title: "Comparison", body: "Writing about two texts together is a skill of its own. We practise building comparative arguments rather than two separate essays." },
      { title: "Critical views", body: "Strong answers use critical and contextual ideas to sharpen a point. We teach how to bring them in without name-dropping." },
      { title: "The NEA", body: "We help students choose texts, shape a question and write independently while the work stays their own." },
    ],
    faqs: [
      {
        q: "Is there coursework in A-Level English Literature?",
        a: "Yes. There is a non-exam assessment, usually a comparative essay, worth around a fifth of the grade. The rest is by exam.",
      },
      {
        q: "How different is it from GCSE?",
        a: "The reading is heavier and the thinking more independent. Students are expected to argue a position, not just analyse techniques.",
      },
      {
        q: "Which universities want it?",
        a: "English degrees usually ask for English Literature or a combined course, and some subjects value it as an essay-based qualification. Check each course's entry requirements.",
      },
    ],
    related: ["gcse-english", "a-level-history", "a-level-economics"],
    seoTitle: "A-Level English Literature Tutors | Britannia Crown",
    seoDescription:
      "A-Level English Literature tutoring from UK-trained educators: close reading, comparison, critical views and NEA support for AQA, Edexcel and OCR.",
  },
  {
    slug: "a-level-history",
    level: "A-Level",
    name: "A-Level History",
    tagline: "argument, evidence and judgement.",
    lead: "A-Level History is an essay subject. Marks go to students who can sustain an argument across a long answer, handle contested interpretations and use evidence precisely. Our tutors help students plan and write at that level, manage large amounts of content and get the most from the independent investigation.",
    glance: [
      { label: "Grades", value: "A* to E" },
      { label: "Assessment", value: "Exams plus a coursework investigation worth around 20%" },
      { label: "Structure", value: "Breadth and depth studies, usually across a wide chronological range" },
      { label: "Exam boards", value: "AQA, Pearson Edexcel and OCR" },
    ],
    help: [
      { title: "Essay planning and argument", body: "We practise writing a clear line of argument and keeping it going through the whole essay." },
      { title: "Interpretations", body: "Questions on historians' views reward careful reading and evaluation. We teach students to engage with them rather than summarise." },
      { title: "Knowledge and revision", body: "The content load is large. We help students organise it and recall it under timed conditions." },
      { title: "The coursework investigation", body: "We help students choose a question, evaluate sources and sustain an independent argument within the word limit." },
    ],
    faqs: [
      {
        q: "Is there coursework in A-Level History?",
        a: "Yes. Students complete an independent investigation, usually around 3,500 to 4,500 words, worth around 20% of the grade.",
      },
      {
        q: "Which GCSE grade do I need?",
        a: "Sixth forms set their own entry requirements, often a 6 in GCSE History and a solid grade in English. Check the school or college.",
      },
      {
        q: "Is A-Level History respected by universities?",
        a: "Yes. It is widely regarded for essay writing and analysis, and is accepted for many degrees beyond History.",
      },
    ],
    related: ["gcse-history", "a-level-english-literature", "a-level-economics"],
    seoTitle: "A-Level History Tutors | Britannia Crown",
    seoDescription:
      "A-Level History tutoring from UK-trained educators: essay writing, interpretations, revision methods and coursework help for AQA, Edexcel and OCR.",
  },
  {
    slug: "a-level-economics",
    level: "A-Level",
    name: "A-Level Economics",
    tagline: "theory you can apply to the real world.",
    lead: "A-Level Economics combines models and diagrams with data and current events. Students who do well can draw the right diagram, apply it to the case in front of them and evaluate the outcome. Our tutors help students build that chain of analysis, handle data questions and write evaluation that earns the top marks.",
    glance: [
      { label: "Grades", value: "A* to E" },
      { label: "Assessment", value: "Exams only, with no coursework" },
      { label: "Content", value: "Microeconomics and macroeconomics, with some data and calculation" },
      { label: "Exam boards", value: "AQA, Pearson Edexcel and OCR" },
    ],
    help: [
      { title: "Diagrams and models", body: "Supply and demand, market failure and macroeconomic models are the toolkit. We make sure students can draw and explain them accurately." },
      { title: "Application", body: "Marks go to students who tie theory to the context given. We practise using the case study rather than writing generally." },
      { title: "Evaluation", body: "Weighing up arguments and reaching a supported judgement is what separates grades. We teach a structure for it." },
      { title: "Data and calculations", body: "We build confidence with elasticity, percentage changes and reading data tables and charts." },
    ],
    faqs: [
      {
        q: "Do I need GCSE Economics?",
        a: "No. Most students start from scratch. Sixth forms usually look for a good GCSE Maths and English grade.",
      },
      {
        q: "How mathematical is it?",
        a: "Some calculation and data work is required, but it is mostly essay and short-answer analysis. Confident GCSE-level maths is enough for most students.",
      },
      {
        q: "Is it a good choice for university?",
        a: "It is well regarded for Economics, Business, Finance and Social Science degrees. Check the entry requirements of the courses your child is considering.",
      },
    ],
    related: ["a-level-maths", "a-level-history", "gcse-maths"],
    seoTitle: "A-Level Economics Tutors | Britannia Crown",
    seoDescription:
      "A-Level Economics tutoring from UK-trained educators: diagrams, application, evaluation and data questions for AQA, Edexcel and OCR.",
  },
];

export const getSubject = (slug: string) => subjects.find((s) => s.slug === slug);
