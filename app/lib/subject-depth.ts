// Longer, subject-specific copy shown on tutor pages beneath the summary sections.
// Keep every claim general enough to hold across exam boards; check against the
// board specification before adding board-specific detail.
export type SubjectDepth = {
  topicsTitle: string;
  topics: { title: string; body: string }[];
  lessonTitle: string;
  lesson: string[];
};

export const subjectDepth: Record<string, SubjectDepth> = {
  "gcse-science": {
    topicsTitle: "The topics where GCSE Science marks are most often lost",
    topics: [
      { title: "Biology: cells, organisation and bioenergetics", body: "Students often know the facts but lose marks explaining how structure links to function, for example in the digestive system, photosynthesis and respiration." },
      { title: "Biology: homeostasis, inheritance and ecology", body: "Genetic crosses, Punnett squares and the feedback loops in the body reward a step-by-step method that can be practised until it is routine." },
      { title: "Chemistry: bonding, structure and the periodic table", body: "Linking the type of bonding to a substance's properties is a classic extended-answer question, and one many students find hard to organise." },
      { title: "Chemistry: calculations and rates", body: "Moles, concentrations and reacting masses are where the maths shows up. We build the method first, then speed and accuracy." },
      { title: "Physics: energy, forces and electricity", body: "Rearranging equations, working with units and drawing and reading graphs account for a large share of physics marks." },
      { title: "Physics: waves, magnetism and space", body: "These topics are descriptive but precise. Clear vocabulary is what separates a lower-level answer from a top-level one." },
    ],
    lessonTitle: "What a first GCSE Science lesson looks like",
    lesson: [
      "We usually start by looking at recent test papers or class notes to see where marks are being lost, and by finding out whether your child is taking Combined Science or the three separate sciences and with which exam board.",
      "The tutor then agrees two or three priorities for the first few weeks, such as one weak topic and one exam skill like six-mark answers, and plans the remaining sessions around the exam date. Sessions mix explanation, worked examples and exam-style questions your child answers themselves.",
    ],
  },
  "a-level-chemistry": {
    topicsTitle: "The A-Level Chemistry topics that cause the most difficulty",
    topics: [
      { title: "Amount of substance and calculations", body: "Mole calculations underpin much of the course, and errors early on carry through titrations, gas volumes and yields. We make the method automatic." },
      { title: "Energetics and thermodynamics", body: "Enthalpy cycles, entropy and free energy need careful logic and careful signs. We practise drawing and reading them until they are reliable." },
      { title: "Kinetics and equilibria", body: "Rate equations, orders of reaction and equilibrium constants require students to interpret data and graphs as well as recall theory." },
      { title: "Acids, bases and buffers", body: "pH calculations and buffer behaviour combine algebra with chemical reasoning, and are a regular source of lost marks." },
      { title: "Organic chemistry and mechanisms", body: "Curly arrows and reaction pathways reward practice more than memorising. We teach students to work out mechanisms, not just recall them." },
      { title: "Spectroscopy and analysis", body: "Combining mass spectrometry, infrared and NMR data to identify a compound is a puzzle skill that improves quickly with structured practice." },
    ],
    lessonTitle: "What a first A-Level Chemistry lesson looks like",
    lesson: [
      "We begin by checking which exam board and topics your child is studying, and by looking at recent homework or test results to find the pattern behind lost marks, whether that is calculations, mechanisms or extended answers.",
      "From there the tutor sets a short plan for the term. Sessions combine explanation of the hardest ideas with timed exam questions and mark-scheme review, so your child learns what examiners actually reward.",
    ],
  },
  "a-level-maths": {
    topicsTitle: "The A-Level Maths topics that cause the most difficulty",
    topics: [
      { title: "Algebra and functions", body: "Manipulating expressions, partial fractions and transformations of graphs underpin everything else. Gaps here slow every later topic." },
      { title: "Trigonometry", body: "Identities, radians and solving equations over a range require both fluency and a clear method for checking solutions." },
      { title: "Exponentials and logarithms", body: "Students often learn the rules without understanding what a logarithm does. We build the idea first, then the technique." },
      { title: "Differentiation and integration", body: "The chain, product and quotient rules, and integration by substitution and parts, reward practice with a wide variety of questions." },
      { title: "Proof", body: "Writing a complete mathematical argument is a skill of its own, and one that GCSE does not prepare students for." },
      { title: "Statistics and mechanics", body: "Hypothesis tests, distributions, kinematics and forces each depend on modelling a situation correctly before any calculation starts." },
    ],
    lessonTitle: "What a first A-Level Maths lesson looks like",
    lesson: [
      "We start by finding out which exam board your child follows, whether they also take Further Maths, and which topics they are on now. A short diagnostic of recent work shows whether the difficulty is algebra, a specific topic or exam technique.",
      "The tutor then works through the topic your child finds hardest, with worked examples first and then questions your child solves on their own. We agree a plan for the weeks ahead and any past-paper practice to schedule before the exams.",
    ],
  },
  "gcse-maths": {
    topicsTitle: "The GCSE Maths topics where students most often lose marks",
    topics: [
      { title: "Algebra", body: "Expanding, factorising, solving equations and rearranging formulae appear throughout both tiers. Gaps here cost marks on every paper." },
      { title: "Ratio, proportion and percentages", body: "These are common in multi-step problems set in real situations, and many students find them harder than the pure number questions." },
      { title: "Geometry and trigonometry", body: "Pythagoras, trigonometry, circle theorems and area and volume questions reward a clear diagram and a method that is easy to follow." },
      { title: "Probability and statistics", body: "Tree diagrams, conditional probability and interpreting charts cost marks when students rush the reading of the question." },
      { title: "Number and fractions", body: "Fluent fractions and standard form make the non-calculator paper far less stressful and free up time for harder questions." },
      { title: "Problem solving", body: "Questions with several steps in an unfamiliar context test how well a student organises their thinking. We teach a routine for starting them." },
    ],
    lessonTitle: "What a first GCSE Maths lesson looks like",
    lesson: [
      "We begin by looking at your child's recent results, their tier (Foundation or Higher) and the target grade. A short set of questions helps the tutor see which topics are secure and which need rebuilding.",
      "The first sessions usually focus on the weakest topic that carries the most marks, with worked examples and plenty of practice. As exams approach we move towards past-paper questions and technique, such as showing working to earn method marks.",
    ],
  },
  "gcse-english": {
    topicsTitle: "Where GCSE English students most often lose marks",
    topics: [
      { title: "Language Paper 1: reading and creative writing", body: "Analysing how a writer builds a scene, and writing a controlled piece of description or narrative, are separate skills. We teach both with timed practice." },
      { title: "Language Paper 2: comparing viewpoints", body: "Students lose marks when they summarise rather than compare. We teach a method for picking out and comparing perspectives." },
      { title: "Shakespeare", body: "Strong answers link a few precise quotations to a clear argument about the whole play. We practise planning and selecting evidence." },
      { title: "The 19th-century novel", body: "The language is dense and the context unfamiliar. We help students find the key ideas and write about them confidently." },
      { title: "Modern texts and poetry", body: "Comparing poems and writing about unseen poetry reward a flexible method for approaching a text rather than learned answers." },
      { title: "Accuracy: spelling, punctuation and grammar", body: "Technical accuracy affects marks on both papers. We tackle recurring errors directly so they stop costing marks." },
    ],
    lessonTitle: "What a first GCSE English lesson looks like",
    lesson: [
      "We start by finding out which exam board and set texts your child is studying, and by reading a recent piece of their writing. That shows whether the main issue is analysis, structure or accuracy.",
      "The tutor then agrees priorities, for example how to build an analytical paragraph or how to plan a response in the time available. Sessions combine reading and discussion with short timed writing that the tutor marks and talks through.",
    ],
  },
  "gcse-english-literature": {
    topicsTitle: "Where GCSE English Literature students most often lose marks",
    topics: [
      { title: "Shakespeare", body: "Strong answers argue about the whole play using a few well-chosen quotations. Students lose marks by retelling the plot instead." },
      { title: "The 19th-century novel", body: "Dense language and unfamiliar context make students anxious. We help them find the central ideas and track them through the text." },
      { title: "Modern prose or drama", body: "The text is shorter, but questions still need a clear argument and close reference. We practise planning under time pressure." },
      { title: "Poetry anthology", body: "Comparing two poems well means choosing the right pairing and keeping the comparison running through the answer." },
      { title: "Unseen poetry", body: "With no learned answer to rely on, students need a method for a first reading. We drill one until it is automatic." },
      { title: "Essay technique and timing", body: "Many students run out of time on the longest question. We rehearse planning in a few minutes and writing to a clear structure." },
    ],
    lessonTitle: "What a first GCSE English Literature lesson looks like",
    lesson: [
      "We start by confirming your child's exam board and set texts, and by reading a recent essay. That shows whether the main gap is knowledge of the text, argument or timing.",
      "The tutor then sets priorities, such as learning key quotations for one text or planning an essay in ten minutes. Sessions mix discussion of the text with short timed writing, which the tutor marks and explains.",
    ],
  },
};
