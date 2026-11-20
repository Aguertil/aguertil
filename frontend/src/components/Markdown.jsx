import { Fragment } from 'react';

// Rendu du markdown simple des articles : titres, listes, gras, italique, liens, citations, séparateurs
function enLigne(texte, cle) {
  const morceaux = [];
  const motif = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let dernier = 0;
  let m;
  let i = 0;
  while ((m = motif.exec(texte))) {
    if (m.index > dernier) morceaux.push(texte.slice(dernier, m.index));
    const t = m[0];
    if (t.startsWith('**')) morceaux.push(<strong key={`${cle}-${i++}`}>{t.slice(2, -2)}</strong>);
    else if (t.startsWith('[')) {
      const [, label, href] = t.match(/\[([^\]]+)\]\(([^)]+)\)/);
      morceaux.push(<a key={`${cle}-${i++}`} href={href} rel="noopener noreferrer">{label}</a>);
    } else morceaux.push(<em key={`${cle}-${i++}`}>{t.slice(1, -1)}</em>);
    dernier = m.index + t.length;
  }
  if (dernier < texte.length) morceaux.push(texte.slice(dernier));
  return morceaux;
}

export default function Markdown({ texte, apresTitre }) {
  const lignes = texte.split('\n');
  const blocs = [];
  let liste = null;
  const fermerListe = () => {
    if (liste) { blocs.push(liste.ordonnee ? <ol key={`l${blocs.length}`}>{liste.items}</ol> : <ul key={`l${blocs.length}`}>{liste.items}</ul>); liste = null; }
  };

  lignes.forEach((brut, idx) => {
    const ligne = brut.trimEnd();
    const puce = ligne.match(/^\s*[-*] (.*)$/);
    const numero = ligne.match(/^\s*\d+[.)] (.*)$/);
    if (puce || numero) {
      const ordonnee = Boolean(numero);
      if (!liste || liste.ordonnee !== ordonnee) { fermerListe(); liste = { ordonnee, items: [] }; }
      liste.items.push(<li key={idx}>{enLigne((puce || numero)[1], idx)}</li>);
      return;
    }
    fermerListe();
    if (!ligne.trim()) return;
    if (ligne.startsWith('# ')) return; // le titre principal est déjà affiché
    if (ligne.startsWith('### ')) { blocs.push(<h3 key={idx}>{enLigne(ligne.slice(4), idx)}</h3>); return; }
    if (ligne.startsWith('## ')) {
      const titre = ligne.slice(3);
      blocs.push(
        <Fragment key={idx}>
          <h2>{enLigne(titre, idx)}</h2>
          {apresTitre?.(titre)}
        </Fragment>
      );
      return;
    }
    if (/^-{3,}$/.test(ligne)) { blocs.push(<hr key={idx} />); return; }
    if (ligne.startsWith('> ')) { blocs.push(<blockquote key={idx}>{enLigne(ligne.slice(2), idx)}</blockquote>); return; }
    blocs.push(<p key={idx}>{enLigne(ligne, idx)}</p>);
  });
  fermerListe();
  return <div className="corps">{blocs}</div>;
}
