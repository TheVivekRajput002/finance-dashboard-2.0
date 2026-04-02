'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export interface DonutSlice {
  name: string;
  value: number;
  color: string;
}

interface SpendingDonutProps {
  data: DonutSlice[];
  total: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="glass-card rounded-xl px-3 py-2 shadow-lg border border-white/60 text-sm">
      <p className="font-bold text-slate-800">{item.name}</p>
      <p className="text-on-surface-variant text-xs">
        ${item.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        <span className="ml-2 font-bold text-slate-600">
          ({((item.value / item.payload.total) * 100).toFixed(1)}%)
        </span>
      </p>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  if (percent < 0.06) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function SpendingDonut({ data, total }: SpendingDonutProps) {
  // Inject total into each datum for tooltip computation
  const enriched = data.map((d) => ({ ...d, total }));

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col h-full">
      <div className="mb-4">
        <h3 className="font-black text-xl text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Spending Breakdown
        </h3>
        <p className="text-on-surface-variant text-sm mt-0.5">Category distribution</p>
      </div>

      {/* Center label */}
      <div className="flex-1 relative min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={enriched}
              cx="50%"
              cy="45%"
              innerRadius="52%"
              outerRadius="75%"
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}
            >
              {enriched.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="rgba(255,255,255,0.6)" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-600">{value}</span>
              )}
              wrapperStyle={{ paddingTop: 8, fontSize: 10 }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ top: '-10%' }}>
          <span className="text-2xl font-black text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
            ${total >= 1000 ? `${(total / 1000).toFixed(1)}k` : total.toFixed(0)}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Spent</span>
        </div>
      </div>
    </div>
  );
}
