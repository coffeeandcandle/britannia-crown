"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Gentle "settle into place" motion for content as it scrolls into view.
//
// Rules that keep it safe and fast:
//  - Nothing in the first screen is ever hidden, so the page never looks empty on load.
//  - Content already scrolled past (anchor jumps, back navigation) appears at once.
//  - A timer reveals everything after 2.5s, and printing reveals everything, so nothing can
//    stay hidden if an observer misfires.
//  - People who ask for reduced motion get no animation at all.
//  - It only toggles a class; the movement is CSS (transform and opacity), so there is no layout shift.
export default function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const units: HTMLElement[] = [];
    const cleanups: Array<() => void> = [];

    // Wait for the page's own view transition to settle before measuring.
    const start = window.setTimeout(() => {
      const vh = window.innerHeight;
      const sections = document.querySelectorAll<HTMLElement>("main .uk-section");
      sections.forEach((section) => {
        const container = section.querySelector<HTMLElement>(":scope > .uk-wrap") ?? section;
        Array.from(container.children).forEach((child) => {
          if (!(child instanceof HTMLElement)) return;
          // A grid of cards: reveal the cards one after another instead of the grid as a block.
          const kids = Array.from(child.children).filter((k): k is HTMLElement => k instanceof HTMLElement);
          const isGrid = kids.length >= 2 && kids.length <= 12 && getComputedStyle(child).display.includes("grid");
          (isGrid ? kids : [child]).forEach((el, i) => {
            if (el.getBoundingClientRect().top < vh * 0.92) return;
            el.setAttribute("data-rv", "");
            if (isGrid) el.style.setProperty("--rv-delay", `${Math.min(i, 5) * 70}ms`);
            units.push(el);
          });
        });
      });
      if (!units.length) return;

      document.documentElement.classList.add("rv-ready");
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
              entry.target.setAttribute("data-rv", "in");
              io.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
      );
      units.forEach((u) => io.observe(u));

      const revealAll = () => units.forEach((u) => u.setAttribute("data-rv", "in"));
      const failsafe = window.setTimeout(revealAll, 2500);
      window.addEventListener("beforeprint", revealAll);
      cleanups.push(() => {
        io.disconnect();
        window.clearTimeout(failsafe);
        window.removeEventListener("beforeprint", revealAll);
      });
    }, 350);

    return () => {
      window.clearTimeout(start);
      cleanups.forEach((fn) => fn());
      units.forEach((u) => {
        u.removeAttribute("data-rv");
        u.style.removeProperty("--rv-delay");
      });
      document.documentElement.classList.remove("rv-ready");
    };
  }, [pathname]);

  return null;
}
