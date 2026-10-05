import React, { useState } from 'react';
import { RouterProvider, useRouter } from './router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BookingModal } from './components/BookingModal';
import { ExitIntentModal } from './components/ExitIntentModal';
import { RecentBookingNotification } from './components/RecentBookingNotification';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesDirectoryPage } from './pages/ServicesDirectoryPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { LocationDetailPage } from './pages/LocationDetailPage';
import { ContactPage } from './pages/ContactPage';
import { FaqsPage } from './pages/FaqsPage';
import { NotFoundPage } from './pages/NotFoundPage';

const DEDICATED_SEO_ROUTES: Record<string, string> = {
  '/hourly-driver-service': 'hourly-driver',
  '/permanent-driver-service': 'permanent-driver',
  '/personal-driver-service': 'personal-driver',
  '/corporate-driver-service': 'corporate-driver',
  '/outstation-driver-service': 'outstation-driver',
  '/family-driver-service': 'family-driver',
  '/chauffeur-service': 'chauffeur-service',
  '/full-time-driver-service': 'permanent-driver',
  '/part-time-driver-service': 'part-time-driver',
  '/airport-driver-service': 'airport-driver',
  '/temporary-driver-service': 'temporary-driver',
};

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('Personal Driver');
  const [preselectedLocation, setPreselectedLocation] = useState('Mumbai');

  const handleOpenBooking = (serviceTitle?: string, locationName?: string) => {
    if (serviceTitle) setPreselectedService(serviceTitle);
    if (locationName) setPreselectedLocation(locationName);
    setIsBookingModalOpen(true);
  };

  // Route matching
  const renderRoute = () => {
    const path = currentPath.split('?')[0].split('#')[0];

    if (path === '/' || path === '') {
      return <HomePage onOpenBooking={handleOpenBooking} />;
    }

    if (path === '/about') {
      return <AboutPage onOpenBooking={() => handleOpenBooking()} />;
    }

    if (path === '/services') {
      return <ServicesDirectoryPage onOpenBooking={handleOpenBooking} />;
    }

    // Check dedicated SEO service pages first
    if (DEDICATED_SEO_ROUTES[path]) {
      const slug = DEDICATED_SEO_ROUTES[path];
      return <ServiceDetailPage slug={slug} onOpenBooking={handleOpenBooking} />;
    }

    if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '').replace(/\/$/, '');
      return <ServiceDetailPage slug={slug} onOpenBooking={handleOpenBooking} />;
    }

    if (path === '/service-areas') {
      return <ServiceAreasPage onOpenBooking={handleOpenBooking} />;
    }

    if (path.startsWith('/locations/')) {
      const slug = path.replace('/locations/', '').replace(/\/$/, '');
      return <LocationDetailPage slug={slug} onOpenBooking={handleOpenBooking} />;
    }

    if (path === '/contact') {
      return <ContactPage />;
    }

    if (path === '/faqs') {
      return <FaqsPage />;
    }

    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] selection:bg-[#35B6DE]/25 selection:text-[#111827] relative font-body antialiased flex flex-col justify-between overflow-x-hidden">
      {/* 1. Header / Navigation with Luxury Chauffeur Brand Re-Design */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* 2. Main Page Content (Dynamic Routing) */}
      <main className="flex-1">
        {renderRoute()}
      </main>

      {/* 3. Professional Corporate Multi-Page Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* 4. Mobile Sticky Quick Action Bar (50-52px, Sticky Book Driver & Call) */}
      <StickyMobileBar onOpenBooking={() => handleOpenBooking()} />

      {/* 5. Floating WhatsApp Support Button */}
      <FloatingWhatsApp />

      {/* 6. Recent Booking Activity Notification */}
      <RecentBookingNotification />

      {/* 7. Quick Booking Modal with lead capture */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialService={preselectedService}
        initialLocation={preselectedLocation}
      />

      {/* 8. Exit Intent Priority Consultation Modal */}
      <ExitIntentModal onOpenBooking={() => handleOpenBooking()} />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
