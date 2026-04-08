# Portfolio — María Ignacia Delfau
## Guía de uso, estructura de archivos y GitHub

---

## 📁 ESTRUCTURA DE CARPETAS

```
portfolio/
│
├── index.html          ← INICIO (hero + carrusel de proyectos)
├── about.html          ← ABOUT ME
├── project.html        ← PÁGINA DE PROYECTO (template reutilizable)
│
├── css/
│   └── style.css       ← TODOS los estilos del portfolio
│
├── js/
│   └── main.js         ← Carrusel, transiciones, microinteracciones
│
└── assets/
    ├── images/         ← TODAS tus imágenes van aquí
    │   ├── face.jpg            ← Tu foto para el hover en la "O"
    │   ├── about-portrait.jpg  ← Tu retrato en About
    │   ├── project-1.jpg       ← Thumbnail proyecto 1 (carrusel)
    │   ├── project-2.jpg       ← Thumbnail proyecto 2 (carrusel)
    │   ├── project-3.jpg       ← Thumbnail proyecto 3 (carrusel)
    │   ├── project-4.jpg       ← Thumbnail proyecto 4 (carrusel)
    │   ├── project-hero.jpg    ← Hero full-bleed de cada proyecto
    │   └── project-1-full.jpg  ← Imágenes de galería del proyecto
    │       project-1-detail-a.jpg
    │       project-1-detail-b.jpg
    │       (etc.)
    │
    └── resume.pdf      ← Tu CV (linkado en About)
```

---

## 🛠 QUÉ EDITAR EN CADA ARCHIVO

### `index.html` — Página de inicio
- Línea con `.hello-wrap`: El texto gigante "Hello" — no cambiar letras, sí cambiar fuente/color en CSS si quieres
- Cada `<a class="project-card">`: reemplaza título, tags, año y ruta de imagen por tus proyectos reales
- Para AGREGAR un proyecto: copia un bloque `<a class="project-card">` completo y pégalo; agrega también un `<span class="dot">` en `.carousel-dots`

### `project.html` — Página de proyecto (template)
- Duplica este archivo para cada proyecto: `proyecto-nombre.html`
- Cambia el `<img src>` del hero por la imagen del proyecto
- Edita `.eyebrow` (categoría), `<h1>` (nombre del proyecto)
- Rellena los 4 campos de metadata: Cliente, Rol, Año, Deliverables
- En `.project-gallery`: reemplaza los `<img src>` con las imágenes reales del proyecto
- Puedes agregar/quitar filas de galería: `single`, `half`, `thirds`, `featured`
- Actualiza el link "Next Project →" al siguiente proyecto

### `about.html` — About me
- Reemplaza el texto del `<p>` con tu bio real
- Edita la lista de skills en `<ul class="skills-list">`
- Cambia el link del CV en `assets/resume.pdf`
- Reemplaza la imagen de portrait

### `css/style.css` — Diseño visual
- Variables de color arriba del todo (`:root { }`) — cambia aquí para modificar la paleta
- `--font-display` y `--font-body` — cambia las Google Fonts si quieres otro tipografía

### `js/main.js`
- No necesitas tocarlo normalmente
- Si agregas proyectos, el número de dots debe coincidir con el número de cards

---

## 🖼 IMÁGENES — Guía rápida

| Imagen | Tamaño recomendado | Dónde se usa |
|--------|-------------------|--------------|
| `face.jpg` | 400×400px, cuadrada | Hover en la "O" de Hello |
| `about-portrait.jpg` | 800×1000px, vertical | Página About |
| `project-X.jpg` (thumbnails) | 1200×750px | Carrusel en inicio |
| `project-hero.jpg` | 1920×1080px | Hero full-bleed página proyecto |
| Galería proyectos | 1200–2400px de ancho | Galería interna del proyecto |

**Tip:** Usa .jpg para fotos y .png solo cuando necesitas transparencia. Comprime con squoosh.app antes de subir.

---

## 🐙 CÓMO SUBIR A GITHUB PAGES

### Primera vez (setup inicial):

1. Crea una cuenta en github.com si no tienes
2. Crea un repositorio nuevo:
   - Ve a github.com → botón verde "New"
   - Nombre del repo: `tu-username.github.io` (exactamente así)
   - Márcalo como Public
   - Click "Create repository"
3. Sube los archivos:
   - En el repo vacío, haz click en "uploading an existing file"
   - Arrastra TODA la carpeta `portfolio/` (o selecciona todos los archivos)
   - En la caja de texto escribe: `Initial commit`
   - Click "Commit changes"
4. Activa GitHub Pages:
   - Ve a Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` → folder: `/ (root)`
   - Save
5. En 2-3 minutos tu portfolio estará en: `https://tu-username.github.io`

---

## ✏️ CÓMO ACTUALIZAR EL PORTFOLIO (dos opciones)

### Opción A — Directamente en GitHub (más fácil, sin instalar nada):
1. Ve a tu repositorio en github.com
2. Haz click en el archivo que quieres editar (ej: `index.html`)
3. Haz click en el ícono de lápiz ✏️ (arriba a la derecha del contenido)
4. Edita el código directamente en el navegador
5. Abajo: escribe un mensaje descriptivo y haz "Commit changes"
6. En 1-2 minutos, los cambios se publican automáticamente

### Opción B — Desde tu computadora con GitHub Desktop (recomendada para cambios grandes):
1. Descarga GitHub Desktop: desktop.github.com
2. Clona tu repositorio (File → Clone Repository)
3. Edita los archivos en tu computadora con VS Code o cualquier editor
4. En GitHub Desktop verás los cambios resaltados
5. Escribe un mensaje y haz "Commit to main" → "Push origin"
6. Los cambios se publican en 1-2 minutos

### Para subir imágenes nuevas en GitHub.com:
1. Ve al repo → carpeta `assets/images/`
2. Click "Add file" → "Upload files"
3. Arrastra las imágenes nuevas → Commit

---

## 🔗 CÓMO AGREGAR UN PROYECTO NUEVO

1. **Duplica** `project.html` → renómbralo (ej: `proyecto-app-bancaria.html`)
2. **Edita** el nuevo archivo con el contenido del proyecto
3. **En `index.html`**, agrega una nueva `.project-card` con link al nuevo archivo
4. **Agrega** un `<span class="dot"></span>` en `.carousel-dots`
5. **Sube** las imágenes a `assets/images/`
6. Commit y push

---

## 💡 TIPS

- El portfolio usa Google Fonts cargadas desde internet — necesitas conexión para verlas en desarrollo local
- Para previsualizar en local: abre el archivo `index.html` directamente en Chrome (no necesitas servidor)
- Paleta de colores actual: fondo cálido `#F5F0EA`, tinta `#1A1815`, acento terracota `#C8471A`
- La animación del gradiente es 100% CSS, no consume recursos

---

© 2024 María Ignacia Delfau
