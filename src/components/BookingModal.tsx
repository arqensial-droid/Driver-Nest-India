import React, { useState, useEffect } from 'react';
import {
  X,
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
} from 'lucide-react';
import { validateLeadForm, submitLead, getWhatsAppFallbackUrl, getWhatsAppSuccessUrl, PRIMARY_PHONE } from '../services/leadService';
import { LeadFormData, FormType } from '../types';
import { BrandLogo } from './BrandLogo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialLocation?: string;
  formType?: FormType;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Personal Driver',
  initialLocation = 'Mumbai',
  formType = 'Book a Driver Form',
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    mobile: '',
    email: '',
    location: initialLocation,
    serviceType: initialService,
    date: new Date().toISOString().split('T')[0],
    time: 'Immediate / Flexible',
    vehicleType: 'Sedan / SUV',
    message: '',
    formName: formType,
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [submissionFailed, setSubmissionFailed] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceType: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialLocation) {
      setFormData((prev) => ({ ...prev, location: initialLocation }));
    }
  }, [initialLocation]);

  useEffect(() => {
    if (formType) {
      setFormData((prev) => ({ ...prev, formName: formType }));
    }
  }, [formType]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

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
      console.log('[CONSOLE LOG] [BOOKING MODAL SUBMISSION]', formData);
      const res = await submitLead(formData, formType);

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
      console.error('[CONSOLE LOG] [MODAL FATAL ERROR]', err);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl p-6 sm:p-7 my-6 overflow-hidden text-[#111827]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#4B5563] hover:text-[#111827] rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close Booking Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Header */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <BrandLogo size="md" />
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF8FC] border border-[#35B6DE]/30 text-[#35B6DE] text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Verified Drivers</span>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#111827]">
                Instant Driver Booking
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
                Fill your details and our team will contact you shortly.
              </p>
            </div>

            {/* Error banner with WhatsApp Fallback */}
            {errors.form && (
              <div className="p-4 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs space-y-2">
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

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="website_field_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className="form-input pl-9 pr-3 py-2 text-xs"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile"
                      value={formData.mobile}
                      onChange={(e) => {
                        setFormData({ ...formData, mobile: e.target.value });
                        if (errors.mobile) setErrors({ ...errors, mobile: '' });
                      }}
                      className="form-input pl-9 pr-3 py-2 text-xs font-medium"
                    />
                  </div>
                  {errors.mobile && <p className="text-red-500 text-xs mt-0.5">{errors.mobile}</p>}
                </div>
              </div>

              {/* Email Address (optional) */}
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Email Address <span className="text-[#4B5563] text-[11px] font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className="form-input pl-9 pr-3 py-2 text-xs"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>}
              </div>

              {/* Location & Service Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Pickup Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bandra, BKC, Andheri"
                      value={formData.location}
                      onChange={(e) => {
                        setFormData({ ...formData, location: e.target.value });
                        if (errors.location) setErrors({ ...errors, location: '' });
                      }}
                      className="form-input pl-9 pr-3 py-2 text-xs"
                    />
                  </div>
                  {errors.location && <p className="text-red-500 text-xs mt-0.5">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Driver Service Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="form-input px-3 py-2 text-xs bg-white font-medium"
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
                  <label className="block text-[11px] font-semibold text-[#111827] mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="form-input px-2 py-1.5 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#111827] mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 09:00 AM"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="form-input px-2 py-1.5 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#111827] mb-1">
                    Car Model
                  </label>
                  <input
                    type="text"
                    placeholder="Innova / Sedan"
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    className="form-input px-2 py-1.5 text-xs"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Specific Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Special instructions or timing requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-input px-3 py-2 text-xs resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-[#F3ED1A] hover:bg-[#eae415] text-[#111827] font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-[#111827] border-t-transparent rounded-full animate-spin" />
                      Connecting to Central Desk...
                    </span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-[#111827]" />
                      <span>Request Driver</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-[#4B5563]">
                <span className="flex items-center gap-1 text-[#22C55E]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% Police Verified Chauffeur
                </span>
                <span>
                  Immediate Help: <a href={`tel:${PRIMARY_PHONE}`} className="text-[#35B6DE] font-bold">{PRIMARY_PHONE}</a>
                </span>
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="py-6 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center mx-auto mb-3 text-[#22C55E]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-[#111827] mb-1 font-heading">
              Driver Booking Confirmed!
            </h3>

            {/* Exact Required Success Message */}
            <p className="text-sm font-bold text-[#22C55E] mb-2 bg-[#22C55E]/10 py-1.5 px-3 rounded-lg max-w-sm mx-auto">
              Thank you for your enquiry. Our team will contact you shortly.
            </p>

            <div className="bg-[#EEF8FC] rounded-xl p-3.5 border border-[#E5E7EB] text-left text-xs space-y-1.5 mb-5 max-w-sm mx-auto">
              <div className="flex justify-between text-[#4B5563]">
                <span>Reference:</span>
                <span className="font-mono font-bold text-[#111827]">{bookingRef}</span>
              </div>
              <div className="flex justify-between text-[#4B5563]">
                <span>Customer:</span>
                <span className="font-semibold text-[#111827]">{formData.name}</span>
              </div>
              <div className="flex justify-between text-[#4B5563]">
                <span>Contact:</span>
                <span className="font-semibold text-[#111827]">+91 {formData.mobile}</span>
              </div>
              <div className="flex justify-between text-[#4B5563]">
                <span>Service:</span>
                <span className="font-bold text-[#35B6DE]">{formData.serviceType}</span>
              </div>
              <div className="flex justify-between text-[#4B5563]">
                <span>Location:</span>
                <span className="font-semibold text-[#111827]">{formData.location}</span>
              </div>
            </div>

            <div className="space-y-2.5 max-w-sm mx-auto">
              <button
                type="button"
                onClick={handleWhatsAppForward}
                className="btn-whatsapp w-full h-11 text-xs font-bold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Track Allocation via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="btn-secondary w-full h-10 text-xs font-semibold"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
