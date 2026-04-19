import { Activity, MapPin } from 'lucide-react';

function PoleCard({ id, status }) {
  const isNormal = status === 'NORMAL';
  
  return (
    <div className="bg-background/40 hover:bg-white/5 cursor-pointer transition-all rounded-xl p-4 border border-white/5 hover:border-white/10 flex items-center gap-4 group">
      <div className="relative">
        <div className={`w-2.5 h-2.5 rounded-full ${isNormal ? 'bg-success glow-green-static' : 'bg-primary glow-red-pulse'}`}></div>
        {!isNormal && (
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75"></div>
        )}
      </div>
      
      <div className="flex-grow">
        <h4 className="text-white font-bold text-sm tracking-wide">POLE {id}</h4>
        <p className="text-[10px] text-text-secondary/50 font-mono mt-0.5">Sector 7G</p>
      </div>
      
      <div className={`p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${isNormal ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
        <Activity size={16} />
      </div>
    </div>
  );
}

export default function PoleGrid({ poles }) {
  return (
    <div className="bg-card rounded-[20px] shadow-layered border border-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary border border-primary/20">
            <MapPin size={18} />
          </div>
          <h3 className="text-white font-bold tracking-tight">Live Grid Overview</h3>
        </div>
        <div className="text-[10px] text-text-secondary/60 font-black uppercase tracking-[0.2em] bg-white/5 px-3 py-1 rounded-full">
          Online: {poles.filter(p => p.status === 'NORMAL').length}/{poles.length}
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {poles.map((pole) => (
          <PoleCard key={pole.id} id={pole.id} status={pole.status} />
        ))}
      </div>
    </div>
  );
}
