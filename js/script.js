// © Karim Abdelaziz Farouk

document.addEventListener("DOMContentLoaded", () => {
  // ==================== ELEMENT REFERENCES ====================
  const menuToggle = document.getElementById("menu-toggle");
  const navList = document.getElementById("nav-list");
  const contactForm = document.getElementById("contactForm");
  const navLinks = navList ? navList.querySelectorAll("a") : [];

  if (!menuToggle || !navList) return;

  // Check prefers-reduced-motion
  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ==================== MOBILE MENU ====================
  const closeMenu = () => {
    navList.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the mobile menu when clicking outside it
  document.addEventListener("click", (event) => {
    if (!navList.classList.contains("open")) return;

    const clickedInsideMenu =
      navList.contains(event.target) || menuToggle.contains(event.target);

    if (!clickedInsideMenu) closeMenu();
  });

  // Close the mobile menu with Escape and return focus
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navList.classList.contains("open")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  // ==================== SMOOTH SECTION NAVIGATION ====================
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) return;

      event.preventDefault();
      closeMenu();

      const scrollBehavior = prefersReducedMotion() ? "auto" : "smooth";

      // Home navigation
      if (targetId === "#main-content") {
        window.scrollTo({
          top: 0,
          behavior: scrollBehavior,
        });

        history.pushState(null, "", targetId);
        return;
      }

      // Target element navigation
      const target = document.querySelector(targetId);
      if (!target) return;

      const heading =
        target.querySelector(":scope > h2") ||
        target.querySelector(".projects-header h2") ||
        target.querySelector("h2");

      const targetElement = heading || target;
      const offset =
        parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingTop || "90px",
        ) || 90;

      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: scrollBehavior,
      });

      history.pushState(null, "", targetId);
    });
  });

  // ==================== ACTIVE LINK SCROLL SPY ====================
  const sections = document.querySelectorAll(
    "main > section[id], section#about, section#services, section#projects, section#contact",
  );
  if ("IntersectionObserver" in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = `#${entry.target.id}`;
          navLinks.forEach((link) => {
            const isMatch = link.getAttribute("href") === currentId;
            if (isMatch) {
              link.classList.add("active");
              link.setAttribute("aria-current", "page");
            } else {
              link.classList.remove("active");
              link.removeAttribute("aria-current");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((sec) => sectionObserver.observe(sec));

    // Observe hero / top
    const heroSec = document.querySelector(".hero");
    if (heroSec) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              navLinks.forEach((link) => {
                if (link.getAttribute("href") === "#main-content") {
                  link.classList.add("active");
                  link.setAttribute("aria-current", "page");
                } else {
                  link.classList.remove("active");
                  link.removeAttribute("aria-current");
                }
              });
            }
          });
        },
        { threshold: 0.3 },
      );
      heroObserver.observe(heroSec);
    }
  }

  // ==================== CONTACT FORM ====================
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const subject = String(
        formData.get("subject") || "General Inquiry",
      ).trim();
      const message = String(formData.get("message") || "").trim();

      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      const mailSubject = encodeURIComponent(`${subject} — Portfolio Contact`);
      const mailBody = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      );

      window.location.href = `mailto:karimabdelaziz1082006@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    });
  }
});
