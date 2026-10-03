import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  MapPin,
  Send,
  CheckCircle2,
  ShieldCheck,
  User,
  Mail,
  Car,
  FileText,
  Calendar,
  Clock,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { LeadFormData } from '../types';
import { submitLead, validateLeadForm } from '../services/leadService';

interface LeadFormSectionProps {
  preselectedService?: string;
  preselectedLocation?: string;
  formTitle?: string;
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({
  preselectedService,
  preselectedLocation,
  formTitle = 'Request Verified Chauffeur Service',
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    mobile: '',
    email: '',
    location: preselectedLocation || 'Mumbai (BKC, South Mumbai, Suburbs)',
    serviceType: preselectedService || 'Personal Driver',
    vehicleType: 'Toyota Innova Crysta / Hycross',
    date: new Date().toISOString().split('T')[0],
    time: 'Immediate Dispatch (30-45 mins)',
    message: '',
    formName: 'Driver Requirement Form',
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLeadForm(formData, honeypot);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await submitLead(formData, 'Driver Requirement Form');
      if (res.success && res.record) {
        setBookingRef(res.record.id);
        setSubmitted(true);
      }
    } catch (err) {
      setErrors({ form: 'Submission error. Please call our 24/7 concierge at 8652880057 directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppForward = () => {
    const text = encodeURIComponent(
      `Hello On Time Driver Service, I submitted driver requirement #${bookingRef || 'NEW'}:\n\n` +
        `• Name: ${formData.name}\n` +
        `• Mobile: ${formData.mobile}\n` +
        `• Email: ${formData.email}\n` +
        `• Location: ${formData.location}\n` +
        `• Service: ${formData.serviceType}\n` +
        `• Vehicle: ${formData.vehicleType}\n` +
        `• Date: ${formData.date} at ${formData.time}\n` +
        `• Message: ${formData.message || 'Chauffeur requirement'}\n\n` +
        `Please confirm driver allocation.`
    );
    window.open(`https://wa.me/918652880057?text=${text}`, '_blank');
  };

  return (
    <section id="request-driver" className="py-20 lg:py-28 bg-[#0A0A0A] relative border-t border-b border-white/10 text-white">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#35B5D8]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Chauffeur Experience Image & Trust Credentials */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#121212] border border-[#35B5D8]/40 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#F2F028]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#35B5D8]">
                Instant Booking Concierge
              </span>
            </div>

            <h2 className="text-h2 font-extrabold text-white leading-tight">
              Book Your Verified Driver in Under 60 Seconds
            </h2>

            <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
              Every submission is automatically routed to our 24/7 central dispatch desk at <strong className="text-white">info@ontimedriverservice.com</strong> and assigned to an available vetted driver near your sector.
            </p>

            {/* Visual Image Card with dark luxury overlay */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl aspect-[16/10] bg-[#121212]">
              <ImageWithFallback
                src="/images/services/corporate-driver.jpg"
                alt="Verified Indian Chauffeur in uniform with executive car in Mumbai"
                fallbackTitle="Executive Chauffeur Mumbai"
                vehicleTag="Toyota Innova & Sedans"
                locationTag="BKC & South Mumbai"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 glass-badge rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#35B5D8] shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">Guaranteed Punctuality &amp; Replacement</p>
                    <p className="text-[11px] text-[#D1D5DB]">100% Police Verified Drivers Across MMR</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Support Quick Row */}
            <div className="p-4 rounded-xl bg-[#121212] border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F2F028]/15 border border-[#F2F028]/30 flex items-center justify-center text-[#F2F028]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Need Immediate Allocation?</p>
                  <a href="tel:8652880057" className="text-sm font-bold text-white hover:text-[#35B5D8]">
                    Call Desk: +91 8652880057
                  </a>
                </div>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
                24x7 Live
              </span>
            </div>
          </div>

          {/* Right Column: Complete 9-Field Dark Luxury Lead Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#121212] rounded-2xl border border-white/15 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#F2F028]/5 rounded-full blur-3xl pointer-events-none" />

              {!submitted ? (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                      {formTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D1D5DB] mt-1">
                      Fill the 9 booking details below. You will receive an email confirmation and immediate callback.
                    </p>
                  </div>

                  {errors.form && (
                    <div className="p-3 mb-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errors.form}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Anti-spam honeypot */}
                    <input
                      type="text"
                      name="otds_hp_field"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {/* 1. Name & 2. Mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                          Full Name <span className="text-[#F2F028]">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rajesh Singhania"
                            value={formData.name}
                            onChange={(e) => {
                              setFormData({ ...formData, name: e.target.value });
                              if (errors.name) setErrors({ ...errors, name: '' });
                            }}
                            className="dark-input w-full pl-10 pr-3 py-2.5"
                          />
                        </div>
                        {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                          Mobile Number <span className="text-[#F2F028]">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
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
                            className="dark-input w-full pl-10 pr-3 py-2.5"
                          />
                        </div>
                        {errors.mobile && <p className="text-red-400 text-[11px] mt-1">{errors.mobile}</p>}
                      </div>
                    </div>

                    {/* 3. Email & 4. Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                          Email Address <span className="text-[#F2F028]">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                          <input
                            type="email"
                            required
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value });
                              if (errors.email) setErrors({ ...errors, email: '' });
                            }}
                            className="dark-input w-full pl-10 pr-3 py-2.5"
                          />
                        </div>
                        {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                          Pickup Location / Sector <span className="text-[#F2F028]">*</span>
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                          <select
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="dark-input w-full pl-10 pr-3 py-2.5 appearance-none"
                          >
                            <option value="Mumbai (BKC, South Mumbai, Suburbs)">Mumbai (BKC / South Mumbai / Suburbs)</option>
                            <option value="Bandra / Khar / Juhu / Santacruz">Bandra / Khar / Juhu / Santacruz</option>
                            <option value="Andheri / Oshiwara / Versova">Andheri / Oshiwara / Versova</option>
                            <option value="Worli / Lower Parel / Prabhadevi">Worli / Lower Parel / Prabhadevi</option>
                            <option value="Powai / Chandivali / Kanjurmarg">Powai / Chandivali / Kanjurmarg</option>
                            <option value="Thane (Majiwada, Ghodbunder, Pokhran)">Thane (Majiwada / Ghodbunder / Pokhran)</option>
                            <option value="Navi Mumbai (Vashi, Nerul, Kharghar, Belapur)">Navi Mumbai (Vashi / Nerul / Kharghar)</option>
                            <option value="Mira Road, Bhayandar & Dahisar">Mira Road, Bhayandar &amp; Dahisar</option>
                            <option value="Vasai, Virar & Palghar">Vasai, Virar &amp; Palghar</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* 5. Service Type & 6. Vehicle Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                          Service Type
                        </label>
                        <div className="relative">
                          <ShieldCheck className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                          <select
                            value={formData.serviceType}
                            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                            className="dark-input w-full pl-10 pr-3 py-2.5 appearance-none"
                          >
                            <option value="Personal Driver">Personal Driver Service</option>
                            <option value="Corporate Driver">Corporate Chauffeur Service</option>
                            <option value="Permanent Driver">Permanent / Full-Time Driver</option>
                            <option value="Hourly Driver">Hourly Driver Service</option>
                            <option value="Airport Driver">Airport Pickup &amp; Drop Transfer</option>
                            <option value="Outstation Driver">Outstation Driver (Pune / Nashik / Alibaug)</option>
                            <option value="Family Driver">Family &amp; School Commute Driver</option>
                            <option value="Luxury Chauffeur">Luxury Chauffeur Service</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                          Vehicle Type
                        </label>
                        <div className="relative">
                          <Car className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                          <select
                            value={formData.vehicleType}
                            onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                            className="dark-input w-full pl-10 pr-3 py-2.5 appearance-none"
                          >
                            <option value="Toyota Innova Crysta / Hycross">Toyota Innova Crysta / Hycross</option>
                            <option value="Premium Sedan (Honda City / Verna / Ciaz)">Premium Sedan (Honda City / Verna / Ciaz)</option>
                            <option value="SUV (Creta / Seltos / Fortuner / Harrier)">SUV (Creta / Seltos / Fortuner / Harrier)</option>
                            <option value="Luxury Fleet (Mercedes / BMW / Audi / Jaguar)">Luxury Fleet (Mercedes / BMW / Audi / Jaguar)</option>
                            <option value="Compact / Hatchback (Swift / i20 / Baleno)">Compact / Hatchback (Swift / i20 / Baleno)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* 7. Date & 8. Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                          Date Required
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="dark-input w-full pl-10 pr-3 py-2.5"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                          Preferred Time / Shift
                        </label>
                        <div className="relative">
                          <Clock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                          <select
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="dark-input w-full pl-10 pr-3 py-2.5 appearance-none"
                          >
                            <option value="Immediate Dispatch (30-45 mins)">Immediate Dispatch (30–45 mins)</option>
                            <option value="Morning Shift (07:00 AM - 03:00 PM)">Morning Shift (07:00 AM – 03:00 PM)</option>
                            <option value="General Office Hours (09:00 AM - 07:00 PM)">General Office Hours (09:00 AM – 07:00 PM)</option>
                            <option value="Evening / Late Return (05:00 PM - 01:00 AM)">Evening / Late Return (05:00 PM – 01:00 AM)</option>
                            <option value="Outstation Multi-Day Schedule">Outstation Multi-Day Schedule</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* 9. Message */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Specific Requirements or Itinerary (Optional)
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                        <textarea
                          rows={2}
                          placeholder="e.g. Need driver familiar with automatic transmission, BKC parking protocols, or airport terminal 2 pickup."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="dark-input w-full pl-10 pr-3 py-2.5 text-xs"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full h-[54px] text-base font-bold flex items-center justify-center gap-2 mt-4 shadow-xl shadow-[#F2F028]/25"
                    >
                      {isSubmitting ? (
                        <span>Transmitting to Central Dispatch...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#0A0A0A]" />
                          <span>Submit Requirement &amp; Assign Chauffeur</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                      <span>✓ Dispatched to info@ontimedriverservice.com</span>
                      <span>✓ 100% Police Verified Drivers</span>
                    </div>
                  </form>
                </div>
              ) : (
                /* Confirmation Screen */
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#35B5D8]/20 border border-[#35B5D8] text-[#35B5D8] flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mb-2">
                    Chauffeur Requirement Submitted!
                  </h3>

                  <p className="text-sm text-[#D1D5DB] mb-5">
                    Reference ID: <span className="font-mono font-bold text-[#F2F028]">{bookingRef}</span>
                  </p>

                  <div className="bg-[#181818] rounded-xl p-4 border border-white/10 text-left text-xs space-y-2 mb-6 text-neutral-300">
                    <p>• <strong>Central Inbox:</strong> info@ontimedriverservice.com</p>
                    <p>• <strong>Customer:</strong> {formData.name} (+91 {formData.mobile})</p>
                    <p>• <strong>Email Confirmation Sent To:</strong> {formData.email}</p>
                    <p>• <strong>Vehicle &amp; Service:</strong> {formData.serviceType} for {formData.vehicleType}</p>
                    <p>• <strong>Required Time:</strong> {formData.date} ({formData.time})</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleWhatsAppForward}
                      className="flex-1 h-[52px] rounded-xl bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Speed Up via WhatsApp</span>
                    </button>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="h-[52px] px-6 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20"
                    >
                      Submit Another
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
