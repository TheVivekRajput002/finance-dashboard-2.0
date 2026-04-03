'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ReceiptText,
  Lightbulb,
  User,
  HelpCircle,
  Wallet,
} from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transactions', icon: ReceiptText },
  { href: '/insights', label: 'Insights', icon: Lightbulb },
];

const BOTTOM_LINKS = [
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/support', label: 'Support', icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full z-40 w-72 p-4">
      <div className="glass-sidebar rounded-3xl h-full w-full flex flex-col p-6 shadow-2xl shadow-blue-900/5">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shrink-0">
            <Wallet size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-black text-xl text-blue-900 leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Clerio
            </h1>
            <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
              Wealth Management
            </p>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-500/10 text-blue-700 shadow-inner font-semibold'
                    : 'text-slate-600 hover:translate-x-1 hover:bg-white/30'
                }`}
              >
                <Icon
                  size={20}
                  className={isActive ? 'text-blue-600' : 'text-slate-500'}
                />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Links */}
        <div className="border-t border-white/20 pt-4 flex flex-col gap-1">
          {BOTTOM_LINKS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-500/10 text-blue-700 shadow-inner font-semibold'
                    : 'text-slate-500 hover:translate-x-1 hover:bg-white/30'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
