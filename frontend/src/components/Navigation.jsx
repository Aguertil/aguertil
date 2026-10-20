import { Link, useLocation } from 'react-router-dom';
import { TrendingDown, Network, Crown, Target, Users } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-blue-500/30">
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
          </div>
        </div>
      </div>
    </nav>
  );
}
