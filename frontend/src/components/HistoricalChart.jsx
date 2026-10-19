import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function HistoricalChart({ data }) {
  const formatYAxis = (value) => {
    return `${(value / 1000000000000).toFixed(1)}T €`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/95 backdrop-blur-xl border border-blue-400/30 rounded-lg p-4 shadow-2xl">
          <p className="text-blue-300 font-bold mb-2">Année {label}</p>
          <p className="text-white text-lg font-semibold">
            {(payload[0].value / 1000000000000).toFixed(2)} billions €
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="card bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl border-2 border-blue-400/30 hover:border-blue-400/50 transition-all duration-500">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-2xl">📈</span>
        Évolution de la dette publique (2014-2023)
      </h3>
      
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="year" 
            stroke="#94a3b8"
            style={{ fontSize: '14px', fontWeight: 'bold' }}
          />
          <YAxis 
            tickFormatter={formatYAxis} 
            stroke="#94a3b8"
            style={{ fontSize: '14px', fontWeight: 'bold' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="debt" 
            stroke="#ef4444" 
            strokeWidth={3}
            fill="url(#colorDebt)"
            dot={{ fill: '#ef4444', r: 6, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 8, fill: '#fca5a5', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="group p-5 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-105">
          <div className="text-sm font-semibold text-blue-300 mb-2 uppercase tracking-wide">Augmentation 2014-2023</div>
          <div className="text-3xl font-black text-white mb-1">
            +{((data[data.length - 1].debt - data[0].debt) / 1000000000000).toFixed(1)}T €
          </div>
          <div className="text-sm text-blue-200">
            soit +{(((data[data.length - 1].debt - data[0].debt) / data[0].debt) * 100).toFixed(1)}%
          </div>
        </div>
        
        <div className="group p-5 bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl border border-orange-400/30 hover:border-orange-400/60 transition-all duration-300 hover:scale-105">
          <div className="text-sm font-semibold text-orange-300 mb-2 uppercase tracking-wide">Pic COVID-19 (2020)</div>
          <div className="text-3xl font-black text-white mb-1">+270 Mds €</div>
          <div className="text-sm text-orange-200">
            La plus forte hausse annuelle
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <p className="text-sm text-blue-200">
          <span className="font-semibold text-blue-300">Sources :</span> INSEE, Banque de France, Ministère de l'Économie. 
          Données consolidées de la dette publique au sens de Maastricht.
        </p>
      </div>
    </div>
  );
}
