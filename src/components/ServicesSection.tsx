import React from 'react';
import { servicesData } from '../data/servicesData';
import { ImageWithFallback } from './ImageWithFallback';
import {
  UserCheck,
  ShieldCheck,
  CalendarClock,
  Briefcase,
  PlaneTakeoff,
  Compass,
  PartyPopper,
  HeartHandshake,
  Crown,
  CheckCircle,
  ArrowRight,
  Clock,
  Car,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { Link } from '../router';

interface ServicesSectionProps {
  onSelectServiceAndBook: (serviceTitle: string) => void;
}

const DEDICATED_PAGE_URLS: Record<string, string> = {
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

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceAndBook }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-[#35B5D8]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#35B5D8]" />;
      case 'CalendarClock':
        return <CalendarClock className="w-5 h-5 text-[#35B5D8]" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-[#35B5D8]" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-[#35B5D8]" />;
      case 'PlaneTakeoff':
        return <PlaneTakeoff className="w-5 h-5 text-[#35B5D8]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#35B5D8]" />;
      case 'PartyPopper':
        return <PartyPopper className="w-5 h-5 text-[#35B5D8]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#35B5D8]" />;
      case 'Crown':
        return <Crown className="w-5 h-5 text-[#35B5D8]" />;
      default:
        return <Car className="w-5 h-5 text-[#35B5D8]" />;
    }
  };

  return (
    <section id="services" className="relative py-20 lg:py-28 bg-[#0A0A0A] text-white border-b border-white/10">
      {/* Background radial glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#35B5D8]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#F2F028]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[#35B5D8]/40 shadow-md mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F2F028]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B5D8]">
              Executive Mobility Solutions
            </span>
          </div>

          <h2 className="text-h2 font-extrabold text-white mb-4">
            Specialized Chauffeur Services in Mumbai
          </h2>

          <p className="text-subheading text-[#D1D5DB] leading-relaxed">
            Every chauffeur is 100% background-verified by local police, proficient with premium automatic &amp; manual vehicle models, and guaranteed on-time across Mumbai MMR.
          </p>
        </div>

        {/* Services Grid:
            Desktop: 3 cards per row
            Tablet: 2 cards per row
            Mobile: 1 card per row
            Equal card heights & consistent image sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {servicesData.slice(0, 9).map((service) => {
            const pageUrl = DEDICATED_PAGE_URLS[service.slug] || `/services/${service.slug}`;

            return (
              <div
                key={service.id}
                className="h-full bg-[#121212] rounded-2xl border border-white/10 hover:border-[#35B5D8]/50 overflow-hidden flex flex-col justify-between group shadow-xl hover:shadow-[#35B5D8]/10 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Card Image with 16:9 Aspect Ratio & Glass Badges */}
                  <div className="relative aspect-video w-full overflow-hidden bg-[#181818]">
                    <ImageWithFallback
                      src={service.image}
                      alt={`${service.title} in Mumbai`}
                      fallbackTitle={service.title}
                      vehicleTag={service.vehicleTag}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Dark gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30 pointer-events-none" />

                    {/* Top Overlay Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                      <span className="glass-badge text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {service.badge}
                      </span>
                      <span className="bg-[#22C55E]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Police Verified
                      </span>
                    </div>

                    {/* Vehicle tag pill */}
                    {service.vehicleTag && (
                      <div className="absolute bottom-2.5 left-3 z-10">
                        <span className="text-[10px] font-semibold text-[#F2F028] bg-black/75 px-2 py-0.5 rounded border border-white/10">
                          {service.vehicleTag}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#35B5D8]/15 border border-[#35B5D8]/30 flex items-center justify-center shrink-0">
                        {getIcon(service.iconName)}
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#35B5D8] transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-sm text-[#D1D5DB] line-clamp-2 mb-4 leading-relaxed font-normal">
                      {service.shortDescription}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2 mb-2 text-xs text-neutral-300">
                      {service.keyFeatures.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#35B5D8] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions Footer - Equal height anchor */}
                <div className="p-5 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 bg-[#0e0e0e]/80">
                  <Link
                    href={pageUrl}
                    className="flex-1 h-[50px] btn-secondary text-sm font-semibold flex items-center justify-center gap-1.5 text-white"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 text-[#35B5D8]" />
                  </Link>

                  <button
                    onClick={() => onSelectServiceAndBook(service.title)}
                    className="h-[50px] px-5 btn-primary text-sm font-bold flex items-center justify-center gap-1.5 shrink-0"
                    title={`Book ${service.title}`}
                  >
                    <Calendar className="w-4 h-4 text-[#0A0A0A]" />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Services Link */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="btn-secondary h-[52px] px-8 text-sm font-bold inline-flex items-center gap-2 hover:border-[#35B5D8]"
          >
            <span>Explore All 12 Chauffeur Services &amp; Packages</span>
            <ArrowRight className="w-4 h-4 text-[#35B5D8]" />
          </Link>
        </div>

      </div>
    </section>
  );
};
