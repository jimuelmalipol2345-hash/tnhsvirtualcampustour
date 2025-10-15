// navbar and footer
import { loadNavbar } from "./navbar.js";
loadNavbar();

import { loadFooter } from "./footer.js";
loadFooter();

// import back to top
import { loadBackToTop } from "./back-to-top.js";
loadBackToTop();

// 1. Select ALL card containers
const cards = document.querySelectorAll(".card-container");

// 2. Loop through each card
cards.forEach((card) => {
  // For each card, find its specific child elements
  const background = card.querySelector(".card-background");
  const title = card.querySelector(".card-content h2");
  const subtitle = card.querySelector(".card-content p");
  const character = card.querySelector(".character-img");
  const marker = card.querySelector(".marker-icon");
  const underline = card.querySelector(".title-underline"); // 3. Create a UNIQUE timeline for THIS card

  const tl = gsap.timeline({ paused: true }); // 4. Define the "hover-on" animation for this card's elements

  tl.to(background, { scale: 1.15, duration: 0.4, ease: "power2.inOut" })
    .to(title, { y: -25, duration: 0.4, ease: "power2.inOut" }, "<")
    .to(
      subtitle,
      { y: -20, opacity: 1, duration: 0.4, ease: "power2.inOut" },
      "<"
    )
    .to(character, { x: 10, y: -5, duration: 0.4, ease: "power2.inOut" }, "<")
    .to(marker, { x: -10, y: -5, duration: 0.4, ease: "power2.inOut" }, "<")
    .to(underline, { width: "100%", duration: 0.4, ease: "power2.inOut" }, "<"); // 5. Add event listeners for hover animation

  card.addEventListener("mouseenter", () => {
    tl.play();
  });

  card.addEventListener("mouseleave", () => {
    tl.reverse();
  }); // 6. (NEW) Add click event listener for redirection

  card.addEventListener("click", (e) => {
    // This prevents the default link behavior for a moment,
    // which can be useful if you add a "click" animation later.
    e.preventDefault();
    // Get the URL from the card's href attribute
    const href = card.getAttribute("href"); // If the href attribute exists, navigate to the URL

    if (href) {
      window.location.href = href;
    }
  });
});
