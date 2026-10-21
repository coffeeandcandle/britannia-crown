// Photography for the site, from Unsplash (free to use commercially; see https://unsplash.com/license).
// Each entry is the Unsplash photo id plus an honest description. These are stock images that illustrate
// the subject: they are never presented as Britannia Crown's own tutors, clients or children.
// To change a photo, swap its id; the image optimiser (next/image) resizes it for every screen.
export type Photo = { id: string; alt: string; credit: string };

export const photos = {
  tutoring: { id: "1544776193-352d25ca82cd", alt: "A teacher working one to one with a young student", credit: "Jerry Wang" },
  online: { id: "1629360057380-18b15b42e650", alt: "A parent and child learning together at a laptop", credit: "sofatutor" },
  reading: { id: "1599689868384-59cb2b01bb21", alt: "A child reading a book at a wooden table", credit: "Michał Parzuchowski" },
  readingTogether: { id: "1758598738003-3c2ea5c8b166", alt: "A parent and child reading a book together on the sofa", credit: "Vitaly Gariev" },
  familyStudy: { id: "1758687126441-faf2b924b390", alt: "A father and son reading and drawing at a table at home", credit: "Vitaly Gariev" },
  exam: { id: "1598981457915-aea220950616", alt: "A student writing at a desk in a classroom", credit: "Jeswin Thomas" },
  revision: { id: "1514369118554-e20d93546b30", alt: "A student writing notes in a book while revising", credit: "Kyle Gregory Devaras" },
  studyPair: { id: "1547567667-1aa64e6f58dc", alt: "Two students studying together over a book", credit: "Alissa De Leva" },
  classroom: { id: "1780844824413-ccb03d294ec9", alt: "Primary school children learning together in a bright classroom", credit: "Ruslan Horovyi" },
  classroomDesks: { id: "1780844824650-4ba9b0b46c3a", alt: "Children sitting at desks in a classroom", credit: "Ruslan Horovyi" },
  earlyYears: { id: "1587323655395-b1c77a12c89a", alt: "An adult and a young child colouring together at a table", credit: "Gabe Pierce" },
  homework: { id: "1554721299-e0b8aa7666ce", alt: "A boy writing in his book", credit: "Andrew Ebrahim" },
  dubai: { id: "1512453979798-5ea266f8880c", alt: "The Burj Khalifa and Dubai skyline at sunrise", credit: "David Rodrigo" },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export const photoUrl = (key: PhotoKey, width = 1600) => `https://images.unsplash.com/photo-${photos[key].id}?auto=format&fit=crop&w=${width}&q=70`;

// A different cover photo for every guide, so no two articles look the same. Each is a free-to-use Unsplash
// photo that illustrates the topic; none is presented as a Britannia Crown tutor, client or child.
export const guideCovers: Record<string, Photo> = {
  "how-to-help-your-child-with-maths-at-home": { id: "1560785496-3c9d27877182", alt: "A child completing maths homework at a table", credit: "Annie Spratt" },
  "how-to-improve-gcse-english-language-and-literature": { id: "1488722796624-0aa6f1bb6399", alt: "A pencil taking notes in a notebook", credit: "Thought Catalog" },
  "gcse-science-combined-or-separate": { id: "1758685734030-a31d96462eec", alt: "A teacher and student carrying out a science experiment", credit: "Vitaly Gariev" },
  "exam-access-arrangements-extra-time": { id: "1606326608690-4e0281b1e588", alt: "A pencil resting on an exam answer sheet", credit: "Nguyen Dang Hoang Nhu" },
  "results-day-gcse-a-level-what-to-do": { id: "1774599661166-ae302f07dd37", alt: "People celebrating outdoors with their arms raised", credit: "Fiqih Alfarish" },
  "how-to-support-a-child-through-exam-stress": { id: "1758685733897-80154016629f", alt: "A student sitting thoughtfully by a blackboard of equations", credit: "Vitaly Gariev" },
  "phonics-and-learning-to-read-in-england": { id: "1573222558254-add137b2ac03", alt: "A young child holding a book", credit: "Sven Brandsma" },
  "starting-reception-what-to-expect": { id: "1694170458273-ca7714c2fee3", alt: "Young girls standing together on their first day at school", credit: "Egor Myznik" },
  "home-education-curriculum-choices": { id: "1521056787327-165dc2a32836", alt: "A stack of children's books beside a pencil pot", credit: "Debby Hudson" },
  "returning-to-the-uk-with-children-school-places": { id: "1654355281748-6e7c4371a67f", alt: "A girl on a beach with a large suitcase", credit: "Anastasiia Nelen" },
  "how-school-admissions-criteria-work": { id: "1783173690530-2b66c61358a6", alt: "Schoolboys standing behind a decorative metal gate", credit: "Alex G" },
  "school-admission-appeals-england": { id: "1628062699790-7c45262b82b4", alt: "Chairs around a conference table", credit: "Michael Fousert" },
  "in-year-school-admissions-moving-mid-year": { id: "1594608661623-aa0bd3a69d98", alt: "Children with backpacks walking to school", credit: "note thanun" },
  "11-plus-and-grammar-schools-explained": { id: "1606326608606-aa0b62935f2b", alt: "A student writing on an exam paper", credit: "Nguyen Dang Hoang Nhu" },
  "independent-school-entry-assessments-and-bursaries": { id: "1599725427295-6ed79ff8dbef", alt: "A traditional red brick school building", credit: "Vladislav Vasilev" },
  "how-to-choose-a-nursery-england": { id: "1557452765-5b57d100c1dc", alt: "A toddler playing with a toy", credit: "Troy T" },
  "questions-to-ask-when-visiting-a-school": { id: "1789106374683-f294e446711c", alt: "A school hallway with wooden panelling", credit: "Yanhao Fang" },
  "how-to-start-home-education-england": { id: "1588451658762-573f563865a7", alt: "A child writing at home on a worksheet", credit: "eleni koureas" },
  "how-much-does-a-private-tutor-cost-uk": { id: "1648201637025-1c77b9be3013", alt: "A calculator and a pen on a sheet of paper", credit: "Aaron Lefler" },
  "online-vs-face-to-face-tutoring": { id: "1588196749597-9ff075ee6b5b", alt: "A laptop showing a video call", credit: "Chris Montgomery" },
  "signs-your-child-needs-a-tutor": { id: "1630983358494-96012d838b84", alt: "A young girl with glasses working on schoolwork", credit: "Greg Rosenke" },
  "how-to-choose-gcse-options": { id: "1725781761544-ffeec5eafcc9", alt: "A student choosing a book from a library shelf", credit: "Declan Sun" },
  "a-level-subject-choices-and-university": { id: "1602052577122-f73b9710adba", alt: "A laboratory workbench with a microscope", credit: "Trnava University" },
  "gcse-resits-english-and-maths": { id: "1699430245381-ad5be3690d26", alt: "A student at a desk beside a lamp", credit: "Mykyta Kravčenko" },
  "private-candidate-gcse-how-to-enter": { id: "1588581939864-064d42ace7cd", alt: "Books on library shelves", credit: "Trnava University" },
  "ks2-sats-explained": { id: "1728743264694-4ac39fa29385", alt: "Pupils sitting at desks in a classroom", credit: "Zach Wear" },
  "school-admissions-england": { id: "1633526543814-9718c8922b7a", alt: "A wall calendar with red pins", credit: "Towfiqu barbhuiya" },
  "gcse-grades-explained": { id: "1560785496-321917f24016", alt: "A maths worksheet on a wooden desk", credit: "Annie Spratt" },
  "home-education-england": { id: "1713942590141-caea096b039d", alt: "A mother and child sitting at a kitchen table", credit: "Vitaly Gariev" },
  "choosing-a-private-tutor": { id: "1589206946274-929e4da3996b", alt: "A teacher and student looking at a workbook together", credit: "Ronald Felton" },
  "how-to-revise-gcse-a-level": { id: "1503551723145-6c040742065b-v2", alt: "Colourful sticky notes pinned to a board", credit: "Patrick Perkins" },
  "igcse-vs-gcse": { id: "1521295121783-8a321d551ad2", alt: "A globe on a desk", credit: "Kyle Glenn" },
};

export const coverUrl = (photo: Photo, width = 1600) => `https://images.unsplash.com/photo-${photo.id}?auto=format&fit=crop&w=${width}&q=70`;

// Which photo goes with which page.
export const servicePhoto: Record<string, PhotoKey> = {
  tutoring: "tutoring",
  "home-education": "readingTogether",
  "school-placement": "classroom",
  qualifications: "exam",
};

export const offerPhoto: Record<string, PhotoKey> = {
  "nursery-search": "earlyYears",
  "school-search": "classroomDesks",
  "exam-preparation": "revision",
  "homeschool-support": "familyStudy",
  "education-concierge": "dubai",
  foundation: "reading",
  partner: "online",
  "full-partner": "studyPair",
};

export const categoryPhoto: Record<string, PhotoKey> = {
  Tutoring: "tutoring",
  "Exams & Qualifications": "exam",
  "Choosing a School": "classroom",
  "Early Years & Primary": "earlyYears",
  "Home Education": "readingTogether",
  "Moving & International Families": "dubai",
};
