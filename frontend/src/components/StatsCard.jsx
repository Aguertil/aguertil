export default function StatsCard({ title, value, subtitle, icon: Icon, color = "blue" }) {
  const colorClasses = {
    blue: "from-blue-50 to-blue-100 border-blue-300 text-blue-900",
    green: "from-green-50 to-green-100 border-green-300 text-green-900",
    purple: "from-purple-50 to-purple-100 border-purple-300 text-purple-900",
    orange: "from-orange-50 to-orange-100 border-orange-300 text-orange-900"
  };
  
  return (
    <div className={`card bg-gradient-to-br ${colorClasses[color]} border-2`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-sm font-medium opacity-80 mb-2">{title}</div>
          <div className="text-3xl font-bold mb-1">{value}</div>
          {subtitle && <div className="text-sm opacity-70">{subtitle}</div>}
        </div>
        {Icon && (
          <div className="ml-4">
            <Icon size={32} className="opacity-60" />
          </div>
        )}
      </div>
    </div>
  );
}
