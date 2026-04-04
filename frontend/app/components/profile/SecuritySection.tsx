import { Lock, KeyRound, Smartphone } from 'lucide-react';

export default function SecuritySection() {
  return (
    <section className="bg-surface-container-lowest glass-bevel p-8 rounded-xl border border-outline-variant/10">
      <h3 className="text-xl font-bold flex items-center gap-3 mb-8" style={{ fontFamily: 'Manrope, sans-serif' }}>
        <span className="w-10 h-10 rounded-xl bg-error/10 text-error flex items-center justify-center">
          <Lock size={20} />
        </span>
        Security & Access
      </h3>
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-surface-container-low/50 rounded-xl">
          <div className="flex items-center gap-4">
            <KeyRound className="text-on-surface-variant w-6 h-6" />
            <div>
              <p className="font-bold text-on-background">Password Authentication</p>
              <p className="text-xs text-on-surface-variant">Last changed 3 months ago</p>
            </div>
          </div>
          <button className="text-primary font-bold text-sm bg-primary/10 px-6 py-2 rounded-full hover:bg-primary/20 transition-colors">Change</button>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-surface-container-low/50 rounded-xl">
          <div className="flex items-center gap-4">
            <Smartphone className="text-on-surface-variant w-6 h-6" />
            <div>
              <p className="font-bold text-on-background">Two-factor authentication (2FA)</p>
              <p className="text-xs text-on-surface-variant">Secure your account with SMS or App codes</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input defaultChecked className="sr-only peer" type="checkbox" value="" />
            <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
    </section>
  );
}
