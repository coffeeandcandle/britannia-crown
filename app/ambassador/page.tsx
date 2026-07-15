import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {
  SignUpIcon,
  ShareCodeIcon,
  FamilyBooksIcon,
  PaidIcon,
  NannyIcon,
  TeacherIcon,
  CommunityIcon,
} from "../components/Icons";

export const metadata: Metadata = {
  title: "Ambassador Programme | Britannia Crown",
  description: "Refer a family to Britannia Crown and earn 150 AED for every successful booking. No limit on referrals — join Dubai's British education ambassador programme.",
};

export default function AmbassadorPage() {
  return (
    <>
      <Nav />

      <section id="ambassador" style={{ background: "var(--dark-burgundy)", padding: "140px 60px 100px", width: "100%", maxWidth: "100%" }}>
        <div className="section-inner">
          <div className="section-eyebrow">
            <span className="section-eyebrow-line"></span>
            <span className="section-eyebrow-text">Britannia Crown · Ambassador Programme</span>
          </div>
          <h1 className="section-title" style={{ color: "var(--white)", maxWidth: "700px" }}>Earn While You <em style={{ color: "var(--champagne)" }}>Make a Difference</em> in a Child&apos;s Education</h1>
          <p style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.7)", fontWeight: 300, maxWidth: "580px", marginBottom: "40px" }}>You&apos;re already trusted by the families we want to reach. Refer a family to Britannia Crown and earn <strong style={{ color: "var(--champagne)" }}>150 AED</strong> for every successful booking. No limit on referrals.</p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <a href="#signup" className="btn-primary">Become an Ambassador →</a>
            <a href="#how" className="btn-secondary">How It Works</a>
          </div>
        </div>
      </section>

      {/* Reward Banner */}
      <div className="reward-banner">
        <div className="reward-inner">
          <div>
            <div className="reward-item-num">150 AED</div>
            <div className="reward-item-label">Per Successful Referral</div>
          </div>
          <div>
            <div className="reward-item-num">Unlimited</div>
            <div className="reward-item-label">Referrals You Can Make</div>
          </div>
          <div>
            <div className="reward-item-num">Your Code</div>
            <div className="reward-item-label">Personal & Unique to You</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section className="how" id="how">
        <div className="section-inner">
          <h2 className="section-title">How It Works — Simple &amp; Transparent</h2>
          <p className="section-lead">Four simple steps between signing up and getting paid.</p>

          <div className="steps-connector">
            <div className="connector-line"></div>
            <span className="connector-arrow">›</span>
            <div className="connector-line"></div>
            <span className="connector-arrow">›</span>
            <div className="connector-line"></div>
            <span className="connector-arrow">›</span>
            <div className="connector-line"></div>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <div className="step-card">
                <SignUpIcon className="step-icon" />
                <h3 className="step-title">Sign Up</h3>
                <p className="step-desc">Fill in the form below. We&apos;ll review your application and send you your unique personal ambassador code within 48 hours.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <div className="step-card">
                <ShareCodeIcon className="step-icon" />
                <h3 className="step-title">Share Your Code</h3>
                <p className="step-desc">Share your personal code at the park, at school, in WhatsApp groups, wherever you naturally talk to families. No selling — just a trusted recommendation.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <div className="step-card">
                <FamilyBooksIcon className="step-icon" />
                <h3 className="step-title">Family Books</h3>
                <p className="step-desc">When a family uses your code and books a paid session with Britannia Crown, the referral is confirmed as successful.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">04</div>
              <div className="step-card">
                <PaidIcon className="step-icon" />
                <h3 className="step-title">You Get Paid</h3>
                <p className="step-desc">150 AED is transferred directly to you. Every time. No caps, no limits — the more families you refer, the more you earn.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="who" id="who">
        <div className="section-inner">
          <div className="section-eyebrow">
            <span className="section-eyebrow-line"></span>
            <span className="section-eyebrow-text">Open to Everyone</span>
          </div>
          <h2 className="section-title">Who Can Become an Ambassador?</h2>
          <p className="section-lead">If you&apos;re trusted by families in Dubai&apos;s British expat community, you&apos;re exactly who we&apos;re looking for.</p>

          <div className="who-grid">
            <div className="who-card featured">
              <NannyIcon className="who-icon" />
              <h3 className="who-title">Nannies & Au Pairs</h3>
              <p className="who-desc">You&apos;re at the parks, the nurseries, the school gates — right where the conversations happen. Families trust your judgement on everything to do with the children in your care.</p>
              <span className="who-tag">Perfect Fit</span>
            </div>
            <div className="who-card featured" style={{ background: "var(--burgundy-alt)" }}>
              <TeacherIcon className="who-icon" />
              <h3 className="who-title">Teachers & Educators</h3>
              <p className="who-desc">You know exactly which students need extra support. Parents trust your academic expertise completely. A recommendation from a teacher carries unmatched credibility.</p>
              <span className="who-tag">Perfect Fit</span>
            </div>
            <div className="who-card">
              <CommunityIcon className="who-icon" />
              <h3 className="who-title">Parents & Community</h3>
              <p className="who-desc">Already part of the British expat community in Dubai? If your child has benefited from Britannia Crown, share the experience and earn for every family you bring on board.</p>
              <span className="who-tag">Welcome</span>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings */}
      <section className="earnings" id="earnings">
        <div className="earnings-inner">
          <div className="earnings-text">
            <div className="section-eyebrow">
              <span className="section-eyebrow-line"></span>
              <span className="section-eyebrow-text">Your Earnings</span>
            </div>
            <h2 className="section-title">The More You Share, <em>The More You Earn</em></h2>
            <p>There are no limits on how many referrals you can make. Every single successful booking earns you 150 AED — whether that&apos;s your first referral or your fiftieth.</p>
            <p>Think about the nanny networks, the school WhatsApp groups, the parents you speak to every day at pick-up. One message. One code. One booking.</p>
          </div>
          <div>
            <div className="earnings-table">
              <div className="earnings-row header">
                <div className="earnings-row-label">Referrals Made</div>
                <div className="earnings-row-label" style={{ textAlign: "right" }}>Your Earnings</div>
              </div>
              <div className="earnings-row">
                <div className="earnings-row-label main">1 referral</div>
                <div className="earnings-row-val">150 AED</div>
              </div>
              <div className="earnings-row">
                <div className="earnings-row-label main">5 referrals</div>
                <div className="earnings-row-val">750 AED</div>
              </div>
              <div className="earnings-row">
                <div className="earnings-row-label main">10 referrals</div>
                <div className="earnings-row-val">1,500 AED</div>
              </div>
              <div className="earnings-row">
                <div className="earnings-row-label main">25 referrals</div>
                <div className="earnings-row-val highlight">3,750 AED</div>
              </div>
            </div>
            <p className="earnings-note">* Earnings paid upon successful confirmed booking. No upper limit on referrals.</p>
          </div>
        </div>
      </section>

      {/* Your Code */}
      <section className="code-section">
        <div className="section-inner">
          <div style={{ textAlign: "center" }}>
            <div className="section-eyebrow" style={{ justifyContent: "center" }}>
              <span className="section-eyebrow-line"></span>
              <span className="section-eyebrow-text">Your Personal Code</span>
              <span className="section-eyebrow-line"></span>
            </div>
            <h2 className="section-title">Every Ambassador Gets Their Own Unique Code</h2>
            <p className="section-lead" style={{ maxWidth: "600px", margin: "0 auto 60px" }}>Your code is personal to you. Whoever uses it when booking gets associated with your account — so every successful referral is tracked back to you automatically.</p>
          </div>

          <div className="code-visual">
            <div className="code-card">
              <div className="code-label">Your Ambassador Code</div>
              <div className="code-display">BC-SARA</div>
              <div className="code-name">This is an example — your code is created when you sign up</div>
              <div className="code-reward">
                <div className="code-reward-num">150 AED</div>
                <div className="code-reward-text">earned per<br />successful referral</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="section-inner">
          <div className="section-eyebrow">
            <span className="section-eyebrow-line"></span>
            <span className="section-eyebrow-text">Questions Answered</span>
          </div>
          <h2 className="section-title">Frequently Asked Questions</h2>

          <div className="faq-grid">
            <div className="faq-item">
              <h3 className="faq-q">What counts as a successful referral?</h3>
              <p className="faq-a">A referral is successful when a family uses your personal code and completes a paid booking with Britannia Crown. Free consultations do not count — only confirmed paid sessions.</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-q">How and when do I get paid?</h3>
              <p className="faq-a">Once a referral is confirmed as successful we will contact you to arrange payment. We pay directly to your bank account or via bank transfer. Payments are processed within 7 days of confirmation.</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-q">Is there a limit on how many people I can refer?</h3>
              <p className="faq-a">Absolutely not. There is no cap on referrals. Refer as many families as you like — every single successful booking earns you 150 AED.</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-q">Do I need to be based in Dubai?</h3>
              <p className="faq-a">Yes — our services are focused on the Dubai and GCC market. We work with British expat families, so ambassadors who are embedded in that community will be most effective.</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-q">Can I be an ambassador if I already work with Britannia Crown as a tutor?</h3>
              <p className="faq-a">Yes. Tutors on our platform are welcome to join the Ambassador Programme. Any family you refer who is not already your client and books a new service qualifies.</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-q">How will I know when my code has been used?</h3>
              <p className="faq-a">We will notify you by WhatsApp or email whenever your code is used and when a referral is confirmed as successful. You&apos;ll always know exactly where you stand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sign-Up Form */}
      <section className="signup" id="signup">
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div className="section-eyebrow" style={{ justifyContent: "center" }}>
              <span className="section-eyebrow-line"></span>
              <span className="section-eyebrow-text">Join the Programme</span>
              <span className="section-eyebrow-line"></span>
            </div>
            <h2 className="section-title">Apply to Become an Ambassador</h2>
            <p className="section-lead" style={{ maxWidth: "560px", margin: "0 auto" }}>Fill in the form below and we&apos;ll be in touch within 48 hours with your personal ambassador code and everything you need to get started.</p>
          </div>

          <div className="signup-inner">
            <form action="https://formspree.io/f/xgopdnby" method="POST" id="ambassadorForm">
              <input type="hidden" name="_subject" value="New Ambassador Programme Application - Britannia Crown" />

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="amb-name">Full Name <span className="required">*</span></label>
                  <input type="text" id="amb-name" name="name" placeholder="Your full name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="amb-phone">WhatsApp Number <span className="required">*</span></label>
                  <input type="tel" id="amb-phone" name="phone" placeholder="+971 50 123 4567" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="amb-email">Email Address <span className="required">*</span></label>
                <input type="email" id="amb-email" name="email" placeholder="your.email@example.com" required />
              </div>

              <div className="form-group">
                <label htmlFor="role">Your Role <span className="required">*</span></label>
                <select id="role" name="role" required defaultValue="">
                  <option value="">Select your role...</option>
                  <option value="Nanny / Au Pair">Nanny / Au Pair</option>
                  <option value="Teacher / Educator">Teacher / Educator</option>
                  <option value="Parent">Parent</option>
                  <option value="Community Member">Community Member</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="code-preference">Preferred Ambassador Code (Optional)</label>
                <input type="text" id="code-preference" name="code-preference" placeholder="e.g. BC-SARA4 or BC-SMITH22 (we'll confirm availability)" />
                <small style={{ display: "block", marginTop: "6px", fontSize: "12px", color: "var(--text-mid)" }}>Code must be a mix of letters and numbers e.g. BC-SARA4 or BC-SMITH22</small>
              </div>

              <div className="form-group">
                <label htmlFor="network">Tell us about your network</label>
                <textarea id="network" name="network" placeholder="How do you plan to share your code? Who are you connected to? (e.g. nanny network, school staff, parent groups)"></textarea>
              </div>

              <button type="submit" className="form-submit">Apply to Become an Ambassador →</button>
              <p className="form-note">We&apos;ll review your application and be in touch within 48 hours.</p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
