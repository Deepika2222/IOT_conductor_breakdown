import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2, X } from 'lucide-react';

import AlertConfigCard from '../components/settings/AlertConfigCard';
import NotificationSettings from '../components/settings/NotificationSettings';
import SystemModeSelect from '../components/settings/SystemModeSelect';
import PollingSelector from '../components/settings/PollingSelector';
import UserInfoCard from '../components/settings/UserInfoCard';
import { fetchSettings, updateSettings } from '../services/settingsService';

const DEFAULT_SETTINGS = {
  currentThreshold: 250,
  leakageThreshold: 50,
  tiltSensitivity: true,
  smsAlerts: true,
  emailAlerts: false,
  soundAlert: true,
  systemMode: 'auto',
  pollingInterval: '5',
};

const SettingsPage = () => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('iot_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetchSettings();
        if (res.success && res.data) {
          setSettings(res.data);
          localStorage.setItem('iot_settings', JSON.stringify(res.data));
        }
      } catch {
        console.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    localStorage.setItem('iot_settings', JSON.stringify(settings));
    try {
      const res = await updateSettings(settings);

      if (res.success) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        alert('Failed to save settings');
      }
    } catch {
      console.error('Error saving settings');
      alert('Failed to save settings');
    }
  };

  if (loading) {
    return <div className="text-white p-10">Loading settings...</div>;
  }

  return (
    <div className="p-8 pb-32 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white">
          System <span className="text-primary italic">Settings</span>
        </h1>
        <p className="text-text-secondary/70">
          Configure monitoring & alerts
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-8 space-y-8">
          <AlertConfigCard settings={settings} setSettings={setSettings} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SystemModeSelect settings={settings} setSettings={setSettings} />
            <PollingSelector settings={settings} setSettings={setSettings} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4 space-y-8">
          <NotificationSettings settings={settings} setSettings={setSettings} />
          <UserInfoCard />
        </div>

      </div>

      {/* SAVE BAR */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-xl">
        <div className="bg-card rounded-2xl p-4 flex justify-between items-center">

          <span className="text-xs text-gray-400">
            Changes pending
          </span>

          <button
            onClick={handleSave}
            className="px-6 py-3 bg-red-600 text-white rounded-xl"
          >
            <Save size={18} /> Save
          </button>

        </div>
      </div>

      {/* SUCCESS TOAST */}
      {showToast && (
        <div className="fixed top-8 right-8 bg-green-600 text-white p-4 rounded-xl flex gap-3">
          <CheckCircle2 />
          Settings Saved!
          <button onClick={() => setShowToast(false)}>
            <X />
          </button>
        </div>
      )}

    </div>
  );
};

export default SettingsPage;
