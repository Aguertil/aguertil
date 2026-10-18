import { useState, useEffect } from 'react';
import { Search, X, TrendingUp, Users, Radio, Building2, DollarSign, Newspaper, AlertCircle } from 'lucide-react';

export default function ModernNetworkViz({ data, onEntitySelect }) {
  const [hoveredEntity, setHoveredEntity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [connectedEntities, setConnectedEntities] = useState(new Set());

  const allEntities = [
    ...data.thinkTanks.map(tt => ({ ...tt, category: 'thinkTank' })),
    ...data.billionaires.map(b => ({ ...b, category: 'billionaire' })),
    ...data.media.map(m => ({ ...m, category: 'media' }))
  ];

  const filteredEntities = allEntities.filter(entity => {
    const matchesCategory = selectedCategory === 'all' || entity.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entity.description && entity.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getConnections = (entityId, category) => {
    const connections = new Set();
    
    if (category === 'thinkTank') {
      const tt = data.thinkTanks.find(t => t.id === entityId);
      if (tt) {
        tt.fundedBy?.forEach(id => connections.add(id));
        tt.mediaPresence?.forEach(id => connections.add(id));
      }
    } else if (category === 'billionaire') {
      const b = data.billionaires.find(bil => bil.id === entityId);
      if (b) {
        b.mediaOwned?.forEach(id => connections.add(id));
        data.thinkTanks.forEach(tt => {
          if (tt.fundedBy?.includes(entityId)) connections.add(tt.id);
        });
      }
    } else if (category === 'media') {
      const m = data.media.find(med => med.id === entityId);
      if (m) {
        m.ownedBy?.forEach(id => connections.add(id));
        data.thinkTanks.forEach(tt => {
          if (tt.mediaPresence?.includes(entityId)) connections.add(tt.id);
        });
      }
    }
    
    return connections;
  };

  const handleEntityHover = (entity) => {
    setHoveredEntity(entity);
    if (entity) {
      const connections = getConnections(entity.id, entity.category);
      connections.add(entity.id);
      setConnectedEntities(connections);
    } else {
      setConnectedEntities(new Set());
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'thinkTank': return <Building2 size={24} />;
      case 'billionaire': return <DollarSign size={24} />;
      case 'media': return <Newspaper size={24} />;
      default: return null;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'thinkTank': return 'from-blue-500 to-blue-700';
      case 'billionaire': return 'from-orange-500 to-orange-700';
      case 'media': return 'from-green-500 to-green-700';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const isEntityHighlighted = (entityId) => {
    if (!hoveredEntity) return true;
    return connectedEntities.has(entityId);
  };

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="card bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-700">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher une entité, un nom, une entreprise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-white text-gray-900'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setSelectedCategory('thinkTank')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === 'thinkTank'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              Think Tanks
            </button>
            <button
              onClick={() => setSelectedCategory('billionaire')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === 'billionaire'
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              Milliardaires
            </button>
            <button
              onClick={() => setSelectedCategory('media')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === 'media'
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              Médias
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-700 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{data.thinkTanks.length}</div>
              <div className="text-blue-100">Think Tanks</div>
            </div>
            <Building2 size={48} className="opacity-50" />
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-orange-500 to-orange-700 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{data.billionaires.length}</div>
              <div className="text-orange-100">Milliardaires</div>
            </div>
            <DollarSign size={48} className="opacity-50" />
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-green-500 to-green-700 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{data.media.length}</div>
              <div className="text-green-100">Médias</div>
            </div>
            <Newspaper size={48} className="opacity-50" />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEntities.map((entity, index) => (
          <div
            key={entity.id}
            className={`card cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
              isEntityHighlighted(entity.id) ? 'opacity-100' : 'opacity-30'
            }`}
            style={{
              animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
            }}
            onMouseEnter={() => handleEntityHover(entity)}
            onMouseLeave={() => handleEntityHover(null)}
            onClick={() => onEntitySelect(entity)}
          >
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getCategoryColor(entity.category)}`} />
            
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${getCategoryColor(entity.category)} text-white`}>
                {getCategoryIcon(entity.category)}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1 leading-tight">{entity.name}</h3>
                {entity.category === 'thinkTank' && entity.orientation && (
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {entity.orientation}
                  </span>
                )}
                {entity.category === 'billionaire' && entity.fortune && (
                  <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                    {entity.fortune.split('(')[0]}
                  </span>
                )}
                {entity.category === 'media' && entity.category && (
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    {entity.category}
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-3 mb-3">
              {entity.description}
            </p>
            
            {/* Connection indicators */}
            <div className="flex gap-2 flex-wrap">
              {entity.fundedBy && entity.fundedBy.length > 0 && (
                <span className="text-xs px-2 py-1 bg-orange-50 text-orange-600 rounded-full flex items-center gap-1">
                  <DollarSign size={12} />
                  {entity.fundedBy.length} financeur{entity.fundedBy.length > 1 ? 's' : ''}
                </span>
              )}
              {entity.mediaOwned && entity.mediaOwned.length > 0 && (
                <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full flex items-center gap-1">
                  <Newspaper size={12} />
                  {entity.mediaOwned.length} média{entity.mediaOwned.length > 1 ? 's' : ''}
                </span>
              )}
              {entity.mediaPresence && entity.mediaPresence.length > 0 && (
                <span className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full flex items-center gap-1">
                  <Radio size={12} />
                  {entity.mediaPresence.length} présence{entity.mediaPresence.length > 1 ? 's' : ''}
                </span>
              )}
              {entity.ownedBy && entity.ownedBy.length > 0 && (
                <span className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded-full flex items-center gap-1">
                  <Users size={12} />
                  {entity.ownedBy.length} propriétaire{entity.ownedBy.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200">
              <button className={`text-sm font-medium bg-gradient-to-r ${getCategoryColor(entity.category)} bg-clip-text text-transparent`}>
                Voir les détails →
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEntities.length === 0 && (
        <div className="card text-center py-12">
          <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Aucune entité ne correspond à votre recherche</p>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
