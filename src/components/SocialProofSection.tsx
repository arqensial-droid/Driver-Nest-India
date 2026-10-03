import React, { useState } from 'react';
import { testimonialsData } from '../data/testimonialsData';
import { Star, ShieldCheck, Car, MapPin, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';

export const SocialProofSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = ['All', 'Family', 'Corporate', 'Senior Citizen', 'Luxury Car Owner'];

  const filteredTestimonials = testimonialsData.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#0A0A0A] text-white border-b border-white/10 relative">
      {/* Background ambient light */}
      <div className="glow-yellow-sm top-10 left-1/3" />
      <div className="glow-blue-lg bottom-10 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[#35B5D8]/40 shadow-md mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F2F028]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B5D8]">
              Client Testimonials &amp; Verified Reviews
            </span>
          </div>

          <h2 className="text-h2 font-extrabold text-white mb-4">
            Trusted by Mumbai's Discerning Car Owners &amp; Corporates
          </h2>

          <p className="text-subheading text-[#D1D5DB] leading-relaxed">
            Real feedback from corporate executives in BKC, families in Powai, Thane, and Mira Road, senior citizens in Dadar, and luxury fleet owners across Mumbai.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 p-1.5 mt-8 bg-[#121212] border border-white/10 rounded-2xl max-w-xl mx-auto overflow-x-auto no-scrollbar justify-start sm:justify-center shadow-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === cat
                    ? 'bg-[#35B5D8] text-[#0A0A0A] font-bold shadow-md'
                    : 'text-[#D1D5DB] hover:text-white hover:bg-white/5'
                }`}
              >
                {cat === 'All' ? 'All Reviews' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials 3-Column Dark Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {filteredTestimonials.map((t) => {
            const initials = t.name
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('');

            return (
              <div
                key={t.id}
                className="bg-[#121212] rounded-2xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between h-full shadow-xl hover:border-[#35B5D8]/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#F2F028]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#F2F028]" />
                      ))}
                    </div>

                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#35B5D8] bg-[#35B5D8]/10 border border-[#35B5D8]/20 px-2.5 py-1 rounded-md">
                      {t.category}
                    </span>
                  </div>

                  <p className="text-sm text-[#D1D5DB] leading-relaxed mb-5 font-normal italic">
                    "{t.text}"
                  </p>

                  {t.carModel && (
                    <div className="flex items-center gap-2 text-xs text-neutral-300 mb-6 bg-[#161616] p-2.5 rounded-xl border border-white/5">
                      <Car className="w-3.5 h-3.5 text-[#F2F028] shrink-0" />
                      <span className="truncate">Vehicle: <strong className="text-white">{t.carModel}</strong></span>
                    </div>
                  )}
                </div>

                {/* Customer Profile Strip */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#35B5D8] to-[#1d7b93] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md relative border border-white/20">
                    <span>{initials}</span>
                    <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#22C55E] rounded-full border-2 border-[#121212] flex items-center justify-center text-[8px] text-white">
                      ✓
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white truncate">
                      {t.name}
                    </div>
                    <div className="text-xs text-neutral-400 truncate">
                      {t.role} · {t.organization}
                    </div>
                    <div className="text-xs text-[#35B5D8] flex items-center gap-1 font-medium mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-[#35B5D8] shrink-0" />
                      <span className="truncate">{t.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
