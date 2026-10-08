import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Primary brand colors
const C_BLUE = '#37B5D6';
const C_BLUE_DARK = '#0284C7';
const C_YELLOW = '#F2EF27';
const C_YELLOW_GOLD = '#EAB308';
const C_NAVY_DEEP = '#0B132B';
const C_SLATE_DARK = '#0F172A';
const C_SLATE_MID = '#1E293B';
const C_WHITE = '#FFFFFF';
const C_GRAY_LIGHT = '#F8FAFC';
const C_GREEN = '#22C55E';

function commonDefs() {
  return `
    <defs>
      <!-- Gradients -->
      <linearGradient id="bgSky" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0B132B"/>
        <stop offset="50%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#164E63"/>
      </linearGradient>

      <linearGradient id="bgSkyAirport" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0C1D36"/>
        <stop offset="60%" stop-color="#112A4F"/>
        <stop offset="100%" stop-color="#1A3B66"/>
      </linearGradient>

      <linearGradient id="bgSkyHighway" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0F2830"/>
        <stop offset="60%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#1E3A5F"/>
      </linearGradient>

      <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${C_BLUE}"/>
        <stop offset="100%" stop-color="${C_BLUE_DARK}"/>
      </linearGradient>

      <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FEF08A"/>
        <stop offset="50%" stop-color="${C_YELLOW}"/>
        <stop offset="100%" stop-color="${C_YELLOW_GOLD}"/>
      </linearGradient>

      <linearGradient id="carBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="35%" stop-color="#334155"/>
        <stop offset="70%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>

      <linearGradient id="carWhiteBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="50%" stop-color="#F1F5F9"/>
        <stop offset="100%" stop-color="#CBD5E1"/>
      </linearGradient>

      <linearGradient id="goldPlate" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FEF08A"/>
        <stop offset="100%" stop-color="${C_YELLOW_GOLD}"/>
      </linearGradient>

      <linearGradient id="badgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${C_BLUE}" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="${C_YELLOW}" stop-opacity="0.8"/>
      </linearGradient>

      <!-- Glass Filters -->
      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="30" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
      <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.45"/>
      </filter>
      <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.35"/>
      </filter>
    </defs>
  `;
}

// Sea Link / Mumbai Skyline Vector Fragment
function renderMumbaiSkyline() {
  return `
    <!-- Distant Mumbai High-Rise Skyline -->
    <g opacity="0.45">
      <!-- BKC / Lower Parel Towers -->
      <rect x="50" y="380" width="55" height="220" fill="#1E293B"/>
      <rect x="70" y="340" width="40" height="260" fill="#334155"/>
      <rect x="130" y="420" width="70" height="180" fill="#1E293B"/>
      <rect x="180" y="310" width="50" height="290" fill="#334155"/>
      <rect x="250" y="360" width="65" height="240" fill="#1E293B"/>
      <polygon points="205,270 195,310 215,310" fill="${C_BLUE}" opacity="0.6"/>

      <!-- Window light twinkles -->
      <circle cx="85" cy="370" r="2" fill="${C_YELLOW}" opacity="0.8"/>
      <circle cx="95" cy="400" r="2" fill="#FFFFFF" opacity="0.8"/>
      <circle cx="195" cy="350" r="2" fill="${C_BLUE}" opacity="0.8"/>
      <circle cx="205" cy="380" r="2" fill="${C_YELLOW}" opacity="0.8"/>
      <circle cx="280" cy="420" r="2" fill="#FFFFFF" opacity="0.7"/>

      <!-- Sea Link Cable Stayed Pylon -->
      <polygon points="460,200 480,200 495,580 445,580" fill="#334155"/>
      <polygon points="468,170 472,170 475,200 465,200" fill="${C_BLUE}"/>
      <!-- Cables -->
      <line x1="470" y1="210" x2="310" y2="580" stroke="${C_BLUE}" stroke-width="1.8" opacity="0.75"/>
      <line x1="470" y1="235" x2="350" y2="580" stroke="${C_BLUE}" stroke-width="1.8" opacity="0.75"/>
      <line x1="470" y1="260" x2="390" y2="580" stroke="${C_BLUE}" stroke-width="1.8" opacity="0.75"/>
      <line x1="470" y1="285" x2="420" y2="580" stroke="${C_BLUE}" stroke-width="1.8" opacity="0.75"/>
      <line x1="470" y1="210" x2="630" y2="580" stroke="${C_BLUE}" stroke-width="1.8" opacity="0.75"/>
      <line x1="470" y1="235" x2="590" y2="580" stroke="${C_BLUE}" stroke-width="1.8" opacity="0.75"/>
      <line x1="470" y1="260" x2="550" y2="580" stroke="${C_BLUE}" stroke-width="1.8" opacity="0.75"/>
      <line x1="470" y1="285" x2="520" y2="580" stroke="${C_BLUE}" stroke-width="1.8" opacity="0.75"/>
    </g>

    <!-- Water Reflection & Highway Deck -->
    <rect x="0" y="560" width="1200" height="30" fill="#0F172A" opacity="0.95"/>
    <line x1="0" y1="565" x2="1200" y2="565" stroke="${C_BLUE}" stroke-width="2" opacity="0.6"/>
    <line x1="0" y1="590" x2="1200" y2="590" stroke="${C_YELLOW}" stroke-width="1.5" opacity="0.4"/>
    <rect x="0" y="590" width="1200" height="210" fill="#020617"/>
    <!-- Water shimmer reflections -->
    <ellipse cx="470" cy="620" rx="200" ry="8" fill="${C_BLUE}" opacity="0.2"/>
    <ellipse cx="200" cy="640" rx="140" ry="6" fill="${C_YELLOW}" opacity="0.15"/>
  `;
}

// Sleek Luxury Sedan Vector
function renderLuxurySedan(xOffset = 520, yOffset = 420, isWhite = false) {
  const bodyGrad = isWhite ? 'url(#carWhiteBody)' : 'url(#carBody)';
  const strokeColor = isWhite ? '#94A3B8' : C_BLUE;
  return `
    <g transform="translate(${xOffset}, ${yOffset})" filter="url(#dropShadow)">
      <!-- Car Ground Shadow -->
      <ellipse cx="260" cy="210" rx="280" ry="25" fill="#000000" opacity="0.75"/>

      <!-- Car Lower Chassis -->
      <path d="M 30,170 Q 70,110 160,110 L 360,110 Q 450,110 490,170 Q 520,180 540,195 L 10,195 Q 15,180 30,170 Z" fill="${bodyGrad}" stroke="${strokeColor}" stroke-width="2"/>

      <!-- Car Cabin Roof & Glass -->
      <path d="M 120,110 Q 180,30 260,30 L 350,30 Q 420,30 450,110 Z" fill="#0B132B" stroke="${C_BLUE}" stroke-width="2"/>
      <!-- Windshield & Windows -->
      <path d="M 135,105 Q 185,40 250,40 L 285,40 L 285,105 Z" fill="#38BDF8" opacity="0.35"/>
      <path d="M 295,40 L 345,40 Q 405,40 435,105 L 295,105 Z" fill="#38BDF8" opacity="0.45"/>
      
      <!-- Chrome Window Trim -->
      <path d="M 125,108 Q 182,33 258,33 L 348,33 Q 418,33 448,108" fill="none" stroke="${C_YELLOW}" stroke-width="2.5" opacity="0.85"/>

      <!-- Wheels & Rims -->
      <!-- Front Wheel -->
      <circle cx="115" cy="190" r="48" fill="#0B132B" stroke="#475569" stroke-width="6"/>
      <circle cx="115" cy="190" r="34" fill="#1E293B" stroke="${C_BLUE}" stroke-width="3"/>
      <circle cx="115" cy="190" r="14" fill="${C_YELLOW}" opacity="0.9"/>
      <!-- Rear Wheel -->
      <circle cx="425" cy="190" r="48" fill="#0B132B" stroke="#475569" stroke-width="6"/>
      <circle cx="425" cy="190" r="34" fill="#1E293B" stroke="${C_BLUE}" stroke-width="3"/>
      <circle cx="425" cy="190" r="14" fill="${C_YELLOW}" opacity="0.9"/>

      <!-- LED Headlight Glow -->
      <ellipse cx="510" cy="155" rx="18" ry="8" fill="#FFFFFF"/>
      <ellipse cx="510" cy="155" rx="35" ry="15" fill="${C_BLUE}" opacity="0.5" filter="url(#softGlow)"/>
      <polygon points="525,155 640,140 640,190" fill="${C_BLUE}" opacity="0.15"/>

      <!-- Tail Light Glow -->
      <ellipse cx="35" cy="155" rx="10" ry="6" fill="#EF4444"/>
      <ellipse cx="35" cy="155" rx="20" ry="12" fill="#EF4444" opacity="0.4" filter="url(#softGlow)"/>

      <!-- Door Handle -->
      <rect x="230" y="118" width="28" height="6" rx="3" fill="${C_YELLOW}" opacity="0.85"/>
      <rect x="330" y="118" width="28" height="6" rx="3" fill="${C_YELLOW}" opacity="0.85"/>
    </g>
  `;
}

// Professional Chauffeur Standing Silhouette in Formal Suit & Tie
function renderChauffeurFigure(x = 340, y = 250, pose = 'standing') {
  return `
    <g transform="translate(${x}, ${y})" filter="url(#dropShadow)">
      <!-- Chauffeur Shadow -->
      <ellipse cx="70" cy="470" rx="55" ry="14" fill="#000000" opacity="0.7"/>

      <!-- Legs / Trousers (Formal Navy/Charcoal Suit) -->
      <polygon points="40,290 62,290 65,465 42,465" fill="#0F172A"/>
      <polygon points="76,290 98,290 96,465 74,465" fill="#0F172A"/>
      <!-- Polished Black Shoes -->
      <rect x="38" y="460" width="30" height="15" rx="5" fill="#020617" stroke="#334155" stroke-width="1.5"/>
      <rect x="74" y="460" width="30" height="15" rx="5" fill="#020617" stroke="#334155" stroke-width="1.5"/>

      <!-- Suit Jacket / Torso -->
      <polygon points="25,115 115,115 105,305 35,305" fill="#0B132B" stroke="#1E293B" stroke-width="2"/>
      
      <!-- Crisp White Collar Shirt -->
      <polygon points="56,115 84,115 76,180 64,180" fill="#FFFFFF"/>
      <!-- Chauffeur Gold/Yellow Tie -->
      <polygon points="68,125 72,125 74,215 70,225 66,215" fill="${C_YELLOW}" stroke="${C_YELLOW_GOLD}" stroke-width="1"/>
      
      <!-- Lapels with subtle Cyan piping -->
      <line x1="28" y1="115" x2="65" y2="230" stroke="${C_BLUE}" stroke-width="2.5" opacity="0.85"/>
      <line x1="112" y1="115" x2="75" y2="230" stroke="${C_BLUE}" stroke-width="2.5" opacity="0.85"/>

      <!-- Arms & Formal Hands Position -->
      <path d="M 28,120 L 15,220 L 30,280 L 52,260 L 35,220 Z" fill="#0B132B"/>
      <path d="M 112,120 L 125,220 L 110,280 L 88,260 L 105,220 Z" fill="#0B132B"/>
      <!-- White Chauffeur Gloves / Clean Hands -->
      <circle cx="48" cy="275" r="11" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
      <circle cx="92" cy="275" r="11" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>

      <!-- Head & Neck -->
      <rect x="62" y="90" width="16" height="28" fill="#F1C27D" rx="4"/>
      <!-- Head -->
      <ellipse cx="70" cy="65" rx="22" ry="26" fill="#E0A96D"/>
      <!-- Hair / Clean Groomed Look -->
      <path d="M 48,60 Q 70,30 92,60 Q 85,38 70,38 Q 55,38 48,60 Z" fill="#1E293B"/>

      <!-- Chauffeur Peak Cap (Optional / Professional Executive Touch) -->
      <ellipse cx="70" cy="46" rx="26" ry="12" fill="#0F172A" stroke="${C_BLUE}" stroke-width="1.5"/>
      <polygon points="46,46 94,46 88,34 52,34" fill="#0B132B"/>
      <path d="M 45,50 Q 70,60 95,50" stroke="${C_YELLOW}" stroke-width="3" fill="none"/>
      <!-- Cap Gold Badge -->
      <circle cx="70" cy="42" r="4.5" fill="${C_YELLOW}"/>

      <!-- Verified ID Badge Lanyard -->
      <line x1="58" y1="115" x2="70" y2="175" stroke="${C_BLUE}" stroke-width="1.8"/>
      <line x1="82" y1="115" x2="70" y2="175" stroke="${C_BLUE}" stroke-width="1.8"/>
      <!-- Identification Card -->
      <rect x="61" y="175" width="18" height="26" rx="3" fill="#FFFFFF" stroke="${C_BLUE}" stroke-width="1"/>
      <rect x="64" y="179" width="12" height="7" fill="#0284C7"/>
      <line x1="64" y1="190" x2="75" y2="190" stroke="#000000" stroke-width="1"/>
      <line x1="64" y1="194" x2="72" y2="194" stroke="#000000" stroke-width="1"/>
      <!-- Green Verified Check -->
      <circle cx="75" cy="197" r="2.5" fill="${C_GREEN}"/>
    </g>
  `;
}

// Standard Verified Security & Quality Badges
function renderOverlayBadges(badgeTitle = '100% POLICE VERIFIED', subtitle = 'MUMBAI MMR NETWORK') {
  badgeTitle = badgeTitle.replace(/&/g, "&amp;");
  subtitle = subtitle.replace(/&/g, "&amp;");
  return `
    <!-- Top-Left Brand Verified Badge -->
    <g transform="translate(60, 50)" filter="url(#cardShadow)">
      <rect width="360" height="74" rx="16" fill="#0F172A" fill-opacity="0.9" stroke="${C_BLUE}" stroke-width="2"/>
      
      <!-- Shield Icon -->
      <g transform="translate(18, 14)">
        <polygon points="22,6 38,12 38,28 Q 38,40 22,46 Q 6,40 6,28 L 6,12 Z" fill="url(#cyanGrad)"/>
        <!-- Checkmark inside Shield -->
        <polyline points="13,25 19,31 31,17" fill="none" stroke="${C_YELLOW}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <!-- Badge Text -->
      <text x="75" y="33" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="16" letter-spacing="0.5">
        ${badgeTitle}
      </text>
      <text x="75" y="54" fill="${C_YELLOW}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="11" letter-spacing="1">
        ${subtitle}
      </text>
    </g>

    <!-- Bottom-Left Watermark / Official Brand Stamp -->
    <g transform="translate(60, 690)" opacity="0.9">
      <rect width="320" height="50" rx="12" fill="#020617" fill-opacity="0.85" stroke="#334155" stroke-width="1.5"/>
      <circle cx="28" cy="25" r="12" fill="${C_BLUE}"/>
      <text x="28" y="30" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="900" font-size="12">OTD</text>
      <text x="52" y="31" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="13" letter-spacing="0.5">
        ON TIME DRIVER SERVICE
      </text>
    </g>

    <!-- Top-Right 5-Star Rating Capsule -->
    <g transform="translate(930, 50)" filter="url(#cardShadow)">
      <rect width="210" height="54" rx="14" fill="#0F172A" fill-opacity="0.9" stroke="${C_YELLOW}" stroke-width="1.5"/>
      <!-- 5 Stars -->
      <g transform="translate(20, 18)" fill="${C_YELLOW}">
        <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7"/>
        <polygon points="40,1 42,7 48,7 43,11 45,17 40,13 35,17 37,11 32,7 38,7"/>
        <polygon points="70,1 72,7 78,7 73,11 75,17 70,13 65,17 67,11 62,7 68,7"/>
        <polygon points="100,1 102,7 108,7 103,11 105,17 100,13 95,17 97,11 92,7 98,7"/>
        <polygon points="130,1 132,7 138,7 133,11 135,17 130,13 125,17 127,11 122,7 128,7"/>
      </g>
      <text x="175" y="34" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="13">
        4.9/5
      </text>
    </g>
  `;
}

// -------------------------------------------------------------
// INDIVIDUAL ASSET BUILDERS
// -------------------------------------------------------------

// 1. HERO SECTION & CHAUFFEUR SERVICE
function makeHeroChauffeurSVG() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      ${commonDefs()}
      <rect width="1200" height="800" fill="url(#bgSky)"/>
      ${renderMumbaiSkyline()}
      ${renderLuxurySedan(520, 420, false)}
      ${renderChauffeurFigure(350, 240)}
      ${renderOverlayBadges('PREMIUM CHAUFFEUR NETWORK', '100% POLICE VERIFIED • MUMBAI')}

      <!-- Main Headline Ribbon in Graphic -->
      <g transform="translate(60, 140)">
        <text x="0" y="40" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="36" letter-spacing="-0.5">
          Executive Chauffeur Service
        </text>
        <text x="0" y="75" fill="${C_BLUE}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="20">
          Trained on Luxury Automatics &amp; German Sedans
        </text>
      </g>
    </svg>
  `;
}

// 2. CORPORATE DRIVER SERVICE
function makeCorporateDriverSVG() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      ${commonDefs()}
      <rect width="1200" height="800" fill="url(#bgSky)"/>

      <!-- BKC Corporate Glass Skyscraper Geometry -->
      <g opacity="0.35">
        <polygon points="100,600 100,200 240,240 240,600" fill="#1E293B"/>
        <line x1="120" y1="200" x2="120" y2="600" stroke="${C_BLUE}" stroke-width="1.5"/>
        <line x1="150" y1="200" x2="150" y2="600" stroke="${C_BLUE}" stroke-width="1.5"/>
        <line x1="180" y1="200" x2="180" y2="600" stroke="${C_BLUE}" stroke-width="1.5"/>
        <line x1="210" y1="200" x2="210" y2="600" stroke="${C_BLUE}" stroke-width="1.5"/>
        <polygon points="280,600 280,160 460,200 460,600" fill="#0F172A"/>
        <polygon points="500,600 500,250 680,280 680,600" fill="#1E293B"/>
      </g>

      <!-- Glass Porch Canopy -->
      <polygon points="0,320 800,260 800,280 0,340" fill="${C_BLUE}" opacity="0.45"/>
      <line x1="0" y1="340" x2="800" y2="280" stroke="${C_YELLOW}" stroke-width="3"/>

      ${renderLuxurySedan(500, 420, false)}
      ${renderChauffeurFigure(330, 240)}

      <!-- Executive Passenger in Suit entering vehicle in soft focus -->
      <g transform="translate(480, 260)" opacity="0.85">
        <ellipse cx="40" cy="450" rx="30" ry="8" fill="#000000" opacity="0.6"/>
        <polygon points="25,180 55,180 50,440 30,440" fill="#1E293B"/>
        <polygon points="15,70 65,70 58,200 22,200" fill="#334155"/>
        <ellipse cx="40" cy="40" rx="16" ry="20" fill="#F1C27D"/>
        <!-- Briefcase -->
        <rect x="65" y="240" width="28" height="20" rx="3" fill="#78350F" stroke="${C_YELLOW}" stroke-width="1.5"/>
      </g>

      ${renderOverlayBadges('CORPORATE & EXECUTIVE DRIVERS', 'BKC • NARIMAN POINT • LOWER PAREL')}

      <g transform="translate(60, 140)">
        <text x="0" y="40" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="36">
          Corporate Chauffeur Fleet
        </text>
        <text x="0" y="75" fill="${C_YELLOW}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="20">
          Executive Etiquette • Punctuality • Confidentiality
        </text>
      </g>
    </svg>
  `;
}

// 3. AIRPORT PICKUP & TRANSFERS
function makeAirportDriverSVG() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      ${commonDefs()}
      <rect width="1200" height="800" fill="url(#bgSkyAirport)"/>

      <!-- CSMIA Terminal 2 Ceiling Canopy Pattern -->
      <g opacity="0.3">
        <!-- Iconic Peacock Feather Canopy Motif -->
        <circle cx="200" cy="180" r="160" fill="none" stroke="${C_BLUE}" stroke-width="3"/>
        <circle cx="500" cy="160" r="180" fill="none" stroke="${C_BLUE}" stroke-width="3"/>
        <circle cx="850" cy="150" r="170" fill="none" stroke="${C_BLUE}" stroke-width="3"/>
        <line x1="200" y1="180" x2="200" y2="450" stroke="#334155" stroke-width="6"/>
        <line x1="500" y1="160" x2="500" y2="450" stroke="#334155" stroke-width="6"/>
        <line x1="850" y1="150" x2="850" y2="450" stroke="#334155" stroke-width="6"/>
      </g>

      <!-- Airplane Silhouette Ascending in Sky -->
      <g transform="translate(780, 120) rotate(-18) scale(0.65)" fill="${C_YELLOW}" opacity="0.8">
        <polygon points="120,40 100,5 90,5 95,40 40,45 30,30 20,30 25,50 20,70 30,70 40,55 95,60 90,95 100,95 120,60 160,55 170,50 160,45"/>
      </g>

      ${renderLuxurySedan(500, 420, false)}
      ${renderChauffeurFigure(320, 240)}

      <!-- Travel Luggage Trolley Suitcases beside Car -->
      <g transform="translate(230, 420)" filter="url(#dropShadow)">
        <!-- Large Suitcase -->
        <rect x="0" y="30" width="55" height="85" rx="8" fill="#1E293B" stroke="${C_BLUE}" stroke-width="2.5"/>
        <rect x="18" y="10" width="18" height="22" rx="3" fill="none" stroke="#64748B" stroke-width="3"/>
        <!-- Small Cabin Bag -->
        <rect x="45" y="60" width="45" height="55" rx="6" fill="${C_YELLOW}" stroke="${C_YELLOW_GOLD}" stroke-width="2"/>
        <!-- Wheels -->
        <circle cx="12" cy="118" r="5" fill="#000000"/>
        <circle cx="42" cy="118" r="5" fill="#000000"/>
        <circle cx="56" cy="118" r="4" fill="#000000"/>
        <circle cx="80" cy="118" r="4" fill="#000000"/>
      </g>

      ${renderOverlayBadges('AIRPORT CHAUFFEUR PICKUP', 'CSMIA TERMINAL 1 & 2 • 24/7 GATE MEET')}

      <g transform="translate(60, 140)">
        <text x="0" y="40" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="36">
          Mumbai Airport Transfers
        </text>
        <text x="0" y="75" fill="${C_BLUE}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="20">
          Flight Tracking • Luggage Assistance • Zero Delay
        </text>
      </g>
    </svg>
  `;
}

// 4. OUTSTATION DRIVER & HIGHWAY TRAVEL (SUV)
function makeOutstationDriverSVG() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      ${commonDefs()}
      <rect width="1200" height="800" fill="url(#bgSkyHighway)"/>

      <!-- Western Ghats Rolling Hills Silhouette (Mumbai-Pune Expressway) -->
      <g opacity="0.45">
        <path d="M 0,480 Q 250,300 500,420 T 950,330 T 1200,450 L 1200,800 L 0,800 Z" fill="#064E3B"/>
        <path d="M 0,520 Q 350,390 700,480 T 1200,430 L 1200,800 L 0,800 Z" fill="#022C22"/>
      </g>

      <!-- Highway Curvature Lines -->
      <g opacity="0.8">
        <polygon points="300,560 900,560 1200,800 0,800" fill="#0F172A"/>
        <!-- Highway Center Broken Yellow Lines -->
        <line x1="600" y1="560" x2="600" y2="800" stroke="${C_YELLOW}" stroke-width="8" stroke-dasharray="35,25"/>
        <line x1="380" y1="560" x2="150" y2="800" stroke="#FFFFFF" stroke-width="4"/>
        <line x1="820" y1="560" x2="1050" y2="800" stroke="#FFFFFF" stroke-width="4"/>
      </g>

      <!-- Premium Stance SUV -->
      <g transform="translate(540, 370)" filter="url(#dropShadow)">
        <ellipse cx="260" cy="240" rx="270" ry="26" fill="#000000" opacity="0.7"/>
        <!-- SUV High Roof & Rugged Body -->
        <path d="M 20,200 Q 60,110 140,110 L 400,110 Q 480,120 510,200 L 530,220 L 0,220 Z" fill="url(#carBody)" stroke="${C_BLUE}" stroke-width="2.5"/>
        <!-- Tall Cabin Roof with Roof Rails -->
        <path d="M 100,110 L 150,25 L 380,25 L 430,110 Z" fill="#0B132B" stroke="${C_BLUE}" stroke-width="2"/>
        <line x1="160" y1="20" x2="370" y2="20" stroke="${C_YELLOW}" stroke-width="4"/>
        <!-- Windows -->
        <polygon points="155,35 240,35 240,105 115,105" fill="#38BDF8" opacity="0.4"/>
        <polygon points="250,35 340,35 365,105 250,105" fill="#38BDF8" opacity="0.45"/>
        <!-- Big SUV Wheels -->
        <circle cx="105" cy="215" r="54" fill="#0B132B" stroke="#475569" stroke-width="8"/>
        <circle cx="105" cy="215" r="36" fill="#1E293B" stroke="${C_BLUE}" stroke-width="4"/>
        <circle cx="430" cy="215" r="54" fill="#0B132B" stroke="#475569" stroke-width="8"/>
        <circle cx="430" cy="215" r="36" fill="#1E293B" stroke="${C_BLUE}" stroke-width="4"/>
      </g>

      ${renderChauffeurFigure(350, 230)}
      ${renderOverlayBadges('OUTSTATION HIGHWAY CHAUFFEUR', 'EXPRESSWAY & GHATS SPECIALIST')}

      <g transform="translate(60, 140)">
        <text x="0" y="40" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="36">
          Outstation Highway Drivers
        </text>
        <text x="0" y="75" fill="${C_YELLOW}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="20">
          Mumbai to Pune • Lonavala • Nashik • Alibaug • Goa
        </text>
      </g>
    </svg>
  `;
}

// 5. HOURLY DRIVER SERVICE
function makeHourlyDriverSVG() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      ${commonDefs()}
      <rect width="1200" height="800" fill="url(#bgSky)"/>
      ${renderMumbaiSkyline()}

      <!-- Clock Meter Accent Graphic -->
      <g transform="translate(920, 220)" filter="url(#dropShadow)" opacity="0.85">
        <circle cx="80" cy="80" r="70" fill="#0F172A" stroke="${C_BLUE}" stroke-width="4"/>
        <circle cx="80" cy="80" r="58" fill="#1E293B"/>
        <!-- Clock hands showing quick flexibility -->
        <line x1="80" y1="80" x2="80" y2="40" stroke="${C_YELLOW}" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="80" y1="80" x2="115" y2="80" stroke="${C_BLUE}" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="80" cy="80" r="6" fill="#FFFFFF"/>
        <!-- Speed Streaks -->
        <path d="M 25,60 L 5,63 L 25,66 Z" fill="${C_YELLOW}"/>
        <path d="M 20,80 L 0,83 L 20,86 Z" fill="${C_BLUE}"/>
      </g>

      ${renderLuxurySedan(510, 420, false)}
      ${renderChauffeurFigure(340, 240)}
      ${renderOverlayBadges('HOURLY DRIVER DISPATCH', 'FLEXIBLE PACKAGES • 4 HRS • 8 HRS • 12 HRS')}

      <g transform="translate(60, 140)">
        <text x="0" y="40" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="36">
          Hourly &amp; Short-Duration Chauffeur
        </text>
        <text x="0" y="75" fill="${C_BLUE}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="20">
          Meetings • Shopping Runs • Hospital Visits • Errands
        </text>
      </g>
    </svg>
  `;
}

// 6. PERMANENT & FAMILY DRIVER
function makePermanentDriverSVG() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      ${commonDefs()}
      <rect width="1200" height="800" fill="url(#bgSky)"/>

      <!-- Residential Gated Community Villa / Building Background -->
      <g opacity="0.35">
        <rect x="80" y="300" width="280" height="300" fill="#1E293B"/>
        <rect x="420" y="240" width="320" height="360" fill="#0F172A"/>
        <!-- Balconies & Garden Foliage -->
        <ellipse cx="220" cy="550" rx="90" ry="60" fill="#047857"/>
        <ellipse cx="600" cy="560" rx="120" ry="70" fill="#047857"/>
      </g>

      <!-- Clean White Family Car -->
      ${renderLuxurySedan(500, 420, true)}
      ${renderChauffeurFigure(330, 240)}

      ${renderOverlayBadges('MONTHLY & PERMANENT CHAUFFEUR', 'FAMILY BACKGROUND VERIFIED • ZERO-ABSENCE GUARANTEE')}

      <g transform="translate(60, 140)">
        <text x="0" y="40" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="36">
          Dedicated Permanent Family Driver
        </text>
        <text x="0" y="75" fill="${C_YELLOW}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="20">
          School Runs • Senior Citizens Care • Household Convenience
        </text>
      </g>
    </svg>
  `;
}

// 7. ABOUT US / CHAUFFEUR TEAM
function makeAboutTeamSVG() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      ${commonDefs()}
      <rect width="1200" height="800" fill="url(#bgSky)"/>
      ${renderMumbaiSkyline()}

      <!-- Team Lineup of 4 Professional Vetted Chauffeurs -->
      ${renderChauffeurFigure(240, 240)}
      ${renderChauffeurFigure(420, 220)}
      ${renderChauffeurFigure(600, 220)}
      ${renderChauffeurFigure(780, 240)}

      ${renderOverlayBadges('POLICE CLEARANCE DOSSIER', '5,000+ VETTED DRIVERS ACROSS MUMBAI MMR')}

      <g transform="translate(60, 140)">
        <text x="0" y="40" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="36">
          The On Time Driver Service Team
        </text>
        <text x="0" y="75" fill="${C_BLUE}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="20">
          Three-Layer Background Verification • Road Skill Audited
        </text>
      </g>
    </svg>
  `;
}

// 8. SERVICE AREA / MUMBAI MMR COVERAGE
function makeServiceAreasSVG() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      ${commonDefs()}
      <rect width="1200" height="800" fill="url(#bgSky)"/>

      <!-- Stylized MMR Network Map Graphic -->
      <g opacity="0.85">
        <!-- Connecting Highways & Bridges -->
        <path d="M 200,650 Q 350,500 500,450 T 750,300 T 950,220" fill="none" stroke="${C_BLUE}" stroke-width="6" stroke-dasharray="12,6"/>
        <path d="M 500,450 Q 650,480 850,550" fill="none" stroke="${C_YELLOW}" stroke-width="5" stroke-dasharray="10,5"/>

        <!-- Network Hub Circles with Labels -->
        <!-- 1. South Mumbai -->
        <circle cx="200" cy="650" r="14" fill="${C_YELLOW}" stroke="#FFFFFF" stroke-width="3"/>
        <text x="200" y="690" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="16">South Mumbai</text>

        <!-- 2. BKC & Bandra -->
        <circle cx="360" cy="520" r="16" fill="${C_BLUE}" stroke="#FFFFFF" stroke-width="3"/>
        <text x="360" y="560" text-anchor="middle" fill="${C_YELLOW}" font-family="sans-serif" font-weight="bold" font-size="18">BKC &amp; Bandra</text>

        <!-- 3. Western Suburbs -->
        <circle cx="480" cy="420" r="14" fill="${C_BLUE}" stroke="#FFFFFF" stroke-width="3"/>
        <text x="480" y="400" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="15">Andheri &amp; Borivali</text>

        <!-- 4. Navi Mumbai / Atal Setu -->
        <circle cx="680" cy="510" r="15" fill="${C_YELLOW}" stroke="#FFFFFF" stroke-width="3"/>
        <text x="680" y="550" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="16">Navi Mumbai</text>

        <!-- 5. Thane -->
        <circle cx="720" cy="320" r="15" fill="${C_BLUE}" stroke="#FFFFFF" stroke-width="3"/>
        <text x="720" y="300" text-anchor="middle" fill="${C_YELLOW}" font-family="sans-serif" font-weight="bold" font-size="17">Thane</text>

        <!-- 6. Mira-Bhayandar -->
        <circle cx="620" cy="270" r="13" fill="#FFFFFF" stroke="${C_BLUE}" stroke-width="3"/>
        <text x="540" y="260" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="14">Mira Road</text>

        <!-- 7. Vasai-Virar -->
        <circle cx="820" cy="210" r="13" fill="${C_BLUE}" stroke="#FFFFFF" stroke-width="3"/>
        <text x="820" y="190" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="14">Vasai &amp; Virar</text>

        <!-- 8. Palghar -->
        <circle cx="980" cy="180" r="14" fill="${C_YELLOW}" stroke="#FFFFFF" stroke-width="3"/>
        <text x="980" y="160" text-anchor="middle" fill="${C_YELLOW}" font-family="sans-serif" font-weight="bold" font-size="15">Palghar</text>
      </g>

      ${renderLuxurySedan(480, 470, false)}

      ${renderOverlayBadges('COMPLETE MUMBAI MMR COVERAGE', '8 CORRIDORS • 100% DOORSTEP ALLOCATION')}

      <g transform="translate(60, 140)">
        <text x="0" y="40" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="36">
          Mumbai Metropolitan Region
        </text>
        <text x="0" y="75" fill="${C_BLUE}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="20">
          Mumbai • Navi Mumbai • Thane • Mira-Bhayandar • Vasai • Virar • Palghar
        </text>
      </g>
    </svg>
  `;
}

// 9. SENIOR CITIZEN ASSISTANCE
function makeSeniorCitizenSVG() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      ${commonDefs()}
      <rect width="1200" height="800" fill="url(#bgSky)"/>
      ${renderMumbaiSkyline()}

      <!-- Hospital & Care Facility Subtle Cross Motif -->
      <g transform="translate(850, 180)" opacity="0.6">
        <circle cx="60" cy="60" r="50" fill="#0F172A" stroke="${C_GREEN}" stroke-width="3"/>
        <polygon points="50,25 70,25 70,50 95,50 95,70 70,70 70,95 50,95 50,70 25,70 25,50 50,50" fill="${C_GREEN}"/>
      </g>

      ${renderLuxurySedan(520, 420, true)}
      ${renderChauffeurFigure(340, 240)}

      ${renderOverlayBadges('PATIENT & SENIOR CITIZEN ASSISTANCE', 'GENTLE BRAKING • DOORSTEP ESCORT • HOSPITAL WAITING')}

      <g transform="translate(60, 140)">
        <text x="0" y="40" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="36">
          Senior Citizen Chauffeur Care
        </text>
        <text x="0" y="75" fill="${C_YELLOW}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="20">
          Lilavati • Hinduja • Kokilaben • Tata Memorial Hospital Transfers
        </text>
      </g>
    </svg>
  `;
}

// 10. DRIVER PORTRAITS BUILDER (800x800)
function makeDriverPortraitSVG(name, title, exp, rating, badge) {
  name = name.replace(/&/g, "&amp;");
  title = title.replace(/&/g, "&amp;");
  badge = badge.replace(/&/g, "&amp;");
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
      ${commonDefs()}
      <rect width="800" height="800" fill="url(#bgSky)"/>

      <!-- Outer Circular Glow -->
      <circle cx="400" cy="380" r="280" fill="${C_BLUE}" opacity="0.12" filter="url(#softGlow)"/>

      <!-- Center Chauffeur Bust in Uniform -->
      <g transform="translate(260, 120)" filter="url(#dropShadow)">
        <!-- Torso in Formal Navy Suit -->
        <polygon points="10,340 270,340 240,580 40,580" fill="#0F172A" stroke="#1E293B" stroke-width="4"/>
        <!-- White Shirt Collar -->
        <polygon points="90,340 190,340 155,440 125,440" fill="#FFFFFF"/>
        <!-- Gold/Yellow Tie -->
        <polygon points="135,355 145,355 148,480 140,495 132,480" fill="${C_YELLOW}" stroke="${C_YELLOW_GOLD}" stroke-width="1.5"/>
        <line x1="20" y1="340" x2="130,490" stroke="${C_BLUE}" stroke-width="4"/>
        <line x1="260" y1="340" x2="150,490" stroke="${C_BLUE}" stroke-width="4"/>

        <!-- Neck -->
        <rect x="122" y="290" width="36" height="55" fill="#E0A96D" rx="6"/>
        <!-- Face -->
        <ellipse cx="140" cy="240" rx="55" ry="68" fill="#F1C27D"/>
        <!-- Eyes & Features subtle silhouette -->
        <ellipse cx="118" cy="235" rx="6" ry="3" fill="#1E293B"/>
        <ellipse cx="162" cy="235" rx="6" ry="3" fill="#1E293B"/>
        <!-- Professional Groomed Hair -->
        <path d="M 85,220 Q 140,150 195,220 Q 180,165 140,165 Q 100,165 85,220 Z" fill="#1E293B"/>

        <!-- Chauffeur Peak Cap -->
        <ellipse cx="140" cy="180" rx="65" ry="24" fill="#0F172A" stroke="${C_BLUE}" stroke-width="3"/>
        <polygon points="85,180 195,180 180,140 100,140" fill="#0B132B"/>
        <path d="M 85,186 Q 140,205 195,186" stroke="${C_YELLOW}" stroke-width="5" fill="none"/>
        <circle cx="140" cy="170" r="10" fill="${C_YELLOW}"/>

        <!-- ID Card Badge -->
        <rect x="120" y="440" width="40" height="55" rx="5" fill="#FFFFFF" stroke="${C_BLUE}" stroke-width="2"/>
        <rect x="126" y="448" width="28" height="15" fill="#0284C7"/>
        <circle cx="150" cy="485" r="5" fill="${C_GREEN}"/>
      </g>

      <!-- Bottom Profile Card -->
      <g transform="translate(60, 580)" filter="url(#cardShadow)">
        <rect width="680" height="170" rx="20" fill="#0F172A" fill-opacity="0.95" stroke="${C_BLUE}" stroke-width="2.5"/>
        
        <!-- Driver Name -->
        <text x="40" y="55" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="32">
          ${name}
        </text>

        <!-- Driver Specialty -->
        <text x="40" y="92" fill="${C_YELLOW}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="18">
          ${title}
        </text>

        <!-- Experience & Rating -->
        <text x="40" y="132" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="16">
          Experience: <tspan fill="#FFFFFF" font-weight="bold">${exp}</tspan> • Rating: <tspan fill="${C_YELLOW}" font-weight="bold">${rating}</tspan>
        </text>

        <!-- Police Clearance Tag Badge -->
        <g transform="translate(470, 35)">
          <rect width="180" height="38" rx="10" fill="#064E3B" stroke="${C_GREEN}" stroke-width="2"/>
          <text x="90" y="24" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="800" font-size="12">
            POLICE CLEAR
          </text>
        </g>
      </g>
    </svg>
  `;
}

// -------------------------------------------------------------
// RENDER & EXPORT LOGIC
// -------------------------------------------------------------

async function generateAllAssets() {
  console.log('[ASSET GEN] Starting cohesive brand asset suite creation with sharp...');

  const servicesDir = path.resolve('public/images/services');
  const driversDir = path.resolve('public/images/drivers');
  const imagesDir = path.resolve('public/images');

  if (!fs.existsSync(servicesDir)) fs.mkdirSync(servicesDir, { recursive: true });
  if (!fs.existsSync(driversDir)) fs.mkdirSync(driversDir, { recursive: true });

  const tasks = [
    // 1. Hero & Chauffeur
    {
      svg: makeHeroChauffeurSVG(),
      targets: [
        'mumbai-driver-service',
        'chauffeur-service-mumbai',
        'chauffeur-service',
        'personal-driver'
      ]
    },
    // 2. Corporate Driver
    {
      svg: makeCorporateDriverSVG(),
      targets: [
        'corporate-driver-service',
        'corporate-driver',
        'full-time-driver'
      ]
    },
    // 3. Airport Driver
    {
      svg: makeAirportDriverSVG(),
      targets: [
        'airport-driver-mumbai',
        'airport-driver'
      ]
    },
    // 4. Outstation Driver
    {
      svg: makeOutstationDriverSVG(),
      targets: [
        'outstation-driver-service',
        'outstation-driver'
      ]
    },
    // 5. Hourly Driver
    {
      svg: makeHourlyDriverSVG(),
      targets: [
        'hourly-driver-service',
        'hourly-driver',
        'part-time-driver',
        'temporary-driver'
      ]
    },
    // 6. Permanent Driver
    {
      svg: makePermanentDriverSVG(),
      targets: [
        'permanent-driver-service',
        'permanent-driver'
      ]
    },
    // 7. About Team
    {
      svg: makeAboutTeamSVG(),
      targets: [
        'about-team-service',
        'event-driver'
      ]
    },
    // 8. Service Areas
    {
      svg: makeServiceAreasSVG(),
      targets: [
        'service-areas-mumbai'
      ]
    },
    // 9. Senior Citizen Care
    {
      svg: makeSeniorCitizenSVG(),
      targets: [
        'senior-citizen-assistance'
      ]
    }
  ];

  // Process services
  for (const t of tasks) {
    const buf = Buffer.from(t.svg);
    for (const name of t.targets) {
      const webpPath = path.join(servicesDir, `${name}.webp`);
      const jpgPath = path.join(servicesDir, `${name}.jpg`);

      await sharp(buf).webp({ quality: 92 }).toFile(webpPath);
      await sharp(buf).jpeg({ quality: 90 }).toFile(jpgPath);
      console.log(`[SERVICE ASSET] Generated ${name}.webp & ${name}.jpg`);
    }
  }

  // Also write the root SEO og-share image (1200x630)
  const ogSvg = makeHeroChauffeurSVG();
  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile(path.join(imagesDir, 'mumbai-driver-service.webp'));
  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630, { fit: 'cover' })
    .png()
    .toFile(path.join(imagesDir, 'og-share.png'));
  console.log('[OG ASSET] Generated og-share.png and root mumbai-driver-service.webp');

  // Process Driver Profiles (800x800)
  const drivers = [
    {
      slug: 'rajesh-sharma',
      name: 'Rajesh Sharma',
      title: 'Senior Corporate Chauffeur • BKC',
      exp: '12+ Years',
      rating: '4.98 / 5.0 (340+ Trips)',
      badge: 'BKC Corporate Fleet'
    },
    {
      slug: 'sunil-patil',
      name: 'Sunil Patil',
      title: 'Luxury German Sedan Specialist • South Mumbai',
      exp: '9+ Years',
      rating: '4.95 / 5.0 (280+ Trips)',
      badge: 'Mercedes & BMW Certified'
    },
    {
      slug: 'vikram-jadhav',
      name: 'Vikram Jadhav',
      title: 'Highway & Expressway Specialist • Navi Mumbai',
      exp: '14+ Years',
      rating: '4.99 / 5.0 (420+ Trips)',
      badge: 'Ghats Defensive Driving'
    },
    {
      slug: 'anand-mishra',
      name: 'Anand Mishra',
      title: 'Executive Airport Transfer • Western Suburbs',
      exp: '8+ Years',
      rating: '4.94 / 5.0 (215+ Trips)',
      badge: 'CSMIA Night Specialist'
    }
  ];

  for (const d of drivers) {
    const svg = makeDriverPortraitSVG(d.name, d.title, d.exp, d.rating, d.badge);
    const buf = Buffer.from(svg);
    const webpPath = path.join(driversDir, `${d.slug}.webp`);
    const jpgPath = path.join(driversDir, `${d.slug}.jpg`);

    await sharp(buf).webp({ quality: 92 }).toFile(webpPath);
    await sharp(buf).jpeg({ quality: 90 }).toFile(jpgPath);
    console.log(`[DRIVER ASSET] Generated ${d.slug}.webp & ${d.slug}.jpg`);
  }

  console.log('[ASSET GEN COMPLETE] All brand assets created successfully!');
}

generateAllAssets().catch(err => {
  console.error('[ASSET GEN ERROR]', err);
  process.exit(1);
});
