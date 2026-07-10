# VP TRADELINK — Master Website 2026

**Single source of truth.** This is the only folder you ever push to GitHub.
Do not maintain parallel versions. Push here → Cloudflare deploys automatically.

## Folder Structure

```
/
├── index.html          ← Homepage
├── products.html       ← Product catalogue with modal + filter tabs
├── about.html          ← About page
├── how-we-work.html    ← Process page
├── contact.html        ← Contact form (FormSubmit)
├── markets.html        ← Markets overview
├── market-vietnam.html ← Vietnam market page
├── market-indonesia.html
├── market-china.html
├── thank-you.html      ← Form submission confirmation
├── privacy-policy.html
├── terms.html
├── disclaimer.html
├── export-terms.html
├── cookie-policy.html
├── robots.txt
├── sitemap.xml
├── manifest.json
├── _headers            ← Cloudflare security headers
│
├── css/
│   ├── variables.css   ← ALL brand tokens (colors, spacing, fonts) — edit here first
│   ├── base.css        ← Reset, typography, containers, scroll reveal
│   ├── components.css  ← Nav, footer, cards, buttons, modal, grid
│   └── pages.css       ← Hero, contact form, steps, facts band, CTA band
│
├── js/
│   ├── main.js         ← Nav scroll, mobile menu, filter tabs, scroll reveal, modal, form double-submit guard
│   └── i18n.js         ← 5-language switcher (EN/AR/VI/ID/ZH)
│
├── lang/
│   ├── en.json         ← English strings
│   ├── ar.json         ← Arabic (RTL auto-applied)
│   ├── vi.json         ← Vietnamese
│   ├── id.json         ← Indonesian
│   └── zh.json         ← Chinese
│
└── images/
    ├── logo/           ← favicon-16/32/192/512.png, icon.png, logo files
    ├── hero/           ← hero-port-loading.jpg (replace with real port photo)
    ├── products/       ← ONE .jpg per product, named exactly as referenced in HTML
    └── og-image.jpg    ← 1200×630 social preview image

```

## Replacing Product Images (GitHub UI — no code needed)

1. Go to your GitHub repo → `images/products/`
2. Click the file you want to replace (e.g. `rapeseed-meal.jpg`)
3. Click the pencil icon → "Upload files"
4. Upload your new photo **with the EXACT same filename**
5. Commit — Cloudflare redeploys in ~60 seconds

**Current product image filenames (15 total, one per SKU):**
- `rapeseed-meal.jpg`
- `soybean-meal.jpg`
- `dorb.jpg`
- `quartz-lumps.jpg`
- `quartz-grits.jpg`
- `quartz-powder.jpg`
- `potash-feldspar.jpg`
- `soda-feldspar.jpg`
- `feldspar-powder.jpg`
- `natural-sesame-seeds.jpg`
- `hulled-sesame-seeds.jpg`
- `cumin-seeds.jpg`
- `coriander-seeds.jpg`
- `psyllium.jpg`
- `moringa-powder.jpg`

**Important — WebP variants:** each product image also has `-450.webp` and `-900.webp` versions in the same folder (e.g. `rapeseed-meal-450.webp`, `rapeseed-meal-900.webp`) used for faster mobile/desktop loading via `<picture>`. If you replace a product photo, you must regenerate these two WebP files too, or the site will keep silently serving the *old* photo — browsers prefer the WebP source over the JPG fallback, so swapping only the `.jpg` has no visible effect. Any image tool that exports WebP works; keep the same 450px/900px widths.

## Design Tokens (brand colors etc.)

All colors, spacing, fonts are in `css/variables.css`.
To change the brand color, edit ONE line there. Every page updates.

## Adding a New Product

There is no separate data file — products are hardcoded directly in `products.html`.

1. Open `products.html` and find an existing `<article class="product-card" data-category="...">` block for a similar product.
2. Copy that whole block, paste it where the new product should sit.
3. Update the visible text (name, subtitle, HSN code) and the three JSON attributes on the card:
   - `data-specs` — array of `{parameter, min, max, unit}` shown in the modal's spec table
   - `data-apps` — array of application tag strings
   - `data-pkg` — array of packaging option strings
4. Add a matching product photo to `images/products/` and point the card's `<img src>` at it.
5. If the product should be filterable, make sure `data-category` matches one of the existing `.filter-btn` values in the same page.

`js/main.js` reads these attributes at click-time to populate the product modal — no rebuild step needed.

## Error Monitoring (Sentry) — Active

Sentry error monitoring is live on all 19 pages via the Loader Script in `<head>` (project: vptradelink, Browser JavaScript, Error Monitoring only — Logs/Tracing/Replay/Metrics intentionally left off to stay on the free plan). View errors at vptradelink.sentry.io.

## Cloudflare Pages Settings

- Build command: (leave blank — static site, no build step)
- Build output directory: `/` (root)
- Branch: `main`

No other settings needed. Push to GitHub main branch = live in 60 seconds.

## Updating CSS or JS — Cache-Busting (Important)

`css/*.css` and `js/*.js` are served with a 1-year immutable browser cache for performance. This means visitors' browsers will **not** re-fetch these files after any update unless the URL changes.

Every `<link>`/`<script>` tag referencing these files has a version query string: `css/base.css?v=2026`. **After editing any CSS or JS file, bump this version string** (e.g. `?v=2026` → `?v=2027a`) across all 19 HTML pages, or your changes won't reach visitors who've already loaded the site. A simple find-and-replace across all `.html` files for the old version string works.
