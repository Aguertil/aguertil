/** Point d'entrée du pré-rendu (build uniquement, voir scripts/prerender.mjs). */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { articlesPublies } from './data/articles';

export const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/presidents', priority: '0.9', changefreq: 'monthly' },
  { path: '/promises', priority: '0.7', changefreq: 'monthly' },
  { path: '/political-links', priority: '0.6', changefreq: 'monthly' },
  { path: '/network', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  ...articlesPublies().map((a) => ({
    path: `/blog/${a.slug}`, priority: '0.7', changefreq: 'monthly',
    lastmod: (a.updated || a.publishDate).slice(0, 10),
  })),
];

export function render(url) {
  globalThis.__SSR_HEAD__ = {};
  const html = renderToString(<StaticRouter location={url}><App /></StaticRouter>);
  const head = globalThis.__SSR_HEAD__;
  delete globalThis.__SSR_HEAD__;
  return { html, head };
}
