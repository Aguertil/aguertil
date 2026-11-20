import { Link } from 'react-router-dom';
import { dateLongue } from '../data/format';

export function ArticleCarte({ article, titreNiveau = 3 }) {
  const Titre = `h${titreNiveau}`;
  return (
    <Link to={`/blog/${article.slug}`} className="article-carte">
      {article.image && <img className="article-carte__image" src={article.image} alt="" loading="lazy" />}
      <span className="article-carte__rubrique">{article.category}</span>
      <Titre className="article-carte__titre">{article.title}</Titre>
      <p className="article-carte__resume">{article.excerpt}</p>
      <time className="article-carte__date" dateTime={article.publishDate}>{dateLongue(article.publishDate)}</time>
    </Link>
  );
}

export function ArticleCourt({ article }) {
  return (
    <article className="article-court">
      <Link to={`/blog/${article.slug}`}>
        <span className="article-court__rubrique">{article.category}</span>
        <h3 className="article-court__titre">{article.title}</h3>
        <time className="article-court__date" dateTime={article.publishDate}>{dateLongue(article.publishDate)}</time>
      </Link>
    </article>
  );
}
