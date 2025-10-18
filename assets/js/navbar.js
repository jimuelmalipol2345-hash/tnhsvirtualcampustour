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
  <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">☰</button>
  <nav>
    <ul class="nav-links">
      <li><a href="/">Home</a></li>
      <li class="dropdown">
        <a href="/facilities">Facilities</a>
        <ul class="dropdown-menu">
          <li><a href="/facilities/classroom.html">Classroom</a></li>
          <li><a href="/facilities/classroom.html#faculty">Faculty</a></li>
          <li><a href="#">Cafeteria</a></li>
          <li><a href="#">Covered Court</a></li>
        </ul>
      </li>
      <li class="dropdown">
        <a href="/about-tnhs">About TNHS</a>
        <ul class="dropdown-menu">
          <li><a href="/about-tnhs/announcements.html">Announcements</a></li>
          <li><a href="/about-tnhs/faculty.html">Faculties</a></li>
          <li><a href="/about-tnhs/mission-vision.html">Mission and Vision</a></li>
          <li><a href="/about-tnhs/history.html">TNHS History</a></li>
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
 * Initializes mobile menu toggle functionality.
 * @param {HTMLElement} navbarElement - The navbar DOM element.
 */
const initializeMobileMenu = (navbarElement) => {
  const mobileToggle = navbarElement.querySelector('.mobile-menu-toggle');
  const navLinks = navbarElement.querySelector('.nav-links');
  const dropdowns = navbarElement.querySelectorAll('.dropdown');

  if (mobileToggle && navLinks) {
    // Main menu toggle
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileToggle.classList.toggle('active');

      // Update aria-expanded for accessibility
      const isExpanded = navLinks.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);

      // Change icon with animation
      mobileToggle.textContent = isExpanded ? '✕' : '☰';
    });

    // Handle dropdown clicks on mobile
    dropdowns.forEach(dropdown => {
      const dropdownLink = dropdown.querySelector('a');
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');

      if (dropdownLink && dropdownMenu) {
        dropdownLink.addEventListener('click', (e) => {
          // Only prevent default and toggle on mobile when menu is open
          if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
            e.preventDefault();
            dropdown.classList.toggle('active');
          }
          // On desktop, let the link work normally (don't prevent default)
        });

        // Add touch event for better mobile experience
        dropdownLink.addEventListener('touchstart', (e) => {
          if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
            e.preventDefault();
            dropdown.classList.toggle('active');
          }
        });

        // Make sure dropdown menu items are clickable
        const dropdownItems = dropdownMenu.querySelectorAll('a');
        dropdownItems.forEach(item => {
          item.addEventListener('click', (e) => {
            // Allow dropdown menu items to navigate normally
            // Don't prevent default - let them work as regular links

            // Close mobile menu after clicking a dropdown item
            if (window.innerWidth <= 768) {
              setTimeout(() => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.textContent = '☰';
                dropdown.classList.remove('active');
              }, 100);
            }
          });
        });
      }
    });

    // Close mobile menu when clicking on a non-dropdown link
    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && !e.target.closest('.dropdown')) {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.textContent = '☰';

        // Close all dropdowns
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbarElement.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.textContent = '☰';

        // Close all dropdowns
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.textContent = '☰';

        // Close all dropdowns
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
    });
  }
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
    loadCSS("/assets/css/header.css");

    // 3. Inject the HTML content
    navbar.innerHTML = getNavbarHTML();

    // 4. Attach interactive behavior
    initializeScrollBehavior(navbar);
    initializeMobileMenu(navbar);
  });
}