import debtData from './debtData.json';

/**
 * Source unique pour le compteur : dette Insee à la date de référence
 * + rythme moyen observé sur un an (T2 2025 → T2 2026 : +178,3 Md€, soit ~5 650 €/s).
 * Pour mettre à jour : modifier debtData.json à chaque publication trimestrielle de l'Insee.
 */
export const REFERENCE_DATE = new Date(debtData.referenceDate);
export const REFERENCE_DEBT = debtData.currentDebt;
export const DEBT_PER_SECOND = debtData.debtPerSecond;

export function estimateDebt(now = new Date()) {
  const seconds = Math.max(0, Math.floor((now - REFERENCE_DATE) / 1000));
  return REFERENCE_DEBT + seconds * DEBT_PER_SECOND;
}

export const formatFr = (n) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(n);
