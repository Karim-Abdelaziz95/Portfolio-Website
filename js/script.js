// © Karim Abdelaziz Farouk

document.addEventListener("DOMContentLoaded", () => {

  // ==================== CONTACT SCROLL REVEAL ====================
  // Reveals the Contact section when it enters the viewport.
  // Respects the user's prefers-reduced-motion setting.
  const revealEl = document.querySelector("#contact.reveal");

  if (revealEl) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEl.classList.add("is-visible");
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );

      observer.observe(revealEl);
    }
  }

  // ==================== MOBILE MENU ====================
  const menuToggle = document.getElementById("menu-toggle");
  const navList = document.getElementById("nav-list");
  const header = document.querySelector(".site-header");

  if (!menuToggle || !navList || !header) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // ==================== SMOOTH SECTION NAVIGATION ====================
  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) return;

      event.preventDefault();

      // Close mobile menu before navigating.

      navList.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");

      // Home navigation.

      if (targetId === "#main-content") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        history.pushState(null, "", targetId);
        return;
      }

      // Other section navigation.

      const target = document.querySelector(targetId);

      if (!target) return;

      requestAnimationFrame(() => {
        const heading =
          target.querySelector(":scope > h2") ||
          target.querySelector(".projects-header h2") ||
          target.querySelector("h2");

        const targetElement = heading || target;
        const offset =
          parseFloat(
            getComputedStyle(document.documentElement).scrollPaddingTop ||
              getComputedStyle(document.body).scrollPaddingTop ||
              "90px",
          ) || 90;

        const targetPosition =
          targetElement.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        history.pushState(null, "", targetId);
      });
    });
  });
});
