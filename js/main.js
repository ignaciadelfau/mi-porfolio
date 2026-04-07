/* =====================================================
   MAIN.JS — Interacciones globales del portafolio
   No necesitas ningún framework, esto es JS puro.
===================================================== */


/* ---- 1. MENÚ HAMBURGUESA (solo en móvil) ----
   Al hacer click en el botón burger:
   - Se agrega la clase .is-open al menú y al botón
   - El menú aparece con fade-in
   - El botón se convierte en una X
   - El body no puede scrollearse (overflow hidden)
*/
(function initBurger() {
  const burger = document.querySelector('.nav__burger');
  const links  = document.querySelector('.nav__links');

  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('is-open');
    links.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Cerrar el menú al hacer click en un link
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('is-open');
      links.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();


/* ---- 2. MARCAR EL LINK ACTIVO EN EL NAV ----
   Compara la URL actual con el href de cada link
   y agrega aria-current="page" al que coincida.
   Esto también activa el subrayado en CSS.
*/
(function markActiveLink() {
  const links = document.querySelectorAll('.nav__link');
  const current = window.location.pathname;

  links.forEach(link => {
    // Normaliza el pathname del link para comparar
    const href = new URL(link.href).pathname;
    if (current.endsWith(href) || current === href) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();


/* ---- 3. ANIMACIÓN DE ENTRADA CON SCROLL ----
   Usa IntersectionObserver para detectar cuando
   un elemento entra en la pantalla y le agrega
   la clase .is-visible, que dispara su animación CSS.

   CÓMO USARLO: agrega class="reveal" a cualquier
   elemento que quieras que aparezca con fade al hacer scroll.
   Ejemplo: <section class="reveal">...</section>
*/
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Solo se anima una vez
        }
      });
    },
    { threshold: 0.15 }  // Se activa cuando el 15% del elemento es visible
  );

  revealEls.forEach(el => observer.observe(el));
})();


/* ---- 4. CURSOR PERSONALIZADO (opcional) ----
   Agrega un punto azul que sigue al cursor.
   Si no lo quieres, borra esta función y el
   elemento #cursor del HTML (si lo añadiste).
   Por ahora está comentado para que lo actives
   si quieres ese efecto extra.
*/
/*
(function initCursor() {
  const cursor = document.createElement('div');
  cursor.id = 'cursor';
  cursor.style.cssText = `
    position: fixed; width: 10px; height: 10px;
    border-radius: 50%; background: #1a1aff;
    pointer-events: none; z-index: 9999;
    transition: transform 0.15s ease, opacity 0.2s;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX - 5 + 'px';
    cursor.style.top  = e.clientY - 5 + 'px';
  });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(3)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
    });
  });
})();
*/
