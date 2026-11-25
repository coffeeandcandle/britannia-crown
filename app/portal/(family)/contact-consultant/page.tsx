import { redirect } from "next/navigation";

// Merged into "Send a note to the team", where families choose who the message is for.
export default function ContactConsultantPage() {
  redirect("/portal/notes-for-team");
}
