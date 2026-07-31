// VP Tradelink — bundled inquiry list.
// Buyers commonly load mixed containers (e.g. Quartz + Sesame Seeds in one
// shipment). This lets them tick products while browsing and carry the
// whole list to one contact form instead of submitting separate inquiries.
// No backend: everything lives in localStorage as an array of {slug, name}.
(function () {
  var STORAGE_KEY = "vp_inquiry_list";

  var STRINGS = {
    en: { one: "product selected", many: "products selected", review: "Review &amp; Send" },
    vi: { one: "sản phẩm đã chọn", many: "sản phẩm đã chọn", review: "Xem &amp; Gửi" },
    id: { one: "produk dipilih", many: "produk dipilih", review: "Tinjau &amp; Kirim" }
  };

  function strings() {
    var lang = document.documentElement.getAttribute("lang");
    return STRINGS[lang] || STRINGS.en;
  }

  function getList() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function setList(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (err) {}
  }

  function findContactHref() {
    // Reuse whatever contact link already exists on the page so the tray
    // always points at the correct language/relative path.
    var link = document.querySelector('a[href*="contact.html"]');
    return link ? link.href.split("?")[0] : "contact.html";
  }

  function renderTray() {
    var tray = document.querySelector(".inquiry-tray");
    if (!tray) return;
    var list = getList();
    var countEl = tray.querySelector(".inquiry-tray__count");
    var textEl = tray.querySelector(".inquiry-tray__text");
    if (list.length === 0) {
      tray.classList.remove("is-visible");
      return;
    }
    if (countEl) countEl.textContent = String(list.length);
    if (textEl) textEl.textContent = list.length === 1 ? strings().one : strings().many;
    tray.classList.add("is-visible");
  }

  function syncButtons() {
    var list = getList();
    var slugs = list.map(function (i) { return i.slug; });
    document.querySelectorAll(".inquiry-add[data-slug]").forEach(function (btn) {
      var on = slugs.indexOf(btn.dataset.slug) !== -1;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      var labelEl = btn.querySelector(".inquiry-add__label");
      if (labelEl) labelEl.textContent = on ? (btn.dataset.labelAdded || "Added") : (btn.dataset.labelDefault || "Add to Inquiry");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Build the floating tray once, if the page doesn't already have one.
    if (!document.querySelector(".inquiry-tray")) {
      var tray = document.createElement("div");
      tray.className = "inquiry-tray";
      tray.innerHTML =
        '<span class="inquiry-tray__count">0</span>' +
        '<span class="inquiry-tray__text">' + strings().many + '</span>' +
        '<a class="btn btn--primary" href="' + findContactHref() + '">' + strings().review + '</a>';
      document.body.appendChild(tray);
    }
    renderTray();
    syncButtons();

    document.querySelectorAll(".inquiry-add[data-slug]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var list = getList();
        var slug = btn.dataset.slug;
        var idx = list.findIndex(function (i) { return i.slug === slug; });
        if (idx === -1) {
          list.push({ slug: slug, name: btn.dataset.name || slug });
        } else {
          list.splice(idx, 1);
        }
        setList(list);
        syncButtons();
        renderTray();
      });
    });
  });

  // Exposed for contact.html to read/remove entries.
  window.vpInquiry = { getList: getList, setList: setList };
})();
