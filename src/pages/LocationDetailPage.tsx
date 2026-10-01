import React, { useState } from 'react';
import { locationsData } from '../data/locationsData';
import { servicesData } from '../data/servicesData';
import { Link, useRouter, SEO } from '../router';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  MapPin,
  Clock,
  Route,
  ChevronRight,
  ShieldCheck,
  Calendar,
  MessageSquare,
  Phone,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  User,
  Mail,
  Send,
  Car,
} from 'lucide-react';

interface LocationDetailPageProps {
  slug: string;
  onOpenBooking: (serviceTitle?: string, locationName?: string) => void;
}

export const LocationDetailPage: React.FC<LocationDetailPageProps> = ({ slug, onOpenBooking }) => {
  const location = locationsData.find((l) => l.id === slug);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceType: 'Permanent Driver',
    requirementType: 'Full-Time' as 'Hourly' | 'Part-Time' | 'Full-Time' | 'Temporary' | 'Permanent',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!location) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3">Location Not Found</h1>
        <p className="text-neutral-400 mb-6 max-w-md text-sm">
          The requested service location could not be found. Explore our complete coverage across Mumbai and MMR.
        </p>
        <Link href="/service-areas" className="btn-primary">
          <span>View All Service Areas</span>
          <ArrowRight className="w-4 h-4 text-black" />
        </Link>
      </div>
    );
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Driver Nest India, I would like to book a driver in ${location.name}. Please share chauffeur availability and rates.`
    );
    window.open(`https://wa.me/919930012345?text=${text}`, '_blank');
  };

  const pageSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': `Driver Nest India – ${location.name}`,
      'telephone': '+91-9930012345',
      'description': location.shortSnippet,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': location.name,
        'addressRegion': 'Maharashtra',
        'addressCountry': 'IN'
      },
      'areaServed': location.name
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://drivernestindia.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Service Areas',
          'item': 'https://drivernestindia.com/service-areas'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': location.name,
          'item': `https://drivernestindia.com/locations/${location.id}`
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': location.localFaqs.map((f) => ({
        '@type': 'Question',
        'name': f.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': f.answer
        }
      }))
    }
  ];

  return (
    <>
      <SEO
        title={`Driver Service in ${location.name} – Verified Chauffeurs & Drivers | Driver Nest India`}
        description={`Hire verified professional drivers in ${location.name}. Fast ${location.avgDispatchTime} allocation for personal, corporate, monthly, and outstation trips.`}
        canonicalPath={`/locations/${location.id}`}
        image={location.image}
        schema={pageSchema}
      />

      <div className="pt-16 sm:pt-24 pb-12 sm:pb-20 bg-black text-white overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative overflow-hidden pb-8 sm:pb-16 border-b border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 flex items-center gap-2 text-xs text-neutral-400">
              <Link href="/" className="hover:text-[#E5C07B] transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
              <Link href="/service-areas" className="hover:text-[#E5C07B] transition-colors">Service Areas</Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
              <span className="text-[#E5C07B] font-medium truncate">{location.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-1.5 mb-3 text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#E5C07B] bg-[#141414] px-3 py-1 rounded-full border border-[#D4AF37]/35 w-fit font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{location.district}</span>
                </div>

                <h1 className="text-h1 text-white mb-3">
                  Professional Driver Service in {location.name}
                </h1>

                <p className="text-body-lead text-neutral-300 font-light mb-6 max-w-2xl">
                  {location.shortSnippet} Verified, police-screened chauffeurs ready for doorstep deployment across {location.name} within {location.avgDispatchTime}.
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <button
                    onClick={() => onOpenBooking('Personal Driver', location.name)}
                    className="btn-primary"
                  >
                    <Calendar className="w-4 h-4 text-black" />
                    <span>Book Driver in {location.name}</span>
                  </button>

                  <button
                    onClick={handleWhatsApp}
                    className="btn-whatsapp"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Concierge</span>
                  </button>

                  <a
                    href="tel:+919930012345"
                    className="btn-secondary"
                  >
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    <span>Call Helpline</span>
                  </a>
                </div>

                {/* Staging Metrics */}
                <div className="pt-4 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-neutral-300">
                  <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                    <span className="text-neutral-400 block text-[10px] sm:text-[11px] font-mono">Response Time</span>
                    <span className="text-xs sm:text-sm font-bold text-white font-mono">{location.avgDispatchTime}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                    <span className="text-neutral-400 block text-[10px] sm:text-[11px] font-mono">Vetting Level</span>
                    <span className="text-xs sm:text-sm font-bold text-[#E5C07B]">100% Police Verified</span>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 col-span-2 sm:col-span-1">
                    <span className="text-neutral-400 block text-[10px] sm:text-[11px] font-mono">Standby Support</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-400">24/7 Replacement</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/35 shadow-2xl relative aspect-video">
                  <ImageWithFallback
                    src={location.image}
                    alt={`Driver service in ${location.name}`}
                    fallbackTitle={location.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] sm:text-xs font-semibold text-[#E5C07B] uppercase tracking-wider block font-mono">
                      Active Coverage Hub
                    </span>
                    <h3 className="text-base sm:text-xl font-bold text-white font-display">{location.name} Operations Desk</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Hyper-Local Narrative */}
        <section className="py-8 sm:py-16 border-b border-neutral-900 bg-[#060606]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
              <div className="lg:col-span-7">
                <div className="text-[11px] font-semibold uppercase text-[#D4AF37] tracking-wider mb-2 font-mono">
                  Localized Chauffeur Coverage
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 font-display">
                  {location.seoHeadline}
                </h2>
                <div className="space-y-3.5 text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-line font-light">
                  {location.fullContent}
                </div>
              </div>

              {/* Local Hubs & Routes Sidebar */}
              <div className="lg:col-span-5 space-y-4 sm:space-y-6">
                <div className="p-4 sm:p-6 rounded-2xl glass-card border border-[#D4AF37]/25">
                  <h3 className="text-xs sm:text-sm font-semibold text-[#D4AF37] uppercase tracking-wider mb-3 font-mono flex items-center gap-2">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>Popular Neighborhoods &amp; Staging Zones</span>
                  </h3>
                  <ul className="space-y-1.5">
                    {location.popularHubs.map((hub, hIdx) => (
                      <li key={hIdx} className="text-xs sm:text-sm text-neutral-200 flex items-center gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span>{hub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 sm:p-6 rounded-2xl glass-card border border-neutral-800">
                  <h3 className="text-xs sm:text-sm font-semibold text-[#D4AF37] uppercase tracking-wider mb-3 font-mono flex items-center gap-2">
                    <Route className="w-4 h-4 shrink-0" />
                    <span>Primary Arterial Routes Managed</span>
                  </h3>
                  <ul className="space-y-1.5">
                    {location.keyRoutes.map((route, rIdx) => (
                      <li key={rIdx} className="text-xs sm:text-sm text-neutral-300 flex items-center gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                        <span>{route}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Available in this Location */}
        <section className="py-8 sm:py-16 border-b border-neutral-900 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
                Driver Categories
              </div>
              <h2 className="text-h2 text-white">Services Available in {location.name}</h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-light">
                Explore specialized chauffeur options tailored for residential and corporate mobility in {location.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {servicesData.slice(0, 6).map((svc) => (
                <div
                  key={svc.id}
                  className="glass-card glass-card-hover rounded-xl p-4 sm:p-5 border border-neutral-800 hover:border-[#D4AF37]/35 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-[#E5C07B] uppercase tracking-wider block mb-1">{svc.badge}</span>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 font-display">{svc.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light mb-3">{svc.shortDescription}</p>
                  </div>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="text-xs text-[#E5C07B] hover:text-white font-medium flex items-center gap-1 mt-auto pt-2 border-t border-neutral-800/80"
                  >
                    <span>View {svc.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-6 sm:mt-8">
              <Link href="/services" className="btn-secondary">
                <span>Browse All 12 Driver Services</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </Link>
            </div>
          </div>
        </section>

        {/* Localized FAQs */}
        <section className="py-8 sm:py-16 border-b border-neutral-900 bg-[#070707]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
                Regional Questions
              </div>
              <h2 className="text-h2 text-white">FAQs for {location.name}</h2>
            </div>

            <div className="space-y-3">
              {location.localFaqs.map((faq, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div
                    key={fIdx}
                    className="glass-card rounded-xl border border-neutral-800 hover:border-[#D4AF37]/35 transition-colors overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                      className="w-full p-3.5 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-2.5">
                        <HelpCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span className="text-xs sm:text-sm md:text-base font-semibold text-white">{faq.question}</span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 border border-neutral-800">
                        {isOpen ? (
                          <ChevronUp className="w-3.5 h-3.5 text-[#D4AF37]" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/50 font-light">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Location Lead Form */}
        <section className="py-8 sm:py-16 bg-[#050505]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card rounded-2xl p-4 sm:p-8 lg:p-10 border border-[#D4AF37]/35 shadow-2xl relative">
              <div className="border-b border-neutral-800 pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-display">Need a Driver in {location.name}?</h2>
                  <p className="text-[11px] sm:text-xs text-[#E5C07B] mt-0.5 font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Instant Doorstep Allocation in {location.avgDispatchTime}</span>
                  </p>
                </div>
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                </div>
              </div>

              {submitted ? (
                <div className="py-6 text-center space-y-3 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">Thank You, {formData.fullName}!</h3>
                    <p className="text-xs text-[#E5C07B] font-mono mt-1">Inquiry for {location.name} Logged</p>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md mx-auto font-light">
                    Our local {location.name} coordinator will contact you shortly with verified driver profiles.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#E5C07B] hover:underline cursor-pointer pt-2 font-medium"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3">
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
                      placeholder="e.g. Vikramaditya Singhania"
                      className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 sm:px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500"
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
                        className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 sm:px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Email Address *</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. v.singhania@corp.com"
                        className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 sm:px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                        <Car className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Service Required *</span>
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
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

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Requirement Type *</span>
                      </label>
                      <select
                        value={formData.requirementType}
                        onChange={(e) => setFormData({ ...formData, requirementType: e.target.value as any })}
                        className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
                      >
                        <option value="Hourly">Hourly</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Permanent">Permanent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Message / Vehicle Model &amp; Timings
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={`Provide details regarding your vehicle model and scheduled timings in ${location.name}...`}
                      className="w-full bg-neutral-900/90 border border-neutral-700/80 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500 resize-none font-light"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary h-12 text-xs sm:text-sm mt-1"
                  >
                    {isSubmitting ? (
                      <span>Assigning Chauffeur in {location.name}...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-black" />
                        <span>Request a Call Back</span>
                      </>
                    )}
                  </button>

                  <div className="pt-1 text-center">
                    <p className="text-[10px] sm:text-xs text-neutral-400 font-light">
                      ✓ Instant allocation in {location.name} ({location.avgDispatchTime}) · 100% Police Verified
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
