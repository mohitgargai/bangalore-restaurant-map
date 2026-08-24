const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgMaster = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
  </defs>
  
  <!-- Base Squircle -->
  <rect width="512" height="512" rx="120" fill="url(#bgGrad)"/>
  <rect x="12" y="12" width="488" height="488" rx="108" fill="none" stroke="#27272a" stroke-width="8"/>
  
  <!-- Compass Radar Ring -->
  <circle cx="256" cy="256" r="150" fill="none" stroke="#27272a" stroke-width="6" stroke-dasharray="10 10"/>
  <circle cx="256" cy="256" r="100" fill="#18181b" stroke="#3f3f46" stroke-width="6"/>
  
  <!-- Crosshairs -->
  <line x1="256" y1="50" x2="256" y2="90" stroke="#f59e0b" stroke-width="12" stroke-linecap="round"/>
  <line x1="256" y1="422" x2="256" y2="462" stroke="#71717a" stroke-width="12" stroke-linecap="round"/>
  <line x1="50" y1="256" x2="90" y2="256" stroke="#71717a" stroke-width="12" stroke-linecap="round"/>
  <line x1="422" y1="256" x2="462" y2="256" stroke="#71717a" stroke-width="12" stroke-linecap="round"/>
  
  <!-- Modern Clean Map Pin -->
  <path d="M256 120 C194 120 144 170 144 232 C144 300 238 396 256 404 C274 396 368 300 368 232 C368 170 318 120 256 120 Z" fill="#ffffff"/>
  
  <!-- Glowing Saffron Core -->
  <circle cx="256" cy="232" r="48" fill="url(#amberGrad)"/>
  <circle cx="256" cy="232" r="24" fill="#ffffff"/>
</svg>
`;

async function run() {
  const publicDir = path.join(__dirname, '../public');
  const appDir = path.join(__dirname, '../src/app');

  // Save SVG
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgMaster, 'utf8');

  // 512x512 Master Web Icon
  const buf512 = await sharp(Buffer.from(svgMaster)).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon.png'), buf512);

  // 180x180 Apple Touch Icon (iOS Home Screen)
  const buf180 = await sharp(Buffer.from(svgMaster)).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), buf180);

  // 32x32 and 16x16 Favicons
  const buf32 = await sharp(Buffer.from(svgMaster)).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), buf32);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), buf32);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), buf32);

  const buf16 = await sharp(Buffer.from(svgMaster)).resize(16, 16).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), buf16);

  console.log('✓ All favicons, Apple touch icons, and web icons generated successfully!');
}

run().catch(console.error);
