import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Calendar, DollarSign, Award, AlertCircle } from 'lucide-react';
import presidentsData from '../data/presidentsData.json';

export default function PresidentsPage() {
  const [sortBy, setSortBy] = useState('debtIncrease');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedPresident, setSelectedPresident] = useState(null);
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

  const formatNumber = (num) => {
    if (num >= 1000000000000) {
      return `${(num / 1000000000000).toFixed(1)} T€`;
    } else if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)} Mds€`;
    }
    return new Intl.NumberFormat('fr-FR').format(num) + ' €';
  };

  const sortedPresidents = [...presidentsData.presidents].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
  });

  const SortButton = ({ field, label }) => (
    <button
      onClick={() => {
        if (sortBy === field) {
          setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
        } else {
          setSortBy(field);
          setSortOrder('desc');
        }
      }}
      className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
        sortBy === field
          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50'
          : 'bg-white/10 text-blue-300 hover:bg-white/20'
      }`}
    >
      {label} {sortBy === field && (sortOrder === 'desc' ? '↓' : '↑')}
    </button>
  );

  const getPodiumColor = (index) => {
    switch(index) {
      case 0: return 'from-yellow-500/30 to-orange-500/30 border-yellow-400/50';
      case 1: return 'from-gray-400/30 to-gray-500/30 border-gray-400/50';
      case 2: return 'from-amber-600/30 to-amber-700/30 border-amber-500/50';
      default: return 'from-slate-700/30 to-slate-800/30 border-slate-600/40';
    }
  };

  const getPodiumIcon = (index) => {
    switch(index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `${index + 1}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden py-12">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" 
             style={{ top: '10%', left: '10%', animationDelay: '0s' }} />
        <div className="absolute w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-float" 
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
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full mb-6">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-300 font-semibold">Classement historique</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Dette par Président
            </span>
          </h1>
          
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Évolution de la dette publique française depuis 1945
          </p>
        </div>

        {/* Stats Overview */}
        <div 
          id="stats-overview"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-on-scroll"
        >
          {[
            {
              label: "Dette totale accumulée",
              value: formatNumber(presidentsData.presidents.reduce((sum, p) => sum + p.debtIncrease, 0)),
              icon: TrendingUp,
              color: "from-red-500/20 to-pink-500/20 border-red-400/40"
            },
            {
              label: "Nombre de présidents",
              value: presidentsData.presidents.length,
              icon: Award,
              color: "from-blue-500/20 to-cyan-500/20 border-blue-400/40"
            },
            {
              label: "Période couverte",
              value: "1947 - 2024",
              icon: Calendar,
              color: "from-purple-500/20 to-pink-500/20 border-purple-400/40"
            }
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`card bg-gradient-to-br ${stat.color} backdrop-blur-xl transform transition-all duration-700`}
              style={{
                opacity: isVisible['stats-overview'] ? 1 : 0,
                transform: isVisible['stats-overview'] ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${idx * 100}ms`
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-blue-300 font-semibold mb-2">{stat.label}</div>
                  <div className="text-3xl font-black text-white">{stat.value}</div>
                </div>
                <div className="p-4 bg-white/10 rounded-xl">
                  <stat.icon className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sort Controls */}
        <div 
          id="sort-controls"
          className="card bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl border-2 border-blue-400/30 mb-8 animate-on-scroll"
          style={{
            opacity: isVisible['sort-controls'] ? 1 : 0,
            transform: isVisible['sort-controls'] ? 'scale(1)' : 'scale(0.95)',
            transition: 'all 0.8s ease-out'
          }}
        >
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-blue-300 font-semibold">Trier par :</span>
            <SortButton field="debtIncrease" label="Dette totale" />
            <SortButton field="debtPerYear" label="Dette par an" />
            <SortButton field="gdpRatioEnd" label="Ratio dette/PIB" />
            <SortButton field="years" label="Durée mandat" />
          </div>
        </div>

        {/* Presidents List */}
        <div className="space-y-4">
          {sortedPresidents.map((president, index) => (
            <div
              key={president.id}
              id={`president-${president.id}`}
              className="animate-on-scroll"
              style={{
                opacity: isVisible[`president-${president.id}`] ? 1 : 0,
                transform: isVisible[`president-${president.id}`] ? 'translateX(0)' : 'translateX(-50px)',
                transition: `all 0.6s ease-out ${index * 0.1}s`
              }}
            >
              <div 
                className={`group card bg-gradient-to-br ${getPodiumColor(index)} backdrop-blur-xl border-2 hover:scale-[1.02] transition-all duration-500 cursor-pointer`}
                onClick={() => setSelectedPresident(selectedPresident?.id === president.id ? null : president)}
              >
                <div className="flex items-start gap-6">
                  {/* Rank */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-3xl font-black">
                      {getPodiumIcon(index)}
                    </div>
                  </div>

                  {/* President Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-2xl font-black text-white mb-1 flex items-center gap-2">
                          <span>{president.image}</span>
                          {president.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full font-semibold">
                            {president.party}
                          </span>
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full font-semibold">
                            {president.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        <div className="text-xs text-blue-300 mb-1 font-semibold">Dette accumulée</div>
                        <div className="text-lg font-black text-white">{formatNumber(president.debtIncrease)}</div>
                      </div>
                      
                      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        <div className="text-xs text-purple-300 mb-1 font-semibold">Par an</div>
                        <div className="text-lg font-black text-white">{formatNumber(president.debtPerYear)}</div>
                      </div>
                      
                      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        <div className="text-xs text-pink-300 mb-1 font-semibold">Dette/PIB</div>
                        <div className="text-lg font-black text-white">
                          {president.gdpRatioStart}% → {president.gdpRatioEnd}%
                        </div>
                      </div>
                      
                      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        <div className="text-xs text-orange-300 mb-1 font-semibold">Durée</div>
                        <div className="text-lg font-black text-white">{president.years} ans</div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedPresident?.id === president.id && (
                      <div className="mt-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 animate-fade-in">
                        <div className="text-sm text-blue-200 mb-3">
                          <span className="font-semibold text-blue-300">Contexte : </span>
                          {president.context}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-green-300 font-semibold">Dette début : </span>
                            <span className="text-white">{formatNumber(president.debtStart)}</span>
                          </div>
                          <div>
                            <span className="text-red-300 font-semibold">Dette fin : </span>
                            <span className="text-white">{formatNumber(president.debtEnd)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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
            Méthodologie et sources
          </h3>
          <div className="space-y-2 text-blue-200 text-sm">
            <p>
              <span className="font-semibold text-blue-300">Sources : </span>
              INSEE, Banque de France, Ministère de l'Économie, Eurostat
            </p>
            <p>
              <span className="font-semibold text-blue-300">Note : </span>
              Les chiffres représentent la dette publique au sens de Maastricht. Les variations sont influencées par de nombreux facteurs économiques et contextuels (guerres, crises, cycles économiques).
            </p>
            <p>
              <span className="font-semibold text-blue-300">Rappel : </span>
              La dette publique ne reflète pas uniquement les décisions d'un président, mais résulte de choix législatifs, de contextes économiques mondiaux et de politiques multi-décennales.
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

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
