import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
import { Link, SEO } from '../router';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Phone,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface ServicesDirectoryPageProps {
  onOpenBooking: (serviceTitle?: string) => void;
}

const DEDICATED_SEO_MAP: Record<string, string> = {
  'personal-driver': '/personal-driver-service',
  'full-time-driver': '/full-time-driver-service',
  'part-time-driver': '/part-time-driver-service',
  'temporary-driver': '/temporary-driver-service',
  'hourly-driver': '/hourly-driver-service',
  'corporate-driver': '/corporate-driver-service',
  'airport-driver': '/airport-driver-service',
  'outstation-driver': '/outstation-driver-service',
  'chauffeur-service': '/chauffeur-service',
};

export const ServicesDirectoryPage: React.FC<ServicesDirectoryPageProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Family & Personal', 'Corporate & Executive', 'On-Demand & Travel'];

  const filteredServices = servicesData.filter((svc) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Family & Personal') {
      return ['personal-driver', 'full-time-driver', 'permanent-driver', 'senior-citizen-driver'].includes(svc.slug);
    }
    if (activeCategory === 'Corporate & Executive') {
      return ['corporate-driver', 'chauffeur-service', 'airport-driver'].includes(svc.slug);
    }
    if (activeCategory === 'On-Demand & Travel') {
      return ['part-time-driver', 'temporary-driver', 'hourly-driver', 'outstation-driver', 'event-driver'].includes(svc.slug);
    }
    return true;
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': servicesData.map((svc, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': svc.title,
      'url': `https://ontimedriverservice.com${DEDICATED_SEO_MAP[svc.slug] || `/services/${svc.slug}`}`,
    })),
  };

  return (
    <>
      <SEO
        title="All Driver Services in Mumbai – Personal, Full-Time, Corporate & Chauffeurs | On Time Driver Service"
        description="Explore On Time Driver Service's verified driver solutions across Mumbai. Personal drivers, monthly retainers, corporate fleets, outstation, airport and temporary drivers."
        canonicalPath="/services"
        schema={schema}
      />

      <div className="pt-24 sm:pt-28 pb-20 bg-[#050505] text-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-neutral-400">
            <Link href="/" className="hover:text-[#35B6DE] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-white font-semibold">Driver Services</span>
          </nav>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0B0B] border border-[#35B6DE]/40 shadow-md mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F3ED1A]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
                Verified Chauffeur Solutions
              </span>
            </div>
            <h1 className="text-h1 font-extrabold text-white mb-4">
              Professional Driver Services in Mumbai
            </h1>
            <p className="text-subheading text-[#CFCFCF] leading-relaxed">
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
                      ? 'bg-[#35B6DE] text-[#050505] font-bold shadow-md'
                      : 'bg-[#0B0B0B] text-[#CFCFCF] border border-white/10 hover:border-white/20'
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
                  className="bg-[#0B0B0B] rounded-2xl border border-white/10 hover:border-[#35B6DE]/50 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-[#35B6DE]/10 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div>
                    {/* 16:9 Image */}
                    <div className="relative aspect-video w-full bg-[#181818] overflow-hidden">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.title}
                        fallbackTitle={service.title}
                        vehicleTag={service.vehicleTag}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent pointer-events-none" />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="glass-badge text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                          {service.badge}
                        </span>
                        <span className="bg-[#22C55E]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                          Police Verified
                        </span>
                      </div>

                      {service.vehicleTag && (
                        <div className="absolute bottom-2.5 left-3 z-10">
                          <span className="text-[10px] font-semibold text-[#F3ED1A] bg-black/80 px-2 py-0.5 rounded border border-white/10">
                            {service.vehicleTag}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#35B6DE] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#CFCFCF] line-clamp-2 leading-relaxed mb-4">
                        {service.shortDescription}
                      </p>

                      <div className="space-y-1.5 mb-4 text-xs text-neutral-300">
                        {service.keyFeatures.slice(0, 2).map((feat, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#35B6DE] shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 bg-[#0e0e0e]/80">
                    <Link
                      href={targetUrl}
                      className="flex-1 h-[50px] btn-secondary text-sm font-semibold flex items-center justify-center gap-1.5"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-4 h-4 text-[#35B6DE]" />
                    </Link>

                    <button
                      onClick={() => onOpenBooking(service.title)}
                      className="h-[50px] px-5 btn-primary text-sm font-bold flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-4 h-4 text-[#050505]" />
                      <span>Book</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Help Card */}
          <div className="mt-16 p-8 rounded-2xl bg-[#0B0B0B] border border-white/15 text-center flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="text-left">
              <h3 className="text-xl font-bold text-white">Need a customized driver arrangement?</h3>
              <p className="text-xs sm:text-sm text-[#CFCFCF] mt-1">
                We handle shift duties, multi-car family packages, and corporate fleet drivers across Mumbai.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="tel:8652880057"
                className="btn-primary h-[50px] px-6 text-sm font-bold inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#050505]" />
                <span>Call 8652880057</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
