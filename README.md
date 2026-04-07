# 🎨 Portfolio — Ignacia · UX/UI Designer

## ¿Cómo subir esto a GitHub Pages?

### Paso 1 — Crea el repositorio en GitHub
1. Ve a [github.com/new](https://github.com/new)
2. Nómbralo exactamente así: `tu-usuario.github.io`
   (reemplaza `tu-usuario` por tu nombre de usuario de GitHub)
3. Márcalo como **Public**
4. Haz click en **Create repository**

### Paso 2 — Sube los archivos
**Opción A (sin instalar nada):**
1. En tu repositorio, haz click en **Add file → Upload files**
2. Arrastra toda la carpeta del portfolio
3. Haz click en **Commit changes**

**Opción B (con Git en terminal):**
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-usuario.github.io.git
git push -u origin main
```

### Paso 3 — Activa GitHub Pages
1. Ve a **Settings** de tu repositorio
2. En el menú lateral: **Pages**
3. En "Source" selecciona: `Deploy from a branch`
4. Branch: `main` / Folder: `/ (root)`
5. Haz click en **Save**
6. En ~2 minutos tu sitio estará en: `https://tu-usuario.github.io`

---

## 📁 Estructura de archivos

```
portfolio/
├── index.html              ← Página de inicio (hero + preview proyectos)
├── css/
│   ├── main.css            ← Estilos globales (nav, hero, footer)
│   ├── projects.css        ← Estilos de galería y páginas de proyectos
│   └── about.css           ← Estilos de la página About
├── js/
│   ├── main.js             ← Menú móvil, links activos, animaciones scroll
│   └── projects.js         ← Filtro de proyectos por categoría
├── pages/
│   ├── projects.html       ← Galería completa de proyectos
│   ├── about.html          ← Página About me
│   └── projects/
│       └── project-1.html  ← Plantilla para cada proyecto (duplícala)
└── assets/
    ├── images/
    │   ├── avatar.jpg       ← Tu foto (200x200px recomendado)
    │   └── projects/        ← Imágenes de cada proyecto
    ├── icons/
    │   └── favicon.ico
    └── docs/
        └── cv.pdf           ← Tu CV para descargar
```

---

## ✏️ Cómo personalizar el sitio

### Cambiar tu nombre e información
Busca en los archivos HTML el texto entre `<!--INSTRUCCIÓN:-->` — ahí están
todas las partes que debes editar.

Variables clave en `css/main.css`:
```css
--color-blue:   #1a1aff;  /* Azul de las letras → cámbialo por tu color */
--color-yellow: #ffe566;  /* Color del "sol" animado */
```

### Añadir un nuevo proyecto
1. **Duplica** `pages/projects/project-1.html` → renómbrala `project-4.html`
2. Edita el contenido dentro del nuevo archivo
3. **Añade una tarjeta** en `pages/projects.html` copiando el bloque `<article class="project-card">`
4. Sube la imagen del proyecto a `assets/images/projects/`

### Añadir más categorías al filtro
En `pages/projects.html`:
```html
<!-- Añade un botón de filtro -->
<button class="filter-btn" data-filter="motion">Motion</button>

<!-- Y en la tarjeta correspondiente, cambia el data-category -->
<article class="project-card" data-category="motion">
```

### Cambiar las fuentes
En el `<head>` de cada HTML, reemplaza el link de Google Fonts.
Luego actualiza en `css/main.css`:
```css
--font-display: 'Tu Fuente Display', sans-serif;
--font-body:    'Tu Fuente Body', sans-serif;
```

---

## 🎨 Microinteracciones incluidas

| Elemento | Efecto |
|---|---|
| Letras del "Hello." | Cambian de azul a negro y se elevan al hover |
| Foto en el hero | Se agranda y rota levemente al hover |
| Sol amarillo | Pulsa como un sol que respira (4s loop) |
| Tarjetas de proyecto | Se elevan con sombra al hover |
| Imagen en tarjeta | Zoom suave al hover |
| Links del nav | Línea azul deslizante debajo |
| Barras de skills | Se animan al entrar en pantalla |
| Elementos con `.reveal` | Fade-in al hacer scroll |

---

## ❓ Preguntas frecuentes

**¿Puedo usar esto sin saber código?**
Sí. Solo tienes que reemplazar los textos entre las etiquetas HTML
(los que están entre `<p>...</p>`, `<h1>...</h1>`, etc.) y cambiar
las imágenes en la carpeta `assets/images/`.

**¿Cómo veo los cambios antes de subir a GitHub?**
Abre `index.html` directamente en tu navegador haciendo doble click.
Para ver los cambios en tiempo real, instala la extensión
[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en VS Code.

**¿Puedo cambiar los colores?**
Sí, edita las variables al inicio de `css/main.css`.
Con cambiar `--color-blue` y `--color-yellow` ya transformas todo el sitio.
