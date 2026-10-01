import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, MessageSquare, ArrowRight, User, Phone, Mail, MapPin, Car, FileText, Clock } from 'lucide-react';
import { LeadFormData } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialLocation?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Personal Driver',
  initialLocation = 'Mumbai (All Zones & BKC)',
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    phone: '',
    email: '',
    location: initialLocation,
    serviceType: initialService,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

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
      `Hello Driver Nest India, I just submitted a booking request #${bookingRef || 'NEW'}:\n\n` +
        `• Name: ${formData.fullName}\n` +
        `• Phone: ${formData.phone}\n` +
        `• Email: ${formData.email}\n` +
        `• Location: ${formData.location}\n` +
        `• Service: ${formData.serviceType}\n` +
        `• Notes: ${formData.message || 'N/A'}\n\n` +
        `Please expedite driver verification & allocation.`
    );
    window.open(`https://wa.me/919930012345?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0E0E0E] rounded-2xl border border-[#D4AF37]/45 shadow-2xl p-4 sm:p-6 my-4 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1.5 text-neutral-400 hover:text-white rounded-lg bg-neutral-900 border border-neutral-800 transition-colors cursor-pointer"
          aria-label="Close Booking Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-neutral-800 pb-3 mb-4 pr-10">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-[#E5C07B] mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>100% Police Verified Driver Network</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            Book a Professional Driver
          </h3>
          <p className="text-xs text-neutral-400 font-light mt-0.5">
            Average allocation within 30-45 minutes across Mumbai &amp; MMR.
          </p>
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
                Request Confirmed
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm mx-auto font-light">
              Thank you, <strong className="text-white font-semibold">{formData.fullName}</strong>. Our Mumbai central
              coordinator is matching a police-cleared chauffeur for <span className="text-[#E5C07B]">{formData.serviceType}</span> in{' '}
              <span className="text-[#E5C07B]">{formData.location}</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <button
                onClick={handleWhatsAppForward}
                className="w-full sm:w-auto btn-whatsapp text-xs h-11"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Expedite via WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto btn-secondary text-xs h-11"
              >
                <span>Close Window</span>
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
                placeholder="e.g. Rahul Singhania"
                className="w-full h-11 bg-neutral-900 border border-neutral-700/80 rounded-xl px-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500"
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
                  className="w-full h-11 bg-neutral-900 border border-neutral-700/80 rounded-xl px-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Email (Optional)</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. rahul@example.com"
                  className="w-full h-11 bg-neutral-900 border border-neutral-700/80 rounded-xl px-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Pickup Location</span>
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full h-11 bg-neutral-900 border border-neutral-700/80 rounded-xl px-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
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
                  <span>Service Type</span>
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full h-11 bg-neutral-900 border border-neutral-700/80 rounded-xl px-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
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
                placeholder="e.g. Honda City Automatic, daily 8 AM to 6 PM..."
                className="w-full bg-neutral-900 border border-neutral-700/80 rounded-xl p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500 resize-none font-light"
              />
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
                  <span>Confirm Consultation Request</span>
                </>
              )}
            </button>

            <div className="pt-1 text-center">
              <p className="text-[10px] text-neutral-400 font-light">
                ✓ Free standby replacement · Zero lock-in · 100% Police Verified
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
