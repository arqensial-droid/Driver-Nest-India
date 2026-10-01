import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Send, CheckCircle2, ShieldCheck, ArrowRight, Clock, User, Mail, Car, FileText } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { LeadFormData } from '../types';

interface LeadFormSectionProps {
  preselectedService?: string;
  preselectedLocation?: string;
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({
  preselectedService,
  preselectedLocation,
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    phone: '',
    email: '',
    location: preselectedLocation || 'Mumbai (All Zones & BKC)',
    serviceType: preselectedService || 'Permanent Driver',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setBookingRef(`DNI-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsAppForward = () => {
    const text = encodeURIComponent(
      `Hello Driver Nest India, I just requested a driver consultation #${bookingRef || 'NEW'}:\n\n` +
        `• Name: ${formData.fullName}\n` +
        `• Mobile: ${formData.phone}\n` +
        `• Email: ${formData.email}\n` +
        `• Location: ${formData.location}\n` +
        `• Service: ${formData.serviceType}\n` +
        `• Message: ${formData.message || 'N/A'}\n\n` +
        `Please contact me with chauffeur recommendations.`
    );
    window.open(`https://wa.me/919930012345?text=${text}`, '_blank');
  };

  return (
    <section id="request-driver" className="py-8 sm:py-16 lg:py-20 bg-[#050505] relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Column: Authentic Indian Chauffeur Visual & Direct Concierge Details */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl aspect-video relative">
              <ImageWithFallback
                src="/images/services/chauffeur-service.jpg"
                alt="Professional Indian chauffeur standing beside luxury sedan in Mumbai"
                fallbackTitle="Indian Chauffeur Consultation"
                vehicleTag="Toyota Camry / Mercedes E-Class"
                locationTag="BKC & Nariman Point, Mumbai"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10">
                <span className="text-[10px] sm:text-xs font-semibold text-[#E5C07B] uppercase tracking-wider block font-mono">
                  Mumbai Operations Desk
                </span>
                <h3 className="text-base sm:text-xl font-bold text-white font-display">Personalized Chauffeur Matching</h3>
              </div>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              <a
                href="tel:+919930012345"
                className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-[#0F0F0F] border border-neutral-800 hover:border-[#D4AF37]/50 transition-colors group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono block">Direct Helpline</span>
                  <span className="text-sm sm:text-base font-bold text-white font-mono">+91 99300 12345</span>
                </div>
              </a>

              <a
                href="https://wa.me/919930012345?text=Hello%20Driver%20Nest%20India,%20I%20would%20like%20to%20request%20a%20driver%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-[#0F0F0F] border border-neutral-800 hover:border-[#25D366]/50 transition-colors group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366]" />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono block">WhatsApp Concierge</span>
                  <span className="text-sm sm:text-base font-bold text-white font-mono">+91 99300 12345</span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-[#0F0F0F] border border-neutral-800">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono block">Mumbai Headquarters</span>
                  <span className="text-xs text-neutral-200 truncate block">Bandra Kurla Complex (BKC) &amp; Western Express Corridor</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Generation Form with 16px mobile padding (p-4 sm:p-8) */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-4 sm:p-8 lg:p-10 border border-[#D4AF37]/35 shadow-2xl relative">
              <div className="border-b border-neutral-800 pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display">Request a Driver</h3>
                  <p className="text-[11px] sm:text-xs text-[#E5C07B] mt-0.5 font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Verified Chauffeur &amp; Driver Consultation · 30-45 Min Deployment</span>
                  </p>
                </div>
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                </div>
              </div>

              {submitted ? (
                <div className="py-6 text-center space-y-3 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase text-[#E5C07B] block mb-1 font-semibold">
                      Reference #{bookingRef}
                    </span>
                    <h4 className="text-xl font-bold text-white font-display">
                      Consultation Request Logged
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md mx-auto font-light">
                    Thank you, <strong className="text-white font-semibold">{formData.fullName}</strong>. Our Mumbai central
                    concierge is reviewing your requirement for <span className="text-[#E5C07B]">{formData.serviceType}</span> in{' '}
                    <span className="text-[#E5C07B]">{formData.location}</span>.
                  </p>

                  <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-400 max-w-sm mx-auto space-y-1">
                    <p className="text-white font-medium">What happens next?</p>
                    <p>1. Our operations coordinator calls within 15–20 minutes.</p>
                    <p>2. We share driver credentials &amp; police verification dossier.</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleWhatsAppForward}
                      className="btn-whatsapp text-xs h-11"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Speed Up on WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-secondary text-xs h-11"
                    >
                      <span>New Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vikramaditya Singhania"
                      className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 sm:px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Phone Number *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 98200 12345"
                        className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 sm:px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Email Address *</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. v.singhania@corp.com"
                        className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 sm:px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Location *</span>
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
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

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                        <Car className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Service Requirement *</span>
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
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
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Vehicle Model &amp; Timings (Optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Innova Crysta / Honda City, 9 AM to 7 PM daily..."
                      className="w-full bg-neutral-900/90 border border-neutral-700/80 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500 resize-none font-light"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary h-12 text-xs sm:text-sm mt-1"
                  >
                    {isSubmitting ? (
                      <span>Assigning Chauffeur Dossier...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-black" />
                        <span>Submit Consultation Request</span>
                      </>
                    )}
                  </button>

                  <div className="pt-1 text-center">
                    <p className="text-[10px] sm:text-xs text-neutral-400 font-light">
                      🔒 Your details are confidential. We never spam. 100% Police Verified roster.
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
