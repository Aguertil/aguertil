import { Users, Briefcase, TrendingUp, DollarSign } from 'lucide-react';
import DebtCounter from '../components/DebtCounter';
import StatsCard from '../components/StatsCard';
import Calculator from '../components/Calculator';
import HistoricalChart from '../components/HistoricalChart';
import debtData from '../data/debtData.json';

export default function DebtPage() {
  const formatLargeNumber = (num) => {
    return new Intl.NumberFormat('fr-FR', { 
      maximumFractionDigits: 0 
    }).format(num);
  };
  
  const debtPerCapita = Math.floor(debtData.currentDebt / debtData.population);
  const debtPerActive = Math.floor(debtData.currentDebt / debtData.activePopulation);
  const debtToGdpPercent = ((debtData.currentDebt / debtData.gdp) * 100).toFixed(1);
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dette Publique Française en Direct
          </h1>
          <p className="text-lg text-gray-600">
            Suivez l'évolution en temps réel de la dette de la France
          </p>
        </div>
        
        {/* Main Counter */}
        <div className="mb-8">
          <DebtCounter 
            initialDebt={debtData.currentDebt} 
            debtPerSecond={debtData.debtPerSecond}
          />
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Dette par habitant"
            value={`${formatLargeNumber(debtPerCapita)} €`}
            subtitle={`${formatLargeNumber(debtData.population)} habitants`}
            icon={Users}
            color="blue"
          />
          
          <StatsCard
            title="Dette par actif"
            value={`${formatLargeNumber(debtPerActive)} €`}
            subtitle={`${formatLargeNumber(debtData.activePopulation)} actifs`}
            icon={Briefcase}
            color="green"
          />
          
          <StatsCard
            title="Dette / PIB"
            value={`${debtToGdpPercent}%`}
            subtitle="Ratio de Maastricht"
            icon={TrendingUp}
            color="purple"
          />
          
          <StatsCard
            title="Intérêts annuels"
            value={`${(debtData.annualInterest / 1000000000).toFixed(1)} Mds €`}
            subtitle={`${formatLargeNumber(debtData.interestPerSecond)} € / seconde`}
            icon={DollarSign}
            color="orange"
          />
        </div>
        
        {/* Two columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <HistoricalChart data={debtData.historicalData} />
          </div>
          
          <div>
            <Calculator 
              annualInterest={debtData.annualInterest}
              population={debtData.population}
            />
          </div>
        </div>
        
        {/* Info Section */}
        <div className="card bg-blue-50 border-2 border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            📊 Comprendre la dette publique
          </h3>
          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-semibold">Qu'est-ce que la dette publique ?</span> C'est l'ensemble 
              des engagements financiers de l'État français, des collectivités locales et des organismes 
              de sécurité sociale.
            </p>
            <p>
              <span className="font-semibold">Pourquoi augmente-t-elle ?</span> Lorsque les dépenses 
              publiques dépassent les recettes (déficit), l'État emprunte pour combler la différence. 
              Ces emprunts s'accumulent année après année.
            </p>
            <p>
              <span className="font-semibold">Est-ce grave ?</span> Le débat économique oppose ceux qui 
              estiment qu'une dette élevée est insoutenable à long terme et ceux qui considèrent qu'elle 
              permet de financer des investissements nécessaires. Le critère de Maastricht fixe un seuil 
              de 60% du PIB.
            </p>
            <p className="text-sm italic">
              💡 Les chiffres présentés sont basés sur les dernières données officielles et augmentent 
              selon une estimation moyenne pour illustrer la dynamique de la dette.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
