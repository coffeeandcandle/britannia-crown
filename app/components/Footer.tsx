import Link from "next/link";
import { services } from "../lib/services";
import { subjects } from "../lib/subjects";
import { EMAIL, INSTAGRAM_URL, WHATSAPP_URL } from "../lib/site";

export default function Footer() {
  return (
    <footer id="about">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <svg className="footer-crown" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M20,120 L35,50 L70,90 L100,30 L130,90 L165,50 L180,120 Z" fill="#E8C89C" />
              <rect x="15" y="120" width="170" height="26" fill="#E8C89C" rx="3" />
            </svg>
            <span className="footer-brand-name">BRITANNIA CROWN</span>
          </div>
          <p className="footer-tagline">British education consultants. Private tutoring, home education, school placement and qualifications from UK-trained educators — and advice for families relocating to the UAE.</p>
          <Link href="/book-consultation" className="footer-cta">Book a free consultation →</Link>
        </div>
        <div className="footer-col">
          <h3 className="footer-col-title">Services</h3>
          <ul className="footer-links">
            {services.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>
            ))}
            <li><Link href="/uae">Moving to the UAE</Link></li>
            <li><Link href="/membership">Academic Partner Membership</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3 className="footer-col-title">Tutors</h3>
          <ul className="footer-links">
            {subjects.map((s) => (
              <li key={s.slug}><Link href={`/tutors/${s.slug}`}>{s.name} tutors</Link></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h3 className="footer-col-title">Company</h3>
          <ul className="footer-links">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/guides">Free Guides</Link></li>
            <li><Link href="/ambassador">Ambassador Programme</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3 className="footer-col-title">Contact</h3>
          <ul className="footer-links">
            <li><a href={WHATSAPP_URL}>WhatsApp</a></li>
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><a href={INSTAGRAM_URL}>Instagram</a></li>
            <li><Link href="/contact">Contact Form</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2026 Britannia Crown Education Consultants. UK Registered.</span>
        <div className="footer-social">
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms-and-conditions">Terms</Link>
          <a href={INSTAGRAM_URL}>Instagram</a>
          <a href={WHATSAPP_URL}>WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
