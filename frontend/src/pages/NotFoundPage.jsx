import { Link } from 'react-router-dom';
import { usePageMeta } from '../seo/usePageMeta';

export default function NotFoundPage() {
  usePageMeta({ title: 'Page introuvable', description: "Cette page n'existe pas sur dettefrancaise.fr.", path: '/404', noIndex: true });
  return (
    <div className="conteneur lecture">
      <h1 className="lecture__titre" style={{ marginTop: 40 }}>Cette page n'existe pas.</h1>
      <p>L'adresse a peut-être changé. <Link to="/">Retour au compteur de la dette</Link> ou <Link to="/blog">voir les articles</Link>.</p>
    </div>
  );
}
