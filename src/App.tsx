import React, { useState } from 'react';
import { RouterProvider, useRouter } from './router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BookingModal } from './components/BookingModal';
import { ExitIntentModal } from './components/ExitIntentModal';

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

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('Personal Driver');
  const [preselectedLocation, setPreselectedLocation] = useState('Mumbai (All Zones & BKC)');

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
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#D4AF37]/30 selection:text-[#E5C07B] relative font-body antialiased flex flex-col justify-between">
      {/* 1. Header / Navigation with Mega Dropdowns */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* 2. Main Page Content (Dynamic Routing) */}
      <main className="flex-1">
        {renderRoute()}
      </main>

      {/* 3. Luxury Multi-Page Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* 4. Mobile Sticky Quick Action Bar */}
      <StickyMobileBar onOpenBooking={() => handleOpenBooking()} />

      {/* 5. Floating WhatsApp Concierge Button */}
      <FloatingWhatsApp />

      {/* 6. "Request a Driver" Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialService={preselectedService}
        initialLocation={preselectedLocation}
      />

      {/* 7. Exit Intent Priority Consultation Modal */}
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
