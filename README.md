# VP TRADELINK — Project Structure Guide

## Where to add your real photos

### Product photos (replace placeholder icons)
Folder: `images/products/`
Currently filled with generated placeholder icons (colored shape + "PLACEHOLDER" label) so the site never shows a broken image.

To add a real photo for a product, save it using the **exact same filename** as the placeholder it replaces — the site will pick it up automatically, no code changes needed:

| Product | Replace this file |
|---|---|
| Soybean Meal | `images/products/soybean-meal.svg` → `soybean-meal.jpg` |
| Rapeseed Meal | `images/products/rapeseed-meal.svg` → `rapeseed-meal.jpg` |
| Quartz Lumps | `images/products/quartz-lumps.svg` → `quartz-lumps.jpg` |
| ...etc | (full list = the 24 files already in that folder) |

If you upload a `.jpg` instead of `.svg`, just open `products.html`, find the matching `data-final-src="images/products/xxx.svg"` and change the extension to `.jpg`. One line per product.

Recommended size: 800×600px, JPG, under 200KB.

### Hero / banner photo
Folder: `images/hero/`
`hero-port-loading.jpg` is your uploaded port-loading photo. It's already wired into the hero section on every page at reduced opacity, blended under the navy brand gradient. To swap it for a different photo, just overwrite this file with the same name (same crop ratio — portrait works best, the CSS crops it to fit).

### Logo
Folder: `images/logo/`
Already populated from your brand guide image — `icon.png` (transparent navbar mark), `logo-full-light-bg.png` (full lockup), `favicon-*.png` (browser tab icons). No action needed unless you want to swap in a different logo version.

---

## Folder structure

```
vp_tradelink/
├── css/
│   ├── variables.css     ← brand colors & fonts — edit ONE place to re-theme the whole site
│   ├── base.css          ← resets, typography, accessibility
│   ├── components.css    ← nav, buttons, cards, footer, forms (reused across pages)
│   └── pages.css         ← page-specific layout (hero, products grid, legal pages)
├── js/
│   ├── main.js           ← mobile menu, scroll animation, product modal
│   └── i18n.js           ← language-switching engine
├── lang/
│   ├── en.json           ← English (master file — defines every translatable key)
│   ├── ar.json            vi.json / id.json / zh.json — translations
├── images/
│   ├── logo/              ← logo + favicons
│   ├── hero/               ← hero background photo
│   └── products/         ← one image per product
├── *.html                ← 10 content pages + 5 legal pages
├── robots.txt / sitemap.xml / manifest.json / _headers
```

## Why this matters for you
Changing the brand color now means editing two lines in `css/variables.css` — not hunting through 15 HTML files. Adding a product photo means dropping a file into one folder. Adding a new language means copying `lang/en.json`, translating the values, and adding one line to `js/i18n.js`. Nothing requires touching multiple files for one change.

## Language switching
Fully functional — not cosmetic. Click the language button in the nav on any page; the whole page (nav, hero, footer, headings) updates live, Arabic switches the entire layout to right-to-left, and your choice is remembered across pages. Currently translated: navigation, footers, and hero sections on every page. Product card details and deep body copy remain English-only for now — extending coverage just means adding more `data-i18n="..."` tags to the HTML and matching keys to each `lang/*.json` file.
