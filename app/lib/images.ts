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
