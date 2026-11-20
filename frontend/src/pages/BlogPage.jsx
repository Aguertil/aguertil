import { usePageMeta, SITE_URL, BRAND } from '../seo/usePageMeta';
import { useState } from 'react';
import { articlesPublies, rubriques } from '../data/articles';
import { ArticleCarte } from '../components/ArticleTeaser';

export default function BlogPage() {
  usePageMeta({
    title: 'Articles sur la dette publique française',
    description: "Analyses et décryptages sourcés sur la dette publique française : évolution depuis 1995, comparaison des présidents, déficit et charge des intérêts.",
    path: '/blog',
  });

  const [rubrique, setRubrique] = useState('toutes');
  const articles = articlesPublies().filter((a) => rubrique === 'toutes' || a.category === rubrique);

  return (
    <div className="conteneur">
      <h1 className="titre-page">Articles</h1>
      <p className="chapo">Enquêtes et analyses sur la dette publique, les sondages et les liens entre politique, finance et médias.</p>

      <div className="filtres" role="group" aria-label="Filtrer par rubrique">
        <button type="button" className="filtre" aria-pressed={rubrique === 'toutes'} onClick={() => setRubrique('toutes')}>Toutes les rubriques</button>
        {rubriques.map((r) => (
          <button key={r.id} type="button" className="filtre" aria-pressed={rubrique === r.name} onClick={() => setRubrique(r.name)}>{r.name}</button>
        ))}
      </div>

      {articles.length ? (
        <div className="grille-articles">
          {articles.map((a) => <ArticleCarte key={a.slug} article={a} titreNiveau={2} />)}
        </div>
      ) : (
        <p className="note">Pas encore d'article dans cette rubrique. Choisissez « Toutes les rubriques » pour tout voir.</p>
      )}
    </div>
  );
}
