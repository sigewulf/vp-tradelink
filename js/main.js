/* VP TRADELINK — main.js 2026
   Nav scroll state · Mobile menu · Product filter · Scroll reveal · Modal */
(function () {
  'use strict';

  /* ── Build FormSubmit action from split data attributes ──────
     Keeps the destination email out of page source as a literal
     string, closing the trivial regex-scraper harvesting path.
     Runs immediately — well before a real visitor could finish
     filling out and submitting a multi-field form. */
  document.querySelectorAll('form[data-fs-user][data-fs-domain]').forEach(form => {
    const user = form.getAttribute('data-fs-user');
    const domain = form.getAttribute('data-fs-domain');
    form.action = `https://formsubmit.co/${user}@${domain}`;
  });

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
  const filterAnnounce = document.getElementById('filter-announce');
  if (filterBtns.length && productCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        const cat = btn.getAttribute('data-filter');
        let shownCount = 0;
        productCards.forEach((card) => {
          const show = cat === 'all' || card.getAttribute('data-category') === cat;
          card.style.display = show ? '' : 'none';
          card.style.animation = show ? 'fadeIn 0.3s ease' : '';
          if (show) shownCount++;
        });
        if (filterAnnounce) {
          filterAnnounce.textContent = `Showing ${shownCount} product${shownCount === 1 ? '' : 's'}`;
        }
      });
    });
  }

  /* ── Prevent double-submit on POST forms (e.g. contact form) ─ */
  document.querySelectorAll('form[method="POST"], form[method="post"]').forEach((form) => {
    form.addEventListener('submit', () => {
      const btn = form.querySelector('button[type="submit"]');
      if (!btn || btn.disabled) return;
      btn.disabled = true;
      btn.dataset.originalText = btn.textContent;
      btn.textContent = 'Sending…';
    });
  });

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
        let lastFocus = null;

    /* Focus trap: keep Tab/Shift+Tab cycling inside the modal while open */
    function trapFocus(e) {
      if (e.key !== 'Tab') return;
      const focusable = backdrop.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const list = Array.from(focusable).filter((el) => el.offsetParent !== null);
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function openModal(card) {
      lastFocus = document.activeElement;
      const cat = card.querySelector('.product-card-cat')?.textContent || '';
      const name = card.querySelector('.product-card-name')?.textContent || '';
      const sub = card.querySelector('.product-card-sub')?.textContent || '';
      const img = card.querySelector('.product-card-img img');
      const hsn = card.querySelector('.product-card-hsn')?.textContent || '';
      const specs = JSON.parse(card.getAttribute('data-specs') || '[]');
      const apps = JSON.parse(card.getAttribute('data-apps') || '[]');
      const pkg = JSON.parse(card.getAttribute('data-pkg') || '[]');

      if (img) { modalImg.src = img.src; modalImg.alt = img.alt; }
      modalCat.textContent = cat;
      modalTitle.textContent = name;
      modalSub.textContent = sub;

      // Specs
      if (specs.length) {
        modalSpecBody.textContent = '';
        specs.forEach((s) => {
          const range = s.min !== null && s.max !== null
            ? `${s.min}\u2013${s.max} ${s.unit}`
            : s.max !== null
              ? `Max ${s.max} ${s.unit}`
              : `Min ${s.min} ${s.unit}`;
          const tr = document.createElement('tr');
          const tdParam = document.createElement('td');
          tdParam.textContent = s.parameter;
          const tdRange = document.createElement('td');
          tdRange.textContent = range;
          tr.append(tdParam, tdRange);
          modalSpecBody.appendChild(tr);
        });
        document.getElementById('modal-spec-section').style.display = '';
      } else {
        document.getElementById('modal-spec-section').style.display = 'none';
      }

      // Apps
      modalApps.textContent = '';
      apps.forEach((a) => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = a;
        modalApps.appendChild(span);
      });

      // Packaging
      modalPkg.textContent = '';
      pkg.forEach((p) => {
        const span = document.createElement('span');
        span.className = 'pkg-item';
        span.textContent = p;
        modalPkg.appendChild(span);
      });

      backdrop.classList.add('open');
      closeBtn.focus();
    }

    function closeModal() {
      backdrop.classList.remove('open');
      if (lastFocus) lastFocus.focus();
      // Reset inline form state
      const iqForm = document.getElementById('modal-inquiry-form');
      const ftDefault = document.getElementById('modal-footer-default');
      if (iqForm) iqForm.style.display = 'none';
      if (ftDefault) ftDefault.style.display = 'flex';
      const quickForm = document.getElementById('modal-quick-form');
      if (quickForm) quickForm.reset();
    }

    document.querySelectorAll('.product-card').forEach((card) => {
      card.addEventListener('click', (e) => { e.preventDefault(); openModal(card); });
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); } });
    });
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close button 2 (in footer)
    const closeBtn2 = document.getElementById('modal-close-2');
    if (closeBtn2) closeBtn2.addEventListener('click', closeModal);

    // Inquire button — shows inline form, no page navigation
    const inquireBtn = document.getElementById('modal-inquire-btn');
    const inquiryForm = document.getElementById('modal-inquiry-form');
    const footerDefault = document.getElementById('modal-footer-default');
    const formProductName = document.getElementById('modal-form-product-name');
    const formProductField = document.getElementById('modal-form-product-field');
    const formSubject = document.getElementById('modal-form-subject');
    const formCancelBtn = document.getElementById('modal-form-cancel');

    if (inquireBtn && inquiryForm) {
      inquireBtn.addEventListener('click', () => {
        const productName = document.getElementById('modal-title')?.textContent || '';
        if (formProductName) formProductName.textContent = productName;
        if (formProductField) formProductField.value = productName;
        if (formSubject) formSubject.value = `Product Inquiry — ${productName}`;
        footerDefault.style.display = 'none';
        inquiryForm.style.display = 'block';
        document.getElementById('mf-name')?.focus();
      });
    }

    if (formCancelBtn) {
      formCancelBtn.addEventListener('click', () => {
        inquiryForm.style.display = 'none';
        footerDefault.style.display = 'flex';
      });
    }

    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
    document.addEventListener('keydown', (e) => {
      if (!backdrop.classList.contains('open')) return;
      if (e.key === 'Escape') closeModal();
      else trapFocus(e);
    });
  }

})();
