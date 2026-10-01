import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
import { Link, SEO } from '../router';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  Phone,
  MessageSquare,
} from 'lucide-react';

interface ServicesDirectoryPageProps {
  onOpenBooking: (serviceTitle?: string) => void;
}

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
      'url': `https://drivernestindia.com/services/${svc.slug}`
    }))
  };

  return (
    <>
      <SEO
        title="All Driver Services in Mumbai – Personal, Full-Time, Corporate & Chauffeurs | Driver Nest India"
        description="Explore Driver Nest India's full portfolio of 12 verified driver services across Mumbai. Personal drivers, monthly chauffeurs, corporate fleets, outstation, airport & elderly assistance."
        canonicalPath="/services"
        schema={schema}
      />

      <div className="pt-16 sm:pt-24 pb-12 sm:pb-20 bg-black text-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 flex items-center gap-2 text-xs text-neutral-400">
            <Link href="/" className="hover:text-[#E5C07B] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-[#E5C07B] font-medium">Services Directory</span>
          </nav>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
              Bespoke Mobility Portfolio
            </div>
            <h1 className="text-h1 text-white mb-3">
              All Professional Driver Services
            </h1>
            <p className="text-body-lead text-neutral-300 font-light">
              Explore our full directory of 12 verified chauffeur solutions. Click on any service to view comprehensive details, vehicle compatibility, verified dossiers, and booking options.
            </p>

            {/* Category Filter Tabs - Horizontally scrollable chips on mobile */}
            <div className="flex items-center gap-2 p-1.5 mt-6 bg-[#111111] border border-neutral-800 rounded-xl max-w-xl mx-auto overflow-x-auto no-scrollbar justify-start sm:justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-[#F3D085] to-[#D4AF37] text-black font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid (All 12 Services in equal-height cards, 16px mobile padding, 16:9 images) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch mb-12 sm:mb-16">
            {filteredServices.map((svc) => (
              <div
                key={svc.id}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-[#D4AF37]/25 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-neutral-950">
                    <ImageWithFallback
                      src={svc.image}
                      alt={svc.sceneDescription}
                      fallbackTitle={svc.title}
                      vehicleTag={svc.vehicleTag}
                      locationTag={svc.locationTag}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent pointer-events-none" />
                    
                    {/* Non-overlapping badge */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10 pointer-events-none">
                      <span className="text-[10px] sm:text-[11px] font-semibold text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-black/85 backdrop-blur-md border border-[#D4AF37]/35 whitespace-normal max-w-[85%] leading-tight">
                        {svc.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#E5C07B] uppercase tracking-wider block mb-1 font-mono">
                      {svc.shortHeadline}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#E5C07B] transition-colors font-display">
                      {svc.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light mb-3">
                      {svc.shortDescription}
                    </p>
                    <div className="p-2 sm:p-2.5 rounded-lg bg-[#080808] border border-[#D4AF37]/20 text-[10px] sm:text-[11px] text-neutral-300 mb-2 flex items-start gap-1.5 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-1" />
                      <span>{svc.sceneDescription}</span>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-2 sm:px-6 sm:pb-6 border-t border-neutral-800/80 bg-neutral-950/40 mt-auto">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/services/${svc.slug}`}
                      className="flex-1 btn-primary h-12 text-xs"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
                    </Link>
                    <button
                      onClick={() => onOpenBooking(svc.title)}
                      className="btn-secondary h-12 text-xs px-3"
                      title="Quick Booking"
                      aria-label={`Book ${svc.title}`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Need help choosing banner */}
          <div className="p-6 sm:p-8 rounded-2xl glass-card border border-[#D4AF37]/35 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-display">Need Assistance Choosing a Driver Service?</h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1">
                Speak directly with our concierge team. We assess your vehicle type, commute routes, and monthly schedules.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a href="tel:+919930012345" className="btn-secondary">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Call Concierge</span>
              </a>
              <button onClick={() => onOpenBooking()} className="btn-primary">
                <span>Book Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
