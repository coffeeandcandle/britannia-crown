"use client";

import { useSearchParams } from "next/navigation";
import EnquiryForm from "./EnquiryForm";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") ?? "";
  // From the full subject list on /tutors: the enquiry is labelled with the subject.
  const subject = (searchParams.get("subject") ?? "").slice(0, 80);

  return (
    <div className="contact-form-wrapper">
      <h3 className="contact-form-title">Send us a message</h3>
      <p className="contact-form-subtitle">We&apos;ll reply within 24 hours.</p>
      <p className="contact-form-reassurance">Free, no-obligation 30-minute consultation. We&apos;ll never share your details.</p>

      {subject && <p className="contact-form-subject">Enquiring about: <strong>{subject}</strong></p>}
      <EnquiryForm source="contact_page" defaultService={preselectedService || (subject ? "Tutoring" : "")} context={subject ? `Tutoring: ${subject}` : undefined} showReferral showNote={false} />
    </div>
  );
}
