/* VP TRADELINK — main.js
   Mobile nav, scroll-reveal animation, product detail modal.
   Language switching lives in i18n.js. */

(function () {
  'use strict';

  /* 1. Mobile navigation toggle */
  const menuBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('#nav-menu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
        menuBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        menuBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        menuBtn.focus();
      }
    });
  }

  /* 2. Scroll-reveal for cards & steps */
  const revealEls = document.querySelectorAll('.category-card, .product-card, .step, .product-box');
  if ('IntersectionObserver' in window && revealEls.length) {
    revealEls.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = Array.from(entry.target.parentElement?.children || []);
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => entry.target.classList.add('visible'), Math.min(idx * 70, 300));
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  }

  /* 3. Active nav link on scroll (home page) */
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (sections.length && navLinks.length) {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((a) => {
              a.removeAttribute('aria-current');
              if (a.getAttribute('href') === `#${entry.target.id}`) a.setAttribute('aria-current', 'true');
            });
          }
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      sections.forEach((s) => sectionObserver.observe(s));
    }
  }

  /* 4. Product detail modal (products.html only — harmless no-op elsewhere) */
  const backdrop = document.getElementById('product-modal-backdrop');
  if (backdrop) {
    const closeBtn = document.getElementById('product-modal-close');
    const imgEl = document.getElementById('pm-img');
    const titleEl = document.getElementById('pm-title');
    const specEl = document.getElementById('pm-spec');
    const hsnEl = document.getElementById('pm-hsn');
    const inquireLink = document.getElementById('pm-inquire');
    let lastFocused = null;

    function openModal(card) {
      const img = card.querySelector('.card-img');
      const name = card.querySelector('.card-name');
      const sub = card.querySelector('.card-sub');
      const hsn = card.querySelector('.card-hsn');
      imgEl.src = img ? img.src : '';
      imgEl.alt = img ? img.alt : '';
      titleEl.textContent = name ? name.textContent : '';
      specEl.textContent = sub ? sub.textContent : '';
      hsnEl.textContent = hsn ? hsn.textContent : '';
      inquireLink.href = card.getAttribute('href');
      lastFocused = document.activeElement;
      backdrop.classList.add('open');
      closeBtn.focus();
    }
    function closeModal() {
      backdrop.classList.remove('open');
      if (lastFocused) lastFocused.focus();
    }
    document.querySelectorAll('a.product-card').forEach((card) => {
      card.addEventListener('click', (e) => { e.preventDefault(); openModal(card); });
    });
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('open')) closeModal();
    });
  }

  /* 5. Swap category placeholder images for specific product images (products.html) */
  document.querySelectorAll('.card-img[data-final-src]').forEach((img) => {
    const finalSrc = img.getAttribute('data-final-src');
    if (finalSrc) img.src = finalSrc;
  });
})();
