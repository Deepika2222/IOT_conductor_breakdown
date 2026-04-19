import React from 'react';
import { Bell, MessageSquare, Mail, Volume2 } from 'lucide-react';

const NotificationSettings = ({ settings, setSettings }) => {
  const toggleSetting = (name) => {
    setSettings(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const options = [
    { 
      id: 'smsAlerts', 
      label: 'SMS Alerts', 
      desc: 'Instant text alerts for critical failures', 
      icon: <MessageSquare size={18} />, 
      color: 'text-primary' 
    },
    { 
      id: 'emailAlerts', 
      label: 'Email Alerts', 
      desc: 'Detailed status reports and fault logs', 
      icon: <Mail size={18} />, 
      color: 'text-success' 
    },
    { 
      id: 'soundAlert', 
      label: 'Sound Alert', 
      desc: 'Browser notification sound on detection', 
      icon: <Volume2 size={18} />, 
      color: 'text-warning' 
    },
  ];

  return (
    <div className="bg-card border border-white/5 rounded-[16px] p-6 shadow-layered">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Bell size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Notifications</h3>
          <p className="text-xs text-text-secondary/50">Manage system alert delivery channels</p>
        </div>
      </div>

      <div className="space-y-4">
        {options.map((opt) => (
          <div key={opt.id} className="flex items-center justify-between p-4 bg-background/30 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg bg-white/5 ${opt.color}`}>
                {opt.icon}
              </div>
              <div className="flex flex-col gap-0.5">
                <label className="text-sm font-semibold text-white/80">
                  {opt.label}
                </label>
                <p className="text-[11px] text-white/40">{opt.desc}</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting(opt.id)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                settings[opt.id] ? 'bg-primary' : 'bg-white/10'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  settings[opt.id] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;
