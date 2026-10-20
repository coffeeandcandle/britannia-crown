"use client";

import { useSearchParams } from "next/navigation";
import EnquiryForm from "./EnquiryForm";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") ?? "";

  return (
    <div className="contact-form-wrapper">
      <h3 className="contact-form-title">Send us a message</h3>
      <p className="contact-form-subtitle">We&apos;ll reply within 24 hours.</p>
      <p className="contact-form-reassurance">Free, no-obligation 30-minute consultation. We&apos;ll never share your details.</p>

      <EnquiryForm source="contact_page" defaultService={preselectedService} showReferral showNote={false} />
    </div>
  );
}
