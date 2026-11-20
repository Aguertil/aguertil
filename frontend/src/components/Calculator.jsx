import { useState } from 'react';
import { euros } from '../data/format';

export default function Calculator({ annualInterest, population }) {
  const [revenu, setRevenu] = useState('');
  const [personnes, setPersonnes] = useState('1');
  const [resultat, setResultat] = useState(null);
  const [erreur, setErreur] = useState('');

  const calculer = (e) => {
    e.preventDefault();
    const r = parseFloat(String(revenu).replace(/\s/g, '').replace(',', '.'));
    if (!Number.isFinite(r) || r <= 0) {
      setErreur('Indiquez le revenu annuel du foyer, en euros.');
      setResultat(null);
      return;
    }
    setErreur('');
    const part = (annualInterest / population) * parseInt(personnes, 10);
    setResultat({ annuel: part, mensuel: part / 12, pourcentage: (part / r) * 100 });
  };

  return (
    <form className="calcul" onSubmit={calculer} noValidate>
      <label htmlFor="revenu">Revenu annuel du foyer (€)</label>
      <input id="revenu" inputMode="decimal" autoComplete="off" value={revenu} onChange={(e) => setRevenu(e.target.value)} placeholder="Par exemple 35 000" />
      {erreur && <p className="calcul__erreur" role="alert">{erreur}</p>}
      <label htmlFor="personnes">Personnes dans le foyer</label>
      <select id="personnes" value={personnes} onChange={(e) => setPersonnes(e.target.value)}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
      <button type="submit" className="bouton">Calculer ma part</button>
      {resultat && (
        <div className="calcul__resultat" aria-live="polite">
          <ul className="chiffres">
            <li><span className="chiffres__libelle">Par an</span><span className="chiffres__valeur">{euros(resultat.annuel)}</span></li>
            <li><span className="chiffres__libelle">Par mois</span><span className="chiffres__valeur">{euros(resultat.mensuel)}</span></li>
            <li><span className="chiffres__libelle">Part de votre revenu</span><span className="chiffres__valeur">{resultat.pourcentage.toFixed(1).replace('.', ',')} %</span></li>
          </ul>
          <p className="source">Charge d'intérêts annuelle divisée par le nombre d'habitants, multipliée par la taille du foyer. Un ordre de grandeur, pas un impôt réel.</p>
        </div>
      )}
    </form>
  );
}
