import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  MapPin, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Thermometer, 
  Navigation,
  Clock,
  History as HistoryIcon,
  Search,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Info
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// --- Dummy Data ---
const MOCK_POLE_DATA = {
  id: 'P12',
  location: 'Downtown District • Sec-4B',
  coordinates: '28.6139° N, 77.2090° E',
  status: 'FAULT',
  health: 68,
  lastMaintenance: '2024-03-15',
  totalFaults: 14,
  avgVoltage: 238
};

const CHART_DATA = [
  { time: '10:00', current: 45, voltage: 235, tilt: 2 },
  { time: '10:10', current: 52, voltage: 240, tilt: 2.1 },
  { time: '10:20', current: 120, voltage: 180, tilt: 5.4 }, // Anomaly
  { time: '10:30', current: 85, voltage: 210, tilt: 4.8 },
  { time: '10:40', current: 48, voltage: 238, tilt: 2.3 },
  { time: '10:50', current: 46, voltage: 241, tilt: 2.2 },
  { time: '11:00', current: 45, voltage: 242, tilt: 2.1 },
];

const FAULT_HISTORY = [
  { id: 1, type: 'Voltage Drop', timestamp: '2024-04-19 10:20', severity: 'High', status: 'Active', color: 'danger' },
  { id: 2, type: 'Heavy Tilt', timestamp: '2024-04-18 14:05', severity: 'Medium', status: 'Resolved', color: 'warning' },
  { id: 3, type: 'Short Circuit', timestamp: '2024-04-15 08:30', severity: 'High', status: 'Resolved', color: 'danger' },
  { id: 4, type: 'Maintenance Check', timestamp: '2024-04-10 11:00', severity: 'Low', status: 'Resolved', color: 'success' },
];

const EVENT_TIMELINE = [
  { time: '10:20 AM', event: 'Critical voltage drop detected(180V)', icon: <Zap size={14} />, color: 'danger' },
  { time: '10:15 AM', event: 'Abnormal tilt oscillation (5.4°)', icon: <Navigation size={14} />, color: 'warning' },
  { time: '09:00 AM', event: 'Daily system diagnostic complete', icon: <CheckCircle2 size={14} />, color: 'success' },
];

// --- Components ---

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-white/10 p-3 rounded-xl shadow-2xl backdrop-blur-md">
        <p className="text-content/50 text-[10px] font-bold uppercase mb-1">{label}</p>
        <p className="text-white font-bold text-lg">
          {payload[0].value} <span className="text-[10px] font-normal text-content/60">{payload[0].unit}</span>
        </p>
      </div>
    );
  }
  return null;
};

const SensorCard = ({ title, value, unit, icon, color, trend }) => (
  <div className="bg-card border border-white/5 p-6 rounded-[var(--rounded-card)] relative overflow-hidden group hover:border-primary/30 transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}/10 text-${color}`}>
        {icon}
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
        <span className="text-[10px] font-bold text-content/40 tracking-widest uppercase">Live</span>
      </div>
    </div>
    <div>
      <h4 className="text-content/50 text-xs font-semibold uppercase tracking-wider mb-1">{title}</h4>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
        <span className="text-content/40 font-medium text-sm">{unit}</span>
      </div>
    </div>
    {trend && (
      <div className={`mt-4 flex items-center gap-1 text-xs font-bold ${trend > 0 ? 'text-success' : 'text-danger'}`}>
        {trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {Math.abs(trend)}% from avg
      </div>
    )}
    {/* Decorative gradient */}
    <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-${color}/5 rounded-full blur-2xl group-hover:bg-${color}/10 transition-colors`}></div>
  </div>
);

const ChartSection = ({ title, data, dataKey, color, unit }) => (
  <div className="bg-card border border-white/5 p-6 rounded-[var(--rounded-card)] h-[300px] flex flex-col">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full bg-${color}`}></div>
        {title}
      </h3>
      <div className="flex gap-2">
        {['1H', '24H', '7D'].map(range => (
          <button key={range} className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-white/5 text-content/40 hover:text-white hover:bg-white/10 transition-all uppercase">
            {range}
          </button>
        ))}
      </div>
    </div>
    <div className="flex-1 min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={`var(--color-${color})`} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={`var(--color-${color})`} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: 'rgba(255,255,255,0.2)', fontSize: 10}} 
            dy={10}
          />
          <YAxis 
            hide 
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke={`var(--color-${color})`} 
            strokeWidth={3}
            fillOpacity={1} 
            fill={`url(#grad-${dataKey})`} 
            unit={unit}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default function PoleDetailPage() {
  const { id } = useParams();
  const pole = MOCK_POLE_DATA; // In a real app, fetch by id

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      
      {/* Header & Breadcrumbs */}
      <header className="mb-10">
        <nav className="flex items-center gap-2 text-content/40 text-xs font-bold uppercase tracking-widest mb-4">
          <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
          <ChevronRight size={12} />
          <Link to="/history" className="hover:text-primary transition-colors">Poles</Link>
          <ChevronRight size={12} />
          <span className="text-primary italic">Pole {id || pole.id}</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
              Pole <span className="text-primary">{pole.id}</span> Details
            </h1>
            <p className="text-text-secondary font-medium max-w-xl">
              Real-time telemetry, structural health indicators, and historical fault analysis 
              for critical infrastructure monitoring.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all border border-white/5">
              <Search size={18} /> Search Poles
            </button>
            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/20">
              Generate Report
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Info & Stats */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* A. POLE INFO PANEL */}
          <div className="bg-card border border-white/5 rounded-[var(--rounded-card)] overflow-hidden shadow-layered">
            <div className="p-6">
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-white tracking-tight">{pole.id}</h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      pole.status === 'FAULT' ? 'bg-danger/10 text-danger border border-danger/20' : 'bg-success/10 text-success border border-success/20'
                    }`}>
                      {pole.status}
                    </span>
                  </div>
                  <p className="text-content/40 text-sm font-medium flex items-center gap-1.5">
                    <MapPin size={14} /> {pole.location}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  pole.status === 'FAULT' ? 'bg-danger text-white shadow-lg shadow-danger/30' : 'bg-success text-white'
                }`}>
                  {pole.status === 'FAULT' ? <AlertTriangle size={24} /> : <Activity size={24} />}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="aspect-video bg-background rounded-2xl relative overflow-hidden group mb-8 border border-white/5">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center grayscale opacity-10 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"></div>
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="text-[10px] font-bold text-white/50 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 uppercase tracking-tighter">
                    {pole.coordinates}
                  </div>
                  <button className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-transform">
                    <ArrowUpRight size={14} />
                  </button>
                </div>

                {/* Pulse Indicator on Map */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className={`w-4 h-4 rounded-full ${pole.status === 'FAULT' ? 'bg-danger' : 'bg-success'} animate-ping opacity-75`}></div>
                  <div className={`w-4 h-4 rounded-full ${pole.status === 'FAULT' ? 'bg-danger' : 'bg-success'} absolute inset-0 border-2 border-white shadow-lg`}></div>
                </div>
              </div>

              {/* Mini Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="text-content/30 text-[10px] font-bold uppercase mb-1">Total Faults</div>
                  <div className="text-xl font-bold text-white tracking-tight">{pole.totalFaults}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="text-content/30 text-[10px] font-bold uppercase mb-1">Avg Voltage</div>
                  <div className="text-xl font-bold text-white tracking-tight">{pole.avgVoltage}V</div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-white/5 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-content/30 uppercase tracking-widest">Last Maintenance</span>
              <span className="text-xs font-bold text-content/60">{pole.lastMaintenance}</span>
            </div>
          </div>

          {/* Health Indicator (High Impact) */}
          <div className="bg-card border border-white/5 p-6 rounded-[var(--rounded-card)] shadow-layered relative overflow-hidden">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                  <Activity size={16} className="text-primary" />
                  Structure Health
                </h3>
                <Info size={16} className="text-content/20" />
             </div>
             
             <div className="flex items-center gap-6">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      className="text-white/5 stroke-current"
                      strokeWidth="3.5"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={`${pole.health > 80 ? 'text-success' : pole.health > 50 ? 'text-warning' : 'text-danger'} stroke-current`}
                      strokeWidth="3.5"
                      strokeDasharray={`${pole.health}, 100`}
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                    <span className="text-xl font-black text-white">{pole.health}%</span>
                  </div>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold uppercase">
                      <span className="text-content/40 tracking-wider">Stability Index</span>
                      <span className="text-content">92%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-success w-[92%]"></div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold uppercase">
                      <span className="text-content/40 tracking-wider">Load Balance</span>
                      <span className="text-content">42%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[42%]"></div>
                    </div>
                  </div>
                </div>
             </div>
             <p className="mt-6 text-[11px] text-text-secondary/40 font-medium leading-relaxed italic border-t border-white/5 pt-4">
               Health score is calculated based on rolling average of tilt telemetry and voltage drift over the last 30 days.
             </p>
          </div>

          {/* Timeline View (High Impact) */}
          <div className="bg-card border border-white/5 p-6 rounded-[var(--rounded-card)] shadow-layered">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-8">
              <Clock size={16} className="text-primary" />
              Event Timeline
            </h3>
            <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-white/5">
              {EVENT_TIMELINE.map((event, idx) => (
                <div key={idx} className="relative flex items-start gap-4 pl-1">
                  <div className={`shrink-0 w-5 h-5 rounded-full border-4 border-background bg-${event.color} z-10 flex items-center justify-center text-white scale-125`}>
                    {/* {event.icon} */}
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-tighter block mb-0.5">{event.time}</span>
                    <p className={`text-xs font-bold leading-tight ${event.color === 'danger' ? 'text-danger' : 'text-content'}`}>
                      {event.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase text-content/40 hover:text-white transition-all tracking-widest border border-white/5">
              View Full Audit Log
            </button>
          </div>
        </div>

        {/* Right Column: Sensor Data & graphs */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* B1. LIVE VALUES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SensorCard 
              title="Current Consumption" 
              value="45.8" 
              unit="Amps" 
              icon={<Zap size={24} />} 
              color="primary"
              trend={-12}
            />
            <SensorCard 
              title="Line Voltage" 
              value="238" 
              unit="Volts" 
              icon={<HistoryIcon size={24} />} 
              color="danger"
              trend={-8}
            />
            <SensorCard 
              title="Structural Tilt" 
              value="2.1" 
              unit="Degrees" 
              icon={<Navigation size={24} />} 
              color="warning"
              trend={2}
            />
          </div>

          {/* B2. GRAPH SECTION */}
          <div className="grid grid-cols-1 gap-8">
            <ChartSection 
              title="Current Analytics" 
              data={CHART_DATA} 
              dataKey="current" 
              color="primary" 
              unit="A"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ChartSection 
                title="Voltage Drift" 
                data={CHART_DATA} 
                dataKey="voltage" 
                color="danger" 
                unit="V"
              />
              <ChartSection 
                title="Tilt Displacement" 
                data={CHART_DATA} 
                dataKey="tilt" 
                color="warning" 
                unit="°"
              />
            </div>
          </div>

          {/* C. FAULT HISTORY */}
          <div className="bg-card border border-white/5 rounded-[var(--rounded-card)] shadow-layered overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Fault Ledger</h3>
                <p className="text-xs text-content/40 font-medium">Historical fault records for this node</p>
              </div>
              <div className="flex items-center gap-2">
                 <button className="p-2 rounded-lg hover:bg-white/5 text-content/40">
                   <AlertTriangle size={18} />
                 </button>
                 <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5 transition-all">
                  Filter History
                 </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-black text-content/30 uppercase tracking-widest">
                    <th className="px-6 py-4">Anomaly Type</th>
                    <th className="px-6 py-4">Detected On</th>
                    <th className="px-6 py-4">Severity</th>
                    <th className="px-6 py-4">Process Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {FAULT_HISTORY.map((fault) => (
                    <tr key={fault.id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                           <div className={`w-2 h-8 rounded-full bg-${fault.color}`}></div>
                           <span className="font-bold text-white text-sm">{fault.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-xs font-bold text-content/60">{fault.timestamp}</td>
                      <td className="px-6 py-5">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                          fault.severity === 'High' ? 'text-danger' : fault.severity === 'Medium' ? 'text-warning' : 'text-success'
                        }`}>
                          {fault.severity}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-2">
                           <div className={`w-1.5 h-1.5 rounded-full ${fault.status === 'Active' ? 'bg-danger animate-pulse' : 'bg-success'}`}></div>
                           <span className="text-xs font-bold text-content/50">{fault.status}</span>
                         </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-primary/20 text-primary transition-all rounded-lg">
                          <ArrowUpRight size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
