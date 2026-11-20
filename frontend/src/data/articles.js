import blogData from './blogData.json';

// Articles visibles : publiés, ou programmés dont la date est passée ; du plus récent au plus ancien
export function articlesPublies(now = new Date()) {
  return blogData.articles
    .filter((a) => a.status === 'published' || (a.status === 'scheduled' && new Date(a.publishDate) <= now))
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
}

export const rubriques = blogData.categories;

export function articleParSlug(slug) {
  return articlesPublies().find((a) => a.slug === slug) || null;
}

export function tempsDeLecture(texte) {
  return Math.max(1, Math.ceil(texte.split(/\s+/).length / 220));
}
