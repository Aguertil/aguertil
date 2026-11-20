import { useEffect, useRef } from 'react';

// Panneau latéral accessible : Échap ou clic sur le fond pour fermer, focus sur le bouton Fermer
export default function Panneau({ titre, surtitre, onFermer, children }) {
  const fermer = useRef(null);
  useEffect(() => {
    const precedent = document.activeElement;
    fermer.current?.focus();
    const touche = (e) => { if (e.key === 'Escape') onFermer(); };
    document.addEventListener('keydown', touche);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', touche);
      document.body.style.overflow = '';
      precedent?.focus?.();
    };
  }, [onFermer]);

  return (
    <div className="panneau-fond" onClick={onFermer}>
      <div className="panneau" role="dialog" aria-modal="true" aria-label={titre} onClick={(e) => e.stopPropagation()}>
        <button ref={fermer} type="button" className="panneau__fermer" onClick={onFermer}>Fermer</button>
        {surtitre && <p className="fiche__type" style={{ marginTop: 28, marginBottom: 0 }}>{surtitre}</p>}
        <h2 className="panneau__titre" style={surtitre ? { marginTop: 4 } : undefined}>{titre}</h2>
        {children}
      </div>
    </div>
  );
}
