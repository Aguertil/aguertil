import { usePageMeta, SITE_URL, BRAND } from '../seo/usePageMeta';
import { Fragment, useState } from 'react';
import presidentsData from '../data/presidentsData.json';
import { milliards } from '../data/format';

const tris = [
  { champ: 'debtIncrease', label: 'Hausse totale', ajustable: true },
  { champ: 'debtPerYear', label: 'Hausse par an', ajustable: true },
  { champ: 'gdpRatioEnd', label: 'Dette / PIB en fin de mandat' },
  { champ: 'years', label: 'Durée du mandat' },
];

export default function PresidentsPage() {
  usePageMeta({
    title: 'Dette publique par président, de Vincent Auriol à Emmanuel Macron',
    description: "Combien chaque président a-t-il ajouté à la dette publique ? Chirac +576 Md€, Sarkozy +645 Md€, Hollande +359 Md€, Macron +1 314 Md€ (Insee). En euros, en euros constants et en points de PIB.",
    path: '/presidents',
  });

  const [tri, setTri] = useState('debtIncrease');
  const [ordre, setOrdre] = useState('desc');
  const [constants, setConstants] = useState(false);
  const [ouvert, setOuvert] = useState(null);

  const valeur = (p, champ) => {
    const ajuste = p[`${champ}Adjusted`];
    return constants && ajuste !== undefined ? ajuste : p[champ];
  };
  const presidents = [...presidentsData.presidents].sort((a, b) =>
    ordre === 'desc' ? valeur(b, tri) - valeur(a, tri) : valeur(a, tri) - valeur(b, tri)
  );
  const maxHausse = Math.max(...presidents.map((p) => valeur(p, 'debtIncrease')));

  const choisirTri = (champ) => {
    if (champ === tri) setOrdre(ordre === 'desc' ? 'asc' : 'desc');
    else { setTri(champ); setOrdre('desc'); }
  };

  return (
    <div className="conteneur">
      <h1 className="titre-page">La dette, mandat par mandat</h1>
      <p className="chapo">
        Combien la dette publique a-t-elle augmenté sous chaque président depuis 1947 ? Le classement peut se lire en euros de l'époque
        ou en euros constants, pour neutraliser l'inflation.
      </p>

      <div className="tri" role="group" aria-label="Trier le classement">
        <span className="tri__libelle">Trier par</span>
        {tris.map((t) => (
          <button key={t.champ} type="button" className="filtre" aria-pressed={tri === t.champ} onClick={() => choisirTri(t.champ)}>
            {t.label}{tri === t.champ ? (ordre === 'desc' ? ', du plus élevé' : ', du plus bas') : ''}
          </button>
        ))}
        <label className="interrupteur">
          <input type="checkbox" checked={constants} onChange={(e) => setConstants(e.target.checked)} />
          En euros constants 2024
        </label>
      </div>

      <div className="tableau-defile">
        <table className="tableau">
          <caption className="visuellement-cache">Hausse de la dette publique par président</caption>
          <thead>
            <tr>
              <th scope="col">Président</th>
              <th scope="col" className="nombre">Hausse totale</th>
              <th scope="col" className="nombre">Par an</th>
              <th scope="col" className="nombre">Dette / PIB</th>
              <th scope="col"><span className="visuellement-cache">Détails</span></th>
            </tr>
          </thead>
          <tbody>
            {presidents.map((p) => {
              const estOuvert = ouvert === p.id;
              const hausse = valeur(p, 'debtIncrease');
              return (
                <Fragment key={p.id}>
                  <tr className={estOuvert ? 'ouvert' : undefined}>
                    <td>
                      <span className="tableau__nom">{p.name}</span>
                      <span className="tableau__sous">{p.period}, {p.party}</span>
                      <div className="barre" aria-hidden="true"><span style={{ width: `${Math.max(2, (hausse / maxHausse) * 100)}%` }} /></div>
                    </td>
                    <td className="nombre">{milliards(hausse)}</td>
                    <td className="nombre">{milliards(valeur(p, 'debtPerYear'))}</td>
                    <td className="nombre">{p.gdpRatioStart} % → {p.gdpRatioEnd} %</td>
                    <td className="nombre">
                      <button type="button" className="bouton-texte" aria-expanded={estOuvert} onClick={() => setOuvert(estOuvert ? null : p.id)}>
                        {estOuvert ? 'Fermer' : 'Contexte'}
                      </button>
                    </td>
                  </tr>
                  {estOuvert && (
                    <tr className="detail">
                      <td colSpan={5}>
                        {p.context} Dette en début de mandat : {milliards(p.debtStart)} ; en fin de mandat : {milliards(p.debtEnd)}.
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="source" style={{ marginTop: 16 }}>{presidentsData.inflationNote}</p>
    </div>
  );
}
