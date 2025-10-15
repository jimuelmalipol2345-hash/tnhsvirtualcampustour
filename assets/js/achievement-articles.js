// navbar and footer
import { loadNavbar } from "./navbar.js";
loadNavbar();

import { loadFooter } from "./footer.js";
loadFooter();

// import back to top
import { loadBackToTop } from "./back-to-top.js";
loadBackToTop();

document.addEventListener('DOMContentLoaded', () => {

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // 1. Header Animation on Page Load
    gsap.to(".header-content", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.5
    });

    // 2. Animate Content Sections on Scroll
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 100%", // Animation starts when the top of the section is 80% down the viewport
                end: "bottom 20%",
                toggleActions: "play none none none"
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power1.out"
        });
    });

    // 3. Side Panel Active Link Highlighting on Scroll
    const navLinks = document.querySelectorAll('.side-panel nav a');
    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onToggle: self => {
                const targetLink = document.querySelector(`a[href="#${section.id}"]`);
                if (self.isActive) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetLink.classList.add('active');
                } else {
                    targetLink.classList.remove('active');
                }
            }
        });
    });

    // 4. Carousel Logic
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const descriptionItems = document.querySelectorAll('.description-item');
    let currentIndex = 0;

    function updateCarousel(newIndex) {
        // --- Animate Out ---
        gsap.to(carouselItems[currentIndex], { opacity: 0, duration: 0.5 });
        gsap.to(descriptionItems[currentIndex], { opacity: 0, y: -20, duration: 0.4, onComplete: () => {
            descriptionItems[currentIndex].classList.remove('active');
            descriptionItems[currentIndex].style.display = 'none'; // Hide after animation
            
             // --- Animate In ---
            currentIndex = newIndex;
            carouselItems[currentIndex].classList.add('active');
            descriptionItems[currentIndex].style.display = 'block'; // Make it visible for animation
            descriptionItems[currentIndex].classList.add('active');
            
            gsap.fromTo(carouselItems[currentIndex], { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.2 });
            gsap.fromTo(descriptionItems[currentIndex], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.2 });
        }});

        // Remove active class from old item
        carouselItems[currentIndex].classList.remove('active');
    }

    nextBtn.addEventListener('click', () => {
        let newIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel(newIndex);
    });

    prevBtn.addEventListener('click', () => {
        let newIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel(newIndex);
    });
});