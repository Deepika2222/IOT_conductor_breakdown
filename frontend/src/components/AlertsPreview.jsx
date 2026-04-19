import { ArrowRight, Bell } from 'lucide-react';

export default function AlertsPreview({ alerts }) {
  const getSeverityStyles = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
      case 'high':
        return 'bg-[#DC2626]/20 text-[#DC2626] border-[#DC2626]/30';
      case 'warning':
      case 'medium':
        return 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/30';
      default:
        return 'bg-[#2563EB]/20 text-[#2563EB] border-[#2563EB]/30';
    }
  };

  return (
    <div className="bg-card rounded-[20px] shadow-layered border border-white/5 flex flex-col h-full backdrop-blur-xl">
      <div className="flex items-center justify-between p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Bell size={18} className="text-text-secondary/50" />
          <h3 className="text-white font-bold tracking-tight">Recent Alerts</h3>
        </div>
        <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/80 flex items-center gap-2 transition-all">
          View All <ArrowRight size={14} />
        </button>
      </div>
      
      <div className="flex-grow p-6 space-y-4">
        {alerts.length === 0 ? (
          <div className="h-full flex items-center justify-center text-text-secondary/30 text-xs font-bold uppercase tracking-widest">
            No recent alerts
          </div>
        ) : (
          alerts.slice(0, 3).map((alert, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-2xl bg-background/40 hover:bg-background/80 transition-all duration-300 border border-white/5 hover:border-white/10 group cursor-pointer">
              <div className="flex-shrink-0 mt-1">
                <div className={`w-2 h-2 rounded-full ${alert.severity === 'CRITICAL' ? 'bg-primary glow-red-pulse' : 'bg-white/20'}`}></div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1.5">
                  <h4 className="text-sm font-bold text-white tracking-tight">{alert.type}</h4>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-lg border uppercase tracking-wider ${getSeverityStyles(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-xs text-text-secondary/60 leading-relaxed">{alert.message}</p>
                <div className="mt-3 text-[10px] text-text-secondary/30 font-black uppercase tracking-widest">
                  {alert.timestamp}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
