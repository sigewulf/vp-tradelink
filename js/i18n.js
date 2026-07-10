/* VP TRADELINK — i18n.js 2026
   Full translation engine. Applies all lang JSON keys to data-i18n attributes.
   Handles RTL (Arabic), persists language choice, populates lang dropdown. */
(function () {
  'use strict';

  const SUPPORTED = [
    { code: 'en', label: 'English',  flag: '🇬🇧', dir: 'ltr' },
    { code: 'ar', label: 'عربي',     flag: '🇦🇪', dir: 'rtl' },
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr' },
    { code: 'id', label: 'Bahasa',   flag: '🇮🇩', dir: 'ltr' },
    { code: 'zh', label: '中文',      flag: '🇨🇳', dir: 'ltr' }
  ];

  let currentLang = localStorage.getItem('vpt_lang') || 'en';
  let translations = {};

  /* ── Flatten nested JSON to dot-notation keys ──────────────── */
  function flatten(obj, prefix) {
    return Object.keys(obj).reduce((acc, k) => {
      const key = prefix ? `${prefix}.${k}` : k;
      if (typeof obj[k] === 'object' && obj[k] !== null) {
        Object.assign(acc, flatten(obj[k], key));
      } else {
        acc[key] = obj[k];
      }
      return acc;
    }, {});
  }

  /* ── Get nested value from dot-notation key ─────────────────── */
  function t(key) {
    return translations[key] || key;
  }

  /* ── Apply translations to all data-i18n elements ───────────── */
  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val && val !== key) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else if (el.tagName === 'META') {
          el.content = val;
        } else {
          el.textContent = val;
        }
      }
    });

    /* data-i18n-placeholder for form inputs */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = t(key);
      if (val && val !== key) el.placeholder = val;
    });

    /* data-i18n-html for elements that need innerHTML */
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const val = t(key);
      if (val && val !== key) el.innerHTML = val;
    });

    /* Translations are in the DOM now — safe to reveal.
       (No-op if the FOUC guard was never engaged, i.e. English.) */
    document.documentElement.classList.remove('i18n-loading');
  }

  /* ── Apply RTL / LTR ─────────────────────────────────────────── */
  function applyDirection(lang) {
    const cfg = SUPPORTED.find(l => l.code === lang) || SUPPORTED[0];
    document.documentElement.setAttribute('dir', cfg.dir);
    document.documentElement.setAttribute('lang', lang);
  }

  /* ── Populate language dropdown ─────────────────────────────── */
  function buildDropdown() {
    document.querySelectorAll('.lang-dropdown').forEach(dropdown => {
      dropdown.innerHTML = SUPPORTED.map(l =>
        `<li role="menuitem">
           <a href="#" data-lang="${l.code}" class="${l.code === currentLang ? 'active' : ''}">
             <span>${l.flag}</span> ${l.label}
           </a>
         </li>`
      ).join('');

      dropdown.querySelectorAll('a[data-lang]').forEach(a => {
        a.addEventListener('click', e => {
          e.preventDefault();
          setLanguage(a.getAttribute('data-lang'));
        });
      });
    });

    /* Update label button */
    const cfg = SUPPORTED.find(l => l.code === currentLang) || SUPPORTED[0];
    document.querySelectorAll('.lang-label').forEach(el => {
      el.textContent = cfg.code.toUpperCase();
    });
  }

  /* ── Lang switcher open/close ───────────────────────────────── */
  function initSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const switcher = btn.closest('.lang-switcher');
        const isOpen = switcher.classList.contains('open');
        document.querySelectorAll('.lang-switcher.open').forEach(s => s.classList.remove('open'));
        if (!isOpen) {
          switcher.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        } else {
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.lang-switcher.open').forEach(s => {
        s.classList.remove('open');
        s.querySelector('.lang-btn')?.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Load language JSON and apply ──────────────────────────── */
  function loadLanguage(lang, cb) {
    const url = `lang/${lang}.json?v=2026`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        translations = flatten(data);
        cb();
      })
      .catch(() => {
        if (lang !== 'en') {
          loadLanguage('en', cb);
        }
      });
  }

  /* ── Set language ───────────────────────────────────────────── */
  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('vpt_lang', lang);
    loadLanguage(lang, () => {
      applyDirection(lang);
      applyTranslations();
      buildDropdown();
    });
  }

  /* ── Init ───────────────────────────────────────────────────── */
  function init() {
    initSwitcher();
    buildDropdown();
    loadLanguage(currentLang, () => {
      applyDirection(currentLang);
      applyTranslations();
      buildDropdown();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
