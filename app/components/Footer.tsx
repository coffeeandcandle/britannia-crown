import Link from "next/link";
import { services } from "../lib/services";
import { subjects } from "../lib/subjects";
import { EMAIL, INSTAGRAM_URL, WHATSAPP_URL } from "../lib/site";
import Crown from "./Crown";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="uk-wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="Britannia Crown, home">
              <Crown light />
              <span>
                <span className="brand-name">Britannia Crown</span>
                <span className="brand-sub">Education Consultants</span>
              </span>
            </Link>
            <p>British education consultants: private tutoring, home education, school placement and qualifications, plus advice for families moving to the UAE.</p>
            <div className="footer-contact">
              <Link href="/book-consultation">Book a free 30-minute call →</Link>
              <a href={WHATSAPP_URL}>WhatsApp us</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </div>
          <div className="footer-col">
            <h2>Services</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>
              ))}
              <li><Link href="/membership">Academic Partner Membership</Link></li>
              <li><Link href="/uae">Moving to the UAE</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h2>Tutors</h2>
            <ul>
              {subjects.map((s) => (
                <li key={s.slug}><Link href={`/tutors/${s.slug}`}>{s.name}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h2>Resources</h2>
            <ul>
              <li><Link href="/guides">Guides for parents</Link></li>
              <li><Link href="/tools/school-dates">School dates calculator</Link></li>
              <li><Link href="/tools/gcse-grade-converter">GCSE grade converter</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h2>Company</h2>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/portal">Client login</Link></li>
              <li><Link href="/ambassador">Ambassador Programme</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><a href={INSTAGRAM_URL}>Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Britannia Crown Education Consultants</span>
          <nav aria-label="Legal">
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms-and-conditions">Terms and conditions</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
