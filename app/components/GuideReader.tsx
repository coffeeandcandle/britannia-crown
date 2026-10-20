"use client";

import { useEffect, useRef, useState } from "react";

type TocItem = { id: string; text: string };

// Thin bar under the header showing how far through the article the reader is.
export function ReadingProgress({ target }: { target: string }) {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>(target);
    if (!el) return;
    let frame = 0;
    function update() {
      frame = 0;
      const rect = el!.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [target]);

  return (
    <div className="gd-progress" aria-hidden="true">
      <span ref={bar} />
    </div>
  );
}

// "On this page" list that highlights the section currently being read.
export function GuideToc({ toc }: { toc: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = toc.map((t) => document.getElementById(t.id)).filter((h): h is HTMLElement => h !== null);
    if (headings.length === 0) return;
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        // The active section is the last heading that has scrolled past the top band.
        const line = window.innerHeight * 0.3;
        let current: string | null = null;
        for (const h of headings) {
          if (h.getBoundingClientRect().top <= line) current = h.id;
        }
        setActive(current ?? headings[0].id);
      },
      { rootMargin: "0px 0px -60% 0px", threshold: [0, 1] },
    );
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [toc]);

  return (
    <nav className="gd-toc" aria-label="On this page">
      <p className="gd-toc-title">On this page</p>
      <ol>
        {toc.map((t) => (
          <li key={t.id}>
            <a href={`#${t.id}`} aria-current={active === t.id ? "true" : undefined}>
              {t.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
