/* VP TRADELINK — main.js 2026
   Nav scroll state · Mobile menu · Product filter · Scroll reveal · Modal */
(function () {
  'use strict';

  /* ── Nav scroll state ─────────────────────────────────────── */
  const nav = document.querySelector('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile menu ──────────────────────────────────────────── */
  const menuBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('#nav-menu');
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      const open = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!open));
      navMenu.classList.toggle('active', !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });
    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
        menuBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        menuBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        menuBtn.focus();
      }
    });
  }

  /* ── Scroll reveal ────────────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const els = document.querySelectorAll(
      '.card, .product-card, .step, .fact-item, .pillar, .reveal'
    );
    els.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const siblings = Array.from(entry.target.parentElement?.children || []);
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), Math.min(idx * 60, 280));
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
  }

  /* ── Active nav on scroll (home) ──────────────────────────── */
  if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a');
    if (sections.length) {
      const sio = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            links.forEach((a) => {
              a.removeAttribute('aria-current');
              if (a.getAttribute('href') === `#${e.target.id}`) a.setAttribute('aria-current', 'true');
            });
          }
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      sections.forEach((s) => sio.observe(s));
    }
  }

  /* ── Product filter tabs ──────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card[data-category]');
  if (filterBtns.length && productCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-filter');
        productCards.forEach((card) => {
          const show = cat === 'all' || card.getAttribute('data-category') === cat;
          card.style.display = show ? '' : 'none';
          card.style.animation = show ? 'fadeIn 0.3s ease' : '';
        });
      });
    });
  }

  /* ── Product modal ────────────────────────────────────────── */
  const backdrop = document.getElementById('product-modal-backdrop');
  if (backdrop) {
    const closeBtn = document.getElementById('modal-close');
    const modalImg = document.getElementById('modal-img');
    const modalCat = document.getElementById('modal-cat');
    const modalTitle = document.getElementById('modal-title');
    const modalSub = document.getElementById('modal-sub');
    const modalSpecBody = document.getElementById('modal-spec-body');
    const modalApps = document.getElementById('modal-apps');
    const modalPkg = document.getElementById('modal-pkg');
    const modalInquire = document.getElementById('modal-inquire');
    let lastFocus = null;

    function openModal(card) {
      lastFocus = document.activeElement;
      const cat = card.querySelector('.product-card-cat')?.textContent || '';
      const name = card.querySelector('.product-card-name')?.textContent || '';
      const sub = card.querySelector('.product-card-sub')?.textContent || '';
      const img = card.querySelector('.product-card-img');
      const hsn = card.querySelector('.product-card-hsn')?.textContent || '';
      const specs = JSON.parse(card.getAttribute('data-specs') || '[]');
      const apps = JSON.parse(card.getAttribute('data-apps') || '[]');
      const pkg = JSON.parse(card.getAttribute('data-pkg') || '[]');

      if (img) { modalImg.src = img.src; modalImg.alt = img.alt; }
      modalCat.textContent = cat;
      modalTitle.textContent = name;
      modalSub.textContent = sub;
      modalInquire.href = `contact.html?product=${encodeURIComponent(name)}`;

      // Specs
      if (specs.length) {
        modalSpecBody.innerHTML = specs.map((s) => {
          const range = s.min !== null && s.max !== null
            ? `${s.min}–${s.max} ${s.unit}`
            : s.max !== null
              ? `Max ${s.max} ${s.unit}`
              : `Min ${s.min} ${s.unit}`;
          return `<tr><td>${s.parameter}</td><td>${range}</td></tr>`;
        }).join('');
        document.getElementById('modal-spec-section').style.display = '';
      } else {
        document.getElementById('modal-spec-section').style.display = 'none';
      }

      // Apps
      modalApps.innerHTML = apps.map((a) => `<span class="tag">${a}</span>`).join('');

      // Packaging
      modalPkg.innerHTML = pkg.map((p) => `<span class="pkg-item">${p}</span>`).join('');

      backdrop.classList.add('open');
      closeBtn.focus();
    }

    function closeModal() {
      backdrop.classList.remove('open');
      if (lastFocus) lastFocus.focus();
    }

    document.querySelectorAll('.product-card').forEach((card) => {
      card.addEventListener('click', (e) => { e.preventDefault(); openModal(card); });
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); } });
    });
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('open')) closeModal();
    });
  }

})();
