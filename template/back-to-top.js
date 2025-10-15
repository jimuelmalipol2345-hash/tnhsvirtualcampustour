const loadCSS = (href) => {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
};

export function loadBackToTop() {
  document.addEventListener("DOMContentLoaded", () => {
    const backToTop = document.getElementById("backToTop");
    if (!backToTop) return;

    loadCSS("back-to-top.css");

    const toggleVisibility = () => {
      backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility(); // set initial state

    backToTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  });
}
