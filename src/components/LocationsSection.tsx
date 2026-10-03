import React, { useState } from 'react';
import { locationsData } from '../data/locationsData';
import { ImageWithFallback } from './ImageWithFallback';
import {
  MapPin,
  Clock,
  Route,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Navigation,
  Sparkles,
} from 'lucide-react';
import { Link } from '../router';

interface LocationsSectionProps {
  onSelectLocationAndBook: (locationName: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onSelectLocationAndBook }) => {
  const [activeLocationId, setActiveLocationId] = useState<string>('mumbai');

  const primaryDistricts = [
    { name: 'Mumbai', id: 'mumbai', dispatch: '20–35 Mins', hubs: 'BKC, South Mumbai, Bandra, Andheri, Powai, Borivali' },
    { name: 'Thane', id: 'thane', dispatch: '25–40 Mins', hubs: 'Majiwada, Ghodbunder, Teen Hath Naka, Naupada' },
    { name: 'Navi Mumbai', id: 'navi-mumbai', dispatch: '25–40 Mins', hubs: 'Vashi, Nerul, Belapur, Kharghar, Palm Beach' },
    { name: 'Mira Road', id: 'mira-road', dispatch: '30–45 Mins', hubs: 'Shanti Nagar, Kanakia, Beverly Park, Pleasant Park' },
    { name: 'Bhayandar', id: 'bhayandar', dispatch: '30–45 Mins', hubs: 'Station Road, Golden Nest, Maxus Mall, Uttan' },
    { name: 'Vasai', id: 'vasai', dispatch: '35–50 Mins', hubs: 'Evershine City, Vasai West, Ambadi Road' },
    { name: 'Virar', id: 'virar', dispatch: '35–50 Mins', hubs: 'Global City, Bolinj, Yazoo Park, Station Road' },
    { name: 'Palghar', id: 'palghar', dispatch: '45–60 Mins', hubs: 'Boisar, Manor, Palghar Town, Industrial Zone' },
  ];

  const activeLocation = locationsData.find((loc) => loc.id === activeLocationId) || locationsData[0];

  return (
    <section id="locations" className="py-20 lg:py-28 bg-[#0A0A0A] text-white border-b border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#35B5D8]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[#35B5D8]/40 shadow-md mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F2F028]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B5D8]">
              Comprehensive MMR Chauffeur Coverage
            </span>
          </div>

          <h2 className="text-h2 font-extrabold text-white mb-4">
            Service Coverage Across Mumbai Metropolitan Region
          </h2>

          <p className="text-subheading text-[#D1D5DB] leading-relaxed">
            On Time Driver Service maintains dedicated driver clusters and fast doorstep dispatch across all 8 key municipal corporations and transit corridors in Mumbai.
          </p>
        </div>

        {/* Panoramic Mumbai Sea Link & City Skyline Visual Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl mb-12 bg-[#121212] text-white">
          <div className="h-64 sm:h-80 md:h-96 w-full relative overflow-hidden">
            {/* SVG Backdrop of Sea Link at Dusk with glowing accents */}
            <svg
              className="absolute inset-0 w-full h-full object-cover"
              viewBox="0 0 1200 500"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="mSkyDark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#04090F" />
                  <stop offset="40%" stopColor="#0A1826" />
                  <stop offset="80%" stopColor="#11293D" />
                  <stop offset="100%" stopColor="#1B4261" />
                </linearGradient>
                <linearGradient id="mWaterDark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#081A2A" />
                  <stop offset="100%" stopColor="#02060A" />
                </linearGradient>
              </defs>
              <rect width="1200" height="500" fill="url(#mSkyDark)" />

              {/* Distant Skyline Silhouettes */}
              <path d="M 0 320 L 50 320 L 50 250 L 80 250 L 80 320 L 140 320 L 140 210 L 170 210 L 170 320 L 220 320 L 220 180 L 245 180 L 245 320 L 320 320 L 320 230 L 350 230 L 350 320 L 450 320 L 450 260 L 490 260 L 490 320 L 600 320 L 600 190 L 640 190 L 640 320 L 750 320 L 750 220 L 800 220 L 800 320 L 920 320 L 920 200 L 970 200 L 970 320 L 1100 320 L 1100 240 L 1150 240 L 1150 320 L 1200 320 L 1200 500 L 0 500 Z" fill="#06121D" />

              {/* Sea Link Pylons and Cables with Cyan Glow */}
              <line x1="380" y1="320" x2="380" y2="110" stroke="#35B5D8" strokeWidth="4" />
              <line x1="380" y1="110" x2="260" y2="320" stroke="#35B5D8" strokeWidth="1.2" opacity="0.6" />
              <line x1="380" y1="110" x2="300" y2="320" stroke="#35B5D8" strokeWidth="1.2" opacity="0.7" />
              <line x1="380" y1="110" x2="340" y2="320" stroke="#35B5D8" strokeWidth="1.2" opacity="0.8" />
              <line x1="380" y1="110" x2="420" y2="320" stroke="#35B5D8" strokeWidth="1.2" opacity="0.8" />
              <line x1="380" y1="110" x2="460" y2="320" stroke="#35B5D8" strokeWidth="1.2" opacity="0.7" />
              <line x1="380" y1="110" x2="500" y2="320" stroke="#35B5D8" strokeWidth="1.2" opacity="0.6" />

              <line x1="720" y1="320" x2="720" y2="110" stroke="#35B5D8" strokeWidth="4" />
              <line x1="720" y1="110" x2="600" y2="320" stroke="#35B5D8" strokeWidth="1.2" opacity="0.6" />
              <line x1="720" y1="110" x2="640" y2="320" stroke="#35B5D8" strokeWidth="1.2" opacity="0.7" />
              <line x1="720" y1="110" x2="680" y2="320" stroke="#35B5D8" strokeWidth="1.2" opacity="0.8" />
              <line x1="720" y1="110" x2="760" y2="320" stroke="#35B5D8" strokeWidth="1.2" opacity="0.8" />
              <line x1="720" y1="110" x2="800" y2="320" stroke="#35B5D8" strokeWidth="1.2" opacity="0.7" />
              <line x1="720" y1="110" x2="840" y2="320" stroke="#35B5D8" strokeWidth="1.2" opacity="0.6" />

              {/* Bridge deck & vehicle traffic glow */}
              <line x1="0" y1="320" x2="1200" y2="320" stroke="#F2F028" strokeWidth="3" opacity="0.8" />
              <rect y="325" width="1200" height="175" fill="url(#mWaterDark)" />
            </svg>

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent flex flex-col justify-end p-6 sm:p-10">
              <div className="max-w-2xl">
                <span className="px-3 py-1 rounded-full bg-[#35B5D8]/20 border border-[#35B5D8]/50 text-[#35B5D8] text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                  Connected Mumbai Network
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Bandra-Worli Sea Link to Ghodbunder &amp; Beyond
                </h3>
                <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                  Our chauffeurs navigate Mumbai's fastest expressways, coastal road, toll gates, and local bypasses with peak-hour composure and defense driving skills.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 8 Primary District Quick Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3 mb-8">
          {primaryDistricts.map((district) => {
            const isActive = activeLocationId === district.id;
            return (
              <button
                key={district.id}
                onClick={() => setActiveLocationId(district.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#181818] border-[#35B5D8] shadow-lg shadow-[#35B5D8]/10'
                    : 'bg-[#121212] border-white/10 hover:border-white/25'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-1">
                  <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-[#F2F028]' : 'text-[#35B5D8]'}`} />
                  <span className="truncate">{district.name}</span>
                </div>
                <div className="text-[10px] text-neutral-400 font-medium">
                  {district.dispatch}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Location Information Panel */}
        <div className="bg-[#121212] rounded-2xl border border-white/15 p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-[#35B5D8] text-[#0A0A0A] text-xs font-extrabold uppercase tracking-wider">
                  {activeLocation.name} Sector
                </span>
                <span className="text-xs text-neutral-300 font-semibold flex items-center gap-1.5 px-3 py-1 bg-black/40 rounded-md border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-[#35B5D8]" />
                  <span>Avg Dispatch: {activeLocation.avgDispatchTime}</span>
                </span>
                <span className="text-xs text-neutral-300 font-semibold flex items-center gap-1.5 px-3 py-1 bg-black/40 rounded-md border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Police Verified Staging</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                {activeLocation.seoHeadline}
              </h3>

              <p className="text-sm text-[#D1D5DB] leading-relaxed">
                {activeLocation.shortSnippet}
              </p>

              {/* Local Staging Hubs */}
              <div className="pt-2">
                <div className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#F2F028]" />
                  <span>Key Staging Hubs in {activeLocation.name}:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeLocation.popularHubs.map((hub, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-black/40 border border-white/10 text-neutral-300 text-xs rounded-lg font-medium"
                    >
                      {hub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Arteries */}
              <div className="pt-1">
                <div className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                  <Route className="w-4 h-4 text-[#35B5D8]" />
                  <span>Major Arteries Handled:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeLocation.keyRoutes.map((route, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-[#35B5D8]/10 border border-[#35B5D8]/20 text-[#35B5D8] text-xs rounded-lg font-medium"
                    >
                      {route}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onSelectLocationAndBook(activeLocation.name)}
                  className="btn-primary w-full sm:w-auto h-[52px] px-6 text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#F2F028]/20"
                >
                  <span>Book Chauffeur in {activeLocation.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href={`/locations/${activeLocation.id}`}
                  className="btn-secondary w-full sm:w-auto h-[52px] px-6 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <span>Explore {activeLocation.name} Hub Profile</span>
                </Link>
              </div>
            </div>

            {/* Right: Regional Map & Staging Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 aspect-[4/3] bg-[#161616] shadow-2xl">
                <ImageWithFallback
                  src={activeLocation.image}
                  alt={`Chauffeur service operations in ${activeLocation.name}`}
                  fallbackTitle={`${activeLocation.name} Operations Hub`}
                  locationTag={activeLocation.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#F2F028] mb-1">
                    Doorstep Allocation Ready
                  </div>
                  <div className="text-sm font-bold">
                    Local drivers familiar with {activeLocation.name} shortcuts &amp; traffic patterns
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Directory Link */}
        <div className="mt-10 text-center">
          <Link
            href="/service-areas"
            className="text-sm font-semibold text-[#35B5D8] hover:text-[#F2F028] inline-flex items-center gap-1.5 transition-colors"
          >
            <span>View All Regional Coverage Details &amp; Highway Navigation Profiles</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
