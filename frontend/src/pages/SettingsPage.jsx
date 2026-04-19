import React, { useState } from 'react';
import { Save, CheckCircle2, X } from 'lucide-react';
import AlertConfigCard from '../components/settings/AlertConfigCard';
import NotificationSettings from '../components/settings/NotificationSettings';
import SystemModeSelect from '../components/settings/SystemModeSelect';
import PollingSelector from '../components/settings/PollingSelector';
import UserInfoCard from '../components/settings/UserInfoCard';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    currentThreshold: 250,
    leakageThreshold: 50,
    tiltSensitivity: true,
    smsAlerts: true,
    emailAlerts: false,
    soundAlert: true,
    systemMode: 'auto',
    pollingInterval: '5',
  });

  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    // Simulate API call
    console.log('Saving settings:', settings);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="p-8 pb-32 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-10 animate-in fade-in slide-in-from-top duration-700">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
          System <span className="text-primary italic">Settings</span>
        </h1>
        <p className="text-text-secondary/70 font-medium">Configure real-time monitoring, alert thresholds, and operational behavior</p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Alerts & Mode (Heavy) */}
        <div className="lg:col-span-8 space-y-8">
          <AlertConfigCard settings={settings} setSettings={setSettings} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SystemModeSelect settings={settings} setSettings={setSettings} />
            <PollingSelector settings={settings} setSettings={setSettings} />
          </div>
        </div>

        {/* Right Column: Notifications & User (Sidebars) */}
        <div className="lg:col-span-4 space-y-8">
          <NotificationSettings settings={settings} setSettings={setSettings} />
          <UserInfoCard />
        </div>

      </div>

      {/* Sticky Save Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xl">
        <div className="bg-card shadow-2xl shadow-black/80 border border-white/10 rounded-2xl p-4 flex items-center justify-between backdrop-blur-xl bg-opacity-90">
          <div className="hidden sm:flex flex-col gap-0.5 ml-4">
            <span className="text-xs font-black text-text-secondary/30 uppercase tracking-widest">Awaiting Commit</span>
            <span className="text-xs text-text-secondary/60 font-semibold">Changes pending application</span>
          </div>
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary/90 text-white font-black rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Save size={18} />
            Commit Configuration
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-8 right-8 z-[100] animate-in slide-in-from-right fade-in duration-300">
          <div className="bg-success text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/20">
            <div className="bg-white/20 p-2 rounded-lg">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="font-bold text-sm leading-none mb-1">Success!</p>
              <p className="text-xs font-medium opacity-90 text-white/80">Settings saved and synced successfully.</p>
            </div>
            <button 
              onClick={() => setShowToast(false)}
              className="ml-4 hover:bg-white/10 p-1 rounded-md transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
