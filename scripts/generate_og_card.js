const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgOg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGlow" cx="70%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#27272a" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#09090b" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>

  <!-- Deep Obsidian Background -->
  <rect width="1200" height="630" fill="url(#bgGlow)"/>

  <!-- Subtle Coordinate Grid Background -->
  <g opacity="0.08" stroke="#ffffff" stroke-width="1.5">
    <line x1="100" y1="0" x2="100" y2="630"/>
    <line x1="300" y1="0" x2="300" y2="630"/>
    <line x1="500" y1="0" x2="500" y2="630"/>
    <line x1="700" y1="0" x2="700" y2="630"/>
    <line x1="900" y1="0" x2="900" y2="630"/>
    <line x1="1100" y1="0" x2="1100" y2="630"/>
    <line x1="0" y1="100" x2="1200" y2="100"/>
    <line x1="0" y1="250" x2="1200" y2="250"/>
    <line x1="0" y1="400" x2="1200" y2="400"/>
    <line x1="0" y1="550" x2="1200" y2="550"/>
  </g>

  <!-- Left Content Column -->
  <g transform="translate(100, 110)">
    <!-- Top Pill Badge -->
    <rect width="270" height="40" rx="20" fill="#18181b" stroke="#27272a" stroke-width="1.5"/>
    <circle cx="24" cy="20" r="5" fill="#10b981"/>
    <text x="40" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="13" font-weight="700" fill="#a1a1aa" letter-spacing="1.5">140 VERIFIED ROOFTOP PINS</text>

    <!-- Main Title -->
    <text x="0" y="115" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="64" font-weight="900" fill="#ffffff" letter-spacing="-2">BLR // EATS</text>
    
    <!-- Subtitle -->
    <text x="0" y="165" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="24" font-weight="500" fill="#fbbf24" letter-spacing="-0.5">The Definitive Bengaluru Food &amp; Brewery Compass</text>
    
    <!-- Description -->
    <text x="0" y="215" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="17" font-weight="400" fill="#a1a1aa">
      <tspan x="0" dy="0">Heritage Breakfasts • Single-Origin Roasters • Craft Microbreweries</tspan>
      <tspan x="0" dy="28">Cult Regional Messes • Top 30 Bars • Chef-Driven Fine Dining</tspan>
    </text>

    <!-- Stat Badges -->
    <g transform="translate(0, 310)">
      <rect width="140" height="64" rx="16" fill="#18181b" stroke="#27272a"/>
      <text x="70" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="20" font-weight="800" fill="#ffffff" text-anchor="middle">123</text>
      <text x="70" y="50" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="11" font-weight="600" fill="#71717a" text-anchor="middle">BENCHMARKS</text>

      <rect x="155" width="140" height="64" rx="16" fill="#18181b" stroke="#27272a"/>
      <text x="225" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="20" font-weight="800" fill="#10b981" text-anchor="middle">100%</text>
      <text x="225" y="50" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="11" font-weight="600" fill="#71717a" text-anchor="middle">ROOFTOP GPS</text>

      <rect x="310" width="170" height="64" rx="16" fill="#18181b" stroke="#27272a"/>
      <text x="395" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="20" font-weight="800" fill="#f59e0b" text-anchor="middle">blreats.com</text>
      <text x="395" y="50" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="11" font-weight="600" fill="#71717a" text-anchor="middle">LIVE PLATFORM</text>
    </g>
  </g>

  <!-- Right Visual Emblem (Glowing Spatial Pin) -->
  <g transform="translate(850, 165)">
    <!-- Ambient Ring Glows -->
    <circle cx="150" cy="150" r="160" fill="none" stroke="#27272a" stroke-width="2" stroke-dasharray="8 8"/>
    <circle cx="150" cy="150" r="110" fill="#18181b" stroke="#3f3f46" stroke-width="4"/>
    
    <!-- Coordinate Crosshairs -->
    <line x1="150" y1="0" x2="150" y2="40" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
    <line x1="150" y1="260" x2="150" y2="300" stroke="#71717a" stroke-width="4" stroke-linecap="round"/>
    <line x1="0" y1="150" x2="40" y2="150" stroke="#71717a" stroke-width="4" stroke-linecap="round"/>
    <line x1="260" y1="150" x2="300" y2="150" stroke="#71717a" stroke-width="4" stroke-linecap="round"/>

    <!-- Map Pin -->
    <path d="M150 70 C112 70 82 100 82 138 C82 182 138 245 150 252 C162 245 218 182 218 138 C218 100 188 70 150 70 Z" fill="#ffffff" filter="drop-shadow(0px 12px 24px rgba(0,0,0,0.6))"/>
    
    <!-- Glowing Amber Center -->
    <circle cx="150" cy="138" r="30" fill="url(#amberGrad)"/>
    <circle cx="150" cy="138" r="18" fill="#ffffff"/>
  </g>
</svg>
`;

async function run() {
  const publicDir = path.join(__dirname, '../public');
  await sharp(Buffer.from(svgOg)).png().toFile(path.join(publicDir, 'og-image.png'));
  console.log('✓ Generated public/og-image.png (1200x630)');
}

run().catch(console.error);
