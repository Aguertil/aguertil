import { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone';

export default function NetworkGraph({ data, onNodeClick }) {
  const containerRef = useRef(null);
  const networkRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Préparer les nœuds
    const nodes = [
      ...data.thinkTanks.map(tt => ({
        id: tt.id,
        label: tt.name,
        group: 'thinkTank',
        title: tt.description,
        shape: 'box',
        color: {
          background: '#3b82f6',
          border: '#1d4ed8',
          highlight: { background: '#2563eb', border: '#1e40af' }
        }
      })),
      ...data.billionaires.map(b => ({
        id: b.id,
        label: b.name,
        group: 'billionaire',
        title: `${b.name} - ${b.fortune}`,
        shape: 'diamond',
        color: {
          background: '#f59e0b',
          border: '#d97706',
          highlight: { background: '#f59e0b', border: '#b45309' }
        }
      })),
      ...data.media.map(m => ({
        id: m.id,
        label: m.name,
        group: 'media',
        title: m.description,
        shape: 'ellipse',
        color: {
          background: '#10b981',
          border: '#059669',
          highlight: { background: '#059669', border: '#047857' }
        }
      }))
    ];
    
    // Préparer les arêtes
    const edges = [];
    
    // Liens Think Tanks -> Milliardaires
    data.thinkTanks.forEach(tt => {
      tt.fundedBy.forEach(billionaireId => {
        edges.push({
          from: billionaireId,
          to: tt.id,
          color: { color: '#f59e0b' },
          arrows: 'to',
          title: 'Finance'
        });
      });
    });
    
    // Liens Think Tanks -> Médias
    data.thinkTanks.forEach(tt => {
      tt.mediaPresence.forEach(mediaId => {
        edges.push({
          from: tt.id,
          to: mediaId,
          color: { color: '#3b82f6' },
          arrows: 'to',
          dashes: true,
          title: 'Présence médiatique'
        });
      });
    });
    
    // Liens Milliardaires -> Médias
    data.billionaires.forEach(b => {
      b.mediaOwned.forEach(mediaId => {
        edges.push({
          from: b.id,
          to: mediaId,
          color: { color: '#ef4444' },
          arrows: 'to',
          width: 2,
          title: 'Propriétaire'
        });
      });
    });
    
    const graphData = { nodes, edges };
    
    const options = {
      nodes: {
        font: {
          size: 14,
          color: '#ffffff',
          face: 'Arial'
        },
        borderWidth: 2,
        shadow: true,
        margin: 10
      },
      edges: {
        smooth: {
          type: 'continuous'
        },
        width: 1.5
      },
      physics: {
        stabilization: {
          iterations: 200
        },
        barnesHut: {
          gravitationalConstant: -30000,
          centralGravity: 0.3,
          springLength: 150,
          springConstant: 0.04,
          damping: 0.09
        }
      },
      interaction: {
        hover: true,
        tooltipDelay: 200,
        navigationButtons: true,
        keyboard: true
      }
    };
    
    networkRef.current = new Network(containerRef.current, graphData, options);
    
    networkRef.current.on('click', (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        onNodeClick(nodeId);
      }
    });
    
    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
        networkRef.current = null;
      }
    };
  }, [data, onNodeClick]);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-full border-2 border-gray-300 rounded-lg bg-white"
      style={{ minHeight: '600px' }}
    />
  );
}
