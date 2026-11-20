import { useCallback, useMemo, useState } from 'react';
import data from '../data/politicalLinksData.json';
import Panneau from '../components/Panneau';

const types = {
  politician: 'Responsable politique',
  billionaire: 'Grande fortune',
  pollster: 'Institut de sondage',
  media: 'Groupe de médias',
  business: 'Entreprise',
};
const typesDeLien = {
  financing: 'Financement',
  ownership: 'Propriété ou actionnariat',
  family: 'Lien familial',
  employment: 'Emploi ou contrat',
  contract: 'Contrat de service',
};
const libellesDetails = {
  currentRole: 'Fonction', wealth: 'Patrimoine', politicalLeanings: 'Orientation politique', mediaOwnership: 'Médias détenus',
  influence: 'Influence', mainClients: 'Principaux clients', politicalBias: 'Orientation relevée', revenue: "Chiffre d'affaires",
  methodology: 'Méthode', properties: 'Titres et chaînes', audience: 'Audience', editorial: 'Ligne éditoriale',
};

function resume(e) {
  return e.position || e.fortune || e.ownership || e.owner || e.company || '';
}

export default function PoliticalLinksPage() {
  const tous = useMemo(() => [...data.politicians, ...data.billionaires, ...data.pollsters, ...(data.mediaGroups || [])], []);
  const [type, setType] = useState('tous');
  const [recherche, setRecherche] = useState('');
  const [choisi, setChoisi] = useState(null);
  const fermer = useCallback(() => setChoisi(null), []);
  const parId = (id) => tous.find((e) => e.id === id);

  const q = recherche.trim().toLowerCase();
  const visibles = tous.filter((e) => (type === 'tous' || e.type === type) && (!q || e.name.toLowerCase().includes(q)));
  const nombres = Object.fromEntries(Object.keys(types).map((t) => [t, tous.filter((e) => e.type === t).length]));

  return (
    <div className="conteneur">
      <h1 className="titre-page">Liens d'intérêts</h1>
      <p className="chapo">Financements, propriété, liens familiaux et contrats entre responsables politiques, grandes fortunes, médias et instituts de sondage.</p>
      <p className="mise-en-garde">Chaque lien cité indique sa source. Un lien n'est pas une accusation : il signale une relation documentée qu'il est utile de connaître pour lire un sondage ou une information.</p>

      <div className="recherche">
        <label htmlFor="recherche-lien" className="visuellement-cache">Rechercher un nom</label>
        <input id="recherche-lien" type="search" placeholder="Rechercher un nom" value={recherche} onChange={(e) => setRecherche(e.target.value)} />
      </div>
      <div className="filtres" role="group" aria-label="Filtrer par catégorie">
        <button type="button" className="filtre" aria-pressed={type === 'tous'} onClick={() => setType('tous')}>Tout ({tous.length})</button>
        {Object.entries(types).filter(([t]) => nombres[t]).map(([t, libelle]) => (
          <button key={t} type="button" className="filtre" aria-pressed={type === t} onClick={() => setType(t)}>{libelle} ({nombres[t]})</button>
        ))}
      </div>

      {visibles.length ? (
        <div className="fiches">
          {visibles.map((e) => (
            <div key={e.id} className="fiche">
              <button type="button" className="fiche__bouton" onClick={() => setChoisi(e)}>
                <span className="fiche__type">{types[e.type] || e.type}</span>
                <span className="fiche__nom" style={{ display: 'block' }}>{e.name}</span>
                {resume(e) && <span className="fiche__info" style={{ display: 'block' }}>{resume(e)}</span>}
                <span className="fiche__liens">{e.connections?.length || 0} lien{(e.connections?.length || 0) > 1 ? 's' : ''} documenté{(e.connections?.length || 0) > 1 ? 's' : ''}</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="note">Aucun nom ne correspond à « {recherche} ». Vérifiez l'orthographe ou choisissez « Tout ».</p>
      )}

      {choisi && (
        <Panneau titre={choisi.name} surtitre={types[choisi.type]} onFermer={fermer}>
          <dl>
            {Object.entries(choisi.details || {}).filter(([k, v]) => libellesDetails[k] && typeof v === 'string' && v).map(([k, v]) => (
              <div key={k}><dt>{libellesDetails[k]}</dt><dd>{v}</dd></div>
            ))}
          </dl>

          {choisi.details?.directLinks?.length > 0 && (
            <>
              <h3>Liens documentés</h3>
              {choisi.details.directLinks.map((l, i) => (
                <div key={i} className="lien-detail">
                  <span className="lien-detail__entite">{parId(l.entity)?.name || l.entity}</span>
                  {' '}<span className="fiche__type">{typesDeLien[l.type] || l.type}{l.year ? `, ${l.year}` : ''}</span>
                  <p className="lien-detail__texte">{l.description}{l.amount ? ` Montant : ${l.amount}.` : ''}</p>
                  {l.source && <p className="source" style={{ margin: 0 }}>Source : {l.source}</p>}
                </div>
              ))}
            </>
          )}

          {choisi.details?.controversies?.length > 0 && (
            <>
              <h3>Affaires et controverses</h3>
              <ul>{choisi.details.controversies.map((c, i) => <li key={i}>{c}</li>)}</ul>
            </>
          )}

          {choisi.connections?.length > 0 && (
            <>
              <h3>Relié à</h3>
              <ul>
                {choisi.connections.map(parId).filter(Boolean).map((c) => (
                  <li key={c.id}><button type="button" className="bouton-texte" onClick={() => setChoisi(c)}>{c.name}</button></li>
                ))}
              </ul>
            </>
          )}
        </Panneau>
      )}
      <p className="source" style={{ marginTop: 24 }}>Liens directs uniquement : financements, propriété, famille, contrats. Chaque fiche renvoie à ses sources.</p>
    </div>
  );
}
