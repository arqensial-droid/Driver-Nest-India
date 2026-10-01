import React, { useState } from 'react';
import { ShieldCheck, MapPin, Car } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackTitle?: string;
  vehicleTag?: string;
  locationTag?: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackTitle,
  vehicleTag,
  locationTag,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#0D0D0D] ${className}`}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          {...props}
        />
      ) : null}

      {/* Styled Fallback Container if network delays or errors occur */}
      {(hasError || !isLoaded) && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#1A1813] via-[#0E0E0E] to-[#050505] border border-[#D4AF37]/20 transition-opacity duration-500 ${
            hasError ? 'opacity-100' : isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#99781D]/10 border border-[#D4AF37]/40 flex items-center justify-center mb-2 sm:mb-3 shadow-lg shadow-[#D4AF37]/10">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37]" />
          </div>
          <span className="font-display text-xs sm:text-sm font-semibold tracking-wider text-white">
            DRIVER NEST <span className="text-[#D4AF37]">INDIA</span>
          </span>
          {fallbackTitle && (
            <span className="text-[11px] sm:text-xs text-neutral-300 mt-1 max-w-[200px] font-medium leading-tight">
              {fallbackTitle}
            </span>
          )}
          <span className="text-[9px] sm:text-[10px] text-[#E5C07B] uppercase tracking-widest mt-1 font-mono">
            Mumbai Professional Drivers
          </span>
        </div>
      )}

      {/* Indian Context Badges: Flex-wrap chips so text is NEVER cut off */}
      {(vehicleTag || locationTag) && (
        <div className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center gap-1.5 pointer-events-none z-10">
          {vehicleTag && (
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-white px-2 py-0.5 rounded-md bg-black/85 backdrop-blur-md border border-[#D4AF37]/35 shadow-sm max-w-full">
              <Car className="w-3 h-3 text-[#D4AF37] shrink-0" />
              <span className="leading-tight">{vehicleTag}</span>
            </span>
          )}
          {locationTag && (
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-[#E5C07B] px-2 py-0.5 rounded-md bg-black/85 backdrop-blur-md border border-neutral-700 shadow-sm max-w-full">
              <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
              <span className="leading-tight">{locationTag}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
