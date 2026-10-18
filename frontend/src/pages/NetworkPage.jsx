import { useState } from 'react';
import { Info, AlertTriangle, ExternalLink } from 'lucide-react';
import ModernNetworkViz from '../components/ModernNetworkViz';
import ModernEntityDetails from '../components/ModernEntityDetails';
import networkData from '../data/networkData.json';

export default function NetworkPage() {
  const [selectedEntity, setSelectedEntity] = useState(null);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Cartographie des Influences en France
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explorez les liens entre Think Tanks, Milliardaires et Médias : 
            qui finance, qui possède, qui influence le débat public ?
          </p>
        </div>

        {/* Key Facts Banner */}
        <div className="card bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 border-2 border-orange-300 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-orange-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">💡 Le saviez-vous ?</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span><strong>Emmanuelle Mignon</strong>, vice-présidente de l'Institut Montaigne, est mariée à Yannick Bolloré, neveu de Vincent Bolloré (propriétaire de CNews, Europe 1, Canal+)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span><strong>Nicolas Bazire</strong>, ex-directeur général de LVMH et bras droit de Bernard Arnault, préside le conseil de surveillance de Fondapol</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span><strong>9 milliardaires</strong> contrôlent directement ou indirectement la quasi-totalité des grands médias français</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span>Les think tanks pro-business reçoivent des <strong>millions d'euros par an</strong> des grandes entreprises, souvent sans transparence complète sur les montants</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Main Visualization */}
        <ModernNetworkViz 
          data={networkData} 
          onEntitySelect={setSelectedEntity}
        />
        
        {/* Méthodologie */}
        <div className="mt-8 card bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300">
          <div className="flex items-start space-x-3">
            <Info className="text-blue-600 flex-shrink-0 mt-1" size={24} />
            <div className="text-sm text-gray-700">
              <p className="font-semibold text-gray-900 mb-2 text-lg">
                📚 Méthodologie & Sources
              </p>
              <p className="mb-3">
                Cette cartographie compile des <strong>informations publiques vérifiables</strong> issues de :
              </p>
              <ul className="space-y-1 mb-3">
                <li>• Rapports annuels des think tanks et entreprises</li>
                <li>• Registre de la Haute Autorité pour la Transparence de la Vie Publique (HATVP)</li>
                <li>• Base de données de l'Autorité des Marchés Financiers (AMF)</li>
                <li>• Registre de l'Arcom (ex-CSA) pour les médias audiovisuels</li>
                <li>• Enquêtes de presse vérifiées (Le Monde, Mediapart, Les Échos, etc.)</li>
              </ul>
              <p className="text-xs italic">
                ⚠️ Les liens affichés sont <strong>factuels et documentés</strong>, mais ne préjugent pas de l'indépendance 
                réelle des acteurs ni de la qualité de leurs travaux. Cette visualisation vise à <strong>informer le débat démocratique</strong>, 
                pas à stigmatiser.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-6 card bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300">
          <div className="text-center">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">🔍 Pour aller plus loin</h3>
            <p className="text-gray-700 mb-4">
              Consultez les rapports d'Acrimed, de Reporters sans Frontières, et les registres publics pour vérifier par vous-même.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="https://www.acrimed.org/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2">
                Acrimed <ExternalLink size={16} />
              </a>
              <a href="https://www.hatvp.fr/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                HATVP <ExternalLink size={16} />
              </a>
              <a href="https://rsf.org/fr" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2">
                RSF <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Entity Details Modal */}
      {selectedEntity && (
        <ModernEntityDetails
          entity={selectedEntity}
          data={networkData}
          onClose={() => setSelectedEntity(null)}
        />
      )}
    </div>
  );
}
