import React, { useEffect, useState, useMemo } from 'react';
import { AlertTriangle, MapPin, Clock, Search, Filter, Calendar, Zap, Loader2, Thermometer, ChevronRight } from 'lucide-react';
import { fetchAlerts } from '../services/api';

const ALERT_COLORS = {
  BREAKAGE: 'border-primary/50 bg-gradient-fault text-white glow-red-pulse',
  OVERHEATING: 'border-orange-500/50 bg-orange-500/10 text-orange-400',
  SAG: 'border-warning/50 bg-warning/10 text-warning',
  DEFAULT: 'border-text-secondary/50 bg-text-secondary/10 text-text-secondary'
};

// We create a mock Activity icon here just in case Activity isn't imported from lucide-react correctly.
const Activity = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const ALERT_ICONS = {
  BREAKAGE: <Zap size={20} className="text-red-400" />,
  OVERHEATING: <Thermometer size={20} className="text-orange-400" />,
  SAG: <Activity size={20} className="text-yellow-400" />,
  DEFAULT: <AlertTriangle size={20} className="text-blue-400" />
};


export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [poleFilter, setPoleFilter] = useState('');
  const [dateRange, setDateRange] = useState('ALL');

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        setLoading(true);
        const data = await fetchAlerts();
        // Fallback mock data if API returns an empty array, or just use what api provides.
        if (data.length === 0) {
          setAlerts([
            { id: '1', type: 'BREAKAGE', pole_id: 'P12', time: '2026-04-19T10:05:00Z' },
            { id: '2', type: 'OVERHEATING', pole_id: 'P18', time: '2026-04-19T11:20:00Z' },
            { id: '3', type: 'SAG', pole_id: 'P05', time: new Date(Date.now() - 3600000).toISOString() },
            { id: '4', type: 'BREAKAGE', pole_id: 'P02', time: new Date(Date.now() - 86400000).toISOString() },
          ]);
        } else {
          setAlerts(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAlerts();
  }, []);

  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      let matchesType = typeFilter === 'ALL' || alert.type === typeFilter;
      let matchesPole = poleFilter === '' || alert.pole_id.toLowerCase().includes(poleFilter.toLowerCase());
      
      let matchesDate = true;
      if (dateRange !== 'ALL') {
        const alertDate = new Date(alert.time);
        const now = new Date();
        const diffHours = (now - alertDate) / (1000 * 60 * 60);
        
        if (dateRange === '24H') matchesDate = diffHours <= 24;
        if (dateRange === '7D') matchesDate = diffHours <= 168;
        if (dateRange === '30D') matchesDate = diffHours <= 720;
      }

      return matchesType && matchesPole && matchesDate;
    }).sort((a, b) => new Date(b.time) - new Date(a.time));
  }, [alerts, typeFilter, poleFilter, dateRange]);

  const uniqueFaultTypes = ['ALL', ...new Set(alerts.map(a => a.type))];

  return (
    <div className="min-h-screen p-6 font-sans selection:bg-primary/30">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <AlertTriangle className="text-primary" size={32} />
              System Alerts
            </h1>
            <p className="text-text-secondary mt-1">Monitor electrical grid faults and events in real-time.</p>
          </div>
          <div className="bg-card/80 backdrop-blur-xl border border-white/5 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-black/20">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </div>
            <span className="font-semibold text-text-primary">{alerts.length} Active Events</span>
          </div>
        </header>

        {/* Alerts Layout: Filters (Side) + List (Main) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card/60 backdrop-blur-md rounded-2xl border border-white/5 p-6 shadow-xl sticky top-6">
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <Filter size={20} className="text-primary" />
                <h2 className="text-lg font-semibold text-white">Filters</h2>
              </div>

              {/* Keyword / Pole ID Search */}
              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-text-secondary uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={14} /> Pole ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-text-secondary/50" />
                  </div>
                  <input
                    type="text"
                    value={poleFilter}
                    onChange={(e) => setPoleFilter(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-white/5 rounded-xl leading-5 bg-background/50 text-text-primary placeholder-text-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all sm:text-sm"
                    placeholder="e.g. P12"
                  />
                </div>
              </div>

              {/* Fault Type Filter */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">
                  Fault Type
                </label>
                <div className="flex flex-col gap-2">
                  {uniqueFaultTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setTypeFilter(type)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-200 border ${
                        typeFilter === type 
                          ? 'bg-primary/20 border-primary/50 text-primary font-bold' 
                          : 'bg-background/50 border-white/5 text-text-secondary hover:bg-white/5 hover:text-text-primary'
                      }`}
                    >
                      <span>{type}</span>
                      {typeFilter === type && <div className="w-2 h-2 rounded-full bg-primary glow-red-pulse" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-text-secondary uppercase tracking-wider flex items-center gap-2">
                  <Calendar size={14} /> Time Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="block w-full px-3 py-2 border border-white/5 rounded-xl leading-5 bg-background/50 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all sm:text-sm cursor-pointer appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                >
                  <option value="ALL">All Time</option>
                  <option value="24H">Last 24 Hours</option>
                  <option value="7D">Last 7 Days</option>
                  <option value="30D">Last 30 Days</option>
                </select>
              </div>

            </div>
          </div>

          {/* Alerts List */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="bg-card/40 rounded-2xl border border-white/5 p-12 flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-primary mb-4" size={40} />
                <p className="text-text-secondary animate-pulse">Loading fault data...</p>
              </div>
            ) : error ? (
              <div className="bg-primary/10 border border-primary/50 rounded-2xl p-6 text-center text-primary">
                <AlertTriangle size={48} className="mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Failed to load alerts</h3>
                <p className="text-sm opacity-80">{error}</p>
              </div>
            ) : filteredAlerts.length === 0 ? (
               <div className="bg-card/40 backdrop-blur-sm rounded-2xl border border-white/5 p-12 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center mb-6 border border-white/5 shadow-inner">
                  <CheckCircle size={32} className="text-success" />
                </div>
                <h3 className="text-xl font-medium text-text-primary">No alerts found</h3>
                <p className="text-text-secondary mt-2 text-center max-w-sm">No faults matching your current filter criteria. Adjust your filters or enjoy the peace.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAlerts.map((alert, index) => {
                  const styleClass = ALERT_COLORS[alert.type] || ALERT_COLORS.DEFAULT;
                  const Icon = ALERT_ICONS[alert.type] || ALERT_ICONS.DEFAULT;
                  const date = new Date(alert.time);
                  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  const dateString = date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

                  return (
                    <div 
                      key={alert.id || index}
                      className="group relative overflow-hidden bg-card/40 hover:bg-card/70 backdrop-blur-md rounded-2xl border border-white/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                    >
                      <div className={`absolute top-0 left-0 w-1 h-full ${alert.type === 'BREAKAGE' ? 'bg-primary font-bold' : 'bg-transparent'}`}></div>
                      
                      <div className="p-5 pl-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner transition-transform group-hover:scale-110 duration-500 ${styleClass}`}>
                            {Icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${alert.type === 'BREAKAGE' ? 'bg-primary text-white' : 'bg-white/10 text-text-secondary'}`}>
                                {alert.type}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-white mt-1 group-hover:text-primary transition-colors">
                              System Alert: {alert.type} @ Pole {alert.pole_id}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-text-secondary mt-2">
                              <span className="flex items-center gap-1.5"><MapPin size={14} className="opacity-70"/> Pole {alert.pole_id}</span>
                              <span className="flex items-center gap-1.5"><Clock size={14} className="opacity-70"/> {timeString} - {dateString}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                          <button className="flex items-center gap-1 text-text-secondary hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-sm font-medium border border-white/5">
                            Details <ChevronRight size={16} />
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const CheckCircle = ({size, className}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
)
