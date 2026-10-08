import React from 'react';
import { servicesData } from '../data/servicesData';
import {
  UserCheck,
  Briefcase,
  ShieldCheck,
  Compass,
  PlaneTakeoff,
  Clock,
  Car,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Calendar,
} from 'lucide-react';
import { Link } from '../router';

interface ServicesSectionProps {
  onSelectServiceAndBook: (serviceTitle: string) => void;
}

const DEDICATED_PAGE_URLS: Record<string, string> = {
  'personal-driver': '/personal-driver-service',
  'corporate-driver': '/corporate-driver-service',
  'permanent-driver': '/permanent-driver-service',
  'hourly-driver': '/hourly-driver-service',
  'airport-driver': '/airport-driver-service',
  'outstation-driver': '/outstation-driver-service',
};

// The 6 exact services requested by the client:
// Personal Driver, Corporate Driver, Permanent Driver, Hourly Driver, Airport Driver, Outstation Driver
const CORE_CATEGORY_SLUGS = [
  'personal-driver',
  'corporate-driver',
  'permanent-driver',
  'hourly-driver',
  'airport-driver',
  'outstation-driver',
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceAndBook }) => {
  const getIcon = (slug: string) => {
    switch (slug) {
      case 'personal-driver':
        return <UserCheck className="w-5 h-5 text-[#35B6DE]" />;
      case 'corporate-driver':
        return <Briefcase className="w-5 h-5 text-[#35B6DE]" />;
      case 'permanent-driver':
        return <ShieldCheck className="w-5 h-5 text-[#35B6DE]" />;
      case 'hourly-driver':
        return <Clock className="w-5 h-5 text-[#35B6DE]" />;
      case 'airport-driver':
        return <PlaneTakeoff className="w-5 h-5 text-[#35B6DE]" />;
      case 'outstation-driver':
        return <Compass className="w-5 h-5 text-[#35B6DE]" />;
      default:
        return <Car className="w-5 h-5 text-[#35B6DE]" />;
    }
  };

  const displayServices = CORE_CATEGORY_SLUGS.map(
    (slug) => servicesData.find((s) => s.slug === slug) || servicesData[0]
  );

  return (
    <section id="services" className="py-20 lg:py-24 bg-[#EEF8FC] text-[#111827] border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#35B6DE]/30 shadow-xs mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#35B6DE]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
              Specialized Chauffeur Services
            </span>
          </div>

          <h2 className="text-h2 font-extrabold text-[#111827] mb-4">
            Professional Driver Services in Mumbai
          </h2>

          <p className="text-subheading text-[#4B5563] leading-relaxed font-normal text-base sm:text-lg">
            Choose from our range of verified, trained driver services tailored for corporate executives, busy families, daily commutes, and weekend highway trips.
          </p>
        </div>

        {/* 6 Modern Service Cards with Real Service Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayServices.map((service) => {
            const pageUrl = DEDICATED_PAGE_URLS[service.slug] || `/services/${service.slug}`;
            return (
              <div
                key={service.slug}
                className="bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#35B6DE] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                <div>
                  {/* 100% Realistic Photography Card Header */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <picture className="w-full h-full block">
                      <source type="image/webp" srcSet={`/images/services/${service.slug}.webp`} />
                      <img
                        src={`/images/services/${service.slug}.jpg`}
                        alt={
                          service.slug === 'personal-driver'
                            ? 'Real Indian chauffeur with customer beside a premium sedan in Mumbai'
                            : service.slug === 'corporate-driver'
                            ? 'Professional chauffeur assisting business executive with corporate executive sedan'
                            : service.slug === 'permanent-driver'
                            ? 'Dedicated chauffeur assisting family members with household vehicle'
                            : service.slug === 'hourly-driver'
                            ? 'Professional Indian driver navigating city traffic smoothly in sedan'
                            : service.slug === 'airport-driver'
                            ? 'Professional chauffeur assisting passenger with luggage at Mumbai airport'
                            : service.slug === 'outstation-driver'
                            ? 'Professional highway driver steering premium SUV on expressway road trip'
                            : `${service.title} – Professional Indian chauffeur service in Mumbai MMR`
                        }
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </picture>
                    
                    {/* Verified Status Tag */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-[#E5E7EB] px-3 py-1 rounded-lg text-[11px] font-bold text-[#111827] flex items-center gap-1 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                      <span>{service.badge || 'Police Verified'}</span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-[#111827]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-semibold">
                      {service.dutyFlexibility || 'On-Demand & Monthly'}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#111827] mb-2 font-heading group-hover:text-[#35B6DE] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-[#4B5563] leading-relaxed mb-4 line-clamp-2">
                      {service.shortDesc || service.shortDescription}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2 mb-6 pt-2 border-t border-[#E5E7EB]">
                      {(service.features || service.keyFeatures || []).slice(0, 3).map((feat: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#4B5563]">
                          <CheckCircle className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions / CTA Buttons */}
                <div className="p-6 pt-0 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectServiceAndBook(service.title)}
                    className="flex-1 h-11 rounded-xl bg-[#F3ED1A] hover:bg-[#eae415] text-[#111827] font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#111827]" />
                    <span>Book Driver</span>
                  </button>

                  <Link
                    href={pageUrl}
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

        {/* Bottom Directory Link */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#35B6DE] hover:bg-slate-50 text-[#111827] font-bold text-sm shadow-xs transition-colors"
          >
            <span>View All 10+ Driver Services &amp; Packages</span>
            <ArrowRight className="w-4 h-4 text-[#35B6DE]" />
          </Link>
        </div>

      </div>
    </section>
  );
};
