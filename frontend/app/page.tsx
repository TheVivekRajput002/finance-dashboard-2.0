'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Wallet, TrendingUp, TrendingDown, PiggyBank,
  ArrowDownCircle, ArrowUpCircle, Sparkles, ChevronRight,
} from 'lucide-react';

import DashboardLayout from './components/layout/DashboardLayout';
import KpiCard from './components/ui/KpiCard';
import CategoryBadge from './components/ui/CategoryBadge';
import { useFinanceStore } from './store/useFinanceStore';
import type { Transaction } from './types';

// Dynamic imports prevent Recharts SSR hydration issues
const BalanceChart = dynamic(() => import('./components/charts/BalanceChart'), { ssr: false });
const SpendingDonut = dynamic(() => import('./components/charts/SpendingDonut'), { ssr: false });

// ── Category palette for the donut ──────────────────────────────────────────
const CAT_COLORS: Record<string, string> = {
  Salary: '#006b1b', Freelance: '#3b82f6', Investment: '#6366f1',
  Dining: '#4f5d67', Groceries: '#f59e0b', Transport: '#005e9f',
  Utilities: '#22c55e', Shopping: '#64748b', Entertainment: '#a855f7',
  Health: '#ef4444', Travel: '#f97316', Housing: '#b31b25',
  Education: '#06b6d4', Other: '#9a9d9f',
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n);

const MONTH_LABELS: Record<string, string> = {
  '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
  '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
  '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec',
};

function buildMonthlyData(txns: Transaction[]) {
  const map: Record<string, { income: number; expenses: number }> = {};

  txns.forEach((tx) => {
    const key = tx.date.slice(0, 7); // "2025-01"
    if (!map[key]) map[key] = { income: 0, expenses: 0 };
    if (tx.type === 'income') map[key].income += tx.amount;
    else map[key].expenses += tx.amount;
  });

  let runningBalance = 0;
  return Object.keys(map)
    .sort()
    .map((key) => {
      runningBalance += map[key].income - map[key].expenses;
      const [, m] = key.split('-');
      return {
        month: MONTH_LABELS[m] ?? m,
        income: Math.round(map[key].income),
        expenses: Math.round(map[key].expenses),
        balance: Math.round(runningBalance),
      };
    });
}

function buildSpendingData(txns: Transaction[]) {
  const map: Record<string, number> = {};
  txns
    .filter((tx) => tx.type === 'expense')
    .forEach((tx) => {
      map[tx.category] = (map[tx.category] ?? 0) + tx.amount;
    });

  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6) // top 6 categories
    .map(([name, value]) => ({
      name,
      value: Math.round(value * 100) / 100,
      color: CAT_COLORS[name] ?? '#9a9d9f',
    }));
}

// ── Transaction row ──────────────────────────────────────────────────────────
function TxRow({ tx }: { tx: Transaction }) {
  const isIncome = tx.type === 'income';
  const initials = tx.merchant.slice(0, 2).toUpperCase();

  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl hover:bg-white/50 transition-colors cursor-pointer border border-transparent hover:border-white/50 group">
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black border border-white/50 ${
            isIncome ? 'bg-tertiary/10 text-tertiary' : 'bg-error/10 text-error'
          }`}
        >
          {isIncome ? <ArrowDownCircle size={16} /> : <ArrowUpCircle size={16} />}
        </div>
        <div>
          <p className="font-semibold text-sm text-slate-900 leading-tight">{tx.merchant}</p>
          <p className="text-[11px] text-slate-400 font-medium">{tx.category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold text-sm ${isIncome ? 'text-tertiary' : 'text-error'}`}>
          {isIncome ? '+' : '-'}{fmt(tx.amount)}
        </p>
        <p className="text-[10px] font-bold text-slate-400 uppercase">
          {new Date(tx.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function OverviewPage() {
  const { transactions } = useFinanceStore();

  const totalIncome = useMemo(
    () => transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0),
    [transactions],
  );
  const totalExpenses = useMemo(
    () => transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    [transactions],
  );
  const totalBalance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const monthlyData = useMemo(() => buildMonthlyData(transactions), [transactions]);
  const spendingData = useMemo(() => buildSpendingData(transactions), [transactions]);
  const spendingTotal = useMemo(() => spendingData.reduce((s, d) => s + d.value, 0), [spendingData]);

  const recent = useMemo(
    () =>
      [...transactions]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5),
    [transactions],
  );

  return (
    <DashboardLayout>
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div className="mb-8 pt-2">
        <h2 className="font-black text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
          The Portfolio Curator
        </h2>
        <p className="text-on-surface-variant text-base font-medium mt-1">
          Dashboard Overview — Clerio Style
        </p>
      </div>

      {/* ── KPI Cards ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard
          title="Total Balance"
          value={fmt(totalBalance)}
          icon={Wallet}
          iconBg="bg-primary/10"
          iconColor="text-primary"
          trend={12.4}
          trendLabel="this month"
        />
        <KpiCard
          title="Total Income"
          value={fmt(totalIncome)}
          icon={TrendingUp}
          iconBg="bg-tertiary/10"
          iconColor="text-tertiary"
          subtitle="Primary: Monthly Salary"
          accent="green"
        />
        <KpiCard
          title="Total Expenses"
          value={fmt(totalExpenses)}
          icon={TrendingDown}
          iconBg="bg-error/10"
          iconColor="text-error"
          subtitle="Largest: Housing"
          accent="red"
        />
        <KpiCard
          title="Savings Rate"
          value={`${savingsRate.toFixed(1)}%`}
          icon={PiggyBank}
          iconBg="bg-tertiary/10"
          iconColor="text-tertiary"
          savingsRate={savingsRate}
          accent="green"
        />
      </div>

      {/* ── Charts Row ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Balance Evolution – 2/3 */}
        <div className="lg:col-span-2 min-h-[380px]">
          <BalanceChart data={monthlyData} />
        </div>

        {/* Spending Breakdown – 1/3 */}
        <div className="min-h-[380px]">
          <SpendingDonut data={spendingData} total={spendingTotal} />
        </div>
      </div>

      {/* ── Recent Transactions + AI Intelligence ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="glass-card rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-xl text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Recent Transactions
            </h3>
            <Link
              href="/transactions"
              className="flex items-center gap-1 text-primary text-xs font-bold uppercase tracking-wider hover:underline"
            >
              View All <ChevronRight size={13} />
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="text-center py-10 text-on-surface-variant text-sm">
              No transactions yet. Add one to get started.
            </div>
          ) : (
            <div className="space-y-1">
              {recent.map((tx) => (
                <TxRow key={tx.id} tx={tx} />
              ))}
            </div>
          )}
        </div>

        {/* AI Intelligence Card */}
        <div className="glass-card rounded-2xl p-6 md:p-8 bg-linear-to-tr from-primary/5 to-white/30 border-primary/10">
          <div className="flex items-center gap-2 mb-6">
            <span className="p-2 rounded-xl bg-primary/10">
              <Sparkles size={18} className="text-primary" />
            </span>
            <h3 className="font-black text-xl text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              AI Intelligence
            </h3>
          </div>

          <div className="space-y-4">
            {/* Advisory block */}
            <div className="p-5 bg-white/70 rounded-2xl border border-white/50 shadow-sm">
              <p className="text-sm text-slate-700 leading-relaxed italic">
                "Your liquidity has increased by{' '}
                <span className="font-bold text-primary not-italic">
                  {savingsRate.toFixed(1)}%
                </span>{' '}
                this period. Consider shifting a portion of your savings into an{' '}
                <span className="font-bold text-primary not-italic">Equity Growth</span> fund to optimise long-term returns."
              </p>
              <div className="mt-4 flex gap-2">
                <button className="bg-primary text-white px-4 py-2 rounded-full text-xs font-bold shadow-md shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
                  Analyse Fund
                </button>
                <button className="bg-white text-slate-500 px-4 py-2 rounded-full text-xs font-bold border border-slate-200 hover:bg-slate-50 transition-colors">
                  Dismiss
                </button>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-white/50 rounded-xl border border-white/40">
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                  Top Spend
                </p>
                <p className="font-black text-lg text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {spendingData[0]?.name ?? '—'}
                </p>
                <p className="text-xs text-on-surface-variant font-medium">
                  {fmt(spendingData[0]?.value ?? 0)}
                </p>
              </div>

              <div className="p-4 bg-white/50 rounded-xl border border-white/40">
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                  Net Balance
                </p>
                <p
                  className={`font-black text-lg ${totalBalance >= 0 ? 'text-tertiary' : 'text-error'}`}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {fmt(totalBalance)}
                </p>
                <p className="text-xs text-on-surface-variant font-medium">All time</p>
              </div>
            </div>

            {/* Consultant strip */}
            <div className="flex items-center gap-3 p-4 bg-white/50 rounded-2xl border border-white/30">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-primary-container flex items-center justify-center text-white text-xs font-black">
                  SM
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-tertiary rounded-full border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Consultant</p>
                <p className="font-bold text-slate-900 text-sm truncate" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Sarah Millers
                </p>
              </div>
              <button className="w-9 h-9 rounded-full bg-white shadow-sm border border-white/50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shrink-0">
                <Sparkles size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
