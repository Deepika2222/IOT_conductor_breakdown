import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export default function SystemStatus({ status = 'NORMAL', faultType = null, lastUpdated = 'Just now' }) {
  const isNormal = status === 'NORMAL';

  return (
    <div 
      className={`w-full rounded-[16px] p-6 transition-all duration-500 border ${
        isNormal 
          ? 'bg-card border-success/20 glow-green-static' 
          : 'bg-gradient-fault border-primary/40 glow-red-pulse text-white'
      }`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${isNormal ? 'bg-success/20 text-success' : 'bg-white/20 text-white'}`}>
            {isNormal ? <CheckCircle2 size={32} /> : <AlertTriangle size={32} />}
          </div>
          <div>
            <h2 className="text-[2.5rem] font-black leading-none uppercase tracking-tighter">
              {status}
            </h2>
            <p className={`${isNormal ? 'text-text-secondary/60' : 'text-white/60'} font-black text-[9px] uppercase tracking-[0.3em] mt-1`}>
              Grid Security Status
            </p>
          </div>
        </div>

        {!isNormal && faultType && (
          <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20 flex items-center justify-center">
            <span className="text-white font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              Fault Type: {faultType}
            </span>
          </div>
        )}

        <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border shadow-inner ${
          isNormal 
            ? 'bg-background/50 text-text-secondary/40 border-white/5' 
            : 'bg-black/40 text-white/50 border-white/10'
        }`}>
          <Clock size={12} className="opacity-50" />
          <span>Last Sync: {lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}
