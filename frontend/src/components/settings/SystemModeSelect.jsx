import React from 'react';
import { Cpu, ChevronDown } from 'lucide-react';

const SystemModeSelect = ({ settings, setSettings }) => {
  const modes = [
    { value: 'auto', label: 'Auto', desc: 'System decides threshold adjustments based on load' },
    { value: 'manual', label: 'Manual', desc: 'Operator controlled threshold and alert limits' },
  ];

  const currentMode = modes.find(m => m.value === settings.systemMode) || modes[0];

  return (
    <div className="bg-card border border-white/5 rounded-[16px] p-6 shadow-layered">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Cpu size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">System Mode</h3>
          <p className="text-xs text-content/50">Control operational logic and automation</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative group">
          <label className="text-xs font-bold text-text-secondary/30 uppercase tracking-widest mb-1.5 block">
            Operational Mode
          </label>
          <div className="relative">
            <select
              value={settings.systemMode}
              onChange={(e) => setSettings(prev => ({ ...prev, systemMode: e.target.value }))}
              className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-primary/50 transition-all cursor-pointer font-medium pr-10"
            >
              {modes.map((mode) => (
                <option key={mode.value} value={mode.value} className="bg-card">
                  {mode.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary/30 pointer-events-none group-hover:text-text-secondary/60 transition-colors" size={18} />
          </div>
        </div>

        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <p className="text-[11px] text-primary/80 font-medium leading-relaxed">
            <span className="font-bold uppercase mr-1">{settings.systemMode}:</span>
            {currentMode.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemModeSelect;
