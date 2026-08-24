const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/branding');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// 1. Spatial Pin / Compass Mark
const svgOption1 = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
    <linearGradient id="amberGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  
  <!-- Rounded Base Plate -->
  <rect x="24" y="24" width="464" height="464" rx="112" fill="url(#bgGrad1)" stroke="#27272a" stroke-width="8"/>
  
  <!-- Subtle Radar Grid Rings -->
  <circle cx="256" cy="256" r="148" fill="none" stroke="#27272a" stroke-width="4" stroke-dasharray="8 8"/>
  <circle cx="256" cy="256" r="92" fill="none" stroke="#3f3f46" stroke-width="4"/>
  
  <!-- Crosshairs -->
  <line x1="256" y1="72" x2="256" y2="124" stroke="#71717a" stroke-width="6" stroke-linecap="round"/>
  <line x1="256" y1="388" x2="256" y2="440" stroke="#71717a" stroke-width="6" stroke-linecap="round"/>
  <line x1="72" y1="256" x2="124" y2="256" stroke="#71717a" stroke-width="6" stroke-linecap="round"/>
  <line x1="388" y1="256" x2="440" y2="256" stroke="#71717a" stroke-width="6" stroke-linecap="round"/>
  
  <!-- Map Pin Body (Modern Sharp Pin) -->
  <path d="M256 128 C203 128 160 171 160 224 C160 286 240 376 256 384 C272 376 352 286 352 224 C352 171 309 128 256 128 Z" fill="#ffffff" filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.5))"/>
  
  <!-- Glowing Amber Culinary Core -->
  <circle cx="256" cy="224" r="42" fill="url(#amberGlow)" filter="url(#glow)"/>
  <circle cx="256" cy="224" r="28" fill="#ffffff" opacity="0.9"/>
</svg>
`;

// 2. Bold Typographic Monogram "BLR // EATS"
const svgOption2 = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09090b"/>
      <stop offset="100%" stop-color="#18181b"/>
    </linearGradient>
  </defs>
  
  <!-- Squircle Base -->
  <rect x="24" y="24" width="464" height="464" rx="120" fill="url(#bgGrad2)" stroke="#27272a" stroke-width="6"/>
  
  <!-- Typographic Mark -->
  <text x="130" y="270" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Geist', sans-serif" font-size="160" font-weight="900" fill="#ffffff" letter-spacing="-6">B</text>
  
  <!-- Slashing Dynamic Bars (Saffron & Emerald) -->
  <line x1="260" y1="150" x2="310" y2="350" stroke="#f59e0b" stroke-width="24" stroke-linecap="round"/>
  <line x1="295" y1="150" x2="345" y2="350" stroke="#10b981" stroke-width="24" stroke-linecap="round"/>
  
  <!-- Pin Indicator -->
  <circle cx="390" cy="180" r="18" fill="#ffffff"/>
  <circle cx="390" cy="180" r="8" fill="#f59e0b"/>
</svg>
`;

// 3. The Minimalist Compass Pin (Favicon optimized)
const svgOption3 = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09090b"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
  </defs>
  
  <rect width="512" height="512" rx="128" fill="url(#bgGrad3)"/>
  
  <!-- Crisp Center Beacon -->
  <circle cx="256" cy="256" r="160" fill="#18181b" stroke="#27272a" stroke-width="12"/>
  <circle cx="256" cy="256" r="100" fill="#27272a"/>
  <circle cx="256" cy="256" r="60" fill="#f59e0b"/>
  <circle cx="256" cy="256" r="24" fill="#ffffff"/>
  
  <!-- Compass Ticks -->
  <line x1="256" y1="40" x2="256" y2="80" stroke="#f59e0b" stroke-width="14" stroke-linecap="round"/>
  <line x1="256" y1="432" x2="256" y2="472" stroke="#52525b" stroke-width="14" stroke-linecap="round"/>
  <line x1="40" y1="256" x2="80" y2="256" stroke="#52525b" stroke-width="14" stroke-linecap="round"/>
  <line x1="432" y1="256" x2="472" y2="256" stroke="#52525b" stroke-width="14" stroke-linecap="round"/>
</svg>
`;

async function render() {
  await sharp(Buffer.from(svgOption1)).png().toFile(path.join(outDir, 'option_1_spatial_pin.png'));
  await sharp(Buffer.from(svgOption2)).png().toFile(path.join(outDir, 'option_2_typographic_slash.png'));
  await sharp(Buffer.from(svgOption3)).png().toFile(path.join(outDir, 'option_3_compass_beacon.png'));
  console.log('✓ Generated 3 branding options in public/branding/');
}

render().catch(console.error);
