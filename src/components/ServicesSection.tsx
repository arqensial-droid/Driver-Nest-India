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
        return <UserCheck className="w-5 h-5 text-[#D4AF37]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />;
      case 'CalendarClock':
        return <CalendarClock className="w-5 h-5 text-[#D4AF37]" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-[#D4AF37]" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-[#D4AF37]" />;
      case 'PlaneTakeoff':
        return <PlaneTakeoff className="w-5 h-5 text-[#D4AF37]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#D4AF37]" />;
      case 'PartyPopper':
        return <PartyPopper className="w-5 h-5 text-[#D4AF37]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#D4AF37]" />;
      case 'Crown':
        return <Crown className="w-5 h-5 text-[#D4AF37]" />;
      default:
        return <UserCheck className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  const handleWhatsAppBooking = (serviceTitle: string) => {
    const text = encodeURIComponent(
      `Hello Driver Nest India, I am interested in booking a driver for ${serviceTitle}. Please share chauffeur availability and consultation details.`
    );
    window.open(`https://wa.me/919930012345?text=${text}`, '_blank');
  };

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Consistent Spacing & Typography Hierarchy */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] mb-3">
            Bespoke Chauffeur &amp; Driver Solutions
          </div>
          <h2 className="text-h2 text-white mb-4">
            Professional Driver Services <span className="gold-gradient-text">for Every Requirement</span>
          </h2>
          <p className="text-body-lead text-neutral-400 font-light">
            Verified Indian chauffeurs and drivers trained on popular vehicles—including Toyota Innova Crysta,
            Honda City, Hyundai Creta, Maruti Ertiga, and Mercedes-Benz E-Class across Mumbai and MMR.
          </p>
        </div>

        {/* Premium Image Cards Grid: All 10 Services Equal Height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-[#D4AF37]/25 flex flex-col h-full group"
            >
              {/* Card Top: Uniform Aspect Ratio Image with Overlay Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950 shrink-0">
                <ImageWithFallback
                  src={service.image}
                  alt={`${service.title} - ${service.sceneDescription}`}
                  fallbackTitle={service.title}
                  vehicleTag={service.vehicleTag}
                  locationTag={service.locationTag}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Contrast Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/20 to-transparent pointer-events-none" />

                {/* Floating Top Badge & Icon */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="text-[11px] font-semibold text-white px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 shadow-sm">
                    {service.badge}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-black/85 backdrop-blur-md border border-[#D4AF37]/40 flex items-center justify-center shadow-sm">
                    {getIcon(service.iconName)}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1">
                {/* Short Headline */}
                <span className="text-[11px] font-semibold text-[#E5C07B] uppercase tracking-wider block mb-1 font-mono">
                  {service.shortHeadline}
                </span>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#E5C07B] transition-colors font-display">
                  {service.title}
                </h3>

                {/* Indian Professional Photography Scenario Indicator */}
                <div className="p-2.5 rounded-lg bg-[#080808] border border-[#D4AF37]/20 text-[11px] text-neutral-300 mb-3.5 flex items-start gap-1.5 leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-1" />
                  <span>{service.sceneDescription}</span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4 font-light">
                  {service.shortDescription}
                </p>

                {/* Trust Statement */}
                <div className="p-2.5 rounded-lg bg-neutral-950/80 border border-[#D4AF37]/20 text-[11px] text-[#E5C07B] font-medium mb-4 flex items-center gap-1.5">
                  <span>{service.trustStatement}</span>
                </div>

                {/* Vehicle Suitability & Details Trigger */}
                <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-neutral-800/80 mt-auto">
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
              <div className="px-6 pb-6 pt-3 border-t border-neutral-800/80 bg-neutral-950/50">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => onSelectServiceAndBook(service.title)}
                    className="flex-1 h-11 text-xs font-bold text-black bg-gradient-to-r from-[#F3D085] via-[#D4AF37] to-[#B89020] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-[#D4AF37]/20 whitespace-nowrap"
                  >
                    <Calendar className="w-3.5 h-3.5 text-black" />
                    <span>Book Driver</span>
                  </button>

                  <button
                    onClick={() => handleWhatsAppBooking(service.title)}
                    className="h-11 px-3 text-xs font-semibold text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/40 rounded-xl hover:bg-[#25D366]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
                    title="Inquire on WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Consultation Assistance Banner */}
        <div className="mt-12 lg:mt-16 p-6 sm:p-8 rounded-2xl glass-card border border-[#D4AF37]/35 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E5C07B] to-[#D4AF37] flex items-center justify-center text-black shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-display">Need a Customized Chauffeur Plan?</h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light">
                We cater to corporate fleets, multi-day outstation road trips, and private family monthly retainers.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onSelectServiceAndBook('Custom Chauffeur Requirement')}
              className="btn-primary w-full md:w-auto"
            >
              <span>Speak to Concierge</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="fixed inset-0" onClick={() => setSelectedService(null)} />
          <div className="bg-[#111111] border border-[#D4AF37]/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl z-10">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-xl bg-neutral-900 border border-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6 border border-[#D4AF37]/30">
              <ImageWithFallback
                src={selectedService.image}
                alt={selectedService.title}
                fallbackTitle={selectedService.title}
                vehicleTag={selectedService.vehicleTag}
                locationTag={selectedService.locationTag}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-semibold text-[#E5C07B] uppercase tracking-wider block font-mono">
                  {selectedService.badge}
                </span>
                <h3 className="text-2xl font-bold text-white font-display">{selectedService.title}</h3>
              </div>
            </div>

            <div className="space-y-5">
              <div className="p-3 rounded-lg bg-[#080808] border border-[#D4AF37]/25 text-xs text-neutral-200 flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0 mt-1" />
                <span><strong>Authentic Scenario:</strong> {selectedService.sceneDescription}</span>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                {selectedService.fullDescription}
              </p>

              <div>
                <h4 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2.5 font-mono">
                  Key Service Standards
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.keyFeatures.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2 font-mono">
                  Compatible Vehicles
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedService.vehicleSuitability.map((veh, vIdx) => (
                    <span
                      key={vIdx}
                      className="px-2.5 py-1 text-xs rounded-md bg-neutral-900 border border-neutral-700 text-neutral-300"
                    >
                      {veh}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    onSelectServiceAndBook(title);
                  }}
                  className="btn-primary flex-1"
                >
                  <Calendar className="w-4 h-4 text-black" />
                  <span>Request Driver for This Service</span>
                </button>
                <button
                  onClick={() => handleWhatsAppBooking(selectedService.title)}
                  className="btn-whatsapp"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
