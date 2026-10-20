import Link from "next/link";
import { services } from "../lib/services";
import { subjects } from "../lib/subjects";
import { EMAIL, INSTAGRAM_URL } from "../lib/site";
import Crown from "./Crown";

export default function Footer() {
  return (
    <footer className="site-footer site-chrome">
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
              <Link href="/contact">Send an enquiry</Link>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </div>
          <div className="footer-col">
            <h2>Services</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>
              ))}
              <li><Link href="/pricing#consultation">Strategy session</Link></li>
              <li><Link href="/pricing">Prices</Link></li>
              <li><Link href="/how-it-works">How it works</Link></li>
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
              <li><Link href="/portal/login">Log in</Link></li>
              <li><Link href="/portal/join">Sign up</Link></li>
              <li><Link href="/ambassador">Ambassador Programme</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><a href={INSTAGRAM_URL}>Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Britannia Crown Education Consultants. Photography from{" "}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a> contributors.
          </span>
          <nav aria-label="Legal">
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms-and-conditions">Terms and conditions</Link>
            <Link href="/refunds-and-cancellations">Refunds and cancellations</Link>
            <Link href="/portal/staff/sign-in">Tutor, consultant and admin login</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
