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
    }, 500);
  };

  const handleWhatsAppForward = () => {
    const text = encodeURIComponent(
      `Hello Driver Nest India, I just submitted consultation request #${bookingRef || 'NEW'}:\n\n` +
        `• Name: ${formData.fullName}\n` +
        `• Mobile: ${formData.phone}\n` +
        `• Email: ${formData.email}\n` +
        `• Location: ${formData.location}\n` +
        `• Service: ${formData.serviceType}\n` +
        `• Notes: ${formData.message || 'N/A'}\n\n` +
        `Please contact me with chauffeur recommendations.`
    );
    window.open(`https://wa.me/919930012345?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      {/* Backdrop tap to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="bg-[#111111] border border-[#D4AF37]/35 rounded-2xl max-w-lg w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl z-10">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-xl bg-neutral-900 border border-neutral-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-[#E5C07B] block mb-1 font-semibold">
                Inquiry Logged Successfully
              </span>
              <h3 className="text-2xl font-bold text-white font-display">Consultation Request Received</h3>
              <p className="text-xs text-neutral-400 font-mono mt-1">Reference ID: #{bookingRef}</p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm mx-auto font-light">
              Our team will contact you shortly to understand your requirement and recommend the most suitable driver solution.
            </p>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={handleWhatsAppForward}
                className="btn-whatsapp w-full"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm via WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1 font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Chauffeur Dispatch</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1 font-display">Request a Driver</h2>
            <p className="text-xs text-neutral-400 mb-5 font-light flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Available across Mumbai, Navi Mumbai, Thane &amp; MMR within 30-45 minutes.</span>
            </p>

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Location *</span>
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
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
                    className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
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
                  <span>Vehicle Model &amp; Timings (Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. Toyota Innova Crysta, Automatic, daily 9 AM - 7 PM"
                  className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500 font-light"
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
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
