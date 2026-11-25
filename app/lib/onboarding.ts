// What we need to know before someone pays: who they are, who the lessons are for, and what they want help with.
// Shared by the onboarding form (to build it) and the checkout route (to check it, because a form can be bypassed).

export const YEAR_GROUPS = ["Nursery", "Reception", ...Array.from({ length: 13 }, (_, i) => `Year ${i + 1}`), "Adult or other"];

export const FOCUS_AREAS = [
  "Tutoring in a subject",
  "Exam preparation or resits",
  "School or nursery placement",
  "Home education",
  "Moving to Dubai",
  "Not sure yet",
];

export type Onboarding = {
  name: string;
  email: string;
  phone: string;
  childName: string;
  yearGroup: string;
  focusArea: string;
  focus: string;
  times: string;
  // Extra answers for products with their own questions (the Advocacy Plan).
  extra: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const text = (fd: FormData, key: string, max: number) => String(fd.get(key) ?? "").trim().slice(0, max);

export function parseOnboarding(fd: FormData, productId = ""): { data: Onboarding } | { error: string } {
  const tier = advocacyTier(productId);
  const data: Onboarding = {
    name: text(fd, "parent_name", 120),
    email: text(fd, "customer_email", 200).toLowerCase(),
    phone: text(fd, "phone", 40),
    childName: text(fd, "child_name", 80),
    yearGroup: text(fd, "year_group", 40),
    focusArea: text(fd, "focus_area", 60),
    focus: text(fd, "focus", 480),
    times: text(fd, "times", 200),
    extra: {},
  };
  if (data.name.length < 2) return { error: "Please enter your name." };
  if (!EMAIL_RE.test(data.email)) return { error: "Please enter a valid email address." };
  if (data.phone.replace(/\D/g, "").length < 7) return { error: "Please enter a phone number we can reach you on." };
  if (!data.childName) return { error: "Please enter your child's first name." };
  if (!YEAR_GROUPS.includes(data.yearGroup)) return { error: "Please choose your child's year group." };
  if (tier) {
    const adv = parseAdvocacy(fd, tier);
    if ("error" in adv) return adv;
    data.extra = adv.extra;
    data.focusArea = `School advocacy: ${adv.extra.concerns}`.slice(0, 200);
    if (data.focus.length < 10) return { error: "Please tell us what is happening at school and what you would like to change." };
  } else {
    if (!FOCUS_AREAS.includes(data.focusArea)) return { error: "Please tell us what you want help with." };
    if (data.focus.length < 3) return { error: "Please tell us a little about what you need, such as the subject and your goal." };
  }
  if (fd.get("consent") !== "on") return { error: "Please confirm you agree to the terms and privacy policy." };
  return { data };
}

/* ── Advocacy Plan intake ──────────────────────────────────────────────
   The Advocacy tiers ask about the school and the issue instead of tutoring. Each tier asks
   a little more, matching what that tier covers. Answers are saved to Stripe and the CRM. */

export type AdvocacyTier = "essential" | "standard" | "priority";
export const advocacyTier = (productId: string): AdvocacyTier | null =>
  ({ "advocacy-essential": "essential", "advocacy-standard": "standard", "advocacy-priority": "priority" } as const)[productId] ?? null;

export const ADVOCACY_CONCERNS = [
  "Academic concerns",
  "Learning and SEN support",
  "Exam access arrangements",
  "Wellbeing and bullying",
  "Behaviour and sanctions",
  "Transitions and option choices",
];
export const SCHOOL_LOCATIONS = ["Dubai", "Abu Dhabi", "Sharjah or another emirate", "United Kingdom", "Elsewhere"];
export const SCHOOL_CONTACTS = ["Class or subject teacher", "Head of year", "SENCO or inclusion lead", "Senior leadership", "Nobody yet"];
export const SUPPORT_PLANS = ["Yes, an IEP or learning plan", "A diagnosis, but no plan yet", "Being assessed", "No", "Not sure"];
// Standard meetings are online only; Priority includes one in-person visit a month.
export const MEETING_FORMATS = [
  "Online",
  "In person at the school (Greater London)",
  "In person outside Greater London (travel expenses fee applies)",
  "Either, whatever suits the school",
];
export const ACTIVE_ISSUES = [
  "Bullying",
  "SEN dispute (support not in place or not followed)",
  "Exam access arrangements",
  "Risk of suspension or exclusion",
  "Another urgent issue",
];
export const URGENCY = ["This week", "Within the next two weeks", "Ongoing, but not time-critical"];
export const COMPLAINT_STATUS = [
  "No formal complaint yet",
  "Formal complaint made to the school",
  "Complaint made to the Department for Education or local authority (UK)",
  "Complaint made to the KHDA (UAE)",
  "Not sure",
];

// Labels for the saved answers, as staff see them in the CRM and team emails.
export const ADVOCACY_LABELS: Record<string, string> = {
  school: "School",
  school_location: "School location",
  concerns: "Areas of concern",
  contacted: "Already contacted",
  support_plan: "IEP, plan or diagnosis",
  meeting_format: "Meeting preference",
  deadlines: "Upcoming meetings or deadlines",
  active_issue: "Active issue",
  urgency: "How urgent",
  complaint: "Complaint so far",
};

export function parseAdvocacy(fd: FormData, tier: AdvocacyTier): { extra: Record<string, string> } | { error: string } {
  const list = (key: string, allowed: string[]) => fd.getAll(key).map(String).filter((v) => allowed.includes(v));
  const one = (key: string, allowed: string[]) => {
    const v = text(fd, key, 120);
    return allowed.includes(v) ? v : "";
  };
  const extra: Record<string, string> = {
    school: text(fd, "school", 120),
    school_location: one("school_location", SCHOOL_LOCATIONS),
    concerns: list("concerns", ADVOCACY_CONCERNS).join(", "),
    contacted: list("contacted", SCHOOL_CONTACTS).join(", "),
  };
  if (extra.school.length < 2) return { error: "Please tell us which school your child attends." };
  if (!extra.school_location) return { error: "Please choose where the school is." };
  if (!extra.concerns) return { error: "Please tick at least one area you need help with." };
  if (!extra.contacted) return { error: "Please tell us who you have already spoken to at the school (or tick 'Nobody yet')." };

  if (tier !== "essential") {
    extra.support_plan = one("support_plan", SUPPORT_PLANS);
    extra.meeting_format = tier === "standard" ? "Online (Standard plan)" : one("meeting_format", MEETING_FORMATS);
    extra.deadlines = text(fd, "deadlines", 300);
    if (!extra.support_plan) return { error: "Please tell us whether your child has an IEP, learning plan or diagnosis." };
    if (!extra.meeting_format) return { error: "Please choose how you would like school meetings to happen." };
  }
  if (tier === "priority") {
    extra.active_issue = one("active_issue", ACTIVE_ISSUES);
    extra.urgency = one("urgency", URGENCY);
    extra.complaint = one("complaint", COMPLAINT_STATUS);
    if (!extra.active_issue) return { error: "Please choose the issue you need urgent help with." };
    if (!extra.urgency) return { error: "Please tell us how urgent this is." };
    if (!extra.complaint) return { error: "Please tell us whether a complaint has been made yet." };
  }
  if (fd.get("authority") !== "on") return { error: "Please confirm you are happy to sign a parent authority letter so we can speak to the school." };
  return { extra: Object.fromEntries(Object.entries(extra).filter(([, v]) => v)) };
}
