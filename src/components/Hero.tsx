import React from 'react';
import {
  Phone,
  Calendar,
  ShieldCheck,
  Star,
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  Car,
  MessageSquare,
  Award,
  Zap,
} from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent('Hi, I need a professional driver service.');
    window.open(`https://wa.me/918652880057?text=${text}`, '_blank');
  };

  const modernBadges = [
    { text: 'Police Verified', icon: ShieldCheck },
    { text: 'Instant Driver Allocation', icon: Zap },
    { text: '5+ Years Experience', icon: Award },
    { text: 'Replacement Guarantee', icon: Clock },
  ];

  return (
    <section className="relative min-h-[92vh] lg:min-h-[96vh] flex items-center pt-24 sm:pt-28 pb-16 lg:py-24 overflow-hidden bg-[#050505] text-white">
      {/* 1. Luxury Chauffeur Image Background with 75% Dark Overlay & Subtle Animated Gradient */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="/images/services/chauffeur-service.jpg"
          alt="Professional Indian Chauffeur and luxury sedan Toyota Innova Crysta in Mumbai"
          fallbackTitle="Luxury Chauffeur Service Mumbai"
          className="w-full h-full object-cover object-center filter brightness-90 transform scale-105 transition-transform duration-1000"
        />
        {/* Dark overlay: 75% opacity with subtle ambient gradient */}
        <div className="absolute inset-0 bg-[#050505]/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/85 to-[#050505]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
      </div>

      {/* 2. Ambient Lighting Glows */}
      <div className="glow-blue-lg -top-20 -left-20 pointer-events-none z-1" />
      <div className="glow-yellow-sm top-1/2 -right-20 pointer-events-none z-1" />

      {/* 3. Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ================= LEFT / PRIMARY CONTENT ================= */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Small Badge: Trusted Chauffeur Service in Mumbai */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#0B0B0B]/90 backdrop-blur-md border border-[#35B6DE]/50 shadow-lg shadow-[#35B6DE]/10 mb-4 sm:mb-5">
              <span className="w-2 h-2 rounded-full bg-[#35B6DE] animate-pulse"></span>
              <Sparkles className="w-3.5 h-3.5 text-[#F3ED1A]" />
              <span className="text-xs sm:text-sm font-bold tracking-wide text-[#35B6DE]">
                Trusted Chauffeur Service in Mumbai
              </span>
            </div>

            {/* Large Headline: Professional Driver Service Across Mumbai */}
            <h1 className="text-h1 text-white font-extrabold tracking-tight mb-4 sm:mb-5">
              Professional Driver Service{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#35B6DE] via-[#7fe0f8] to-[#F3ED1A]">
                Across Mumbai
              </span>
            </h1>

            {/* Subheadline: Verified chauffeurs for personal, corporate, airport transfer and outstation requirements. */}
            <p className="text-subheading text-[#CFCFCF] mb-6 sm:mb-7 leading-relaxed max-w-2xl font-normal">
              Verified chauffeurs for personal, corporate, airport transfer and outstation requirements. Experienced, punctual, and disciplined drivers for Honda City, Toyota Innova Crysta, Fortuner, and luxury sedans across Mumbai &amp; MMR.
            </p>

            {/* Modern Badges Strip: Police Verified, Instant Driver Allocation, 5+ Years Experience, Replacement Guarantee */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
              {modernBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0B0B0B]/85 backdrop-blur-md border border-white/10 hover:border-[#35B6DE]/40 transition-colors shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-md bg-[#35B6DE]/15 flex items-center justify-center shrink-0 text-[#35B6DE]">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                      ✓ {badge.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* ================= CTA SECTION =================
                Buttons same height (52px). Stack on mobile, inline on desktop.
                Primary: Book Driver
                Secondary: Call Now, Whatsapp
            */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 mb-10 w-full sm:w-auto">
              {/* Primary CTA: Book Driver */}
              <button
                onClick={onOpenBooking}
                className="btn-primary w-full sm:w-auto h-[52px] px-7 text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#F3ED1A]/20 transition-all hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4 text-[#050505]" />
                <span>Book Driver</span>
              </button>

              {/* Secondary CTA 1: Call Now */}
              <a
                href="tel:8652880057"
                className="btn-secondary w-full sm:w-auto h-[52px] px-6 text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all hover:border-[#35B6DE]"
              >
                <Phone className="w-4 h-4 text-[#35B6DE]" />
                <span>Call Now: 8652880057</span>
              </a>

              {/* Secondary CTA 2: Whatsapp */}
              <button
                onClick={handleWhatsApp}
                className="btn-whatsapp w-full sm:w-auto h-[52px] px-6 text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                aria-label="WhatsApp Concierge"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Whatsapp</span>
              </button>
            </div>

            {/* Trust Metrics: 5000+ Drivers, 10000+ Customers, 4.9 Rating, 24x7 Support */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0B0B0B]/85 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-1.5 text-[#35B6DE] mb-0.5">
                  <Car className="w-4 h-4" />
                  <span className="text-lg sm:text-xl font-extrabold text-white">5000+</span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#CFCFCF] font-medium">Verified Drivers</p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0B0B0B]/85 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-1.5 text-[#F3ED1A] mb-0.5">
                  <Users className="w-4 h-4" />
                  <span className="text-lg sm:text-xl font-extrabold text-white">10000+</span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#CFCFCF] font-medium">Happy Customers</p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0B0B0B]/85 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-1.5 text-[#F3ED1A] mb-0.5">
                  <Star className="w-4 h-4 fill-[#F3ED1A]" />
                  <span className="text-lg sm:text-xl font-extrabold text-white">4.9 / 5</span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#CFCFCF] font-medium">Google Rating</p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0B0B0B]/85 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-1.5 text-[#35B6DE] mb-0.5">
                  <Clock className="w-4 h-4" />
                  <span className="text-lg sm:text-xl font-extrabold text-white">24x7</span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#CFCFCF] font-medium">Live Concierge</p>
              </div>
            </div>

          </div>

          {/* ================= RIGHT SIDE: LUXURY VISUAL CARD ================= */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#0B0B0B] group">
              <div className="aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden">
                <ImageWithFallback
                  src="/images/services/corporate-driver.jpg"
                  alt="Verified Indian Chauffeur in uniform with Toyota Innova Crysta in Bandra Kurla Complex BKC Mumbai"
                  fallbackTitle="Executive Chauffeur Mumbai"
                  vehicleTag="Toyota Innova Crysta / Luxury Sedans"
                  locationTag="BKC &amp; South Mumbai"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent pointer-events-none" />

                {/* Live Availability Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050505]/85 backdrop-blur-md border border-[#22C55E]/40 text-white text-xs font-bold shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                  <span className="text-[#22C55E]">Drivers Available in BKC, Powai &amp; Thane</span>
                </div>
              </div>

              {/* Card Footer Detail */}
              <div className="p-4 sm:p-5 bg-[#0B0B0B] border-t border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#35B6DE]/15 border border-[#35B6DE]/30 flex items-center justify-center text-[#35B6DE] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xs sm:text-sm font-bold text-white">Uniformed &amp; Police Verified</h2>
                    <p className="text-[11px] text-[#CFCFCF]">Immediate allocation across Mumbai MMR</p>
                  </div>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="px-3 py-1.5 rounded-lg bg-[#35B6DE]/10 hover:bg-[#35B6DE] text-[#35B6DE] hover:text-[#050505] text-xs font-bold border border-[#35B6DE]/30 transition-all shrink-0 cursor-pointer"
                >
                  Quick Book
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
