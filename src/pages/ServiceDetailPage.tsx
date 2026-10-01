import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
import { ServiceItem } from '../types';
import { Link, useRouter, SEO } from '../router';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  ShieldCheck,
  Calendar,
  MessageSquare,
  Phone,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  MapPin,
  Car,
  User,
  Mail,
  Send,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  Sparkles,
  Award,
  Users,
  Briefcase,
  Home,
  Check,
  Route,
} from 'lucide-react';

interface ServiceDetailPageProps {
  slug: string;
  onOpenBooking: (serviceTitle?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, onOpenBooking }) => {
  const { navigate } = useRouter();
  const service = servicesData.find((s) => s.slug === slug);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: 'Mumbai (All Zones & BKC)',
    requirementType: 'Full-Time' as 'Hourly' | 'Part-Time' | 'Full-Time' | 'Temporary' | 'Permanent',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3">Service Not Found</h1>
        <p className="text-neutral-400 mb-6 max-w-md text-sm">
          The requested driver service could not be located. Explore our full range of professional driver solutions.
        </p>
        <Link href="/services" className="btn-primary">
          <span>View All Services</span>
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

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Driver Nest India, I would like to inquire about ${service.title} in Mumbai. Please share availability and consultation details.`
    );
    window.open(`https://wa.me/919930012345?text=${text}`, '_blank');
  };

  // Structured Data Schemas
  const pageSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': service.title,
      'serviceType': service.title,
      'description': service.shortDescription,
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'Driver Nest India',
        'telephone': '+91-9930012345',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Bandra Kurla Complex (BKC)',
          'addressLocality': 'Mumbai',
          'addressRegion': 'Maharashtra',
          'postalCode': '400051',
          'addressCountry': 'IN'
        }
      },
      'areaServed': {
        '@type': 'AdministrativeArea',
        'name': 'Mumbai Metropolitan Region'
      }
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
          'name': 'Services',
          'item': 'https://drivernestindia.com/services'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': service.title,
          'item': `https://drivernestindia.com/services/${service.slug}`
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': service.faqs.map((f) => ({
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
        title={service.metaTitle}
        description={service.metaDescription}
        canonicalPath={`/services/${service.slug}`}
        image={service.image}
        schema={pageSchema}
      />

      <div className="pt-16 sm:pt-24 pb-12 sm:pb-20 bg-black text-white overflow-x-hidden">
        {/* SECTION 1: Premium Hero */}
        <section className="relative overflow-hidden pb-8 sm:pb-16 border-b border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 flex items-center gap-2 text-xs text-neutral-400">
              <Link href="/" className="hover:text-[#E5C07B] transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
              <Link href="/services" className="hover:text-[#E5C07B] transition-colors">Services</Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
              <span className="text-[#E5C07B] font-medium truncate">{service.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              {/* Left Column: Hero Text */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="inline-flex items-center gap-2 mb-3 text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#E5C07B] bg-[#141414] px-3 py-1 rounded-full border border-[#D4AF37]/35 w-fit flex-wrap">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{service.badge}</span>
                </div>

                <h1 className="text-h1 text-white mb-3">
                  {service.h1Title}
                </h1>

                <p className="text-body-lead text-neutral-300 font-light mb-6 max-w-2xl">
                  {service.fullDescription}
                </p>

                {/* Hero CTAs: 48-52px height, 12px gap */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <button
                    onClick={() => onOpenBooking(service.title)}
                    className="btn-primary"
                  >
                    <Calendar className="w-4 h-4 text-black" />
                    <span>Book a Driver</span>
                  </button>

                  <button
                    onClick={handleWhatsAppDirect}
                    className="btn-whatsapp"
                  >
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    <span>WhatsApp Consultation</span>
                  </button>

                  <a
                    href="tel:+919930012345"
                    className="btn-secondary"
                  >
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    <span>Call Concierge</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-neutral-800/80 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-neutral-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>100% Police Verified</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Free Leave Replacement</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Zero Brokerage Fees</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual - 16:9 Aspect Ratio */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/35 shadow-2xl relative aspect-video">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.sceneDescription}
                    fallbackTitle={service.title}
                    vehicleTag={service.vehicleTag}
                    locationTag={service.locationTag}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <div className="p-2 sm:p-2.5 rounded-lg bg-black/85 backdrop-blur-md border border-[#D4AF37]/30 text-[10px] sm:text-xs text-neutral-200 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0" />
                      <span className="truncate">{service.sceneDescription}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Service Overview (32px Mobile Rhythm) */}
        <section className="py-8 sm:py-16 border-b border-neutral-900 bg-[#060606]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
                Comprehensive Briefing
              </div>
              <h2 className="text-h2 text-white">Service Overview</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="glass-card rounded-2xl p-4 sm:p-6 lg:p-8 border border-[#D4AF37]/25 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-3 text-[#D4AF37]">
                    <Car className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-display">What The Service Is</h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                    {service.serviceOverview.whatIs}
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-4 sm:p-6 lg:p-8 border border-[#D4AF37]/25 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-3 text-[#D4AF37]">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-display">Who It Is Suitable For</h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                    {service.serviceOverview.whoSuitable}
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-4 sm:p-6 lg:p-8 border border-[#D4AF37]/25 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-3 text-[#D4AF37]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-display">How Driver Nest India Helps</h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                    {service.serviceOverview.howDniHelps}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Who Is This Service For? (Icon Cards) */}
        <section className="py-8 sm:py-16 border-b border-neutral-900 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
                Target Beneficiaries
              </div>
              <h2 className="text-h2 text-white">Who Is This Service For?</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
              {service.whoIsThisFor.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card glass-card-hover rounded-xl p-4 sm:p-6 border border-[#D4AF37]/20 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-3 text-[#D4AF37]">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 font-display">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: Common Use Cases */}
        <section className="py-8 sm:py-16 border-b border-neutral-900 bg-[#070707]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
                Practical Transit Applications
              </div>
              <h2 className="text-h2 text-white">Common Driving Use Cases</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {service.useCases.map((useCase, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-4 sm:p-6 border border-[#D4AF37]/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#E5C07B] mb-2">
                      <Route className="w-4 h-4 text-[#D4AF37]" />
                      <span>Route Scenario 0{idx + 1}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-display">{useCase.title}</h3>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-3 font-light">
                      {useCase.description}
                    </p>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-lg bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-400">
                    <span className="text-[#E5C07B] font-semibold">Typical Corridor:</span> {useCase.route}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: Why Choose Driver Nest India? */}
        <section className="py-8 sm:py-16 border-b border-neutral-900 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
                The Gold Standard
              </div>
              <h2 className="text-h2 text-white">Why Choose Driver Nest India?</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                { title: '100% Verified Professionals', desc: 'Mandatory police verification, Aadhaar biometric validation, and past employer checks.' },
                { title: 'Experienced Drivers', desc: 'Minimum 5+ years of verified driving experience across Mumbai flyovers and highways.' },
                { title: 'Flexible Requirements', desc: 'Choose between hourly, half-day, monthly, or temporary engagements with zero lock-in.' },
                { title: 'Courteous Conduct', desc: 'Uniformed, non-intrusive, smoke-free chauffeurs trained in professional etiquette.' },
                { title: 'Mumbai-Wide Availability', desc: 'Staging hubs across South Mumbai, Western Suburbs, Thane, and Navi Mumbai.' },
                { title: 'Dedicated Support & Standby', desc: '24/7 concierge desk with free standby replacement guarantees during driver leaves.' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 sm:p-6 rounded-xl bg-[#0D0D0D] border border-neutral-800 hover:border-[#D4AF37]/40 transition-colors">
                  <div className="flex items-center gap-2.5 mb-2">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] shrink-0" />
                    <h3 className="text-sm sm:text-base font-bold text-white font-display">{item.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light pl-6 sm:pl-7">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: How It Works */}
        <section className="py-8 sm:py-16 border-b border-neutral-900 bg-[#060606]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
                Seamless Deployment
              </div>
              <h2 className="text-h2 text-white">How It Works</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {[
                { step: '01', title: 'Share Requirement', desc: 'Submit your timing, vehicle model, and pickup location.' },
                { step: '02', title: 'Consultation', desc: 'Our concierge contacts you to confirm driver preferences.' },
                { step: '03', title: 'Driver Matching', desc: 'We pair you with a pre-screened driver near your locality.' },
                { step: '04', title: 'Verification', desc: 'Review the official police clearance and driver dossier.' },
                { step: '05', title: 'Deployment', desc: 'Chauffeur reports punctually to your doorstep for duty.' },
                { step: '06', title: 'Ongoing Support', desc: '24/7 coordinator assistance and leave replacements.' }
              ].map((step, idx) => (
                <div key={idx} className="p-3.5 sm:p-5 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
                  <div>
                    <span className="text-lg sm:text-xl font-bold font-mono text-[#D4AF37] block mb-1">{step.step}</span>
                    <h3 className="text-xs sm:text-sm font-bold text-white mb-1">{step.title}</h3>
                    <p className="text-[11px] sm:text-xs text-neutral-400 leading-tight font-light">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Relevant Visual Showcase */}
        <section className="py-8 sm:py-16 border-b border-neutral-900 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card rounded-2xl overflow-hidden border border-[#D4AF37]/35 relative shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-6 p-4 sm:p-8 lg:p-10">
                  <div className="text-[10px] sm:text-xs font-semibold uppercase text-[#E5C07B] tracking-wider mb-2 font-mono">
                    Authentic Service Experience
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 font-display">
                    Tailored for Your {service.vehicleTag}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4 font-light">
                    Every chauffeur assigned for this service possesses verified experience handling Indian urban conditions,
                    smooth braking, electronic systems, and vehicle care standards.
                  </p>
                  <div className="space-y-1.5 mb-6 text-xs text-neutral-300">
                    {service.keyFeatures.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => onOpenBooking(service.title)}
                    className="btn-primary"
                  >
                    <span>Request Chauffeur for This Service</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                </div>
                <div className="lg:col-span-6 aspect-video sm:h-80 lg:h-full relative overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.sceneDescription}
                    fallbackTitle={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden lg:block" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Areas We Serve (Links to location pages) */}
        <section className="py-8 sm:py-16 border-b border-neutral-900 bg-[#060606]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
                Coverage Footprint
              </div>
              <h2 className="text-h2 text-white">Areas We Serve Across Mumbai</h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-light">
                Our {service.title} is available with fast 30-45 minute dispatch across all major Mumbai hubs.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {service.servedLocations.map((loc, idx) => (
                <Link
                  key={idx}
                  href={`/locations/${loc.slug}`}
                  className="p-3 sm:p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-[#D4AF37]/50 hover:bg-[#141414] transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#E5C07B] transition-colors truncate">{loc.name}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              ))}
            </div>

            <div className="text-center mt-6">
              <Link href="/service-areas" className="text-xs text-[#E5C07B] hover:underline font-medium">
                View all 11 Mumbai Metropolitan Service Areas →
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 9: Service-Specific FAQs */}
        <section className="py-8 sm:py-16 border-b border-neutral-900 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
                Clarity &amp; Assurance
              </div>
              <h2 className="text-h2 text-white">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {service.faqs.map((faq, fIdx) => {
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

        {/* SECTION 10: Lead Form (Section 10 Requirement) */}
        <section id="book-service" className="py-8 sm:py-16 bg-[#050505]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card rounded-2xl p-4 sm:p-8 lg:p-10 border border-[#D4AF37]/35 shadow-2xl relative">
              <div className="border-b border-neutral-800 pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-display">Need a Driver?</h2>
                  <p className="text-[11px] sm:text-xs text-[#E5C07B] mt-1 font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Booking: {service.title} · Rapid Dispatch in 30-45 Mins</span>
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
                    <p className="text-xs text-[#E5C07B] font-mono mt-1">Inquiry for {service.title} Logged</p>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md mx-auto font-light">
                    Our operations team will call you back shortly to coordinate driver allocation and share official police verification credentials.
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
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Location *</span>
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full h-12 bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
                      >
                        <option value="Mumbai (All Zones & BKC)">Mumbai (All Zones &amp; BKC)</option>
                        <option value="South Mumbai (Colaba, Malabar Hill, Marine Drive)">South Mumbai</option>
                        <option value="Bandra & BKC (Bandra Kurla Complex)">Bandra &amp; BKC</option>
                        <option value="Western Suburbs (Andheri, Juhu, Borivali)">Western Suburbs</option>
                        <option value="Central Mumbai (Dadar, Worli, Lower Parel)">Central Mumbai</option>
                        <option value="Powai & Hiranandani">Powai &amp; Hiranandani</option>
                        <option value="Thane (Majiwada, Ghodbunder)">Thane</option>
                        <option value="Navi Mumbai (Vashi, Nerul, Belapur)">Navi Mumbai</option>
                        <option value="Mira Road & Bhayandar">Mira Road &amp; Bhayandar</option>
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
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={`Provide details regarding your vehicle model (${service.vehicleTag}) and scheduled timings...`}
                      className="w-full bg-neutral-900/90 border border-neutral-700/80 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-neutral-500 resize-none font-light"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary h-12 text-xs sm:text-sm mt-1"
                  >
                    {isSubmitting ? (
                      <span>Submitting Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-black" />
                        <span>Request a Call Back</span>
                      </>
                    )}
                  </button>

                  <div className="pt-1 text-center">
                    <p className="text-[10px] sm:text-xs text-neutral-400 font-light">
                      ✓ Zero recruitment fees · 100% Police Verified Roster · Instant 30-45 Min Deployment
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Contextual Internal Links Section */}
        <section className="py-8 sm:py-12 bg-black border-t border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xs sm:text-sm font-semibold text-[#D4AF37] uppercase tracking-wider mb-3 font-mono">
              Related Chauffeur Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {service.relatedServices.map((rel, rIdx) => (
                <Link
                  key={rIdx}
                  href={`/services/${rel.slug}`}
                  className="p-3.5 sm:p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-[#D4AF37]/40 transition-colors flex items-center justify-between group"
                >
                  <span className="text-xs sm:text-sm font-medium text-neutral-200 group-hover:text-white truncate pr-2">{rel.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
