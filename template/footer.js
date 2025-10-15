/**
 * Utility function to dynamically load a CSS file.
 * NOTE: This function should be in a shared utility file (e.g., utils.js)
 * and imported, not redeclared in every component script.
 * @param {string} href - The path to the CSS file.
 */
const loadCSS = (href) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
};

/**
 * Returns the HTML string for the footer's content.
 * @returns {string} The footer HTML content.
 */
const getFooterHTML = () => `
  <div class="footer">
    <div class="footer-img">
      <img src="/assets/images/cropped-tnhs.png" alt="TNHS logo" />
    </div>
    <div class="footer-text">
      <h5>Talipan National High School</h5>
      <p>Sitio Fori Brgy. Talipan Pagbilao, Quezon</p>
      <p>&copy; 2025 Talipan National High School. All rights reserved.</p>
    </div>
  </div>
`;

/**
 * Main function to load and initialize the footer component.
 */
export function loadFooter() {
  document.addEventListener("DOMContentLoaded", () => {
    // 1. Get the target element from the DOM
    const footerContainer = document.getElementById("footer");
    if (!footerContainer) {
      console.error("Footer container with ID 'footer' was not found.");
      return;
    }
    
    // Note: It's common for the container itself to be the <footer> tag
    // in your main HTML, e.g., <footer id="footer"></footer>.
    // The current setup will result in <div id="footer"><footer>...</footer></div>.

    // 2. Load required assets
    loadCSS("footer.css");

    // 3. Inject the HTML content
    footerContainer.innerHTML = getFooterHTML();
  });
}