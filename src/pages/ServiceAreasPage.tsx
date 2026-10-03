import React from 'react';
import { locationsData } from '../data/locationsData';
import { Link, SEO } from '../router';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  ChevronRight,
  ArrowRight,
  MapPin,
  Clock,
  ShieldCheck,
  Phone,
  Sparkles,
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
      'url': `https://ontimedriverservice.com/locations/${loc.id}`,
    })),
  };

  return (
    <>
      <SEO
        title="Service Areas Across Mumbai & MMR – On Time Driver Service"
        description="Comprehensive driver coverage across Mumbai, Thane, Navi Mumbai, Mira Road, Bhayandar, Vasai, Virar, Panvel, Kalyan, Dombivli, and Palghar. Fast 30-45 min dispatch."
        canonicalPath="/service-areas"
        schema={schema}
      />

      <div className="pt-24 sm:pt-28 pb-20 bg-[#0A0A0A] text-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-neutral-400">
            <Link href="/" className="hover:text-[#35B5D8] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-white font-semibold">Service Areas</span>
          </nav>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[#35B5D8]/40 shadow-md mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F2F028]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#35B5D8]">
                Mumbai Metropolitan Region Coverage
              </span>
            </div>
            <h1 className="text-h1 font-extrabold text-white mb-4">
              Driver Service Across Mumbai &amp; MMR
            </h1>
            <p className="text-subheading text-[#D1D5DB] leading-relaxed">
              On Time Driver Service operates dedicated driver clusters across key regions in the Mumbai Metropolitan Region. Select your locality to view dispatch times, arterial routes, and book a verified driver.
            </p>
          </div>

          {/* Locations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {locationsData.map((location) => (
              <div
                key={location.id}
                className="bg-[#121212] rounded-2xl border border-white/10 hover:border-[#35B5D8]/50 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-[#35B5D8]/10 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-video w-full bg-[#181818] overflow-hidden">
                    <ImageWithFallback
                      src={location.image}
                      alt={location.name}
                      fallbackTitle={location.name}
                      locationTag={location.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 bg-[#35B5D8] text-[#0A0A0A] text-xs font-extrabold px-3 py-1 rounded-md shadow-md">
                      {location.name}
                    </div>

                    <div className="absolute top-3 right-3 bg-black/80 border border-white/10 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#F2F028]" />
                      <span>{location.avgDispatchTime}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#35B5D8] transition-colors">
                      Driver Service in {location.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D1D5DB] line-clamp-2 leading-relaxed mb-4">
                      {location.shortSnippet}
                    </p>

                    {/* Popular Hubs */}
                    <div className="space-y-1 mb-2">
                      <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                        Key Hubs:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {location.popularHubs.slice(0, 4).map((hub, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-black/40 border border-white/5 text-neutral-300 text-xs"
                          >
                            {hub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 bg-[#0e0e0e]/80">
                  <Link
                    href={`/locations/${location.id}`}
                    className="flex-1 h-[50px] btn-secondary text-sm font-semibold flex items-center justify-center gap-1.5"
                  >
                    <span>View Hub</span>
                    <ArrowRight className="w-4 h-4 text-[#35B5D8]" />
                  </Link>

                  <button
                    onClick={() => onOpenBooking(undefined, location.name)}
                    className="h-[50px] px-5 btn-primary text-sm font-bold flex items-center justify-center gap-1.5"
                  >
                    <span>Book Here</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Regional Concierge Banner */}
          <div className="mt-16 p-8 rounded-2xl bg-[#121212] border border-white/15 text-center flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="text-left">
              <h3 className="text-xl font-bold text-white">Need a driver outside standard municipal zones?</h3>
              <p className="text-xs sm:text-sm text-[#D1D5DB] mt-1">
                We accommodate long-distance outstation routes to Lonavala, Pune, Alibaug, and Shirdi.
              </p>
            </div>
            <a
              href="tel:8652880057"
              className="btn-primary h-[50px] px-6 text-sm font-bold inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#0A0A0A]" />
              <span>Call 8652880057</span>
            </a>
          </div>

        </div>
      </div>
    </>
  );
};
