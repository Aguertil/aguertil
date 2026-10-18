import { useState, useEffect } from 'react';

export default function DebtCounter({ initialDebt, debtPerSecond }) {
  const [debt, setDebt] = useState(initialDebt);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDebt(prevDebt => prevDebt + debtPerSecond);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [debtPerSecond]);
  
  const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR').format(Math.floor(num));
  };
  
  return (
    <div className="card bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-900 mb-4">
          Dette Publique de la France
        </h2>
        <div className="relative">
          <div className="text-5xl md:text-7xl font-bold text-red-600 tracking-tight mb-2 font-mono">
            {formatNumber(debt)} €
          </div>
          <div className="text-lg text-red-700 font-medium">
            +{formatNumber(debtPerSecond)} € par seconde
          </div>
        </div>
        <div className="mt-6 text-sm text-red-800 italic">
          Compteur en temps réel basé sur les données 2023-2024
        </div>
      </div>
    </div>
  );
}
