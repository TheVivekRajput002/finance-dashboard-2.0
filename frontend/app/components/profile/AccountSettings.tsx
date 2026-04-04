import { User } from 'lucide-react';

export default function AccountSettings() {
  return (
    <section className="bg-surface-container-lowest glass-bevel p-8 rounded-xl border border-outline-variant/10">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold flex items-center gap-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
          <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <User size={20} />
          </span>
          Account Settings
        </h3>
        <button className="text-primary font-bold text-sm hover:underline">Reset Defaults</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider px-1">Full Name</label>
          <input className="w-full bg-surface-container-low border-none rounded-lg p-4 text-on-background font-medium focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" type="text" defaultValue="Alex Rivera"/>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider px-1">Email Address</label>
          <input className="w-full bg-surface-container-low border-none rounded-lg p-4 text-on-background font-medium focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" type="email" defaultValue="alex.rivera@clerio.com"/>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider px-1">Phone Number</label>
          <div className="flex gap-4">
            <select className="w-32 bg-surface-container-low border-none rounded-lg p-4 text-on-background font-medium focus:ring-2 focus:ring-primary/20">
              <option>+1 (US)</option>
              <option>+44 (UK)</option>
              <option>+49 (DE)</option>
            </select>
            <input className="flex-1 bg-surface-container-low border-none rounded-lg p-4 text-on-background font-medium focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" type="tel" defaultValue="555-0123-4567"/>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button className="bg-linear-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Save Changes</button>
      </div>
    </section>
  );
}
