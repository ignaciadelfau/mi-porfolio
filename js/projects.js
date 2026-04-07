/* =====================================================
   PROJECTS.JS — Lógica de filtros en la galería
===================================================== */

/* ---- FILTRO POR CATEGORÍA ----
   Al hacer click en un botón .filter-btn:
   1. Se marca como activo (.is-active)
   2. Se muestran solo las tarjetas cuyo data-category
      coincida con el data-filter del botón
   3. Si el filtro es "all", se muestran todas
*/
(function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Quitar .is-active de todos los botones
      filterBtns.forEach(b => b.classList.remove('is-active'));
      // Marcar el botón clickeado
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });
})();
