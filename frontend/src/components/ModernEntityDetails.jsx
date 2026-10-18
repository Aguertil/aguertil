import { X, ExternalLink, Building2, DollarSign, Newspaper, AlertTriangle, Users, Link as LinkIcon, TrendingUp, Radio } from 'lucide-react';

export default function ModernEntityDetails({ entity, data, onClose }) {
  if (!entity) return null;
  
  const getCategoryInfo = () => {
    if (entity.category === 'thinkTank') {
      return {
        icon: <Building2 size={32} />,
        color: 'blue',
        gradient: 'from-blue-500 to-blue-700',
        label: 'Think Tank'
      };
    } else if (entity.category === 'billionaire') {
      return {
        icon: <DollarSign size={32} />,
        color: 'orange',
        gradient: 'from-orange-500 to-orange-700',
        label: 'Milliardaire / Groupe'
      };
    } else if (entity.category === 'media') {
      return {
        icon: <Newspaper size={32} />,
        color: 'green',
        gradient: 'from-green-500 to-green-700',
        label: 'Média'
      };
    }
  };

  const categoryInfo = getCategoryInfo();

  const getRelatedEntities = () => {
    const related = {
      funders: [],
      media: [],
      thinkTanks: [],
      ownedMedia: []
    };
    
    if (entity.category === 'thinkTank') {
      related.funders = entity.fundedBy?.map(id => 
        data.billionaires.find(b => b.id === id)
      ).filter(Boolean) || [];
      
      related.media = entity.mediaPresence?.map(id => 
        data.media.find(m => m.id === id)
      ).filter(Boolean) || [];
    }
    
    if (entity.category === 'billionaire') {
      related.ownedMedia = entity.mediaOwned?.map(id => 
        data.media.find(m => m.id === id)
      ).filter(Boolean) || [];
      
      related.thinkTanks = data.thinkTanks.filter(tt => 
        tt.fundedBy?.includes(entity.id)
      );
    }
    
    if (entity.category === 'media') {
      related.funders = entity.ownedBy?.map(id => 
        data.billionaires.find(b => b.id === id)
      ).filter(Boolean) || [];
      
      related.thinkTanks = data.thinkTanks.filter(tt => 
        tt.mediaPresence?.includes(entity.id)
      );
    }
    
    return related;
  };

  const related = getRelatedEntities();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${categoryInfo.gradient} text-white p-6 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 opacity-10">
            <div className="text-9xl">{categoryInfo.icon}</div>
          </div>
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                {categoryInfo.icon}
              </div>
              <div>
                <div className="text-sm opacity-80 mb-1">{categoryInfo.label}</div>
                <h2 className="text-3xl font-bold mb-2">{entity.name}</h2>
                {entity.orientation && (
                  <span className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                    {entity.orientation}
                  </span>
                )}
                {entity.sector && (
                  <span className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                    {entity.sector}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Description */}
          <div className="card bg-gray-50">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <TrendingUp size={20} />
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">{entity.description}</p>
          </div>

          {/* Think Tank Specific */}
          {entity.category === 'thinkTank' && (
            <>
              {entity.budget && (
                <div className="card bg-blue-50 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-2">Budget annuel</h3>
                  <p className="text-2xl font-bold text-blue-700">{entity.budget}</p>
                </div>
              )}

              {entity.keyFigures && entity.keyFigures.length > 0 && (
                <div className="card">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Users size={20} />
                    Figures clés
                  </h3>
                  <ul className="space-y-2">
                    {entity.keyFigures.map((figure, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">▸</span>
                        <span className="text-gray-700">{figure}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {related.funders.length > 0 && (
                <div className="card">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <DollarSign size={20} />
                    Financeurs identifiés
                  </h3>
                  <div className="space-y-3">
                    {related.funders.map(funder => (
                      <div key={funder.id} className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                        <div className="font-bold text-gray-900">{funder.name}</div>
                        <div className="text-sm text-orange-700 mt-1">{funder.fortune}</div>
                        <div className="text-sm text-gray-600 mt-1">{funder.sector}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {related.media.length > 0 && (
                <div className="card">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Radio size={20} />
                    Présence médiatique régulière
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {related.media.map(m => (
                      <div key={m.id} className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium border border-green-300">
                        {m.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {entity.politicalLinks && entity.politicalLinks.length > 0 && (
                <div className="card bg-purple-50 border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                    <LinkIcon size={20} />
                    Liens politiques
                  </h3>
                  <ul className="space-y-2">
                    {entity.politicalLinks.map((link, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-purple-800">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>{link}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {entity.controversies && entity.controversies.length > 0 && (
                <div className="card bg-red-50 border-red-200">
                  <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                    <AlertTriangle size={20} />
                    Controverses & Critiques
                  </h3>
                  <ul className="space-y-2">
                    {entity.controversies.map((controversy, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-red-800">
                        <span className="text-red-500 mt-1">⚠</span>
                        <span>{controversy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Billionaire Specific */}
          {entity.category === 'billionaire' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {entity.fortune && (
                  <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-200">
                    <h3 className="font-bold text-orange-900 mb-2 text-sm">Fortune estimée</h3>
                    <p className="text-2xl font-bold text-orange-700">{entity.fortune.split('(')[0]}</p>
                  </div>
                )}
                
                {entity.sector && (
                  <div className="card bg-gradient-to-br from-blue-50 to-purple-50 border-purple-200">
                    <h3 className="font-bold text-purple-900 mb-2 text-sm">Secteur d'activité</h3>
                    <p className="text-lg font-bold text-purple-700">{entity.sector}</p>
                  </div>
                )}
              </div>

              {entity.companies && entity.companies.length > 0 && (
                <div className="card">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Building2 size={20} />
                    Entreprises contrôlées
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {entity.companies.map((company, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg font-medium text-sm border border-gray-300">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {related.ownedMedia.length > 0 && (
                <div className="card">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Newspaper size={20} />
                    Médias possédés ou contrôlés
                  </h3>
                  <div className="space-y-3">
                    {related.ownedMedia.map(m => (
                      <div key={m.id} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <div className="font-bold text-gray-900">{m.name}</div>
                        <div className="text-sm text-green-700 mt-1">{m.category}</div>
                        {m.audience && (
                          <div className="text-sm text-gray-600 mt-1">📊 {m.audience}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {related.thinkTanks.length > 0 && (
                <div className="card">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <DollarSign size={20} />
                    Think Tanks financés
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {related.thinkTanks.map(tt => (
                      <div key={tt.id} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium border border-blue-300">
                        {tt.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {entity.politicalLinks && entity.politicalLinks.length > 0 && (
                <div className="card bg-purple-50 border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                    <LinkIcon size={20} />
                    Liens politiques
                  </h3>
                  <ul className="space-y-2">
                    {entity.politicalLinks.map((link, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-purple-800">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>{link}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {entity.familyLinks && entity.familyLinks.length > 0 && (
                <div className="card bg-pink-50 border-pink-200">
                  <h3 className="font-bold text-pink-900 mb-3 flex items-center gap-2">
                    <Users size={20} />
                    Liens familiaux et réseaux d'influence
                  </h3>
                  <ul className="space-y-2">
                    {entity.familyLinks.map((link, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-pink-800 font-medium">
                        <span className="text-pink-500 mt-1">👥</span>
                        <span>{link}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {entity.thinkTankLinks && entity.thinkTankLinks.length > 0 && (
                <div className="card bg-indigo-50 border-indigo-200">
                  <h3 className="font-bold text-indigo-900 mb-3">Liens avec Think Tanks</h3>
                  <ul className="space-y-2">
                    {entity.thinkTankLinks.map((link, idx) => (
                      <li key={idx} className="text-indigo-800">• {link}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Media Specific */}
          {entity.category === 'media' && (
            <>
              {entity.audience && (
                <div className="card bg-purple-50 border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-2">Audience</h3>
                  <p className="text-lg font-bold text-purple-700">{entity.audience}</p>
                </div>
              )}

              {entity.editorialLine && (
                <div className="card bg-blue-50 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-2">Ligne éditoriale</h3>
                  <p className="text-blue-800">{entity.editorialLine}</p>
                </div>
              )}

              {related.funders.length > 0 && (
                <div className="card">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <DollarSign size={20} />
                    Propriétaires / Actionnaires
                  </h3>
                  <div className="space-y-3">
                    {related.funders.map(funder => (
                      <div key={funder.id} className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                        <div className="font-bold text-gray-900">{funder.name}</div>
                        <div className="text-sm text-orange-700 mt-1">{funder.fortune}</div>
                        <div className="text-sm text-gray-600 mt-1">{funder.sector}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {related.thinkTanks.length > 0 && (
                <div className="card">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Radio size={20} />
                    Think Tanks présents régulièrement
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {related.thinkTanks.map(tt => (
                      <div key={tt.id} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium border border-blue-300">
                        {tt.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Sources */}
          <div className="card bg-gray-50 border-gray-300">
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Sources :</span> Données compilées à partir de rapports publics, 
              articles de presse vérifiés (Le Monde, Mediapart, Les Échos), registres officiels (HATVP, AMF, Arcom), 
              et sites officiels des organisations. Dernière mise à jour: Octobre 2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
