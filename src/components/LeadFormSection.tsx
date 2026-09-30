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
    <section id="request-driver" className="py-16 sm:py-20 lg:py-24 bg-[#050505] relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Authentic Indian Chauffeur Visual & Direct Concierge Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl aspect-[16/10] sm:aspect-auto sm:h-72 lg:h-80 relative">
              <ImageWithFallback
                src="/images/services/chauffeur-service.jpg"
                alt="Professional Indian chauffeur standing beside luxury sedan in Mumbai"
                fallbackTitle="Indian Chauffeur Consultation"
                vehicleTag="Toyota Camry / Mercedes E-Class"
                locationTag="BKC & Nariman Point, Mumbai"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 z-10">
                <span className="text-xs font-semibold text-[#E5C07B] uppercase tracking-wider block font-mono">
                  Mumbai Operations Desk
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">Personalized Chauffeur Matching</h3>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="tel:+919930012345"
                className="flex items-center gap-3.5 p-4 rounded-xl bg-[#0F0F0F] border border-neutral-800 hover:border-[#D4AF37]/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono block">Direct Helpline</span>
                  <span className="text-base font-bold text-white font-mono">+91 99300 12345</span>
                </div>
              </a>

              <a
                href="https://wa.me/919930012345?text=Hello%20Driver%20Nest%20India,%20I%20would%20like%20to%20request%20a%20driver%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-xl bg-[#0F0F0F] border border-neutral-800 hover:border-[#25D366]/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono block">WhatsApp Concierge</span>
                  <span className="text-base font-bold text-white font-mono">+91 99300 12345</span>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#0F0F0F] border border-neutral-800">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono block">Mumbai Headquarters</span>
                  <span className="text-xs text-neutral-200">Bandra Kurla Complex (BKC) &amp; Western Express Corridor</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Generation Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#D4AF37]/35 shadow-2xl relative">
              <div className="border-b border-neutral-800 pb-4 mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">Request a Driver</h3>
                  <p className="text-xs text-[#E5C07B] mt-1 font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Verified Chauffeur &amp; Driver Consultation · 30-45 Min Deployment</span>
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase text-[#E5C07B] block mb-1 font-semibold">
                      Inquiry Logged Successfully
                    </span>
                    <h4 className="text-2xl font-bold text-white font-display">Thank You, {formData.fullName}!</h4>
                    <p className="text-xs text-neutral-400 font-mono mt-1">Reference ID: #{bookingRef}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md mx-auto font-light">
                    Our Mumbai central dispatch desk has received your request. An executive will contact you shortly
                    to confirm driver allocation and provide official police verification dossiers.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleWhatsAppForward}
                      className="btn-whatsapp w-full sm:w-auto"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Confirm via WhatsApp Concierge</span>
                    </button>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-[#E5C07B] hover:underline cursor-pointer py-2 px-3 font-medium"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                      className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500 font-mono"
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
                        className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Pickup Location / Area in Mumbai *</span>
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
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
                        <span>Service Requirement *</span>
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
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
                    <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Vehicle Model, Transmission &amp; Timings</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Toyota Innova Crysta, Automatic transmission, required Monday to Saturday 9:00 AM to 7:00 PM for Bandra to BKC commute."
                      className="w-full bg-neutral-900/90 border border-neutral-700/80 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500 resize-none font-light"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary h-12 text-sm mt-2"
                  >
                    {isSubmitting ? (
                      <span>Processing Consultation...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-black" />
                        <span>Submit Chauffeur Request</span>
                      </>
                    )}
                  </button>

                  <div className="pt-2 text-center">
                    <p className="text-xs text-neutral-400 font-light">
                      ✓ Zero upfront placement fees · Police verification dossier shared directly with client
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
