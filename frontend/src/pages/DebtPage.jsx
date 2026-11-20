import { lazy, Suspense } from 'react';
const HistoricalChart = lazy(() => import('../components/HistoricalChart'));
import { usePageMeta, SITE_URL, BRAND } from '../seo/usePageMeta';
import debtData from '../data/debtData.json';
import { useLiveDebt } from '../hooks/useLiveDebt';
import { euros, milliards, nombre } from '../data/format';
import { articlesPublies } from '../data/articles';
import { ArticleCarte, ArticleCourt } from '../components/ArticleTeaser';
import Calculator from '../components/Calculator';

// Le chiffre est découpé en groupes de trois : les deux derniers bougent chaque seconde
function Compteur({ valeur }) {
  const texte = nombre(Math.floor(valeur));
  const groupes = texte.split(/\s|\u202f|\u00a0/);
  const vifs = groupes.length - 2;
  return (
    <p className="une__chiffre" aria-label={`${texte} euros`}>
      <span aria-hidden="true">
        {groupes.map((g, i) => <span key={i} className={i >= vifs ? 'groupe vif' : 'groupe'}>{g}</span>)}
        <span className="euro">€</span>
      </span>
    </p>
  );
}

export default function DebtPage() {
  usePageMeta({
    title: 'Dette publique de la France en direct',
    description: `Compteur de la dette publique française : ${(debtData.currentDebt / 1e9).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} milliards d'euros fin juin 2026, soit ${debtData.debtToGdpPercent.toLocaleString('fr-FR')} % du PIB (Insee). Dette par habitant, par président, charge des intérêts.`,
    path: '/',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'WebSite', name: BRAND, url: `${SITE_URL}/`, inLanguage: 'fr-FR' },
      { '@context': 'https://schema.org', '@type': 'Organization', name: BRAND, url: `${SITE_URL}/`, logo: `${SITE_URL}/favicon.svg` },
    ],
  });

  const dette = useLiveDebt();
  const articles = articlesPublies();
  const [principal, ...autres] = articles;

  return (
    <div className="conteneur">
      <section className="une" aria-labelledby="titre-une">
        <h1 id="titre-une" className="visuellement-cache">La dette publique de la France en direct</h1>
        <Compteur valeur={dette} />
        <div className="une__grille">
          <div>
            <p className="une__chapo">
              C'est la dette publique de la France estimée à cette seconde. Elle augmente d'environ {nombre(debtData.debtPerSecond)} € chaque seconde.
            </p>
            <p className="source">
              Estimation : dette au sens de Maastricht publiée par l'Insee pour {debtData.referenceLabel} ({milliards(debtData.currentDebt)}),
              prolongée au rythme moyen observé sur la dernière année. Le chiffre officiel suivant peut être plus haut ou plus bas.
            </p>
          </div>
          <ul className="chiffres" aria-label="Repères">
            <li><span className="chiffres__libelle">Par habitant</span><span className="chiffres__valeur">{euros(dette / debtData.population)}</span></li>
            <li><span className="chiffres__libelle">Dette rapportée au PIB, {debtData.referenceLabel}</span><span className="chiffres__valeur">{String(debtData.debtToGdpPercent.toFixed(1)).replace('.', ',')} %</span></li>
            <li><span className="chiffres__libelle">Intérêts payés en un an</span><span className="chiffres__valeur">{milliards(debtData.annualInterest)}</span></li>
            <li><span className="chiffres__libelle">Intérêts par seconde</span><span className="chiffres__valeur">{euros(debtData.interestPerSecond)}</span></li>
          </ul>
        </div>
      </section>

      {principal && (
        <section className="section" aria-labelledby="titre-articles">
          <h2 id="titre-articles" className="section__titre">À lire</h2>
          <div className="a-la-une">
            <ArticleCarte article={principal} titreNiveau={3} />
            <div className="a-la-une__liste">
              {autres.slice(0, 4).map((a) => <ArticleCourt key={a.slug} article={a} />)}
            </div>
          </div>
        </section>
      )}

      <section className="section deux-colonnes" aria-label="Évolution et calcul">
        <div>
          <h2 className="section__titre">Douze ans de dette</h2>
          <Suspense fallback={<div className="graphique-attente" style={{ minHeight: 320 }} />}><HistoricalChart data={debtData.historicalData} /></Suspense>
        </div>
        <div>
          <h2 className="section__titre">Votre part des intérêts</h2>
          <p className="note" style={{ marginTop: -8, marginBottom: 20 }}>
            Combien représentent, pour votre foyer, les intérêts que l'État paie chaque année sur sa dette ?
          </p>
          <Calculator annualInterest={debtData.annualInterest} population={debtData.population} />
        </div>
      </section>

      <section className="section" aria-labelledby="titre-comprendre">
        <h2 id="titre-comprendre" className="section__titre">Comprendre la dette publique</h2>
        <div className="questions">
          <div>
            <h3>De quoi parle-t-on ?</h3>
            <p>De tout ce que doivent l'État, les collectivités locales et la Sécurité sociale. C'est la définition européenne, dite « de Maastricht », qui permet de comparer les pays.</p>
          </div>
          <div>
            <h3>Pourquoi augmente-t-elle ?</h3>
            <p>Chaque année où les dépenses publiques dépassent les recettes, l'État emprunte la différence. Ce déficit s'ajoute à la dette existante, et les intérêts aussi.</p>
          </div>
          <div>
            <h3>Est-ce grave ?</h3>
            <p>Les économistes en débattent : pour les uns, une dette élevée menace les finances futures ; pour les autres, elle finance des investissements utiles. Les traités européens fixent un repère à 60 % du PIB.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
