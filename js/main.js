/* ============================================================
   main.js — Portfolio V3
   Solar system carousel + all interactions
   ============================================================ */

/* ---- PROJECTS DATA — edit this to add/change projects ---- */
const PROJECTS = [
  {
    id: 1,
    title: 'Openbank',
    tags: 'UX Design · Fintech',
    dest: 'project.html',
    locked: false,
    img: 'assets/images/project-1.jpg',
  },
  {
    id: 2,
    title: 'Project Name',
    tags: 'Brand Identity · Motion',
    dest: 'project.html',
    locked: true,
    img: 'assets/images/project-2.jpg',
  },
  {
    id: 3,
    title: 'Project Name',
    tags: 'Visual Identity · Web',
    dest: 'project.html',
    locked: false,
    img: 'assets/images/project-3.jpg',
  },
  {
    id: 4,
    title: 'Project Name',
    tags: 'UX Research · UI',
    dest: 'project.html',
    locked: true,
    img: 'assets/images/project-4.jpg',
  },
  {
    id: 5,
    title: 'Project Name',
    tags: 'Product Design',
    dest: 'project.html',
    locked: false,
    img: 'assets/images/project-5.jpg',
  },
];

/* ---- Passwords: key = dest filename ---- */
const PASSWORDS = {
  'project.html': 'demo123',
};

/* ============================================================
   SOLAR CAROUSEL
   ============================================================ */
class SolarCarousel {
  constructor() {
    this.track        = document.getElementById('solar-track');
    this.titleEl      = document.getElementById('carousel-title');
    this.prevBtn      = document.getElementById('carousel-prev');
    this.nextBtn      = document.getElementById('carousel-next');
    this.a11yList     = document.getElementById('projects-a11y-list');

    this.total        = PROJECTS.length;
    this.current      = 0;
    this.isAnimating  = false;

    if (!this.track) return;

    this.buildCards();
    this.buildA11yList();
    this.render(true);
    this.bindEvents();
  }

  buildCards() {
    PROJECTS.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'solar-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '-1');
      card.dataset.index = i;

      card.innerHTML = `
        <div class="solar-card-inner">
          <img src="${p.img}" alt="${p.title}" loading="lazy"
               onerror="this.parentElement.style.background='#e0e0e0';this.style.display='none'" />
          ${p.locked ? `
          <div class="card-lock-overlay">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/>
              <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
            </svg>
            <span>Password Protected</span>
          </div>` : ''}
          <div class="card-label">
            <div class="card-label-tags">${p.tags}</div>
            <div class="card-label-title">${p.title}</div>
          </div>
        </div>
      `;

      // Click: only active card navigates/opens modal
      card.addEventListener('click', () => this.onCardClick(i));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.onCardClick(i); }
      });

      this.track.appendChild(card);
    });

    this.cards = Array.from(this.track.querySelectorAll('.solar-card'));
  }

  buildA11yList() {
    if (!this.a11yList) return;
    PROJECTS.forEach(p => {
      const a = document.createElement('a');
      a.href = p.dest;
      a.textContent = `${p.title} — ${p.tags}`;
      this.a11yList.appendChild(a);
    });
  }

  /* Compute layout for N cards around a flattened ellipse (solar system feel) */
  getCardState(relIndex) {
    // relIndex: 0 = active/center, ±1 = adjacent, ±2 = further, etc.
    const n      = this.total;
    // angle for this position in a circle, then project onto ellipse
    const angle  = (relIndex / n) * Math.PI * 2;

    // Ellipse radii (visual "orbit")
    const rx = 280;  // horizontal spread
    const ry = 40;   // vertical squash (perspective feel)

    const x  = Math.sin(angle) * rx;
    const y  = Math.cos(angle) * ry;

    // Depth: cos(angle) → 1 at center front, -1 at back
    const depth = Math.cos(angle); // 1 = front, -1 = back

    // Scale: front bigger, back smaller
    const scale  = 0.45 + 0.55 * ((depth + 1) / 2);

    // Opacity: back cards fade
    const opacity = 0.3 + 0.7 * ((depth + 1) / 2);

    // Z index: front on top
    const zIndex = Math.round(10 + depth * 10);

    // Blur: back cards slightly blurred
    const blur = Math.max(0, (1 - (depth + 1) / 2) * 3);

    return { x, y, scale, opacity, zIndex, blur, depth };
  }

  render(instant = false) {
    const n = this.total;
    this.cards.forEach((card, i) => {
      const relIndex = ((i - this.current) % n + n) % n;
      const wrapped  = relIndex > n / 2 ? relIndex - n : relIndex;
      const state    = this.getCardState(wrapped);

      const isActive = wrapped === 0;
      card.classList.toggle('is-active', isActive);
      card.setAttribute('tabindex', isActive ? '0' : '-1');
      card.setAttribute('aria-current', isActive ? 'true' : 'false');

      // Ensure cards always originate from the true center of .solar-track
      // left:50% top:50% anchors to center; translate(-50%,-50%) removes own size;
      // then orbital offset x/y moves outward; scale applied last.
      card.style.left = '50%';
      card.style.top  = '50%';

      const dur = instant ? 0 : 650;
      card.style.transition = instant
        ? 'none'
        : `transform ${dur}ms cubic-bezier(0.16,1,0.3,1),
           opacity   ${dur}ms ease,
           filter    ${dur}ms ease`;

      card.style.transform = `translate(calc(-50% + ${state.x}px), calc(-50% + ${state.y}px)) scale(${state.scale})`;
      card.style.opacity   = state.opacity;
      card.style.zIndex    = state.zIndex;
      card.style.filter    = state.blur > 0 ? `blur(${state.blur}px)` : '';
    });

    this.updateTitle();
  }

  updateTitle() {
    const p = PROJECTS[this.current];
    if (!this.titleEl) return;

    // Animate title change
    this.titleEl.classList.add('changing');
    setTimeout(() => {
      this.titleEl.textContent = p.title;
      this.titleEl.classList.remove('changing');
    }, 200);
  }

  advance(dir) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.current = ((this.current + dir) + this.total) % this.total;
    this.render();
    setTimeout(() => { this.isAnimating = false; }, 680);
  }

  onCardClick(i) {
    if (i !== this.current) {
      // Clicking a side card rotates to it
      const n = this.total;
      const fwd = ((i - this.current) + n) % n;
      const bwd = ((this.current - i) + n) % n;
      this.advance(fwd <= bwd ? fwd : -bwd);
      return;
    }
    // Active card: navigate or open modal
    const p = PROJECTS[i];
    if (p.locked) {
      openModal(p.dest, p.title);
    } else {
      navigateTo(p.dest);
    }
  }

  bindEvents() {
    this.prevBtn?.addEventListener('click', () => this.advance(-1));
    this.nextBtn?.addEventListener('click', () => this.advance(1));

    // Keyboard arrows
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') this.advance(1);
      if (e.key === 'ArrowLeft')  this.advance(-1);
    });

    // ── Touch swipe (mobile) ────────────────────────────────────
    let touchStartX = 0;
    let touchStartY = 0;
    this.track.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    this.track.addEventListener('touchend', e => {
      const dx = touchStartX - e.changedTouches[0].clientX;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 36) {
        this.advance(dx > 0 ? 1 : -1);
      }
    });

    // ── Horizontal scroll / trackpad swipe (desktop) ─────────────
    // Accumulate deltaX; fire once a threshold is crossed, then
    // cooldown so one flick = one step.
    let wheelAccum = 0;
    let wheelCooldown = false;

    const onWheel = e => {
      // Only intercept if there's a meaningful horizontal component
      // (trackpad two-finger swipe gives deltaX; vertical scroll gives deltaY)
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) * 0.4) return;

      e.preventDefault();  // stop page scroll while swiping horizontally

      if (wheelCooldown) return;

      wheelAccum += e.deltaX;

      if (Math.abs(wheelAccum) > 60) {
        this.advance(wheelAccum > 0 ? 1 : -1);
        wheelAccum = 0;
        wheelCooldown = true;
        setTimeout(() => { wheelCooldown = false; }, 700);
      }
    };

    // Must be non-passive to call preventDefault
    const section = this.track.closest('.work-section') || this.track;
    section.addEventListener('wheel', onWheel, { passive: false });
  }
}

/* ============================================================
   NAV
   ============================================================ */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20), { passive: true });
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.mobile-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.setAttribute('aria-hidden', String(open));
    menu.classList.toggle('open', !open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    menu.classList.remove('open');
  }));
}

/* ============================================================
   PASSWORD MODAL
   ============================================================ */
let pendingDest = '';

function openModal(dest, title) {
  const modal     = document.getElementById('password-modal');
  const nameEl    = document.getElementById('modal-project-name');
  const errorEl   = document.getElementById('modal-error');
  const input     = document.getElementById('modal-password');
  if (!modal) return;

  pendingDest         = dest;
  nameEl.textContent  = title;
  errorEl.textContent = '';
  input.value         = '';
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => input.focus(), 100);
}

function closeModal() {
  const modal = document.getElementById('password-modal');
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  modal.classList.remove('open');
  document.body.style.overflow = '';
  pendingDest = '';
}

function checkPassword() {
  const input   = document.getElementById('modal-password');
  const errorEl = document.getElementById('modal-error');
  const val     = input?.value.trim() ?? '';
  const correct = PASSWORDS[pendingDest] ?? '';

  if (val === correct) {
    closeModal();
    navigateTo(pendingDest);
  } else {
    errorEl.textContent = 'Incorrect password. Please try again.';
    input.value = '';
    input.focus();
    input.style.animation = 'none';
    requestAnimationFrame(() => {
      input.style.animation = 'shake 0.35s ease';
    });
  }
}

function initPasswordModal() {
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('modal-submit')?.addEventListener('click', checkPassword);
  document.getElementById('modal-password')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') checkPassword();
  });
  document.getElementById('password-modal')?.addEventListener('click', e => {
    if (e.target.id === 'password-modal') closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('password-modal')?.classList.contains('open')) closeModal();
  });
}

/* ============================================================
   PAGE TRANSITIONS
   ============================================================ */
let pageOverlay;

function initPageTransitions() {
  pageOverlay = document.createElement('div');
  Object.assign(pageOverlay.style, {
    position: 'fixed', inset: '0', zIndex: '9998',
    background: '#111',
    transformOrigin: 'top',
    transform: 'scaleY(1)',
    transition: 'none',
    pointerEvents: 'none',
  });
  document.body.appendChild(pageOverlay);

  requestAnimationFrame(() => requestAnimationFrame(() => {
    pageOverlay.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1)';
    pageOverlay.style.transform  = 'scaleY(0)';
  }));

  document.addEventListener('click', e => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
        href.startsWith('tel:') || href.startsWith('http') || link.target === '_blank') return;
    e.preventDefault();
    navigateTo(href);
  });
}

function navigateTo(href) {
  if (!pageOverlay) { window.location.href = href; return; }
  pageOverlay.style.transition  = 'transform 0.45s cubic-bezier(0.65,0,0.35,1)';
  pageOverlay.style.transformOrigin = 'bottom';
  pageOverlay.style.transform   = 'scaleY(1)';
  setTimeout(() => { window.location.href = href; }, 450);
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.about-headline, .about-intro-photo, .project-text-block, .g-img, .about-bio p, .skills-pills'
  );
  if (!targets.length) return;
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 55}ms`;
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(el => obs.observe(el));
}

/* ============================================================
   SHAKE KEYFRAME (injected)
   ============================================================ */
const shakeCSS = document.createElement('style');
shakeCSS.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-6px); }
    40%      { transform: translateX(6px); }
    60%      { transform: translateX(-4px); }
    80%      { transform: translateX(4px); }
  }
`;
document.head.appendChild(shakeCSS);

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initMobileMenu();
  new SolarCarousel();
  initPasswordModal();
  initPageTransitions();
  initScrollReveal();
});
