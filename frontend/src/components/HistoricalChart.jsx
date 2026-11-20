import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { milliards, nombre } from '../data/format';

function Infobulle({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: '#fff', border: '2px solid #000', padding: '8px 10px', fontFamily: 'var(--titre)' }}>
      <strong>Fin {label}</strong>
      <div>{milliards(d.debt)}</div>
      <div style={{ color: '#5c5c5c' }}>{String(d.gdpPercent).replace('.', ',')} % du PIB</div>
    </div>
  );
}

export default function HistoricalChart({ data }) {
  const premier = data[0];
  const dernier = data[data.length - 1];
  const hausse = dernier.debt - premier.debt;
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#e3e3e3" />
            <XAxis dataKey="year" tickLine={false} axisLine={{ stroke: '#000' }} tick={{ fill: '#000', fontSize: 13, fontFamily: 'Archivo' }} />
            <YAxis tickFormatter={(v) => nombre(v / 1e9)} width={52} tickLine={false} axisLine={false} tick={{ fill: '#5c5c5c', fontSize: 13, fontFamily: 'Archivo' }} />
            <Tooltip content={<Infobulle />} cursor={{ fill: '#f2f2f2' }} />
            <Bar dataKey="debt" fill="#000" maxBarSize={38} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="source" style={{ marginTop: 8 }}>
        Dette publique en fin d'année, en milliards d'euros. Entre {premier.year} et {dernier.year}, elle a augmenté de {milliards(hausse)} (+{nombre(((hausse / premier.debt) * 100))} %). Source : Insee.
      </figcaption>
    </figure>
  );
}
