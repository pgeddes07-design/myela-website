// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served from the domain root at myelayoghurt.co.za, hosted on Vercel.
export default defineConfig({
  site: 'https://myelayoghurt.co.za',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !/\/b\/?$/.test(page) })],
  build: { inlineStylesheets: 'auto' },
});
