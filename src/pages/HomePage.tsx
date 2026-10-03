import React from 'react';
import { Hero } from '../components/Hero';
import { TrustSection } from '../components/TrustSection';
import { ServicesSection } from '../components/ServicesSection';
import { WhyMumbaiTrustsSection } from '../components/WhyMumbaiTrustsSection';
import { CustomerExperienceBanner } from '../components/CustomerExperienceBanner';
import { LocationsSection } from '../components/LocationsSection';
import { MumbaiUseCasesSection } from '../components/MumbaiUseCasesSection';
import { SocialProofSection } from '../components/SocialProofSection';
import { FaqSection } from '../components/FaqSection';
import { LeadFormSection } from '../components/LeadFormSection';
import { SEO } from '../router';

interface HomePageProps {
  onOpenBooking: (serviceTitle?: string, locationName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  const homeSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'On Time Driver Service',
      'image': 'https://ontimedriverservice.com/images/services/chauffeur-service.jpg',
      '@id': 'https://ontimedriverservice.com',
      'url': 'https://ontimedriverservice.com',
      'telephone': '+91 8652880057',
      'priceRange': '₹₹',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Bandra Kurla Complex (BKC)',
        'addressLocality': 'Mumbai',
        'addressRegion': 'Maharashtra',
        'postalCode': '400051',
        'addressCountry': 'IN',
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 19.0664,
        'longitude': 72.8687,
      },
      'areaServed': [
        'Mumbai',
        'Navi Mumbai',
        'Thane',
        'Mira Road',
        'Bhayandar',
        'Vasai',
        'Virar',
        'Palghar',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'On Time Driver Service',
      'url': 'https://ontimedriverservice.com',
      'logo': 'https://ontimedriverservice.com/images/services/chauffeur-service.jpg',
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+91 8652880057',
        'contactType': 'customer service',
        'areaServed': 'IN-MH',
        'availableLanguage': ['English', 'Hindi', 'Marathi'],
      },
    },
  ];

  return (
    <>
      <SEO
        title="On Time Driver Service – Professional Driver & Chauffeur Services in Mumbai"
        description="Hire verified, on-time professional drivers in Mumbai, Navi Mumbai, Thane, Mira Road, Bhayandar, Vasai, Virar & Palghar. Personal, corporate, airport transfers & outstation. Instant booking."
        canonicalPath="/"
        schema={homeSchema}
      />

      {/* 1. Full-Screen Premium Hero (Left: headline, badge, trust metrics; Right: Chauffeur & Innova) */}
      <Hero onOpenBooking={() => onOpenBooking()} />

      {/* 2. Trust Section (6 Dark Premium Cards: Police Verified, Background Checked, Experienced Drivers, Emergency Replacement, Instant Dispatch, Uniformed Chauffeurs) */}
      <TrustSection />

      {/* 3. Services Grid (3 cols desktop / 2 tablet / 1 mobile, equal heights, 16:9 images, 50px buttons) */}
      <ServicesSection onSelectServiceAndBook={(title) => onOpenBooking(title)} />

      {/* 4. Why Mumbai Trusts Section (Counters: 5000+ Drivers, 10000+ Customers, 4.9 Rating, 24/7 Support + Chauffeur image) */}
      <WhyMumbaiTrustsSection onOpenBooking={() => onOpenBooking()} />

      {/* 5. Full-Width Customer Experience Banner (Chauffeur Opening Car Door) */}
      <CustomerExperienceBanner onOpenBooking={() => onOpenBooking()} />

      {/* 6. Service Areas Section (Mumbai, Thane, Navi Mumbai, Mira Road, Vasai, Virar, Palghar + Sea Link Banner) */}
      <LocationsSection onSelectLocationAndBook={(loc) => onOpenBooking(undefined, loc)} />

      {/* 7. Real Mumbai Driving Scenarios (Senior Citizen, Corporate BKC, Outstation) */}
      <MumbaiUseCasesSection onSelectServiceAndBook={(title) => onOpenBooking(title)} />

      {/* 8. Testimonials Section (Verified Mumbai Car Owners & Corporates) */}
      <SocialProofSection />

      {/* 9. Frequently Asked Questions (Dark Luxury Accordion) */}
      <FaqSection />

      {/* 10. Comprehensive 9-Field Driver Requirement Lead Form */}
      <LeadFormSection />
    </>
  );
};
