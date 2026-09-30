import React, { useState } from 'react';
import { testimonialsData } from '../data/testimonialsData';
import { Star, ShieldCheck, Car, MapPin, Quote } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const SocialProofSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = ['All', 'Family', 'Corporate', 'Senior Citizen', 'Luxury Car Owner'];

  const filteredTestimonials = testimonialsData.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-24 bg-[#060606] relative border-t border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] mb-3">
            Real Experiences from Mumbai Car Owners
          </div>
          <h2 className="text-h2 text-white mb-4">
            Trusted by Mumbai&apos;s <span className="gold-gradient-text">Families &amp; Executives</span>
          </h2>
          <p className="text-body-lead text-neutral-400 font-light">
            Authentic client feedback from corporate leaders in BKC, families in Powai and Thane, senior citizens in Dadar,
            and luxury automotive owners across South Mumbai and Juhu.
          </p>

          {/* Category Tabs with Standardized Sizing */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 mt-8 bg-[#111111] border border-neutral-800 rounded-xl max-w-xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === cat
                    ? 'bg-gradient-to-r from-[#F3D085] to-[#D4AF37] text-black font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                {cat === 'All' ? 'All Stories' : `${cat} Stories`}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Cards Grid with Equal Height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredTestimonials.map((t) => (
            <div
              key={t.id}
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 border border-[#D4AF37]/20 flex flex-col justify-between h-full"
            >
              <div>
                {/* Header: Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#D4AF37]/30" />
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 italic font-light">
                  &quot;{t.text}&quot;
                </p>
              </div>

              {/* Client Profile Lockup with Authentic Avatar */}
              <div className="pt-4 border-t border-neutral-800/80 mt-auto">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37]/40 shrink-0">
                    <ImageWithFallback
                      src={t.avatar}
                      alt={t.name}
                      fallbackTitle={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate font-display">{t.name}</h4>
                    <p className="text-xs text-[#E5C07B] truncate font-medium">
                      {t.role} {t.organization ? `· ${t.organization}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                  <div className="flex items-center gap-1 truncate pr-2">
                    <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                    <span className="truncate">{t.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 shrink-0 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Client</span>
                  </div>
                </div>

                {t.carModel && (
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mt-2 pt-2 border-t border-neutral-900">
                    <Car className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Vehicle: <strong className="text-neutral-200 font-medium">{t.carModel}</strong></span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
