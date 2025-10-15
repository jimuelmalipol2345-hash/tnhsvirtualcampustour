// navbar and footer
import { loadNavbar } from "./navbar.js";
loadNavbar();

import { loadFooter } from "./footer.js";
loadFooter();

// import back to top
import { loadBackToTop } from "./back-to-top.js";
loadBackToTop();


// header text animation
gsap.to(".header-content-animation", {
  duration: 3,
  opacity: 1,
  ease: "power2.inOut",
});

// welcome section
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  gsap.utils.toArray(".card").forEach((card) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(card.querySelector("h1"), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }).from(
      card.querySelector("p"),
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.3"
    );
  });
});

// Apply hover effect to all card images
document.querySelectorAll(".card-hover-image img").forEach((img) => {
  img.addEventListener("mouseenter", () => {
    gsap.to(img, {
      y: -20, // move upward
      duration: 0.4,
      ease: "bounce.out",
    });
  });

  img.addEventListener("mouseleave", () => {
    gsap.to(img, {
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  });
});

// Testimonials
document.addEventListener("DOMContentLoaded", () => {
  // Testimonials data (change/extend this array)
  const testimonials = [
    {
      name: "Maria Dela Cruz",
      role: "Grade 12 Student",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a9b7d9b3f6f8b9f",
      quote:
        "What I love most is how approachable and supportive the teachers are. They go beyond the classroom to make sure we truly understand and feel confident.",
    },
    {
      name: "Miguel Santos",
      role: "Grade 11 Student",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a9b7d9b3f6f8b9f",
      quote:
        "The school community is amazing — classmates, teachers, and staff treat each other with respect. It’s a place where you feel motivated to do your best.",
    },
    {
      name: "Rosa Reyes",
      role: "Grade 10 Student",
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8e2b9c9f1a2b3c4d",
      quote:
        "Every corner of the campus inspires learning, from the peaceful library to the open spaces. It’s the perfect environment for both studying and relaxing.",
    },
    {
      name: "Teresa Garcia",
      role: "Grade 9 Student",
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8e2b9c9f1a2b3c4d",
      quote:
        "I always look forward to coming here. The atmosphere is positive, safe, and filled with opportunities to learn new things every day.",
    },
  ];

  const slidesEl = document.getElementById("slides");
  const dotsEl = document.getElementById("dots");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  let index = 0;
  let autoPlayDelay = 4500; // ms
  let autoplayTimer = null;
  let isHover = false;

  // Render slides and dots
  function render() {
    slidesEl.innerHTML = "";
    dotsEl.innerHTML = "";
    testimonials.forEach((t, i) => {
      const slide = document.createElement("article");
      slide.className = "slide";
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", `${i + 1} of ${testimonials.length}`);
      slide.innerHTML = `
            <figure class="avatar"><img src="${t.avatar}" alt="${t.name}" loading="lazy"></figure>
            <div class="body">
              <blockquote class="quote">“${t.quote}”</blockquote>
              <div class="meta">
                <div>
                  <div class="name">${t.name}</div>
                  <div class="role">${t.role}</div>
                </div>
              </div>
            </div>
          `;
      slidesEl.appendChild(slide);

      const dot = document.createElement("button");
      dot.className = "dot";
      dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
      dot.setAttribute("role", "tab");
      dot.addEventListener("click", () => goTo(i));
      dotsEl.appendChild(dot);
    });
  }

  render();

  // GSAP timeline for transitions
  const tl = gsap.timeline({ paused: true });

  function setupTimeline() {
    const slides = Array.from(document.querySelectorAll(".slide"));
    tl.clear();
    slides.forEach((s) => {
      gsap.set(s, { autoAlpha: 0, y: 16, scale: 0.996 });
    });
    tl.to(slides[index], {
      duration: 0.45,
      autoAlpha: 1,
      y: 0,
      scale: 1,
      ease: "power3.out",
    });
  }

  function updateActive() {
    const slides = document.querySelectorAll(".slide");
    slides.forEach((s, i) => {
      s.classList.toggle("active", i === index);
    });
    const dots = document.querySelectorAll(".dot");
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function goTo(i) {
    if (i === index) return;
    const slides = document.querySelectorAll(".slide");
    const current = slides[index];
    const next = slides[i];

    gsap
      .timeline()
      .to(current, {
        duration: 0.35,
        autoAlpha: 0,
        y: -12,
        scale: 0.994,
        ease: "power2.inOut",
      })
      .fromTo(
        next,
        { autoAlpha: 0, y: 12, scale: 0.996 },
        { duration: 0.45, autoAlpha: 1, y: 0, scale: 1, ease: "power3.out" },
        "-=0.18"
      );

    index = i;
    updateActive();
    resetAutoplay();
  }

  function next() {
    goTo((index + 1) % testimonials.length);
  }
  function prev() {
    goTo((index - 1 + testimonials.length) % testimonials.length);
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  // keyboard support
  document.querySelector(".carousel").addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  // hover to pause
  const carouselEl = document.querySelector(".carousel");
  carouselEl.addEventListener("mouseenter", () => (isHover = true));
  carouselEl.addEventListener("mouseleave", () => (isHover = false));

  // autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      if (!isHover) next();
    }, autoPlayDelay);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
  function resetAutoplay() {
    startAutoplay();
  }

  // init
  (function init() {
    setupTimeline();
    updateActive();
    startAutoplay();
  })();

  // expose a small API
  window.testimonialsWidget = {
    goTo,
    next,
    prev,
    play: startAutoplay,
    pause: stopAutoplay,
    setAutoplayDelay(d) {
      autoPlayDelay = d;
      resetAutoplay();
    },
  };
});

// const backToTop = document.getElementById("backToTop");

// Show button when scrolling down
// window.addEventListener("scroll", () => {
//   if (window.scrollY > 300) {
//     backToTop.style.display = "block";
//   } else {
//     backToTop.style.display = "none";
//   }
// });

// Smooth scroll to top
// backToTop.addEventListener("click", () => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// });
