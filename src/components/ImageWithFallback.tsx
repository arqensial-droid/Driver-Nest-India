import React, { useState } from 'react';
import { Clock, MapPin, Car } from 'lucide-react';

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
    <div className={`relative overflow-hidden bg-neutral-100 ${className}`}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          {...props}
        />
      ) : null}

      {/* Styled Fallback Container if network delays or errors occur */}
      {(hasError || !isLoaded) && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-neutral-100 text-neutral-800 transition-opacity duration-300 ${
            hasError ? 'opacity-100' : isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="w-10 h-10 rounded-[10px] bg-[#37B5D6]/15 flex items-center justify-center mb-2 text-[#37B5D6]">
            <Clock className="w-5 h-5" />
          </div>
          <span className="font-heading text-xs font-bold tracking-wider text-neutral-900">
            ON TIME <span className="text-[#37B5D6]">DRIVER SERVICE</span>
          </span>
          {fallbackTitle && (
            <span className="text-[11px] text-neutral-600 mt-1 max-w-[200px] font-medium leading-tight">
              {fallbackTitle}
            </span>
          )}
          <span className="text-[9px] text-[#37B5D6] uppercase tracking-wider mt-1 font-semibold">
            Mumbai Professional Drivers
          </span>
        </div>
      )}

      {/* Badges: Wrapped cleanly so text is never cut off */}
      {(vehicleTag || locationTag) && (
        <div className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center gap-1.5 pointer-events-none z-10">
          {vehicleTag && (
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-neutral-900 px-2 py-0.5 rounded-[8px] bg-white/95 backdrop-blur-xs border border-gray-200 shadow-xs max-w-full">
              <Car className="w-3 h-3 text-[#37B5D6] shrink-0" />
              <span className="leading-tight truncate">{vehicleTag}</span>
            </span>
          )}
          {locationTag && (
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-neutral-900 px-2 py-0.5 rounded-[8px] bg-white/95 backdrop-blur-xs border border-gray-200 shadow-xs max-w-full">
              <MapPin className="w-3 h-3 text-[#37B5D6] shrink-0" />
              <span className="leading-tight truncate">{locationTag}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
