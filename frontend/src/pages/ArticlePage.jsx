import { lazy, Suspense } from 'react';
const DebtChart = lazy(() => import('../components/DebtChart'));
import { usePageMeta, SITE_URL, BRAND } from '../seo/usePageMeta';
import { Link, useParams } from 'react-router-dom';
import { articleParSlug, tempsDeLecture } from '../data/articles';
import { dateLongue } from '../data/format';
import Markdown from '../components/Markdown';

export default function ArticlePage() {
  const { slug } = useParams();
  const article = articleParSlug(slug);

  usePageMeta(article ? {
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    type: 'article',
    image: article.image,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: article.title,
      description: article.excerpt,
      image: [article.image],
      datePublished: article.publishDate,
      dateModified: article.updated || article.publishDate,
      inLanguage: 'fr-FR',
      mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
      author: { '@type': 'Organization', name: `La rédaction de ${BRAND}`, url: `${SITE_URL}/` },
      publisher: { '@type': 'Organization', name: BRAND, logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` } },
    },
  } : { title: 'Article introuvable', description: "Cet article n'existe pas ou n'est pas encore publié.", path: `/blog/${slug}`, noIndex: true });

  if (!article) {
    return (
      <div className="conteneur lecture">
        <h1 className="lecture__titre" style={{ marginTop: 40 }}>Cet article n'existe pas ou n'est pas encore publié.</h1>
        <p><Link to="/blog">Voir tous les articles</Link></p>
      </div>
    );
  }

  // Graphique inséré sous ce titre, comme dans la version précédente
  const apresTitre = (titre) =>
    article.slug === 'graphique-evolution-dette-francaise' && titre.includes('Les chiffres qui parlent') ? <Suspense fallback={<div className="graphique-attente" style={{ minHeight: 320 }} />}><DebtChart /></Suspense> : null;

  return (
    <article className="conteneur lecture">
      <Link to="/blog" className="lecture__retour">Tous les articles</Link>
      <span className="lecture__rubrique">{article.category}</span>
      <h1 className="lecture__titre">{article.title}</h1>
      <p className="lecture__chapo">{article.excerpt}</p>
      <p className="lecture__meta">
        Par {article.author}, le <time dateTime={article.publishDate}>{dateLongue(article.publishDate)}</time>{article.updated && <>, mis à jour le <time dateTime={article.updated}>{dateLongue(article.updated)}</time></>}. Lecture : {tempsDeLecture(article.content)} min.
      </p>
      {article.image && <img className="lecture__image" src={article.image} alt="" />}
      <Markdown texte={article.content} apresTitre={apresTitre} />
      {article.tags?.length > 0 && <p className="lecture__mots">Sujets : {article.tags.join(', ')}</p>}
    </article>
  );
}
