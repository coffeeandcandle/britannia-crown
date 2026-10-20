import Link from "next/link";
import { requireStaff, canManage } from "../../../lib/portal/dal";
import { PageHeader, Card } from "../../ui";

type Section = { title: string; steps: string[]; who: "all" | "manager" | "admin" };

const guide: Section[] = [
  {
    title: "Your day as a tutor",
    who: "all",
    steps: [
      "Open My dashboard to see today's lessons and any notes you still need to write.",
      "Fifteen minutes before a lesson, open it and click Open video call.",
      "After the lesson, open it again and write a short note: what you covered, how it went and any homework.",
      "Notes are shared with the family unless you choose Staff only.",
    ],
  },
  {
    title: "Adding a new family",
    who: "manager",
    steps: [
      "Go to Families and use Add a family. Enter the parent's email carefully: it's how they sign in.",
      "Open the family and add each child with their year group.",
      "Send the parent the family sign-in link shown on the page. They choose Sign up with the same email.",
      "Once they've signed in, the family shows as Using portal.",
    ],
  },
  {
    title: "Scheduling lessons",
    who: "manager",
    steps: [
      "Open the family and fill in Schedule a lesson.",
      "Choose the child, the tutor, the date and time, and the time zone you're entering it in.",
      "For a regular slot, choose Every week for the number of weeks you need.",
      "Paste the Zoom, Google Meet or Teams link. The family's Join button appears 15 minutes before the start.",
      "To cancel or reassign a lesson, open it and use Update this lesson.",
    ],
  },
  {
    title: "Managing the team",
    who: "admin",
    steps: [
      "Go to Team and access and use Add a team member.",
      "Choose a role: Tutor (own lessons), Consultant (all families) or Admin (also manages the team).",
      "Send them the staff login link. They choose Sign up with their work email.",
      "To remove access, untick Has access on their row and save. Their past notes stay.",
    ],
  },
];

export default async function StaffHelpPage() {
  const { staff } = await requireStaff();
  const visible = guide.filter((g) => g.who === "all" || (g.who === "manager" && canManage(staff)) || (g.who === "admin" && staff.role === "admin"));

  return (
    <>
      <PageHeader title="Staff guide" description="Step-by-step help for the things you'll do most often." />
      <div className="ui-guide">
        {visible.map((g) => (
          <Card key={g.title} title={g.title}>
            <ol className="ui-guide-steps">
              {g.steps.map((s) => <li key={s}>{s}</li>)}
            </ol>
          </Card>
        ))}
      </div>
      <p className="ui-muted">Something not working? Email <a href="mailto:hello@britanniacrown.com">hello@britanniacrown.com</a>. <Link href="/portal/admin">Back to dashboard</Link></p>
    </>
  );
}
