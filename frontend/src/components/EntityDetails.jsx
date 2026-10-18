import { X, ExternalLink, Building2, DollarSign, Newspaper } from 'lucide-react';

export default function EntityDetails({ entity, data, onClose }) {
  if (!entity) return null;
  
  const getEntityType = (id) => {
    if (id.startsWith('tt')) return 'thinkTank';
    if (id.startsWith('b')) return 'billionaire';
    if (id.startsWith('m')) return 'media';
    return null;
  };
  
  const type = getEntityType(entity.id);
  
  const getRelatedEntities = () => {
    const related = {
      funders: [],
      media: [],
      thinkTanks: [],
      ownedMedia: []
    };
    
    if (type === 'thinkTank') {
      related.funders = entity.fundedBy.map(id => 
        data.billionaires.find(b => b.id === id)
      ).filter(Boolean);
      
      related.media = entity.mediaPresence.map(id => 
        data.media.find(m => m.id === id)
      ).filter(Boolean);
    }
    
    if (type === 'billionaire') {
      related.ownedMedia = entity.mediaOwned.map(id => 
        data.media.find(m => m.id === id)
      ).filter(Boolean);
      
      related.thinkTanks = data.thinkTanks.filter(tt => 
        tt.fundedBy.includes(entity.id)
      );
    }
    
    if (type === 'media') {
      related.funders = entity.ownedBy.map(id => 
        data.billionaires.find(b => b.id === id)
      ).filter(Boolean);
      
      related.thinkTanks = data.thinkTanks.filter(tt => 
        tt.mediaPresence.includes(entity.id)
      );
    }
    
    return related;
  };
  
  const related = getRelatedEntities();
  
  const getIcon = () => {
    if (type === 'thinkTank') return <Building2 className="text-blue-600" size={32} />;
    if (type === 'billionaire') return <DollarSign className="text-orange-600" size={32} />;
    if (type === 'media') return <Newspaper className="text-green-600" size={32} />;
    return null;
  };
  
  const getColorClass = () => {
    if (type === 'thinkTank') return 'bg-blue-50 border-blue-300';
    if (type === 'billionaire') return 'bg-orange-50 border-orange-300';
    if (type === 'media') return 'bg-green-50 border-green-300';
    return 'bg-gray-50 border-gray-300';
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className={`sticky top-0 p-6 border-b-2 ${getColorClass()}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              {getIcon()}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{entity.name}</h2>
                {entity.orientation && (
                  <span className="text-sm text-gray-600 italic">{entity.orientation}</span>
                )}
                {entity.category && (
                  <span className="text-sm text-gray-600 italic">{entity.category}</span>
                )}
                {entity.sector && (
                  <span className="text-sm text-gray-600 italic">{entity.sector}</span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700">{entity.description}</p>
          </div>
          
          {/* Think Tank specific */}
          {type === 'thinkTank' && (
            <>
              {entity.keyFigures && entity.keyFigures.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Figures clés</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {entity.keyFigures.map((figure, idx) => (
                      <li key={idx}>{figure}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {related.funders.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Financeurs / Soutiens</h3>
                  <div className="space-y-2">
                    {related.funders.map(funder => (
                      <div key={funder.id} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="font-medium text-gray-900">{funder.name}</div>
                        <div className="text-sm text-gray-600">{funder.fortune} - {funder.sector}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {related.media.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Présence médiatique</h3>
                  <div className="flex flex-wrap gap-2">
                    {related.media.map(m => (
                      <span key={m.id} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {m.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          
          {/* Billionaire specific */}
          {type === 'billionaire' && (
            <>
              {entity.fortune && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Fortune estimée</h3>
                  <p className="text-2xl font-bold text-orange-600">{entity.fortune}</p>
                </div>
              )}
              
              {related.ownedMedia.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Médias contrôlés</h3>
                  <div className="space-y-2">
                    {related.ownedMedia.map(m => (
                      <div key={m.id} className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="font-medium text-gray-900">{m.name}</div>
                        <div className="text-sm text-gray-600">{m.category}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {related.thinkTanks.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Think Tanks financés</h3>
                  <div className="flex flex-wrap gap-2">
                    {related.thinkTanks.map(tt => (
                      <span key={tt.id} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {tt.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          
          {/* Media specific */}
          {type === 'media' && (
            <>
              {related.funders.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Propriétaires</h3>
                  <div className="space-y-2">
                    {related.funders.map(funder => (
                      <div key={funder.id} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="font-medium text-gray-900">{funder.name}</div>
                        <div className="text-sm text-gray-600">{funder.fortune}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {related.thinkTanks.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Think Tanks présents</h3>
                  <div className="flex flex-wrap gap-2">
                    {related.thinkTanks.map(tt => (
                      <span key={tt.id} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {tt.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          
          {/* Sources note */}
          <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Sources :</span> Informations compilées à partir de rapports 
              publics, articles de presse, sites officiels des organisations et données du Registre des 
              représentants d'intérêts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
