import React, { useState } from 'react';
import { locationsData } from '../data/locationsData';
import { ImageWithFallback } from './ImageWithFallback';
import { MapPin, Clock, Route, ChevronRight, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

interface LocationsSectionProps {
  onSelectLocationAndBook: (locationName: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onSelectLocationAndBook }) => {
  const [activeLocationId, setActiveLocationId] = useState<string>('mumbai');

  const activeLocation = locationsData.find((loc) => loc.id === activeLocationId) || locationsData[0];

  return (
    <section id="locations" className="py-16 sm:py-20 lg:py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] mb-3">
            Hyper-Local Chauffeur Staging &amp; Coverage
          </div>
          <h2 className="text-h2 text-white mb-4">
            Service Locations <span className="gold-gradient-text">Across Mumbai &amp; MMR</span>
          </h2>
          <p className="text-body-lead text-neutral-400 font-light">
            Driver Nest India maintains dedicated chauffeur staging clusters across all 11 key regions in the Mumbai Metropolitan Region.
            Select a region below to review localized highway routes, staging hubs, and response times.
          </p>
        </div>

        {/* Location Visual Cards Scroll Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 mb-10">
          {locationsData.map((loc) => {
            const isActive = activeLocationId === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setActiveLocationId(loc.id)}
                className={`group relative rounded-xl overflow-hidden text-left p-3 border transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#D4AF37] bg-[#1A1810] shadow-lg shadow-[#D4AF37]/20 ring-1 ring-[#D4AF37]'
                    : 'border-neutral-800 bg-[#0E0E0E] hover:border-[#D4AF37]/45'
                }`}
              >
                <div className="h-16 w-full rounded-lg overflow-hidden mb-2 relative">
                  <ImageWithFallback
                    src={loc.image}
                    alt={loc.name}
                    fallbackTitle={loc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#E5C07B] transition-colors truncate">
                  {loc.name}
                </h4>
                <p className="text-[10px] text-neutral-400 truncate">{loc.district}</p>
              </button>
            );
          })}
        </div>

        {/* Active Location Deep-Dive Visual Showcase */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#E5C07B] mb-2 uppercase tracking-wider font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{activeLocation.district}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug font-display">
                {activeLocation.seoHeadline}
              </h3>

              <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed whitespace-pre-line mb-8 font-light">
                {activeLocation.fullContent}
              </div>

              {/* Localized FAQ Block */}
              <div className="pt-6 border-t border-neutral-800 space-y-4">
                <h4 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider font-mono">
                  Regional FAQs for {activeLocation.name}
                </h4>
                <div className="space-y-3">
                  {activeLocation.localFaqs.map((faq, fIdx) => (
                    <div key={fIdx} className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                      <p className="text-xs sm:text-sm font-semibold text-white mb-1.5">{faq.question}</p>
                      <p className="text-xs text-neutral-400 leading-relaxed font-light">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Meta Column with Visual Asset & Action Card */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Location Feature Image */}
              <div className="rounded-xl overflow-hidden border border-[#D4AF37]/30 h-52 sm:h-64 relative">
                <ImageWithFallback
                  src={activeLocation.image}
                  alt={`Chauffeur service in ${activeLocation.name}`}
                  fallbackTitle={activeLocation.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] text-[#E5C07B] font-mono uppercase block font-semibold">Active Staging Hub</span>
                  <h4 className="text-lg font-bold text-white font-display">{activeLocation.name} Coverage Hub</h4>
                </div>
              </div>

              {/* Response Time Badge */}
              <div className="p-4 rounded-xl bg-[#141414] border border-[#D4AF37]/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-mono">Typical Response ETA</span>
                  <span className="text-sm font-bold text-white font-mono">{activeLocation.avgDispatchTime}</span>
                </div>
              </div>

              {/* Popular Local Hubs */}
              <div className="p-4 rounded-xl bg-[#141414] border border-neutral-800">
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-2.5 flex items-center gap-1.5 font-mono">
                  <MapPin className="w-3.5 h-3.5" />
                  Key Neighborhoods &amp; Staging Zones
                </span>
                <ul className="space-y-1.5">
                  {activeLocation.popularHubs.slice(0, 4).map((hub, hIdx) => (
                    <li key={hIdx} className="text-xs text-neutral-300 flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{hub}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Booking CTA */}
              <button
                onClick={() => onSelectLocationAndBook(activeLocation.name)}
                className="w-full btn-primary h-12"
              >
                <span>Book Driver in {activeLocation.name}</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
