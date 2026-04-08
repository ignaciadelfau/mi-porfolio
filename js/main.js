/* ============================================================
   main.js — Portfolio V2
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initMobileMenu();
  initPasswordModal();
  initScrollReveal();
  initPageTransition();
});


/* ============================================================
   NAV — scroll state
   ============================================================ */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
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

  // Close when a link is clicked
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      menu.classList.remove('open');
    });
  });
}


/* ============================================================
   PASSWORD MODAL
   ============================================================ */
// Set your passwords here. Key = data-project-dest value, Value = password
const PROJECT_PASSWORDS = {
  'project.html': 'demo123',   // ← change this per project
};
// For multiple projects, add more entries:
// 'project-brand.html': 'securepass',

function initPasswordModal() {
  const lockedCards = document.querySelectorAll('.project-card-locked');
  const modal       = document.getElementById('password-modal');
  const closeBtn    = document.getElementById('modal-close');
  const submitBtn   = document.getElementById('modal-submit');
  const input       = document.getElementById('modal-password');
  const errorEl     = document.getElementById('modal-error');
  const projectName = document.getElementById('modal-project-name');

  if (!modal || !lockedCards.length) return;

  let currentDest = '';

  function openModal(dest, title) {
    currentDest = dest;
    projectName.textContent = title;
    errorEl.textContent = '';
    input.value = '';
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
    // Trap focus
    setTimeout(() => input.focus(), 100);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('open');
    document.body.style.overflow = '';
    currentDest = '';
  }

  function checkPassword() {
    const val = input.value.trim();
    const correct = PROJECT_PASSWORDS[currentDest] || '';
    if (val === correct) {
      closeModal();
      // Page transition then navigate
      navigateTo(currentDest);
    } else {
      errorEl.textContent = 'Incorrect password. Try again.';
      input.value = '';
      input.focus();
      input.classList.add('shake');
      setTimeout(() => input.classList.remove('shake'), 400);
    }
  }

  lockedCards.forEach(card => {
    card.addEventListener('click', () => {
      openModal(card.dataset.projectDest, card.dataset.projectTitle);
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.dataset.projectDest, card.dataset.projectTitle);
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  submitBtn.addEventListener('click', checkPassword);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') checkPassword(); });

  // Click overlay to close
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  // ESC to close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

// Shake animation via JS (inject keyframes once)
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-6px); }
    40%      { transform: translateX(6px); }
    60%      { transform: translateX(-4px); }
    80%      { transform: translateX(4px); }
  }
  .shake { animation: shake 0.35s ease; }
`;
document.head.appendChild(shakeStyle);


/* ============================================================
   PAGE TRANSITIONS
   ============================================================ */
let overlay;

function initPageTransition() {
  overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position: 'fixed', inset: '0', zIndex: '9998',
    background: '#111111',
    transformOrigin: 'top',
    transform: 'scaleY(1)',
    transition: 'none',
    pointerEvents: 'none',
  });
  document.body.appendChild(overlay);

  // Animate in on load
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
      overlay.style.transformOrigin = 'top';
      overlay.style.transform = 'scaleY(0)';
    });
  });

  // Intercept internal links
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http') || link.target === '_blank') return;
    e.preventDefault();
    navigateTo(href);
  });
}

function navigateTo(href) {
  if (!overlay) { window.location.href = href; return; }
  overlay.style.transition = 'transform 0.45s cubic-bezier(0.65, 0, 0.35, 1)';
  overlay.style.transformOrigin = 'bottom';
  overlay.style.transform = 'scaleY(1)';
  setTimeout(() => { window.location.href = href; }, 450);
}


/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.project-card, .bio-strip-inner, .about-headline, .about-intro-photo, .project-text-block, .g-img'
  );

  if (!targets.length) return;

  // Add reveal class with stagger
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 60}ms`;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}
