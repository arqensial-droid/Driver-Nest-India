import React, { useState } from 'react';
import {
  Phone,
  Calendar,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Send,
  User,
  AlertCircle,
  MapPin,
} from 'lucide-react';
import { submitLead, validateLeadForm, getWhatsAppSuccessUrl, getWhatsAppFallbackUrl, PRIMARY_PHONE } from '../services/leadService';
import { BrandLogo } from './BrandLogo';

interface FinalCTASectionProps {
  onOpenBooking: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenBooking }) => {
  const [ctaName, setCtaName] = useState('');
  const [ctaMobile, setCtaMobile] = useState('');
  const [ctaLocation, setCtaLocation] = useState('Mumbai');
  const [ctaService, setCtaService] = useState('Personal Driver');
  const [ctaSubmitting, setCtaSubmitting] = useState(false);
  const [ctaSubmitted, setCtaSubmitted] = useState(false);
  const [ctaRef, setCtaRef] = useState('');
  const [ctaError, setCtaError] = useState('');

  const handleCtaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: ctaName,
      mobile: ctaMobile,
      location: ctaLocation,
      serviceType: ctaService,
      email: '',
      formName: 'CTA Section Form',
    };

    const validation = validateLeadForm(data);
    if (!validation.isValid) {
      setCtaError(validation.errors.name || validation.errors.mobile || 'Please enter valid details.');
      return;
    }

    setCtaError('');
    setCtaSubmitting(true);

    try {
      console.log('[CONSOLE LOG] [CTA FORM SUBMISSION]', data);
      const res = await submitLead(data, 'CTA Section Form');
      if (res.success && res.record) {
        setCtaRef(res.record.id);
        setCtaSubmitted(true);
      } else {
        setCtaError(res.error || 'Failed to submit. Please call 8652880057 or message on WhatsApp.');
      }
    } catch (err: any) {
      console.error('[CONSOLE LOG] [CTA FORM ERROR]', err);
      setCtaError('Failed to submit. Please call 8652880057 or message on WhatsApp.');
    } finally {
      setCtaSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Hi, I need a professional driver service in Mumbai.');
    window.open(`https://wa.me/918652880057?text=${text}`, '_blank');
  };

  return (
    <section className="relative py-20 lg:py-24 overflow-hidden bg-[#EEF8FC] text-[#111827] border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 sm:p-12 lg:p-16 shadow-lg relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto text-center">
            {/* Official Brand Logo */}
            <div className="flex justify-center mb-5">
              <BrandLogo size="lg" />
            </div>

            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF8FC] border border-[#35B6DE]/30 text-[#35B6DE] text-xs font-bold uppercase tracking-wider mb-5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#35B6DE]" />
              <span>Instant Driver Allocation</span>
            </div>

            {/* Headline */}
            <h2 className="text-h2 font-extrabold text-[#111827] tracking-tight mb-4">
              Ready to Hire a Verified Driver in Mumbai?
            </h2>

            {/* Subheadline */}
            <p className="text-subheading text-[#4B5563] leading-relaxed mb-8 max-w-2xl mx-auto font-normal text-base sm:text-lg">
              Get an experienced chauffeur matched to your car model, schedule, and route. Safe, punctual, and police-verified.
            </p>

            {/* CTA Quick Form */}
            {!ctaSubmitted ? (
              <div className="bg-[#EEF8FC] p-6 rounded-2xl border border-[#E5E7EB] mb-8 text-left max-w-2xl mx-auto shadow-xs">
                {ctaError && (
                  <div className="p-3 mb-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{ctaError}</span>
                  </div>
                )}

                <form onSubmit={handleCtaSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <User className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={ctaName}
                        onChange={(e) => setCtaName(e.target.value)}
                        className="form-input pl-10 pr-3 py-2.5 text-xs"
                      />
                    </div>

                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit Mobile"
                        value={ctaMobile}
                        onChange={(e) => setCtaMobile(e.target.value)}
                        className="form-input pl-10 pr-3 py-2.5 text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="Pickup Location in Mumbai"
                        value={ctaLocation}
                        onChange={(e) => setCtaLocation(e.target.value)}
                        className="form-input pl-10 pr-3 py-2.5 text-xs"
                      />
                    </div>

                    <select
                      value={ctaService}
                      onChange={(e) => setCtaService(e.target.value)}
                      className="form-input px-3 py-2.5 text-xs font-medium bg-white"
                    >
                      <option value="Personal Driver">Personal Driver</option>
                      <option value="Corporate Driver">Corporate Driver</option>
                      <option value="Permanent Driver">Permanent Driver</option>
                      <option value="Hourly Driver">Hourly Driver</option>
                      <option value="Airport Driver">Airport Driver</option>
                      <option value="Outstation Driver">Outstation Driver</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={ctaSubmitting}
                    className="w-full h-11 bg-[#F3ED1A] hover:bg-[#eae415] text-[#111827] font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    {ctaSubmitting ? (
                      <span>Connecting to Desk...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-[#111827]" />
                        <span>Request Driver</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-[#EEF8FC] border border-[#E5E7EB] mb-8 text-center max-w-md mx-auto">
                <CheckCircle2 className="w-10 h-10 text-[#22C55E] mx-auto mb-2" />
                <h4 className="text-base font-bold text-[#111827] mb-1">Request Received</h4>
                <p className="text-xs font-semibold text-[#22C55E] mb-2">
                  Thank you for your enquiry. Our team will contact you shortly.
                </p>
                <p className="text-[11px] text-[#4B5563] mb-4">
                  Reference: <strong>{ctaRef}</strong> &middot; Target: info@ontimedriverservice.com
                </p>
                <a
                  href={`https://wa.me/918652880057?text=Hello%2C%20I%20just%20submitted%20booking%20${ctaRef}%20for%20${encodeURIComponent(ctaService)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full h-10 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Priority Allocation</span>
                </a>
              </div>
            )}

            {/* Direct Contact Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
              <a
                href="tel:8652880057"
                className="btn-secondary w-full sm:w-auto h-12 px-7 text-sm font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#35B6DE]" />
                <span>Call Concierge: 8652880057</span>
              </a>

              <button
                onClick={handleWhatsApp}
                className="btn-whatsapp w-full sm:w-auto h-12 px-7 text-sm font-bold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: 8652880057</span>
              </button>
            </div>

            {/* Guarantees Row */}
            <div className="pt-6 border-t border-[#E5E7EB] flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-semibold text-[#4B5563]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                100% Police Verified
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                Replacement Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                Zero Cancellation Fee
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
