const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgOg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .title { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif; font-weight: 800; }
      .text { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", sans-serif; }
      .mono { font-family: ui-monospace, "SF Mono", "Menlo", monospace; }
    </style>
  </defs>

  <!-- Warm Minimalist Linen Canvas -->
  <rect width="1200" height="630" fill="#F8F5EE"/>

  <!-- Subtle Outer Inset Border -->
  <rect x="32" y="32" width="1136" height="566" rx="20" fill="none" stroke="#E5DEC9" stroke-width="1.5"/>

  <!-- Top Left: Subtle Badge -->
  <g transform="translate(88, 88)">
    <circle cx="6" cy="6" r="4" fill="#3E6B56"/>
    <text x="20" y="10" class="mono" font-size="12" font-weight="600" fill="#3E6B56" letter-spacing="2">BENGALURU • CURATED MAP</text>
  </g>

  <!-- Center Content Block -->
  <g transform="translate(88, 160)">
    <!-- Primary Masthead -->
    <text x="0" y="80" class="title" font-size="82" fill="#211C1A" letter-spacing="-3">BLR <tspan fill="#BC5434">//</tspan> EATS</text>

    <!-- Subtitle / Positioning -->
    <text x="0" y="145" class="text" font-size="28" font-weight="500" fill="#544E4B" letter-spacing="-0.5">
      The interactive guide to Bangalore’s iconic food, coffee &amp; breweries.
    </text>

    <!-- Refined Distinctions -->
    <text x="0" y="205" class="text" font-size="18" font-weight="400" fill="#8C847E">
      140+ Cult Destinations • 16 Food Districts • Heritage to Contemporary
    </text>
  </g>

  <!-- Bottom Details Bar -->
  <g transform="translate(88, 510)">
    <!-- Terracotta URL Pill -->
    <rect width="150" height="38" rx="19" fill="#BC5434"/>
    <text x="75" y="24" class="mono" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">blreats.com</text>

    <!-- Secondary Meta -->
    <text x="175" y="24" class="text" font-size="14" font-weight="500" fill="#8C847E">Free &amp; Open Spatial Food Directory</text>
  </g>

  <!-- Right: Minimalist Geometry / Single Elegant Pin -->
  <g transform="translate(900, 245)">
    <!-- Concentric Subtle Orbit Rings -->
    <circle cx="100" cy="100" r="140" fill="none" stroke="#E5DEC9" stroke-width="1" stroke-dasharray="4 6"/>
    <circle cx="100" cy="100" r="95" fill="none" stroke="#E5DEC9" stroke-width="1.5"/>
    <circle cx="100" cy="100" r="50" fill="#FFFFFF" stroke="#E5DEC9" stroke-width="1.5"/>

    <!-- Subtle Crosshair ticks -->
    <line x1="100" y1="-45" x2="100" y2="-25" stroke="#BC5434" stroke-width="2" stroke-linecap="round"/>
    <line x1="100" y1="225" x2="100" y2="245" stroke="#3E6B56" stroke-width="2" stroke-linecap="round"/>
    <line x1="-45" y1="100" x2="-25" y2="100" stroke="#E5DEC9" stroke-width="2" stroke-linecap="round"/>
    <line x1="225" y1="100" x2="245" y2="100" stroke="#E5DEC9" stroke-width="2" stroke-linecap="round"/>

    <!-- Clean Modern Pin -->
    <g transform="translate(100, 100)">
      <circle cx="0" cy="0" r="22" fill="#211C1A"/>
      <circle cx="0" cy="0" r="8" fill="#BC5434"/>
    </g>
  </g>
</svg>
`;

async function run() {
  const publicDir = path.join(__dirname, '../public');
  await sharp(Buffer.from(svgOg)).png().toFile(path.join(publicDir, 'og-image.png'));
  console.log('✓ Generated clean minimalist public/og-image.png (1200x630)');
}

run().catch(console.error);


