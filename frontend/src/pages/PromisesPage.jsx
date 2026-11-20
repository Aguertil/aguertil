import { usePageMeta, SITE_URL, BRAND } from '../seo/usePageMeta';
import { useState } from 'react';
import promisesData from '../data/promisesData.json';

const etats = {
  tenu: { libelle: 'Tenue', classe: 'etat-tenue' },
  partiellement_tenu: { libelle: 'Partiellement tenue', classe: 'etat-partielle' },
  non_tenu: { libelle: 'Non tenue', classe: 'etat-non-tenue' },
};
function etat(fulfilled) {
  if (fulfilled === true || fulfilled === 'tenu') return etats.tenu;
  if (fulfilled === 'partiellement' || fulfilled === 'partiellement_tenu') return etats.partiellement_tenu;
  return etats.non_tenu;
}

function Verdict({ sujet, donnee }) {
  const e = etat(donnee.fulfilled);
  return (
    <div className="verdict">
      <p className="verdict__sujet">{sujet}</p>
      <p className="verdict__promis"><strong>Promis :</strong> {donnee.promise}</p>
      <p className="verdict__reel"><strong>Constaté :</strong> {donnee.reality}</p>
      <span className={`verdict__etat ${e.classe}`}>{e.libelle}</span>
    </div>
  );
}

export default function PromisesPage() {
  usePageMeta({
    title: 'Promesses budgétaires des présidents : tenues ou non ?',
    description: "Déficit à 3 %, réduction de la dette, baisse des dépenses : les engagements budgétaires des présidents comparés aux résultats publiés par l'Insee.",
    path: '/promises',
  });

  const presidents = [...promisesData.presidents].sort((a, b) => b.campaignYear - a.campaignYear);
  const [choisi, setChoisi] = useState(presidents.find((p) => p.name.includes('Macron')) || presidents[0]);
  const s = promisesData.statistics;

  return (
    <div className="conteneur">
      <h1 className="titre-page">Promesses budgétaires et résultats</h1>
      <p className="chapo">
        Ce que les présidents de la Ve République avaient promis sur le déficit et la dette pendant leur campagne, comparé à ce qui a été constaté.
        Sur {s.totalPromises} engagements suivis : {s.fulfilled} tenus, {s.partiallyFulfilled} partiellement, {s.notFulfilled} non tenus.
      </p>

      <div className="onglets" role="tablist" aria-label="Choisir un président">
        {presidents.map((p) => (
          <button key={p.id} type="button" role="tab" className="onglet" aria-selected={choisi.id === p.id} onClick={() => setChoisi(p)}>
            {p.name}
          </button>
        ))}
      </div>

      <section role="tabpanel" aria-label={choisi.name}>
        <p className="note" style={{ margin: '0 0 20px' }}>{choisi.period}, {choisi.party}. Campagne de {choisi.campaignYear}. {choisi.context}</p>
        {choisi.quote && <blockquote className="citation">« {choisi.quote} »</blockquote>}

        <div className="verdicts">
          <Verdict sujet="Le déficit" donnee={choisi.promises.deficit} />
          <Verdict sujet="La dette" donnee={choisi.promises.debt} />
        </div>

        <h2 className="section__titre" style={{ borderTop: 'var(--filet-fort)', paddingTop: 14 }}>Autres engagements</h2>
        <ul className="liste-promesses">
          {choisi.promises.keyPromises.map((k) => {
            const e = etats[k.status] || etats.non_tenu;
            return (
              <li key={k.title}>
                <span><span className={`verdict__etat ${e.classe}`} style={{ marginTop: 0 }}>{e.libelle}</span></span>
                <div>
                  <p className="liste-promesses__titre">{k.title}</p>
                  <p className="liste-promesses__detail">{k.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
        {choisi.sources?.length > 0 && <p className="source" style={{ marginTop: 16 }}>Sources : {choisi.sources.join(' ; ')}.</p>}
      </section>
      <p className="source" style={{ marginTop: 8 }}>{promisesData.note}</p>
    </div>
  );
}
