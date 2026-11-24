# Myela Frozen Yoghurt website

The one-page site for Myela: flavours, cup sizes and prices, where to find Myela, stockist enquiries and WhatsApp ordering. Built with [Astro](https://astro.build) from the Myela design system. No database, no cookies, no tracking.

## Updating the site

Almost everything you'd want to change lives in **`src/data/site.ts`**:

| To change | Edit in `src/data/site.ts` |
| --- | --- |
| WhatsApp number | `WHATSAPP_NUMBER` (international digits, e.g. `27729688080`) |
| Prefilled WhatsApp messages | `MESSAGES.customer`, `MESSAGES.stockist` |
| Flavours (add, remove, reorder) | `FLAVOURS` |
| The three cups in the hero | `HERO_CUPS` |
| Prices and size copy | `SIZES` |
| Where to find Myela | `OUTLETS` |
| FAQ | `FAQS` |
| Page title, description, Instagram | `SITE` |

**Adding a flavour:** put a square photo in `src/assets/cups/` (same style as the others: 200g cup, dome lid, white background), import it at the top of `site.ts`, and add `{ name: 'Flavour Name', image: theImport }` to `FLAVOURS`.

**Adding the 120g cup photo:** save it as `src/assets/cups/cup-120g.webp`, add `import cup120 from '../assets/cups/cup-120g.webp';` at the top of `site.ts`, then uncomment the `image` line in the 120g entry of `SIZES`.

Push to `main` on GitHub and the live site updates by itself in about a minute.

## Running it on a computer

Needs Node.js 20 or newer.

```bash
npm install
npm run dev      # local preview at http://localhost:4321/
npm run build    # checks and builds the site into dist/
```

## Hosting

GitHub Pages, deployed by `.github/workflows/deploy.yml` on every push to `main`. One-time setup in the repo: **Settings → Pages → Source: GitHub Actions**.

Live address: `https://myelayoghurt.co.za` (the old `pgeddes07-design.github.io/myela-website/` link forwards there)

### Connecting a domain later

1. In `astro.config.mjs`, set `site` to the domain (e.g. `https://myela.co.za`) and delete the `base` line.
2. Update the `Sitemap:` line in `public/robots.txt`.
3. Add the domain under **Settings → Pages → Custom domain** and point the domain's DNS at GitHub Pages.

## Brand rules (short version)

Spell it **yoghurt** and **Myela**. Say **cups** (120g flat lid, 200g dome lid), never tubs or soft-serve. No yellow. No em dashes. Retail prices only (R25 and R45); bulk and tuckshop pricing stays on WhatsApp. The full rules live in the Myela design system.
