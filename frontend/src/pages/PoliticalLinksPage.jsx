import { useState } from 'react';
import { Search, User, DollarSign, BarChart3, X } from 'lucide-react';
import politicalLinksData from '../data/politicalLinksData.json';

export default function PoliticalLinksPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntity, setSelectedEntity] = useState(null);

  const allEntities = [
    ...politicalLinksData.politicians,
    ...politicalLinksData.billionaires,
    ...politicalLinksData.pollsters
  ];

  const filteredEntities = allEntities.filter(entity => {
    const matchesCategory = selectedCategory === 'all' || entity.type === selectedCategory;
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getEntityById = (id) => {
    return allEntities.find(e => e.id === id);
  };

  const getConnectedEntities = (entity) => {
    if (!entity.connections) return [];
    return entity.connections.map(id => getEntityById(id)).filter(Boolean);
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'politician': return 'from-blue-500/20 to-cyan-500/20 border-blue-400/40';
      case 'billionaire': return 'from-orange-500/20 to-red-500/20 border-orange-400/40';
      case 'pollster': return 'from-purple-500/20 to-pink-500/20 border-purple-400/40';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-400/40';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'politician': return <User className="w-5 h-5" />;
      case 'billionaire': return <DollarSign className="w-5 h-5" />;
      case 'pollster': return <BarChart3 className="w-5 h-5" />;
      default: return null;
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'politician': return 'Politique';
      case 'billionaire': return 'Milliardaire';
      case 'pollster': return 'Institut de sondage';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full mb-6 animate-pulse">
            <User className="w-5 h-5 text-red-400" />
            <span className="text-red-300 font-semibold">Réseau d'influence politique</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400">
              Liens Politiques
            </span>
          </h1>

          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
            Cartographie des connexions entre politiques, milliardaires et instituts de sondage
          </p>

          {/* Explosive Banner */}
          <div className="card bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-xl border-2 border-red-400/40 mb-8">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🔥</div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-white mb-2">Révélations</h3>
                <p className="text-blue-200 text-sm md:text-base">
                  <span className="font-bold text-red-300">Macron</span> connecté à 6 milliardaires et instituts • 
                  <span className="font-bold text-orange-300"> Bolloré</span> lié à 3 ministres • 
                  <span className="font-bold text-yellow-300"> IFOP</span> financé par avocat fiscaliste pro-Fillon
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl border-2 border-blue-400/30 mb-8">
          <div className="space-y-4">
            {/* Category Filter */}
            <div>
              <label className="text-sm font-semibold text-blue-300 mb-2 block">Filtrer par catégorie :</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: 'Tous', count: allEntities.length },
                  { value: 'politician', label: 'Politiques', count: politicalLinksData.politicians.length },
                  { value: 'billionaire', label: 'Milliardaires', count: politicalLinksData.billionaires.length },
                  { value: 'pollster', label: 'Sondages', count: politicalLinksData.pollsters.length }
                ].map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      selectedCategory === cat.value
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-white/10 text-blue-300 hover:bg-white/20'
                    }`}
                  >
                    {cat.label} ({cat.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div>
              <label className="text-sm font-semibold text-blue-300 mb-2 block">Rechercher :</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nom d'un politique, milliardaire ou institut..."
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-blue-400/30 rounded-xl text-white placeholder-blue-300/50 focus:border-blue-400 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-blue-200">
          <span className="font-semibold">{filteredEntities.length}</span> résultat{filteredEntities.length > 1 ? 's' : ''}
        </div>

        {/* Entity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredEntities.map((entity) => (
            <div
              key={entity.id}
              onClick={() => setSelectedEntity(entity)}
              className={`group card bg-gradient-to-br ${getTypeColor(entity.type)} backdrop-blur-xl border-2 hover:scale-105 transition-all duration-500 cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/10 rounded-xl">
                    {getTypeIcon(entity.type)}
                  </div>
                  <div>
                    <div className="text-xs text-blue-300 font-semibold uppercase tracking-wide">
                      {getTypeLabel(entity.type)}
                    </div>
                  </div>
                </div>
                {entity.connections && entity.connections.length > 0 && (
                  <div className="px-3 py-1 bg-red-500/30 rounded-full">
                    <span className="text-xs font-bold text-red-200">
                      {entity.connections.length} lien{entity.connections.length > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-black text-white mb-2">
                {entity.name}
              </h3>

              {entity.party && (
                <div className="text-sm text-blue-300 font-semibold mb-2">{entity.party}</div>
              )}

              {entity.position && (
                <div className="text-sm text-blue-200 mb-3">{entity.position}</div>
              )}

              {entity.company && (
                <div className="text-sm text-orange-300 font-semibold mb-2">{entity.company}</div>
              )}

              {entity.fortune && (
                <div className="text-sm text-yellow-300 font-bold mb-2">💰 {entity.fortune}</div>
              )}

              {entity.founded && (
                <div className="text-sm text-purple-300 mb-2">Fondé en {entity.founded}</div>
              )}

              {entity.connections && entity.connections.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-xs text-blue-300 font-semibold mb-2">Connecté à :</div>
                  <div className="flex flex-wrap gap-2">
                    {entity.connections.slice(0, 3).map(connId => {
                      const connected = getEntityById(connId);
                      return connected ? (
                        <div key={connId} className="text-xs px-2 py-1 bg-white/10 rounded-full text-blue-200">
                          {connected.name.split(' ').pop()}
                        </div>
                      ) : null;
                    })}
                    {entity.connections.length > 3 && (
                      <div className="text-xs px-2 py-1 bg-white/10 rounded-full text-blue-200">
                        +{entity.connections.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedEntity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
               onClick={() => setSelectedEntity(null)}>
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                 onClick={(e) => e.stopPropagation()}>
              <div className={`card bg-gradient-to-br ${getTypeColor(selectedEntity.type)} backdrop-blur-xl border-2`}>
                {/* Close Button */}
                <button
                  onClick={() => setSelectedEntity(null)}
                  className="absolute top-4 right-4 p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-4 bg-white/10 rounded-xl">
                    {getTypeIcon(selectedEntity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-blue-300 font-semibold uppercase tracking-wide mb-2">
                      {getTypeLabel(selectedEntity.type)}
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">{selectedEntity.name}</h2>
                    
                    {selectedEntity.party && (
                      <div className="inline-block px-3 py-1 bg-blue-500/30 rounded-full text-blue-200 text-sm font-semibold mb-2">
                        {selectedEntity.party}
                      </div>
                    )}
                    
                    {selectedEntity.position && (
                      <div className="text-blue-200">{selectedEntity.position}</div>
                    )}
                    
                    {selectedEntity.company && (
                      <div className="text-orange-300 font-semibold">{selectedEntity.company}</div>
                    )}
                    
                    {selectedEntity.fortune && (
                      <div className="text-yellow-300 font-bold text-lg">💰 {selectedEntity.fortune}</div>
                    )}
                  </div>
                </div>

                {/* Details */}
                {selectedEntity.details && (
                  <div className="space-y-4">
                    {selectedEntity.details.currentRole && (
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-sm font-semibold text-blue-300 mb-1">Fonction actuelle</div>
                        <div className="text-white">{selectedEntity.details.currentRole}</div>
                      </div>
                    )}

                    {selectedEntity.details.wealth && (
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-sm font-semibold text-blue-300 mb-1">Patrimoine</div>
                        <div className="text-white">{selectedEntity.details.wealth}</div>
                      </div>
                    )}

                    {selectedEntity.details.previousJobs && (
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-sm font-semibold text-blue-300 mb-1">Parcours</div>
                        <div className="text-white">{selectedEntity.details.previousJobs}</div>
                      </div>
                    )}

                    {selectedEntity.details.politicalLeanings && (
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-sm font-semibold text-blue-300 mb-1">Orientation politique</div>
                        <div className="text-white">{selectedEntity.details.politicalLeanings}</div>
                      </div>
                    )}

                    {selectedEntity.details.mediaOwnership && (
                      <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-400/30">
                        <div className="text-sm font-semibold text-orange-300 mb-1">Médias possédés</div>
                        <div className="text-white">{selectedEntity.details.mediaOwnership}</div>
                      </div>
                    )}

                    {selectedEntity.details.mainClients && (
                      <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-400/30">
                        <div className="text-sm font-semibold text-purple-300 mb-1">Principaux clients</div>
                        <div className="text-white">{selectedEntity.details.mainClients}</div>
                      </div>
                    )}

                    {/* Connections */}
                    {selectedEntity.connections && selectedEntity.connections.length > 0 && (
                      <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                        <div className="text-sm font-semibold text-blue-300 mb-3">
                          Connexions ({selectedEntity.connections.length})
                        </div>
                        <div className="space-y-3">
                          {getConnectedEntities(selectedEntity).map(conn => (
                            <div key={conn.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                              <div className="p-2 bg-white/10 rounded-lg">
                                {getTypeIcon(conn.type)}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-white">{conn.name}</div>
                                <div className="text-xs text-blue-300">{getTypeLabel(conn.type)}</div>
                                {selectedEntity.details.links && selectedEntity.details.links[conn.id] && (
                                  <div className="text-sm text-blue-200 mt-1">
                                    → {selectedEntity.details.links[conn.id]}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Controversies */}
                    {selectedEntity.details.controversies && selectedEntity.details.controversies.length > 0 && (
                      <div className="p-4 bg-red-500/10 rounded-lg border border-red-400/30">
                        <div className="text-sm font-semibold text-red-300 mb-3">⚠️ Controverses</div>
                        <ul className="space-y-2">
                          {selectedEntity.details.controversies.map((controversy, idx) => (
                            <li key={idx} className="text-sm text-blue-200 flex items-start gap-2">
                              <span className="text-red-400">•</span>
                              <span>{controversy}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="card bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border-2 border-blue-400/30">
          <h3 className="text-xl font-bold text-white mb-4">📚 Sources et méthodologie</h3>
          <div className="space-y-2 text-blue-200 text-sm">
            <p>
              <span className="font-semibold text-blue-300">Sources : </span>
              Déclarations d'intérêts HATVP, presse (Le Monde, Mediapart, Canard Enchaîné), rapports publics
            </p>
            <p>
              <span className="font-semibold text-blue-300">Note : </span>
              Les liens répertoriés sont publics ou documentés par la presse. Cette cartographie vise à rendre visible les connexions entre pouvoir politique, économique et médiatique.
            </p>
            <p className="text-xs italic">
              💡 {politicalLinksData.note}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
