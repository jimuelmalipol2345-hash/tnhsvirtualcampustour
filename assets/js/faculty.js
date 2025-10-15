// Import shared components
import { loadNavbar } from "./navbar.js";
loadNavbar();

import { loadFooter } from "./footer.js";
loadFooter();

import { loadBackToTop } from "./back-to-top.js";
loadBackToTop();

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Draggable);

// --- GSAP ANIMATIONS ---

// 1. Header Animation (Unchanged)
gsap.from(".faculty-header h1, .faculty-header p", {
  duration: 1.5,
  y: 30,
  opacity: 0,
  ease: "power3.out",
  stagger: 0.2,
  delay: 0.2,
});

// 2. Animate the whole carousel section into view (Unchanged)
gsap.from(".carousel-section", {
  duration: 1.5,
  y: 50,
  opacity: 0,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".carousel-section",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});


// --- FINAL - INFINITE DRAGGABLE CAROUSEL ---
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".carousel-slider");
    const cards = gsap.utils.toArray(".faculty-card");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const cardWidth = cards[0].offsetWidth + 30; // card width + margin
    const numCards = cards.length;
    const realSlidesWidth = cardWidth * numCards;

    // Clone cards to create three sets for a robust loop
    // [prepended set] [real set] [appended set]
    cards.forEach(card => slider.appendChild(card.cloneNode(true)));
    cards.slice().reverse().forEach(card => slider.prepend(card.cloneNode(true)));

    // Set initial position to the start of the "real" slides
    const initialX = -realSlidesWidth;
    gsap.set(slider, { x: initialX });

    // Create a wrapping function with the CORRECT range
    const wrapX = gsap.utils.wrap(-realSlidesWidth * 2, -realSlidesWidth);

    // Create the Draggable instance
    const draggableInstance = Draggable.create(slider, {
        type: "x",
        inertia: true,
        // Snap to the closest card position after drag/flick
        snap: {
            x: gsap.utils.snap(-cardWidth)
        },
        // When the drag ends, apply the wrapping to create the infinite loop
        onDragEnd: function() {
            const wrappedX = wrapX(this.endX);
            // Instantly jump to the wrapped position to maintain the loop
            gsap.set(slider, { x: wrappedX });
            // It's good practice to update Draggable's internal values
            this.update(); 
        }
    });

    // Animate to a new position and then apply the wrap
    function animateTo(targetX) {
        gsap.to(slider, {
            x: targetX,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
                const wrappedX = wrapX(targetX);
                gsap.set(slider, { x: wrappedX });
                // Update Draggable to reflect the new position
                draggableInstance[0].update();
            }
        });
    }

    // --- Corrected Button Controls ---
    nextBtn.addEventListener("click", () => {
        // Use Draggable's own x value for consistency
        const currentX = draggableInstance[0].x;
        // Calculate the next card's position
        const targetX = Math.round(currentX / cardWidth) * cardWidth - cardWidth;
        animateTo(targetX);
    });

    prevBtn.addEventListener("click", () => {
        const currentX = draggableInstance[0].x;
        // Calculate the previous card's position
        const targetX = Math.round(currentX / cardWidth) * cardWidth + cardWidth;
        animateTo(targetX);
    });
});


// --- MODAL FUNCTIONALITY (Unchanged) ---
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('faculty-img')) {
        openModal(e);
    }
});
const closeModalBtn = document.querySelector(".close-button");

function openModal(e) {
  document.body.classList.add("modal-open");
  modal.style.display = "flex";
  modalImg.src = e.target.src;
  gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
}

function closeModal() {
  document.body.classList.remove("modal-open");
  gsap.to(modal, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      modal.style.display = "none";
    },
  });
}

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});


// --- ACCORDION FUNCTIONALITY (Unchanged) ---
const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const isActive = header.classList.contains("active");

    accordionHeaders.forEach((h) => {
      h.classList.remove("active");
      h.nextElementSibling.style.maxHeight = null;
    });

    if (!isActive) {
      header.classList.add("active");
      const content = header.nextElementSibling;
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});