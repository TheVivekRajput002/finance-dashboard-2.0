import { BadgeCheck } from 'lucide-react';

export default function MembershipCard() {
  return (
    <section className="relative group p-1 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary via-primary-container to-tertiary-container animate-pulse opacity-20"></div>
      <div className="relative bg-on-primary-container p-8 rounded-xl h-full flex flex-col justify-between text-on-primary">
        <div>
          <div className="flex justify-between items-start mb-6">
            <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">Active Plan</span>
            <BadgeCheck className="text-tertiary-fixed w-6 h-6" />
          </div>
          <h4 className="text-2xl font-black mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Premium Tier</h4>
          <p className="text-on-primary/60 text-sm mb-6">Unlimited transfers, enterprise analytics, and 24/7 dedicated support.</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-on-primary/70">Next Billing Date</span>
            <span className="font-bold">Oct 12, 2024</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div className="bg-tertiary-fixed h-full w-3/4 rounded-full"></div>
          </div>
          <button className="w-full py-4 bg-surface-container-lowest text-primary font-bold rounded-xl hover:bg-white transition-colors">Manage Subscription</button>
        </div>
      </div>
    </section>
  );
}
