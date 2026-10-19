import { Link, useLocation } from 'react-router-dom';
import { TrendingDown, Network } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-blue-600">
              <span className="text-2xl">🇫🇷</span>
              <span>Observatoire Citoyen</span>
            </Link>
          </div>
          
          <div className="flex space-x-1">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <TrendingDown size={20} />
              <span className="font-medium">Dette Publique</span>
            </Link>
            
            <Link
              to="/network"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/network') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Network size={20} />
              <span className="font-medium">Cartographie des Influences</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
