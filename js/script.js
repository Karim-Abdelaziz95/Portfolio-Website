// © Karim Abdelaziz Farouk

document.addEventListener("DOMContentLoaded", () => {
  // ==================== ELEMENT REFERENCES ====================
  const menuToggle = document.getElementById("menu-toggle");
  const navList = document.getElementById("nav-list");
  const contactForm = document.getElementById("contactForm");

  if (!menuToggle || !navList) return;

  // ==================== MOBILE MENU ====================
  const closeMenu = () => {
    navList.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the mobile menu when clicking outside it.
  document.addEventListener("click", (event) => {
    if (!navList.classList.contains("open")) return;

    const clickedInsideMenu =
      navList.contains(event.target) || menuToggle.contains(event.target);

    if (!clickedInsideMenu) closeMenu();
  });

  // Close the mobile menu with Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  // ==================== SMOOTH SECTION NAVIGATION ====================
  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) return;

      event.preventDefault();
      closeMenu();

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
        behavior: "smooth",
      });

      history.pushState(null, "", targetId);
    });
  });

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

      const mailSubject = encodeURIComponent(`${subject} — Portfolio Contact`);
      const mailBody = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      );

      window.location.href = `mailto:karimabdelaziz1082006@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    });
  }
});
