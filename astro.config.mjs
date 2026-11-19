// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// While the site lives on GitHub Pages it's served from /myela-website.
// When a domain is connected: set `site` to the domain and remove `base`.
export default defineConfig({
  site: 'https://pgeddes07-design.github.io',
  base: '/myela-website',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !/\/(b|compare)\/?$/.test(page) })],
  build: { inlineStylesheets: 'auto' },
});
