'use client';

import { useFinanceStore } from '../../store/useFinanceStore';
import type { Role } from '../../types';
import { Shield, Eye } from 'lucide-react';

export default function RoleToggle() {
  const { role, setRole } = useFinanceStore();

  const toggle = (r: Role) => setRole(r);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center bg-surface-container rounded-full p-1 border border-outline-variant/20 shadow-inner">
        <button
          onClick={() => toggle('viewer')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
            role === 'viewer'
              ? 'bg-white text-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <Eye size={11} />
          Viewer
        </button>
        <button
          onClick={() => toggle('admin')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
            role === 'admin'
              ? 'bg-primary text-white shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <Shield size={11} />
          Admin
        </button>
      </div>

      {/* Status badge */}
      <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-semibold text-on-surface-variant uppercase tracking-widest">
        <span
          className={`w-1.5 h-1.5 rounded-full animate-pulse ${
            role === 'admin' ? 'bg-primary' : 'bg-tertiary'
          }`}
        />
        {role === 'admin' ? 'Admin Active' : 'Viewer Mode'}
      </span>
    </div>
  );
}
