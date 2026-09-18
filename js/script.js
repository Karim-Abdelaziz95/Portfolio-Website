// © Karim Abdelaziz Farouk

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navList = document.getElementById("nav-list");
  const header = document.querySelector(".site-header");

  if (!menuToggle || !navList || !header) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) return;

      event.preventDefault();

      // Close mobile menu
      navList.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");

      // HOME
      if (targetId === "#main-content") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        history.pushState(null, "", targetId);
        return;
      }

      // Other sections
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
