import React, { useState } from 'react';
import { Link, SEO } from '../router';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  Calendar,
  Car,
  User,
  Headphones,
  ChevronRight,
  Sparkles,
  FileText,
} from 'lucide-react';
import {
  submitLead,
  validateLeadForm,
  getWhatsAppFallbackUrl,
  getWhatsAppSuccessUrl,
  PRIMARY_PHONE,
} from '../services/leadService';
import { LeadFormData } from '../types';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    mobile: '',
    email: '',
    location: 'Mumbai (BKC, South Mumbai, Suburbs)',
    serviceType: 'Personal Driver',
    vehicleType: 'Toyota Innova Crysta / Hycross',
    date: new Date().toISOString().split('T')[0],
    time: 'Immediate Dispatch (30-45 mins)',
    message: '',
    formName: 'Contact Form',
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [submissionFailed, setSubmissionFailed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateLeadForm(formData, honeypot);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmissionFailed(false);
    setIsSubmitting(true);

    try {
      console.log('[CONSOLE LOG] [CONTACT FORM SUBMITTING]', formData);
      const res = await submitLead(formData, 'Contact Form');

      if (res.success && res.record) {
        setBookingRef(res.record.id);
        setSubmitted(true);
      } else {
        setSubmissionFailed(true);
        setErrors({
          form: res.error || "We couldn't submit your request right now. Please call 8652880057 or contact us on WhatsApp.",
        });
      }
    } catch (err: any) {
      console.error('[CONSOLE LOG] [CONTACT FORM FATAL ERROR]', err);
      setSubmissionFailed(true);
      setErrors({
        form: "We couldn't submit your request right now. Please call 8652880057 or contact us on WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppForward = () => {
    window.open(getWhatsAppSuccessUrl(formData, bookingRef), '_blank');
  };

  const handleWhatsAppFallback = () => {
    window.open(getWhatsAppFallbackUrl(formData), '_blank');
  };

  return (
    <>
      <SEO
        title="Contact Us – On Time Driver Service | 24/7 Mumbai Driver Concierge"
        description="Contact On Time Driver Service in Mumbai. Call +91 8652880057 or email info@ontimedriverservice.com for verified driver bookings across Mumbai, Navi Mumbai, Thane, Mira Road, Vasai, Virar & Palghar."
        canonicalPath="/contact"
      />

      <div className="pt-24 sm:pt-28 pb-20 bg-[#F8FAFC] text-[#111827] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-[#4B5563]">
            <Link href="/" className="hover:text-[#35B6DE] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span className="text-[#111827] font-semibold">Contact Us</span>
          </nav>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#35B6DE]/30 shadow-xs mb-3.5">
              <Headphones className="w-3.5 h-3.5 text-[#35B6DE]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
                24/7 Driver Operations Desk
              </span>
            </div>
            <h1 className="text-h1 font-extrabold text-[#111827] mb-4">
              Contact On Time Driver Service
            </h1>
            <p className="text-subheading text-[#4B5563] leading-relaxed text-base sm:text-lg">
              Need a verified driver within 30 minutes? Or planning monthly driver placement for your family or corporate fleet? Reach our concierge team directly.
            </p>
          </div>

          {/* Contact Showcase Visual Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs mb-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Driver visual */}
              <div className="lg:col-span-6 relative">
                <div className="rounded-xl overflow-hidden border border-[#E5E7EB] shadow-xs aspect-[16/10] bg-slate-100 relative">
                  <img
                    src="/images/services/corporate-driver.jpg"
                    alt="Professional driver standing beside corporate sedan vehicle in Mumbai"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-[#111827] border border-[#E5E7EB]">
                    Mumbai BKC Operations Pod
                  </div>
                </div>
              </div>

              {/* Direct Channels */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE] block">
                  Dedicated Direct Channels
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#111827]">
                  Fast Allocation &middot; 24/7 Dispatch Team
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Our central control room coordinates directly with 5,000+ verified drivers across Mumbai, Thane, Navi Mumbai, and Mira Road.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href="tel:8652880057"
                    className="p-3.5 rounded-xl bg-[#EEF8FC] border border-[#35B6DE]/30 flex items-center gap-3 hover:border-[#35B6DE] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#35B6DE] shadow-xs">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#4B5563]">Call Hotline</p>
                      <p className="text-sm font-bold text-[#111827] group-hover:text-[#35B6DE]">8652880057</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/918652880057?text=Hi%2C%20I%20need%20a%20professional%20driver%20service."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-[#EEF8FC] border border-[#22C55E]/30 flex items-center gap-3 hover:border-[#22C55E] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#22C55E] shadow-xs">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#4B5563]">WhatsApp Support</p>
                      <p className="text-sm font-bold text-[#111827] group-hover:text-[#22C55E]">8652880057</p>
                    </div>
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#4B5563]">
                  <span>Email: </span>
                  <a href="mailto:info@ontimedriverservice.com" className="text-[#35B6DE] hover:underline font-semibold">
                    info@ontimedriverservice.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form & Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left 7 Columns: Premium White Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 shadow-xs">
              {!submitted ? (
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#111827] mb-2">
                    Send Driver Requirement
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] mb-6">
                    Fill the fields below to dispatch your booking directly to <span className="text-[#35B6DE] font-semibold">info@ontimedriverservice.com</span>.
                  </p>

                  {errors.form && (
                    <div className="p-4 mb-5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs space-y-2">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                        <span className="font-semibold">{errors.form}</span>
                      </div>
                      {submissionFailed && (
                        <div className="pt-2 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={handleWhatsAppFallback}
                            className="px-3 py-1.5 rounded-lg bg-[#22C55E] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#1fa952]"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp Us Directly</span>
                          </button>
                          <a
                            href={`tel:${PRIMARY_PHONE}`}
                            className="px-3 py-1.5 rounded-lg bg-[#35B6DE] text-white text-xs font-bold flex items-center gap-1.5"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call {PRIMARY_PHONE}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="contact_hp_check"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {/* 1. Name & 2. Mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Vikram Singhania"
                            value={formData.name}
                            onChange={(e) => {
                              setFormData({ ...formData, name: e.target.value });
                              if (errors.name) setErrors({ ...errors, name: '' });
                            }}
                            className="form-input pl-10 pr-3 py-2.5"
                          />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
                          <input
                            type="tel"
                            required
                            placeholder="10-digit mobile"
                            maxLength={10}
                            value={formData.mobile}
                            onChange={(e) => {
                              setFormData({ ...formData, mobile: e.target.value });
                              if (errors.mobile) setErrors({ ...errors, mobile: '' });
                            }}
                            className="form-input pl-10 pr-3 py-2.5 font-medium"
                          />
                        </div>
                        {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                      </div>
                    </div>

                    {/* 3. Email & 4. Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                          Email Address <span className="text-[#4B5563] text-[11px] font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
                          <input
                            type="email"
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value });
                              if (errors.email) setErrors({ ...errors, email: '' });
                            }}
                            className="form-input pl-10 pr-3 py-2.5"
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                          Location / MMR Sector <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Bandra West, BKC, Powai"
                            value={formData.location}
                            onChange={(e) => {
                              setFormData({ ...formData, location: e.target.value });
                              if (errors.location) setErrors({ ...errors, location: '' });
                            }}
                            className="form-input pl-10 pr-3 py-2.5"
                          />
                        </div>
                        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                      </div>
                    </div>

                    {/* 5. Service Type & 6. Vehicle Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                          Service Type
                        </label>
                        <div className="relative">
                          <ShieldCheck className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
                          <select
                            value={formData.serviceType}
                            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                            className="form-input pl-10 pr-3 py-2.5 bg-white font-medium"
                          >
                            <option value="Personal Driver">Personal Driver Service</option>
                            <option value="Corporate Driver">Corporate Driver Service</option>
                            <option value="Permanent Driver">Permanent / Monthly Driver</option>
                            <option value="Hourly Driver">Hourly Driver Service</option>
                            <option value="Airport Driver">Airport Pickup &amp; Drop Transfer</option>
                            <option value="Outstation Driver">Outstation Driver</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                          Vehicle Details
                        </label>
                        <div className="relative">
                          <Car className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            placeholder="e.g. Toyota Innova / Honda City"
                            value={formData.vehicleType}
                            onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                            className="form-input pl-10 pr-3 py-2.5"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 7. Date & 8. Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                          Date Required
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="form-input pl-10 pr-3 py-2.5"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                          Preferred Time / Shift
                        </label>
                        <div className="relative">
                          <Clock className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            placeholder="e.g. 09:00 AM or Immediate"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="form-input pl-10 pr-3 py-2.5"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 9. Message */}
                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                        Specific Details (Optional)
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3" />
                        <textarea
                          rows={3}
                          placeholder="Your exact pickup street or landmarks, transmission (auto/manual), or special instructions..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="form-input pl-10 pr-3 py-2.5 text-xs resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-[#F3ED1A] hover:bg-[#eae415] text-[#111827] text-sm sm:text-base font-bold rounded-xl flex items-center justify-center gap-2 mt-4 shadow-xs transition-colors cursor-pointer disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-[#111827] border-t-transparent rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#111827]" />
                          <span>Submit Requirement &amp; Assign Driver</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between text-[11px] text-[#4B5563] pt-1">
                      <span>✓ Dispatched to info@ontimedriverservice.com</span>
                      <span>✓ 100% Police Verified Drivers</span>
                    </div>
                  </form>
                </div>
              ) : (
                /* Standardized Confirmation Screen */
                <div className="text-center py-8 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827] mb-2 leading-tight">
                    Thank you. Our team will contact you within 15 minutes.
                  </h3>

                  <p className="text-sm text-[#4B5563] mb-5">
                    Reference: <span className="font-mono font-bold text-[#35B6DE]">{bookingRef}</span>
                  </p>

                  <div className="bg-[#EEF8FC] rounded-xl p-4 border border-[#E5E7EB] text-left text-xs space-y-2 mb-6 text-[#111827] max-w-md mx-auto">
                    <p>• <strong>Central Inbox:</strong> info@ontimedriverservice.com</p>
                    <p>• <strong>Customer:</strong> {formData.name} (+91 {formData.mobile})</p>
                    <p>• <strong>Service &amp; Vehicle:</strong> {formData.serviceType} ({formData.vehicleType})</p>
                    <p>• <strong>Location:</strong> {formData.location}</p>
                    <p>• <strong>Timing:</strong> {formData.date} at {formData.time}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <a
                      href={`tel:${PRIMARY_PHONE}`}
                      className="flex-1 h-11 rounded-xl bg-white border border-[#E5E7EB] text-[#111827] font-bold text-xs flex items-center justify-center gap-2 hover:border-[#35B6DE]"
                    >
                      <Phone className="w-4 h-4 text-[#35B6DE]" />
                      <span>Call Now ({PRIMARY_PHONE})</span>
                    </a>

                    <button
                      onClick={handleWhatsAppForward}
                      className="flex-1 h-11 rounded-xl bg-[#22C55E] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-[#1fa952]"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Us</span>
                    </button>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-[#4B5563] hover:text-[#111827] underline cursor-pointer"
                    >
                      Submit Another Requirement
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right 5 Columns: Operations Hub Info & Working Hours */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs space-y-4">
                <h4 className="text-base font-bold text-[#111827] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#35B6DE]" />
                  <span>Central Dispatch Locations</span>
                </h4>
                <div className="space-y-3 text-xs text-[#4B5563]">
                  <div className="p-3 rounded-xl bg-[#EEF8FC] border border-[#E5E7EB]">
                    <strong className="text-[#111827] block mb-0.5">BKC &amp; South Mumbai Hub:</strong>
                    <span>Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#EEF8FC] border border-[#E5E7EB]">
                    <strong className="text-[#111827] block mb-0.5">Thane &amp; Navi Mumbai Pod:</strong>
                    <span>Majiwada Junction &amp; Vashi Sector 17, MMR</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#EEF8FC] border border-[#E5E7EB]">
                    <strong className="text-[#111827] block mb-0.5">Western Suburbs Hub:</strong>
                    <span>Andheri West &amp; Mira-Bhayandar Staging Pods</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs space-y-3">
                <h4 className="text-base font-bold text-[#111827] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#35B6DE]" />
                  <span>Operations Hours</span>
                </h4>
                <div className="text-xs text-[#4B5563] space-y-2">
                  <div className="flex items-center justify-between py-1 border-b border-[#E5E7EB]">
                    <span>Driver Dispatch Operations:</span>
                    <strong className="text-[#22C55E]">24 Hours / 365 Days</strong>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#E5E7EB]">
                    <span>Support Desk:</span>
                    <strong className="text-[#111827]">24/7 Live Concierge</strong>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>Average Doorstep Arrival:</span>
                    <strong className="text-[#35B6DE]">30–45 Minutes</strong>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};
