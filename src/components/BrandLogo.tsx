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
  // Official uploaded company logo across entire website: Logo.png
  const logoSrc = '/images/Logo.png';

  // Responsive height requirements:
  // Desktop: 60-70px (lg:h-[65px])
  // Tablet: 50-55px (sm:h-[52px])
  // Mobile: 40-45px (h-[42px])
  let sizeClasses = 'h-[42px] sm:h-[52px] lg:h-[65px] w-auto';

  if (size === 'sm') {
    sizeClasses = 'h-[36px] sm:h-[40px] w-auto';
  } else if (size === 'md') {
    sizeClasses = 'h-[44px] sm:h-[52px] lg:h-[60px] w-auto';
  } else if (size === 'lg') {
    sizeClasses = 'h-[50px] sm:h-[60px] lg:h-[68px] w-auto';
  } else if (size === 'footer') {
    // Desktop: 60-70px, Tablet: 50-55px, Mobile: 40-45px
    sizeClasses = 'h-[42px] sm:h-[52px] lg:h-[65px] w-auto';
  } else if (size === 'widget') {
    sizeClasses = 'h-[32px] sm:h-[36px] w-auto';
  }

  // Light theme optimization:
  // When displayed on dark surfaces, wrap with a subtle, clean white container
  // so dark letters and yellow accents in Logo.png remain 100% crisp without altering logo colors.
  const isDarkBg = variant === 'dark';

  return (
    <div
      className={`inline-flex items-center select-none ${
        isDarkBg
          ? 'bg-white rounded-xl px-2.5 py-1 shadow-xs border border-white/40'
          : ''
      } ${className}`}
    >
      <img
        src={logoSrc}
        alt="ON TIME DRIVER SERVICE"
        width="2172"
        height="724"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`${sizeClasses} object-contain transition-transform duration-200 hover:scale-[1.01]`}
        style={{
          aspectRatio: '2172 / 724',
        }}
      />
    </div>
  );
};
