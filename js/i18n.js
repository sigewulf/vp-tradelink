/* =========================================================
   VP TRADELINK — i18n engine
   Real language switching: loads /lang/{code}.json and swaps
   the text of every element marked data-i18n="key.path".
   No page reload. Choice persists across pages via localStorage.

   To add a new translatable string anywhere on the site:
     1. Add a data-i18n="some.key" attribute to the element
     2. Add "some.key": "..." to each file in /lang/*.json
   To add a new language: copy /lang/en.json, translate the
   values, add one line to the LANGUAGES list below.
   ========================================================= */

(function () {
  'use strict';

  const LANGUAGES = [
    { code: 'en', label: 'English',    flag: '🇬🇧', rtl: false },
    { code: 'ar', label: 'العربية',     flag: '🇸🇦', rtl: true  },
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳', rtl: false },
    { code: 'id', label: 'Indonesia',  flag: '🇮🇩', rtl: false },
    { code: 'zh', label: '中文',         flag: '🇨🇳', rtl: false },
  ];

  const STORAGE_KEY = 'vp_lang';
  const cache = {};

  function getStoredLang() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function storeLang(code) {
    try { localStorage.setItem(STORAGE_KEY, code); } catch (e) { /* ignore */ }
  }

  function resolveKey(dict, key) {
    return key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), dict);
  }

  async function loadDict(code) {
    if (cache[code]) return cache[code];
    const res = await fetch(`lang/${code}.json`);
    if (!res.ok) throw new Error('lang file missing: ' + code);
    const json = await res.json();
    cache[code] = json;
    return json;
  }

  function applyDict(dict) {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = resolveKey(dict, key);
      if (val !== undefined) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = resolveKey(dict, key);
      if (val !== undefined) el.setAttribute('placeholder', val);
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria-label');
      const val = resolveKey(dict, key);
      if (val !== undefined) el.setAttribute('aria-label', val);
    });
  }

  async function setLanguage(code, opts) {
    opts = opts || {};
    const lang = LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
    try {
      const dict = await loadDict(lang.code);
      applyDict(dict);
    } catch (e) {
      console.warn('i18n: could not load', lang.code, e);
      if (lang.code !== 'en') return setLanguage('en', opts);
    }

    document.documentElement.setAttribute('lang', lang.code);
    document.documentElement.setAttribute('dir', lang.rtl ? 'rtl' : 'ltr');

    const labelEl = document.querySelector('.lang-label');
    if (labelEl) labelEl.textContent = lang.code.toUpperCase();

    document.querySelectorAll('.lang-dropdown [data-lang-code]').forEach((item) => {
      item.classList.toggle('lang-active', item.getAttribute('data-lang-code') === lang.code);
    });

    if (!opts.silent) storeLang(lang.code);
  }

  function buildDropdown() {
    const list = document.querySelector('.lang-dropdown');
    if (!list) return;
    list.innerHTML = LANGUAGES.map((l) => `
      <li role="none">
        <button type="button" role="menuitem" data-lang-code="${l.code}">
          <span aria-hidden="true">${l.flag}</span> ${l.label}
        </button>
      </li>`).join('');
  }

  function wireUp() {
    const langSwitcher = document.querySelector('.lang-switcher');
    const langBtn = document.querySelector('.lang-btn');
    if (!langSwitcher || !langBtn) return;

    buildDropdown();

    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = langSwitcher.classList.toggle('open');
      langBtn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', () => {
      langSwitcher.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    });

    langSwitcher.querySelectorAll('[data-lang-code]').forEach((item) => {
      item.addEventListener('click', () => {
        setLanguage(item.getAttribute('data-lang-code'));
        langSwitcher.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
      });
      item.addEventListener('keydown', (e) => {
        const items = Array.from(langSwitcher.querySelectorAll('[data-lang-code]'));
        const idx = items.indexOf(item);
        if (e.key === 'ArrowDown') { e.preventDefault(); (items[idx + 1] || items[0]).focus(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); (items[idx - 1] || items[items.length - 1]).focus(); }
        else if (e.key === 'Escape') { langSwitcher.classList.remove('open'); langBtn.focus(); }
      });
    });

    const saved = getStoredLang();
    if (saved && saved !== 'en') setLanguage(saved, { silent: true });
  }

  document.addEventListener('DOMContentLoaded', wireUp);
})();
