import { Link, useLocation } from 'react-router-dom';
import { TrendingDown, Network, Crown, Target, Users, BookOpen, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const location = useLocation();
  const [currentDebt, setCurrentDebt] = useState(0);
  
  const isActive = (path) => location.pathname === path;
  
  // Calcul de la dette en temps réel
  useEffect(() => {
    const REFERENCE_DATE = new Date('2024-01-01T00:00:00Z');
    const REFERENCE_DEBT = 3100000000000; // 3 100 milliards €
    const DEBT_PER_SECOND = 2733; // +2 733€/seconde
    
    const calculateDebt = () => {
      const now = new Date();
      const secondsElapsed = Math.floor((now - REFERENCE_DATE) / 1000);
      return REFERENCE_DEBT + (secondsElapsed * DEBT_PER_SECOND);
    };
    
    setCurrentDebt(calculateDebt());
    
    const interval = setInterval(() => {
      setCurrentDebt(calculateDebt());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatDebt = (debt) => {
    return new Intl.NumberFormat('fr-FR').format(Math.floor(debt));
  };
  
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-blue-500/30">
      {/* Compteur de dette */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-center gap-3 text-sm md:text-base">
            <TrendingUp className="w-5 h-5 animate-pulse" />
            <span className="font-semibold">Dette publique française :</span>
            <span className="text-xl md:text-2xl font-bold tabular-nums">
              {formatDebt(currentDebt)} €
            </span>
            <span className="text-xs md:text-sm opacity-90">(+2 733€/s)</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="group flex items-center space-x-3 text-xl font-bold">
              <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">🇫🇷</span>
              <span className="hidden md:inline bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover:from-pink-400 group-hover:via-purple-400 group-hover:to-blue-400 transition-all duration-500">
                Observatoire Citoyen
              </span>
            </Link>
          </div>
          
          <div className="flex space-x-1 md:space-x-2">
            <Link
              to="/"
              className={`group flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-3 rounded-xl transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50' 
                  : 'text-blue-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <TrendingDown size={18} className={`transition-transform duration-300 ${isActive('/') ? '' : 'group-hover:rotate-12'}`} />
              <span className="font-semibold hidden lg:inline text-sm">Dette</span>
            </Link>
            
            <Link
              to="/presidents"
              className={`group flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-3 rounded-xl transition-all duration-300 ${
                isActive('/presidents') 
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-500/50' 
                  : 'text-orange-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Crown size={18} className={`transition-transform duration-300 ${isActive('/presidents') ? '' : 'group-hover:rotate-12'}`} />
              <span className="font-semibold hidden lg:inline text-sm">Présidents</span>
            </Link>
            
            <Link
              to="/promises"
              className={`group flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-3 rounded-xl transition-all duration-300 ${
                isActive('/promises') 
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/50' 
                  : 'text-pink-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Target size={18} className={`transition-transform duration-300 ${isActive('/promises') ? '' : 'group-hover:rotate-12'}`} />
              <span className="font-semibold hidden lg:inline text-sm">Promesses</span>
            </Link>
            
            <Link
              to="/political-links"
              className={`group flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-3 rounded-xl transition-all duration-300 ${
                isActive('/political-links') 
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/50' 
                  : 'text-red-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Users size={18} className={`transition-transform duration-300 ${isActive('/political-links') ? '' : 'group-hover:rotate-12'}`} />
              <span className="font-semibold hidden lg:inline text-sm">Liens</span>
            </Link>
            
            <Link
              to="/network"
              className={`group flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-3 rounded-xl transition-all duration-300 ${
                isActive('/network') 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/50' 
                  : 'text-purple-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Network size={18} className={`transition-transform duration-300 ${isActive('/network') ? '' : 'group-hover:rotate-12'}`} />
              <span className="font-semibold hidden lg:inline text-sm">Médias</span>
            </Link>
            
            <Link
              to="/blog"
              className={`group flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-3 rounded-xl transition-all duration-300 ${
                isActive('/blog') 
                  ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg shadow-green-500/50' 
                  : 'text-green-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <BookOpen size={18} className={`transition-transform duration-300 ${isActive('/blog') ? '' : 'group-hover:rotate-12'}`} />
              <span className="font-semibold hidden lg:inline text-sm">Blog</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
