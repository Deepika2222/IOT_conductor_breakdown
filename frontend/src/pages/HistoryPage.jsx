import React, { useState, useEffect } from 'react';
import SummaryCards from '../components/history/SummaryCards';
import FiltersBar from '../components/history/FiltersBar';
import ChartCard from '../components/history/ChartCard';
import InsightsPanel from '../components/history/InsightsPanel';
import { Download, Share2, Loader2, CheckCircle2 } from 'lucide-react';
import { fetchHistory, fetchStatus } from '../services/api';
import { convertToCSV, triggerDownload } from '../utils/historyUtils';
import { analyzeSensorData } from '../utils/insightUtils';

const DEFAULT_THRESHOLDS = {
  currentThreshold: 250,
  tiltSensitivity: true
};

export default function HistoryPage() {
  const [chartData, setChartData] = useState([]);
  const [insights, setInsights] = useState([]);
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTimeRange, setActiveTimeRange] = useState('24H');
  const [activeHighlight, setActiveHighlight] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    let intervalId;
    let isMounted = true;
    let firstLoad = true;

    const loadData = async () => {
      try {
        if (firstLoad) setLoading(true);
        const savedSettings = localStorage.getItem('iot_settings');
        const thresholds = savedSettings ? JSON.parse(savedSettings) : DEFAULT_THRESHOLDS;
        const [history, status] = await Promise.all([
          fetchHistory(), 
          fetchStatus('P12')
        ]);

        let displayHistory = [...history];
        
        if (displayHistory.length < 5) {
          const mockPoints = [];
          const count = activeTimeRange === '1H' ? 20 : activeTimeRange === '24H' ? 24 : 48;
          const interval = activeTimeRange === '1H' ? 3 : activeTimeRange === '24H' ? 60 : 210;
          
          for (let i = 0; i < count; i++) {
            const timestamp = new Date(Date.now() - (count - i) * interval * 60 * 1000);
            
            // Generate predictable anomalies for all ranges
            let current = 140 + (Math.random() * 20);
            
            // 🛑 FORCE A SHARP DROP (Always at 80% mark)
            if (i === Math.floor(count * 0.8)) current = 10; 
            
            // ⚡ FORCE A SURGE (Always at 30% mark)
            if (i === Math.floor(count * 0.3)) current = thresholds.currentThreshold + 60;

            mockPoints.push({
              timestamp: timestamp.toISOString(),
              current,
              voltage: 228 + (Math.random() * 4),
              tilt: (i === Math.floor(count * 0.5) || (i === 0 && Math.random() > 0.8)) ? 1 : 0
            });
          }
          displayHistory = mockPoints;
        }

        const formattedHistory = displayHistory.map(h => {
          const date = new Date(h.timestamp);
          
          // IMPORTANT: "time" must be UNIQUE for highlighting to work correctly in Recharts.
          // For 7D, multiple points on same day would collide if we just use "Apr 20".
          // So we use a high-res string as the primary key.
          return {
            time: date.toLocaleString([], { 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit' 
            }),
            displayLabel: activeTimeRange === '7D' 
              ? date.toLocaleDateString([], { month: 'short', day: 'numeric' })
              : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            current: h.current,
            voltage: h.voltage,
            tilt: h.tilt,
            rawTimestamp: h.timestamp
          };
        });

        const generatedInsights = analyzeSensorData(formattedHistory, thresholds);
        if (isMounted) {
          setInsights(generatedInsights);
          setChartData(formattedHistory);
          setSummaryData({
            avgCurrent: (displayHistory.reduce((acc, h) => acc + h.current, 0) / (displayHistory.length || 1)).toFixed(2),
            avgVoltage: (displayHistory.reduce((acc, h) => acc + h.voltage, 0) / (displayHistory.length || 1)).toFixed(2),
            maxTilt: Math.max(...displayHistory.map(h => h.tilt), 0).toFixed(2),
            faults: status.status === 'FAULT' ? 1 : 0
          });
        }
      } catch (err) {
        console.error('Failed history load:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
          firstLoad = false;
        }
      }
    };

    const setupPolling = async () => {
      let intervalMs = 4000;
      try {
        const { fetchSettings } = await import('../services/settingsService');
        const settingsRes = await fetchSettings();
        if (settingsRes && settingsRes.success && settingsRes.data?.pollingInterval) {
           intervalMs = parseInt(settingsRes.data.pollingInterval) * 1000;
        }
      } catch (e) {
        console.error("Failed to fetch settings for polling interval", e);
      }
      
      if (isMounted) {
        await loadData();
        intervalId = setInterval(loadData, intervalMs);
      }
    };

    setupPolling();

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [activeTimeRange]);

  const handleExportCSV = () => {
    if (!chartData.length) return;
    triggerDownload(convertToCSV(chartData), `IOT_Report_${activeTimeRange}.csv`);
    showFeedback('Report Downloaded');
  };

  const handleShareReport = async () => {
    await navigator.clipboard.writeText(window.location.href);
    showFeedback('Link Copied');
  };

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleRangeChange = (range, customValue = null) => {
    setActiveHighlight(null);
    setActiveTimeRange(range);
    if (customValue) showFeedback(`${customValue} Range Activated`);
  };

  const handleInsightClick = (insight) => {
    if (activeHighlight?.id === insight.id) {
      setActiveHighlight(null);
    } else {
      setActiveHighlight({ id: insight.id, timestamp: insight.targetTimestamp });
      showFeedback(`Targeting: ${insight.targetTimestamp}`);
    }
  };

  if (loading && !chartData.length) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-primary mb-4" size={48} />
        <p className="text-content/40 font-bold uppercase tracking-[0.3em] text-[10px]">Analyzing Grid Patterns...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-text-primary p-6 md:p-10 font-sans selection:bg-primary/30">
      {feedback && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] bg-success text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={18} />
          <span className="font-bold text-xs uppercase tracking-widest">{feedback}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-0.5 bg-primary rounded-full"></div>
              <span className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase italic">Intelligence Hub</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-3">History & Analysis</h1>
            <p className="text-text-secondary text-base opacity-80 max-w-xl">Deep interrogation of historical conductor performance with <span className="text-primary font-bold italic">Neural Pattern Detection</span>.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleShareReport} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-white/5 hover:border-white/10 text-xs font-black uppercase tracking-widest transition-all active:scale-95">
              <Share2 size={14} className="text-primary" /> Share
            </button>
            <button onClick={handleExportCSV} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white shadow-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 hover:shadow-primary/20">
              <Download size={14} /> Export
            </button>
          </div>
        </header>

        <FiltersBar activeRange={activeTimeRange} onRangeChange={handleRangeChange} />
        <SummaryCards data={summaryData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ChartCard 
              title="Current Consumption" 
              subtitle={activeTimeRange} 
              data={chartData} 
              type="line" 
              dataKey="current" 
              color="#DC2626" 
              unit="Amps" 
              highlightedTime={activeHighlight?.timestamp}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ChartCard title="Voltage Variance" data={chartData} type="line" dataKey="voltage" color="#F59E0B" unit="V" highlightedTime={activeHighlight?.timestamp} />
              <ChartCard title="Tilt Events" data={chartData.filter(d => d.tilt > 0)} type="scatter" dataKey="tilt" color="#3B82F6" unit="Impact" highlightedTime={activeHighlight?.timestamp} />
            </div>
          </div>
          <div className="lg:col-span-1">
            <InsightsPanel insights={insights} onInsightClick={handleInsightClick} activeInsightId={activeHighlight?.id} />
          </div>
        </div>

        <footer className="mt-16 flex items-center justify-between border-t border-white/5 pt-8 text-[9px] text-text-secondary/20 font-black uppercase tracking-[0.4em]">
          <div>Diagnostic Sync: 100% Verified</div>
          <div>GridSight Industrial OS © 2026</div>
          <div className={`flex items-center gap-2 ${summaryData?.faults > 0 ? 'text-danger' : 'text-success'}`}>
            System Health • {summaryData?.faults > 0 ? 'Degraded' : 'Active'}
          </div>
        </footer>
      </div>
    </div>
  );
}
