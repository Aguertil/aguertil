import { useState } from 'react';
import { Calculator as CalculatorIcon, TrendingUp } from 'lucide-react';

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
    
    const interestPerPerson = annualInterest / population;
    const householdShare = interestPerPerson * size;
    const percentOfIncome = (householdShare / annualIncome) * 100;
    
    setResult({
      householdShare: householdShare.toFixed(2),
      percentOfIncome: percentOfIncome.toFixed(2),
      perMonth: (householdShare / 12).toFixed(2)
    });
  };
  
  return (
    <div className="card bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border-2 border-purple-400/40 hover:border-purple-400/70 transition-all duration-500 h-full">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-purple-500/20 rounded-xl">
          <CalculatorIcon className="text-purple-400" size={28} />
        </div>
        <h3 className="text-2xl font-bold text-white">Et pour vous ?</h3>
      </div>
      
      <p className="text-sm text-purple-200 mb-6">
        Calculez votre contribution théorique aux intérêts de la dette publique
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-purple-300 mb-2 uppercase tracking-wide">
            Revenu annuel du foyer (€)
          </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Ex: 35000"
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-purple-400/30 rounded-xl text-white placeholder-purple-300/50 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-purple-300 mb-2 uppercase tracking-wide">
            Nombre de personnes
          </label>
          <select
            value={householdSize}
            onChange={(e) => setHouseholdSize(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-purple-400/30 rounded-xl text-white focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <option key={n} value={n} className="bg-slate-800">{n} personne{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        
        <button
          onClick={calculate}
          className="w-full btn-primary bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
        >
          <span className="flex items-center justify-center gap-2">
            <CalculatorIcon size={20} />
            Calculer ma part
          </span>
        </button>
        
        {result && (
          <div className="mt-6 p-5 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl border-2 border-purple-400/40 animate-fade-in-up">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-purple-500/20 rounded-lg">
                <span className="text-sm font-semibold text-purple-300">Part annuelle</span>
                <span className="text-xl font-black text-white">
                  {new Intl.NumberFormat('fr-FR').format(result.householdShare)} €
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-pink-500/20 rounded-lg">
                <span className="text-sm font-semibold text-pink-300">Par mois</span>
                <span className="text-xl font-black text-white">
                  {new Intl.NumberFormat('fr-FR').format(result.perMonth)} €
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-red-500/20 rounded-lg">
                <span className="text-sm font-semibold text-red-300 flex items-center gap-1">
                  <TrendingUp size={16} />
                  % de votre revenu
                </span>
                <span className="text-xl font-black text-white">
                  {result.percentOfIncome} %
                </span>
              </div>
            </div>
            
            <p className="text-xs text-purple-300 mt-4 italic opacity-75">
              * Calcul théorique basé sur une répartition égale des intérêts entre tous les habitants
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
