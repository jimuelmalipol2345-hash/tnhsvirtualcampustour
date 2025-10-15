// navbar and footer
import { loadNavbar } from "./navbar.js";
loadNavbar();

import { loadFooter } from "./footer.js";
loadFooter();

// import back to top
import { loadBackToTop } from "./back-to-top.js";
loadBackToTop();

document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // 1. Header Animation on Page Load
  gsap.to(".header-content", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    delay: 0.5,
  });

  // 2. Animate Content Sections on Scroll
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((section) => {
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 100%", // Animation starts when the top of the section is 80% down the viewport
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power1.out",
    });
  });

  // 3. Side Panel Active Link Highlighting on Scroll
  const navLinks = document.querySelectorAll(".side-panel nav a");
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => {
        const targetLink = document.querySelector(`a[href="#${section.id}"]`);
        if (self.isActive) {
          navLinks.forEach((link) => link.classList.remove("active"));
          targetLink.classList.add("active");
        } else {
          targetLink.classList.remove("active");
        }
      },
    });
  });

  // 4. ADD THIS: Animate Feature Cards on Hover
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.3,
        ease: "power1.out",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "power1.out",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.07)",
      });
    });
  });

  const slides = Array.from(document.querySelectorAll(".carousel-slide"));
  const nav = document.querySelector(".carousel-nav");
  let currentIndex = 0;
  let isAnimating = false;
  const DURATION = 0.8;
  const EASE = "power2.inOut";
  const AUTOPLAY_INTERVAL = 4000; // 4 seconds
  let autoplayTimer;

  // --- Build thumbnails ---
  const navThumbs = [];
  slides.forEach((slide, i) => {
    const thumb = document.createElement("div");
    thumb.className = "thumb";
    thumb.innerHTML = `<img src="${
      slide.querySelector("img").src
    }" alt="thumb ${i + 1}">`;
    if (i === 0) thumb.classList.add("active");
    thumb.addEventListener("click", () => goToSlide(i));
    nav.appendChild(thumb);
    navThumbs.push(thumb);
  });

  // --- Init positions ---
  gsap.set(slides, { y: "100%", opacity: 0 });
  gsap.set(slides[0], { y: "0%", opacity: 1 });
  slides[0].classList.add("active");

  function goToSlide(index) {
    if (index === currentIndex || isAnimating) return;
    isAnimating = true;

    const dir = index > currentIndex ? 1 : -1;
    const current = slides[currentIndex];
    const next = slides[index];

    gsap.set(next, { y: `${100 * dir}%`, opacity: 1 });
    next.classList.add("active");

    const tl = gsap.timeline({
      defaults: { duration: DURATION, ease: EASE },
      onComplete: () => {
        current.classList.remove("active");
        gsap.set(current, { opacity: 0, clearProps: "y" });
        isAnimating = false;
      },
    });

    tl.to(current, { y: `${-100 * dir}%`, opacity: 0 }, 0).to(
      next,
      { y: "0%" },
      0
    );

    navThumbs[currentIndex].classList.remove("active");
    navThumbs[index].classList.add("active");

    currentIndex = index;
  }

  // --- Autoplay ---
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      const next = (currentIndex + 1) % slides.length;
      goToSlide(next);
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  // Start autoplay on load
  startAutoplay();

  // Pause on hover
  const carousel = document.getElementById("carousel");
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
});
