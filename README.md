# Yuvraj Devasr — Photographer Portfolio

Cinematic luxury portfolio for a wedding & pre-wedding photographer.

**Live:** https://yuvrajdevasr.netlify.app

---

## For AI / Vibe Coder — How to Work With This Project

Read the sections below before making changes. The project is intentionally
structured so that an AI can make most updates by editing one or two files.

---

## Project Structure

```
/
├── index.html          # Homepage (hero, services, stats, slideshow)
├── gallery.html        # Gallery page (photo categories with layouts)
├── about.html          # About / contact page
├── contact.html        # Contact form page
├── assets/
│   ├── css/
│   │   └── style.css   # ALL styles (nav, hero, gallery, pages, lightbox, responsive)
│   └── js/
│       ├── main.js     # ALL JS (nav, scroll, gallery renderer, lightbox, slideshow)
│       └── gallery-data.js  # Image URLs & categories
└── README.md
```

---

## Quick Reference — What To Edit

| Goal | File(s) |
|---|---|
| Change gallery images | `assets/js/gallery-data.js` |
| Change gallery layout per category | `gallery.html` (data-layout attr) |
| Change section heading text | `assets/js/main.js` (render functions) |
| Add a new gallery category | `gallery-data.js` + `gallery.html` |
| Add a new page | New `.html` + add nav link in existing pages |
| Change colors / fonts | `assets/css/style.css` :root variables |
| Change hero video | `index.html` (video source) |
| Change slideshow images | `index.html` (slideshow slides) |
| Update services / stats | `index.html` (section HTML) |
| Update contact info | `contact.html` / `about.html` |
| Deploy | `git push` → auto-deploys on Netlify |

---

## Gallery System

### How Gallery Data Works

All image URLs live in `assets/js/gallery-data.js`:

```js
const galleryData = [
  {
    id: 'pre-wedding',       // matches data-category in HTML
    label: 'Pre-Wedding',    // displayed heading
    images: [
      'https://picsum.photos/seed/example1/800/800',  // external URL
      'filename.jpg',         // or local file in assets/images/gallery/pre-wedding/
    ]
  },
  // ...
];
```

### Layout Types

Set on `<section>` elements in `gallery.html` via `data-layout`:

| Layout | Images needed | Description |
|---|---|---|
| `feature-row` | 3 | 1 wide hero + 2 below |
| `grid-2x2` | 4 | 2×2 grid |
| `row-3` | 3 | 3 in a row (last spans full on mobile) |
| `split` | 3 | 2 side-by-side + 1 wide below |
| `grid-2x2-play` | 4 | 2×2 with play overlay icons |

### To replace images

Edit only `assets/js/gallery-data.js`. Change the URLs in the `images` array
for the category you want. The page will update automatically.

### To add a new category

1. Add an entry in `assets/js/gallery-data.js` with `id`, `label`, `images`.
2. Add a `<section>` in `gallery.html`:
   ```html
   <section class="gallery-section" data-category="your-id" data-layout="grid-2x2">
     <div class="gallery-section-inner"></div>
   </section>
   ```
3. (Optional) To change the heading subtitle, edit the render function in
   `assets/js/main.js` (the `<h2>` inside each layout renderer).

### Image aspect ratios

All gallery images render at **1:1 (square)**. Change the CSS aspect-ratio
properties if you need a different crop. Images are used as `<img>` with
`loading="lazy"` for performance.

---

## Adding a New Page

1. Copy an existing `.html` file (e.g. `contact.html`).
2. Update `<title>`, main content, and active nav link class.
3. Add a nav link in every existing page's `<nav>`:
   ```html
   <a href="newpage.html">New Page</a>
   ```
4. The JS auto-highlights the active link by comparing `href` to the URL.

---

## Design Tokens

All key values are CSS custom properties in `:root` in `style.css`:

```css
--color-bg: #0a0e1a;          /* dark background */
--color-surface: #0e1224;     /* card / section surface */
--color-accent: #d4a84b;      /* gold accent */
--color-text: #f0ece4;        /* main text */
--font-heading: 'Playfair Display', serif;
--font-body: 'Inter', sans-serif;
--max-width: 1280px;          /* content max width */
--gutter: 24px;
```

To change the whole look, edit these variables. Everything else inherits.

---

## Key CSS Sections (line numbers shift as edits happen)

Look for these anchor comments in `style.css`:

- `/* --- Custom Properties --- */`
- `/* --- Nav --- */`
- `/* --- Hero --- */`
- `/* --- GALLERY LAYOUTS --- */`
- `/* --- GALLERY RESPONSIVE --- */`
- `/* --- About Page --- */`
- `/* --- Lightbox --- */`
- `/* --- Slideshow --- */`
- `/* --- Services --- */`

---

## Key JS Sections

Look for numbered sections in `main.js`:

- `1. NAVBAR SCROLL EFFECT`
- `2. MOBILE MENU`
- `3. SCROLL REVEAL ANIMATIONS`
- `4. STAT COUNTER ANIMATION`
- `5. GALLERY — Clean Layout Rendering`
- `6. LIGHTBOX`
- `7. SLIDESHOW (Home)`
- `8. ACTIVE NAV LINK`

---

## Deployment

Push to the `main` branch of the GitHub repo. Netlify auto-deploys from
`https://github.com/Arunkumarmanickam/Yuvraj-Devasr-Photographer`.

No build step needed — this is pure HTML/CSS/JS.

---

## Tips for AI Coding

- **Understand the layout system** before editing gallery code. The JS
  renders HTML based on `data-layout` + `galleryData`. Don't hardcode
  gallery HTML inside the page files.
- **Don't duplicate styles.** Everything lives in one CSS file. Find the
  right section via the anchor comments above.
- **Don't duplicate JS.** One `main.js` handles everything. Add new
  features at the bottom in a new numbered section.
- **Test on mobile.** All gallery layouts collapse to 2-column on
  `max-width: 768px`. Keep responsive styles updated.
- **Images are lazy-loaded.** No need to optimize for initial page load
  beyond that.
- **Don't add dependencies.** No frameworks, no npm, no build tools. Keep
  it zero-config.
