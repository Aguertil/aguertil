import { useState } from 'react';
import { Search, Filter, Info } from 'lucide-react';
import NetworkGraph from '../components/NetworkGraph';
import EntityDetails from '../components/EntityDetails';
import networkData from '../data/networkData.json';

export default function NetworkPage() {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  const handleNodeClick = (nodeId) => {
    const entity = 
      networkData.thinkTanks.find(tt => tt.id === nodeId) ||
      networkData.billionaires.find(b => b.id === nodeId) ||
      networkData.media.find(m => m.id === nodeId);
    
    setSelectedEntity(entity);
  };
  
  const getFilteredData = () => {
    if (filter === 'all' && !searchTerm) return networkData;
    
    const filtered = {
      thinkTanks: networkData.thinkTanks,
      billionaires: networkData.billionaires,
      media: networkData.media
    };
    
    if (filter === 'thinkTank') {
      filtered.billionaires = [];
      filtered.media = [];
    } else if (filter === 'billionaire') {
      filtered.thinkTanks = [];
      filtered.media = [];
    } else if (filter === 'media') {
      filtered.thinkTanks = [];
      filtered.billionaires = [];
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered.thinkTanks = filtered.thinkTanks.filter(tt => 
        tt.name.toLowerCase().includes(term) || 
        tt.description.toLowerCase().includes(term)
      );
      filtered.billionaires = filtered.billionaires.filter(b => 
        b.name.toLowerCase().includes(term) || 
        b.description.toLowerCase().includes(term)
      );
      filtered.media = filtered.media.filter(m => 
        m.name.toLowerCase().includes(term) || 
        m.description.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  };
  
  const filteredData = getFilteredData();
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Cartographie des Influences
          </h1>
          <p className="text-lg text-gray-600">
            Explorez les liens entre Think Tanks, Médias et Milliardaires en France
          </p>
        </div>
        
        {/* Controls */}
        <div className="card mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une entité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400" size={20} />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tous les types</option>
                <option value="thinkTank">Think Tanks uniquement</option>
                <option value="billionaire">Milliardaires uniquement</option>
                <option value="media">Médias uniquement</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="card mb-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center space-x-2 mb-3">
            <Info className="text-blue-600" size={20} />
            <h3 className="font-semibold text-gray-900">Légende</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded border-2 border-blue-700"></div>
              <span className="text-sm text-gray-700">Think Tanks (rectangles bleus)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-orange-500 rounded-sm border-2 border-orange-700 transform rotate-45"></div>
              <span className="text-sm text-gray-700">Milliardaires (losanges oranges)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-green-700"></div>
              <span className="text-sm text-gray-700">Médias (ellipses vertes)</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-0.5 bg-orange-500"></div>
                <span>Financement</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-0.5 bg-blue-500 border-dashed border-t-2 border-blue-500"></div>
                <span>Présence médiatique</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-0.5 bg-red-500"></div>
                <span>Propriété</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Network Graph */}
        <div className="card p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Graphe interactif des relations
            </h3>
            <p className="text-sm text-gray-600">
              Cliquez sur un nœud pour afficher les détails. Utilisez la souris pour zoomer et déplacer la vue.
            </p>
          </div>
          <NetworkGraph data={filteredData} onNodeClick={handleNodeClick} />
        </div>
        
        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-blue-50 border-2 border-blue-300">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {networkData.thinkTanks.length}
              </div>
              <div className="text-sm text-blue-900 font-medium mt-1">Think Tanks recensés</div>
            </div>
          </div>
          
          <div className="card bg-orange-50 border-2 border-orange-300">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {networkData.billionaires.length}
              </div>
              <div className="text-sm text-orange-900 font-medium mt-1">Milliardaires / Groupes</div>
            </div>
          </div>
          
          <div className="card bg-green-50 border-2 border-green-300">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {networkData.media.length}
              </div>
              <div className="text-sm text-green-900 font-medium mt-1">Médias majeurs</div>
            </div>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-6 card bg-yellow-50 border-2 border-yellow-300">
          <div className="flex items-start space-x-3">
            <Info className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
            <div className="text-sm text-gray-700">
              <p className="font-semibold text-gray-900 mb-1">
                ⚠️ Méthodologie et limites
              </p>
              <p>
                Cette cartographie est établie à partir de sources publiques (rapports d'activité, articles 
                de presse, registres publics) et vise à informer sur les liens d'influence dans le débat public. 
                Elle ne préjuge pas de l'indépendance éditoriale des médias ni de la qualité des travaux des think tanks. 
                Les données sont simplifiées pour une visualisation pédagogique.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Entity Details Modal */}
      {selectedEntity && (
        <EntityDetails
          entity={selectedEntity}
          data={networkData}
          onClose={() => setSelectedEntity(null)}
        />
      )}
    </div>
  );
}
