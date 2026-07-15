import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Free Guides for British Expat Families in Dubai | Britannia Crown",
  description: "Four free practical guides for British expat families in Dubai: EYFS nursery search, school waitlists, IGCSE vs GCSE, and homeschooling under the British curriculum.",
};

export default function GuidesPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="Free Guides"
        title="Free Guides for British Expat Families in Dubai"
        subtitle="We've written four practical guides covering the questions British expat families ask us most. Enter your name and email and we'll send the PDF straight to your inbox — free, no obligation."
      />

      <section id="guides" style={{ background: "var(--white)", padding: "100px 60px", overflow: "hidden", width: "100%", maxWidth: "100%" }}>
        <div className="section-inner">

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px", marginTop: "52px" }}>
            {/* Guide 1 */}
            <div style={{ background: "var(--off-white)", border: "1px solid rgba(107,30,61,0.08)", borderRadius: "4px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ background: "var(--burgundy)", padding: "28px 24px 20px" }}>
                <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--champagne)", opacity: 0.85, marginBottom: "8px" }}>Guide 1 · Ages 0–4</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "var(--champagne)", lineHeight: 1.25, margin: 0 }}>Finding the Right EYFS Nursery in Dubai</h2>
              </div>
              <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--text-mid)", fontWeight: 300, marginBottom: "16px", flex: 1 }}>KHDA ratings explained, what to look for on visits, how waitlists work, and the transition from nursery to FS1.</p>
                <form action="https://formspree.io/f/xpqobbpo" method="POST" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <input type="hidden" name="_subject" value="Guide Request: EYFS Nursery Dubai" />
                  <input type="hidden" name="guide" value="Guide 1 — Finding the Right EYFS Nursery in Dubai" />
                  <input type="text" name="name" placeholder="Your name" required style={{ padding: "11px 14px", border: "1px solid rgba(107,30,61,0.15)", borderRadius: "2px", fontFamily: "'Jost', sans-serif", fontSize: "14px", color: "var(--text-dark)", background: "white", outline: "none" }} />
                  <input type="email" name="email" placeholder="Your email address" required style={{ padding: "11px 14px", border: "1px solid rgba(107,30,61,0.15)", borderRadius: "2px", fontFamily: "'Jost', sans-serif", fontSize: "14px", color: "var(--text-dark)", background: "white", outline: "none" }} />
                  <button type="submit" style={{ padding: "13px", background: "var(--burgundy)", color: "var(--champagne)", border: "none", borderRadius: "2px", fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }}>Send Me This Guide →</button>
                </form>
              </div>
            </div>

            {/* Guide 2 */}
            <div style={{ background: "var(--off-white)", border: "1px solid rgba(107,30,61,0.08)", borderRadius: "4px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ background: "var(--dark-burgundy)", padding: "28px 24px 20px" }}>
                <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--champagne)", opacity: 0.85, marginBottom: "8px" }}>Guide 2 · Ages 4–18</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "var(--champagne)", lineHeight: 1.25, margin: 0 }}>British School Waitlists in Dubai — Explained</h2>
              </div>
              <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--text-mid)", fontWeight: 300, marginBottom: "16px", flex: 1 }}>How waitlists work, a strategic approach to applications, understanding KHDA ratings, and how to give your child the best chance.</p>
                <form action="https://formspree.io/f/xpqobbpo" method="POST" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <input type="hidden" name="_subject" value="Guide Request: British School Waitlists Dubai" />
                  <input type="hidden" name="guide" value="Guide 2 — British School Waitlists Dubai" />
                  <input type="text" name="name" placeholder="Your name" required style={{ padding: "11px 14px", border: "1px solid rgba(107,30,61,0.15)", borderRadius: "2px", fontFamily: "'Jost', sans-serif", fontSize: "14px", color: "var(--text-dark)", background: "white", outline: "none" }} />
                  <input type="email" name="email" placeholder="Your email address" required style={{ padding: "11px 14px", border: "1px solid rgba(107,30,61,0.15)", borderRadius: "2px", fontFamily: "'Jost', sans-serif", fontSize: "14px", color: "var(--text-dark)", background: "white", outline: "none" }} />
                  <button type="submit" style={{ padding: "13px", background: "var(--dark-burgundy)", color: "var(--champagne)", border: "none", borderRadius: "2px", fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }}>Send Me This Guide →</button>
                </form>
              </div>
            </div>

            {/* Guide 3 */}
            <div style={{ background: "var(--off-white)", border: "1px solid rgba(107,30,61,0.08)", borderRadius: "4px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ background: "var(--burgundy)", padding: "28px 24px 20px" }}>
                <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--champagne)", opacity: 0.85, marginBottom: "8px" }}>Guide 3 · Ages 11–18</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "var(--champagne)", lineHeight: 1.25, margin: 0 }}>IGCSE vs GCSE — What Dubai Parents Need to Know</h2>
              </div>
              <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--text-mid)", fontWeight: 300, marginBottom: "16px", flex: 1 }}>The difference between IGCSE and GCSE, which exam board your child&apos;s school uses, and what it means for tutoring and university applications.</p>
                <form action="https://formspree.io/f/xpqobbpo" method="POST" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <input type="hidden" name="_subject" value="Guide Request: IGCSE vs GCSE Dubai" />
                  <input type="hidden" name="guide" value="Guide 3 — IGCSE vs GCSE Dubai" />
                  <input type="text" name="name" placeholder="Your name" required style={{ padding: "11px 14px", border: "1px solid rgba(107,30,61,0.15)", borderRadius: "2px", fontFamily: "'Jost', sans-serif", fontSize: "14px", color: "var(--text-dark)", background: "white", outline: "none" }} />
                  <input type="email" name="email" placeholder="Your email address" required style={{ padding: "11px 14px", border: "1px solid rgba(107,30,61,0.15)", borderRadius: "2px", fontFamily: "'Jost', sans-serif", fontSize: "14px", color: "var(--text-dark)", background: "white", outline: "none" }} />
                  <button type="submit" style={{ padding: "13px", background: "var(--burgundy)", color: "var(--champagne)", border: "none", borderRadius: "2px", fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }}>Send Me This Guide →</button>
                </form>
              </div>
            </div>

            {/* Guide 4 */}
            <div style={{ background: "var(--off-white)", border: "1px solid rgba(107,30,61,0.08)", borderRadius: "4px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ background: "var(--dark-burgundy)", padding: "28px 24px 20px" }}>
                <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--champagne)", opacity: 0.85, marginBottom: "8px" }}>Guide 4 · All Ages</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "var(--champagne)", lineHeight: 1.25, margin: 0 }}>Homeschooling in Dubai — The British Curriculum Guide</h2>
              </div>
              <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--text-mid)", fontWeight: 300, marginBottom: "16px", flex: 1 }}>Is home education legal in Dubai? Cambridge vs Edexcel, how to sit exams as a private candidate, and building a curriculum that works.</p>
                <form action="https://formspree.io/f/xpqobbpo" method="POST" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <input type="hidden" name="_subject" value="Guide Request: Homeschooling Dubai" />
                  <input type="hidden" name="guide" value="Guide 4 — Homeschooling in Dubai" />
                  <input type="text" name="name" placeholder="Your name" required style={{ padding: "11px 14px", border: "1px solid rgba(107,30,61,0.15)", borderRadius: "2px", fontFamily: "'Jost', sans-serif", fontSize: "14px", color: "var(--text-dark)", background: "white", outline: "none" }} />
                  <input type="email" name="email" placeholder="Your email address" required style={{ padding: "11px 14px", border: "1px solid rgba(107,30,61,0.15)", borderRadius: "2px", fontFamily: "'Jost', sans-serif", fontSize: "14px", color: "var(--text-dark)", background: "white", outline: "none" }} />
                  <button type="submit" style={{ padding: "13px", background: "var(--dark-burgundy)", color: "var(--champagne)", border: "none", borderRadius: "2px", fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }}>Send Me This Guide →</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
