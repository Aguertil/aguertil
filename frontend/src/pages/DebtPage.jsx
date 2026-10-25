import { Users, Briefcase, TrendingUp, DollarSign, ArrowDown, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import DebtCounter from '../components/DebtCounter';
import StatsCard from '../components/StatsCard';
import Calculator from '../components/Calculator';
import HistoricalChart from '../components/HistoricalChart';
import debtData from '../data/debtData.json';

export default function DebtPage() {
  const [isVisible, setIsVisible] = useState({});
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
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

  const formatLargeNumber = (num) => {
    return new Intl.NumberFormat('fr-FR', { 
      maximumFractionDigits: 0 
    }).format(num);
  };
  
  const debtPerCapita = Math.floor(debtData.currentDebt / debtData.population);
  const debtPerActive = Math.floor(debtData.currentDebt / debtData.activePopulation);
  const debtToGdpPercent = ((debtData.currentDebt / debtData.gdp) * 100).toFixed(1);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" 
             style={{ top: '10%', left: '10%', animationDelay: '0s' }} />
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" 
             style={{ top: '60%', right: '10%', animationDelay: '2s' }} />
        <div className="absolute w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-float" 
             style={{ bottom: '10%', left: '40%', animationDelay: '4s' }} />
      </div>

      {/* Hero Counter Section - Full Screen */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div 
          className="text-center w-full max-w-6xl transform transition-all duration-1000"
          style={{ 
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: 1 - scrollY / 800 
          }}
        >
          {/* Title */}
          <div className="mb-8 animate-fade-in-down">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full mb-6 animate-pulse-glow">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-red-300 font-semibold text-sm md:text-base">EN DIRECT - 25 octobre 2026</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tight">
              <span className="text-red-400">Dette de la France :</span>
              <br />
              <span className="text-white">dette publique en direct</span>
            </h1>
          </div>

          {/* MAIN COUNTER - HUGE */}
          <DebtCounter 
            initialDebt={debtData.currentDebt} 
            debtPerSecond={debtData.debtPerSecond}
            heroMode={true}
          />

          {/* Quick Stats Below Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">{debtToGdpPercent}%</div>
              <div className="text-xs md:text-sm text-blue-200 mt-1">Dette / PIB</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">{formatLargeNumber(debtData.population / 1000000)}M</div>
              <div className="text-xs md:text-sm text-blue-200 mt-1">Habitants</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">{formatLargeNumber(debtPerCapita)}€</div>
              <div className="text-xs md:text-sm text-blue-200 mt-1">Par habitant</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">{(debtData.annualInterest / 1000000000).toFixed(0)}Md€</div>
              <div className="text-xs md:text-sm text-blue-200 mt-1">Intérêts/an</div>
            </div>
          </div>

          <div className="animate-bounce-slow mt-16">
            <ArrowDown className="w-10 h-10 text-blue-400 mx-auto opacity-50" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Stats Grid */}
        <div 
          id="stats-section"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-on-scroll"
        >
          {[
            {
              title: "Dette par habitant",
              value: `${formatLargeNumber(debtPerCapita)} €`,
              subtitle: `${formatLargeNumber(debtData.population)} habitants`,
              icon: Users,
              color: "blue",
              delay: 0
            },
            {
              title: "Dette par actif",
              value: `${formatLargeNumber(debtPerActive)} €`,
              subtitle: `${formatLargeNumber(debtData.activePopulation)} actifs`,
              icon: Briefcase,
              color: "green",
              delay: 100
            },
            {
              title: "Dette / PIB",
              value: `${debtToGdpPercent}%`,
              subtitle: "Ratio de Maastricht",
              icon: TrendingUp,
              color: "purple",
              delay: 200
            },
            {
              title: "Intérêts annuels",
              value: `${(debtData.annualInterest / 1000000000).toFixed(1)} Mds €`,
              subtitle: `${formatLargeNumber(debtData.interestPerSecond)} € / seconde`,
              icon: DollarSign,
              color: "orange",
              delay: 300
            }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="transform transition-all duration-700"
              style={{
                opacity: isVisible['stats-section'] ? 1 : 0,
                transform: isVisible['stats-section'] ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                transitionDelay: `${stat.delay}ms`
              }}
            >
              <StatsCard {...stat} />
            </div>
          ))}
        </div>
        
        {/* Charts Section */}
        <div 
          id="charts-section"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 animate-on-scroll"
        >
          <div 
            className="lg:col-span-2 transform transition-all duration-1000"
            style={{
              opacity: isVisible['charts-section'] ? 1 : 0,
              transform: isVisible['charts-section'] ? 'translateX(0)' : 'translateX(-50px)'
            }}
          >
            <HistoricalChart data={debtData.historicalData} />
          </div>
          
          <div 
            className="transform transition-all duration-1000"
            style={{
              opacity: isVisible['charts-section'] ? 1 : 0,
              transform: isVisible['charts-section'] ? 'translateX(0)' : 'translateX(50px)',
              transitionDelay: '200ms'
            }}
          >
            <Calculator 
              annualInterest={debtData.annualInterest}
              population={debtData.population}
            />
          </div>
        </div>
        
        {/* Info Section */}
        <div 
          id="info-section"
          className="animate-on-scroll transform transition-all duration-1000"
          style={{
            opacity: isVisible['info-section'] ? 1 : 0,
            transform: isVisible['info-section'] ? 'translateY(0)' : 'translateY(50px)'
          }}
        >
          <div className="card bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border-2 border-blue-400/30 hover:border-blue-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">📊</span>
              Comprendre la dette publique
            </h3>
            <div className="space-y-4 text-blue-100">
              <div className="p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <span className="font-semibold text-blue-300">Qu'est-ce que la dette publique ?</span>
                <p className="mt-2">C'est l'ensemble des engagements financiers de l'État français, des collectivités locales et des organismes de sécurité sociale.</p>
              </div>
              
              <div className="p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <span className="font-semibold text-purple-300">Pourquoi augmente-t-elle ?</span>
                <p className="mt-2">Lorsque les dépenses publiques dépassent les recettes (déficit), l'État emprunte pour combler la différence. Ces emprunts s'accumulent année après année.</p>
              </div>
              
              <div className="p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <span className="font-semibold text-pink-300">Est-ce grave ?</span>
                <p className="mt-2">Le débat économique oppose ceux qui estiment qu'une dette élevée est insoutenable à long terme et ceux qui considèrent qu'elle permet de financer des investissements nécessaires. Le critère de Maastricht fixe un seuil de 60% du PIB.</p>
              </div>
              
              <p className="text-sm italic text-blue-300 pt-4 border-t border-white/10">
                💡 Les chiffres présentés sont basés sur les dernières données officielles et augmentent selon une estimation moyenne pour illustrer la dynamique de la dette.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.3); }
          50% { box-shadow: 0 0 40px rgba(239, 68, 68, 0.6); }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 1.5s ease-out 0.5s both;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
