import Link from "next/link";

export default function Footer() {
  return (
    <footer id="about">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <svg className="footer-crown" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
              <path d="M20,120 L35,50 L70,90 L100,30 L130,90 L165,50 L180,120 Z" fill="#E8C89C" />
              <rect x="15" y="120" width="170" height="26" fill="#E8C89C" rx="3" />
            </svg>
            <span className="footer-brand-name">BRITANNIA CROWN</span>
          </div>
          <p className="footer-tagline">British education consultant in Dubai. IGCSE tutors, A-Level tutors, nursery search, school placement and homeschool support for British expat families across Dubai and the GCC.</p>
        </div>
        <div className="footer-col">
          <h3 className="footer-col-title">Explore</h3>
          <ul className="footer-links">
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/guides">Free Guides</Link></li>
            <li><Link href="/book-consultation">Book Consultation</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3 className="footer-col-title">Programme</h3>
          <ul className="footer-links">
            <li><Link href="/ambassador#how">How It Works</Link></li>
            <li><Link href="/ambassador#who">Who Can Join</Link></li>
            <li><Link href="/ambassador#earnings">Earnings</Link></li>
            <li><Link href="/ambassador#signup">Sign Up</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3 className="footer-col-title">Legal</h3>
          <ul className="footer-links">
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions">Terms and Conditions</Link></li>
            <li><Link href="/careers">Careers</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3 className="footer-col-title">Contact</h3>
          <ul className="footer-links">
            <li><a href="https://wa.me/971502635427">WhatsApp</a></li>
            <li><a href="mailto:hello@britanniacrown.com">hello@britanniacrown.com</a></li>
            <li><a href="https://instagram.com/britanniacrowneducation">Instagram</a></li>
            <li><Link href="/contact">Contact Form</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2026 Britannia Crown Education Consultants. UK Registered.</span>
        <div className="footer-social">
          <a href="https://instagram.com/britanniacrowneducation">Instagram</a>
          <a href="https://wa.me/971502635427">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
