import { Link } from 'react-router-dom';
import debtData from '../data/debtData.json';

export default function Footer() {
  return (
    <footer className="pied">
      <div className="conteneur pied__grille">
        <div>
          <h2>dettefrancaise.fr</h2>
          <p>Un site indépendant pour suivre la dette publique française et les liens entre responsables politiques, grandes fortunes, médias et instituts de sondage.</p>
        </div>
        <div>
          <h2>Sources des chiffres</h2>
          <p>Dette au sens de Maastricht : Insee, publication trimestrielle (dernier point : {debtData.referenceLabel}). Population : Insee, bilan démographique.</p>
          <p><a href="https://www.insee.fr/fr/statistiques/2830301">Séries de l'Insee</a></p>
        </div>
        <div>
          <h2>Rubriques</h2>
          <ul>
            <li><Link to="/">La dette en direct</Link></li>
            <li><Link to="/presidents">La dette par président</Link></li>
            <li><Link to="/promises">Promesses et résultats</Link></li>
            <li><Link to="/blog">Articles</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
