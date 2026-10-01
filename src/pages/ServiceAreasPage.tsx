import React from 'react';
import { locationsData } from '../data/locationsData';
import { Link, SEO } from '../router';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  ChevronRight,
  ArrowRight,
  MapPin,
  Clock,
  Route,
  ShieldCheck,
  Phone,
  MessageSquare,
} from 'lucide-react';

interface ServiceAreasPageProps {
  onOpenBooking: (serviceTitle?: string, locationName?: string) => void;
}

export const ServiceAreasPage: React.FC<ServiceAreasPageProps> = ({ onOpenBooking }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': locationsData.map((loc, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': `Driver Service in ${loc.name}`,
      'url': `https://drivernestindia.com/locations/${loc.id}`
    }))
  };

  return (
    <>
      <SEO
        title="Service Areas Across Mumbai & MMR – Driver Nest India"
        description="Comprehensive driver coverage across Mumbai, Thane, Navi Mumbai, Mira Road, Bhayandar, Vasai, Virar, Panvel, Kalyan, and Dombivli. 30-45 min dispatch."
        canonicalPath="/service-areas"
        schema={schema}
      />

      <div className="pt-16 sm:pt-24 pb-12 sm:pb-20 bg-black text-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 flex items-center gap-2 text-xs text-neutral-400">
            <Link href="/" className="hover:text-[#E5C07B] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-[#E5C07B] font-medium">Service Areas</span>
          </nav>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
              MMR Strategic Coverage
            </div>
            <h1 className="text-h1 text-white mb-3">
              Service Areas Across Mumbai &amp; MMR
            </h1>
            <p className="text-body-lead text-neutral-300 font-light">
              Driver Nest India operates dedicated driver staging clusters across 11 key regions in the Mumbai Metropolitan Region. Select a location to review localized response times, arterial highways, and staging zones.
            </p>
          </div>

          {/* Locations Grid - 16px mobile card gap and padding, 16:9 images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch mb-12 sm:mb-16">
            {locationsData.map((loc) => (
              <div
                key={loc.id}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-[#D4AF37]/25 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-neutral-950">
                    <ImageWithFallback
                      src={loc.image}
                      alt={loc.name}
                      fallbackTitle={loc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
                    
                    {/* Non-overlapping bottom badges */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10 pointer-events-none">
                      <span className="text-xs font-bold text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-black/85 backdrop-blur-md border border-[#D4AF37]/35 truncate">
                        {loc.name}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-mono text-[#E5C07B] px-2 py-0.5 rounded bg-black/85 backdrop-blur-md border border-[#D4AF37]/20 shrink-0">
                        ETA: {loc.avgDispatchTime}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#E5C07B] uppercase tracking-wider block mb-1 font-mono">
                      {loc.district}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#E5C07B] transition-colors font-display">
                      Driver Service in {loc.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light mb-3">
                      {loc.shortSnippet}
                    </p>

                    <div className="space-y-1 text-xs text-neutral-400 mb-2">
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span className="truncate">{loc.popularHubs.slice(0, 3).join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Route className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span className="truncate">{loc.keyRoutes.slice(0, 2).join(' · ')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-2 sm:px-6 sm:pb-6 border-t border-neutral-800/80 bg-neutral-950/40 mt-auto">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/locations/${loc.id}`}
                      className="flex-1 btn-primary h-12 text-xs"
                    >
                      <span>Explore {loc.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
                    </Link>
                    <button
                      onClick={() => onOpenBooking('Personal Driver', loc.name)}
                      className="btn-secondary h-12 text-xs px-3"
                      title="Quick Booking"
                      aria-label={`Book driver in ${loc.name}`}
                    >
                      <span>Book</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Assistance Box */}
          <div className="p-4 sm:p-8 rounded-2xl glass-card border border-[#D4AF37]/35 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-display">Unsure About Your Location&apos;s Coverage?</h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1">
                Our operations staging covers every corner of Mumbai, Thane, Palghar, and Raigad. Contact our helpline.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a href="tel:+919930012345" className="btn-secondary">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Call +91 99300 12345</span>
              </a>
              <button onClick={() => onOpenBooking()} className="btn-primary">
                <span>Book a Chauffeur</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
