/* ============================================
   main.js — Portfolio interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- CAROUSEL ----
  initCarousel();

  // ---- DRAG-TO-SCROLL on track ----
  initDragScroll();

  // ---- PAGE TRANSITION ----
  initPageTransitions();

});


/* ============================================
   CAROUSEL
   ============================================ */
function initCarousel() {
  const track    = document.querySelector('.projects-track');
  const dots     = document.querySelectorAll('.dot');
  const prevBtn  = document.querySelector('.prev-btn');
  const nextBtn  = document.querySelector('.next-btn');
  if (!track) return;

  const cards    = track.querySelectorAll('.project-card');
  let current    = 0;
  const total    = cards.length;

  function getCardWidth() {
    const card = cards[0];
    if (!card) return 0;
    return card.offsetWidth + 24; // gap = 24px
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, total - 1));
    const offset = getCardWidth() * current;
    track.style.transform = `translateX(-${offset}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Keyboard nav
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft')  goTo(current - 1);
  });

  // Touch swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
    }
  });

  // Resize
  window.addEventListener('resize', () => goTo(current));
}


/* ============================================
   DRAG TO SCROLL (desktop)
   ============================================ */
function initDragScroll() {
  const wrap = document.querySelector('.projects-track-wrap');
  const track = document.querySelector('.projects-track');
  if (!wrap || !track) return;

  let isDown = false;
  let startX, scrollLeft;

  wrap.addEventListener('mousedown', (e) => {
    isDown = true;
    wrap.classList.add('is-dragging');
    startX = e.pageX - wrap.offsetLeft;
    scrollLeft = wrap.scrollLeft;
  });

  wrap.addEventListener('mouseleave', () => {
    isDown = false;
    wrap.classList.remove('is-dragging');
  });

  wrap.addEventListener('mouseup', () => {
    isDown = false;
    wrap.classList.remove('is-dragging');
  });

  wrap.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrap.offsetLeft;
    const walk = (x - startX) * 1.5;
    wrap.scrollLeft = scrollLeft - walk;
  });
}


/* ============================================
   PAGE TRANSITIONS
   ============================================ */
function initPageTransitions() {
  // Add transition element
  const overlay = document.createElement('div');
  overlay.classList.add('page-transition');
  document.body.appendChild(overlay);

  // Intercept internal links
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('http') ||
      href.startsWith('tel:')
    ) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.style.transition = 'transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)';
      overlay.style.transformOrigin = 'bottom';
      overlay.style.transform = 'scaleY(1)';

      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });

  // Animate out on load
  overlay.style.transformOrigin = 'top';
  overlay.style.transform = 'scaleY(1)';
  overlay.style.transition = 'none';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      overlay.style.transform = 'scaleY(0)';
    });
  });
}


/* ============================================
   SCROLL REVEAL (lightweight)
   ============================================ */
const revealElements = document.querySelectorAll('.project-card, .about-headline, .about-photo');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(32px)';
  el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
  revealObserver.observe(el);
});
