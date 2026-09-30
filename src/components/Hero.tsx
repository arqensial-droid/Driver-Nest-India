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
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-black">
      {/* Background Video with Luxury Dark Gold Gradient Scrims */}
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

        {/* Ambient Mumbai city skyline & Sea Link gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/92 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/85" />
      </div>

      {/* Subtle gold ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-[#D4AF37]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Location Kicker Bar - 16px bottom spacing */}
        <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold tracking-widest uppercase text-[#E5C07B] bg-black/80 px-4 py-1.5 rounded-full border border-[#D4AF37]/35 backdrop-blur-md shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Mumbai · Bandra-Worli Sea Link · BKC · Thane · Navi Mumbai</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col">
            <h1
              id="hero-headline"
              className="text-h1 text-white mb-4 sm:mb-6"
            >
              Professional Driver Services{' '}
              <span className="gold-gradient-text block sm:inline">Across Mumbai</span>
            </h1>

            <p
              id="hero-subheadline"
              className="text-body-lead text-neutral-300 font-light mb-8 max-w-2xl"
            >
              Hire Verified, Experienced, and Reliable Drivers for Personal, Corporate, Outstation, and Event Requirements.
            </p>

            {/* Standardized Action Buttons: Gold Primary + WhatsApp + Secondary Call */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
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

            {/* Trust Indicators: 6 Indicators with strict spacing */}
            <div className="pt-6 border-t border-neutral-800/80 mb-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {trustIndicators.map((indicator, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span className="font-medium">{indicator}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Indian Chauffeur & Vehicle Context Banner */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[#121212] to-[#0A0A0A] border border-[#D4AF37]/25 flex items-center gap-3.5 max-w-xl shadow-lg">
              <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#D4AF37]/40 shrink-0">
                <ImageWithFallback
                  src="/images/services/chauffeur-service.jpg"
                  alt="Professional Indian Chauffeur"
                  fallbackTitle="Chauffeur"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-1.5 text-white font-semibold mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Indian Chauffeurs in Formal Attire</span>
                </div>
                <p className="text-neutral-400 text-[11px] sm:text-xs">
                  Trained for Toyota Innova Crysta, Mercedes E-Class, Honda City &amp; Fortuner across Mumbai.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Generation Form ("Request a Driver") */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/35 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-neutral-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-display">Request a Driver</h2>
                  <p className="text-xs text-[#E5C07B] mt-0.5 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D4AF37]" />
                    <span>Instant allocation within 30-45 minutes</span>
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display">Consultation Request Received</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed max-w-xs mx-auto font-light">
                    Our concierge desk will contact you within minutes to allocate the most suitable verified chauffeur.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#E5C07B] hover:underline pt-2 cursor-pointer font-medium"
                  >
                    Submit another booking request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleHeroFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vikramaditya Singhania"
                      className="w-full h-11 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Mobile Number *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 98200 12345"
                        className="w-full h-11 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Email Address *</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. v.singhania@corp.com"
                        className="w-full h-11 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Location *</span>
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full h-11 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
                      >
                        <option value="Mumbai (All Zones & BKC)">Mumbai (All Zones &amp; BKC)</option>
                        <option value="South Mumbai (Colaba, Malabar Hill, Marine Drive)">South Mumbai</option>
                        <option value="Bandra & BKC (Bandra Kurla Complex)">Bandra &amp; BKC</option>
                        <option value="Western Suburbs (Andheri, Juhu, Borivali)">Western Suburbs</option>
                        <option value="Central Mumbai (Dadar, Worli, Lower Parel)">Central Mumbai</option>
                        <option value="Powai & Hiranandani">Powai &amp; Hiranandani</option>
                        <option value="Thane (Majiwada, Ghodbunder)">Thane</option>
                        <option value="Navi Mumbai (Vashi, Nerul, Belapur)">Navi Mumbai</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Driver Requirement *</span>
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full h-11 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
                      >
                        <option value="Permanent Driver">Permanent / Full-Time Chauffeur</option>
                        <option value="Personal Driver">Personal Driver Service</option>
                        <option value="Part-Time Driver">Part-Time / Hourly Driver</option>
                        <option value="Temporary Driver">Temporary Leave Replacement</option>
                        <option value="Corporate Chauffeur">Corporate / BKC Executive Driver</option>
                        <option value="Airport Transfer">Airport CSMIA T1/T2 Transfer</option>
                        <option value="Outstation Trip">Outstation Highway Chauffeur</option>
                        <option value="Luxury Chauffeur">Luxury Chauffeur (Mercedes/BMW)</option>
                        <option value="Senior Citizen Driver">Senior Citizen Care Driver</option>
                        <option value="Event Chauffeur">Event &amp; Wedding Driver</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Vehicle Model &amp; Timings (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Toyota Innova Crysta, Automatic, daily 9 AM - 7 PM"
                      className="w-full h-11 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary h-12 text-sm mt-2"
                  >
                    {isSubmitting ? (
                      <span>Submitting Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-black" />
                        <span>Request a Driver Now</span>
                      </>
                    )}
                  </button>

                  <div className="pt-2 text-center">
                    <p className="text-[11px] text-neutral-400 font-light">
                      ✓ No advance recruitment fees · Official police verification dossier provided
                    </p>
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
