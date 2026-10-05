import React, { useState, useEffect } from 'react';
import { ShieldCheck, MapPin, X } from 'lucide-react';

interface BookingNotification {
  name: string;
  location: string;
  service: string;
  timeAgo: string;
  vehicle: string;
}

const SAMPLE_ACTIVITIES: BookingNotification[] = [
  { name: 'Vikram M.', location: 'Bandra Kurla Complex (BKC)', service: 'Corporate Chauffeur', timeAgo: '4 mins ago', vehicle: 'Toyota Innova Crysta' },
  { name: 'Pooja S.', location: 'Powai Hiranandani', service: 'Personal Driver', timeAgo: '11 mins ago', vehicle: 'Honda City' },
  { name: 'Dr. Anand K.', location: 'Worli Sea Face', service: 'Full-Time Chauffeur', timeAgo: '19 mins ago', vehicle: 'Mercedes E-Class' },
  { name: 'Sameer D.', location: 'Ghodbunder Road, Thane', service: 'Hourly Driver', timeAgo: '32 mins ago', vehicle: 'Hyundai Creta' },
  { name: 'Meera N.', location: 'Vashi Sector 17, Navi Mumbai', service: 'Airport Transfer Driver', timeAgo: '45 mins ago', vehicle: 'Toyota Fortuner' },
  { name: 'Kunal P.', location: 'Juhu Tara Road', service: 'Outstation Driver (Lonavala)', timeAgo: '58 mins ago', vehicle: 'Kia Carnival' }
];

export const RecentBookingNotification: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show initial notification after 4 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Rotate notification every 12 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % SAMPLE_ACTIVITIES.length);
        setIsVisible(true);
      }, 1000);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  const current = SAMPLE_ACTIVITIES[currentIdx];

  return (
    <aside
      aria-label="Recent booking notification"
      className="fixed bottom-20 left-4 z-40 max-w-sm hidden sm:block animate-fade-in"
    >
      <div className="bg-white/95 backdrop-blur-md border border-[#E5E7EB] shadow-lg rounded-xl p-3.5 flex items-start gap-3 text-left text-[#111827]">
        <div className="w-10 h-10 rounded-lg bg-[#EEF8FC] border border-[#35B6DE]/20 flex items-center justify-center shrink-0 text-[#35B6DE] mt-0.5">
          <ShieldCheck className="w-5 h-5 text-[#22C55E]" />
        </div>
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-1.5 text-xs text-[#4B5563] mb-0.5">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span>Recent Booking Verified</span>
            <span>·</span>
            <span>{current.timeAgo}</span>
          </div>
          <p className="text-sm font-semibold text-[#111827] truncate">
            {current.name} booked <span className="text-[#35B6DE] font-bold">{current.service}</span>
          </p>
          <div className="flex items-center gap-2 mt-1 text-xs text-[#4B5563]">
            <span className="flex items-center gap-1 truncate text-[#4B5563]">
              <MapPin className="w-3 h-3 text-[#35B6DE] shrink-0" />
              {current.location}
            </span>
            <span className="text-[#E5E7EB]">|</span>
            <span className="text-[#111827] text-[11px] font-medium truncate">{current.vehicle}</span>
          </div>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-[#9CA3AF] hover:text-[#111827] p-1 rounded-md transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
