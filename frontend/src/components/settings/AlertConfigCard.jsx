import React from 'react';
import { Activity, Zap, Move } from 'lucide-react';

const AlertConfigCard = ({ settings, setSettings }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="bg-card border border-white/5 rounded-[16px] p-6 shadow-layered">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Activity size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Alert Configuration</h3>
          <p className="text-xs text-content/50">Configure monitoring and fault threshold triggers</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Current Threshold */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-content/80 flex items-center gap-2">
              <Zap size={14} className="text-primary" />
              Current Threshold
            </label>
            <span className="text-xs font-mono bg-white/5 px-2 py-0.5 rounded text-primary">ACTIVE</span>
          </div>
          <div className="relative group">
            <input
              type="number"
              name="currentThreshold"
              value={settings.currentThreshold}
              onChange={handleChange}
              className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all font-mono"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary/30 font-bold">A</div>
          </div>
          <p className="text-[11px] text-text-secondary/40 leading-relaxed">
            Trigger breakdown alert if conductor current exceeds this value for more than 500ms.
          </p>
        </div>

        {/* Leakage Threshold */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-text-secondary/80 flex items-center gap-2">
            <Zap size={14} className="text-warning" />
            Leakage Threshold
          </label>
          <div className="relative group">
            <input
              type="number"
              name="leakageThreshold"
              value={settings.leakageThreshold}
              onChange={handleChange}
              className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-warning/50 transition-all font-mono"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary/30 font-bold">mA</div>
          </div>
          <p className="text-[11px] text-text-secondary/40 leading-relaxed">
            Threshold for ground leakage detection. High values may indicate insulator failure.
          </p>
        </div>

        {/* Tilt Sensitivity */}
        <div className="flex items-center justify-between p-4 bg-background/30 rounded-2xl border border-white/5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-text-secondary/80 flex items-center gap-2">
              <Move size={14} className="text-success" />
              Tilt Sensitivity
            </label>
            <p className="text-[11px] text-text-secondary/40">Enable vibration and pole tilt anomalous detection</p>
          </div>
          <button
            onClick={() => setSettings(prev => ({ ...prev, tiltSensitivity: !prev.tiltSensitivity }))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
              settings.tiltSensitivity ? 'bg-primary' : 'bg-white/10'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                settings.tiltSensitivity ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertConfigCard;
