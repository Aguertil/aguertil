import { useState } from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';

export default function Calculator({ annualInterest, population }) {
  const [income, setIncome] = useState('');
  const [householdSize, setHouseholdSize] = useState('1');
  const [result, setResult] = useState(null);
  
  const calculate = () => {
    const annualIncome = parseFloat(income);
    const size = parseInt(householdSize);
    
    if (isNaN(annualIncome) || annualIncome <= 0) {
      alert('Veuillez entrer un revenu valide');
      return;
    }
    
    // Part des intérêts par habitant
    const interestPerPerson = annualInterest / population;
    
    // Part du foyer
    const householdShare = interestPerPerson * size;
    
    // Pourcentage du revenu
    const percentOfIncome = (householdShare / annualIncome) * 100;
    
    setResult({
      householdShare: householdShare.toFixed(2),
      percentOfIncome: percentOfIncome.toFixed(2),
      perMonth: (householdShare / 12).toFixed(2)
    });
  };
  
  return (
    <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300">
      <div className="flex items-center space-x-2 mb-4">
        <CalculatorIcon className="text-purple-600" size={24} />
        <h3 className="text-xl font-bold text-purple-900">Et pour vous ?</h3>
      </div>
      
      <p className="text-sm text-purple-800 mb-4">
        Calculez votre contribution théorique aux intérêts de la dette publique
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-purple-900 mb-1">
            Revenu annuel du foyer (€)
          </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Ex: 35000"
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-purple-900 mb-1">
            Nombre de personnes dans le foyer
          </label>
          <select
            value={householdSize}
            onChange={(e) => setHouseholdSize(e.target.value)}
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <option key={n} value={n}>{n} personne{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        
        <button
          onClick={calculate}
          className="w-full btn-primary bg-purple-600 hover:bg-purple-700"
        >
          Calculer ma part
        </button>
        
        {result && (
          <div className="mt-4 p-4 bg-white rounded-lg border-2 border-purple-400">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Part annuelle :</span>
                <span className="text-lg font-bold text-purple-900">
                  {new Intl.NumberFormat('fr-FR').format(result.householdShare)} €
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Par mois :</span>
                <span className="text-lg font-bold text-purple-900">
                  {new Intl.NumberFormat('fr-FR').format(result.perMonth)} €
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">% de votre revenu :</span>
                <span className="text-lg font-bold text-purple-900">
                  {result.percentOfIncome} %
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-3 italic">
              * Calcul théorique basé sur une répartition égale des intérêts entre tous les habitants
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
