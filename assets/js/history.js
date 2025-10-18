// navbar and footer
import { loadNavbar } from "./history-nav.js";
loadNavbar();

gsap.registerPlugin(Observer);
gsap.registerPlugin(SplitText);

// THE FIX IS HERE: Convert the NodeList to an Array
let sections = gsap.utils.toArray("section"),
  images = document.querySelectorAll(".bg"),
  outerWrappers = gsap.utils.toArray(".outer"),
  innerWrappers = gsap.utils.toArray(".inner"),
  currentIndex = -1,
  wrap = gsap.utils.wrap(0, sections.length),
  animating;

// Organize elements by their parent section
let sectionsData = sections.map((section) => {
  let heading = section.querySelector(".section-heading");
  let paragraph = section.querySelector(".section-paragraph");

  return {
    splitHeading: new SplitText(heading, {
      type: "chars,words,lines",
      linesClass: "clip-text",
    }),
    // Create SplitText for the paragraph only if a paragraph element exists
    splitParagraph: paragraph
      ? new SplitText(paragraph, {
        type: "chars,words,lines",
        linesClass: "clip-text",
      })
      : null,
  };
});

gsap.set(outerWrappers, { yPercent: 100 });
gsap.set(innerWrappers, { yPercent: -100 });

function gotoSection(index, direction) {
  index = wrap(index);
  animating = true;
  let fromTop = direction === -1,
    dFactor = fromTop ? -1 : 1;

  // Get the data object for the current section
  let currentSectionData = sectionsData[index];

  let tl = gsap.timeline({
    defaults: { duration: 1.25, ease: "power1.inOut" },
    onComplete: () => (animating = false),
  });

  if (currentIndex >= 0) {
    gsap.set(sections[currentIndex], { zIndex: 0 });
    tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
      sections[currentIndex],
      { autoAlpha: 0 }
    );
  }

  gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
  tl.fromTo(
    [outerWrappers[index], innerWrappers[index]],
    { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
    { yPercent: 0 },
    0
  )
    .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
    // Animate heading using the new structure
    .fromTo(
      currentSectionData.splitHeading.chars,
      {
        autoAlpha: 0,
        yPercent: 150 * dFactor,
      },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1,
        ease: "power2",
        stagger: {
          each: 0.02,
          from: "random",
        },
      },
      0.2
    );

  // Check and animate paragraph using the new, reliable structure
  if (currentSectionData.splitParagraph) {
    tl.fromTo(
      currentSectionData.splitParagraph.words,
      {
        autoAlpha: 0,
        yPercent: 150 * dFactor,
      },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1,
        ease: "power2",
        stagger: {
          each: 0.01,
          from: "random",
        },
      },
      0.3
    );
  }

  currentIndex = index;
}

Observer.create({
  type: "wheel,touch,pointer",
  wheelSpeed: -1,
  onDown: () => !animating && gotoSection(currentIndex - 1, -1),
  onUp: () => !animating && gotoSection(currentIndex + 1, 1),
  tolerance: 10,
  preventDefault: true,
});

gotoSection(0, 1);