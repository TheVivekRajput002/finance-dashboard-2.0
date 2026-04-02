import DashboardLayout from './components/layout/DashboardLayout';

export default function OverviewPage() {
  return (
    <DashboardLayout>
      <div className="py-6">
        <h2 className="font-black text-4xl text-slate-900 mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
          The Portfolio Curator
        </h2>
        <p className="text-on-surface-variant text-base font-medium">
          Dashboard Overview — Clerio Style
        </p>

        {/* Placeholder content */}
        <div className="mt-8 glass-card rounded-2xl p-8 text-center text-slate-400">
          <p className="text-sm font-medium">KPI cards, charts and insights coming in Task 4 →</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
