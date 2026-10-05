import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'header' | 'footer' | 'widget';
  priority?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  className = '',
  size = 'header',
  priority = true,
}) => {
  const isDark = variant === 'dark';
  const webpSrc = isDark ? '/images/logo-dark.webp' : '/images/logo.webp';
  const pngSrc = isDark ? '/images/logo-dark.png' : '/images/logo.png';
  const svgSrc = isDark ? '/images/logo-dark.svg' : '/images/logo.svg';

  // Responsive height constraints per user specification:
  // Desktop: 60-70px (lg:h-[65px])
  // Tablet: 50-55px (sm:h-[52px])
  // Mobile: 40-45px (h-[42px])
  let sizeClasses = 'h-[42px] sm:h-[52px] lg:h-[65px] w-auto max-w-[200px] sm:max-w-[250px] lg:max-w-[310px]';

  if (size === 'sm') {
    sizeClasses = 'h-[36px] sm:h-[40px] w-auto max-w-[180px]';
  } else if (size === 'md') {
    sizeClasses = 'h-[44px] sm:h-[50px] lg:h-[58px] w-auto max-w-[260px]';
  } else if (size === 'lg') {
    sizeClasses = 'h-[50px] sm:h-[60px] lg:h-[70px] w-auto max-w-[320px]';
  } else if (size === 'footer') {
    sizeClasses = 'h-[48px] sm:h-[58px] lg:h-[68px] w-auto max-w-[240px] sm:max-w-[280px] lg:max-w-[320px]';
  } else if (size === 'widget') {
    sizeClasses = 'h-[32px] sm:h-[38px] w-auto max-w-[170px]';
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <picture className="block">
        <source type="image/webp" srcSet={webpSrc} />
        <source type="image/svg+xml" srcSet={svgSrc} />
        <img
          src={pngSrc}
          alt="On Time Driver Service – Premium Chauffeurs Network"
          width="1000"
          height="280"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`${sizeClasses} object-contain transition-transform duration-200 hover:scale-[1.01]`}
          style={{
            aspectRatio: '1000 / 280',
          }}
        />
      </picture>
    </div>
  );
};
