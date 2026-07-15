"use client";

import { useSearchParams } from "next/navigation";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") ?? "";

  return (
    <div className="contact-form-wrapper">
      <h3 className="contact-form-title">Get in Touch</h3>
      <p className="contact-form-subtitle">Fill out the form below and we&apos;ll respond within 24 hours</p>
      <p className="contact-form-reassurance">Free, no-obligation 30-minute consultation — we&apos;ll never share your details.</p>

      <form action="https://formspree.io/f/xyzypzkv" method="POST" id="contactForm">
        <input type="hidden" name="_to" value="info@britanniacrown.com" />
        <input type="hidden" name="_subject" value="New Website Enquiry - Britannia Crown" />
        <input type="hidden" name="_next" value="https://britanniacrown.com#thank-you" />

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name <span className="required">*</span></label>
            <input type="text" id="name" name="name" placeholder="Your full name" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number <span className="required">*</span></label>
            <input type="tel" id="phone" name="phone" placeholder="+971 50 123 4567" required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address <span className="required">*</span></label>
          <input type="email" id="email" name="email" placeholder="your.email@example.com" required />
        </div>

        <div className="form-group">
          <label htmlFor="service">Service Interested In <span className="required">*</span></label>
          <select key={preselectedService} id="service" name="service" required defaultValue={preselectedService}>
            <option value="">Select a service...</option>
            <option value="Nursery Search & Placement">Nursery Search & Placement (Ages 0-4)</option>
            <option value="School Search & Placement">School Search & Placement (Ages 4-18)</option>
            <option value="Subject Tutoring">Subject Tutoring (All Ages)</option>
            <option value="GCSE & A-Level Preparation">GCSE & A-Level Preparation (Ages 14-18)</option>
            <option value="Homeschool Support">Homeschool Support (All Ages)</option>
            <option value="Education Concierge">Education Concierge (Monthly Retainer)</option>
            <option value="General Enquiry">General Enquiry</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="child-age">Child&apos;s Age (Optional)</label>
          <input type="text" id="child-age" name="child-age" placeholder="e.g., 5 years old, Year 3, etc." />
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message <span className="required">*</span></label>
          <textarea id="message" name="message" placeholder="Tell us about your needs and how we can help..." required></textarea>
        </div>

        <details className="referral-disclosure">
          <summary>Have an ambassador referral code?</summary>
          <div className="form-group" style={{ marginTop: "16px" }}>
            <label htmlFor="referral-code">Ambassador Referral Code</label>
            <input type="text" id="referral-code" name="referral-code" placeholder="Enter ambassador code e.g. BC-SARA" />
          </div>
        </details>

        <button type="submit" className="form-submit">Send Message</button>
      </form>
    </div>
  );
}
