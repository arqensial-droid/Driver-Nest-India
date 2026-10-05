import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
import { Link, SEO } from '../router';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Phone,
  Calendar,
} from 'lucide-react';

interface ServicesDirectoryPageProps {
  onOpenBooking: (serviceTitle?: string) => void;
}

const DEDICATED_SEO_MAP: Record<string, string> = {
  'hourly-driver': '/hourly-driver-service',
  'permanent-driver': '/permanent-driver-service',
  'personal-driver': '/personal-driver-service',
  'corporate-driver': '/corporate-driver-service',
  'outstation-driver': '/outstation-driver-service',
  'family-driver': '/family-driver-service',
  'chauffeur-service': '/chauffeur-service',
  'full-time-driver': '/permanent-driver-service',
  'part-time-driver': '/part-time-driver-service',
  'airport-driver': '/airport-driver-service',
  'temporary-driver': '/temporary-driver-service',
};

export const ServicesDirectoryPage: React.FC<ServicesDirectoryPageProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Personal', 'Corporate', 'Long Distance', 'Specialized'];

  const filteredServices = servicesData.filter((service) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Personal') {
      return ['personal-driver', 'family-driver', 'temporary-driver', 'hourly-driver', 'part-time-driver'].includes(service.slug);
    }
    if (activeCategory === 'Corporate') {
      return ['corporate-driver', 'chauffeur-service', 'permanent-driver', 'full-time-driver'].includes(service.slug);
    }
    if (activeCategory === 'Long Distance') {
      return ['outstation-driver', 'airport-driver'].includes(service.slug);
    }
    if (activeCategory === 'Specialized') {
      return ['event-driver', 'senior-citizen-assistance'].includes(service.slug);
    }
    return true;
  });

  return (
    <>
      <SEO
        title="All Driver Services in Mumbai – Personal, Full-Time, Corporate & Chauffeurs | On Time Driver Service"
        description="Explore On Time Driver Service's verified driver solutions across Mumbai. Personal drivers, monthly retainers, corporate fleets, outstation, airport and temporary drivers."
        canonicalPath="/services"
      />

      <div className="pt-24 sm:pt-28 pb-20 bg-[#F8FAFC] text-[#111827] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-[#4B5563]">
            <Link href="/" className="hover:text-[#35B6DE] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span className="text-[#111827] font-semibold">Driver Services</span>
          </nav>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#35B6DE]/30 shadow-xs mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-[#35B6DE]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
                Verified Driver Solutions
              </span>
            </div>
            <h1 className="text-h1 font-extrabold text-[#111827] mb-4">
              Professional Driver Services in Mumbai
            </h1>
            <p className="text-subheading text-[#4B5563] leading-relaxed text-base sm:text-lg">
              From daily office commutes to outstation road trips and executive corporate fleets, hire 100% police-verified chauffeurs with zero recruitment hassles and guaranteed replacements.
            </p>

            {/* Filter Pills */}
            <div className="flex items-center justify-center gap-2 mt-8 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all shrink-0 cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#35B6DE] text-white font-bold shadow-xs'
                      : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:text-[#111827]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredServices.map((service) => {
              const targetUrl = DEDICATED_SEO_MAP[service.slug] || `/services/${service.slug}`;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#35B6DE] flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 group"
                >
                  <div>
                    {/* 16:9 Image */}
                    <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.title}
                        fallbackTitle={service.title}
                        vehicleTag={service.vehicleTag}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-[#E5E7EB] px-2.5 py-1 rounded-md text-[11px] font-bold text-[#111827] shadow-xs">
                        {service.badge || 'Verified'}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-[#111827]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-semibold">
                        {service.dutyFlexibility || 'On-Demand & Monthly'}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold font-heading text-[#111827] mb-2 group-hover:text-[#35B6DE] transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4 line-clamp-2">
                        {service.shortDesc || service.shortDescription}
                      </p>

                      <div className="space-y-1.5 mb-6 pt-3 border-t border-[#E5E7EB]">
                        {(service.features || service.keyFeatures || []).slice(0, 3).map((feat: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[#4B5563]">
                            <CheckCircle className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center gap-3">
                    <button
                      onClick={() => onOpenBooking(service.title)}
                      className="flex-1 h-11 rounded-xl bg-[#F3ED1A] hover:bg-[#eae415] text-[#111827] font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#111827]" />
                      <span>Book Driver</span>
                    </button>

                    <Link
                      href={targetUrl}
                      className="h-11 px-4 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#35B6DE] hover:bg-[#EEF8FC] text-[#111827] font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3 text-[#35B6DE]" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Consultation Banner */}
          <div className="mt-16 p-8 rounded-2xl bg-white border border-[#E5E7EB] text-center flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="text-left">
              <span className="text-xs font-bold text-[#35B6DE] uppercase tracking-wider block mb-1">
                Custom Driver Requirements
              </span>
              <h3 className="text-xl font-bold font-heading text-[#111827] mb-1">
                Looking for a Custom Driver Shift or Corporate Retainer?
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563]">
                Our concierge team configures customized duty timings, vehicle specifications, and standby replacements.
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
