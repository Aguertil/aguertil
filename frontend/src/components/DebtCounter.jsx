import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

export default function DebtCounter({ initialDebt, debtPerSecond }) {
  // Référence actualisée octobre 2026
  const REFERENCE_DATE = new Date('2024-01-01T00:00:00Z');
  const REFERENCE_DEBT = 3100000000000; // 3 100 milliards € (janvier 2024)
  
  const calculateCurrentDebt = () => {
    const now = new Date();
    const secondsElapsed = Math.floor((now - REFERENCE_DATE) / 1000);
    return REFERENCE_DEBT + (secondsElapsed * debtPerSecond);
  };
  
  const [debt, setDebt] = useState(calculateCurrentDebt());
  const [flash, setFlash] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDebt(prevDebt => prevDebt + debtPerSecond);
      setFlash(true);
      setTimeout(() => setFlash(false), 200);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [debtPerSecond]);
  
  const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR').format(Math.floor(num));
  };
  
  const debtString = formatNumber(debt);
  
  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse-slow"></div>
      
      <div className="relative card bg-gradient-to-br from-slate-800/90 to-red-900/90 backdrop-blur-xl border-2 border-red-500/50 hover:border-red-400/80 transition-all duration-500 overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-32 h-32 bg-red-500/10 rounded-full blur-2xl animate-float-1" style={{ top: '20%', left: '10%' }} />
          <div className="absolute w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-float-2" style={{ top: '60%', right: '10%' }} />
        </div>

        <div className="relative text-center">
          {/* Title */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className={`p-3 bg-red-500/20 rounded-full ${flash ? 'animate-ping-once' : ''}`}>
              <TrendingUp className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-pink-300">
              Dette Publique de la France
            </h2>
          </div>
          
          {/* Main Counter */}
          <div className="relative mb-6">
            <div className={`text-4xl md:text-7xl font-black font-mono tracking-tight mb-4 transition-all duration-200 ${
              flash ? 'text-red-300 scale-105' : 'text-white'
            }`}>
              {debtString.split('').map((char, idx) => (
                <span 
                  key={idx}
                  className="inline-block animate-count-up"
                  style={{ 
                    animationDelay: `${idx * 0.05}s`,
                    textShadow: '0 0 20px rgba(239, 68, 68, 0.5), 0 0 40px rgba(239, 68, 68, 0.3)'
                  }}
                >
                  {char}
                </span>
              ))}
              <span className="text-3xl md:text-5xl ml-2">€</span>
            </div>
            
            {/* Per second indicator */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-full">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-lg md:text-xl text-red-200 font-bold">
                +{formatNumber(debtPerSecond)} € / seconde
              </span>
            </div>
          </div>

          {/* Stats bars */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {(debt / 1000000000000).toFixed(2)}
              </div>
              <div className="text-xs md:text-sm text-blue-300">Milliers de milliards</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {formatNumber(debtPerSecond * 60)}
              </div>
              <div className="text-xs md:text-sm text-purple-300">€ par minute</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {(debtPerSecond * 3600 / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs md:text-sm text-pink-300">€ par heure</div>
            </div>
          </div>

          <div className="mt-6 text-sm text-blue-300 italic opacity-75">
            💡 Compteur en temps réel - Déficit : ~183 Mds€/an
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }

        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }

        @keyframes count-up {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }

        @keyframes ping-once {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        .animate-float-1 { animation: float-1 8s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 10s ease-in-out infinite; }
        .animate-count-up { animation: count-up 0.5s ease-out both; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-ping-once { animation: ping-once 0.6s ease-out; }
      `}</style>
    </div>
  );
}
