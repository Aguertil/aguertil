import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, TrendingUp, Target, Quote } from 'lucide-react';
import promisesData from '../data/promisesData.json';

export default function PromisesPage() {
  const [selectedPresident, setSelectedPresident] = useState(promisesData.presidents[2]); // Macron par défaut
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8;
        if (isInView) {
          setIsVisible(prev => ({ ...prev, [section.id]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'tenu': return 'from-green-500/20 to-emerald-500/20 border-green-400/40';
      case 'partiellement_tenu': return 'from-orange-500/20 to-yellow-500/20 border-orange-400/40';
      case 'non_tenu': return 'from-red-500/20 to-pink-500/20 border-red-400/40';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-400/40';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'tenu': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'partiellement_tenu': return <AlertCircle className="w-5 h-5 text-orange-400" />;
      case 'non_tenu': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'tenu': return 'Promesse tenue';
      case 'partiellement_tenu': return 'Partiellement tenu';
      case 'non_tenu': return 'Promesse non tenue';
      default: return 'Statut inconnu';
    }
  };

  const ComparisonGauge = ({ promise, reality, label, unit = '%' }) => {
    const promiseNum = typeof promise === 'number' ? promise : parseFloat(promise);
    const realityNum = typeof reality === 'number' ? reality : parseFloat(reality);
    const max = Math.max(promiseNum, realityNum) * 1.2;
    const promisePercent = (promiseNum / max) * 100;
    const realityPercent = (realityNum / max) * 100;
    const isBetter = realityNum < promiseNum;

    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-blue-300">{label}</span>
          <span className={`text-xs font-bold ${isBetter ? 'text-green-400' : 'text-red-400'}`}>
            {isBetter ? '✓ Mieux' : '✗ Pire'}
          </span>
        </div>

        {/* Promesse */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-green-300">Promesse</span>
            <span className="text-white font-bold">{promiseNum}{unit}</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000"
              style={{ width: `${promisePercent}%` }}
            />
          </div>
        </div>

        {/* Réalité */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-red-300">Réalité</span>
            <span className="text-white font-bold">{realityNum}{unit}</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-1000"
              style={{ width: `${realityPercent}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden py-12">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" 
             style={{ top: '10%', left: '10%', animationDelay: '0s' }} />
        <div className="absolute w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-float" 
             style={{ top: '60%', right: '10%', animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          id="header-section"
          className="text-center mb-12 animate-on-scroll"
          style={{
            opacity: isVisible['header-section'] ? 1 : 0,
            transform: isVisible['header-section'] ? 'translateY(0)' : 'translateY(-30px)',
            transition: 'all 1s ease-out'
          }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full mb-6">
            <Target className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-semibold">Fact-Checking Politique</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
              Promesses vs Réalité
            </span>
          </h1>
          
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Comparaison des engagements de campagne avec les résultats en termes de dette et déficit
          </p>
        </div>

        {/* Statistics Overview */}
        <div 
          id="stats-overview"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-on-scroll"
        >
          {[
            { label: "Promesses analysées", value: promisesData.statistics.totalPromises, color: "blue" },
            { label: "Tenues", value: promisesData.statistics.fulfilled, color: "green" },
            { label: "Partiellement", value: promisesData.statistics.partiallyFulfilled, color: "orange" },
            { label: "Non tenues", value: promisesData.statistics.notFulfilled, color: "red" }
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`card bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/20 backdrop-blur-xl border-2 border-${stat.color}-400/40 transform transition-all duration-700`}
              style={{
                opacity: isVisible['stats-overview'] ? 1 : 0,
                transform: isVisible['stats-overview'] ? 'scale(1)' : 'scale(0.9)',
                transitionDelay: `${idx * 100}ms`
              }}
            >
              <div className="text-center">
                <div className={`text-3xl font-black text-white mb-1`}>{stat.value}</div>
                <div className={`text-sm text-${stat.color}-300 font-semibold`}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* President Selector */}
        <div 
          id="selector"
          className="card bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl border-2 border-blue-400/30 mb-8 animate-on-scroll"
          style={{
            opacity: isVisible['selector'] ? 1 : 0,
            transform: isVisible['selector'] ? 'scale(1)' : 'scale(0.95)',
            transition: 'all 0.8s ease-out'
          }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Sélectionnez un président :</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {promisesData.presidents.map((president) => (
              <button
                key={president.id}
                onClick={() => setSelectedPresident(president)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedPresident.id === president.id
                    ? 'bg-gradient-to-br from-purple-600/40 to-pink-600/40 border-purple-400 shadow-lg shadow-purple-500/50'
                    : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40'
                }`}
              >
                <div className="text-3xl mb-2">{president.image}</div>
                <div className="text-sm font-bold text-white">{president.name.split(' ').pop()}</div>
                <div className="text-xs text-blue-300">{president.period.split('-')[0]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* President Detail Card */}
        {selectedPresident && (
          <div 
            id="detail-card"
            className="space-y-6 animate-on-scroll"
          >
            {/* Header Card */}
            <div className="card bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border-2 border-purple-400/40">
              <div className="flex items-start gap-6">
                <div className="text-6xl">{selectedPresident.image}</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-black text-white mb-2">{selectedPresident.name}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm font-semibold">
                      {selectedPresident.party}
                    </span>
                    <span className="px-3 py-1 bg-blue-500/30 text-blue-200 rounded-full text-sm font-semibold">
                      {selectedPresident.period}
                    </span>
                    <span className="px-3 py-1 bg-orange-500/30 text-orange-200 rounded-full text-sm font-semibold">
                      Campagne {selectedPresident.campaignYear}
                    </span>
                  </div>
                  
                  {selectedPresident.quote && (
                    <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                      <Quote className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                      <p className="text-blue-100 italic">"{selectedPresident.quote}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Comparisons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Deficit */}
              <div className="card bg-gradient-to-br from-slate-800/90 to-purple-900/90 backdrop-blur-xl border-2 border-purple-400/40">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                  Déficit Public
                </h3>
                
                <ComparisonGauge
                  promise={selectedPresident.promises.deficit.promiseValue}
                  reality={selectedPresident.promises.deficit.realityValue}
                  label="Déficit / PIB"
                  unit="%"
                />

                <div className="mt-6 space-y-3">
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-400/30">
                    <div className="text-xs font-semibold text-green-300 mb-1">Promesse</div>
                    <div className="text-sm text-white">{selectedPresident.promises.deficit.promise}</div>
                  </div>
                  
                  <div className="p-3 bg-red-500/10 rounded-lg border border-red-400/30">
                    <div className="text-xs font-semibold text-red-300 mb-1">Réalité</div>
                    <div className="text-sm text-white">{selectedPresident.promises.deficit.reality}</div>
                  </div>
                  
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-xs font-semibold text-blue-300 mb-1">Écart</div>
                    <div className="text-sm text-white font-bold">{selectedPresident.promises.deficit.difference}</div>
                  </div>
                </div>
              </div>

              {/* Dette */}
              <div className="card bg-gradient-to-br from-slate-800/90 to-pink-900/90 backdrop-blur-xl border-2 border-pink-400/40">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-pink-400" />
                  Dette Publique
                </h3>
                
                <ComparisonGauge
                  promise={selectedPresident.promises.debt.promiseValue}
                  reality={selectedPresident.promises.debt.realityValue}
                  label="Dette / PIB"
                  unit="%"
                />

                <div className="mt-6 space-y-3">
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-400/30">
                    <div className="text-xs font-semibold text-green-300 mb-1">Promesse</div>
                    <div className="text-sm text-white">{selectedPresident.promises.debt.promise}</div>
                  </div>
                  
                  <div className="p-3 bg-red-500/10 rounded-lg border border-red-400/30">
                    <div className="text-xs font-semibold text-red-300 mb-1">Réalité</div>
                    <div className="text-sm text-white">{selectedPresident.promises.debt.reality}</div>
                  </div>
                  
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-xs font-semibold text-blue-300 mb-1">Écart</div>
                    <div className="text-sm text-white font-bold">{selectedPresident.promises.debt.difference}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Promises */}
            <div className="card bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl border-2 border-blue-400/40">
              <h3 className="text-xl font-bold text-white mb-6">Engagements clés</h3>
              <div className="space-y-4">
                {selectedPresident.promises.keyPromises.map((promise, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border-2 bg-gradient-to-br ${getStatusColor(promise.status)} transition-all duration-300 hover:scale-[1.02]`}
                  >
                    <div className="flex items-start gap-3">
                      {getStatusIcon(promise.status)}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-white">{promise.title}</h4>
                          <span className="text-xs px-2 py-1 bg-white/10 rounded-full">
                            {getStatusLabel(promise.status)}
                          </span>
                        </div>
                        <p className="text-sm text-blue-200">{promise.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Context */}
            <div className="card bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl border-2 border-orange-400/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-orange-400" />
                Contexte économique
              </h3>
              <p className="text-blue-200">{selectedPresident.context}</p>
              
              {selectedPresident.sources && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-xs text-blue-300 font-semibold mb-2">Sources :</div>
                  <ul className="text-xs text-blue-200 space-y-1">
                    {selectedPresident.sources.map((source, idx) => (
                      <li key={idx}>• {source}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div 
          id="info-section"
          className="mt-12 card bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border-2 border-blue-400/30 animate-on-scroll"
          style={{
            opacity: isVisible['info-section'] ? 1 : 0,
            transform: isVisible['info-section'] ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out'
          }}
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-blue-400" />
            Méthodologie et limites
          </h3>
          <div className="space-y-3 text-blue-200 text-sm">
            <p>
              <span className="font-semibold text-blue-300">Sources : </span>
              Programmes officiels de campagne, discours publics, rapports de la Cour des Comptes, INSEE, Banque de France.
            </p>
            <p>
              <span className="font-semibold text-blue-300">Note : </span>
              Les promesses de campagne doivent être contextualisées. Des événements imprévus (crises financières, pandémies, guerres) peuvent rendre certains objectifs irréalisables.
            </p>
            <p>
              <span className="font-semibold text-blue-300">Rappel : </span>
              Le président ne contrôle pas seul les finances publiques. Le Parlement vote le budget, et de nombreuses dépenses sont contraintes par des engagements antérieurs ou des crises.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -30px); }
          66% { transform: translate(-20px, 20px); }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
