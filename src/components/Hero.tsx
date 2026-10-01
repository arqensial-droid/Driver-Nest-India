import React, { useState } from 'react';
import { Phone, MessageSquare, Calendar, CheckCircle2, ShieldCheck, Send, MapPin, ArrowRight, User, Mail, Car, Clock } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { LeadFormData } from '../types';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    phone: '',
    email: '',
    location: 'Mumbai (All Zones & BKC)',
    serviceType: 'Permanent Driver',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const trustIndicators = [
    '100% Police Verified',
    'Minimum 5+ Yrs Experience',
    'Rapid 30-45 Min Allocation',
    'All Mumbai & MMR Zones',
    'Transparent Zero Lock-In',
    'Corporate & Family Solutions',
  ];

  const handleHeroFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      'Hello Driver Nest India, I would like to request a professional driver consultation in Mumbai.'
    );
    window.open(`https://wa.me/919930012345?text=${text}`, '_blank');
  };

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center pt-16 pb-8 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20 overflow-hidden bg-black">
      {/* Background Video with Scrims */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover opacity-20 filter brightness-65 scale-105"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-traffic-in-a-night-city-with-long-exposure-car-lights-42525-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/92 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/85" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full overflow-hidden">
        {/* Top Location Kicker Bar */}
        <div className="inline-flex items-center gap-1.5 mb-3 text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#E5C07B] bg-black/80 px-3 py-1 rounded-full border border-[#D4AF37]/35 backdrop-blur-md shadow-sm max-w-full flex-wrap">
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span>Mumbai · Bandra-Worli Sea Link · BKC · Thane · Navi Mumbai</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Column: Brand Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col">
            <h1
              id="hero-headline"
              className="text-h1 text-white mb-3"
            >
              Professional Driver Services{' '}
              <span className="gold-gradient-text block sm:inline">Across Mumbai</span>
            </h1>

            <p
              id="hero-subheadline"
              className="text-body-lead text-neutral-300 font-light mb-6 max-w-2xl"
            >
              Hire Verified, Experienced, and Reliable Drivers for Personal, Corporate, Outstation, and Event Requirements.
            </p>

            {/* Standardized Action Buttons: 48-52px height, 12px gap */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button
                onClick={onOpenBooking}
                className="btn-primary"
              >
                <Calendar className="w-4 h-4 text-black" />
                <span>Book Driver Now</span>
              </button>

              <button
                onClick={handleWhatsAppDirect}
                className="btn-whatsapp"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Us</span>
              </button>

              <a
                href="tel:+919930012345"
                className="btn-secondary"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Call Concierge</span>
              </a>
            </div>

            {/* Trust Indicators: 6 Indicators with strict 16px grid gap */}
            <div className="pt-4 border-t border-neutral-800/80 mb-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {trustIndicators.map((indicator, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="font-medium truncate">{indicator}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Indian Chauffeur & Vehicle Context Banner */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-[#121212] to-[#0A0A0A] border border-[#D4AF37]/25 flex items-center gap-3 max-w-xl shadow-lg">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#D4AF37]/40 shrink-0">
                <ImageWithFallback
                  src="/images/services/chauffeur-service.jpg"
                  alt="Verified Chauffeur"
                  fallbackTitle="Chauffeur"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[#E5C07B] font-mono uppercase tracking-wider block">
                  Police Verification Guarantee
                </span>
                <p className="text-xs text-neutral-300 font-light truncate">
                  Dossier with Aadhaar clearance provided prior to deployment.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Quick Consultation Card */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-2xl p-4 sm:p-6 lg:p-7 border border-[#D4AF37]/35 shadow-2xl relative">
              <div className="border-b border-neutral-800 pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white font-display">Instant Chauffeur Request</h2>
                  <p className="text-xs text-[#E5C07B] mt-0.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Avg Dispatch: 30–45 Mins</span>
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>

              {submitted ? (
                <div className="py-6 text-center space-y-3 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display">Request Received!</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed max-w-xs mx-auto font-light">
                    Our Mumbai central coordinator will call you back shortly with driver profiles.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#E5C07B] hover:underline cursor-pointer pt-2 font-medium"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleHeroFormSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vikramaditya Singhania"
                      className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Phone</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 98200 12345"
                        className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Location</span>
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
                      >
                        <option value="Mumbai (All Zones & BKC)">Mumbai (All Zones &amp; BKC)</option>
                        <option value="South Mumbai (Colaba, Malabar Hill, Marine Drive)">South Mumbai</option>
                        <option value="Bandra & BKC (Bandra Kurla Complex)">Bandra &amp; BKC</option>
                        <option value="Western Suburbs (Andheri, Juhu, Borivali)">Western Suburbs</option>
                        <option value="Central Mumbai (Dadar, Worli, Lower Parel)">Central Mumbai</option>
                        <option value="Powai & Hiranandani">Powai &amp; Hiranandani</option>
                        <option value="Thane (Majiwada, Ghodbunder)">Thane</option>
                        <option value="Navi Mumbai (Vashi, Nerul, Belapur)">Navi Mumbai</option>
                        <option value="Mira Road & Bhayandar">Mira Road &amp; Bhayandar</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                      <Car className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Driver Service</span>
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
                    >
                      <option value="Personal Driver">Personal Driver (Daily / Family)</option>
                      <option value="Full-Time Driver">Full-Time Monthly Driver</option>
                      <option value="Part-Time Driver">Part-Time Driver</option>
                      <option value="Temporary Driver">Temporary Driver</option>
                      <option value="Hourly Driver">Hourly On-Demand Driver</option>
                      <option value="Permanent Driver">Permanent Dedicated Chauffeur</option>
                      <option value="Corporate Driver">Corporate Fleet &amp; Executive</option>
                      <option value="Outstation Driver">Outstation Highway Chauffeur</option>
                      <option value="Airport Driver">Airport Transfer Chauffeur</option>
                      <option value="Chauffeur Service">Professional Chauffeur (Sedans/SUVs)</option>
                      <option value="Senior Citizen Driver">Senior Citizen Driver Assistance</option>
                      <option value="Event Driver">Event &amp; Wedding Driver</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary h-12 text-xs sm:text-sm mt-1"
                  >
                    {isSubmitting ? (
                      <span>Assigning Chauffeur...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-black" />
                        <span>Request Chauffeur Consultation</span>
                      </>
                    )}
                  </button>

                  <div className="pt-1 text-center">
                    <span className="text-[10px] text-neutral-400 font-light">
                      ✓ No advance placement fees · Zero lock-in
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
