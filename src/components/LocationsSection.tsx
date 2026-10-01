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
    <section id="locations" className="py-8 sm:py-16 lg:py-20 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
            Hyper-Local Chauffeur Staging &amp; Coverage
          </div>
          <h2 className="text-h2 text-white mb-3">
            Service Locations <span className="gold-gradient-text">Across Mumbai &amp; MMR</span>
          </h2>
          <p className="text-body-lead text-neutral-400 font-light">
            Driver Nest India maintains dedicated chauffeur staging clusters across all 11 key regions in the Mumbai Metropolitan Region.
            Select a region below to review localized highway routes, staging hubs, and response times.
          </p>
        </div>

        {/* Location Visual Cards Scroll Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6 sm:mb-8">
          {locationsData.map((loc) => {
            const isActive = activeLocationId === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setActiveLocationId(loc.id)}
                className={`group relative rounded-xl overflow-hidden text-left p-2.5 sm:p-3 border transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#D4AF37] bg-[#1A1810] shadow-lg shadow-[#D4AF37]/20 ring-1 ring-[#D4AF37]'
                    : 'border-neutral-800 bg-[#0E0E0E] hover:border-[#D4AF37]/45'
                }`}
              >
                <div className="h-14 sm:h-16 w-full rounded-lg overflow-hidden mb-2 relative">
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

        {/* Active Location Showcase Card */}
        <div className="glass-card rounded-2xl p-4 sm:p-8 lg:p-10 border border-[#D4AF37]/35 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            {/* Visual Aspect Ratio */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#D4AF37]/25 aspect-video relative shadow-xl">
              <ImageWithFallback
                src={activeLocation.image}
                alt={`Professional driver service in ${activeLocation.name}`}
                fallbackTitle={activeLocation.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] sm:text-xs font-mono uppercase text-[#E5C07B] tracking-wider block font-semibold">
                  Coverage Sector
                </span>
                <h4 className="text-base sm:text-xl font-bold text-white font-display">{activeLocation.name} Chauffeur Hub</h4>
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-mono uppercase text-[#D4AF37] px-2.5 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                  {activeLocation.district}
                </span>
                <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Avg ETA: {activeLocation.avgDispatchTime}</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-display">
                {activeLocation.seoHeadline}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4 font-light">
                {activeLocation.shortSnippet}
              </p>

              {/* Hubs & Routes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <span className="text-[11px] font-semibold text-[#E5C07B] uppercase tracking-wider block mb-1.5 font-mono flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Key Staging Hubs</span>
                  </span>
                  <ul className="space-y-1">
                    {activeLocation.popularHubs.slice(0, 3).map((hub, idx) => (
                      <li key={idx} className="text-xs text-neutral-300 flex items-center gap-1.5">
                        <ChevronRight className="w-3 h-3 text-[#D4AF37] shrink-0" />
                        <span className="truncate">{hub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <span className="text-[11px] font-semibold text-[#E5C07B] uppercase tracking-wider block mb-1.5 font-mono flex items-center gap-1.5">
                    <Route className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Primary Routes</span>
                  </span>
                  <ul className="space-y-1">
                    {activeLocation.keyRoutes.slice(0, 3).map((route, idx) => (
                      <li key={idx} className="text-xs text-neutral-300 flex items-center gap-1.5">
                        <ChevronRight className="w-3 h-3 text-[#D4AF37] shrink-0" />
                        <span className="truncate">{route}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onSelectLocationAndBook(activeLocation.name)}
                  className="btn-primary"
                >
                  <span>Book Driver in {activeLocation.name}</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
                <div className="flex items-center gap-1.5 text-xs text-[#E5C07B] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>100% Police Verified Roster</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
