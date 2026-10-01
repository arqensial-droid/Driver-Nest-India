import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
import { ServiceItem } from '../types';
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
  X,
  MessageSquare,
  Calendar,
  Clock,
  Sparkles,
  Car,
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceAndBook: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceAndBook }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />;
      case 'CalendarClock':
        return <CalendarClock className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />;
      case 'Clock':
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />;
      case 'Briefcase':
        return <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />;
      case 'PlaneTakeoff':
        return <PlaneTakeoff className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />;
      case 'Compass':
        return <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />;
      case 'PartyPopper':
        return <PartyPopper className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />;
      case 'Crown':
        return <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />;
      default:
        return <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />;
    }
  };

  const handleWhatsAppBooking = (serviceTitle: string) => {
    const text = encodeURIComponent(
      `Hello Driver Nest India, I am interested in booking a driver for ${serviceTitle}. Please share chauffeur availability and consultation details.`
    );
    window.open(`https://wa.me/919930012345?text=${text}`, '_blank');
  };

  return (
    <section id="services" className="py-8 sm:py-16 lg:py-20 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
            Bespoke Chauffeur &amp; Driver Solutions
          </div>
          <h2 className="text-h2 text-white mb-3">
            Professional Driver Services <span className="gold-gradient-text">for Every Requirement</span>
          </h2>
          <p className="text-body-lead text-neutral-400 font-light">
            Verified Indian chauffeurs and drivers trained on popular vehicles—including Toyota Innova Crysta,
            Honda City, Hyundai Creta, Maruti Ertiga, and Mercedes-Benz E-Class across Mumbai and MMR.
          </p>
        </div>

        {/* Premium Image Cards Grid: 16px mobile card gap and 16px padding */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-[#D4AF37]/25 flex flex-col justify-between h-full group"
            >
              {/* Card Top: 16:9 Aspect Ratio Image with Non-overlapping Badge */}
              <div className="relative aspect-video overflow-hidden bg-neutral-950 shrink-0">
                <ImageWithFallback
                  src={service.image}
                  alt={`${service.title} - ${service.sceneDescription}`}
                  fallbackTitle={service.title}
                  vehicleTag={service.vehicleTag}
                  locationTag={service.locationTag}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/20 to-transparent pointer-events-none" />

                {/* Floating Top Badge */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10 pointer-events-none">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-black/85 backdrop-blur-md border border-[#D4AF37]/40 shadow-sm whitespace-normal max-w-[80%] leading-tight">
                    {service.badge}
                  </span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black/85 backdrop-blur-md border border-[#D4AF37]/40 flex items-center justify-center shadow-sm shrink-0">
                    {getIcon(service.iconName)}
                  </div>
                </div>
              </div>

              {/* Card Body with 16px mobile padding (p-4 sm:p-6) */}
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#E5C07B] uppercase tracking-wider block mb-1 font-mono">
                  {service.shortHeadline}
                </span>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#E5C07B] transition-colors font-display">
                  {service.title}
                </h3>

                {/* Photography Context */}
                <div className="p-2 sm:p-2.5 rounded-lg bg-[#080808] border border-[#D4AF37]/20 text-[10px] sm:text-[11px] text-neutral-300 mb-3 flex items-start gap-1.5 leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-1" />
                  <span>{service.sceneDescription}</span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-3 font-light">
                  {service.shortDescription}
                </p>

                {/* Trust Statement */}
                <div className="p-2 sm:p-2.5 rounded-lg bg-neutral-950/80 border border-[#D4AF37]/20 text-[10px] sm:text-[11px] text-[#E5C07B] font-medium mb-3 flex items-center gap-1.5">
                  <span>{service.trustStatement}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400 pt-2.5 border-t border-neutral-800/80 mt-auto">
                  <span className="truncate pr-2 text-[11px]">Vehicle: {service.vehicleSuitability[0]}</span>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-[#E5C07B] hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium text-xs shrink-0"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card Footer: Standardized Action Buttons Aligned Pinned to Bottom */}
              <div className="px-4 pb-4 pt-2 sm:px-6 sm:pb-6 border-t border-neutral-800/80 bg-neutral-950/50 mt-auto">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onSelectServiceAndBook(service.title)}
                    className="flex-1 h-12 text-xs font-bold text-black bg-gradient-to-r from-[#F3D085] via-[#D4AF37] to-[#B89020] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-[#D4AF37]/20 whitespace-nowrap"
                  >
                    <Calendar className="w-3.5 h-3.5 text-black" />
                    <span>Book Driver</span>
                  </button>
                  <button
                    onClick={() => handleWhatsAppBooking(service.title)}
                    className="h-12 w-12 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/25 flex items-center justify-center cursor-pointer transition-colors shrink-0"
                    title="WhatsApp Consultation"
                    aria-label={`WhatsApp for ${service.title}`}
                  >
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#0E0E0E] rounded-2xl border border-[#D4AF37]/40 shadow-2xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-900 border border-neutral-800"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#E5C07B]">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Verified Chauffeur Dossier</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-display">{selectedService.title}</h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light mb-4">
              {selectedService.fullDescription}
            </p>

            <div className="mb-4">
              <h4 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2 font-mono">
                Key Standards &amp; Verification
              </h4>
              <div className="space-y-1.5">
                {selectedService.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300 font-light">
                    <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-neutral-800">
              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onSelectServiceAndBook(title);
                }}
                className="flex-1 btn-primary h-12 text-xs"
              >
                <span>Request Chauffeur for This Service</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
