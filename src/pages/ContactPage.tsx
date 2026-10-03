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
  Calendar,
  FileText,
  Headphones,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { LeadFormData } from '../types';
import { submitLead, validateLeadForm } from '../services/leadService';
import { ImageWithFallback } from '../components/ImageWithFallback';

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
      const res = await submitLead(formData, 'Contact Form');
      if (res.success && res.record) {
        setBookingRef(res.record.id);
        setSubmitted(true);
      }
    } catch (err) {
      setErrors({ form: 'Transmission error. Please call our 24/7 concierge at 8652880057 directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppForward = () => {
    const text = encodeURIComponent(
      `Hello On Time Driver Service, I submitted contact inquiry #${bookingRef || 'NEW'}:\n\n` +
        `• Name: ${formData.name}\n` +
        `• Mobile: ${formData.mobile}\n` +
        `• Email: ${formData.email}\n` +
        `• Location: ${formData.location}\n` +
        `• Service: ${formData.serviceType}\n` +
        `• Vehicle: ${formData.vehicleType}\n` +
        `• Date: ${formData.date} at ${formData.time}\n` +
        `• Message: ${formData.message || 'Driver requirement'}\n\n` +
        `Please respond with chauffeur availability.`
    );
    window.open(`https://wa.me/918652880057?text=${text}`, '_blank');
  };

  return (
    <>
      <SEO
        title="Contact Us – On Time Driver Service | 24/7 Mumbai Chauffeur Concierge"
        description="Contact On Time Driver Service in Mumbai. Call +91 8652880057 or email info@ontimedriverservice.com for verified driver bookings across Mumbai, Navi Mumbai, Thane, Mira Road, Vasai, Virar & Palghar."
        canonicalPath="/contact"
      />

      <div className="pt-24 sm:pt-28 pb-20 bg-[#050505] text-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-neutral-400">
            <Link href="/" className="hover:text-[#35B6DE] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-white font-semibold">Contact Us</span>
          </nav>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0B0B] border border-[#35B6DE]/40 shadow-md mb-3.5">
              <Headphones className="w-3.5 h-3.5 text-[#F3ED1A]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
                24/7 Chauffeur Operations Desk
              </span>
            </div>
            <h1 className="text-h1 font-extrabold text-white mb-4">
              Contact On Time Driver Service
            </h1>
            <p className="text-subheading text-[#CFCFCF] leading-relaxed">
              Need a verified driver within 30 minutes? Or planning monthly chauffeur placement for your family or corporate fleet? Reach our concierge team directly.
            </p>
          </div>

          {/* Contact Showcase Visual Card */}
          <div className="bg-[#0B0B0B] rounded-2xl p-6 sm:p-8 border border-white/15 shadow-2xl mb-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Driver standing beside vehicle visual */}
              <div className="lg:col-span-6 relative">
                <div className="rounded-xl overflow-hidden border border-white/15 shadow-xl aspect-[16/10] bg-[#181818] relative">
                  <ImageWithFallback
                    src="/images/services/corporate-driver.jpg"
                    alt="Professional Indian driver standing beside corporate sedan vehicle in Mumbai"
                    fallbackTitle="Chauffeur Beside Vehicle"
                    vehicleTag="Toyota Innova & Sedans"
                    locationTag="Mumbai BKC Support Pod"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="glass-badge px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                      <span>Dedicated Chauffeurs On Call 24/7 Across Mumbai</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Support Visual Channels */}
              <div className="lg:col-span-6 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#35B6DE] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F3ED1A]" />
                  <span>Immediate Communication Channels</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Speak Directly with Our Mumbai Concierge Desk
                </h2>
                <p className="text-sm text-[#CFCFCF] leading-relaxed font-normal">
                  Our operations team manages active driver allocations around the clock. Whether for urgent early morning airport transfers or monthly chauffeur interviews, we respond within 15 minutes.
                </p>

                {/* Call & WhatsApp Visual Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <a
                    href="tel:+918652880057"
                    className="bg-[#181818] rounded-xl p-4 border border-white/10 hover:border-[#35B6DE] transition-all group flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#35B6DE]/15 border border-[#35B6DE]/30 text-[#35B6DE] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase text-neutral-400">Call Support</div>
                      <div className="text-sm font-bold text-white group-hover:text-[#35B6DE]">+91 8652880057</div>
                      <div className="text-[11px] text-[#22C55E]">24/7 Emergency Line</div>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/918652880057?text=Hi,%20I%20need%20a%20professional%20driver%20service."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#181818] rounded-xl p-4 border border-white/10 hover:border-[#25D366] transition-all group flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase text-neutral-400">WhatsApp Desk</div>
                      <div className="text-sm font-bold text-white group-hover:text-[#25D366]">Chat Online</div>
                      <div className="text-[11px] text-[#22C55E]">Avg Reply: &lt; 5 mins</div>
                    </div>
                  </a>
                </div>

                <div className="flex items-center gap-2 pt-1 text-xs text-neutral-400">
                  <Mail className="w-4 h-4 text-[#35B6DE]" />
                  <span>Official Inquiries:</span>
                  <a href="mailto:info@ontimedriverservice.com" className="text-white hover:text-[#35B6DE] font-semibold underline">
                    info@ontimedriverservice.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form & Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left 7 Columns: Complete 9-Field Dark Luxury Contact Form */}
            <div className="lg:col-span-7 bg-[#0B0B0B] rounded-2xl border border-white/15 p-6 sm:p-8 shadow-2xl">
              {!submitted ? (
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2">
                    Send Driver Requirement
                  </h3>
                  <p className="text-xs sm:text-sm text-[#CFCFCF] mb-6">
                    Fill the 9 fields below to dispatch your booking directly to <span className="text-[#35B6DE]">info@ontimedriverservice.com</span>.
                  </p>

                  {errors.form && (
                    <div className="p-3 mb-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errors.form}</span>
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
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                          Full Name <span className="text-[#F3ED1A]">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Vikram Singhania"
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
                          Mobile Number <span className="text-[#F3ED1A]">*</span>
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
                          Email Address <span className="text-[#F3ED1A]">*</span>
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
                          Location / MMR Sector <span className="text-[#F3ED1A]">*</span>
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
                            <option value="Permanent Driver">Permanent / Monthly Driver</option>
                            <option value="Hourly Driver">Hourly Driver Service</option>
                            <option value="Airport Driver">Airport Pickup &amp; Drop Transfer</option>
                            <option value="Outstation Driver">Outstation Driver</option>
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
                            <option value="Luxury Fleet (Mercedes / BMW / Audi)">Luxury Fleet (Mercedes / BMW / Audi)</option>
                            <option value="Compact (Swift / i20 / Baleno)">Compact (Swift / i20 / Baleno)</option>
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
                            <option value="Office Hours (09:00 AM - 07:00 PM)">Office Hours (09:00 AM – 07:00 PM)</option>
                            <option value="Evening Return (05:00 PM - 01:00 AM)">Evening Return (05:00 PM – 01:00 AM)</option>
                            <option value="Outstation Multi-Day">Outstation Multi-Day</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* 9. Message */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Specific Details (Optional)
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                        <textarea
                          rows={3}
                          placeholder="Your exact pickup street or landmarks, transmission (auto/manual), or special instructions..."
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
                      className="btn-primary w-full h-[54px] text-base font-bold flex items-center justify-center gap-2 mt-4 shadow-xl shadow-[#F3ED1A]/25"
                    >
                      {isSubmitting ? (
                        <span>Transmitting to Central Concierge...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#050505]" />
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
                  <div className="w-16 h-16 rounded-full bg-[#35B6DE]/20 border border-[#35B6DE] text-[#35B6DE] flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mb-2">
                    Inquiry Received!
                  </h3>

                  <p className="text-sm text-[#CFCFCF] mb-5">
                    Reference: <span className="font-mono font-bold text-[#F3ED1A]">{bookingRef}</span>
                  </p>

                  <div className="bg-[#181818] rounded-xl p-4 border border-white/10 text-left text-xs space-y-2 mb-6 text-neutral-300">
                    <p>• <strong>Inbox:</strong> info@ontimedriverservice.com</p>
                    <p>• <strong>Name:</strong> {formData.name}</p>
                    <p>• <strong>Mobile:</strong> +91 {formData.mobile}</p>
                    <p>• <strong>Email Confirmation Sent To:</strong> {formData.email}</p>
                    <p>• <strong>Service &amp; Vehicle:</strong> {formData.serviceType} ({formData.vehicleType})</p>
                    <p>• <strong>Timing:</strong> {formData.date} at {formData.time}</p>
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

            {/* Right 5 Columns: Operations Hub Info & FAQ Accordion */}
            <div className="lg:col-span-5 space-y-6">
              {/* Operations Pods Card */}
              <div className="bg-[#0B0B0B] rounded-2xl border border-white/15 p-6 shadow-xl space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#35B6DE]" />
                  <span>Central Dispatch Locations</span>
                </h4>
                <div className="space-y-3 text-xs text-[#CFCFCF]">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <strong className="text-white block mb-0.5">BKC &amp; South Mumbai Hub:</strong>
                    <span>Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <strong className="text-white block mb-0.5">Thane &amp; Navi Mumbai Pod:</strong>
                    <span>Majiwada Junction &amp; Vashi Sector 17, MMR</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <strong className="text-white block mb-0.5">Western Suburbs Hub:</strong>
                    <span>Andheri West &amp; Mira-Bhayandar Staging Pods</span>
                  </div>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="bg-[#0B0B0B] rounded-2xl border border-white/15 p-6 shadow-xl space-y-3">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#F3ED1A]" />
                  <span>Operations Hours</span>
                </h4>
                <div className="text-xs text-[#CFCFCF] space-y-2">
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span>Driver Dispatch Operations:</span>
                    <strong className="text-[#22C55E]">24 Hours / 365 Days</strong>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span>Support Desk:</span>
                    <strong className="text-white">24/7 Live Concierge</strong>
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
