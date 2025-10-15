/**
 * Utility function to dynamically load a CSS file into the document's head.
 * @param {string} href - The path to the CSS file.
 */
const loadCSS = (href) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
};

/**
 * Returns the HTML string for the navbar component.
 * @returns {string} The navbar HTML content.
 */
const getNavbarHTML = () => `
  <div id="textlogo-wrapper">
    <div id="textlogo-image"><img alt="Talipan National High School Official Logo" src="/assets/images/cropped-tnhs.png"></div>
    <div id="textlogo-inner-wrapper">
      <div id="school-heading">Republic of the Philippines</div>
      <div id="school-name">Talipan National High School</div>
      <div id="school-tagline">Schools Division Office of Quezon Province</div>
    </div>
  </div>
  <nav>
    <ul class="nav-links">
      <li><a href="/">Home</a></li>
      <li class="dropdown">
        <a href="/about-tnhs">About TNHS ▾</a>
        <ul class="dropdown-menu">
          <li><a href="/about-tnhs/faculty">Faculties</a></li>
          <li><a href="/about-tnhs/mission-vision">Mission and Vision</a></li>
          <li><a href="/about-tnhs/history">TNHS History</a></li>
        </ul>
      </li>
      <li><a href="/tnhs-achievements">TNHS Achievements</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
`;

/**
 * Initializes the show/hide on scroll behavior for the navbar.
 * @param {HTMLElement} navbarElement - The navbar DOM element.
 */
const initializeScrollBehavior = (navbarElement) => {
  let prevScrollPos = window.pageYOffset;
  const navbarHeight = navbarElement.offsetHeight;

  window.addEventListener("scroll", () => {
    const currentScrollPos = window.pageYOffset;

    // Show navbar if scrolling up or if near the top of the page
    if (prevScrollPos > currentScrollPos || currentScrollPos < navbarHeight) {
      navbarElement.style.top = "0";
    } else {
      // Hide navbar if scrolling down
      navbarElement.style.top = `-${navbarHeight}px`;
    }
    prevScrollPos = currentScrollPos;
  });
};

/**
 * Main function to load and initialize the navbar component.
 */
export function loadNavbar() {
  document.addEventListener("DOMContentLoaded", () => {
    // 1. Get the target element from the DOM
    const navbar = document.getElementById("navbar");
    if (!navbar) {
      console.error("Navbar element with ID 'navbar' was not found.");
      return;
    }

    // 2. Load required assets
    loadCSS("header.css");

    // 3. Inject the HTML content
    navbar.innerHTML = getNavbarHTML();

    // 4. Attach interactive behavior
    initializeScrollBehavior(navbar);
  });
}