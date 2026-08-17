// VP Tradelink — shared contact form handler (FormSubmit).
// Included identically on every /contact.html (en/id/vi).
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("inquiry-form");
  if (!form) return;

  var statusEl = document.getElementById("form-status");
  var submitBtn = form.querySelector('button[type="submit"]');

  // Pre-fill product from ?product=slug.
  // NOTE: previously this built a CSS selector by string-concatenating the raw
  // query value in (`'[data-slug="' + p + '"]'`), which threw an uncaught
  // SyntaxError for any value containing a quote/bracket/backslash — and
  // because that happened at the top of this handler, the exception aborted
  // everything below it (validation wiring, submit handler) with no visible
  // error. Matching in JS instead of via selector avoids that entirely.
  var p = new URLSearchParams(window.location.search).get("product");
  if (p) {
    var productOptions = form.querySelectorAll("#product option");
    var opt = null;
    for (var i = 0; i < productOptions.length; i++) {
      if (productOptions[i].dataset.slug === p) { opt = productOptions[i]; break; }
    }
    if (opt) opt.selected = true;
  }

  // ---- Bundled inquiry list (products ticked via "Add to Inquiry") -------
  (function renderInquirySummary() {
    var summary = document.getElementById("inquiry-summary");
    var listEl = document.getElementById("inquiry-summary__list");
    var hiddenField = document.getElementById("products_of_interest");
    if (!summary || !listEl || !window.vpInquiry) return;

    var removeLabel = { en: "Remove", vi: "Xóa", id: "Hapus" }[document.documentElement.getAttribute("lang")] || "Remove";

    // Resolve each item's display name from the CURRENT page's language,
    // via the #product <select>'s data-slug options, rather than trusting
    // whatever name string was stored at add-time (which may have been
    // captured on a different-language page and would otherwise mix
    // languages in one inquiry).
    function nameForSlug(slug, fallback) {
      var opt = form.querySelector('#product option[data-slug="' + slug + '"]');
      return opt ? opt.textContent : fallback;
    }

    function refresh() {
      var list = window.vpInquiry.getList();
      listEl.innerHTML = "";
      if (list.length === 0) {
        summary.classList.remove("is-visible");
        if (hiddenField) hiddenField.value = "";
        return;
      }
      summary.classList.add("is-visible");
      var displayNames = list.map(function (i) { return nameForSlug(i.slug, i.name); });
      if (hiddenField) hiddenField.value = displayNames.join(", ");
      list.forEach(function (item, idx) {
        var displayName = displayNames[idx];
        var li = document.createElement("li");
        li.textContent = displayName + " ";
        var removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "inquiry-list__remove";
        removeBtn.textContent = removeLabel;
        removeBtn.setAttribute("aria-label", removeLabel + " " + displayName);
        removeBtn.addEventListener("click", function () {
          var updated = window.vpInquiry.getList().filter(function (i) { return i.slug !== item.slug; });
          window.vpInquiry.setList(updated);
          refresh();
        });
        li.appendChild(removeBtn);
        listEl.appendChild(li);
      });
      // If no single product is selected yet, default the dropdown to the first bundled item.
      if (!p) {
        var productSelect = form.querySelector("#product");
        if (productSelect && productSelect.value === "") {
          var opts = form.querySelectorAll("#product option");
          for (var j = 0; j < opts.length; j++) {
            if (opts[j].dataset.slug === list[0].slug) { opts[j].selected = true; break; }
          }
        }
      }
    }
    refresh();
  })();

  function setStatus(key) {
    if (!statusEl) return;
    statusEl.textContent = statusEl.dataset[key] || "";
    statusEl.classList.add("is-visible");
  }

  // ---- Validation ----------------------------------------------------
  var requiredMsg = form.dataset.msgRequired || "This field is required.";
  var emailMsg = form.dataset.msgEmail || "Please enter a valid email address.";

  function fieldWrap(input) {
    return input.closest(".form-field");
  }

  function getErrorEl(input) {
    var wrap = fieldWrap(input);
    if (!wrap) return null;
    var err = wrap.querySelector(".form-field__error");
    if (!err) {
      err = document.createElement("p");
      err.className = "form-field__error";
      err.id = input.id + "-error";
      wrap.appendChild(err);
    }
    return err;
  }

  function markInvalid(input, message) {
    var wrap = fieldWrap(input);
    var err = getErrorEl(input);
    if (wrap) wrap.classList.add("form-field--invalid");
    if (err) err.textContent = message;
    input.setAttribute("aria-invalid", "true");
    if (err) input.setAttribute("aria-describedby", err.id);
  }

  function clearInvalid(input) {
    var wrap = fieldWrap(input);
    if (wrap) wrap.classList.remove("form-field--invalid");
    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-describedby");
  }

  function validateField(input) {
    if (input.required && !input.value.trim()) {
      markInvalid(input, requiredMsg);
      return false;
    }
    if (input.type === "email" && input.value.trim() && !input.checkValidity()) {
      markInvalid(input, emailMsg);
      return false;
    }
    clearInvalid(input);
    return true;
  }

  var validatableFields = form.querySelectorAll("input, select, textarea");
  validatableFields.forEach(function (input) {
    input.addEventListener("blur", function () { validateField(input); });
    input.addEventListener("input", function () {
      if (fieldWrap(input) && fieldWrap(input).classList.contains("form-field--invalid")) {
        validateField(input);
      }
    });
  });

  function validateForm() {
    var firstInvalid = null;
    validatableFields.forEach(function (input) {
      var ok = validateField(input);
      if (!ok && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  // If the AJAX request fails outright (ad blocker, CORS, offline), fall
  // back to opening the user's email client with the inquiry pre-filled.
  function openMailtoFallback(fields) {
    var to = "shezad@vptradelink.com";
    var subject = "New Business Inquiry — VP Tradelink";
    var lines = [
      "Name: " + (fields.name || ""),
      "Company: " + (fields.company || ""),
      "Country: " + (fields.country || ""),
      "Email: " + (fields.email || ""),
      "Phone / WhatsApp: " + (fields.phone || ""),
      "Product: " + (fields.product || ""),
      "Quantity: " + (fields.quantity || ""),
      "Destination Port: " + (fields.port || ""),
      "",
      "Message:",
      fields.message || ""
    ];
    var mailto = "mailto:" + to +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
    window.location.href = mailto;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    if (submitBtn) submitBtn.disabled = true;
    setStatus("statusSending");

    var ajaxUrl = form.action.replace(
      "https://formsubmit.co/",
      "https://formsubmit.co/ajax/"
    );

    var data = Object.fromEntries(new FormData(form).entries());

    fetch(ajaxUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        if (!response.ok) throw new Error("FormSubmit request failed");
        return response.json();
      })
      .then(function () {
        setStatus("statusSuccess");
        form.reset();
        if (window.vpInquiry) window.vpInquiry.setList([]);
        var summaryEl = document.getElementById("inquiry-summary");
        if (summaryEl) summaryEl.classList.remove("is-visible");
        var trayEl = document.querySelector(".inquiry-tray");
        if (trayEl) trayEl.classList.remove("is-visible");
        if (submitBtn) submitBtn.disabled = false;
      })
      .catch(function (err) {
        console.error("FormSubmit error:", err);
        try {
          openMailtoFallback(data);
          setStatus("statusFallback");
        } catch (fallbackErr) {
          // Even the mailto fallback couldn't run (e.g. blocked by the
          // browser/embedding context) — this is the one case the visitor
          // gets no automatic path to send their inquiry, so show the
          // explicit error message with a manual contact instruction.
          console.error("Mailto fallback error:", fallbackErr);
          setStatus("statusError");
        }
        if (submitBtn) submitBtn.disabled = false;
      });
  });
});
