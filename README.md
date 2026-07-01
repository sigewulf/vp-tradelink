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
│   ├── main.js         ← Nav scroll, mobile menu, filter tabs, scroll reveal, modal
│   ├── i18n.js         ← 5-language switcher (EN/AR/VI/ID/ZH)
│   └── products-data.js ← Product specs database (add products here)
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

**Current product image filenames:**
- `rapeseed-meal.jpg`
- `soybean-meal.jpg`
- `dorb.jpg`
- `quartz.jpg` (used for all quartz variants)
- `feldspar.jpg` (used for all feldspar variants)
- `sesame-seeds.jpg`
- `cumin-seeds.jpg`
- `psyllium.jpg`
- `coriander-seeds.jpg`
- `moringa-powder.jpg`
- `turmeric.jpg`
- `bentonite.jpg`

## Design Tokens (brand colors etc.)

All colors, spacing, fonts are in `css/variables.css`.
To change the brand color, edit ONE line there. Every page updates.

## Adding a New Product

Open `js/products-data.js` — copy any existing product object, change the fields.
The products page renders from this data automatically.

## Cloudflare Pages Settings

- Build command: (leave blank — static site, no build step)
- Build output directory: `/` (root)
- Branch: `main`

No other settings needed. Push to GitHub main branch = live in 60 seconds.
