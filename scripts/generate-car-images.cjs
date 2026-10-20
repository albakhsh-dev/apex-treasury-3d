const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const carsPath = path.join(__dirname, '..', 'data', 'cars.json');
const publicCarsDir = path.join(__dirname, '..', 'public', 'images', 'cars');

const cars = JSON.parse(fs.readFileSync(carsPath, 'utf8'));

function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Angle configs
const angles = [
  {
    num: 1,
    title: 'EXTERIOR PROFILE & STYLING',
    subtitle: 'Studio Front Three-Quarter Angle',
    accentColor: '#D4AF37', // Gold
    badge: '360° INSPECTED EXTERIOR',
  },
  {
    num: 2,
    title: 'COCKPIT & INTERIOR LUXURY',
    subtitle: 'Ergonomic Cabin & Premium Dashboard',
    accentColor: '#38BDF8', // Sky blue
    badge: 'LUXURY CABIN CERTIFIED',
  },
  {
    num: 3,
    title: 'PERFORMANCE & DYNAMICS',
    subtitle: 'Rear Quarter & Powertrain Engineering',
    accentColor: '#34D399', // Emerald
    badge: 'POWERTRAIN VERIFIED',
  },
];

async function generateImages() {
  if (!fs.existsSync(publicCarsDir)) {
    fs.mkdirSync(publicCarsDir, { recursive: true });
  }

  for (const car of cars) {
    const carDir = path.join(publicCarsDir, car.id);
    if (!fs.existsSync(carDir)) {
      fs.mkdirSync(carDir, { recursive: true });
    }

    for (const angle of angles) {
      const outPath = path.join(carDir, `${angle.num}.jpg`);

      const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" width="1200" height="750">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080A0E" />
      <stop offset="50%" stop-color="#11141C" />
      <stop offset="100%" stop-color="#06070A" />
    </linearGradient>
    <radialGradient id="spotlight" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="${angle.accentColor}" stop-opacity="0.18" />
      <stop offset="65%" stop-color="${angle.accentColor}" stop-opacity="0.02" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${angle.accentColor}" stop-opacity="0.1" />
      <stop offset="50%" stop-color="${angle.accentColor}" stop-opacity="1" />
      <stop offset="100%" stop-color="${angle.accentColor}" stop-opacity="0.1" />
    </linearGradient>
  </defs>

  <!-- Background Canvas -->
  <rect width="1200" height="750" fill="url(#bgGrad)" />
  <ellipse cx="600" cy="460" rx="520" ry="160" fill="url(#spotlight)" />

  <!-- Studio Floor Lines -->
  <path d="M 80 540 L 1120 540" stroke="#334155" stroke-width="1.5" stroke-opacity="0.3" stroke-dasharray="8 8" />
  <path d="M 180 580 L 1020 580" stroke="#334155" stroke-width="1" stroke-opacity="0.2" />

  <!-- Top Vehicle Header -->
  <g transform="translate(80, 80)">
    <rect x="0" y="0" width="160" height="28" rx="6" fill="${angle.accentColor}" fill-opacity="0.15" stroke="${angle.accentColor}" stroke-width="1.2" />
    <text x="80" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" letter-spacing="2" fill="${angle.accentColor}" text-anchor="middle">
      ${angle.badge}
    </text>

    <text x="0" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="900" letter-spacing="1" fill="#FFFFFF">
      ${escapeXml(car.year + ' ' + car.brand + ' ' + car.model)}
    </text>

    <text x="0" y="102" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="500" fill="#94A3B8">
      ${escapeXml(car.variant)}
    </text>
  </g>

  <!-- Car Silhouette Illustration -->
  <g transform="translate(100, 110)">
    <!-- Main Body Contour -->
    <path d="M 160 380
             C 190 370, 230 340, 290 330
             C 360 320, 420 230, 490 210
             C 580 188, 680 192, 750 240
             C 800 275, 840 325, 890 350
             C 920 365, 930 380, 930 395
             L 860 395
             C 855 348, 785 348, 780 395
             L 340 395
             C 335 348, 265 348, 260 395
             Z"
          fill="#131722" stroke="${angle.accentColor}" stroke-opacity="0.6" stroke-width="2.5" />

    <!-- Roofline Flow Highlight -->
    <path d="M 330 320
             C 390 275, 440 220, 510 212
             C 590 202, 670 210, 735 248
             C 785 280, 815 320, 845 350"
          fill="none" stroke="url(#accentLine)" stroke-width="3.5" stroke-linecap="round" />

    <!-- Window Glass Frame -->
    <path d="M 420 305
             C 460 252, 500 226, 545 224
             L 665 224
             C 705 238, 740 270, 755 305
             Z"
          fill="#0B0D13" stroke="#475569" stroke-width="1.5" />
    <line x1="560" y1="224" x2="555" y2="305" stroke="#334155" stroke-width="2" />

    <!-- Left Wheel -->
    <g transform="translate(300, 395)">
      <circle cx="0" cy="0" r="50" fill="#0A0C10" stroke="#334155" stroke-width="4.5" />
      <circle cx="0" cy="0" r="36" fill="#1A202C" stroke="${angle.accentColor}" stroke-width="1.5" />
      <circle cx="0" cy="0" r="14" fill="#0A0C10" stroke="${angle.accentColor}" stroke-width="1.5" />
      <line x1="0" y1="-32" x2="0" y2="32" stroke="#64748B" stroke-width="2" />
      <line x1="-30" y1="-10" x2="30" y2="10" stroke="#64748B" stroke-width="2" />
      <line x1="-19" y1="25" x2="19" y2="-25" stroke="#64748B" stroke-width="2" />
    </g>

    <!-- Right Wheel -->
    <g transform="translate(820, 395)">
      <circle cx="0" cy="0" r="50" fill="#0A0C10" stroke="#334155" stroke-width="4.5" />
      <circle cx="0" cy="0" r="36" fill="#1A202C" stroke="${angle.accentColor}" stroke-width="1.5" />
      <circle cx="0" cy="0" r="14" fill="#0A0C10" stroke="${angle.accentColor}" stroke-width="1.5" />
      <line x1="0" y1="-32" x2="0" y2="32" stroke="#64748B" stroke-width="2" />
      <line x1="-30" y1="-10" x2="30" y2="10" stroke="#64748B" stroke-width="2" />
      <line x1="-19" y1="25" x2="19" y2="-25" stroke="#64748B" stroke-width="2" />
    </g>

    <!-- Floor Shadow -->
    <ellipse cx="300" cy="445" rx="55" ry="7" fill="#000000" opacity="0.7" />
    <ellipse cx="820" cy="445" rx="55" ry="7" fill="#000000" opacity="0.7" />
    <rect x="300" y="440" width="520" height="8" fill="#000000" opacity="0.4" />
  </g>

  <!-- Bottom Details Bar -->
  <g transform="translate(80, 620)">
    <rect x="0" y="0" width="1040" height="65" rx="12" fill="#0E121A" stroke="#1E293B" stroke-width="1" />

    <!-- Spec 1: Fuel & Transmission -->
    <text x="35" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#64748B" letter-spacing="1">POWERTRAIN</text>
    <text x="35" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#F1F5F9">${escapeXml(car.fuelType)} • ${escapeXml(car.transmission)}</text>

    <!-- Spec 2: Odometer & Ownership -->
    <text x="320" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#64748B" letter-spacing="1">ODOMETER &amp; RTO</text>
    <text x="320" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#F1F5F9">${escapeXml(car.kilometersFormatted)} • ${escapeXml(car.owners)}</text>

    <!-- Spec 3: Angle View Name -->
    <text x="640" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#64748B" letter-spacing="1">GALLERY VIEW</text>
    <text x="640" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="${angle.accentColor}">Angle ${angle.num} of 3: ${escapeXml(angle.title)}</text>

    <!-- Spec 4: Price Tag -->
    <text x="940" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#64748B" letter-spacing="1">OFFER PRICE</text>
    <text x="940" y="49" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" fill="#38BDF8">${escapeXml(car.priceLakhs)}</text>
  </g>
</svg>
`;

      await sharp(Buffer.from(svg))
        .jpeg({ quality: 90 })
        .toFile(outPath);
    }
    console.log(`Generated 3 dedicated images for ${car.id} (${car.brand} ${car.model})`);
  }
}

generateImages().then(() => {
  console.log('All vehicle images generated successfully!');
}).catch(err => {
  console.error('Error generating images:', err);
  process.exit(1);
});
