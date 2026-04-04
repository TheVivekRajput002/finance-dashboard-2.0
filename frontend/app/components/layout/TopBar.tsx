'use client';

import { Bell } from 'lucide-react';
import { useFinanceStore } from '../../store/useFinanceStore';
import type { Role } from '../../types';

export default function TopBar() {
  const { role, setRole } = useFinanceStore();

  const handleRoleToggle = (newRole: Role) => setRole(newRole);

  return (
    <header className="fixed top-0 left-0 md:left-72 right-0 z-30 px-4 md:px-6 py-3">
      <div className="glass-topbar rounded-2xl px-4 md:px-6 py-2.5 flex items-center justify-between shadow-sm border border-white/30">
        {/* Brand – mobile only */}
        <div className="md:hidden">
          <span className="font-black text-lg text-blue-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Clerio
          </span>
        </div>

        <div className="hidden md:block" />

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Role Toggle */}
          <div className="flex items-center bg-surface-container rounded-full p-1 border border-outline-variant/20">
            <button
              onClick={() => handleRoleToggle('viewer')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                role === 'viewer'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Viewer
            </button>
            <button
              onClick={() => handleRoleToggle('admin')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                role === 'admin'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Role badge */}
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            <span className={`w-1.5 h-1.5 rounded-full ${role === 'admin' ? 'bg-primary' : 'bg-tertiary'}`} />
            {role === 'admin' ? 'Admin Mode' : 'Viewer Mode'}
          </span>

          {/* Notifications */}
          <button className="p-2 rounded-full text-on-surface-variant hover:bg-white/50 transition-all relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error border-2 border-white" />
          </button>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-primary-container flex items-center justify-center text-white text-xs font-bold shadow-md border-2 border-white">
            VR
          </div>
        </div>
      </div>
    </header>
  );
}
