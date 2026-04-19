import React from 'react';
import { Timer, Info } from 'lucide-react';

const PollingSelector = ({ settings, setSettings }) => {
  const intervals = [
    { value: '1', label: '1 sec' },
    { value: '5', label: '5 sec' },
    { value: '10', label: '10 sec' },
    { value: '30', label: '30 sec' },
  ];

  return (
    <div className="bg-card border border-white/5 rounded-[16px] p-6 shadow-layered">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Timer size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Polling Interval</h3>
          <p className="text-xs text-content/50">Frequency of telemetry data acquisition</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {intervals.map((int) => (
            <button
              key={int.value}
              onClick={() => setSettings(prev => ({ ...prev, pollingInterval: int.value }))}
              className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                settings.pollingInterval === int.value
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                  : 'bg-background/50 text-text-secondary/40 border-white/5 hover:border-white/10 hover:text-text-primary'
              }`}
            >
              {int.label}
            </button>
          ))}
        </div>

        <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
          <Info size={14} className="text-text-secondary/30 mt-0.5 shrink-0" />
          <p className="text-[10px] text-text-secondary/30 leading-normal">
            Defines how often system fetches sensor data. High frequency (1s) increases network load but provides real-time accuracy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PollingSelector;
