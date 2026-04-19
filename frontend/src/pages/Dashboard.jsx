import { useState, useEffect } from 'react';
import SystemStatus from '../components/SystemStatus';
import LiveSensorGrid from '../components/LiveSensorGrid';
import MiniGraphPanel from '../components/MiniGraphPanel';
import AlertsPreview from '../components/AlertsPreview';
import PoleGrid from '../components/PoleGrid';
import { fetchStatus, fetchAlerts, fetchHistory } from '../services/api';

export default function Dashboard() {
  const [data, setData] = useState({
    status: 'NORMAL',
    faultType: 'None',
    lastUpdated: 'Calculating...',
    sensors: { current: 0, voltage: 0, tilt: 0 },
    history: [],
    alerts: [],
    poles: []
  });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [status, alerts, history] = await Promise.all([
        fetchStatus('P12'),
        fetchAlerts(),
        fetchHistory()
      ]);

      // Map backend data to local state
      setData({
        status: status.status,
        faultType: status.fault_type || 'None',
        lastUpdated: new Date(status.last_updated).toLocaleTimeString(),
        sensors: {
          current: history[history.length - 1]?.current || 0,
          voltage: history[history.length - 1]?.voltage || 0,
          tilt: history[history.length - 1]?.tilt || 0
        },
        history: history.map((h, i) => ({
          time: new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          current: h.current,
          voltage: h.voltage
        })),
        alerts: alerts.map(a => ({
          type: a.type,
          severity: a.type === 'BREAKAGE' ? 'CRITICAL' : 'WARNING',
          message: `Pole ${a.pole_id}: ${a.type} detected.`,
          timestamp: new Date(a.time).toLocaleTimeString()
        })),
        poles: Array.from({ length: 12 }).map((_, i) => ({
          id: `P${i + 1}`,
          status: (i + 1 === 12 && status.status === 'FAULT') ? 'FAULT' : 'NORMAL'
        }))
      });
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 4000); // 4 seconds short polling
    return () => clearInterval(interval);
  }, []);

  if (loading && !data.history.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary font-bold">Initializing GridSight OS...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="mb-8 p-8 bg-card rounded-[32px] border border-white/5 shadow-layered relative overflow-hidden group">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              Live Monitoring <span className="text-primary italic">Dashboard</span>
            </h1>
            <p className="text-text-secondary/40 mt-2 font-black italic uppercase tracking-[0.3em] text-[10px]">Industrial Node: GRID-WEST-12</p>
          </div>
          {/* Subtle background element */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-colors duration-1000"></div>
        </header>

        {/* 1. System Status Panel */}
        <SystemStatus 
          status={data.status} 
          faultType={data.faultType} 
          lastUpdated={data.lastUpdated}
        />

        {/* 2. Live Sensor Data */}
        <LiveSensorGrid data={data.sensors} />

        {/* 3 & 4. Charts and Alerts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto">
          <div className="lg:col-span-2 min-h-[300px]">
            <MiniGraphPanel historyData={data.history} />
          </div>
          <div className="min-h-[300px]">
            <AlertsPreview alerts={data.alerts} />
          </div>
        </div>

        {/* 5. Pole Grid View */}
        <PoleGrid poles={data.poles} />

      </div>
    </div>
  );
}
