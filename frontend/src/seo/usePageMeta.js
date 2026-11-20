import { useEffect } from 'react';

export const SITE_URL = 'https://dettefrancaise.fr';
export const BRAND = 'dettefrancaise.fr';
export const OG_IMAGE = `${SITE_URL}/og.png`;

/** Calcule les balises SEO d'une page. */
export function buildPageMeta({ title, description, path = '/', noIndex = false, type = 'website', image, jsonLd } = {}) {
  return {
    title: title ? `${title} · ${BRAND}` : `${BRAND} · La dette publique française en direct`,
    description,
    url: `${SITE_URL}${path}`,
    robots: noIndex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    type,
    image: image || OG_IMAGE,
    jsonLd: jsonLd || null,
  };
}

/**
 * Title, description, canonical, Open Graph et données structurées de la page.
 * Au pré-rendu (scripts/prerender.mjs) les effets ne tournent pas : les valeurs
 * sont déposées dans globalThis.__SSR_HEAD__ et écrites dans le HTML.
 */
export function usePageMeta(options) {
  if (typeof window === 'undefined' && globalThis.__SSR_HEAD__) {
    Object.assign(globalThis.__SSR_HEAD__, buildPageMeta(options));
  }
  const key = JSON.stringify(options);
  useEffect(() => {
    const m = buildPageMeta(options);
    document.title = m.title;
    const set = (attr, k, v) => {
      let el = document.head.querySelector(`meta[${attr}="${k}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, k); document.head.appendChild(el); }
      el.setAttribute('content', v);
    };
    set('name', 'description', m.description);
    set('name', 'robots', m.robots);
    set('property', 'og:title', m.title);
    set('property', 'og:description', m.description);
    set('property', 'og:url', m.url);
    set('property', 'og:type', m.type);
    set('property', 'og:image', m.image);
    set('name', 'twitter:title', m.title);
    set('name', 'twitter:description', m.description);
    set('name', 'twitter:image', m.image);
    let can = document.head.querySelector('link[rel="canonical"]');
    if (options.noIndex) { can?.remove(); return; }
    if (!can) { can = document.createElement('link'); can.rel = 'canonical'; document.head.appendChild(can); }
    can.href = m.url;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
