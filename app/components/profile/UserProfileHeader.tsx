import { Edit2, MapPin, Calendar } from 'lucide-react';

export default function UserProfileHeader() {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-end gap-8 bg-surface-container-low/40 backdrop-blur-3xl p-8 rounded-xl glass-bevel">
      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-tr from-primary to-primary-container rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <img 
          alt="Alex Rivera" 
          className="relative w-40 h-40 rounded-full object-cover border-4 border-surface-container-lowest shadow-xl shadow-primary/10" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwRIEUe1d6htuwZtaZSxCSoO2MWp818WcpcsqyuDGDxTZxQDqNsDMs_XJWQ8VeIz_jAB_eTrfP-isMr9T816_nBp2Ghq_OoqQfoGqgH-iR_a8jYN6HgBHUA7b06n8KDu7yH6g2ARziJTjChzuNXMkWjSxEk_XfsRll1DhB-21I3NldnDBFRO0BcJjZauzlMtG8KG5qB2he6LE37OYHuEQYoKBNWJzoPFr3l7bhReQb1XkgVUEjjTwX48UgDkc_GBCWkScATfMXW2ZA" 
          crossOrigin="anonymous"
        />
        <button className="absolute bottom-2 right-2 p-2 bg-primary text-on-primary rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center">
          <Edit2 size={16} />
        </button>
      </div>
      <div className="text-center md:text-left flex-1">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
          <h2 className="text-4xl font-extrabold text-on-background tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>Alex Rivera</h2>
          <span className="px-4 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full border border-primary/20">Admin Status</span>
        </div>
        <p className="text-on-surface-variant font-medium mb-6">Senior Financial Systems Architect</p>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <div className="flex items-center gap-2 text-sm text-on-surface-variant bg-surface-container-highest/30 px-4 py-2 rounded-full">
            <MapPin size={18} /> New York, NY
          </div>
          <div className="flex items-center gap-2 text-sm text-on-surface-variant bg-surface-container-highest/30 px-4 py-2 rounded-full">
            <Calendar size={18} /> Joined March 2021
          </div>
        </div>
      </div>
    </section>
  );
}
