import React, { useState } from 'react';
import { Link, SEO } from '../router';
import {
  ChevronRight,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  User,
  Car,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: 'Mumbai (All Zones & BKC)',
    serviceType: 'Permanent Driver',
    requirementType: 'Full-Time',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <>
      <SEO
        title="Contact Us – Driver Nest India | 24/7 Mumbai Chauffeur Concierge"
        description="Get in touch with Driver Nest India central dispatch in BKC, Mumbai. Call +91 99300 12345 or WhatsApp for instant chauffeur bookings across Mumbai, Thane & MMR."
        canonicalPath="/contact"
      />

      <div className="pt-24 sm:pt-28 pb-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-neutral-400">
            <Link href="/" className="hover:text-[#E5C07B] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-[#E5C07B] font-medium">Contact Us</span>
          </nav>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
              24/7 Operations Desk
            </div>
            <h1 className="text-h1 text-white mb-4">
              Contact Driver Nest India
            </h1>
            <p className="text-body-lead text-neutral-300 font-light">
              Connect directly with our senior operations team to schedule driver trials, request airport transfers, or discuss corporate fleet contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl glass-card border border-[#D4AF37]/30 space-y-4">
                <span className="text-xs font-semibold text-[#E5C07B] uppercase tracking-wider block font-mono">
                  Direct Concierge Helplines
                </span>

                <a
                  href="tel:+919930012345"
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#D4AF37] transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Direct Helpline</span>
                    <span className="text-base font-bold text-white font-mono">+91 99300 12345</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/919930012345?text=Hello%20Driver%20Nest%20India,%20I%20would%20like%20to%20request%20a%20driver%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#25D366] transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">WhatsApp Desk</span>
                    <span className="text-base font-bold text-white font-mono">+91 99300 12345</span>
                  </div>
                </a>

                <a
                  href="mailto:concierge@drivernestindia.com"
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#D4AF37] transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Official Email</span>
                    <span className="text-sm font-semibold text-white">concierge@drivernestindia.com</span>
                  </div>
                </a>
              </div>

              <div className="p-6 rounded-2xl glass-card border border-neutral-800 space-y-3">
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block font-mono">
                  Corporate Headquarters
                </span>
                <div className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Bandra Kurla Complex (BKC) &amp; Western Express Corridor, Mumbai, Maharashtra 400051</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
                  <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Operations: 24 Hours / 7 Days a Week / 365 Days</span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7">
              <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#D4AF37]/35 shadow-2xl">
                <div className="border-b border-neutral-800 pb-4 mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">Send Consultation Request</h2>
                    <p className="text-xs text-[#E5C07B] mt-1 font-medium">Fast 30-45 Minute Driver Allocation</p>
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
                    <h3 className="text-2xl font-bold text-white font-display">Inquiry Received</h3>
                    <p className="text-sm text-neutral-300 leading-relaxed max-w-md mx-auto font-light">
                      Thank you, {formData.fullName}. Our concierge desk will contact you within a few minutes.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-[#E5C07B] hover:underline cursor-pointer pt-2 font-medium"
                    >
                      Submit another message
                    </button>
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
                        className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Phone Number *</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 98200 12345"
                          className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-mono"
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
                          className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Vehicle Details &amp; Message
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Vehicle model, transmission, scheduled duty timings, and specific questions..."
                        className="w-full bg-neutral-900/90 border border-neutral-700/80 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500 resize-none font-light"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary h-12 text-sm mt-2"
                    >
                      {isSubmitting ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-black" />
                          <span>Send Message to Concierge</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
