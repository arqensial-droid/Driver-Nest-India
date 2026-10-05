import React, { useState } from 'react';
import { Clock, MapPin, Car } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackTitle?: string;
  vehicleTag?: string;
  locationTag?: string;
  className?: string;
  priority?: boolean;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackTitle,
  vehicleTag,
  locationTag,
  className = '',
  priority = false,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Derive WebP source if src is a local .jpg / .jpeg / .png
  const webpSrc = src.match(/\.(jpg|jpeg|png)$/i)
    ? src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    : undefined;

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      {!hasError ? (
        <picture className="w-full h-full block">
          {webpSrc && <source type="image/webp" srcSet={webpSrc} />}
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            style={{ objectFit: 'cover' }}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            {...props}
          />
        </picture>
      ) : null}

      {/* Styled Fallback Container matching Light Corporate Theme */}
      {(hasError || !isLoaded) && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-100 text-[#4B5563] border border-[#E5E7EB] transition-opacity duration-300 ${
            hasError ? 'opacity-100' : isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-[#35B6DE]/15 border border-[#35B6DE]/30 flex items-center justify-center mb-2 text-[#35B6DE]">
            <Clock className="w-5 h-5 text-[#35B6DE]" />
          </div>
          <span className="font-heading text-xs font-bold tracking-wider text-[#111827]">
            ON TIME <span className="text-[#35B6DE]">DRIVER SERVICE</span>
          </span>
          {fallbackTitle && (
            <span className="text-[11px] text-[#4B5563] mt-1 max-w-[220px] font-medium leading-tight">
              {fallbackTitle}
            </span>
          )}
          <span className="text-[9px] text-[#35B6DE] uppercase tracking-wider mt-1 font-semibold">
            Mumbai Professional Drivers
          </span>
        </div>
      )}

      {/* Badges: Wrapped cleanly with light backdrop */}
      {(vehicleTag || locationTag) && (
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-wrap items-center gap-1.5 pointer-events-none z-10">
          {vehicleTag && (
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-[#111827] px-2 py-0.5 rounded-lg bg-white/95 backdrop-blur-md border border-[#E5E7EB] shadow-xs max-w-full">
              <Car className="w-3 h-3 text-[#35B6DE] shrink-0" />
              <span className="leading-tight truncate text-[#111827]">{vehicleTag}</span>
            </span>
          )}
          {locationTag && (
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-[#111827] px-2 py-0.5 rounded-lg bg-white/95 backdrop-blur-md border border-[#E5E7EB] shadow-xs max-w-full">
              <MapPin className="w-3 h-3 text-[#35B6DE] shrink-0" />
              <span className="leading-tight truncate text-[#4B5563]">{locationTag}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
