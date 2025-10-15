export function loadNavbar() {
  document.addEventListener("DOMContentLoaded", () => {
    const navbar = `
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
        <a href="/facilities">Facilities ▾</a>
        <ul class="dropdown-menu">
          <li><a href="/facilities/classroom">Classroom</a></li>
          <li><a href="#">Faculty</a></li>
          <li><a href="#">Cafeteria</a></li>
          <li><a href="#">Covered Court</a></li>
        </ul>
      <li class="dropdown">
        <a href="/about-tnhs">About TNHS ▾</a>
        <ul class="dropdown-menu">
          <li><a href="/about-tnhs/announcements">Announcements</a></li>
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
    document.getElementById("navbar").innerHTML = navbar;
  });
}
