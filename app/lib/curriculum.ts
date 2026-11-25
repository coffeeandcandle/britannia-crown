// Every subject we tutor, by stage, for the full list on /tutors. A subject with its own page
// (see subjects.ts) links there; every other subject opens the enquiry form labelled with it.
// Names follow the national curriculum in England and the usual exam-board titles.

export type CurriculumSubject = { name: string; slug?: string };
export type CurriculumGroup = { title: string; items: CurriculumSubject[] };
export type CurriculumStage = { id: string; title: string; ages: string; intro: string; groups: CurriculumGroup[] };

const s = (...names: string[]): CurriculumSubject[] => names.map((name) => ({ name }));

export const curriculum: CurriculumStage[] = [
  {
    id: "primary",
    title: "Primary school",
    ages: "Early Years to Year 6, ages 4 to 11",
    intro: "Every national curriculum subject from Reception to Year 6, plus the skills and extras families most often ask for.",
    groups: [
      {
        title: "Core subjects",
        items: [
          { name: "English: reading and comprehension", slug: "primary" },
          { name: "Phonics and early reading" },
          { name: "Writing and creative writing" },
          { name: "Spelling, grammar and punctuation (SPaG)" },
          { name: "Handwriting" },
          { name: "Maths", slug: "primary" },
          { name: "Times tables" },
          { name: "Science" },
        ],
      },
      {
        title: "Foundation subjects",
        items: s(
          "Computing",
          "History",
          "Geography",
          "Art and design",
          "Design and technology",
          "Music",
          "Physical education (PE)",
          "Religious education (RE)",
          "PSHE and relationships education",
          "French",
          "Spanish",
          "German",
          "Mandarin Chinese",
          "Welsh",
        ),
      },
      {
        title: "Tests and entrance exams",
        items: [
          { name: "Year 6 SATs preparation", slug: "primary" },
          { name: "11+ (grammar and independent schools)", slug: "11-plus" },
          { name: "7+ and 8+ entrance exams" },
          { name: "Verbal and non-verbal reasoning", slug: "11-plus" },
          { name: "ISEB Common Pre-Test" },
        ],
      },
      {
        title: "Extras popular in independent and alternative schools",
        items: s(
          "Latin",
          "Arabic",
          "Philosophy for Children (P4C)",
          "Coding and robotics",
          "Chess",
          "Drama and performing arts",
          "Public speaking",
          "Music theory and instrument grades (ABRSM, Trinity)",
          "British Sign Language (BSL)",
          "Touch typing",
          "Mindfulness and wellbeing",
          "Forest school and outdoor learning",
          "Montessori-style learning",
          "Steiner-Waldorf main lesson and handwork",
        ),
      },
    ],
  },
  {
    id: "ks3",
    title: "Key Stage 3",
    ages: "Years 7 to 9, ages 11 to 14",
    intro: "The full secondary curriculum before GCSE options, including 13+ Common Entrance for independent schools.",
    groups: [
      {
        title: "Core subjects",
        items: [
          { name: "English", slug: "ks3" },
          { name: "Maths", slug: "ks3" },
          { name: "Science: biology, chemistry and physics", slug: "ks3" },
        ],
      },
      {
        title: "Other subjects",
        items: s(
          "History",
          "Geography",
          "Computing",
          "Religious education (RE)",
          "Citizenship",
          "PSHE",
          "French",
          "Spanish",
          "German",
          "Mandarin Chinese",
          "Latin",
          "Art and design",
          "Design and technology",
          "Food preparation and nutrition",
          "Music",
          "Drama",
          "Physical education (PE)",
        ),
      },
      {
        title: "Entrance exams",
        items: s("13+ Common Entrance", "ISEB Common Academic Scholarship", "Year 9 options advice"),
      },
    ],
  },
  {
    id: "gcse",
    title: "GCSE and IGCSE",
    ages: "Years 10 and 11, ages 14 to 16",
    intro: "All the main GCSE subjects across AQA, Edexcel, OCR and WJEC Eduqas, and Cambridge and Edexcel International GCSEs.",
    groups: [
      {
        title: "Core subjects",
        items: [
          { name: "Maths", slug: "gcse-maths" },
          { name: "English Language", slug: "gcse-english" },
          { name: "English Literature", slug: "gcse-english-literature" },
          { name: "Combined Science", slug: "gcse-science" },
          { name: "Biology", slug: "gcse-science" },
          { name: "Chemistry", slug: "gcse-science" },
          { name: "Physics", slug: "gcse-science" },
          { name: "Further Maths (Level 2)" },
          { name: "Statistics" },
        ],
      },
      {
        title: "Humanities and social sciences",
        items: [
          { name: "History", slug: "gcse-history" },
          { name: "Geography", slug: "gcse-geography" },
          ...s("Religious Studies", "Citizenship Studies", "Business", "Economics", "Psychology", "Sociology", "Ancient History", "Classical Civilisation"),
        ],
      },
      {
        title: "Languages",
        items: [
          { name: "French", slug: "gcse-french-spanish" },
          { name: "Spanish", slug: "gcse-french-spanish" },
          ...s("German", "Italian", "Mandarin Chinese", "Arabic", "Urdu", "Latin", "Classical Greek"),
        ],
      },
      {
        title: "Technology, creative and practical",
        items: [
          { name: "Computer Science", slug: "gcse-computer-science" },
          ...s(
            "Design and Technology",
            "Engineering",
            "Electronics",
            "Food Preparation and Nutrition",
            "Art and Design",
            "Photography",
            "Music",
            "Drama",
            "Dance",
            "Media Studies",
            "Film Studies",
            "Physical Education",
            "Astronomy",
            "Geology",
          ),
        ],
      },
    ],
  },
  {
    id: "a-level",
    title: "A-Level",
    ages: "Years 12 and 13, ages 16 to 18",
    intro: "A-Levels across all the main exam boards, plus the Extended Project and university admissions tests.",
    groups: [
      {
        title: "Maths and sciences",
        items: [
          { name: "Maths", slug: "a-level-maths" },
          { name: "Further Maths", slug: "a-level-further-maths" },
          { name: "Biology", slug: "a-level-biology" },
          { name: "Chemistry", slug: "a-level-chemistry" },
          { name: "Physics", slug: "a-level-physics" },
          ...s("Computer Science", "Psychology", "Environmental Science", "Geology", "Electronics"),
        ],
      },
      {
        title: "English, humanities and social sciences",
        items: [
          { name: "English Literature", slug: "a-level-english-literature" },
          { name: "History", slug: "a-level-history" },
          { name: "Economics", slug: "a-level-economics" },
          ...s(
            "English Language",
            "English Language and Literature",
            "Geography",
            "Politics",
            "Sociology",
            "Philosophy",
            "Religious Studies",
            "Law",
            "Business",
            "Accounting",
            "Ancient History",
            "Classical Civilisation",
          ),
        ],
      },
      {
        title: "Languages",
        items: s("French", "Spanish", "German", "Italian", "Mandarin Chinese", "Arabic", "Latin", "Classical Greek"),
      },
      {
        title: "Creative and practical",
        items: s("Art and Design", "Photography", "Design and Technology", "Drama and Theatre", "Music", "Music Technology", "Dance", "Media Studies", "Film Studies", "Physical Education"),
      },
      {
        title: "Projects and university entry",
        items: s(
          "Extended Project Qualification (EPQ)",
          "Core Maths (Level 3)",
          "UCAS personal statements",
          "Oxbridge interview preparation",
          "UCAT (medicine and dentistry)",
          "LNAT (law)",
          "TSA, MAT and other admissions tests",
        ),
      },
    ],
  },
  {
    id: "vocational",
    title: "Vocational and technical",
    ages: "Ages 14 and over",
    intro: "Career-focused courses taken alongside or instead of GCSEs and A-Levels, and the English and maths qualifications many employers and colleges ask for.",
    groups: [
      {
        title: "Functional skills",
        items: s("Functional Skills English (Entry Level to Level 2)", "Functional Skills Maths (Entry Level to Level 2)", "GCSE English and maths resits"),
      },
      {
        title: "Cambridge Nationals and BTEC Tech Awards (ages 14 to 16)",
        items: s(
          "Creative iMedia",
          "Information Technologies",
          "Engineering Design",
          "Enterprise and Marketing",
          "Child Development",
          "Health and Social Care",
          "Sport Science",
          "Digital Information Technology",
          "Performing Arts",
        ),
      },
      {
        title: "BTEC Nationals and Level 3 applied courses (ages 16 to 19)",
        items: s(
          "Business",
          "Applied Science",
          "Information Technology",
          "Health and Social Care",
          "Sport and Exercise Science",
          "Engineering",
          "Creative Digital Media Production",
          "Performing Arts",
          "Applied Psychology",
          "Applied Criminology",
        ),
      },
      {
        title: "T Levels",
        items: s(
          "Digital Production, Design and Development",
          "Health",
          "Science",
          "Education and Early Years",
          "Engineering, Manufacturing and Design",
          "Building Services and Construction",
          "Accounting",
          "Management and Administration",
          "Legal Services",
        ),
      },
      {
        title: "Life and work skills",
        items: s("Personal finance and money skills", "Apprenticeship and job application preparation", "Interview skills", "Enterprise and entrepreneurship"),
      },
    ],
  },
  {
    id: "alternative",
    title: "Alternative learning and home education",
    ages: "All ages",
    intro: "For home-educated children, international and alternative schools, and children who learn best with a different approach.",
    groups: [
      {
        title: "Other curricula and qualifications",
        items: s(
          "International GCSEs for home educators (Cambridge, Edexcel)",
          "International Baccalaureate (PYP, MYP and Diploma)",
          "Cambridge Primary and Lower Secondary",
          "Montessori programmes",
          "Steiner-Waldorf education",
          "Home education curriculum planning",
        ),
      },
      {
        title: "Learning support",
        items: s(
          "Dyslexia-friendly literacy",
          "Dyscalculia and maths support",
          "ADHD and executive function coaching",
          "Autism-friendly learning",
          "English as an additional language (EAL)",
          "Study skills and revision technique",
          "Exam confidence and anxiety",
        ),
      },
      {
        title: "Enrichment",
        items: s(
          "Creative writing",
          "Public speaking and debating",
          "Philosophy and critical thinking",
          "Coding, robotics and game design",
          "Chess",
          "LAMDA speech and drama",
          "Music theory",
          "Touch typing",
          "Mindfulness and wellbeing",
        ),
      },
    ],
  },
];

export const curriculumCount = curriculum.reduce((n, st) => n + st.groups.reduce((m, g) => m + g.items.length, 0), 0);
