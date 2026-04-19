import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, AlertCircle, History, Zap, Settings, HelpCircle } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Alerts', path: '/alerts', icon: <AlertCircle size={20} /> },
    { name: 'History', path: '/history', icon: <History size={20} /> },
    { name: 'Pole P12', path: '/pole/P12', icon: <Zap size={20} /> },
  ];

  return (
    <aside className="w-64 h-screen bg-card border-r border-white/5 flex flex-col sticky top-0 overflow-y-auto">
      {/* Logo Section */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
          <Zap size={22} className="text-white fill-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight leading-none">GridSight</h2>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary italic">OS v1.0</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`
            }
          >
            <span className="shrink-0">{item.icon}</span>
            <span className="font-semibold text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/5 space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) => 
            `flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 group ${
              isActive 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
            }`
          }
        >
          <Settings size={18} /> <span className="text-sm font-medium">Settings</span>
        </NavLink>
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all text-sm font-medium">
          <HelpCircle size={18} /> Support
        </button>
      </div>

      {/* System Status Footnote */}
      <div className="p-6">
        <div className="bg-background/50 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-success glow-green-static"></div>
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">System Online</span>
          </div>
          <div className="text-[9px] text-text-secondary/50 font-medium">
            Node: GRID-WEST-12
          </div>
        </div>
      </div>
    </aside>
  );
}
