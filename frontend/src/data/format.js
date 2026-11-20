const nf = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });

export const euros = (n) => `${nf.format(Math.round(n))} €`;
export const milliards = (n) => `${nf1.format(n / 1e9)} Md€`;
export const nombre = (n) => nf.format(n);

export function dateLongue(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}
