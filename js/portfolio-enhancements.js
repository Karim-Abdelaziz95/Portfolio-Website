
(function () {
  "use strict";

  var body = document.body;
  var header = document.querySelector(".site-header");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  var sections = ["home", "services", "work", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  /* Reading progress bar */
  var progress = document.createElement("div");
  progress.className = "portfolio-progress";
  progress.setAttribute("aria-hidden", "true");
  body.appendChild(progress);

  function updateScrollUI() {
    var scrollTop = window.scrollY || window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (docHeight > 0 ? Math.min(100, scrollTop / docHeight * 100) : 0) + "%";

    if (header) {
      header.classList.toggle("is-scrolled", scrollTop > 12);
    }
  }

  updateScrollUI();
  window.addEventListener("scroll", updateScrollUI, { passive: true });

  /* Scroll reveal */
  var revealTargets = [
    "#home > .e-con",
    "#services > h2",
    "#services > .e-con",
    "#work > .e-con",
    ".portfolio-tech-strip",
    ".site-footer"
  ];

  revealTargets.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (element, index) {
      element.classList.add("portfolio-reveal");
      if (index % 3 === 1) element.classList.add("portfolio-delay-1");
      if (index % 3 === 2) element.classList.add("portfolio-delay-2");
    });
  });

  var revealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" })
    : null;

  document.querySelectorAll(".portfolio-reveal").forEach(function (element) {
    if (revealObserver) {
      revealObserver.observe(element);
    } else {
      element.classList.add("is-visible");
    }
  });

  /* Active navigation */
  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var active = link.getAttribute("href") === "#" + entry.target.id;
          link.classList.toggle("is-active", active);
        });
      });
    }, { threshold: 0.35 });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* Close mobile menu after selecting a link */
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    links.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        toggle.setAttribute("aria-expanded", "false");
        links.classList.remove("nav-open");
      }
    });
  }

  /* Add subtle external-link safety without changing existing URLs */
  document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
    link.setAttribute("rel", "noopener noreferrer");
  });
})();
