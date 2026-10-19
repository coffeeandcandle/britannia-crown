import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";
import Image from "next/image";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import {
  NurseryIcon,
  SchoolIcon,
  TutorIcon,
  ExamPrepIcon,
  HomeschoolIcon,
  ConciergeIcon,
} from "../components/Icons";

export const metadata: Metadata = pageMetadata({
  title: "Moving to Dubai with Children? Schools & Tutoring | Britannia Crown",
  description:
    "Relocating to Dubai or the UAE? Nursery search, British school placement, IGCSE & A-Level tutoring and education concierge for families moving from the UK.",
  path: "/uae",
});

export default function ServicesPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="Moving to the UAE"
        title="Relocating to Dubai? Your Child's Education, Sorted Before You Land"
        subtitle="We advise UK families moving to the UAE — from nursery and school placement to British-curriculum tutors in Dubai — so your child's education continues without a break."
      />

      <section className="services" id="services">
        <div className="section-inner">
          <div className="services-grid">
            <div className="service-card">
              <NurseryIcon className="service-icon" />
              <span className="service-age">Ages 0-4</span>
              <h2 className="service-title">Nursery Search & Placement</h2>
              <p className="service-desc">Finding the right EYFS nursery for your child. We research, shortlist, coordinate visits, and handle the entire application process.</p>
              <div className="service-price">
                <span className="service-price-amount">AED 3,000</span>
                <span className="service-price-unit">one-time</span>
              </div>
              <Link href={{ pathname: "/contact", query: { service: "Nursery Search & Placement" } }} className="service-cta">Learn More</Link>
            </div>

            <div className="service-card featured">
              <SchoolIcon className="service-icon" />
              <span className="service-age">Ages 4-18</span>
              <h2 className="service-title">School Search & Placement</h2>
              <p className="service-desc">Expert guidance through Dubai&apos;s British curriculum school landscape. From FS1 through to Sixth Form, we find the perfect match for your family.</p>
              <div className="service-price">
                <span className="service-price-amount">AED 8,000</span>
                <span className="service-price-unit">one-time</span>
              </div>
              <Link href={{ pathname: "/contact", query: { service: "School Search & Placement" } }} className="service-cta">Get Started</Link>
            </div>

            <div className="service-card">
              <TutorIcon className="service-icon" />
              <span className="service-age">All Ages</span>
              <h2 className="service-title">UK Curriculum Tutors Dubai</h2>
              <p className="service-desc">Private British tutors in Dubai across all subjects. UK-qualified educators and experienced Dubai-based tutors for 1-to-1 tuition aligned to the British national curriculum.</p>
              <div className="service-price">
                <span className="service-price-amount">AED 300-350</span>
                <span className="service-price-unit">per hour</span>
              </div>
              <Link href={{ pathname: "/contact", query: { service: "Subject Tutoring" } }} className="service-cta">Find a Tutor</Link>
            </div>

            <div className="service-card">
              <ExamPrepIcon className="service-icon" />
              <span className="service-age">Ages 14-18</span>
              <h2 className="service-title">GCSE & A-Level Preparation</h2>
              <p className="service-desc">Exam technique coaching from specialists, including actual GCSE examiners. Past papers, mark schemes, revision planning, and mock exams.</p>
              <div className="service-price">
                <span className="service-price-amount">AED 5,000</span>
                <span className="service-price-unit">per term</span>
              </div>
              <Link href={{ pathname: "/contact", query: { service: "GCSE & A-Level Preparation" } }} className="service-cta">Start Prep</Link>
            </div>

            <div className="service-card">
              <HomeschoolIcon className="service-icon" />
              <span className="service-age">All Ages</span>
              <h2 className="service-title">British Homeschool Support Dubai</h2>
              <p className="service-desc">Full British curriculum homeschool support for Dubai and GCC families. Cambridge and Edexcel curriculum design, UK tutor coordination, term planning and progress tracking.</p>
              <div className="service-price">
                <span className="service-price-amount">AED 7,000</span>
                <span className="service-price-unit">per term</span>
              </div>
              <Link href={{ pathname: "/contact", query: { service: "Homeschool Support" } }} className="service-cta">Explore Homeschool</Link>
            </div>

            <div className="service-card featured">
              <ConciergeIcon className="service-icon" />
              <span className="service-age">Ongoing</span>
              <h2 className="service-title">Education Concierge Dubai</h2>
              <p className="service-desc">Dubai&apos;s only full-service British education concierge. Your dedicated UK curriculum education manager — monthly strategy, unlimited WhatsApp support, tutor and school liaison.</p>
              <div className="service-price">
                <span className="service-price-amount">AED 2,500</span>
                <span className="service-price-unit">per month</span>
              </div>
              <Link href={{ pathname: "/contact", query: { service: "Education Concierge" } }} className="service-cta">Partner With Us</Link>
            </div>
          </div>

          {/* Early Years Image Section */}
          <div className="image-text-section">
            <div className="image-text-media">
              <Image
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80"
                alt="EYFS nursery search Dubai expat families British curriculum"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
            <div className="image-text-content">
              <h3>EYFS Nursery Search — Dubai Expat Specialists</h3>
              <p>Finding the right British EYFS nursery in Dubai sets the foundation for your child&apos;s entire educational journey. We understand Dubai&apos;s nursery landscape and match expat families with settings that align with UK early years standards.</p>
              <p>From full-day care to part-time nursery sessions, we guide you through KHDA ratings, staff qualifications, and the transition to FS1 at a British curriculum school.</p>
              <Link href={{ pathname: "/contact", query: { service: "Nursery Search & Placement" } }} className="btn-primary">Find the Right Nursery</Link>
            </div>
          </div>

          {/* GCSE Prep Image Section */}
          <div className="image-text-section reverse">
            <div className="image-text-media">
              <Image
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80"
                alt="IGCSE GCSE A-Level tutor Dubai British curriculum exam preparation"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
            <div className="image-text-content">
              <h3>GCSE & A-Level Excellence</h3>
              <p>Exam technique coaching from actual GCSE and A-Level examiners. We don&apos;t just teach content—we teach how to demonstrate knowledge under exam conditions.</p>
              <p>Past paper practice, mark scheme analysis, revision planning, and mock exams that replicate real assessment environments.</p>
              <Link href={{ pathname: "/contact", query: { service: "GCSE & A-Level Preparation" } }} className="btn-primary">Start Exam Prep</Link>
            </div>
          </div>

          {/* Video Call Learning Image */}
          <div className="full-width-image">
            <Image
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=80"
              alt="British tutor Dubai online UK curriculum tutoring expat families"
              fill
              style={{ objectFit: "cover" }}
              sizes="100vw"
            />
            <div className="full-width-image-overlay">
              <div>
                <h3>British Tutors Dubai — UK-Qualified, Dubai Time Zone</h3>
                <p>Access qualified British tutors currently working in UK schools today. Online sessions timed to Dubai, delivering authentic UK curriculum tuition direct to your home across Dubai and the GCC.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
