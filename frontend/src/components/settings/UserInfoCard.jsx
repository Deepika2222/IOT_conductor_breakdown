import React from 'react';
import { User, ShieldCheck, Fingerprint } from 'lucide-react';

const UserInfoCard = () => {
  const userInfo = {
    name: 'Operator 042',
    role: 'Lead System Engineer',
    systemId: 'GS-OS-X12-B2',
    lastLogin: '2026-04-19 14:32:10',
  };

  return (
    <div className="bg-card border border-white/5 rounded-[16px] p-6 shadow-layered">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <User size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Operator Info</h3>
          <p className="text-xs text-text-secondary/50">Current session and authority details</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-background/50 rounded-2xl border border-white/5">
          <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center border border-white/10 text-white font-bold text-lg shadow-inner">
            OP
          </div>
          <div>
            <h4 className="text-sm font-bold text-white leading-none mb-1">{userInfo.name}</h4>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-success uppercase tracking-widest">
              <ShieldCheck size={10} />
              {userInfo.role}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-xl border border-white/5">
            <span className="text-[10px] font-bold text-text-secondary/30 uppercase tracking-widest flex items-center gap-1.5">
              <Fingerprint size={12} /> System ID
            </span>
            <span className="text-xs font-mono text-text-secondary font-bold">{userInfo.systemId}</span>
          </div>
          <p className="text-[9px] text-center text-text-secondary/20 mt-2 italic px-4">
            Security clearance level 4 confirmed. All actions on this terminal are logged and encrypted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
