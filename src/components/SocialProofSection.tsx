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
    <section id="testimonials" className="py-20 lg:py-28 bg-[#050505] text-white border-b border-white/10 relative">
      {/* Background ambient light */}
      <div className="glow-yellow-sm top-10 left-1/3 pointer-events-none" />
      <div className="glow-blue-lg bottom-10 right-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0B0B] border border-[#35B6DE]/40 shadow-md mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F3ED1A]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
              Customer Reviews
            </span>
          </div>

          <h2 className="text-h2 font-extrabold text-white mb-4">
            Trusted by Mumbai's Discerning Car Owners &amp; Corporates
          </h2>

          <p className="text-subheading text-[#CFCFCF] leading-relaxed font-normal">
            Real feedback from corporate executives in BKC, families in Powai, Thane, and Mira Road, senior citizens in Dadar, and luxury fleet owners across Mumbai.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 p-1.5 mt-8 bg-[#0B0B0B] border border-white/10 rounded-2xl max-w-xl mx-auto overflow-x-auto no-scrollbar justify-start sm:justify-center shadow-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === cat
                    ? 'bg-[#35B6DE] text-[#050505] font-bold shadow-md'
                    : 'text-[#CFCFCF] hover:text-white hover:bg-white/5'
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
            return (
              <div
                key={t.id}
                className="bg-[#0B0B0B] rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-[#35B6DE]/50 flex flex-col justify-between shadow-xl hover:shadow-[#35B6DE]/10 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  {/* Rating Stars & Verified Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1 text-[#F3ED1A]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#F3ED1A]" />
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#22C55E] bg-[#22C55E]/15 border border-[#22C55E]/30 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Hire
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-[#CFCFCF] leading-relaxed mb-6 font-normal italic">
                    "{t.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#35B6DE]/15 border border-[#35B6DE]/30 text-[#35B6DE] flex items-center justify-center font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#35B6DE] transition-colors">
                        {t.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                        <MapPin className="w-3 h-3 text-[#F3ED1A]" />
                        <span>{t.location}</span>
                      </div>
                    </div>
                  </div>

                  {t.carModel && (
                    <span className="text-[10px] text-neutral-400 bg-white/5 border border-white/10 px-2 py-1 rounded">
                      {t.carModel}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
