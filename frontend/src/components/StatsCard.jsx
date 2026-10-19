export default function StatsCard({ title, value, subtitle, icon: Icon, color = "blue" }) {
  const colorClasses = {
    blue: {
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-400/40 hover:border-blue-400/70",
      glow: "hover:shadow-blue-500/20",
      icon: "bg-blue-500/20 text-blue-400",
      text: "text-blue-300"
    },
    green: {
      gradient: "from-green-500/20 to-emerald-500/20",
      border: "border-green-400/40 hover:border-green-400/70",
      glow: "hover:shadow-green-500/20",
      icon: "bg-green-500/20 text-green-400",
      text: "text-green-300"
    },
    purple: {
      gradient: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-400/40 hover:border-purple-400/70",
      glow: "hover:shadow-purple-500/20",
      icon: "bg-purple-500/20 text-purple-400",
      text: "text-purple-300"
    },
    orange: {
      gradient: "from-orange-500/20 to-red-500/20",
      border: "border-orange-400/40 hover:border-orange-400/70",
      glow: "hover:shadow-orange-500/20",
      icon: "bg-orange-500/20 text-orange-400",
      text: "text-orange-300"
    }
  };

  const colors = colorClasses[color];
  
  return (
    <div className={`group relative overflow-hidden rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${colors.glow}`}>
      {/* Glow effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-50 blur-xl transition duration-500 ${colors.gradient}"></div>
      
      <div className={`relative card bg-gradient-to-br ${colors.gradient} backdrop-blur-xl border-2 ${colors.border} transition-all duration-500`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className={`text-sm font-semibold ${colors.text} mb-3 uppercase tracking-wide`}>
              {title}
            </div>
            <div className="text-3xl md:text-4xl font-black text-white mb-2 transition-all duration-300 group-hover:scale-110 origin-left">
              {value}
            </div>
            {subtitle && (
              <div className="text-sm text-blue-200 opacity-80">
                {subtitle}
              </div>
            )}
          </div>
          {Icon && (
            <div className={`p-3 rounded-xl ${colors.icon} transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110`}>
              <Icon size={28} />
            </div>
          )}
        </div>

        {/* Animated border shine */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-xl animate-border-shine"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes border-shine {
          0% {
            background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
            transform: translateX(-100%);
          }
          100% {
            background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
            transform: translateX(100%);
          }
        }

        .animate-border-shine {
          animation: border-shine 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
