import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  Calendar,
  Clock,
  Car,
  MapPin,
  User,
  Mail,
  ShieldCheck,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { validateLeadForm, submitLead, getWhatsAppFallbackUrl, getWhatsAppSuccessUrl, PRIMARY_PHONE } from '../services/leadService';
import { LeadFormData } from '../types';

export const LeadFormSection: React.FC = () => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    mobile: '',
    email: '',
    location: '',
    serviceType: 'Personal Driver',
    date: new Date().toISOString().split('T')[0],
    time: 'Immediate Dispatch',
    vehicleType: 'Sedan (Honda City / Verna / Ciaz)',
    message: '',
    formName: 'Instant Driver Booking',
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
      console.log('[CONSOLE LOG] [HOMEPAGE FORM SUBMIT]', formData);
      const res = await submitLead(formData, 'Instant Driver Booking');

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
      console.error('[CONSOLE LOG] [HOMEPAGE FORM FATAL ERROR]', err);
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
    <section id="request-driver" className="py-20 lg:py-24 bg-white relative border-b border-[#E5E7EB] text-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Chauffeur Experience Image & Trust Credentials */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#EEF8FC] border border-[#35B6DE]/30 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#35B6DE]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
                Fast Allocation Desk
              </span>
            </div>

            <h2 className="text-h2 font-extrabold text-[#111827] leading-tight">
              Book Your Verified Driver in Under 60 Seconds
            </h2>

            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              Every submission is automatically routed to our 24/7 central dispatch desk at <strong className="text-[#111827]">info@ontimedriverservice.com</strong> and assigned to an available vetted driver near your sector.
            </p>

            {/* Visual Image Card with clean corporate styling */}
            <div className="relative rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs aspect-[16/10] bg-slate-100">
              <img
                src="/images/services/corporate-driver.jpg"
                alt="Verified Chauffeur in executive attire with car in Mumbai"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 border border-[#E5E7EB] shadow-xs">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#22C55E] shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#111827]">Guaranteed Punctuality &amp; Replacement</p>
                    <p className="text-[11px] text-[#4B5563]">100% Police Verified Drivers Across MMR</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Support Quick Row */}
            <div className="p-4 rounded-xl bg-[#EEF8FC] border border-[#E5E7EB] flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#35B6DE]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#4B5563]">Need Immediate Allocation?</p>
                  <a href={`tel:${PRIMARY_PHONE}`} className="text-sm font-bold text-[#111827] hover:text-[#35B6DE]">
                    Call Desk: {PRIMARY_PHONE}
                  </a>
                </div>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
                24x7 Live
              </span>
            </div>
          </div>

          {/* Right Column: Premium White Card Lead Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 shadow-xl relative overflow-hidden">
              
              {!submitted ? (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#111827]">
                      Instant Driver Booking
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
                      Fill your details and our team will contact you shortly.
                    </p>
                  </div>

                  {/* Error Notification with WhatsApp Fallback */}
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
                    {/* Honeypot field (hidden from real users) */}
                    <div style={{ display: 'none' }}>
                      <input
                        type="text"
                        name="website_security_token"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Field 1 & 2: Full Name & Mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Vikram Malhotra"
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
                            maxLength={10}
                            placeholder="10-digit mobile number"
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

                    {/* Field 3: Email Address (optional) */}
                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                        Email Address <span className="text-[#4B5563] text-[11px] font-normal">(Optional - for booking confirmation)</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          placeholder="e.g. corporate.lead@company.com"
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

                    {/* Field 4 & 5: Location & Service Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                          Pickup Location <span className="text-red-500">*</span>
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

                      <div>
                        <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                          Driver Service Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.serviceType}
                          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                          className="form-input px-3 py-2.5 bg-white font-medium"
                        >
                          <option value="Personal Driver">Personal Driver</option>
                          <option value="Corporate Driver">Corporate Driver</option>
                          <option value="Permanent Driver">Permanent Driver</option>
                          <option value="Hourly Driver">Hourly Driver</option>
                          <option value="Airport Driver">Airport Driver</option>
                          <option value="Outstation Driver">Outstation Driver</option>
                          <option value="Senior Citizen Driver Care">Senior Citizen Assistance</option>
                        </select>
                      </div>
                    </div>

                    {/* Field 6 & 7: Date & Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                          Service Date
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
                          Reporting Time
                        </label>
                        <div className="relative">
                          <Clock className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            placeholder="e.g. 08:30 AM or Immediate"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="form-input pl-10 pr-3 py-2.5"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Field 8: Vehicle / Car Model Details */}
                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                        Vehicle Details / Car Model
                      </label>
                      <div className="relative">
                        <Car className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          placeholder="e.g. Toyota Innova Crysta / Honda City / Fortuner Automatic"
                          value={formData.vehicleType}
                          onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                          className="form-input pl-10 pr-3 py-2.5"
                        />
                      </div>
                    </div>

                    {/* Field 9: Message / Special Instructions */}
                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                        Specific Requirements (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Add duty hours, uniform preference, destination route, or specific requests..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="form-input px-3 py-2.5 resize-none text-xs"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-[#F3ED1A] hover:bg-[#eae415] text-[#111827] font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-[#111827] border-t-transparent rounded-full animate-spin" />
                            Dispatching Request to Concierge Desk...
                          </span>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-[#111827]" />
                            <span>Request Driver</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Trust Micro-copy */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#4B5563] gap-2 border-t border-[#E5E7EB]">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                        100% Police Verified &middot; Zero Hidden Charges
                      </span>
                      <span>
                        Need help? Call <a href={`tel:${PRIMARY_PHONE}`} className="text-[#35B6DE] font-bold hover:underline">{PRIMARY_PHONE}</a>
                      </span>
                    </div>
                  </form>
                </div>
              ) : (
                /* Success Screen with exact required text */
                <div className="py-8 text-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center mx-auto mb-4 text-[#22C55E]">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-1 font-heading">
                    Booking Request Received!
                  </h3>

                  {/* Required exact success confirmation message */}
                  <p className="text-sm font-bold text-[#22C55E] mb-3 bg-[#22C55E]/10 py-2 px-3 rounded-lg max-w-md mx-auto">
                    Thank you for your enquiry. Our team will contact you shortly.
                  </p>

                  <p className="text-xs text-[#4B5563] max-w-md mx-auto mb-6">
                    A notification has been dispatched to <strong className="text-[#35B6DE]">info@ontimedriverservice.com</strong>. Our operations team is matching your vehicle model with a verified driver.
                  </p>

                  {/* Booking Receipt Summary Card */}
                  <div className="bg-[#EEF8FC] rounded-xl p-4 border border-[#E5E7EB] text-left text-xs space-y-2 mb-6 max-w-md mx-auto">
                    <div className="flex justify-between border-b border-[#E5E7EB] pb-1.5">
                      <span className="text-[#4B5563]">Booking Reference:</span>
                      <span className="font-mono font-bold text-[#111827]">{bookingRef}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E5E7EB] pb-1.5">
                      <span className="text-[#4B5563]">Customer Name:</span>
                      <span className="font-semibold text-[#111827]">{formData.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E5E7EB] pb-1.5">
                      <span className="text-[#4B5563]">Contact Mobile:</span>
                      <span className="font-semibold text-[#111827]">+91 {formData.mobile}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E5E7EB] pb-1.5">
                      <span className="text-[#4B5563]">Location:</span>
                      <span className="font-semibold text-[#111827]">{formData.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4B5563]">Service Selected:</span>
                      <span className="font-bold text-[#35B6DE]">{formData.serviceType}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 max-w-md mx-auto">
                    <button
                      type="button"
                      onClick={handleWhatsAppForward}
                      className="btn-whatsapp w-full h-11 text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Track Allocation via WhatsApp (8652880057)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          mobile: '',
                          email: '',
                          location: '',
                          serviceType: 'Personal Driver',
                          date: new Date().toISOString().split('T')[0],
                          time: 'Immediate Dispatch',
                          vehicleType: 'Sedan (Honda City / Verna / Ciaz)',
                          message: '',
                          formName: 'Homepage Quick Booking Form',
                        });
                      }}
                      className="text-xs text-[#4B5563] hover:text-[#111827] underline py-2 block mx-auto cursor-pointer"
                    >
                      Submit another driver requirement
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
