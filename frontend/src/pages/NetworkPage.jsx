import { useCallback, useMemo, useState } from 'react';
import data from '../data/networkData.json';
import Panneau from '../components/Panneau';

const categories = [
  { cle: 'thinkTanks', libelle: 'Think tanks', type: 'Think tank' },
  { cle: 'billionaires', libelle: 'Grandes fortunes', type: 'Grande fortune' },
  { cle: 'media', libelle: 'Médias', type: 'Média' },
];

function Liste({ titre, items }) {
  if (!items?.length) return null;
  return (
    <>
      <h3>{titre}</h3>
      <ul>{items.map((x, i) => <li key={i}>{x}</li>)}</ul>
    </>
  );
}

export default function NetworkPage() {
  const index = useMemo(() => {
    const m = {};
    categories.forEach((c) => data[c.cle].forEach((e) => { m[e.id] = { ...e, categorie: c.type }; }));
    return m;
  }, []);
  const [categorie, setCategorie] = useState('toutes');
  const [choisi, setChoisi] = useState(null);
  const fermer = useCallback(() => setChoisi(null), []);

  const noms = (ids) => (ids || []).map((id) => index[id]).filter(Boolean);
  const Relies = ({ titre, ids }) => {
    const liste = noms(ids);
    if (!liste.length) return null;
    return (
      <>
        <h3>{titre}</h3>
        <ul>{liste.map((e) => <li key={e.id}><button type="button" className="bouton-texte" onClick={() => setChoisi(e)}>{e.name}</button></li>)}</ul>
      </>
    );
  };

  const visibles = categories.filter((c) => categorie === 'toutes' || c.cle === categorie);

  return (
    <div className="conteneur">
      <h1 className="titre-page">Qui finance, qui possède, qui influence</h1>
      <p className="chapo">Les think tanks qui pèsent sur le débat public, les grandes fortunes qui les financent et les médias qu'elles possèdent.</p>

      <div className="filtres" role="group" aria-label="Filtrer par catégorie">
        <button type="button" className="filtre" aria-pressed={categorie === 'toutes'} onClick={() => setCategorie('toutes')}>Tout</button>
        {categories.map((c) => (
          <button key={c.cle} type="button" className="filtre" aria-pressed={categorie === c.cle} onClick={() => setCategorie(c.cle)}>
            {c.libelle} ({data[c.cle].length})
          </button>
        ))}
      </div>

      {visibles.map((c) => (
        <section key={c.cle} className="section" style={{ marginTop: 32 }}>
          <h2 className="section__titre">{c.libelle}</h2>
          <div className="fiches">
            {data[c.cle].map((e) => (
              <div key={e.id} className="fiche">
                <button type="button" className="fiche__bouton" onClick={() => setChoisi(index[e.id])}>
                  <span className="fiche__type">{e.orientation || e.sector || e.category}</span>
                  <span className="fiche__nom" style={{ display: 'block' }}>{e.name}</span>
                  <span className="fiche__info" style={{ display: 'block' }}>{e.budget || e.fortune || e.audience}</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}

      {choisi && (
        <Panneau titre={choisi.name} surtitre={choisi.categorie} onFermer={fermer}>
          <p className="lien-detail__texte" style={{ fontSize: 18 }}>{choisi.description}</p>
          <dl>
            {[['Orientation', choisi.orientation], ['Budget', choisi.budget], ['Fortune', choisi.fortune], ['Secteur', choisi.sector],
              ['Catégorie', choisi.category], ['Audience', choisi.audience], ['Ligne éditoriale', choisi.editorialLine]]
              .filter(([, v]) => v).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
          <Liste titre="Figures clés" items={choisi.keyFigures} />
          <Relies titre="Financé par" ids={choisi.fundedBy} />
          <Relies titre="Présence dans les médias" ids={choisi.mediaPresence} />
          <Relies titre="Médias détenus" ids={choisi.mediaOwned} />
          <Relies titre="Propriétaire" ids={choisi.ownedBy} />
          <Liste titre="Entreprises" items={choisi.companies} />
          <Liste titre="Liens politiques" items={choisi.politicalLinks} />
          <Liste titre="Liens avec des think tanks" items={choisi.thinkTankLinks} />
          <Liste titre="Liens familiaux" items={choisi.familyLinks} />
          <Liste titre="Controverses" items={choisi.controversies} />
        </Panneau>
      )}
    </div>
  );
}
