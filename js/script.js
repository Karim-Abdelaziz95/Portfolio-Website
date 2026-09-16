/* --- SOURCE: inline script (responsive header breakpoint) --- */
(function () {
  var mq = window.matchMedia("(max-width: 921.99px)");

  function apply(isMobile) {
    var b = document.body.classList;

    if (isMobile) {
      b.add("gx-header-break-point");
      b.remove("gx-desktop");
    } else {
      b.remove("gx-header-break-point");
      b.add("gx-desktop");
    }
  }

  apply(mq.matches);

  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", function (event) {
      apply(event.matches);
    });
  } else if (typeof mq.addListener === "function") {
    mq.addListener(function (event) {
      apply(event.matches);
    });
  }
})();

window.onSkipLinkClick = function onSkipLinkClick() {
  var htmlElement = document.documentElement;

  if (!htmlElement) return;

  htmlElement.style.scrollBehavior = "smooth";
  window.setTimeout(function () {
    htmlElement.style.scrollBehavior = "";
  }, 1000);
};

document.addEventListener("DOMContentLoaded", function () {
  var content = document.getElementById("content");
  var skipLink = document.querySelector(".a11y-skip-to-content-link");

  if (!content && skipLink) {
    skipLink.remove();
  }
});

/* Mobile nav toggle: single source of truth for open/close state,
   used by the button click, closing on link selection, and resetting
   on resize back to desktop width. */
(function () {
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    links.classList.toggle("nav-open", open);
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  links.addEventListener("click", function (event) {
    if (event.target.tagName === "A") setOpen(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 781) setOpen(false);
  });
})();

/* --- SOURCE: inline script (theme config) --- */
var theme = {
  break_point: "921",
  isRtl: "",
  is_scroll_to_id: "",
  is_scroll_to_top: "",
  is_header_footer_builder_active: "1",
  responsive_cart_click: "flyout",
  is_dark_palette: "",
};
//# sourceURL=theme-theme-js-js-extra

/* --- SOURCE: js/frontend.min.js --- */
var themeGetParents = function (e, t) {
    for (var n = []; e && e !== document; e = e.parentNode)
      (!t || e.matches(t)) && n.push(e);
    return n;
  },
  themeToggleClass = function (e, t) {
    e.classList.contains(t) ? e.classList.remove(t) : e.classList.add(t);
  },
  themeTriggerEvent = function (e, t) {
    ((t = new CustomEvent(
      t,
      2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {},
    )),
      e.dispatchEvent(t));
  };
((themeSmoothScroll = function (e, t) {
  (e.preventDefault(),
    window.scrollTo({ top: t, left: 0, behavior: "smooth" }));
}),
  (astScrollToTopHandler = function (e, t) {
    var n = getComputedStyle(t).content,
      o = t.dataset.onDevices;
    n = n.replace(/[^0-9]/g, "");
    "both" == o || ("desktop" == o && "769" == n) || ("mobile" == o && "" == n)
      ? ((o = window.pageYOffset || document.body.scrollTop),
        e && e.length
          ? o > e.offsetHeight + 100
            ? (t.style.display = "block")
            : (t.style.display = "none")
          : 300 < window.pageYOffset
            ? (t.style.display = "block")
            : (t.style.display = "none"))
      : (t.style.display = "none");
  }),
  (() => {
    var e = document.querySelectorAll("#masthead .main-header-menu-toggle"),
      t = document.getElementById("masthead"),
      n = {},
      o = "",
      a = document.body,
      r = "";
    function l(e) {
      ((o = e.detail.type),
        (e = document.querySelectorAll(".menu-toggle")),
        "dropdown" === o &&
          (document
            .getElementById("gx-mobile-popup")
            .classList.remove("active", "show"),
          i("updateHeader")),
        "off-canvas" === o &&
          e.forEach(function (e) {
            e && e.classList.contains("toggled") && e.click();
          }),
        s(o));
    }
    function i(e) {
      if (
        null == (r = t.querySelector("#gx-mobile-header")) ||
        "dropdown" !== r.dataset.type ||
        "updateHeader" === e
      ) {
        (void 0 !== e && "updateHeader" !== e
          ? e.closest(".gx-mobile-popup-inner")
          : document.querySelector("#gx-mobile-popup")
        )
          .querySelectorAll(".menu-item-has-children")
          .forEach((e) => {
            (e.classList.remove("gx-submenu-expanded"),
              Array.from(e.querySelectorAll(".sub-menu")).forEach((e) => {
                (e.hasAttribute("data-initial-display") ||
                  e.setAttribute(
                    "data-initial-display",
                    window.getComputedStyle(e).display,
                  ),
                  "block" === e.getAttribute("data-initial-display")
                    ? (e.style.display = "block")
                    : (e.style.display = "none"));
              }));
          });
        var n = document.querySelectorAll(".menu-toggle");
        (document.body.classList.remove(
          "gx-main-header-nav-open",
          "gx-popup-nav-open",
        ),
          document.documentElement.classList.remove("gx-off-canvas-active"));
        for (var o = 0; o < n.length; o++)
          (n[o].classList.remove("toggled"),
            n[o].setAttribute("aria-expanded", "false"),
            (n[o].style.display = "flex"));
      }
    }
    function s(e) {
      var n = document.querySelectorAll("#gx-mobile-header .menu-toggle"),
        o = document.querySelectorAll("#gx-desktop-header .menu-toggle");
      if (void 0 === e && null !== t)
        if ((r = t.querySelector("#gx-mobile-header"))) e = r.dataset.type;
        else {
          if (!(a = t.querySelector("#gx-desktop-header"))) return;
          e = a.dataset.toggleType;
        }
      if ("off-canvas" === e) {
        var a = document.getElementById("menu-toggle-close"),
          l = document.querySelector(".gx-mobile-popup-inner");
        if (null != l) {
          ((popupLinks = l.getElementsByTagName("a")),
            document.removeEventListener("keydown", d),
            document.addEventListener("keydown", d),
            a && a.addEventListener("click", u),
            document.addEventListener("keyup", function (e) {
              "Escape" === e.key && u();
            }),
            document.addEventListener("click", function (e) {
              e.target ===
                document.querySelector(
                  ".gx-mobile-popup-drawer.active .gx-mobile-popup-overlay",
                ) && u();
            }));
          for (var s = 0; s < n.length; s++)
            (n[s].removeEventListener("click", themeNavMenuToggle, !1),
              n[s].removeEventListener("click", popupTriggerClick),
              n[s].addEventListener(
                "click",
                function (e) {
                  (e.currentTarget.setAttribute("aria-expanded", "true"),
                    popupTriggerClick(e),
                    document.querySelector(".gx-mobile-popup-drawer.active") ||
                      u());
                },
                !1,
              ),
              (n[s].trigger_type = "mobile"));
          for (s = 0; s < o.length; s++)
            (o[s].removeEventListener("click", themeNavMenuToggle, !1),
              o[s].removeEventListener("click", popupTriggerClick),
              o[s].addEventListener(
                "click",
                function (e) {
                  (e.currentTarget.setAttribute("aria-expanded", "true"),
                    popupTriggerClick(e));
                },
                !1,
              ),
              (o[s].trigger_type = "desktop"));
          let f = document.querySelector(".gx-button-wrap .menu-toggle");
          (a.addEventListener("click", function (e) {
            (document
              .getElementById("gx-mobile-popup")
              .classList.remove("active", "show"),
              i(this),
              window.self === window.top && f?.focus());
          }),
            document.addEventListener("keyup", function (e) {
              "Escape" === e.key &&
                (e.preventDefault(),
                document
                  .getElementById("gx-mobile-popup")
                  .classList.remove("active", "show"),
                i(),
                f?.focus());
            }),
            document.addEventListener("click", function (e) {
              e.target ===
                document.querySelector(
                  ".gx-mobile-popup-drawer.active .gx-mobile-popup-overlay",
                ) &&
                (document
                  .getElementById("gx-mobile-popup")
                  .classList.remove("active", "show"),
                i(),
                f?.focus());
            }));
          for (let y = 0, b = popupLinks.length; y < b; y++)
            null !== popupLinks[y].getAttribute("href") &&
              (popupLinks[y].getAttribute("href").startsWith("#") ||
                -1 !== popupLinks[y].getAttribute("href").search("#")) &&
              (!popupLinks[y].parentElement.classList.contains(
                "menu-item-has-children",
              ) ||
                (popupLinks[y].parentElement.classList.contains(
                  "menu-item-has-children",
                ) &&
                  document
                    .querySelector("header.site-header")
                    .classList.contains("gx-builder-menu-toggle-icon"))) &&
              (popupLinks[y].addEventListener("click", c, !0),
              (popupLinks[y].headerType = "off-canvas"));
          function d(e) {
            var t,
              n = document.getElementById("gx-mobile-popup");
            n &&
              n.classList.contains("active") &&
              "Tab" === e.key &&
              ((n = l.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
              )),
              0 !==
                (n = Array.prototype.filter.call(n, function (e) {
                  return (
                    0 < e.offsetWidth &&
                    0 < e.offsetHeight &&
                    "hidden" !== window.getComputedStyle(e).visibility
                  );
                })).length) &&
              ((t = n[0]),
              (n = n[n.length - 1]),
              e.shiftKey && document.activeElement === t
                ? (e.preventDefault(), n.focus())
                : e.shiftKey ||
                  document.activeElement !== n ||
                  (e.preventDefault(), t.focus()));
          }
          function u() {
            document.removeEventListener("keydown", d);
          }
          ThemeToggleSetup();
        }
      } else if ("dropdown" === e) {
        var m = document.querySelectorAll(".gx-mobile-header-content") || !1;
        a = document.querySelector(".gx-desktop-header-content") || !1;
        if (0 < m.length)
          for (let L = 0; L < m.length; L++) {
            var g = m[L].getElementsByTagName("a");
            for (link = 0, len = g.length; link < len; link++) {
              var h = null === g[link].closest(".fw-block-uagb-tabs");
              null !== g[link].getAttribute("href") &&
                (g[link].getAttribute("href").startsWith("#") ||
                  -1 !== g[link].getAttribute("href").search("#")) &&
                (!g[link].parentElement.classList.contains(
                  "menu-item-has-children",
                ) ||
                  (g[link].parentElement.classList.contains(
                    "menu-item-has-children",
                  ) &&
                    document
                      .querySelector("header.site-header")
                      .classList.contains("gx-builder-menu-toggle-icon"))) &&
                h &&
                (g[link].addEventListener("click", c, !0),
                (g[link].headerType = "dropdown"));
            }
          }
        if (a) {
          var p = a.getElementsByTagName("a");
          for (link = 0, len = p.length; link < len; link++) {
            var v = null === p[link].closest(".fw-block-uagb-tabs");
            null !== p[link].getAttribute("href") &&
              (p[link].getAttribute("href").startsWith("#") ||
                -1 !== p[link].getAttribute("href").search("#")) &&
              (!p[link].parentElement.classList.contains(
                "menu-item-has-children",
              ) ||
                (p[link].parentElement.classList.contains(
                  "menu-item-has-children",
                ) &&
                  document
                    .querySelector("header.site-header")
                    .classList.contains("gx-builder-menu-toggle-icon"))) &&
              v &&
              (p[link].addEventListener("click", c, !0),
              (p[link].headerType = "dropdown"));
          }
        }
        for (s = 0; s < n.length; s++)
          (n[s].removeEventListener("click", popupTriggerClick, !1),
            n[s].removeEventListener("click", themeNavMenuToggle),
            n[s].addEventListener("click", themeNavMenuToggle, !1),
            (n[s].trigger_type = "mobile"));
        for (s = 0; s < o.length; s++)
          (o[s].removeEventListener("click", popupTriggerClick, !1),
            o[s].removeEventListener("click", themeNavMenuToggle),
            o[s].addEventListener("click", themeNavMenuToggle, !1),
            (o[s].trigger_type = "desktop"));
        ThemeToggleSetup();
      }
    }
    function c(e) {
      switch (e.currentTarget.headerType) {
        case "dropdown":
          for (
            var t = document.querySelectorAll(".menu-toggle.toggled"), n = 0;
            n < t.length;
            n++
          )
            t[n].click();
          break;
        case "off-canvas":
          document.getElementById("menu-toggle-close").click();
      }
    }
    ("" !== (r = null != t ? t.querySelector("#gx-mobile-header") : r) &&
      null !== r &&
      (o = r.dataset.type),
      document.addEventListener("astMobileHeaderTypeChange", l, !1),
      document.addEventListener("click", function (e) {
        if ((e = e.target.closest(".menu-toggle")) && "dropdown" === o) {
          if ("undefined" == typeof themeAddon) {
            e.classList.toggle("toggled");
            {
              var t = document.querySelectorAll(".menu-toggle");
              let e = Array.from(t).every((e) =>
                e.classList.contains("toggled"),
              );
              t.forEach((t) => {
                e
                  ? (t.classList.remove("toggled"),
                    t.setAttribute("aria-expanded", "false"))
                  : (t.classList.add("toggled"),
                    t.setAttribute("aria-expanded", "true"));
              });
            }
          }
          ((t = e.classList.contains("toggled")),
            e.setAttribute("aria-expanded", t ? "true" : "false"));
        }
      }),
      (popupTriggerClick = function (e) {
        var t = e.currentTarget.trigger_type,
          n = document.getElementById("gx-mobile-popup");
        (a.classList.contains("gx-popup-nav-open") ||
          a.classList.add("gx-popup-nav-open"),
          a.classList.contains("gx-main-header-nav-open") ||
            "mobile" === t ||
            a.classList.add("gx-main-header-nav-open"),
          document.documentElement.classList.contains("gx-off-canvas-active") ||
            document.documentElement.classList.add("gx-off-canvas-active"),
          "desktop" === t &&
            ((n.querySelector(".gx-mobile-popup-content").style.display =
              "none"),
            (n.querySelector(".gx-desktop-popup-content").style.display =
              "block")),
          "mobile" === t &&
            ((n.querySelector(".gx-desktop-popup-content").style.display =
              "none"),
            (n.querySelector(".gx-mobile-popup-content").style.display =
              "block")),
          e &&
            e.currentTarget &&
            e.currentTarget.style &&
            (e.currentTarget.style.display = "none"),
          n.classList.add("active", "show"),
          document.getElementById("menu-toggle-close")?.focus());
      }),
      window.addEventListener("load", function () {
        s();
      }),
      document.addEventListener("astLayoutWidthChanged", function () {
        s();
      }),
      document.addEventListener("astPartialContentRendered", function () {
        ((e = document.querySelectorAll(".main-header-menu-toggle")),
          a.classList.remove("gx-main-header-nav-open"),
          document.addEventListener("astMobileHeaderTypeChange", l, !1),
          s());
      }));
    var d =
      null !== navigator.userAgent.match(/Android/i) &&
      "Android" === navigator.userAgent.match(/Android/i)[0]
        ? window.visualViewport.width
        : window.innerWidth;
    (window.addEventListener("resize", function () {
      var e, t, n, o;
      "INPUT" !== document.activeElement.tagName &&
        ((e = document.getElementById("menu-toggle-close")),
        (t = document.querySelector(".menu-toggle.toggled")),
        (n = document.querySelector(
          "#masthead > #gx-desktop-header .gx-desktop-header-content",
        )),
        (o = document.querySelector(".site-editor-active")),
        n && (n.style.display = "none"),
        (null !== navigator.userAgent.match(/Android/i) &&
        "Android" === navigator.userAgent.match(/Android/i)[0]
          ? window.visualViewport.width
          : window.innerWidth) !== d &&
          (t && null === o && t.click(),
          document.body.classList.remove(
            "gx-main-header-nav-open",
            "gx-popup-nav-open",
          ),
          e) &&
          null == o &&
          e.click(),
        g(),
        ThemeToggleSetup());
    }),
      document.addEventListener("DOMContentLoaded", function () {
        if (
          (ThemeToggleSetup(),
          null !==
            (e = a.classList.contains("gx-header-break-point")
              ? document.getElementById("gx-mobile-header")
              : document.getElementById("gx-desktop-header")))
        ) {
          var e,
            t = e.querySelector(".navigation-accessibility");
          if (t && e) {
            var n =
              e.getElementsByTagName("button")[0] ||
              e.getElementsByTagName("a")[0];
            if (n && !n.classList.contains("theme-search-icon")) {
              var r = t.getElementsByTagName("ul")[0];
              if (r) {
                if (
                  (r.className.includes("nav-menu") ||
                    (r.className += " nav-menu"),
                  document.addEventListener("DOMContentLoaded", function () {
                    var e;
                    "off-canvas" === o &&
                      (e = document.getElementById("menu-toggle-close")) &&
                      (e.onclick = function () {
                        var e = t.className.includes("toggled");
                        ((t.className = e
                          ? t.className.replace(" toggled", "")
                          : t.className + " toggled"),
                          n.setAttribute("aria-expanded", e ? "false" : "true"),
                          r.setAttribute(
                            "aria-expanded",
                            e ? "false" : "true",
                          ));
                      });
                  }),
                  (n.onclick = function () {
                    var e = t.className.includes("toggled");
                    ((t.className = e
                      ? t.className.replace(" toggled", "")
                      : t.className + " toggled"),
                      n.setAttribute("aria-expanded", e ? "false" : "true"),
                      r.setAttribute("aria-expanded", e ? "false" : "true"));
                  }),
                  !theme.is_header_footer_builder_active)
                ) {
                  for (
                    var l = r.getElementsByTagName("a"),
                      i = r.getElementsByTagName("ul"),
                      s = 0,
                      c = i.length;
                    s < c;
                    s++
                  )
                    i[s].parentNode.setAttribute("aria-haspopup", "true");
                  for (s = 0, c = l.length; s < c; s++)
                    (l[s].addEventListener("focus", b, !0),
                      l[s].addEventListener("blur", b, !0),
                      l[s].addEventListener("click", y, !0));
                }
                theme.is_header_footer_builder_active &&
                  (() => {
                    let e = document.querySelectorAll(
                        "nav.site-navigation .menu-item-has-children > a .gx-header-navigation-arrow",
                      ),
                      t = document.querySelectorAll(
                        "nav.site-navigation .sub-menu",
                      ),
                      n = document.querySelectorAll(
                        "nav.site-navigation .menu-item-has-children",
                      ),
                      o = document.querySelectorAll(
                        ".theme-full-megamenu-wrapper",
                      );
                    e &&
                      (e.forEach((r) => {
                        (r.addEventListener("keydown", function (e) {
                          if ("Enter" === e.key || " " === e.key) {
                            /Mobi|Android|iPad|iPhone/i.test(
                              navigator.userAgent,
                            ) && (e.preventDefault(), e.stopPropagation());
                            let t = e.target.closest("li"),
                              n = t.querySelector(".sub-menu"),
                              o = n && n.classList.contains("theme-megamenu");
                            setTimeout(() => {
                              (o
                                ? ((a = t.querySelector(
                                    ".theme-full-megamenu-wrapper",
                                  )),
                                  n &&
                                    n.classList.toggle("theme-megamenu-focus"),
                                  a &&
                                    a.classList.toggle(
                                      "theme-megamenu-wrapper-focus",
                                    ))
                                : n.classList.toggle("toggled-on"),
                                t.classList.toggle("gx-menu-hover"));
                              var a = e.target.getAttribute("aria-expanded");
                              e.target.setAttribute(
                                "aria-expanded",
                                "false" !== a && a ? "false" : "true",
                              );
                            }, 10);
                          }
                        }),
                          r.addEventListener(
                            "pointerdown",
                            function (e) {
                              e.currentTarget.dataset.astPointerType =
                                e.pointerType || "mouse";
                            },
                            !1,
                          ),
                          r.addEventListener(
                            "click",
                            function (r) {
                              var l,
                                i,
                                s = r.currentTarget;
                              "touch" === s.dataset.astPointerType &&
                                a.classList.contains("gx-desktop") &&
                                (i =
                                  (l = s.closest("li")) &&
                                  l.querySelector(".sub-menu")) &&
                                (r.preventDefault(),
                                r.stopPropagation(),
                                (r =
                                  "true" === s.getAttribute("aria-expanded")),
                                f(t, e, n, o),
                                r ||
                                  (i.classList.add("toggled-on"),
                                  l.classList.add("gx-menu-hover"),
                                  s.setAttribute("aria-expanded", "true")));
                            },
                            !1,
                          ));
                      }),
                      t || n) &&
                      (document.addEventListener(
                        "click",
                        function (a) {
                          f(t, e, n, o);
                        },
                        !1,
                      ),
                      document.addEventListener(
                        "keydown",
                        function (a) {
                          "Escape" === a.key && f(t, e, n, o);
                        },
                        !1,
                      ));
                    var r = document.querySelectorAll(
                      "nav.site-navigation .gx-nav-menu > .menu-item-has-children > a .gx-header-navigation-arrow",
                    );
                    (r &&
                      r.forEach((a) => {
                        a.addEventListener(
                          "keydown",
                          function (a) {
                            a.target
                              .closest("li")
                              .classList.contains("gx-menu-hover") ||
                              "Enter" !== a.key ||
                              f(t, e, n, o);
                          },
                          !1,
                        );
                      }),
                      (r = document.querySelectorAll(
                        "#gx-desktop-header .gx-builder-layout-element.gx-builder-menu",
                      )).forEach((e) => {
                        e.querySelectorAll(
                          ".main-header-menu .menu-item > a",
                        ).forEach((e) => {
                          e.addEventListener("focusout", function (e) {
                            var t,
                              n = (t = e.relatedTarget)
                                ? t.closest(".menu-item")
                                : null,
                              o =
                                ((e = (t =
                                  e.target.closest(
                                    ".menu-item",
                                  )).classList.contains("gx-menu-hover")),
                                t.querySelector(".sub-menu")),
                              a = t.closest(".sub-menu"),
                              r = t
                                .closest(".sub-menu")
                                ?.closest(".menu-item-has-children"),
                              l = t.querySelector(".menu-item");
                            if (!(t == n || (l && l == n)))
                              if (null == n) (a && v(a), o && v(o));
                              else if (
                                t.nextElementSibling == n ||
                                t.previousElementSibling == n
                              )
                                e &&
                                  (v(o, !1),
                                  t.classList.remove("gx-menu-hover"));
                              else if (r && r == n)
                                v(
                                  (childSubMenu = t.querySelector(".sub-menu")),
                                  !1,
                                );
                              else {
                                let e = r,
                                  t = null;
                                for (; null != e; ) {
                                  if (e.nextElementSibling == n) {
                                    t = e.querySelector(".sub-menu");
                                    break;
                                  }
                                  e = e
                                    .closest(".sub-menu")
                                    ?.closest(".menu-item-has-children");
                                }
                                a && v(a, !0, t);
                              }
                          });
                        });
                      }));
                  })();
              } else
                n.classList.contains("custom-logo-link") ||
                  (n.style.display = "none");
            }
          }
        }
      }));
    for (
      var u,
        m,
        g = function () {
          var t = window.innerWidth,
            n = theme.break_point;
          if (
            window.matchMedia("(max-width: " + (parseFloat(n) + 0.99) + "px)")
              .matches &&
            0 !== t
          )
            (a.classList.add("gx-header-break-point"),
              a.classList.remove("gx-desktop"),
              themeTriggerEvent(a, "theme-header-responsive-disabled"));
          else {
            if (0 < e.length)
              for (var o = 0; o < e.length; o++)
                null !== e[o] && e[o].classList.remove("toggled");
            (a.classList.remove("gx-header-break-point"),
              a.classList.add("gx-desktop"),
              themeTriggerEvent(a, "theme-header-responsive-enabled"));
          }
        },
        h =
          (g(),
          a.classList.add("gx-header-loaded"),
          (ThemeToggleSubMenu = function (e) {
            e.preventDefault();
            for (
              var t = this.parentNode,
                n =
                  (t.classList.contains("menu-item-has-children") &&
                    document
                      .querySelector("header.site-header")
                      .classList.contains("gx-builder-menu-toggle-link") &&
                    e.stopPropagation(),
                  "false" !== e.target.getAttribute("aria-expanded") &&
                  e.target.getAttribute("aria-expanded")
                    ? e.target.setAttribute("aria-expanded", "false")
                    : e.target.setAttribute("aria-expanded", "true"),
                  t.classList.contains("gx-submenu-expanded") &&
                    document
                      .querySelector("header.site-header")
                      .classList.contains("gx-builder-menu-toggle-link") &&
                    (this.classList.contains("gx-menu-toggle") ||
                      ("" !== (e = t.querySelector("a").getAttribute("href")) &&
                        "#" !== e &&
                        (window.location = e))),
                  t.querySelectorAll(".menu-item-has-children")),
                o = 0;
              o < n.length;
              o++
            ) {
              n[o].classList.remove("gx-submenu-expanded");
              var a = n[o].querySelector(".sub-menu, .children");
              null !== a && (a.style.display = "none");
            }
            var r = t.parentNode.querySelectorAll(".menu-item-has-children");
            for (o = 0; o < r.length; o++)
              if (r[o] != t) {
                r[o].classList.remove("gx-submenu-expanded");
                for (
                  var l = r[o].querySelectorAll(".sub-menu"), i = 0;
                  i < l.length;
                  i++
                )
                  l[i].style.display = "none";
              }
            t.classList.contains("menu-item-has-children") &&
              (themeToggleClass(t, "gx-submenu-expanded"),
              t.classList.contains("gx-submenu-expanded")
                ? (t.querySelector(".sub-menu").style.display = "block")
                : (t.querySelector(".sub-menu").style.display = "none"));
          }),
          (ThemeToggleSetup = function () {
            if (
              "undefined" != typeof themeAddon &&
              "function" == typeof themeToggleSetupPro
            )
              themeToggleSetupPro(o, a, n);
            else {
              var e,
                t,
                r,
                l = !1;
              if (
                0 <
                  (e =
                    "off-canvas" === o || "full-width" === o
                      ? ((t = document.querySelectorAll(
                          "#gx-mobile-popup, #gx-mobile-header",
                        )),
                        (r = document.querySelectorAll(
                          "#gx-mobile-header .main-header-menu-toggle",
                        )).length)
                      : ((t = document.querySelectorAll("#gx-mobile-header")),
                        (l = !(
                          0 <
                          (e = (r = document.querySelectorAll(
                            "#gx-mobile-header .main-header-menu-toggle",
                          )).length)
                        ))
                          ? 1
                          : e)) ||
                l
              )
                for (var i = 0; i < e; i++)
                  if (
                    (l ||
                      (r[i].setAttribute("data-index", i), n[i]) ||
                      ((n[i] = r[i]),
                      r[i].removeEventListener("click", themeNavMenuToggle),
                      r[i].addEventListener("click", themeNavMenuToggle, !1)),
                    void 0 !== t[i])
                  )
                    for (var s, c = 0; c < t.length; c++)
                      if (
                        0 <
                        (s = document
                          .querySelector("header.site-header")
                          .classList.contains("gx-builder-menu-toggle-link")
                          ? t[c].querySelectorAll(
                              "ul.main-header-menu .menu-item-has-children > .menu-link, ul.main-header-menu .gx-menu-toggle",
                            )
                          : t[c].querySelectorAll(
                              "ul.main-header-menu .gx-menu-toggle",
                            )).length
                      )
                        for (var d = 0; d < s.length; d++)
                          (s[d].removeEventListener(
                            "click",
                            ThemeToggleSubMenu,
                          ),
                            s[d].addEventListener(
                              "click",
                              ThemeToggleSubMenu,
                              !1,
                            ));
            }
          }),
          (themeNavMenuToggle = function (t) {
            if ("undefined" != typeof themeAddon)
              themeNavMenuTogglePro(t, a, o, this);
            else {
              t.preventDefault();
              t = document.querySelectorAll(
                "#masthead > #gx-mobile-header .main-header-bar-navigation",
              );
              var n =
                ((e = document.querySelectorAll(
                  "#masthead > #gx-mobile-header .main-header-menu-toggle",
                )),
                "0");
              if (
                (null !== this.closest("#gx-fixed-header") &&
                  ((t = document.querySelectorAll(
                    "#gx-fixed-header > #gx-mobile-header .main-header-bar-navigation",
                  )),
                  (e = document.querySelectorAll(
                    "#gx-fixed-header .main-header-menu-toggle",
                  )),
                  (n = "0")),
                void 0 === t[n])
              )
                return !1;
              for (
                var r = t[n].querySelectorAll(".menu-item-has-children"), l = 0;
                l < r.length;
                l++
              ) {
                r[l].classList.remove("gx-submenu-expanded");
                for (
                  var i = r[l].querySelectorAll(".sub-menu"), s = 0;
                  s < i.length;
                  s++
                )
                  i[s].style.display = "none";
              }
              -1 !==
                (this.getAttribute("class") || "").indexOf(
                  "main-header-menu-toggle",
                ) &&
                (themeToggleClass(t[n], "toggle-on"),
                themeToggleClass(e[n], "toggled"),
                t[n].classList.contains("toggle-on")
                  ? ((t[n].style.display = "block"),
                    a.classList.add("gx-main-header-nav-open"))
                  : ((t[n].style.display = ""),
                    a.classList.remove("gx-main-header-nav-open")));
            }
          }),
          a.addEventListener(
            "theme-header-responsive-enabled",
            function () {
              var e = document.querySelectorAll(".main-header-bar-navigation");
              if (0 < e.length)
                for (var t = 0; t < e.length; t++) {
                  null != e[t] &&
                    (e[t].classList.remove("toggle-on"),
                    (e[t].style.display = ""));
                  for (
                    var n = e[t].getElementsByClassName("sub-menu"), o = 0;
                    o < n.length;
                    o++
                  )
                    n[o].style.display = "";
                  for (
                    var a = e[t].getElementsByClassName("children"), r = 0;
                    r < a.length;
                    r++
                  )
                    a[r].style.display = "";
                  for (
                    var l = e[t].getElementsByClassName("gx-search-menu-icon"),
                      i = 0;
                    i < l.length;
                    i++
                  )
                    (l[i].classList.remove("gx-dropdown-active"),
                      (l[i].style.display = ""));
                }
            },
            !1,
          ),
          document.getElementsByClassName("theme-search-icon")),
        p = 0;
      p < h.length;
      p++
    )
      h[p].onclick = function (e) {
        var t;
        this.classList.contains("slide-search") &&
          (e.preventDefault(),
          (t = this.parentNode.parentNode.parentNode.querySelector(
            ".gx-search-menu-icon",
          )).classList.contains("gx-dropdown-active")
            ? ("" !== (t.querySelector(".search-field").value || "") &&
                t.querySelector(".search-form").submit(),
              t.classList.remove("gx-dropdown-active"))
            : (t.classList.add("gx-dropdown-active"),
              t
                .querySelector(".search-field")
                .setAttribute("autocomplete", "off"),
              setTimeout(function () {
                t.querySelector(".search-field").focus();
              }, 200)));
      };
    function v(e, t = !0, n = null) {
      (e.classList.remove("toggled-on"),
        e.classList.remove("theme-megamenu-focus"));
      var o = e
        .closest(".menu-item-has-children")
        .querySelector(".gx-header-navigation-arrow");
      (o && o.setAttribute("aria-expanded", "false"),
        (t = !!n || t) &&
          null !== (o = e.parentElement.closest(".sub-menu")) &&
          e !== n &&
          v(o, !0, n));
    }
    function f(e, t, n, o) {
      (e &&
        e.forEach((e) => {
          (e.classList.remove("theme-megamenu-focus"),
            e.classList.remove("toggled-on"));
        }),
        n &&
          n.forEach((e) => {
            e.classList.remove("gx-menu-hover");
          }),
        o &&
          o.forEach((e) => {
            e.classList.remove("theme-megamenu-wrapper-focus");
          }),
        t &&
          t.forEach((e) => {
            e.setAttribute("aria-expanded", "false");
          }));
    }
    function y() {
      var e = this || "";
      if (
        e &&
        !e.classList.contains("theme-search-icon") &&
        null === e.closest(".gx-builder-menu") &&
        -1 !== String(e).indexOf("#")
      ) {
        var t = e.parentNode;
        if (a.classList.contains("gx-header-break-point"))
          (document
            .querySelector("header.site-header")
            .classList.contains("gx-builder-menu-toggle-link") &&
            t.classList.contains("menu-item-has-children")) ||
            (document
              .querySelector(".main-header-menu-toggle")
              .classList.remove("toggled"),
            (t = document.querySelector(
              ".main-header-bar-navigation",
            )).classList.remove("toggle-on"),
            (t.style.display = "none"),
            themeTriggerEvent(
              document.querySelector("body"),
              "themeMenuHashLinkClicked",
            ));
        else
          for (; -1 === e.className.indexOf("nav-menu"); )
            ("li" === e.tagName.toLowerCase() &&
              -1 !== e.className.indexOf("focus") &&
              (e.className = e.className.replace(" focus", "")),
              (e = e.parentElement));
      }
    }
    function b() {
      for (
        var e = this;
        -1 === e.className.indexOf("navigation-accessibility");
      )
        ("li" === e.tagName.toLowerCase() && e.classList.toggle("focus"),
          (e = e.parentElement));
    }
    if (
      (document.querySelectorAll(".search-field").forEach((e) => {
        (e.addEventListener("focus", function (e) {
          var t = this.parentNode.parentNode.parentNode.querySelector(
            ".gx-search-menu-icon",
          );
          t && themeToggleClass(t, "gx-dropdown-active");
        }),
          e.addEventListener("blur", function (e) {
            var t = this.parentNode.parentNode.parentNode.querySelector(
              ".gx-search-menu-icon",
            );
            t &&
              (t.classList.remove("gx-dropdown-active"),
              themeToggleClass(t, "gx-dropdown-active"));
          }));
      }),
      (a.onclick = function (e) {
        if (
          void 0 !== e.target.classList &&
          !e.target.classList.contains("gx-search-menu-icon") &&
          !e.target.closest(".gx-search-menu-icon") &&
          !e.target.closest(".gx-search-icon")
        )
          for (
            var t = document.getElementsByClassName("gx-search-menu-icon"),
              n = 0;
            n < t.length;
            n++
          )
            t[n].classList.remove("gx-dropdown-active");
      }),
      theme.is_header_footer_builder_active ||
        ("querySelector" in document &&
          "addEventListener" in window &&
          (a.addEventListener("mousedown", function () {
            a.classList.add("gx-mouse-clicked");
          }),
          a.addEventListener("keydown", function () {
            a.classList.remove("gx-mouse-clicked");
          }))),
      theme.is_scroll_to_id)
    ) {
      let e = (e) => {
          let t = 0;
          for (; e; ) ((t += e.offsetTop), (e = e.offsetParent));
          return t;
        },
        t = (t, n = null) => {
          let o = 0;
          var a = document.querySelector(".site-header");
          a &&
            (0 < (a = a.querySelectorAll("div[data-stick-support]")).length
              ? a.forEach((e) => (o += e.clientHeight))
              : "undefined" == typeof themeAddon ||
                (Number(themeAddon.sticky_hide_on_scroll) &&
                  !document?.querySelector(".gx-header-sticked")) ||
                ((a = document.querySelector("#gx-fixed-header")) &&
                  ((o = a?.clientHeight),
                  Number(themeAddon?.header_main_shrink)) &&
                  a
                    ?.querySelectorAll(
                      ".gx-above-header-wrap, .gx-below-header-wrap",
                    )
                    ?.forEach(() => (o -= 10))),
            (a = n || t.target?.closest("a").hash)) &&
            (n = document.querySelector(a)) &&
            (n =
              (a = e(n)) -
              (o =
                "undefined" != typeof themeAddon &&
                Number(themeAddon.sticky_hide_on_scroll) &&
                window?.scrollY < a
                  ? 0
                  : o)) &&
            themeSmoothScroll(t, n);
        },
        n = [];
      var L = document.querySelectorAll(
        'a[href*="#"]:not([href="#"]):not([href="#0"]):not([href*="uagb-tab"]):not(.uagb-toc-link__trigger):not(.skip-link):not(.nav-links a):not([href*="tab-"])',
      );
      if (L)
        for (let e of L)
          e.href.split("#")[0] !== location.href.split("#")[0]
            ? n.push({ hash: e.hash, url: e.href.split("#")[0] })
            : "" !== e.hash && e.addEventListener("click", t);
      window.addEventListener("DOMContentLoaded", (o) => {
        for (var a of n)
          if (window.location.href.split("#")[0] === a.url) {
            var r = document.querySelector(".site-header");
            let t = 0;
            ((r = r.querySelectorAll("div[data-stick-support]")) &&
              r.forEach((e) => {
                t += e.clientHeight;
              }),
              (r = document.querySelector(a.hash)) &&
                (a = e(r) - t) &&
                themeSmoothScroll(o, a));
          }
        location.hash &&
          setTimeout(() => t(new Event("click"), location.hash), 750);
      });
    }
    (theme.is_scroll_to_top &&
      ((u = document.querySelector("#page header")),
      (m = document.getElementById("gx-scroll-top")),
      astScrollToTopHandler(u, m),
      window.addEventListener("scroll", function () {
        astScrollToTopHandler(u, m);
      }),
      (m.onclick = function (e) {
        themeSmoothScroll(e, 0);
      }),
      m.addEventListener("keydown", function (e) {
        "Enter" === e.key && themeSmoothScroll(e, 0);
      })),
      theme?.is_dark_palette
        ? document.documentElement.classList.add("theme-dark-mode-enable")
        : document.documentElement.classList.remove("theme-dark-mode-enable"),
      window.addEventListener("DOMContentLoaded", (e) => {
        var t = document.querySelector(".gx-woocommerce-store-notice-hanged");
        let n = () => {
          var e = document.querySelector(
            '.woocommerce-store-notice[data-position="hang-over-top"]',
          );
          document.body.style.paddingTop = `${e?.clientHeight || 0}px`;
        };
        (t && (window.addEventListener("resize", n), setTimeout(() => n(), 0)),
          document
            .querySelector(".woocommerce-store-notice__dismiss-link")
            ?.addEventListener("click", () => {
              ("undefined" != typeof wp && wp?.customize) ||
                (document.body.classList.remove(
                  "gx-woocommerce-store-notice-hanged",
                ),
                window.removeEventListener("resize", n),
                (document.body.style.paddingTop = 0));
            }));
      }));
  })(),
  document.addEventListener("DOMContentLoaded", function () {
    let e = document.querySelectorAll(".menu-link .dropdown-menu-toggle");
    function t(e) {
      var t = (e =
        e.closest(".menu-link")).nextElementSibling.classList.contains(
        "toggled-on",
      );
      e.setAttribute("aria-expanded", t ? "true" : "false");
    }
    (document.querySelectorAll(".menu-item-has-children > a").forEach((e) => {
      e.addEventListener("keydown", function (t) {
        "Enter" === t.key &&
          (t = e.nextElementSibling) &&
          t.classList.contains("sub-menu") &&
          (t.classList.toggle("gx-visible"),
          (t = "false" === e.getAttribute("aria-expanded") ? "true" : "false"),
          e.setAttribute("aria-expanded", t));
      });
    }),
      e.forEach((e) => {
        (e.addEventListener("focus", () => t(e)),
          e.addEventListener("blur", () => t(e)),
          e.addEventListener("keydown", (t) => {
            var n;
            ("Enter" !== t.key && " " !== t.key) ||
              (t.preventDefault(),
              (n = (t = (t = e).closest(".menu-link")).getAttribute(
                "aria-expanded",
              )),
              t.setAttribute("aria-expanded", "true" === n ? "false" : "true"));
          }));
      }),
      document.addEventListener("keydown", (n) => {
        "Escape" === n.key && e.forEach((e) => t(e));
      }),
      window.addEventListener("orientationchange", () => {
        setTimeout(() => window.dispatchEvent(new Event("resize")), 50);
      }));
  }),
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".theme-shop-thumbnail-wrap").forEach((e) => {
      let t = e.querySelectorAll("a, span");
      t.forEach((n) => {
        (n.addEventListener("focus", () => {
          e.querySelectorAll(
            ".gx-on-card-button, .gx-quick-view-trigger",
          ).forEach((e) => {
            ((e.style.opacity = "1"),
              (e.style.visibility = "visible"),
              (e.style.borderStyle = "none"));
          });
        }),
          n.addEventListener("blur", () => {
            Array.from(t).some((e) => e === document.activeElement) ||
              e
                .querySelectorAll(".gx-on-card-button, .gx-quick-view-trigger")
                .forEach((e) => {
                  ((e.style.opacity = ""), (e.style.visibility = ""));
                });
          }));
      });
    });
  }));

/* --- SOURCE: js/dom-ready.min.js --- */
/*! This file is auto-generated */
!(function () {
  "use strict";
  var e;
  (((e ||= {}).domReady = (() => {
    var e,
      t = Object.defineProperty,
      o = Object.getOwnPropertyDescriptor,
      d = Object.getOwnPropertyNames,
      r = Object.prototype.hasOwnProperty,
      a = {};
    function n(e) {
      if (!(typeof document > "u")) {
        if (
          "complete" === document.readyState ||
          "interactive" === document.readyState
        )
          return void e();
        document.addEventListener("DOMContentLoaded", e);
      }
    }
    return (
      ((e, o) => {
        for (var d in o) t(e, d, { get: o[d], enumerable: !0 });
      })(a, { default: () => n }),
      (e = a),
      ((e, a, n, u) => {
        if ((a && "object" == typeof a) || "function" == typeof a)
          for (let c of d(a))
            !r.call(e, c) &&
              c !== n &&
              t(e, c, {
                get: () => a[c],
                enumerable: !(u = o(a, c)) || u.enumerable,
              });
        return e;
      })(t({}, "__esModule", { value: !0 }), e)
    );
  })()),
    "object" == typeof e.domReady &&
      e.domReady.default &&
      (e.domReady = e.domReady.default),
    ((window.wp ||= {}).domReady = e.domReady));
})();

/* --- SOURCE: js/hooks.min.js --- */
/*! This file is auto-generated */
!(function () {
  "use strict";
  var e;
  (((e ||= {}).hooks = (() => {
    var e = Object.defineProperty,
      t = Object.getOwnPropertyDescriptor,
      r = Object.getOwnPropertyNames,
      n = Object.prototype.hasOwnProperty,
      i = {};
    ((t, r) => {
      for (var n in r) e(t, n, { get: r[n], enumerable: !0 });
    })(i, {
      actions: () => S,
      addAction: () => v,
      addFilter: () => F,
      applyFilters: () => j,
      applyFiltersAsync: () => T,
      createHooks: () => m,
      currentAction: () => z,
      currentFilter: () => P,
      defaultHooks: () => y,
      didAction: () => H,
      didFilter: () => R,
      doAction: () => x,
      doActionAsync: () => O,
      doingAction: () => Z,
      doingFilter: () => E,
      filters: () => $,
      hasAction: () => b,
      hasFilter: () => k,
      removeAction: () => _,
      removeAllActions: () => I,
      removeAllFilters: () => w,
      removeFilter: () => g,
    });
    var o = function (e) {
      return "string" != typeof e || "" === e
        ? (console.error("The namespace must be a non-empty string."), !1)
        : !!/^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(e) ||
            (console.error(
              "The namespace can only contain numbers, letters, dashes, periods, underscores and slashes.",
            ),
            !1);
    };
    var s = function (e) {
      return "string" != typeof e || "" === e
        ? (console.error("The hook name must be a non-empty string."), !1)
        : /^__/.test(e)
          ? (console.error("The hook name cannot begin with `__`."), !1)
          : !!/^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(e) ||
            (console.error(
              "The hook name can only contain numbers, letters, dashes, periods and underscores.",
            ),
            !1);
    };
    var c = function (e, t) {
      return function (r, n, i, c = 10) {
        let l = e[t];
        if (!s(r) || !o(n)) return;
        if ("function" != typeof i)
          return void console.error("The hook callback must be a function.");
        if ("number" != typeof c)
          return void console.error(
            "If specified, the hook priority must be a number.",
          );
        let a = { callback: i, priority: c, namespace: n };
        if (l[r]) {
          let e,
            t = l[r].handlers;
          for (e = t.length; e > 0 && !(c >= t[e - 1].priority); e--);
          (e === t.length ? (t[e] = a) : t.splice(e, 0, a),
            l.__current.forEach((t) => {
              t.name === r && t.currentIndex >= e && t.currentIndex++;
            }));
        } else l[r] = { handlers: [a], runs: 0 };
        "hookAdded" !== r && e.doAction("hookAdded", r, n, i, c);
      };
    };
    var l = function (e, t, r = !1) {
      return function (n, i) {
        let c = e[t];
        if (!s(n) || (!r && !o(i))) return;
        if (!c[n]) return 0;
        let l = 0;
        if (r)
          ((l = c[n].handlers.length),
            (c[n] = { runs: c[n].runs, handlers: [] }));
        else {
          let e = c[n].handlers;
          for (let t = e.length - 1; t >= 0; t--)
            e[t].namespace === i &&
              (e.splice(t, 1),
              l++,
              c.__current.forEach((e) => {
                e.name === n && e.currentIndex >= t && e.currentIndex--;
              }));
        }
        return ("hookRemoved" !== n && e.doAction("hookRemoved", n, i), l);
      };
    };
    var a = function (e, t) {
      return function (r, n) {
        let i = e[t];
        return typeof n < "u"
          ? r in i && i[r].handlers.some((e) => e.namespace === n)
          : r in i;
      };
    };
    var u = function (e, t, r, n) {
      return function (i, ...o) {
        let s = e[t];
        (s[i] || (s[i] = { handlers: [], runs: 0 }), s[i].runs++);
        let c = s[i].handlers;
        if (!c || !c.length) return r ? o[0] : void 0;
        let l = { name: i, currentIndex: 0 };
        return (
          n
            ? async function () {
                try {
                  s.__current.add(l);
                  let e = r ? o[0] : void 0;
                  for (; l.currentIndex < c.length; )
                    ((e = await c[l.currentIndex].callback.apply(null, o)),
                      r && (o[0] = e),
                      l.currentIndex++);
                  return r ? e : void 0;
                } finally {
                  s.__current.delete(l);
                }
              }
            : function () {
                try {
                  s.__current.add(l);
                  let e = r ? o[0] : void 0;
                  for (; l.currentIndex < c.length; )
                    ((e = c[l.currentIndex].callback.apply(null, o)),
                      r && (o[0] = e),
                      l.currentIndex++);
                  return r ? e : void 0;
                } finally {
                  s.__current.delete(l);
                }
              }
        )();
      };
    };
    var d = function (e, t) {
      return function () {
        let r = e[t];
        return Array.from(r.__current).at(-1)?.name ?? null;
      };
    };
    var h = function (e, t) {
      return function (r) {
        let n = e[t];
        return typeof r > "u"
          ? n.__current.size > 0
          : Array.from(n.__current).some((e) => e.name === r);
      };
    };
    var f = function (e, t) {
        return function (r) {
          let n = e[t];
          if (s(r)) return n[r] && n[r].runs ? n[r].runs : 0;
        };
      },
      A = class {
        actions;
        filters;
        addAction;
        addFilter;
        removeAction;
        removeFilter;
        hasAction;
        hasFilter;
        removeAllActions;
        removeAllFilters;
        doAction;
        doActionAsync;
        applyFilters;
        applyFiltersAsync;
        currentAction;
        currentFilter;
        doingAction;
        doingFilter;
        didAction;
        didFilter;
        constructor() {
          ((this.actions = Object.create(null)),
            (this.actions.__current = new Set()),
            (this.filters = Object.create(null)),
            (this.filters.__current = new Set()),
            (this.addAction = c(this, "actions")),
            (this.addFilter = c(this, "filters")),
            (this.removeAction = l(this, "actions")),
            (this.removeFilter = l(this, "filters")),
            (this.hasAction = a(this, "actions")),
            (this.hasFilter = a(this, "filters")),
            (this.removeAllActions = l(this, "actions", !0)),
            (this.removeAllFilters = l(this, "filters", !0)),
            (this.doAction = u(this, "actions", !1, !1)),
            (this.doActionAsync = u(this, "actions", !1, !0)),
            (this.applyFilters = u(this, "filters", !0, !1)),
            (this.applyFiltersAsync = u(this, "filters", !0, !0)),
            (this.currentAction = d(this, "actions")),
            (this.currentFilter = d(this, "filters")),
            (this.doingAction = h(this, "actions")),
            (this.doingFilter = h(this, "filters")),
            (this.didAction = f(this, "actions")),
            (this.didFilter = f(this, "filters")));
        }
      };
    var p,
      m = function () {
        return new A();
      },
      y = m(),
      {
        addAction: v,
        addFilter: F,
        removeAction: _,
        removeFilter: g,
        hasAction: b,
        hasFilter: k,
        removeAllActions: I,
        removeAllFilters: w,
        doAction: x,
        doActionAsync: O,
        applyFilters: j,
        applyFiltersAsync: T,
        currentAction: z,
        currentFilter: P,
        doingAction: Z,
        doingFilter: E,
        didAction: H,
        didFilter: R,
        actions: S,
        filters: $,
      } = y;
    return (
      (p = i),
      ((i, o, s, c) => {
        if ((o && "object" == typeof o) || "function" == typeof o)
          for (let l of r(o))
            !n.call(i, l) &&
              l !== s &&
              e(i, l, {
                get: () => o[l],
                enumerable: !(c = t(o, l)) || c.enumerable,
              });
        return i;
      })(e({}, "__esModule", { value: !0 }), p)
    );
  })()),
    ((window.wp ||= {}).hooks = e.hooks));
})();

/* --- SOURCE: js/i18n.min.js --- */
/*! This file is auto-generated */
!(function () {
  "use strict";
  var t;
  (((t ||= {}).i18n = (() => {
    var t,
      e,
      r = Object.create,
      n = Object.defineProperty,
      a = Object.getOwnPropertyDescriptor,
      i = Object.getOwnPropertyNames,
      o = Object.getPrototypeOf,
      l = Object.prototype.hasOwnProperty,
      u = (t, e, r, o) => {
        if ((e && "object" == typeof e) || "function" == typeof e)
          for (let u of i(e))
            !l.call(t, u) &&
              u !== r &&
              n(t, u, {
                get: () => e[u],
                enumerable: !(o = a(e, u)) || o.enumerable,
              });
        return t;
      },
      s =
        ((t = (t, e) => {
          e.exports = window.wp.hooks;
        }),
        () => (e || t((e = { exports: {} }).exports, e), e.exports)),
      p = {};
    ((t, e) => {
      for (var r in e) n(t, r, { get: e[r], enumerable: !0 });
    })(p, {
      __: () => T,
      _n: () => R,
      _nx: () => $,
      _x: () => M,
      createI18n: () => w,
      defaultI18n: () => D,
      getLocaleData: () => P,
      hasTranslation: () => K,
      isRTL: () => I,
      resetLocaleData: () => A,
      setLocaleData: () => j,
      sprintf: () => b,
      subscribe: () => k,
    });
    var c,
      d,
      f,
      h,
      _ =
        /%(((\d+)\$)|(\(([$_a-zA-Z][$_a-zA-Z0-9]*)\)))?[ +0#-]*\d*(\.(\d+|\*))?(ll|[lhqL])?([cduxXefgsp%])/g;
    function b(t, ...e) {
      return (function (t, ...e) {
        var r = 0;
        return (
          Array.isArray(e[0]) && (e = e[0]),
          t.replace(_, function () {
            var t, n, a, i, o;
            return (
              (t = arguments[3]),
              (n = arguments[5]),
              (a = arguments[7]),
              "%" === (i = arguments[9])
                ? "%"
                : ("*" === a && ((a = e[r]), r++),
                  void 0 === n
                    ? (void 0 === t && (t = r + 1), r++, (o = e[t - 1]))
                    : e[0] &&
                      "object" == typeof e[0] &&
                      e[0].hasOwnProperty(n) &&
                      (o = e[0][n]),
                  "f" === i
                    ? (o = parseFloat(o) || 0)
                    : "d" === i && (o = parseInt(o) || 0),
                  void 0 !== a &&
                    ("f" === i
                      ? (o = o.toFixed(a))
                      : "s" === i && (o = o.substr(0, a))),
                  o ?? "")
            );
          })
        );
      })(t, ...e);
    }
    ((c = {
      "(": 9,
      "!": 8,
      "*": 7,
      "/": 7,
      "%": 7,
      "+": 6,
      "-": 6,
      "<": 5,
      "<=": 5,
      ">": 5,
      ">=": 5,
      "==": 4,
      "!=": 4,
      "&&": 3,
      "||": 2,
      "?": 1,
      "?:": 1,
    }),
      (d = ["(", "?"]),
      (f = { ")": ["("], ":": ["?", "?:"] }),
      (h = /<=|>=|==|!=|&&|\|\||\?:|\(|!|\*|\/|%|\+|-|<|>|\?|\)|:/));
    var x = {
      "!": function (t) {
        return !t;
      },
      "*": function (t, e) {
        return t * e;
      },
      "/": function (t, e) {
        return t / e;
      },
      "%": function (t, e) {
        return t % e;
      },
      "+": function (t, e) {
        return t + e;
      },
      "-": function (t, e) {
        return t - e;
      },
      "<": function (t, e) {
        return t < e;
      },
      "<=": function (t, e) {
        return t <= e;
      },
      ">": function (t, e) {
        return t > e;
      },
      ">=": function (t, e) {
        return t >= e;
      },
      "==": function (t, e) {
        return t === e;
      },
      "!=": function (t, e) {
        return t !== e;
      },
      "&&": function (t, e) {
        return t && e;
      },
      "||": function (t, e) {
        return t || e;
      },
      "?:": function (t, e, r) {
        if (t) throw e;
        return r;
      },
    };
    function y(t) {
      var e = (function (t) {
        for (var e, r, n, a, i = [], o = []; (e = t.match(h)); ) {
          for (
            r = e[0], (n = t.substr(0, e.index).trim()) && i.push(n);
            (a = o.pop());
          ) {
            if (f[r]) {
              if (f[r][0] === a) {
                r = f[r][1] || r;
                break;
              }
            } else if (d.indexOf(a) >= 0 || c[a] < c[r]) {
              o.push(a);
              break;
            }
            i.push(a);
          }
          (f[r] || o.push(r), (t = t.substr(e.index + r.length)));
        }
        return ((t = t.trim()) && i.push(t), i.concat(o.reverse()));
      })(t);
      return function (t) {
        return (function (t, e) {
          var r,
            n,
            a,
            i,
            o,
            l,
            u = [];
          for (r = 0; r < t.length; r++) {
            if (((o = t[r]), (i = x[o]))) {
              for (n = i.length, a = Array(n); n--; ) a[n] = u.pop();
              try {
                l = i.apply(null, a);
              } catch (t) {
                return t;
              }
            } else l = e.hasOwnProperty(o) ? e[o] : +o;
            u.push(l);
          }
          return u[0];
        })(e, t);
      };
    }
    var v = { contextDelimiter: "", onMissingKey: null };
    function g(t, e) {
      var r;
      for (r in ((this.data = t),
      (this.pluralForms = {}),
      (this.options = {}),
      v))
        this.options[r] = void 0 !== e && r in e ? e[r] : v[r];
    }
    ((g.prototype.getPluralForm = function (t, e) {
      var r,
        n,
        a,
        i = this.pluralForms[t];
      return (
        i ||
          ("function" !=
            typeof (a =
              (r = this.data[t][""])["Plural-Forms"] ||
              r["plural-forms"] ||
              r.plural_forms) &&
            ((n = (function (t) {
              var e, r, n;
              for (e = t.split(";"), r = 0; r < e.length; r++)
                if (0 === (n = e[r].trim()).indexOf("plural="))
                  return n.substr(7);
            })(r["Plural-Forms"] || r["plural-forms"] || r.plural_forms)),
            (a = (function (t) {
              var e = y(t);
              return function (t) {
                return +e({ n: t });
              };
            })(n))),
          (i = this.pluralForms[t] = a)),
        i(e)
      );
    }),
      (g.prototype.dcnpgettext = function (t, e, r, n, a) {
        var i, o, l;
        return (
          (i = void 0 === a ? 0 : this.getPluralForm(t, a)),
          (o = r),
          e && (o = e + this.options.contextDelimiter + r),
          (l = this.data[t][o]) && l[i]
            ? l[i]
            : (this.options.onMissingKey && this.options.onMissingKey(r, t),
              0 === i ? r : n)
        );
      }));
    var m = { plural_forms: (t) => (1 === t ? 0 : 1) },
      F = /^i18n\.(n?gettext|has_translation)(_|$)/,
      w = (t, e, r) => {
        let n = new g({}),
          a = new Set(),
          i = () => {
            a.forEach((t) => t());
          },
          o = (t, e = "default") => {
            ((n.data[e] = { ...n.data[e], ...t }),
              (n.data[e][""] = { ...m, ...n.data[e]?.[""] }),
              delete n.pluralForms[e]);
          },
          l = (t, e) => {
            (o(t, e), i());
          },
          u = (t = "default", e, r, a, i) => (
            n.data[t] || o(void 0, t),
            n.dcnpgettext(t, e, r, a, i)
          ),
          s = (t) => t || "default",
          p = (t, e, n) => {
            let a = u(n, e, t);
            return r
              ? ((a = r.applyFilters("i18n.gettext_with_context", a, t, e, n)),
                r.applyFilters("i18n.gettext_with_context_" + s(n), a, t, e, n))
              : a;
          };
        if ((t && l(t, e), r)) {
          let t = (t) => {
            F.test(t) && i();
          };
          (r.addAction("hookAdded", "core/i18n", t),
            r.addAction("hookRemoved", "core/i18n", t));
        }
        return {
          getLocaleData: (t = "default") => n.data[t],
          setLocaleData: l,
          addLocaleData: (t, e = "default") => {
            ((n.data[e] = {
              ...n.data[e],
              ...t,
              "": { ...m, ...n.data[e]?.[""], ...t?.[""] },
            }),
              delete n.pluralForms[e],
              i());
          },
          resetLocaleData: (t, e) => {
            ((n.data = {}), (n.pluralForms = {}), l(t, e));
          },
          subscribe: (t) => (a.add(t), () => a.delete(t)),
          __: (t, e) => {
            let n = u(e, void 0, t);
            return r
              ? ((n = r.applyFilters("i18n.gettext", n, t, e)),
                r.applyFilters("i18n.gettext_" + s(e), n, t, e))
              : n;
          },
          _x: p,
          _n: (t, e, n, a) => {
            let i = u(a, void 0, t, e, n);
            return r
              ? ((i = r.applyFilters("i18n.ngettext", i, t, e, n, a)),
                r.applyFilters("i18n.ngettext_" + s(a), i, t, e, n, a))
              : i;
          },
          _nx: (t, e, n, a, i) => {
            let o = u(i, a, t, e, n);
            return r
              ? ((o = r.applyFilters(
                  "i18n.ngettext_with_context",
                  o,
                  t,
                  e,
                  n,
                  a,
                  i,
                )),
                r.applyFilters(
                  "i18n.ngettext_with_context_" + s(i),
                  o,
                  t,
                  e,
                  n,
                  a,
                  i,
                ))
              : o;
          },
          isRTL: () => "rtl" === p("ltr", "text direction"),
          hasTranslation: (t, e, a) => {
            let i = e ? e + "" + t : t,
              o = !!n.data?.[a ?? "default"]?.[i];
            return (
              r &&
                ((o = r.applyFilters("i18n.has_translation", o, t, e, a)),
                (o = r.applyFilters(
                  "i18n.has_translation_" + s(a),
                  o,
                  t,
                  e,
                  a,
                ))),
              o
            );
          },
        };
      },
      L = ((t, e, a) => (
        (a = null != t ? r(o(t)) : {}),
        u(
          !e && t && t.__esModule
            ? a
            : n(a, "default", { value: t, enumerable: !0 }),
          t,
        )
      ))(s(), 1),
      O = w(void 0, void 0, L.defaultHooks),
      D = O,
      P = O.getLocaleData.bind(O),
      j = O.setLocaleData.bind(O),
      A = O.resetLocaleData.bind(O),
      k = O.subscribe.bind(O),
      T = O.__.bind(O),
      M = O._x.bind(O),
      R = O._n.bind(O),
      $ = O._nx.bind(O),
      I = O.isRTL.bind(O),
      K = O.hasTranslation.bind(O);
    return ((t) => u(n({}, "__esModule", { value: !0 }), t))(p);
  })()),
    ((window.wp ||= {}).i18n = t.i18n));
})();

/* --- SOURCE: inline script (i18n locale data) --- */
wp.i18n.setLocaleData({ "text direction\u0004ltr": ["ltr"] });
//# sourceURL=fw-i18n-js-after

/* --- SOURCE: js/portfolio-enhancements.js --- */
(function () {
  "use strict";

  var body = document.body;
  var header = document.querySelector(".site-header");
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".nav-links a"),
  );
  var sections = ["home", "services", "work", "contact"]
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  /* Reading progress bar */
  var progress = document.createElement("div");
  progress.className = "portfolio-progress";
  progress.setAttribute("aria-hidden", "true");
  body.appendChild(progress);

  function updateScrollUI() {
    var scrollTop = window.scrollY || window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width =
      (docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0) + "%";

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
    ".site-footer",
  ];

  revealTargets.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (element, index) {
      element.classList.add("portfolio-reveal");
      if (index % 3 === 1) element.classList.add("portfolio-delay-1");
      if (index % 3 === 2) element.classList.add("portfolio-delay-2");
    });
  });

  var revealObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          function (entries, observer) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
        )
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
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            var active = link.getAttribute("href") === "#" + entry.target.id;
            link.classList.toggle("is-active", active);
          });
        });
      },
      { threshold: 0.35 },
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* Services item indicator toggle for click/touch/keyboard interaction */
  var serviceCards = Array.prototype.slice.call(
    document.querySelectorAll("#services > .e-con"),
  );
  serviceCards.forEach(function (card) {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-expanded", "false");

    function updateServiceState(nextState) {
      var isExpanded = !!nextState;
      serviceCards.forEach(function (item) {
        var active = item === card ? isExpanded : false;
        item.classList.toggle("is-expanded", active);
        item.setAttribute("aria-expanded", String(active));
      });
    }

    card.addEventListener("click", function () {
      var isExpanded = card.classList.contains("is-expanded");
      updateServiceState(!isExpanded);
    });

    card.addEventListener("pointerdown", function () {
      card.classList.add("is-pressed");
    });

    card.addEventListener("pointerup", function () {
      card.classList.remove("is-pressed");
    });

    card.addEventListener("pointerleave", function () {
      card.classList.remove("is-pressed");
    });

    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        var isExpanded = card.classList.contains("is-expanded");
        updateServiceState(!isExpanded);
      }
    });
  });

  /* Add subtle external-link safety without changing existing URLs */
  document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
    link.setAttribute("rel", "noopener noreferrer");
  });
})();
