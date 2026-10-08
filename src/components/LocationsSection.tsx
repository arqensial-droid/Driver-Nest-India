import React, { useState } from 'react';
import { locationsData } from '../data/locationsData';
import {
  MapPin,
  Clock,
  Route,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Navigation,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { Link } from '../router';

interface LocationsSectionProps {
  onSelectLocationAndBook: (locationName: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onSelectLocationAndBook }) => {
  const [activeLocationId, setActiveLocationId] = useState<string>('mumbai');

  const primaryDistricts = [
    { name: 'Mumbai', id: 'mumbai', dispatch: 'Priority Dispatch', hubs: 'BKC, South Mumbai, Bandra, Andheri, Powai, Borivali' },
    { name: 'Thane', id: 'thane', dispatch: 'Priority Dispatch', hubs: 'Majiwada, Ghodbunder, Teen Hath Naka, Naupada' },
    { name: 'Navi Mumbai', id: 'navi-mumbai', dispatch: 'Priority Dispatch', hubs: 'Vashi, Nerul, Belapur, Kharghar, Palm Beach' },
    { name: 'Mira Road', id: 'mira-road', dispatch: 'Priority Dispatch', hubs: 'Shanti Nagar, Kanakia, Beverly Park, Pleasant Park' },
    { name: 'Bhayandar', id: 'bhayandar', dispatch: 'Priority Dispatch', hubs: 'Station Road, Golden Nest, Maxus Mall, Uttan' },
    { name: 'Vasai', id: 'vasai', dispatch: 'Priority Dispatch', hubs: 'Evershine City, Vasai West, Ambadi Road' },
    { name: 'Virar', id: 'virar', dispatch: 'Priority Dispatch', hubs: 'Global City, Bolinj, Yazoo Park, Station Road' },
    { name: 'Palghar', id: 'palghar', dispatch: 'Priority Dispatch', hubs: 'Boisar, Manor, Palghar Town, Industrial Zone' },
  ];

  const activeLocation = locationsData.find((loc) => loc.id === activeLocationId) || locationsData[0];

  return (
    <section id="locations" className="py-20 lg:py-24 bg-white text-[#111827] border-b border-[#E5E7EB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF8FC] border border-[#35B6DE]/30 shadow-xs mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#35B6DE]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
              Mumbai MMR Coverage
            </span>
          </div>

          <h2 className="text-h2 font-extrabold text-[#111827] mb-4">
            Service Coverage Across Mumbai Metropolitan Region
          </h2>

          <p className="text-subheading text-[#4B5563] leading-relaxed font-normal text-base sm:text-lg">
            On Time Driver Service maintains dedicated driver clusters and fast doorstep dispatch across all 8 key municipal corridors in Mumbai.
          </p>
        </div>

        {/* Panoramic Mumbai Skyline Visual Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm mb-12 bg-slate-900 text-white">
            <picture className="w-full h-full block">
              <source type="image/webp" srcSet="/images/services/service-areas-mumbai.webp" />
              <img
                src="/images/services/service-areas-mumbai.jpg"
                alt="Mumbai Metropolitan Region driver service network coverage across Mumbai, Navi Mumbai, Thane, Mira Road, Vasai, Virar, and Palghar"
                className="w-full h-full object-cover brightness-75"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/90 via-[#111827]/60 to-transparent" />
            
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE] bg-[#35B6DE]/20 border border-[#35B6DE]/40 px-3 py-1 rounded-full self-start mb-2">
                Fast Doorstep Allocation
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-2">
                Connecting Every Corner of Mumbai MMR
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
                From South Mumbai heritage precincts and BKC financial towers to Thane corporate parks, Navi Mumbai IT corridors, and Western suburbs.
              </p>
            </div>
          </div>

        {/* City Filter Tabs (8 Regions) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {primaryDistricts.map((district) => (
            <button
              key={district.id}
              onClick={() => setActiveLocationId(district.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeLocationId === district.id
                  ? 'bg-[#35B6DE] text-white shadow-sm'
                  : 'bg-[#EEF8FC] text-[#4B5563] hover:text-[#111827] hover:bg-slate-200/60 border border-[#E5E7EB]'
              }`}
            >
              {district.name}
            </button>
          ))}
        </div>

        {/* Active Location Detail Card */}
        <div className="bg-[#EEF8FC] rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[#35B6DE] border border-[#35B6DE]/30">
                  Active Dispatch Hub
                </span>
                <span className="text-xs font-semibold text-[#4B5563] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#35B6DE]" />
                  Prompt Doorstep Dispatch
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#111827]">
                Professional Driver Service in {activeLocation.name}
              </h3>

              <p className="text-sm text-[#4B5563] leading-relaxed">
                {activeLocation.heroSubtitle ||
                  `Hire verified, experienced personal, corporate, airport, and monthly drivers across all major residential and commercial sectors in ${activeLocation.name}.`}
              </p>

              {/* Key Hubs Tags */}
              <div>
                <p className="text-xs font-bold text-[#111827] mb-2 uppercase tracking-wider">
                  Major Service Neighborhoods in {activeLocation.name}:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(activeLocation.keyHubs || activeLocation.popularHubs || []).map((hub: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#E5E7EB] text-[#111827] text-xs font-medium"
                    >
                      {hub}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSelectLocationAndBook(activeLocation.name)}
                  className="btn-primary w-full sm:w-auto h-11 px-6 text-xs sm:text-sm font-bold shadow-xs flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#111827]" />
                  <span>Request Driver</span>
                </button>

                <Link
                  href={`/locations/${activeLocation.slug || activeLocation.id}`}
                  className="btn-secondary w-full sm:w-auto h-11 px-5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5"
                >
                  <span>View {activeLocation.name} Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#35B6DE]" />
                </Link>
              </div>
            </div>

            {/* Right Photo Preview */}
            <div className="lg:col-span-5">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-[#E5E7EB] shadow-xs bg-slate-100">
                <img
                  src={activeLocation.image}
                  alt={`Driver service in ${activeLocation.name}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-[#111827] border border-[#E5E7EB] shadow-xs">
                  {activeLocation.name} Express Dispatch Pod
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom All Locations Link */}
        <div className="mt-10 text-center">
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#35B6DE] hover:text-[#111827] transition-colors"
          >
            <span>Explore All 8 Operational Regions in Detail</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
