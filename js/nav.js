// VP Tradelink — shared mobile nav toggle. One file, included identically on every page.
(function () {
  try {
    var stored = localStorage.getItem("vp_theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
    }
  } catch (err) {}
})();
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  var scrim = document.querySelector(".nav-scrim");
  if (!toggle || !nav) return;

  function closeNav() {
    nav.classList.remove("is-open");
    if (scrim) scrim.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
    toggle.focus();
  }
  function openNav() {
    nav.classList.add("is-open");
    if (scrim) scrim.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
    var firstLink = nav.querySelector("a");
    if (firstLink) firstLink.focus();
  }

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.contains("is-open");
    if (isOpen) { closeNav(); } else { openNav(); }
  });
  if (scrim) scrim.addEventListener("click", closeNav);
  nav.querySelectorAll("a:not(.nav-dropdown__trigger)").forEach(function (a) {
    a.addEventListener("click", closeNav);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { closeNav(); return; }
    // Trap focus inside the open mobile drawer (WCAG 2.4.3) so Tab can't
    // land on content hidden behind it.
    if (e.key === "Tab" && nav.classList.contains("is-open")) {
      var focusable = nav.querySelectorAll('a[href], button:not([disabled])');
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Mega-menu: on mobile, tapping "Products" expands the category tree in place
  // instead of navigating away. On desktop the panel opens via CSS hover/focus-within;
  // aria-expanded is kept in sync here so assistive tech reports the real state.
  var dropdown = document.querySelector(".nav-dropdown");
  var dropdownTrigger = dropdown ? dropdown.querySelector(".nav-dropdown__trigger") : null;
  if (dropdown && dropdownTrigger) {
    dropdownTrigger.setAttribute("aria-expanded", "false");
    dropdownTrigger.addEventListener("click", function (e) {
      if (window.innerWidth <= 760) {
        e.preventDefault();
        var isOpen = dropdown.classList.toggle("is-open");
        dropdownTrigger.setAttribute("aria-expanded", String(isOpen));
      }
    });
    dropdown.addEventListener("mouseenter", function () {
      if (window.innerWidth > 760) dropdownTrigger.setAttribute("aria-expanded", "true");
    });
    dropdown.addEventListener("mouseleave", function () {
      if (window.innerWidth > 760) dropdownTrigger.setAttribute("aria-expanded", "false");
    });
    dropdown.addEventListener("focusin", function () {
      if (window.innerWidth > 760) dropdownTrigger.setAttribute("aria-expanded", "true");
    });
    dropdown.addEventListener("focusout", function () {
      if (window.innerWidth > 760 && !dropdown.contains(document.activeElement)) {
        dropdownTrigger.setAttribute("aria-expanded", "false");
      }
    });
  }
  // Mobile compare-table scroll-fade: hide the "more content" hint once
  // the visitor has actually scrolled to the end of the table.
  document.querySelectorAll(".compare-table-wrap").forEach(function (wrap) {
    function checkEnd() {
      var atEnd = wrap.scrollLeft + wrap.clientWidth >= wrap.scrollWidth - 2;
      wrap.classList.toggle("is-scrolled-end", atEnd);
    }
    wrap.addEventListener("scroll", checkEnd, { passive: true });
    checkEnd();
  });

  // Theme toggle: explicit light/dark override, independent of system setting.
  var themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    function currentTheme() {
      var stored = null;
      try { stored = localStorage.getItem("vp_theme"); } catch (err) {}
      if (stored === "light" || stored === "dark") return stored;
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    themeBtn.setAttribute("aria-pressed", currentTheme() === "dark" ? "true" : "false");
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      themeBtn.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
      try { localStorage.setItem("vp_theme", next); } catch (err) {}
    });
  }

  // Language selector: click to open, click outside or press Escape to close.
  var langSwitch = document.querySelector(".lang-switch");
  var langTrigger = langSwitch ? langSwitch.querySelector(".lang-switch__trigger") : null;
  if (langSwitch && langTrigger) {
    langTrigger.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = langSwitch.classList.toggle("is-open");
      langTrigger.setAttribute("aria-expanded", String(isOpen));
    });
    document.addEventListener("click", function (e) {
      if (!langSwitch.contains(e.target)) {
        langSwitch.classList.remove("is-open");
        langTrigger.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        langSwitch.classList.remove("is-open");
        langTrigger.setAttribute("aria-expanded", "false");
      }
    });

    // Remember the choice: a returning visitor shouldn't have to re-select
    // their language on every page. Store on explicit selection...
    langSwitch.querySelectorAll(".lang-switch__menu a").forEach(function (a) {
      a.addEventListener("click", function () {
        var langMatch = a.href.match(/\/(vi|id)\//);
        try { localStorage.setItem("vp_lang", langMatch ? langMatch[1] : "en"); } catch (err) {}
      });
    });

    // ...and honor it once per session on later visits, using the
    // already-generated cross-language link for this exact page so the
    // visitor lands on the matching page, not just the homepage.
    try {
      var storedLang = localStorage.getItem("vp_lang");
      var currentLang = document.documentElement.getAttribute("lang");
      var alreadyRedirected = sessionStorage.getItem("vp_lang_redirected");
      if (storedLang && storedLang !== currentLang && !alreadyRedirected && !window.location.search) {
        var targetLink = storedLang === "en"
          ? langSwitch.querySelector('.lang-switch__menu a:not([href*="/vi/"]):not([href*="/id/"])')
          : langSwitch.querySelector('.lang-switch__menu a[href*="/' + storedLang + '/"]');
        if (targetLink) {
          sessionStorage.setItem("vp_lang_redirected", "1");
          window.location.href = targetLink.href;
        }
      }
    } catch (err) {}
  }

  // Product tables: make the entire product row clickable, not only the
  // product name or the small "View" button.
  document.querySelectorAll(".spec-table tbody tr").forEach(function (row) {
    var link = row.querySelector("a[href]");
    if (!link) return;

    // Row already contains a real <a href>, which is natively focusable and
    // accessible on its own — adding role="button"/tabindex here would wrap
    // a button role around a link, a nested-interactive-content violation.
    // We still expand the click target to the whole row for convenience.

    row.addEventListener("click", function (e) {
      if (e.target.closest("a, button, input, select, textarea")) return;
      window.location.href = link.href;
    });
  });

});
