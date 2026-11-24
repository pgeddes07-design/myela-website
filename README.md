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

Vercel, connected to this GitHub repo: every push to `main` deploys automatically. Live address: `https://myelayoghurt.co.za` (domain and DNS records are managed in the Vercel project under **Domains**).

The old GitHub Pages workflow (`.github/workflows/deploy.yml`) no longer runs on push; it can only be started by hand.

## Brand rules (short version)

Spell it **yoghurt** and **Myela**. Say **cups** (120g flat lid, 200g dome lid), never tubs or soft-serve. No yellow. No em dashes. Retail prices only (R30 and R45); bulk and tuckshop pricing stays on WhatsApp. The full rules live in the Myela design system.
