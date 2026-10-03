import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  ShieldCheck,
  User,
  Phone,
  Mail,
  MapPin,
  Car,
  Calendar,
  Clock,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { LeadFormData, FormType } from '../types';
import { submitLead, validateLeadForm } from '../services/leadService';

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
  initialLocation = 'Mumbai (BKC, South Mumbai, Suburbs)',
  formType = 'Quick Booking Form',
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    mobile: '',
    email: '',
    location: initialLocation,
    serviceType: initialService,
    vehicleType: 'Sedan (Honda City / Dzire)',
    date: new Date().toISOString().split('T')[0],
    time: 'Immediate Dispatch (30-45 mins)',
    message: '',
    formName: formType,
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [serverMessage, setServerMessage] = useState('');

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceType: initialService }));
    }
    if (initialLocation) {
      setFormData((prev) => ({ ...prev, location: initialLocation }));
    }
  }, [initialService, initialLocation]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Comprehensive validation
    const validation = validateLeadForm(formData, honeypot);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await submitLead(formData, formType);
      if (res.success && res.record) {
        setBookingRef(res.record.id);
        setServerMessage(res.message);
        setSubmitted(true);
      }
    } catch (err: any) {
      setErrors({ form: 'An error occurred during submission. Please call 8652880057 directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppForward = () => {
    const text = encodeURIComponent(
      `Hello On Time Driver Service, I just submitted chauffeur booking #${bookingRef || 'NEW'}:\n\n` +
        `• Name: ${formData.name}\n` +
        `• Mobile: ${formData.mobile}\n` +
        `• Email: ${formData.email}\n` +
        `• Location: ${formData.location}\n` +
        `• Service: ${formData.serviceType}\n` +
        `• Vehicle: ${formData.vehicleType}\n` +
        `• Date/Time: ${formData.date} at ${formData.time}\n` +
        `• Message: ${formData.message || 'Standard requirement'}\n\n` +
        `Please expedite driver verification & allocation.`
    );
    window.open(`https://wa.me/918652880057?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#121212] rounded-2xl border border-white/15 shadow-2xl p-6 sm:p-7 my-6 overflow-hidden text-white">
        
        {/* Ambient Modal Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#35B5D8]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close Booking Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#35B5D8]/15 border border-[#35B5D8]/30 text-[#35B5D8] text-xs font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Chauffeur Dispatch</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Book a Verified Driver
              </h3>
              <p className="text-xs sm:text-sm text-[#D1D5DB] mt-1">
                All bookings delivered directly to our 24/7 concierge at <span className="text-[#35B5D8]">info@ontimedriverservice.com</span>.
              </p>
            </div>

            {/* Error banner */}
            {errors.form && (
              <div className="p-3 mb-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errors.form}</span>
              </div>
            )}

            {/* Complete 9-Field Form */}
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

              {/* 1. Name & 2. Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Your Full Name <span className="text-[#F2F028]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Mehta"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className="dark-input w-full pl-9 pr-3 py-2.5"
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Mobile Number <span className="text-[#F2F028]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
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
                      className="dark-input w-full pl-9 pr-3 py-2.5"
                    />
                  </div>
                  {errors.mobile && <p className="text-red-400 text-[11px] mt-1">{errors.mobile}</p>}
                </div>
              </div>

              {/* 3. Email & 4. Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Email Address <span className="text-[#F2F028]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className="dark-input w-full pl-9 pr-3 py-2.5"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Location / Pickup Area <span className="text-[#F2F028]">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="dark-input w-full pl-9 pr-3 py-2.5 appearance-none"
                    >
                      <option value="Mumbai (BKC, South Mumbai, Suburbs)">Mumbai (BKC / South Mumbai / Suburbs)</option>
                      <option value="Bandra / Khar / Juhu / Andheri">Bandra / Khar / Juhu / Andheri</option>
                      <option value="Worli / Lower Parel / Marine Lines">Worli / Lower Parel / Marine Lines</option>
                      <option value="Powai / Ghatkopar / Mulund">Powai / Ghatkopar / Mulund</option>
                      <option value="Thane (Majiwada, Ghodbunder)">Thane (Majiwada / Ghodbunder)</option>
                      <option value="Navi Mumbai (Vashi, Nerul, Belapur)">Navi Mumbai (Vashi / Nerul / Belapur)</option>
                      <option value="Mira Road & Bhayandar">Mira Road &amp; Bhayandar</option>
                      <option value="Vasai, Virar & Palghar">Vasai, Virar &amp; Palghar</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 5. Service Type & 6. Vehicle Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Service Required
                  </label>
                  <div className="relative">
                    <ShieldCheck className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="dark-input w-full pl-9 pr-3 py-2.5 appearance-none"
                    >
                      <option value="Personal Driver">Personal Driver Service</option>
                      <option value="Corporate Driver">Corporate Chauffeur Service</option>
                      <option value="Permanent Driver">Permanent / Full-Time Driver</option>
                      <option value="Hourly Driver">Hourly Driver Service</option>
                      <option value="Airport Driver">Airport Pickup &amp; Drop</option>
                      <option value="Outstation Driver">Outstation Driver (Pune/Nashik/Goa)</option>
                      <option value="Family Driver">Family &amp; School Commute Driver</option>
                      <option value="Luxury Chauffeur">Luxury Chauffeur Service</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Vehicle Type
                  </label>
                  <div className="relative">
                    <Car className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                    <select
                      value={formData.vehicleType}
                      onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                      className="dark-input w-full pl-9 pr-3 py-2.5 appearance-none"
                    >
                      <option value="Sedan (Honda City / Dzire / Verna)">Sedan (Honda City / Dzire / Verna)</option>
                      <option value="Toyota Innova Crysta / Hycross">Toyota Innova Crysta / Hycross</option>
                      <option value="SUV (Creta / Fortuner / Seltos)">SUV (Creta / Fortuner / Seltos)</option>
                      <option value="Luxury (Mercedes / BMW / Audi)">Luxury (Mercedes / BMW / Audi)</option>
                      <option value="Hatchback (Swift / i20 / Baleno)">Hatchback (Swift / i20 / Baleno)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 7. Date & 8. Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Service Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="dark-input w-full pl-9 pr-3 py-2.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Time / Urgency
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="dark-input w-full pl-9 pr-3 py-2.5 appearance-none"
                    >
                      <option value="Immediate Dispatch (30-45 mins)">Immediate Dispatch (30–45 mins)</option>
                      <option value="Morning (07:00 AM - 10:00 AM)">Morning (07:00 AM – 10:00 AM)</option>
                      <option value="Afternoon (12:00 PM - 03:00 PM)">Afternoon (12:00 PM – 03:00 PM)</option>
                      <option value="Evening (05:00 PM - 08:00 PM)">Evening (05:00 PM – 08:00 PM)</option>
                      <option value="Night / Late Duty">Night / Late Duty</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 9. Message / Requirements */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Additional Notes (Optional)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    placeholder="Specific pickup address, transmission type (auto/manual), or outstation destination..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="dark-input w-full pl-9 pr-3 py-2 text-xs"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full h-[52px] text-base font-bold flex items-center justify-center gap-2 mt-4 shadow-lg shadow-[#F2F028]/25"
              >
                {isSubmitting ? (
                  <span>Dispatching to Concierge Desk...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#0A0A0A]" />
                    <span>Confirm Booking &amp; Allocate Chauffeur</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-[#9CA3AF] mt-2">
                🔒 Police-verified drivers · No advance brokerage · Dispatched to info@ontimedriverservice.com
              </p>
            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#35B5D8]/20 border border-[#35B5D8] text-[#35B5D8] flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-2">
              Booking Request Received!
            </h3>

            <p className="text-sm text-[#D1D5DB] mb-4">
              Booking Ref: <span className="font-mono font-bold text-[#F2F028]">{bookingRef}</span>
            </p>

            <div className="bg-[#181818] rounded-xl p-4 border border-white/10 text-left text-xs space-y-2 mb-6 text-neutral-300">
              <p>• <strong>Delivered To:</strong> info@ontimedriverservice.com</p>
              <p>• <strong>Name:</strong> {formData.name}</p>
              <p>• <strong>Mobile:</strong> +91 {formData.mobile}</p>
              <p>• <strong>Email Confirmation Sent To:</strong> {formData.email}</p>
              <p>• <strong>Service:</strong> {formData.serviceType} ({formData.vehicleType})</p>
              <p>• <strong>Status:</strong> Driver allocation in progress</p>
            </div>

            <p className="text-xs text-neutral-400 mb-6">
              Our concierge will contact you at <strong>+91 {formData.mobile}</strong> within 15–30 minutes to confirm your driver details.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleWhatsAppForward}
                className="flex-1 h-[50px] rounded-xl bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
              >
                <span>Expedite via WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="h-[50px] px-6 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
