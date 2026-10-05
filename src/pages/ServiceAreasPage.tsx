import React from 'react';
import { locationsData } from '../data/locationsData';
import { Link, SEO } from '../router';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Phone,
  Calendar,
} from 'lucide-react';

interface ServiceAreasPageProps {
  onOpenBooking: (serviceTitle?: string, locationName?: string) => void;
}

export const ServiceAreasPage: React.FC<ServiceAreasPageProps> = ({ onOpenBooking }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Driver & Chauffeur Services Mumbai MMR',
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'On Time Driver Service',
      'telephone': '+91 8652880057',
    },
    'areaServed': locationsData.map((l) => ({
      '@type': 'AdministrativeArea',
      'name': l.name,
    })),
  };

  return (
    <>
      <SEO
        title="Service Areas – On Time Driver Service | Mumbai, Thane, Navi Mumbai, Mira Road & MMR"
        description="Comprehensive driver coverage across Mumbai, Thane, Navi Mumbai, Mira Road, Bhayandar, Vasai, Virar, Panvel, Kalyan, Dombivli, and Palghar. Fast 30-45 min dispatch."
        canonicalPath="/service-areas"
        schema={schema}
      />

      <div className="pt-24 sm:pt-28 pb-20 bg-[#F8FAFC] text-[#111827] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-[#4B5563]">
            <Link href="/" className="hover:text-[#35B6DE] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span className="text-[#111827] font-semibold">Service Areas</span>
          </nav>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#35B6DE]/30 shadow-xs mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-[#35B6DE]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
                Mumbai Metropolitan Region Coverage
              </span>
            </div>
            <h1 className="text-h1 font-extrabold text-[#111827] mb-4">
              Driver Service Across Mumbai &amp; MMR
            </h1>
            <p className="text-subheading text-[#4B5563] leading-relaxed text-base sm:text-lg">
              On Time Driver Service operates dedicated driver clusters across key regions in the Mumbai Metropolitan Region. Select your locality to view dispatch times, arterial routes, and book a verified driver.
            </p>
          </div>

          {/* Locations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {locationsData.map((location) => (
              <div
                key={location.id}
                className="bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#35B6DE] flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 group"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                    <ImageWithFallback
                      src={location.image}
                      alt={location.name}
                      fallbackTitle={location.name}
                      locationTag={location.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#35B6DE] text-white text-xs font-extrabold px-3 py-1 rounded-md shadow-xs">
                      {location.name}
                    </div>

                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-[#E5E7EB] text-[#111827] text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                      <Clock className="w-3 h-3 text-[#35B6DE]" />
                      <span>{location.avgDispatchTime}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#111827] mb-2 group-hover:text-[#35B6DE] transition-colors">
                      Driver Service in {location.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4B5563] line-clamp-2 leading-relaxed mb-4">
                      {location.shortSnippet}
                    </p>

                    {/* Popular Hubs */}
                    <div className="space-y-1 mb-2">
                      <div className="text-[11px] font-bold text-[#111827] uppercase tracking-wider">
                        Key Hubs:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {location.popularHubs.slice(0, 4).map((hub, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-[#EEF8FC] border border-[#E5E7EB] text-[#4B5563] text-xs"
                          >
                            {hub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-3">
                  <button
                    onClick={() => onOpenBooking(undefined, location.name)}
                    className="flex-1 h-11 rounded-xl bg-[#F3ED1A] hover:bg-[#eae415] text-[#111827] font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#111827]" />
                    <span>Book in {location.name}</span>
                  </button>

                  <Link
                    href={`/locations/${location.slug || location.id}`}
                    className="h-11 px-4 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#35B6DE] hover:bg-[#EEF8FC] text-[#111827] font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3 text-[#35B6DE]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout Banner */}
          <div className="mt-16 p-8 rounded-2xl bg-white border border-[#E5E7EB] text-center flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="text-left">
              <span className="text-xs font-bold text-[#35B6DE] uppercase tracking-wider block mb-1">
                Fast Doorstep Deployment
              </span>
              <h3 className="text-xl font-bold font-heading text-[#111827] mb-1">
                Need a Driver Dispatched to Your Doorstep Right Now?
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563]">
                Our local driver stations ensure rapid reporting in 30–45 minutes across Mumbai MMR.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="tel:8652880057"
                className="btn-secondary h-11 px-5 text-xs sm:text-sm font-semibold flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-[#35B6DE]" />
                <span>8652880057</span>
              </a>
              <button
                onClick={() => onOpenBooking()}
                className="btn-primary h-11 px-6 text-xs sm:text-sm font-bold shadow-xs"
              >
                <span>Book Driver</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
