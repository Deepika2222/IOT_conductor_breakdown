import { AlertCircle, Zap, Activity, Navigation } from 'lucide-react';

export default function SummaryCards({ data }) {
  const stats = [
    { label: "Current Readings", value: `${data?.avgCurrent || 0} A`, icon: Activity, color: "text-primary" },
    { label: "Voltage Level", value: `${data?.avgVoltage || 0} V`, icon: Zap, color: "text-warning" },
    { label: "Tilt Angle", value: `${data?.maxTilt || 0}°`, icon: Navigation, color: "text-success" },
    { label: "System Health", value: data?.faults > 0 ? "WARNING" : "OPTIMAL", icon: AlertCircle, color: data?.faults > 0 ? "text-danger" : "text-success" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="bg-card p-4 rounded-card border border-white/5 shadow-layered flex items-center gap-4 transition-transform hover:scale-[1.02] hover:border-white/10 cursor-default group min-w-0">
            <div className={`p-3 rounded-xl bg-white/5 group-hover:bg-opacity-80 transition-colors shrink-0 ${stat.color}`}>
              <Icon size={24} />
            </div>
            <div className="min-w-0 pr-2">
              <p className="text-content/60 text-xs uppercase tracking-wider font-semibold truncate" title={stat.label}>{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1 tracking-tight group-hover:text-white transition-colors truncate" title={stat.value}>{stat.value}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
