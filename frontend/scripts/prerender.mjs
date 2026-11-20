/**
 * Pré-rendu statique après `vite build` :
 *  - dist/<route>/index.html avec le contenu, le title, la description,
 *    la canonical, l'Open Graph et les données structurées de chaque page ;
 *  - dist/404.html (servi par Netlify avec un vrai code 404) ;
 *  - dist/sitemap.xml et dist/robots.txt.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const SITE_URL = 'https://dettefrancaise.fr';

const { render, routes } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<div id="root"></div>')) {
  throw new Error('index.html : marqueurs <!--app-head--> ou <div id="root"></div> introuvables');
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function headTags(h) {
  const ld = h.jsonLd ? [].concat(h.jsonLd) : [];
  return [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    `<meta name="robots" content="${esc(h.robots)}" />`,
    h.robots.startsWith('noindex') ? '' : `<link rel="canonical" href="${esc(h.url)}" />`,
    `<meta property="og:type" content="${esc(h.type)}" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:url" content="${esc(h.url)}" />`,
    `<meta property="og:image" content="${esc(h.image)}" />`,
    `<meta name="twitter:title" content="${esc(h.title)}" />`,
    `<meta name="twitter:description" content="${esc(h.description)}" />`,
    `<meta name="twitter:image" content="${esc(h.image)}" />`,
    ...ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`),
  ].filter(Boolean).join('\n    ');
}

function page(url) {
  const { html, head } = render(url);
  if (!head.title || !head.description) throw new Error(`Title ou description manquant pour ${url}`);
  return {
    head,
    out: template.replace('<!--app-head-->', headTags(head)).replace('<div id="root"></div>', `<div id="root">${html}</div>`),
  };
}

for (const r of routes) {
  const { out, head } = page(r.path);
  if (head.url !== `${SITE_URL}${r.path}`) throw new Error(`Canonical incohérente pour ${r.path} : ${head.url}`);
  const file = r.path === '/' ? path.join(dist, 'index.html') : path.join(dist, `${r.path}.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, out);
}
fs.writeFileSync(path.join(dist, '404.html'), page('/__page-introuvable__').out);

const today = new Date().toISOString().slice(0, 10);
const urls = routes.map((r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${r.lastmod || today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n');
fs.writeFileSync(path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`✓ Pré-rendu : ${routes.length} pages + 404.html + sitemap.xml + robots.txt`);
