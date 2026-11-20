import { Link, NavLink } from 'react-router-dom';
import { useLiveDebt } from '../hooks/useLiveDebt';
import { milliards } from '../data/format';

const rubriques = [
  { to: '/', label: 'La dette', end: true },
  { to: '/presidents', label: 'Par président' },
  { to: '/promises', label: 'Promesses' },
  { to: '/political-links', label: "Liens d'intérêts" },
  { to: '/network', label: 'Influences' },
  { to: '/blog', label: 'Articles' },
];

export default function Masthead() {
  const debt = useLiveDebt();
  return (
    <header className="entete">
      <a className="lien-evitement" href="#contenu">Aller au contenu</a>
      <div className="conteneur entete__haut">
        <Link to="/" className="marque">
          <span className="marque__nom">Observatoire citoyen</span>
          <span className="marque__domaine">La dette publique, les promesses et ceux qui pèsent sur le débat</span>
        </Link>
        <Link to="/" className="bandeau-compteur" aria-label="Voir le compteur de la dette">
          <span className="bandeau-compteur__valeur">{milliards(debt)}</span>
          <span className="bandeau-compteur__legende">dette publique estimée maintenant</span>
        </Link>
      </div>
      <nav className="menu" aria-label="Rubriques">
        <div className="conteneur"><ul className="menu__liste">
          {rubriques.map((r) => (
            <li key={r.to}>
              <NavLink to={r.to} end={r.end} className="menu__lien">{r.label}</NavLink>
            </li>
          ))}
        </ul></div>
      </nav>
    </header>
  );
}
