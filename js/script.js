// © Karim Abdelaziz Farouk

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navList = document.getElementById("nav-list");

  if (!menuToggle || !navList) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close the menu when a nav link is tapped
  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
});
