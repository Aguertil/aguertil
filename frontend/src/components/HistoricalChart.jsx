import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function HistoricalChart({ data }) {
  const formatYAxis = (value) => {
    return `${(value / 1000000000000).toFixed(1)}T €`;
  };
  
  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Évolution de la dette publique (2014-2023)
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip
            formatter={(value, name) => {
              if (name === 'Dette') {
                return `${(value / 1000000000000).toFixed(2)} billions €`;
              }
              return `${value.toFixed(1)}%`;
            }}
            labelFormatter={(label) => `Année ${label}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="debt" 
            stroke="#dc2626" 
            strokeWidth={3}
            name="Dette"
            dot={{ fill: '#dc2626', r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm font-medium text-blue-900 mb-1">Augmentation 2014-2023</div>
          <div className="text-2xl font-bold text-blue-700">
            +{((data[data.length - 1].debt - data[0].debt) / 1000000000000).toFixed(1)}T €
          </div>
          <div className="text-sm text-blue-700 mt-1">
            soit +{(((data[data.length - 1].debt - data[0].debt) / data[0].debt) * 100).toFixed(1)}%
          </div>
        </div>
        
        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="text-sm font-medium text-orange-900 mb-1">Pic COVID-19 (2020)</div>
          <div className="text-2xl font-bold text-orange-700">+270 Mds €</div>
          <div className="text-sm text-orange-700 mt-1">
            La plus forte hausse annuelle
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Sources :</span> INSEE, Banque de France, Ministère de l'Économie. 
          Données consolidées de la dette publique au sens de Maastricht.
        </p>
      </div>
    </div>
  );
}
