import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  trend?: number;      // percentage, positive = up, negative = down
  trendLabel?: string;
  subtitle?: string;
  /** If true, renders the savings rate progress bar variant */
  savingsRate?: number; // 0–100
  accent?: 'blue' | 'green' | 'red' | 'default';
}

export default function KpiCard({
  title,
  value,
  icon: Icon,
  iconBg = 'bg-primary/10',
  iconColor = 'text-primary',
  trend,
  trendLabel,
  subtitle,
  savingsRate,
  accent = 'default',
}: KpiCardProps) {
  const valueColor =
    accent === 'green'
      ? 'text-tertiary'
      : accent === 'red'
      ? 'text-error'
      : 'text-slate-900';

  const hasTrend = trend !== undefined;
  const isPositive = hasTrend && trend >= 0;

  return (
    <div className="glass-card p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 group relative overflow-hidden">
      {/* Subtle hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-white/20 to-transparent pointer-events-none rounded-2xl" />

      {/* Header row */}
      <div className="flex justify-between items-start mb-4">
        <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">
          {title}
        </span>
        <span className={`${iconBg} ${iconColor} p-2 rounded-xl`}>
          <Icon size={18} />
        </span>
      </div>

      {/* Value */}
      <div className={`font-black text-3xl tracking-tight ${valueColor} mb-2`} style={{ fontFamily: 'Manrope, sans-serif' }}>
        {value}
      </div>

      {/* Savings rate bar */}
      {savingsRate !== undefined && (
        <div className="mt-2 w-full bg-slate-200/60 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-tertiary h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.min(savingsRate, 100)}%` }}
          />
        </div>
      )}

      {/* Trend */}
      {hasTrend && (
        <div
          className={`mt-2 flex items-center gap-1 text-xs font-bold ${
            isPositive ? 'text-tertiary' : 'text-error'
          }`}
        >
          {isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          <span>
            {isPositive ? '+' : ''}
            {trend.toFixed(1)}%
          </span>
          {trendLabel && (
            <span className="text-slate-400 font-normal ml-0.5">{trendLabel}</span>
          )}
        </div>
      )}

      {/* Static subtitle */}
      {subtitle && !hasTrend && (
        <div className="mt-2 text-slate-400 text-xs font-medium">{subtitle}</div>
      )}
    </div>
  );
}
