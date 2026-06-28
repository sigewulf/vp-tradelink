/* VP TRADELINK — script.js */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     1. Mobile navigation toggle
  ───────────────────────────────────────── */
  const menuBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('#nav-menu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('active');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
        menuBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        menuBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        menuBtn.focus();
      }
    });
  }

  /* ─────────────────────────────────────────
     2. Language switcher
  ───────────────────────────────────────── */
  const langSwitcher = document.querySelector('.lang-switcher');
  const langBtn      = document.querySelector('.lang-btn');
  const langLabel    = document.querySelector('.lang-label');
  const langItems    = document.querySelectorAll('.lang-dropdown [role="menuitem"]');

  const CODES = {
    'English':    'EN',
    'Arabic':     'AR',
    'Vietnamese': 'VI',
    'Indonesian': 'ID',
    'Chinese':    'ZH',
  };

  if (langBtn && langSwitcher) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = langSwitcher.classList.toggle('open');
      langBtn.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', () => {
      langSwitcher.classList.remove('open');
      if (langBtn) langBtn.setAttribute('aria-expanded', 'false');
    });

    langItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        langItems.forEach((i) => i.classList.remove('lang-active'));
        item.classList.add('lang-active');

        // Update button label
        const rawText = item.textContent.trim();
        // Strip flag emoji (first "word" before space)
        const langName = rawText.replace(/^\S+\s+/, '');
        if (langLabel) langLabel.textContent = CODES[langName] || 'EN';

        langSwitcher.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Keyboard navigation inside dropdown
    langItems.forEach((item, idx) => {
      item.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = langItems[idx + 1] || langItems[0];
          next.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = langItems[idx - 1] || langItems[langItems.length - 1];
          prev.focus();
        } else if (e.key === 'Escape') {
          langSwitcher.classList.remove('open');
          langBtn.setAttribute('aria-expanded', 'false');
          langBtn.focus();
        }
      });
    });
  }

  /* ─────────────────────────────────────────
     3. Scroll-reveal for cards & steps
  ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.category-card, .product-card, .step, .product-box'
  );

  if ('IntersectionObserver' in window && revealEls.length) {
    revealEls.forEach((el) => el.classList.add('reveal'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger siblings slightly
            const siblings = Array.from(
              entry.target.parentElement?.children || []
            );
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, Math.min(idx * 70, 300));
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => io.observe(el));
  }

  /* ─────────────────────────────────────────
     4. WhatsApp floating button (injected)
     Replace the number before going live.
  ───────────────────────────────────────── */
  const WA_NUMBER = '919000000000'; // ← replace with real number
  const WA_MSG    = encodeURIComponent(
    'Hi VP Tradelink, I am interested in sourcing. Please share details.'
  );

  const wa = document.createElement('a');
  wa.href        = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;
  wa.className   = 'wa-float';
  wa.target      = '_blank';
  wa.rel         = 'noopener noreferrer';
  wa.setAttribute('aria-label', 'Chat with us on WhatsApp');
  wa.innerHTML   = `
    <span class="wa-pulse" aria-hidden="true"></span>
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15
               -.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075
               -.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059
               -.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52
               .149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52
               -.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51
               -.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372
               -.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074
               .149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625
               .712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413
               .248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.852L0 24l6.335-1.51
               A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9
               c-1.87 0-3.607-.5-5.112-1.371l-.367-.217-3.764.898.939-3.664-.237-.377
               A9.838 9.838 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1
               c5.469 0 9.9 4.431 9.9 9.9 0 5.467-4.431 9.9-9.9 9.9z"/>
    </svg>`;

  document.body.appendChild(wa);

  /* ─────────────────────────────────────────
     5. Smooth active nav link on scroll (home page)
  ───────────────────────────────────────── */
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-links a');

    if (sections.length && navLinks.length) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              navLinks.forEach((a) => {
                a.removeAttribute('aria-current');
                if (a.getAttribute('href') === `#${entry.target.id}`) {
                  a.setAttribute('aria-current', 'true');
                }
              });
            }
          });
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      sections.forEach((s) => sectionObserver.observe(s));
    }
  }
})();
