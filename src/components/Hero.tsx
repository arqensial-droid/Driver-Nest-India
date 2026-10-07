import React, { useState } from 'react';
import {
  Phone,
  Calendar,
  ShieldCheck,
  Star,
  Clock,
  Sparkles,
  CheckCircle2,
  Car,
  MessageSquare,
  Award,
  Zap,
  User,
  MapPin,
  Send,
  AlertCircle,
  Headphones,
  RefreshCw,
} from 'lucide-react';
import { submitLead, validateLeadForm, getWhatsAppFallbackUrl, getWhatsAppSuccessUrl, PRIMARY_PHONE } from '../services/leadService';
import { LeadFormData } from '../types';
import { BrandLogo } from './BrandLogo';

interface HeroProps {
  onOpenBooking: () => void;
}

interface DriverPortrait {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: string;
  location: string;
  webpSrc: string;
  jpgSrc: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'form' | 'driver'>('form');

  // Hero Quick Booking Form State
  const [heroForm, setHeroForm] = useState<LeadFormData>({
    name: '',
    mobile: '',
    email: '',
    location: 'Bandra / BKC / South Mumbai',
    serviceType: 'Personal Driver',
    vehicleType: 'Sedan / SUV',
    date: new Date().toISOString().split('T')[0],
    time: 'Priority Dispatch',
    message: '',
    formName: 'Hero Booking Form',
  });

  const [heroErrors, setHeroErrors] = useState<Record<string, string>>({});
  const [heroSubmitting, setHeroSubmitting] = useState(false);
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [heroBookingRef, setHeroBookingRef] = useState('');
  const [heroFailed, setHeroFailed] = useState(false);

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateLeadForm(heroForm);
    if (!validation.isValid) {
      setHeroErrors(validation.errors);
      return;
    }

    setHeroErrors({});
    setHeroFailed(false);
    setHeroSubmitting(true);

    try {
      console.log('[CONSOLE LOG] [HERO BOOKING FORM SUBMISSION]', heroForm);
      const res = await submitLead(heroForm, 'Hero Booking Form');
      if (res.success && res.record) {
        setHeroBookingRef(res.record.id);
        setHeroSubmitted(true);
      } else {
        setHeroFailed(true);
        setHeroErrors({
          form: res.error || 'We could not submit your request right now. Please call 8652880057 or contact us on WhatsApp.',
        });
      }
    } catch (err: any) {
      console.error('[CONSOLE LOG] [HERO BOOKING FORM ERROR]', err);
      setHeroFailed(true);
      setHeroErrors({
        form: 'We could not submit your request right now. Please call 8652880057 or contact us on WhatsApp.',
      });
    } finally {
      setHeroSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Hi On Time Driver Service, I would like to book a verified driver in Mumbai.');
    window.open(`https://wa.me/918652880057?text=${text}`, '_blank');
  };

  const trustBadges = [
    { text: '100% Police Verified Drivers', icon: ShieldCheck },
    { text: '5+ Years Experience', icon: Award },
    { text: 'Fast Driver Allocation', icon: Zap },
    { text: 'Replacement Guarantee', icon: RefreshCw },
    { text: '24/7 Support', icon: Headphones },
  ];

  // High-performance driver portraits roster with WebP source + JPG fallback
  const verifiedDrivers: DriverPortrait[] = [
    {
      id: 'rajesh-sharma',
      name: 'Rajesh Sharma',
      specialty: 'Corporate & BKC Chauffeur',
      experience: '8+ Yrs Exp',
      rating: '4.96',
      location: 'BKC / Bandra',
      webpSrc: '/images/drivers/rajesh-sharma.webp',
      jpgSrc: '/images/drivers/rajesh-sharma.jpg',
    },
    {
      id: 'sunil-patil',
      name: 'Sunil Patil',
      specialty: 'Personal & Family Chauffeur',
      experience: '6+ Yrs Exp',
      rating: '4.92',
      location: 'Andheri / Juhu',
      webpSrc: '/images/drivers/sunil-patil.webp',
      jpgSrc: '/images/drivers/sunil-patil.jpg',
    },
    {
      id: 'vikram-jadhav',
      name: 'Vikram Jadhav',
      specialty: 'Airport Transfer Specialist',
      experience: '9+ Yrs Exp',
      rating: '4.98',
      location: 'Powai / Thane',
      webpSrc: '/images/drivers/vikram-jadhav.webp',
      jpgSrc: '/images/drivers/vikram-jadhav.jpg',
    },
    {
      id: 'anand-mishra',
      name: 'Anand Mishra',
      specialty: 'Outstation & Expressway Chauffeur',
      experience: '11+ Yrs Exp',
      rating: '4.95',
      location: 'South Mumbai',
      webpSrc: '/images/drivers/anand-mishra.webp',
      jpgSrc: '/images/drivers/anand-mishra.jpg',
    },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 sm:pt-28 pb-16 lg:py-20 overflow-hidden bg-[#F8FAFC]">
      {/* 1. Large Real Photography Hero Image Background with Soft Light Overlay */}
      <div className="absolute inset-0 z-0">
        <picture className="w-full h-full block">
          <source type="image/webp" srcSet="/images/services/chauffeur-service.webp" />
          <img
            src="/images/services/chauffeur-service.jpg"
            alt="Professional chauffeur standing beside luxury corporate sedan in Mumbai"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{ objectFit: 'cover' }}
            className="w-full h-full object-cover object-center filter contrast-95"
          />
        </picture>

        {/* Clean Light Overlay for maximum readability */}
        <div className="absolute inset-0 bg-white/90 sm:bg-white/85 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70 lg:to-white/50" />
      </div>

      {/* 2. Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ================= LEFT / PRIMARY CONTENT ================= */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Small Badge: Trusted Corporate Driver Service */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#EEF8FC] border border-[#35B6DE]/30 shadow-sm mb-4 sm:mb-5">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
              <Sparkles className="w-3.5 h-3.5 text-[#35B6DE]" />
              <span className="text-xs sm:text-sm font-bold tracking-wide text-[#111827]">
                Trusted Driver Service in Mumbai &amp; MMR
              </span>
            </div>

            {/* Exact Requested Headline: Professional Driver Service Across Mumbai */}
            <h1 className="text-h1 text-[#111827] font-extrabold tracking-tight mb-4 sm:mb-5">
              Professional Driver Service{' '}
              <span className="text-[#35B6DE]">
                Across Mumbai
              </span>
            </h1>

            {/* Exact Requested Subheadline */}
            <p className="text-subheading text-[#4B5563] mb-6 sm:mb-8 leading-relaxed max-w-2xl font-normal text-base sm:text-lg">
              Verified, trained and experienced drivers for personal, corporate, airport and outstation travel requirements.
            </p>

            {/* Trust Badges Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-8">
              {trustBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-[#E5E7EB] shadow-xs hover:border-[#35B6DE]/50 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-md bg-[#EEF8FC] flex items-center justify-center shrink-0 text-[#35B6DE]">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-[#111827] leading-tight">
                      ✓ {badge.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 mb-8 w-full sm:w-auto">
              <button
                onClick={onOpenBooking}
                className="btn-primary w-full sm:w-auto h-[50px] px-7 text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#111827]" />
                <span>Request Driver</span>
              </button>

              <a
                href="tel:8652880057"
                className="btn-secondary w-full sm:w-auto h-[50px] px-6 text-sm sm:text-base font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#35B6DE]" />
                <span>Call Now: 8652880057</span>
              </a>

              <button
                onClick={handleWhatsApp}
                className="btn-whatsapp w-full sm:w-auto h-[50px] px-6 text-sm sm:text-base font-bold flex items-center justify-center gap-2"
                aria-label="WhatsApp Concierge"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>WhatsApp</span>
              </button>
            </div>

            {/* Driver Portraits WebP Pipeline Strip */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E5E7EB] shadow-xs mb-4 max-w-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center -space-x-2">
                    {verifiedDrivers.map((driver) => (
                      <div
                        key={driver.id}
                        className="relative group/avatar cursor-pointer"
                        title={`${driver.name} · ${driver.specialty} (${driver.experience})`}
                      >
                        <picture className="w-10 h-10 sm:w-11 sm:h-11 rounded-full block overflow-hidden border-2 border-white shadow-sm ring-1 ring-[#35B6DE]/50 transition-transform duration-200 group-hover/avatar:scale-110">
                          <source type="image/webp" srcSet={driver.webpSrc} />
                          <img
                            src={driver.jpgSrc}
                            alt={`Verified Driver ${driver.name} Portrait`}
                            loading="lazy"
                            decoding="async"
                            width={44}
                            height={44}
                            style={{ objectFit: 'cover' }}
                            className="w-full h-full object-cover object-top"
                          />
                        </picture>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#22C55E] border-2 border-white" />
                      </div>
                    ))}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#EEF8FC] border-2 border-white ring-1 ring-[#35B6DE]/30 flex items-center justify-center text-[11px] font-bold text-[#35B6DE]">
                      +5k
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#111827]">
                      <span>5000+ Verified Drivers Active</span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-1.5 py-0.5 rounded-md font-semibold">
                        <CheckCircle2 className="w-2.5 h-2.5" /> 100% Police Cleared
                      </span>
                    </div>
                    <p className="text-[11px] text-[#4B5563]">
                      Prompt driver allocation across Mumbai, Thane &amp; Navi Mumbai
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5E7EB]">
                  <div className="flex items-center text-[#eab308]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#111827]">4.9 / 5</span>
                  <span className="text-[10px] text-[#4B5563]">(10k+ reviews)</span>
                </div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT: HIGH-CONVERTING HERO FORM ================= */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-xl border border-[#E5E7EB] overflow-hidden">
              
              {/* Card Header with Tabs */}
              <div className="bg-[#EEF8FC] p-3 border-b border-[#E5E7EB] flex items-center justify-between">
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab('form')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === 'form'
                        ? 'bg-white text-[#111827] shadow-xs'
                        : 'text-[#4B5563] hover:text-[#111827]'
                    }`}
                  >
                    Instant Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('driver')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === 'driver'
                        ? 'bg-white text-[#111827] shadow-xs'
                        : 'text-[#4B5563] hover:text-[#111827]'
                    }`}
                  >
                    Driver Roster (4)
                  </button>
                </div>

                <span className="text-[11px] font-bold text-[#22C55E] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                  Live Allocation
                </span>
              </div>

              {/* TAB 1: HERO BOOKING FORM */}
              {activeTab === 'form' && (
                <div className="p-5 sm:p-6 text-[#111827]">
                  {!heroSubmitted ? (
                    <div>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <BrandLogo size="sm" />
                          <span className="text-[10px] text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2 py-0.5 rounded font-bold">
                            Live 24/7 Desk
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold font-heading text-[#111827]">
                          Instant Driver Booking
                        </h3>
                        <p className="text-[12px] text-[#4B5563]">
                          Fill your details and our team will contact you shortly.
                        </p>
                      </div>

                      {/* Error alert if submission failed */}
                      {heroErrors.form && (
                        <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs space-y-2">
                          <div className="flex items-start gap-1.5">
                            <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                            <span>{heroErrors.form}</span>
                          </div>
                          {heroFailed && (
                            <div className="pt-1 flex gap-2">
                              <a
                                href={getWhatsAppFallbackUrl(heroForm)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded-md bg-[#22C55E] text-white text-[11px] font-bold flex items-center gap-1"
                              >
                                <MessageSquare className="w-3 h-3" />
                                <span>WhatsApp Us (8652880057)</span>
                              </a>
                            </div>
                          )}
                        </div>
                      )}

                      <form onSubmit={handleHeroSubmit} className="space-y-3">
                        {/* Name & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-[#111827] mb-1">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <User className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-3" />
                              <input
                                type="text"
                                required
                                placeholder="Your Name"
                                value={heroForm.name}
                                onChange={(e) => {
                                  setHeroForm({ ...heroForm, name: e.target.value });
                                  if (heroErrors.name) setHeroErrors({ ...heroErrors, name: '' });
                                }}
                                className="form-input w-full pl-8.5 pr-2.5 py-2 text-xs"
                              />
                            </div>
                            {heroErrors.name && <p className="text-red-500 text-[10px] mt-0.5">{heroErrors.name}</p>}
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#111827] mb-1">
                              Mobile Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <Phone className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-3" />
                              <input
                                type="tel"
                                required
                                maxLength={10}
                                placeholder="10-digit mobile"
                                value={heroForm.mobile}
                                onChange={(e) => {
                                  setHeroForm({ ...heroForm, mobile: e.target.value });
                                  if (heroErrors.mobile) setHeroErrors({ ...heroErrors, mobile: '' });
                                }}
                                className="form-input w-full pl-8.5 pr-2.5 py-2 text-xs font-medium"
                              />
                            </div>
                            {heroErrors.mobile && <p className="text-red-500 text-[10px] mt-0.5">{heroErrors.mobile}</p>}
                          </div>
                        </div>

                        {/* Location & Service Type */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-[#111827] mb-1">
                              Pickup Location <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <MapPin className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-3" />
                              <input
                                type="text"
                                required
                                placeholder="e.g. Bandra, BKC, Andheri"
                                value={heroForm.location}
                                onChange={(e) => {
                                  setHeroForm({ ...heroForm, location: e.target.value });
                                  if (heroErrors.location) setHeroErrors({ ...heroErrors, location: '' });
                                }}
                                className="form-input w-full pl-8.5 pr-2.5 py-2 text-xs"
                              />
                            </div>
                            {heroErrors.location && <p className="text-red-500 text-[10px] mt-0.5">{heroErrors.location}</p>}
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#111827] mb-1">
                              Service Type <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={heroForm.serviceType}
                              onChange={(e) => setHeroForm({ ...heroForm, serviceType: e.target.value })}
                              className="form-input w-full px-2.5 py-2 text-xs font-medium bg-white"
                            >
                              <option value="Personal Driver">Personal Driver</option>
                              <option value="Corporate Driver">Corporate Driver</option>
                              <option value="Permanent Driver">Permanent Driver</option>
                              <option value="Hourly Driver">Hourly Driver</option>
                              <option value="Airport Driver">Airport Driver</option>
                              <option value="Outstation Driver">Outstation Driver</option>
                            </select>
                          </div>
                        </div>

                        {/* Date, Time & Vehicle */}
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-[10px] font-semibold text-[#4B5563] mb-1">
                              Date
                            </label>
                            <input
                              type="date"
                              value={heroForm.date}
                              onChange={(e) => setHeroForm({ ...heroForm, date: e.target.value })}
                              className="form-input w-full px-2 py-1.5 text-[11px]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-semibold text-[#4B5563] mb-1">
                              Time
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 09:00 AM"
                              value={heroForm.time}
                              onChange={(e) => setHeroForm({ ...heroForm, time: e.target.value })}
                              className="form-input w-full px-2 py-1.5 text-[11px]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-semibold text-[#4B5563] mb-1">
                              Vehicle
                            </label>
                            <input
                              type="text"
                              placeholder="Innova / Sedan"
                              value={heroForm.vehicleType}
                              onChange={(e) => setHeroForm({ ...heroForm, vehicleType: e.target.value })}
                              className="form-input w-full px-2 py-1.5 text-[11px]"
                            />
                          </div>
                        </div>

                        {/* Email (optional) */}
                        <div>
                          <label className="block text-[10px] font-semibold text-[#4B5563] mb-1">
                            Email (Optional - for instant confirmation)
                          </label>
                          <input
                            type="email"
                            placeholder="your.email@example.com"
                            value={heroForm.email}
                            onChange={(e) => setHeroForm({ ...heroForm, email: e.target.value })}
                            className="form-input w-full px-2.5 py-1.5 text-xs"
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={heroSubmitting}
                          className="w-full h-11 bg-[#F3ED1A] hover:bg-[#eae415] text-[#111827] font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer mt-2"
                        >
                          {heroSubmitting ? (
                            <span className="flex items-center gap-2">
                              <span className="w-3.5 h-3.5 border-2 border-[#111827] border-t-transparent rounded-full animate-spin" />
                              Connecting to Allocation Desk...
                            </span>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5 text-[#111827]" />
                              <span>Request Driver</span>
                            </>
                          )}
                        </button>

                        <div className="flex items-center justify-between text-[11px] text-[#4B5563] pt-1">
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                            Police Verified Chauffeur
                          </span>
                          <span className="text-[#35B6DE] font-semibold">
                            Call 8652880057
                          </span>
                        </div>
                      </form>
                    </div>
                  ) : (
                    /* Hero Form Success State */
                    <div className="py-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center mx-auto mb-3 text-[#22C55E]">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      
                      <h4 className="text-base font-bold text-[#111827] mb-1 font-heading">
                        Booking Request Received!
                      </h4>

                      {/* Required exact success confirmation message */}
                      <p className="text-xs font-semibold text-[#22C55E] mb-2 bg-[#22C55E]/10 py-1.5 px-2.5 rounded-md">
                        Thank you for your enquiry. Our team will contact you shortly.
                      </p>

                      <div className="bg-[#EEF8FC] rounded-xl p-3 border border-[#E5E7EB] text-left text-xs space-y-1 mb-4">
                        <div className="flex justify-between text-[#4B5563]">
                          <span>Reference:</span>
                          <span className="font-mono font-bold text-[#111827]">{heroBookingRef}</span>
                        </div>
                        <div className="flex justify-between text-[#4B5563]">
                          <span>Customer:</span>
                          <span className="font-semibold text-[#111827]">{heroForm.name}</span>
                        </div>
                        <div className="flex justify-between text-[#4B5563]">
                          <span>Contact:</span>
                          <span className="font-semibold text-[#111827]">+91 {heroForm.mobile}</span>
                        </div>
                        <div className="flex justify-between text-[#4B5563]">
                          <span>Service:</span>
                          <span className="font-bold text-[#35B6DE]">{heroForm.serviceType}</span>
                        </div>
                        <div className="flex justify-between text-[#4B5563]">
                          <span>Target Email:</span>
                          <span className="text-[#35B6DE]">info@ontimedriverservice.com</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <a
                          href={getWhatsAppSuccessUrl(heroForm, heroBookingRef)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-whatsapp w-full h-10 text-xs font-bold flex items-center justify-center gap-2"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Track Allocation on WhatsApp</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            setHeroSubmitted(false);
                            setHeroForm({
                              ...heroForm,
                              name: '',
                              mobile: '',
                              email: '',
                              message: '',
                            });
                          }}
                          className="text-xs text-[#4B5563] hover:text-[#111827] underline py-1 block mx-auto cursor-pointer"
                        >
                          Book another driver
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: VERIFIED DRIVERS PREVIEWS */}
              {activeTab === 'driver' && (
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                    <span className="text-xs font-bold text-[#111827]">
                      Available Chauffeurs in Mumbai
                    </span>
                    <span className="text-[10px] text-[#22C55E] font-bold">
                      100% Police Cleared
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {verifiedDrivers.map((driver) => (
                      <div
                        key={driver.id}
                        className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-between gap-3 hover:border-[#35B6DE] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <picture className="w-10 h-10 rounded-full block overflow-hidden border border-[#E5E7EB] shrink-0">
                            <source type="image/webp" srcSet={driver.webpSrc} />
                            <img
                              src={driver.jpgSrc}
                              alt={driver.name}
                              width={40}
                              height={40}
                              loading="lazy"
                              decoding="async"
                              style={{ objectFit: 'cover' }}
                              className="w-full h-full object-cover object-top"
                            />
                          </picture>
                          <div>
                            <p className="text-xs font-bold text-[#111827] leading-tight">
                              {driver.name}
                            </p>
                            <p className="text-[11px] text-[#4B5563]">
                              {driver.specialty} · {driver.experience}
                            </p>
                            <p className="text-[10px] text-[#35B6DE] font-semibold">
                              Hub: {driver.location}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="flex items-center gap-1 text-[11px] font-bold text-[#eab308]">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{driver.rating}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setHeroForm({
                                ...heroForm,
                                message: `Requested assignment for ${driver.name} (${driver.specialty})`,
                              });
                              setActiveTab('form');
                            }}
                            className="text-[10px] font-bold text-[#35B6DE] hover:underline mt-1 block"
                          >
                            Select Driver
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('form')}
                    className="btn-primary w-full h-10 text-xs font-bold mt-2"
                  >
                    <span>Request Driver</span>
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
