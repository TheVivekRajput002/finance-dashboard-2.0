import { Bell, Moon, Sparkles } from 'lucide-react';

export default function AppPreferences() {
  return (
    <section className="bg-surface-container-lowest glass-bevel p-8 rounded-xl border border-outline-variant/10">
      <h3 className="text-lg font-bold mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>App Preferences</h3>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Default Currency</label>
          <select className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-background font-medium focus:ring-2 focus:ring-primary/20">
            <option>USD - US Dollar ($)</option>
            <option>EUR - Euro (€)</option>
            <option>GBP - British Pound (£)</option>
            <option>JPY - Japanese Yen (¥)</option>
          </select>
        </div>
        <hr className="border-outline-variant/10" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="text-on-surface-variant w-5 h-5" />
            <span className="text-sm font-semibold">Push Notifications</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input defaultChecked className="sr-only peer" type="checkbox" value="" />
            <div className="w-10 h-5 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Moon className="text-on-surface-variant w-5 h-5" />
            <span className="text-sm font-semibold">Dark Mode</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input className="sr-only peer" type="checkbox" value="" />
            <div className="w-10 h-5 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="text-on-surface-variant w-5 h-5" />
            <span className="text-sm font-semibold">Smart Insights</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input defaultChecked className="sr-only peer" type="checkbox" value="" />
            <div className="w-10 h-5 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
    </section>
  );
}
