import { Zap, Activity, Navigation2 } from 'lucide-react';

function SensorCard({ icon: Icon, value, label, unit, colorClass, borderClass }) {
  return (
    <div className={`bg-card rounded-[20px] p-6 shadow-layered relative overflow-hidden group border-t-2 ${borderClass} backdrop-blur-xl transition-all hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-6">
        <div className={`p-3 rounded-xl bg-background/50 shadow-inner border border-white/5 ${colorClass}`}>
          <Icon size={24} />
        </div>
        <div className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px] ${colorClass.replace('text-', 'bg-')}`}></div>
      </div>
      
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-white tracking-tight">{value}</span>
          <span className="text-text-secondary/50 font-bold text-sm tracking-tighter">{unit}</span>
        </div>
        <p className="text-text-secondary/40 mt-2 uppercase text-[10px] font-black tracking-[0.2em]">{label}</p>
      </div>

      <div className={`absolute bottom-0 left-0 w-full h-1 ${colorClass.replace('text-', 'bg-')} opacity-20 group-hover:opacity-100 transition-opacity duration-500`}></div>
    </div>
  );
}

export default function LiveSensorGrid({ data }) {
  // Expected data structure: { current: 120, voltage: 240, tilt: 4 }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SensorCard 
        icon={Zap} 
        value={data.current} 
        label="Primary Current" 
        unit="Amps" 
        colorClass="text-primary"
        borderClass="border-primary/40"
      />
      <SensorCard 
        icon={Activity} 
        value={data.voltage} 
        label="Line Voltage" 
        unit="Volts" 
        colorClass="text-success"
        borderClass="border-success/40"
      />
      <SensorCard 
        icon={Navigation2} 
        value={data.tilt} 
        label="Stabilization Tilt" 
        unit="Degrees" 
        colorClass="text-warning"
        borderClass="border-warning/40"
      />
    </div>
  );
}
