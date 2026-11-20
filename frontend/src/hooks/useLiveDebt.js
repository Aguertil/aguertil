import { useEffect, useState } from 'react';
import { estimateDebt } from '../data/debt';

// Dette estimée, rafraîchie chaque seconde (une seule horloge par composant)
export function useLiveDebt() {
  const [debt, setDebt] = useState(() => estimateDebt());
  useEffect(() => {
    const id = setInterval(() => setDebt(estimateDebt()), 1000);
    return () => clearInterval(id);
  }, []);
  return debt;
}
