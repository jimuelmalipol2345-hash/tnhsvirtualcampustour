// navbar and footer
import { loadNavbar } from "./navbar.js";
loadNavbar();

import { loadFooter } from "./footer.js";
loadFooter();

// import back to top
import { loadBackToTop } from "./back-to-top.js";
loadBackToTop();

gsap.registerPlugin(ScrollTrigger);

// --- HERO SECTION ANIMATION ---
gsap.from(".hero-content", {
  duration: 1.5,
  opacity: 0,
  y: -50,
  ease: "power3.out",
  delay: 0.2,
});

// --- 1. VISION SECTION ANIMATION (Classic Fade In & Slide Up) ---
const visionTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".vision-container",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});
visionTimeline
  .to(".vision-container .section-title", {
    duration: 1,
    opacity: 1,
    y: 0,
    ease: "expo.out",
  })
  .to(
    ".vision-container .section-text",
    { duration: 1, opacity: 1, y: 0, ease: "expo.out" },
    "-=0.8"
  );

// --- 2. MISSION SECTION ANIMATION (Slide in from Left) ---
const missionTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".mission-container",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});
missionTimeline
  .to(".mission-container .section-title", {
    duration: 1.2,
    opacity: 1,
    x: 0,
    ease: "power3.out",
  })
  .to(
    ".mission-container .section-text",
    { duration: 1.2, opacity: 1, x: 0, ease: "power3.out" },
    "-=1"
  );

// --- 3. CORE VALUES ANIMATION (Staggered List Reveal) ---
const valuesTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".core-values-container",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
});
valuesTimeline
  .to(".core-values-container .section-title", {
    duration: 1,
    opacity: 1,
    y: 0,
    ease: "expo.out",
  })
  .to(
    ".core-values-list li",
    {
      duration: 0.8,
      opacity: 1,
      y: 0,
      stagger: 0.15, // This animates each 'li' one after the other
      ease: "power2.out",
    },
    "-=0.5"
  );

// --- 4. MANDATE SECTION ANIMATION (Scale Up & Fade In) ---
const mandateTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".mandate-container",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});
mandateTimeline
  .to(".mandate-container .section-title", {
    duration: 1.2,
    opacity: 1,
    scale: 1,
    ease: "back.out(1.4)",
  })
  .to(
    ".mandate-container .section-text",
    { duration: 1.2, opacity: 1, scale: 1, ease: "back.out(1.4)" },
    "-=1"
  );
