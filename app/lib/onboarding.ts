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
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const text = (fd: FormData, key: string, max: number) => String(fd.get(key) ?? "").trim().slice(0, max);

export function parseOnboarding(fd: FormData): { data: Onboarding } | { error: string } {
  const data: Onboarding = {
    name: text(fd, "parent_name", 120),
    email: text(fd, "customer_email", 200).toLowerCase(),
    phone: text(fd, "phone", 40),
    childName: text(fd, "child_name", 80),
    yearGroup: text(fd, "year_group", 40),
    focusArea: text(fd, "focus_area", 60),
    focus: text(fd, "focus", 400),
    times: text(fd, "times", 200),
  };
  if (data.name.length < 2) return { error: "Please enter your name." };
  if (!EMAIL_RE.test(data.email)) return { error: "Please enter a valid email address." };
  if (data.phone.replace(/\D/g, "").length < 7) return { error: "Please enter a phone number we can reach you on." };
  if (!data.childName) return { error: "Please enter your child's first name." };
  if (!YEAR_GROUPS.includes(data.yearGroup)) return { error: "Please choose your child's year group." };
  if (!FOCUS_AREAS.includes(data.focusArea)) return { error: "Please tell us what you want help with." };
  if (data.focus.length < 3) return { error: "Please tell us a little about what you need, such as the subject and your goal." };
  if (fd.get("consent") !== "on") return { error: "Please confirm you agree to the terms and privacy policy." };
  return { data };
}
