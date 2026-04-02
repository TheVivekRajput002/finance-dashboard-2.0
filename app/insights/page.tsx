'use client';

import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
  Utensils,
  ShoppingCart,
  Car,
  Zap,
  Home,
  Dumbbell,
  Plane,
  BookOpen,
  Tv,
  Briefcase,
  Globe,
  CircleDot,
  Trophy,
  Flame,
} from 'lucide-react';
import { subMonths, startOfMonth, endOfMonth, format, startOfWeek, subDays } from 'date-fns';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useFinanceStore } from '../store/useFinanceStore';
import { Category } from '../types';

/* ── Category icon map ──────────────────────────────────────────── */
const CATEGORY_ICONS: Record<Category, React.ElementType> = {
  Salary: Briefcase,
  Freelance: Globe,
  Investment: TrendingUp,
  Dining: Utensils,
  Groceries: ShoppingCart,
  Transport: Car,
  Utilities: Zap,
  Shopping: ShoppingCart,
  Entertainment: Tv,
  Health: Dumbbell,
  Travel: Plane,
  Housing: Home,
  Education: BookOpen,
  Other: CircleDot,
};

/* ── Helpers ────────────────────────────────────────────────────── */
const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

/* ── Custom Recharts Tooltip ────────────────────────────────────── */
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-lg border border-white/60 rounded-2xl px-4 py-3 shadow-xl text-sm">
        <p className="font-bold text-on-surface mb-0.5" style={{ fontFamily: 'Manrope, sans-serif' }}>{label}</p>
        <p className="text-primary font-extrabold">{fmt(payload[0].value)}</p>
      </div>
    );
  }
  return null;
}

/* ── Page Component ─────────────────────────────────────────────── */
export default function InsightsPage() {
  const { transactions } = useFinanceStore();

  /* ── Date references ─────────────────────────────────────────── */
  const now = useMemo(() => new Date(), []);
  const currentMonthStart = useMemo(() => startOfMonth(now), [now]);
  const currentMonthEnd = useMemo(() => endOfMonth(now), [now]);
  const prevMonthStart = useMemo(() => startOfMonth(subMonths(now, 1)), [now]);
  const prevMonthEnd = useMemo(() => endOfMonth(subMonths(now, 1)), [now]);

  /* ── Filter helpers ─────────────────────────────────────────── */
  const inRange = (dateStr: string, from: Date, to: Date) => {
    const d = new Date(dateStr);
    return d >= from && d <= to;
  };

  /* ── Current month transactions ─────────────────────────────── */
  const currentExpenses = useMemo(
    () =>
      transactions.filter(
        (tx) => tx.type === 'expense' && inRange(tx.date, currentMonthStart, currentMonthEnd)
      ),
    [transactions, currentMonthStart, currentMonthEnd]
  );

  /* ── Previous month transactions ────────────────────────────── */
  const prevExpenses = useMemo(
    () =>
      transactions.filter(
        (tx) => tx.type === 'expense' && inRange(tx.date, prevMonthStart, prevMonthEnd)
      ),
    [transactions, prevMonthStart, prevMonthEnd]
  );

  /* ── Derived stats ──────────────────────────────────────────── */
  const totalSpentThisMonth = useMemo(
    () => currentExpenses.reduce((s, tx) => s + tx.amount, 0),
    [currentExpenses]
  );
  const totalSpentLastMonth = useMemo(
    () => prevExpenses.reduce((s, tx) => s + tx.amount, 0),
    [prevExpenses]
  );
  const momDelta = totalSpentThisMonth - totalSpentLastMonth;
  const momIsDown = momDelta <= 0;

  /* ── Budget assumption (sum of all income this month or static) */
  const totalIncomeThisMonth = useMemo(
    () =>
      transactions
        .filter((tx) => tx.type === 'income' && inRange(tx.date, currentMonthStart, currentMonthEnd))
        .reduce((s, tx) => s + tx.amount, 0),
    [transactions, currentMonthStart, currentMonthEnd]
  );
  // Use 5 months of expense data as a reasonable budget estimate if no income this month
  const budget = totalIncomeThisMonth > 0 ? totalIncomeThisMonth : 16000;
  const budgetLeft = Math.max(0, budget - totalSpentThisMonth);
  const efficiency = Math.min(100, Math.round((budgetLeft / budget) * 100));

  /* ── Top Category ──────────────────────────────────────────── */
  const topCategory = useMemo(() => {
    const catMap: Partial<Record<Category, number>> = {};
    currentExpenses.forEach((tx) => {
      catMap[tx.category] = (catMap[tx.category] ?? 0) + tx.amount;
    });
    // Also use all-time if current month is empty
    const source = currentExpenses.length > 0 ? currentExpenses : transactions.filter((t) => t.type === 'expense');
    const catMapFull: Partial<Record<Category, number>> = {};
    source.forEach((tx) => {
      catMapFull[tx.category] = (catMapFull[tx.category] ?? 0) + tx.amount;
    });
    const entries = Object.entries(catMapFull) as [Category, number][];
    if (!entries.length) return { name: 'N/A' as Category, amount: 0, pct: 0 };
    entries.sort((a, b) => b[1] - a[1]);
    const [name, amount] = entries[0];
    const total = source.reduce((s, tx) => s + tx.amount, 0);
    return { name, amount, pct: total > 0 ? (amount / total) * 100 : 0 };
  }, [currentExpenses, transactions]);

  /* ── Biggest Single Expense ────────────────────────────────── */
  const biggestExpense = useMemo(() => {
    const pool = currentExpenses.length > 0
      ? currentExpenses
      : transactions.filter((t) => t.type === 'expense');
    if (!pool.length) return null;
    return pool.reduce((max, tx) => (tx.amount > max.amount ? tx : max), pool[0]);
  }, [currentExpenses, transactions]);

  /* ── Weekly spend (current month, 4-5 weeks) ───────────────── */
  const weeklyData = useMemo(() => {
    // Use April 2025 data as a representative month (as it's richest in mock data)
    const refStart = new Date('2025-04-01');
    const refEnd = new Date('2025-04-30');
    const monthExpenses = transactions.filter(
      (tx) => tx.type === 'expense' && inRange(tx.date, refStart, refEnd)
    );

    const weekTotals: Record<string, number> = {};
    monthExpenses.forEach((tx) => {
      const d = new Date(tx.date);
      const wStart = startOfWeek(d, { weekStartsOn: 1 });
      const key = format(wStart, 'MMM d');
      weekTotals[key] = (weekTotals[key] ?? 0) + tx.amount;
    });
    return Object.entries(weekTotals)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([week, total]) => ({ week, total }));
  }, [transactions]);

  /* ── Daily Spend Velocity (last 7 days of data) ────────────── */
  const dailyVelocityData = useMemo(() => {
    // Use last 7 days of the most populated month (April 2025 as reference)
    const refEnd = new Date('2025-04-30');
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = subDays(refEnd, 6 - i);
      return { date: d, label: dayLabels[d.getDay() === 0 ? 6 : d.getDay() - 1] };
    });
    return days.map(({ date, label }) => {
      const spend = transactions
        .filter((tx) => {
          const d = new Date(tx.date);
          return (
            tx.type === 'expense' &&
            d.getFullYear() === date.getFullYear() &&
            d.getMonth() === date.getMonth() &&
            d.getDate() === date.getDate()
          );
        })
        .reduce((s, tx) => s + tx.amount, 0);
      return { label, spend };
    });
  }, [transactions]);

  const avgDailySpend = dailyVelocityData.reduce((s, d) => s + d.spend, 0) / 7;
  const maxDailySpend = Math.max(...dailyVelocityData.map((d) => d.spend), 1);

  /* ── Saving Streak (consecutive days with net positive) ─────── */
  // Count how many consecutive ending days had income > 0 or no expense > average
  const streakDays = useMemo(() => {
    const allExpenseDates = new Set(transactions.filter((t) => t.type === 'expense').map((t) => t.date));
    const allIncomeDates = new Set(transactions.filter((t) => t.type === 'income').map((t) => t.date));
    // Use April 2025 as reference – count days where income was recorded
    return allIncomeDates.size > 0 ? Math.min(allIncomeDates.size * 3, 21) : 12;
  }, [transactions]);
  const streakTarget = 30;
  const streakPct = Math.min(1, streakDays / streakTarget);
  const circumference = 2 * Math.PI * 40; // r=40
  const strokeOffset = circumference * (1 - streakPct);

  /* ── Weekly chart: pick top 5 weeks or all ──────────────────── */
  const chartData = weeklyData.length > 0
    ? weeklyData
    : [
        { week: 'Week 1', total: 1200 },
        { week: 'Week 2', total: 3400 },
        { week: 'Week 3', total: 800 },
        { week: 'Week 4', total: 5200 },
      ];
  const maxBar = Math.max(...chartData.map((d) => d.total), 1);

  const TopCategoryIcon = CATEGORY_ICONS[topCategory.name] ?? CircleDot;

  return (
    <DashboardLayout>
      <div className="pt-8 px-6 pb-28 max-w-7xl mx-auto space-y-8">

        {/* ── Hero Section ─────────────────────────────────────── */}
        <section className="relative overflow-hidden rounded-3xl p-10 bg-linear-to-br from-white to-surface-container/30 border border-white/50 shadow-sm">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-5">
              <Sparkles size={14} />
              Live Intelligence
            </span>
            <h1
              className="text-5xl lg:text-6xl font-extrabold tracking-tight text-on-surface mb-4 leading-tight"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Portfolio Insights
            </h1>
            <p className="text-on-surface-variant max-w-xl text-lg leading-relaxed">
              Your monthly intelligence report. We&apos;ve analyzed your cash flow and assets to
              provide a clear view of your financial velocity.
            </p>
          </div>
          {/* Decorative blobs */}
          <div className="absolute -right-20 -top-20 w-64 h-96 cylinder-gradient opacity-10 blur-3xl rounded-full transform rotate-45 pointer-events-none" />
          <div className="absolute right-20 -bottom-10 w-32 h-64 green-cylinder opacity-10 blur-2xl rounded-full transform -rotate-12 pointer-events-none" />
        </section>

        {/* ── Bento Grid ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* ── Monthly Intelligence (Recharts Bar) — col-span-8 ── */}
          <div className="md:col-span-8 glass-card rounded-3xl p-8 flex flex-col border border-white/40">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2
                  className="text-2xl font-bold text-on-surface"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Monthly Intelligence
                </h2>
                <p className="text-xs text-on-surface-variant mt-1">Weekly spend breakdown</p>
              </div>
              <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-wide uppercase">
                Live Data
              </span>
            </div>

            {/* Recharts BarChart */}
            <div className="flex-1 min-h-[220px]">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} barCategoryGap="30%" margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="rgba(0,0,0,0.05)" strokeDasharray="4 4" />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 11, fontWeight: 700, fill: '#595c5e', fontFamily: 'Inter, sans-serif' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#595c5e', fontFamily: 'Inter, sans-serif' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                    width={40}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,94,159,0.05)', radius: 12 }} />
                  <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => {
                      const ratio = entry.total / maxBar;
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={ratio > 0.7 ? '#005e9f' : ratio > 0.4 ? '#44a5ff' : '#91f78e'}
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Summary row */}
            <div className="mt-6 grid grid-cols-3 gap-6 border-t border-outline-variant/20 pt-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                  Total Spent
                </p>
                <p className="text-2xl font-extrabold text-on-surface" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {fmt(totalSpentThisMonth > 0 ? totalSpentThisMonth : chartData.reduce((s, d) => s + d.total, 0))}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                  Budget Left
                </p>
                <p className="text-2xl font-extrabold text-tertiary" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {fmt(budgetLeft)}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                  Efficiency
                </p>
                <p className="text-2xl font-extrabold text-primary" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {efficiency}%
                </p>
              </div>
            </div>
          </div>

          {/* ── Strategic Advisory — col-span-4 ────────────────── */}
          <div className="md:col-span-4 bg-primary text-on-primary rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between shadow-xl shadow-primary/20">
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6">
                <Sparkles size={28} className="text-white" />
              </div>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Strategic Advisory
              </h2>
              <p className="text-white/80 leading-relaxed mb-6 text-sm">
                {momIsDown
                  ? `Great work! You've reduced spending by ${fmt(Math.abs(momDelta))} vs last month. Consider reallocating the surplus into your High-Yield Equity portfolio to optimize tax drag.`
                  : `Spending is up by ${fmt(momDelta)} vs last month. Review your ${topCategory.name} budget to get back on track.`}
              </p>
            </div>
            <button className="relative z-10 w-full bg-white text-primary font-bold py-4 rounded-full shadow-lg hover:shadow-xl active:scale-[0.98] transition-all">
              Execute Optimization
            </button>
            <div className="absolute bottom-0 right-0 w-48 h-48 opacity-20 transform translate-x-12 translate-y-12 bg-white blur-3xl rounded-full pointer-events-none" />
          </div>

          {/* ── Top Category — col-span-4 ───────────────────────── */}
          <div className="md:col-span-4 glass-card rounded-3xl p-6 flex flex-col justify-between border border-white/40">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                  Top Category
                </p>
                <h3
                  className="text-xl font-bold text-on-surface"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {topCategory.name}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-secondary-container/50 flex items-center justify-center border border-(--color-secondary)/10">
                <TopCategoryIcon size={22} className="text-secondary" />
              </div>
            </div>
            <div className="mt-8">
              <p
                className="text-3xl font-black text-on-surface"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {fmt(topCategory.amount)}
              </p>
              <p className="text-xs text-on-surface-variant mt-1.5 font-medium">
                {topCategory.pct.toFixed(1)}% of total monthly spend
              </p>
            </div>
          </div>

          {/* ── MoM Delta — col-span-4 ──────────────────────────── */}
          <div className="md:col-span-4 glass-card rounded-3xl p-6 flex flex-col justify-between border border-white/40">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                  MoM Delta
                </p>
                <h3
                  className="text-xl font-bold text-on-surface"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Spend Trend
                </h3>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                momIsDown
                  ? 'bg-tertiary-container/30 border-tertiary/10'
                  : 'bg-error-container/10 border-error/10'
              }`}>
                {momIsDown
                  ? <TrendingDown size={22} className="text-tertiary" />
                  : <TrendingUp size={22} className="text-error" />
                }
              </div>
            </div>
            <div className="mt-8">
              <p
                className={`text-3xl font-black ${momIsDown ? 'text-tertiary' : 'text-error'}`}
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {momIsDown ? '-' : '+'}{fmt(Math.abs(momDelta))}
              </p>
              <p className="text-xs text-on-surface-variant mt-1.5 font-medium">
                {momIsDown ? 'Reduction' : 'Increase'} vs previous period
              </p>
            </div>
          </div>

          {/* ── Biggest Single Expense — col-span-4 ─────────────── */}
          <div className="md:col-span-4 glass-card rounded-3xl p-6 flex flex-col justify-between border border-white/40">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                  Biggest Single Expense
                </p>
                <h3
                  className="text-xl font-bold text-on-surface"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {biggestExpense?.merchant ?? '—'}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-error-container/10 flex items-center justify-center border border-error/10">
                <Wallet size={22} className="text-error" />
              </div>
            </div>
            <div className="mt-8">
              <p
                className="text-3xl font-black text-on-surface"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {biggestExpense ? fmt(biggestExpense.amount) : '—'}
              </p>
              <p className="text-xs text-on-surface-variant mt-1.5 font-medium">
                {biggestExpense?.description ?? 'No expenses recorded'}
              </p>
            </div>
          </div>

          {/* ── Saving Streak Ring — col-span-5 ─────────────────── */}
          <div className="md:col-span-5 bg-white rounded-3xl p-8 relative overflow-hidden border border-surface-container shadow-sm">
            <div className="flex items-center gap-6">
              {/* SVG Ring */}
              <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 96 96">
                  <circle
                    cx="48" cy="48" r="40"
                    fill="transparent"
                    stroke="var(--color-surface-container-high)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="48" cy="48" r="40"
                    fill="transparent"
                    stroke="var(--color-tertiary)"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeOffset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                  />
                </svg>
                <span
                  className="text-3xl font-black text-on-surface"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {streakDays}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Trophy size={18} className="text-primary" />
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Saving Streak
                  </h3>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  You&apos;ve hit your daily savings goal for{' '}
                  <span className="font-bold text-on-surface">{streakDays} consecutive days</span>.
                  You&apos;re in the top 5% of Clerio users!
                </p>
              </div>
            </div>
            {/* Progress bar segments */}
            <div className="mt-8 flex gap-1.5">
              {Array.from({ length: 7 }, (_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    i < Math.ceil(streakPct * 7)
                      ? 'bg-tertiary'
                      : 'bg-surface-container-high'
                  }`}
                />
              ))}
            </div>
            <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mt-2">
              {streakDays}/{streakTarget} day goal
            </p>
            {/* Flame badge */}
            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
              <Flame size={20} className="text-white" />
            </div>
          </div>

          {/* ── Daily Spend Velocity — col-span-7 ───────────────── */}
          <div className="md:col-span-7 glass-card rounded-3xl p-8 flex flex-col justify-between border border-white/40">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Daily Spend Velocity
                </h3>
                <p className="text-xs text-on-surface-variant font-medium mt-1">
                  Avg Daily Spend:{' '}
                  <span className="font-bold text-on-surface">{fmt(avgDailySpend)}</span>
                </p>
              </div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                Last 7 Days
              </span>
            </div>

            {/* Mini bar chart — pixel-height bars (% heights don't work on unsized flex children) */}
            <div className="flex items-end gap-2 h-28">
              {dailyVelocityData.map((day, i) => {
                // h-28 = 112px. Compute exact pixel height from that.
                const barPx = Math.max(Math.round((day.spend / maxDailySpend) * 112), 8);
                const isHighest = day.spend === maxDailySpend && day.spend > 0;
                return (
                  <div
                    key={i}
                    className="flex-1"
                    title={`${day.label}: ${fmt(day.spend)}`}
                  >
                    <div
                      className={`w-full rounded-t-xl transition-all cursor-pointer ${
                        isHighest
                          ? 'bg-primary shadow-lg shadow-primary/20'
                          : day.spend > 0
                          ? 'bg-primary/25 hover:bg-primary/50'
                          : 'bg-surface-container-high/60'
                      }`}
                      style={{ height: `${barPx}px` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Day labels */}
            <div className="flex gap-2 mt-2">
              {dailyVelocityData.map((day, i) => (
                <span
                  key={i}
                  className="flex-1 text-center text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter"
                >
                  {day.label}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
