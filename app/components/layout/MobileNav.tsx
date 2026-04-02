'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ReceiptText, Lightbulb, Plus, User } from 'lucide-react';

const NAV_TABS = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transact', icon: ReceiptText },
  { href: '/insights', label: 'Insights', icon: Lightbulb },
  { href: '/profile', label: 'Profile', icon: User },
];

interface MobileNavProps {
  showFab?: boolean;
  onFabClick?: () => void;
}

export default function MobileNav({ showFab, onFabClick }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* FAB */}
      {showFab && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2">
          <button
            onClick={onFabClick}
            className="w-14 h-14 rounded-full bg-linear-to-br from-primary to-primary-container text-white shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform border-4 border-surface"
          >
            <Plus size={22} />
          </button>
        </div>
      )}

      {/* Bottom bar */}
      <div className="glass-topbar border-t border-white/30 px-2 py-3 flex justify-around items-center shadow-[0_-4px_24px_rgba(0,0,0,0.05)]">
        {NAV_TABS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-3 transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <Icon size={22} fill={isActive ? 'currentColor' : 'none'} className="transition-all" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
