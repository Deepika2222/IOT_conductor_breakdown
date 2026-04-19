import React, { useState, useEffect } from 'react';
import SummaryCards from '../components/history/SummaryCards';
import FiltersBar from '../components/history/FiltersBar';
import ChartCard from '../components/history/ChartCard';
import InsightsPanel from '../components/history/InsightsPanel';
import { Download, Share2, Loader2 } from 'lucide-react';
import { fetchHistory, fetchStatus } from '../services/api';

export default function HistoryPage() {
  const [chartData, setChartData] = useState([]);
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [history, status] = await Promise.all([
          fetchHistory(),
          fetchStatus('P12')
        ]);

        const formattedHistory = history.map(h => ({
          time: new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          current: h.current,
          voltage: h.voltage,
          tilt: h.tilt
        }));

        setChartData(formattedHistory);
        setSummaryData({
          avgCurrent: history.reduce((acc, h) => acc + h.current, 0) / (history.length || 1),
          avgVoltage: history.reduce((acc, h) => acc + h.voltage, 0) / (history.length || 1),
          maxTilt: Math.max(...history.map(h => h.tilt), 0),
          faults: status.status === 'FAULT' ? 1 : 0
        });
      } catch (err) {
        console.error('Failed to load history:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-primary mb-4" size={48} />
        <p className="text-content/40 font-bold uppercase tracking-widest text-xs">Analyzing Grid History...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-text-primary p-6 md:p-10 font-sans selection:bg-primary/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-1 bg-primary rounded-full"></div>
              <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase italic">Intelligence Monitoring</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-3">
              History & Analysis
            </h1>
            <p className="text-text-secondary text-lg">
              Analyze system behavior and detect patterns with <span className="text-primary font-medium italic">Advanced AI Diagnostics</span>.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all text-sm font-semibold shadow-layered group">
              <Share2 size={16} className="text-text-secondary group-hover:text-primary transition-colors" /> Share Report
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white shadow-[0_10px_20px_-5px_rgba(220,38,235,0.4)] hover:shadow-[0_15px_25px_-5px_rgba(220,38,235,0.5)] transition-all hover:-translate-y-0.5 text-sm font-bold">
              <Download size={16} /> Export CSV
            </button>
          </div>
        </header>

        {/* Global Controls */}
        <FiltersBar />

        {/* Top Summary Row */}
        <SummaryCards data={summaryData} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Charts Column (Larger) */}
          <div className="lg:col-span-2 space-y-6">
            <ChartCard 
              title="Current Consumption vs Time"
              data={chartData}
              type="line"
              dataKey="current"
              color="#DC2626"
              unit="Amps"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartCard 
                title="Line Voltage Variance"
                data={chartData}
                type="line"
                dataKey="voltage"
                color="#F59E0B"
                unit="V"
              />
              <ChartCard 
                title="Tilt & Impact Events"
                data={chartData.filter(d => d.tilt > 0)}
                type="scatter"
                dataKey="tilt"
                color="#F87171"
                unit="Pulse"
              />
            </div>
          </div>

          {/* Insights Panel (Sidebar style on large screens) */}
          <div className="lg:col-span-1">
            <InsightsPanel />
          </div>

        </div>

        {/* Footer Polish */}
        <footer className="mt-12 flex items-center justify-between border-t border-white/5 pt-6 text-[10px] text-text-secondary/30 font-bold uppercase tracking-[0.2em]">
          <div>System Integrity: {summaryData?.faults > 0 ? 'Degraded' : '99.8% Optimized'}</div>
          <div>© 2026 GridSight Industrial OS</div>
          <div className="flex items-center gap-2">
            Status <div className={`w-2 h-2 rounded-full ${summaryData?.faults > 0 ? 'bg-danger glow-red-pulse' : 'bg-success glow-green-static'}`}></div>
          </div>
        </footer>
      </div>
    </div>
  );
}
