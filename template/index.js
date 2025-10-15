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

