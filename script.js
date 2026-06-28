(function() {
  'use strict';

  // ── Mobile menu toggle ──────────────────────────────────────
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });

    // Close menu when any nav link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      });
    });

    // Close menu on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        menuToggle.focus();
      }
    });
  }

  // ── Lazy-load images (data-src pattern) ────────────────────
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
  }

  // ── Smooth scroll for in-page anchor links ──────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#main-content') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        // Only move focus if the element is focusable (e.g. has tabindex)
        if (target.hasAttribute('tabindex') || /^(a|button|input|select|textarea)$/i.test(target.tagName)) {
          target.focus({ preventScroll: true });
        }
      }
    });
  });

  // ── Contact form: pre-fill product select from URL query ────
  // Product cards on products.html link to contact.html?product=Soybean+Meal
  const productSelect = document.getElementById('product');
  if (productSelect) {
    const params = new URLSearchParams(window.location.search);
    const preselect = params.get('product');
    if (preselect) {
      const option = Array.from(productSelect.options).find(
        o => o.value.toLowerCase() === preselect.toLowerCase()
      );
      if (option) option.selected = true;
    }
  }

})();
