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
    <section id="locations" className="py-20 lg:py-28 bg-[#050505] text-white border-b border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#35B6DE]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0B0B] border border-[#35B6DE]/40 shadow-md mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F3ED1A]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
              Service Areas
            </span>
          </div>

          <h2 className="text-h2 font-extrabold text-white mb-4">
            Service Coverage Across Mumbai Metropolitan Region
          </h2>

          <p className="text-subheading text-[#CFCFCF] leading-relaxed font-normal">
            On Time Driver Service maintains dedicated driver clusters and fast doorstep dispatch across all 8 key municipal corridors in Mumbai.
          </p>
        </div>

        {/* Panoramic Mumbai Sea Link & City Skyline Visual Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl mb-12 bg-[#0B0B0B] text-white">
          <div className="h-64 sm:h-80 md:h-96 w-full relative overflow-hidden">
            {/* SVG Backdrop of Sea Link at Dusk with glowing accents */}
            <svg
              className="absolute inset-0 w-full h-full object-cover"
              viewBox="0 0 1200 500"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="mumbaiSky" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#050505" />
                  <stop offset="60%" stopColor="#0a1726" />
                  <stop offset="100%" stopColor="#0B0B0B" />
                </linearGradient>
                <linearGradient id="seaGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#35B6DE" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#F3ED1A" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#35B6DE" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <rect width="100%" height="100%" fill="url(#mumbaiSky)" />

              {/* Distant Mumbai Skyline Silhouette */}
              <path
                d="M 50 360 L 50 260 L 80 260 L 80 360 L 100 360 L 100 220 L 130 220 L 130 360 L 160 360 L 160 280 L 190 280 L 190 360 L 220 360 L 220 180 L 240 160 L 260 180 L 260 360 L 300 360 L 300 240 L 330 240 L 330 360 L 380 360 L 380 200 L 420 200 L 420 360 L 470 360 L 470 270 L 500 270 L 500 360 L 550 360 L 550 150 L 570 120 L 590 150 L 590 360 L 640 360 L 640 230 L 680 230 L 680 360 L 730 360 L 730 250 L 760 250 L 760 360 L 820 360 L 820 190 L 850 190 L 850 360 L 910 360 L 910 270 L 940 270 L 940 360 L 1000 360 L 1000 210 L 1040 210 L 1040 360 L 1100 360 L 1100 240 L 1140 240 L 1140 360 L 1200 360 L 1200 500 L 0 500 Z"
                fill="#070d14"
                opacity="0.85"
              />

              {/* Bandra-Worli Sea Link Pylons & Cable Stayed Geometric Network */}
              <polygon points="450,380 460,80 470,80 480,380" fill="#203a4c" />
              <polygon points="750,380 760,80 770,80 780,380" fill="#203a4c" />

              {/* Cable Lines with Blue Glow */}
              <g stroke="#35B6DE" strokeWidth="1.2" opacity="0.6">
                <line x1="465" y1="90" x2="330" y2="380" />
                <line x1="465" y1="120" x2="360" y2="380" />
                <line x1="465" y1="150" x2="390" y2="380" />
                <line x1="465" y1="180" x2="420" y2="380" />
                <line x1="465" y1="90" x2="600" y2="380" />
                <line x1="465" y1="120" x2="570" y2="380" />
                <line x1="465" y1="150" x2="540" y2="380" />
                <line x1="465" y1="180" x2="510" y2="380" />

                <line x1="765" y1="90" x2="630" y2="380" />
                <line x1="765" y1="120" x2="660" y2="380" />
                <line x1="765" y1="150" x2="690" y2="380" />
                <line x1="765" y1="180" x2="720" y2="380" />
                <line x1="765" y1="90" x2="900" y2="380" />
                <line x1="765" y1="120" x2="870" y2="380" />
                <line x1="765" y1="150" x2="840" y2="380" />
                <line x1="765" y1="180" x2="810" y2="380" />
              </g>

              {/* Deck Roadway with Ambient Yellow & Blue Light Trail */}
              <rect x="0" y="375" width="1200" height="15" fill="#0b1723" />
              <path d="M 0 382 L 1200 382" stroke="url(#seaGlow)" strokeWidth="4" />

              {/* Arabian Sea Water Surface */}
              <rect x="0" y="390" width="1200" height="110" fill="#04090f" />
              <ellipse cx="600" cy="440" rx="500" ry="25" fill="#35B6DE" opacity="0.08" />
            </svg>

            {/* Dark gradient overlay & text caption on banner */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent flex flex-col justify-end p-6 sm:p-10">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#050505]/85 border border-[#35B6DE]/50 text-xs font-bold text-[#35B6DE] uppercase tracking-wider mb-2">
                  <Navigation className="w-3.5 h-3.5 text-[#F3ED1A]" />
                  Rapid Transit &amp; Coastal Road Ready
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading text-white mb-2 leading-tight">
                  Seamless Travel Across Sea Link, Eastern Freeway &amp; Coastal Road
                </h3>
                <p className="text-xs sm:text-sm text-[#CFCFCF] font-normal leading-relaxed">
                  Our chauffeurs master Mumbai's high-speed corridors and complex inner junction bypasses with precision and defensive handling.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* District Selector Pills (8 Municipal Districts) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10">
          {primaryDistricts.map((district) => (
            <button
              key={district.id}
              onClick={() => setActiveLocationId(district.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                activeLocationId === district.id
                  ? 'bg-[#35B6DE] text-[#050505] shadow-lg shadow-[#35B6DE]/25'
                  : 'bg-[#0B0B0B] text-[#CFCFCF] border border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{district.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                activeLocationId === district.id ? 'bg-[#050505] text-[#F3ED1A]' : 'bg-white/10 text-neutral-400'
              }`}>
                {district.dispatch}
              </span>
            </button>
          ))}
        </div>

        {/* Active District Detail Showcase Card */}
        <div className="bg-[#0B0B0B] rounded-2xl border border-white/15 p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: District Information */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 bg-[#35B6DE]/15 text-[#35B6DE] border border-[#35B6DE]/30 text-xs font-bold rounded-lg uppercase tracking-wider">
                  {activeLocation.name} Operations Hub
                </span>
                <span className="px-3 py-1 bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 text-xs font-bold rounded-lg flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Doorstep Dispatch: {primaryDistricts.find(d => d.id === activeLocation.id)?.dispatch || '30 Mins'}
                </span>
              </div>

              <h3 className="text-h2 font-extrabold text-white">
                Professional Drivers Available in {activeLocation.name}
              </h3>

              <p className="text-sm sm:text-base text-[#CFCFCF] leading-relaxed font-normal">
                {activeLocation.shortSnippet || activeLocation.fullContent}
              </p>

              {/* Major Hubs */}
              <div className="bg-[#050505] rounded-xl p-4 border border-white/10">
                <div className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#F3ED1A]" />
                  <span>Key Locality Hubs Served:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeLocation.popularHubs.map((hub: string, i: number) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-white/5 border border-white/10 text-xs rounded-lg text-[#CFCFCF]"
                    >
                      {hub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Routes */}
              <div className="bg-[#050505] rounded-xl p-4 border border-white/10">
                <div className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                  <Route className="w-4 h-4 text-[#35B6DE]" />
                  <span>Major Arteries Handled:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeLocation.keyRoutes.map((route, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-[#35B6DE]/10 border border-[#35B6DE]/20 text-[#35B6DE] text-xs rounded-lg font-medium"
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
                  className="btn-primary w-full sm:w-auto h-[52px] px-6 text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#F3ED1A]/20"
                >
                  <span>Book Chauffeur in {activeLocation.name}</span>
                  <ArrowRight className="w-4 h-4 text-[#050505]" />
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
              <div className="relative rounded-2xl overflow-hidden border border-white/15 aspect-[4/3] bg-[#050505] shadow-2xl">
                <ImageWithFallback
                  src={activeLocation.image}
                  alt={`Chauffeur service operations in ${activeLocation.name}`}
                  fallbackTitle={`${activeLocation.name} Operations Hub`}
                  locationTag={activeLocation.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#F3ED1A] mb-1">
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
            className="text-sm font-semibold text-[#35B6DE] hover:text-[#F3ED1A] inline-flex items-center gap-1.5 transition-colors"
          >
            <span>View All Regional Coverage Details &amp; Highway Navigation Profiles</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
