# KuKa Kıyı Marina — Design System

Live site: https://kukakiyimarina.com  
Repo: golondon79-dot/kuka-kiyi  
Deploy branch: `gh-pages` — push with `git push -u origin restore-ghpages:gh-pages`

---

## Brand Identity

**Business:** Kuruçeşme Kahvesi Kıyı Marina — a seafront café/bar at Kıyı İstanbul Marina, Büyükçekmece, Istanbul. Fourth branch of KuKa brand. Open daily 09:00–02:00.

**Tone:** Premium but warm. Mediterranean, relaxed luxury. Not corporate. Think yacht club meets neighbourhood café.

**Keywords to target:** nargile büyükçekmece, kahvaltı büyükçekmece, kıyı marina, marina kafe istanbul, kuruçeşme kahvesi, ps5 oyun odası, kokteyl bar, büyükçekmece restoran

---

## Design Tokens

```css
:root {
  --bg:       #f5ede0;  /* warm cream — main background */
  --bg2:      #f0e8d5;  /* slightly deeper cream */
  --dark:     #1c1410;  /* deep brown-black — text, nav, dark sections */
  --terra:    #b85c38;  /* terracotta — CTAs, accents, labels */
  --terra-dk: #96482c;  /* terracotta hover state */
  --muted:    #7a6857;  /* warm brown-grey — secondary text */
  --border:   #ddd0bc;  /* soft border colour */
  --white:    #ffffff;
  --nav-h:    72px;
}
```

---

## Typography

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
```

- **Playfair Display** (serif) — headings (h1, h2, h3), pull quotes, brand story. Always `font-weight:400` unless bold needed.
- **Inter** (sans-serif) — body text, UI elements, labels, nav, buttons.
- **Noto Naskh Arabic** — loaded conditionally for AR mode via `@font-face` or Google Fonts when `dir="rtl"` is active.

### Type scale
| Class | Usage | Size |
|---|---|---|
| `.sec-h.xl` | Hero-level headings | `clamp(2.4rem, 9vw, 4.5rem)` |
| `.sec-h.lg` | Section headings | `clamp(1.75rem, 5.5vw, 3rem)` |
| `.hero-h1` | Hero headline | `clamp(2.8rem, 10vw, 5.5rem)` |
| `.sec-body` | Section body | `0.86rem`, line-height 1.82 |
| `.sec-label` | Section eyebrow | `0.56rem`, `letter-spacing: .22em`, uppercase |
| `.terra-link` | CTA links | `0.6rem`, `letter-spacing: .2em`, uppercase |

---

## Colour Usage Rules

- **Dark sections** (`background: #1c1410`): text flips to `--bg` or `--white`
- **Section labels** always use `--terra` with a 28px horizontal rule before them
- **Primary CTAs** (pill buttons): `--terra` background, white text, `border-radius: 40px`
- **Text CTAs**: dark text, 1.5px solid underline, uppercase spaced letters
- **Borders**: always `--border` (`#ddd0bc`), 1px solid

---

## Page Structure

Single HTML file (`index.html`). Sections in order:

1. `<head>` — meta, SEO, GA, fonts, all CSS inline in `<style>`
2. Fixed nav with logo, lang toggle (TR/EN/AR), reservation button, mobile burger
3. Hero — YouTube video background (autoplay, muted), headline, CTAs
4. Stats bar — 2008 founding, 4 branches, daily hours
5. Brand story quote (italic, Playfair)
6. Gallery strip — horizontal scroll, lazy-loaded background images
7. Experience section + photo gallery lightbox
8. Feature blocks (Kitchen, Shisha, Game Room, Happy Hour, Cocktails, Terrace)
9. Reviews (3 Google review cards)
10. Dark card — Match Nights section
11. Dark card — Special Occasions section
12. About section
13. Instagram section (mock card)
14. Visit/Contact section + map embed
15. Footer
16. Mobile sticky WhatsApp CTA bar
17. `<script>` — all JS inline at bottom

---

## Multilingual System (TR / EN / AR)

**Three languages:** Turkish (default), English, Arabic (RTL).

### HTML attributes
Every translatable element gets three data attributes:
```html
<element data-tr="Turkish text" data-en="English text" data-ar="النص العربي">Turkish text</element>
```

**Rule:** The inner HTML always defaults to the **Turkish** text. JS overwrites it on load.

### JS engine
```javascript
const LANGS = { tr: { dir: 'ltr' }, en: { dir: 'ltr' }, ar: { dir: 'rtl' } };

function applyLang(lang) {
  if (!LANGS[lang]) return;
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', LANGS[lang].dir);
  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    const v = el.getAttribute('data-' + lang);
    if (!v) return;
    el.innerHTML = v;
  });
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === lang)
  );
  localStorage.setItem('kuka-lang', lang);
}

const saved = localStorage.getItem('kuka-lang');
if (saved && LANGS[saved]) applyLang(saved); else applyLang('tr');
```

### Important rules
- When adding new text elements, **always** add all three `data-tr/en/ar` attributes
- If an element contains child elements (like SVG icons), wrap **only the text** in a `<span>` with the data attributes — don't put them on the parent or the SVG will be overwritten
- Arabic is RTL — `dir="rtl"` is set on `<html>`. Layout must hold up in both directions.
- `localStorage` key: `kuka-lang`

---

## SEO Setup

### Head tags (required on every page)
```html
<meta name="description" content="Büyükçekmece Kıyı İstanbul Marina'da premium nargile, zengin kahvaltı, dünya mutfağı, PS5 oyun odası ve kokteyller. Deniz kenarında sabahtan geceye açık.">
<meta name="keywords" content="nargile büyükçekmece, kahvaltı büyükçekmece, kıyı marina, marina kafe istanbul, kuruçeşme kahvesi, ps5 oyun odası, kokteyl bar, büyükçekmece restoran">
<title>KuKa Kıyı Marina — Nargile, Kahvaltı &amp; Bar | Büyükçekmece</title>
<link rel="canonical" href="https://kukakiyimarina.com">
```

- Title: 55–60 characters, include main keywords + location
- Meta description: 150–160 characters

### Open Graph
```html
<meta property="og:title" content="KuKa Kıyı Marina — Büyükçekmece">
<meta property="og:description" content="...">
<meta property="og:image" content="https://kukakiyimarina.com/images/photo-aerial-night.jpg">
<meta property="og:url" content="https://kukakiyimarina.com">
<meta property="og:type" content="website">
```

### Structured data
Restaurant schema at top of `<head>`. Key fields: name, address (Kıyı İstanbul Marina, Büyükçekmece), telephone (+90 538 504 4555), opening hours (09:00–02:00 daily), cuisine types, social links.

### Files
- `sitemap.xml` — single URL, `lastmod` date, `changefreq: weekly`
- `robots.txt` — `Allow: /`, references sitemap
- `CNAME` — `kukakiyimarina.com`

### Google Analytics
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-1R324XQ1CE"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-1R324XQ1CE');</script>
```

---

## Favicons

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="512x512" href="/favicon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/images/favicon-192.png">
<link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png">
```

- `favicon.ico` — 3 frames: 16×16, 32×32, 48×48
- `favicon.png` — 512×512 PNG (used by Google Search)
- `favicon-192.png` — 192×192 PNG (Android)
- `apple-touch-icon.png` — 180×180 PNG (iOS)
- All use the KuKa script logo on `--bg` (#f5ede0) background, tightly cropped

---

## Components

### Section label
```html
<span class="sec-label" data-tr="TÜRKÇE" data-en="ENGLISH" data-ar="عربي">TÜRKÇE</span>
```
Renders with a 28px terracotta rule before it.

### Pill button (primary CTA)
```html
<a href="..." class="pill-btn">
  <span data-tr="..." data-en="..." data-ar="...">Türkçe</span>
  <span>→</span>
</a>
```

### Terra link (secondary CTA)
```html
<a href="..." class="terra-link" data-tr="..." data-en="..." data-ar="...">TÜRKÇE</a>
```

### Feature block
Two-column on desktop (image + content), stacked on mobile. `.feat-block.alt` reverses order.

### QR code wrap (desktop only)
```html
<div class="qr-wrap">
  <img src="images/qr-menu-general.png" alt="..." width="80" height="80">
  <span class="qr-label" data-tr="..." data-en="..." data-ar="...">Türkçe</span>
</div>
```
Hidden on mobile via `display:none`, shown at `min-width:768px`.

### Dark card sections
```html
<div class="dark-card" style="background:#1c1410; color:#f5ede0;">
```

---

## Images

### Compression
Use Python Pillow before adding any new images:
```python
from PIL import Image
img = Image.open('input.jpg')
img.save('output.jpg', 'JPEG', quality=72, optimize=True)
# For hero/large: quality=65
# For thumbnails: quality=78
```

### Alt text rule
Always descriptive + location keyword:
```html
alt="KuKa Kıyı Marina [description] — Büyükçekmece"
```

### Gallery images
Loaded as CSS `background-image` — no alt text possible. Use `role="img"` + `aria-label` if accessibility is needed.

---

## Hero Video

YouTube IFrame API. Three video IDs:
```javascript
var ids = ['-tiof3jxqmo', 'nVBcoTWJ6AU', 'FNCCN7xLrVI'];
var active = [1, 2]; // plays videos at index 1 and 2 (both desktop and mobile)
```
- Autoplay, muted, no controls, loops through playlist
- Videos crossfade with `opacity` transition (1s)
- Gradient overlay fades video into `--bg` at the bottom

---

## Contact Details

- **WhatsApp:** +90 538 504 4555
- **WhatsApp reservation link:** `https://wa.me/905385044555?text=Merhaba%2C%20rezervasyon%20yapmak%20istiyorum.`
- **Instagram:** https://www.instagram.com/kurucesmekahvesi_kiyimarina/
- **Facebook:** https://www.facebook.com/share/18mf1hzqbB/
- **Address:** Kıyı İstanbul Marina, Büyükçekmece / İstanbul
- **Hours:** Her gün 09:00 — 02:00
- **Menu:** https://webmenu.pardonapp.co/en/kuka-kurucesme-kiyi-marina
- **Shisha menu:** https://webmenu.pardonapp.co/en/kuka-kurucesme-kiyi-marina/4213/menu/27

---

## Performance Rules

- No CSS frameworks (no Bootstrap, Tailwind etc.)
- No JS frameworks (no React, Vue etc.) — vanilla JS only
- All CSS in a single `<style>` block in `<head>`
- All JS in a single `<script>` block before `</body>`
- Images compressed before committing (see above)
- Lazy load non-critical images via `data-bg` + IntersectionObserver
- Google Fonts via `preconnect` + async load

---

## Deployment

```bash
# Push live
git push -u origin restore-ghpages:gh-pages

# Workflow: edit → commit on restore-ghpages → wait for approval → push to gh-pages
```

- GitHub Pages serves from `gh-pages` branch
- Custom domain via `CNAME` file containing `kukakiyimarina.com`
- DNS: 4 × A records (185.199.108–111.153) + CNAME www → golondon79-dot.github.io
- HTTPS via GitHub Pages / Let's Encrypt (CAA record: `0 issue "letsencrypt.org"`)

---

## File Structure

```
/
├── index.html          # entire site
├── favicon.ico         # 16/32/48px ICO
├── favicon.png         # 512px PNG for Google Search
├── CNAME               # kukakiyimarina.com
├── robots.txt
├── sitemap.xml
└── images/
    ├── logo-dark.png         # main logo (dark ink on transparent)
    ├── logo.png              # logo variant
    ├── logo-green.png        # green logo variant
    ├── favicon-192.png       # 192px PNG
    ├── apple-touch-icon.png  # 180px iOS icon
    ├── photo-*.jpg           # venue photos
    ├── gal-*.jpg             # gallery photos
    ├── insta-*.jpg           # Instagram section photos
    ├── cocktail-*.jpg        # cocktail photos
    ├── qr-menu-*.png         # QR codes
    └── logo-*.png/jpg        # sport league logos
```
