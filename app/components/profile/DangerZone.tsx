export default function DangerZone() {
  return (
    <section className="mt-8 bg-error-container/5 p-8 rounded-xl border border-error/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-error mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Danger Zone</h3>
          <p className="text-on-surface-variant text-sm">Once you delete your account, there is no going back. Please be certain.</p>
        </div>
        <button className="px-8 py-3 rounded-full border border-error/30 text-error font-bold hover:bg-error hover:text-white transition-all duration-300">
          Deactivate Account
        </button>
      </div>
    </section>
  );
}
