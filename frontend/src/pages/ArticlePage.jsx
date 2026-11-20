import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { articleParSlug, tempsDeLecture } from '../data/articles';
import { dateLongue } from '../data/format';
import Markdown from '../components/Markdown';
import DebtChart from '../components/DebtChart';

export default function ArticlePage() {
  const { slug } = useParams();
  const article = articleParSlug(slug);

  useEffect(() => {
    document.title = article ? `${article.title} · dettefrancaise.fr` : 'Article introuvable · dettefrancaise.fr';
    return () => { document.title = 'dettefrancaise.fr · La dette publique française en direct'; };
  }, [article]);

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
    article.slug === 'graphique-evolution-dette-francaise' && titre.includes('Les chiffres qui parlent') ? <DebtChart /> : null;

  return (
    <article className="conteneur lecture">
      <Link to="/blog" className="lecture__retour">Tous les articles</Link>
      <span className="lecture__rubrique">{article.category}</span>
      <h1 className="lecture__titre">{article.title}</h1>
      <p className="lecture__chapo">{article.excerpt}</p>
      <p className="lecture__meta">
        Par {article.author}, le <time dateTime={article.publishDate}>{dateLongue(article.publishDate)}</time>. Lecture : {tempsDeLecture(article.content)} min.
      </p>
      {article.image && <img className="lecture__image" src={article.image} alt="" />}
      <Markdown texte={article.content} apresTitre={apresTitre} />
      {article.tags?.length > 0 && <p className="lecture__mots">Sujets : {article.tags.join(', ')}</p>}
    </article>
  );
}
