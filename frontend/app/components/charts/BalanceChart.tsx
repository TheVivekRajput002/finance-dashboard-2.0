'use client';

import { useMemo, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend,
} from 'recharts';

interface MonthData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

interface BalanceChartProps {
  data: MonthData[];
}

type Period = '1M' | '3M' | '6M' | 'All';
const PERIODS: Period[] = ['1M', '3M', '6M', 'All'];

const formatCurrency = (v: number) =>
  v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v.toFixed(0)}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-xl px-4 py-3 shadow-lg border border-white/60 text-sm min-w-[160px]">
      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{label}</p>
      {payload.map((p: { name: string; value: number; color: string }) => (
        <div key={p.name} className="flex justify-between gap-4">
          <span className="font-medium" style={{ color: p.color }}>{p.name}</span>
          <span className="font-bold text-slate-800">{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default function BalanceChart({ data }: BalanceChartProps) {
  const [period, setPeriod] = useState<Period>('6M');

  const filtered = useMemo(() => {
    const count = period === '1M' ? 1 : period === '3M' ? 3 : period === '6M' ? 6 : data.length;
    return data.slice(-count);
  }, [data, period]);

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="font-black text-xl text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Balance Evolution
          </h3>
          <p className="text-on-surface-variant text-sm mt-0.5">Real-time wealth trajectory</p>
        </div>

        {/* Period Toggle */}
        <div className="flex gap-1 bg-slate-100/60 p-1 rounded-full self-start">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all duration-200 ${
                period === p
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-500 hover:bg-white hover:text-slate-700'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filtered} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#006b1b" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#006b1b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#b31b25" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#b31b25" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#005e9f" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#005e9f" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fontWeight: 700, fill: '#9a9d9f' }}
              axisLine={false}
              tickLine={false}
              dy={8}
            />
            <YAxis
              tickFormatter={formatCurrency}
              tick={{ fontSize: 10, fill: '#9a9d9f' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', paddingTop: 12 }}
            />
            <Area type="monotone" dataKey="income" name="Income" stroke="#006b1b" strokeWidth={2} fill="url(#incomeGrad)" dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#b31b25" strokeWidth={2} fill="url(#expenseGrad)" dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
            <Area type="monotone" dataKey="balance" name="Net Balance" stroke="#005e9f" strokeWidth={2.5} fill="url(#balanceGrad)" dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
