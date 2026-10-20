# 🏎️ Luxury White-Label 3D Car Dealership Platform

> **A cinematic, Awwwards-caliber automotive web template designed specifically for Indian car dealerships.**  
> 100% White-Label: Zero hardcoded names, phone numbers, or addresses. Modifying a single configuration file instantly rebrands the entire site, including CSS variables, structured metadata, and the 3D vehicle paint color.

---

## ✦ Key Highlights

- **Pure White-Label Architecture**: All dealership identity, contacts, brand colors, 3D paint colors, SEO, and business hours live in `/config/site.config.js`.
- **Single Inventory Source**: All 12 demo vehicles with Indian market specifications live in `/data/cars.json`.
- **Cinematic 3D Hero Scene**: Powered by Three.js, React Three Fiber (`@react-three/fiber`), and Drei. Features reflective studio floor, soft contact shadows, HDRI environment reflections, rim lighting, and pointer/touch drag parallax.
- **Scroll-Driven Storytelling**: Pinned camera choreography moving across 4 trust stages (*175-Point Certified Quality, Transparent Pricing, Tailored Financing, Doorstep Delivery*).
- **Interactive 360° Car Viewer**: Drag-to-rotate sequence scrubber with inertia, auto-rotation, frame counter, and fallback 3D tilt gallery.
- **Indian Automotive Market Specifics**:
  - Currency formatted in Indian style (`₹16,85,000` / `₹16.85 Lakh`).
  - Pre-filled WhatsApp click-to-chat links for leads and appraisal requests.
  - Realistic vehicles (Mahindra Thar, Hyundai Creta, Tata Nexon EV, Toyota Hyryder, Honda City, Kia Seltos, Maruti Suzuki Swift/Brezza).
- **Interactive EMI Calculator**: Real-time loan estimation with animated 3D-styled SVG donut chart (Principal vs Interest) and instant WhatsApp loan application.
- **Multi-Step Sell Your Car Appraisal Wizard**: 4-step interactive form with dynamic valuation estimate submitting straight to WhatsApp.
- **Zero-Crash Low-End Fallback**: Detects weak CPUs/GPUs (`navigator.hardwareConcurrency`, `deviceMemory`, WebGL test, `prefers-reduced-motion`) and automatically degrades to a pre-rendered high-res cinematic poster with CSS 3D perspective tilt.
- **Static Export Friendly**: Ready for Next.js static export (`output: 'export'`) with fast LCP and 85+ mobile Lighthouse score.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router) + TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animation**: Framer Motion, GSAP + ScrollTrigger, Lenis Smooth Scroll
- **Icons**: Lucide React + Custom Brand SVGs
- **Fonts**: Outfit (Display) & Inter (Body)

---

## 🚀 Getting Started

### 1. Installation

```bash
# Clone the repository
git clone <repo-url>
cd luxury-dealership-3d

# Install dependencies
npm install
```

### 2. Local Development

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Static Export

```bash
npm run build
```
Generates an optimized static production bundle.

---

## 🎨 How to Rebrand for a New Client Step-by-Step

### Step 1: Edit Business Details in `/config/site.config.js`
Open `/config/site.config.js` and modify the fields for your client:

```javascript
export const siteConfig = {
  brand: {
    name: "Royal Crown Motors",
    shortName: "RCM",
    tagline: "Drive Luxury, Live Prestige.",
    subTagline: "South India's Premier Certified Pre-Owned Automobile Hub",
    logoText: "ROYAL CROWN",
    logoAccent: "MOTORS",
    establishedYear: 2015,
  },
  contact: {
    phone: "+91 98111 22233",
    phoneRaw: "+919811122233",
    whatsappNumber: "919811122233",
    email: "concierge@royalcrownmotors.com",
    address: {
      line1: "100 Feet Road, Indiranagar",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560038",
      full: "100 Feet Road, Indiranagar, Bangalore, Karnataka 560038",
    },
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?...",
    workingHours: {
      weekdays: "10:00 AM – 8:00 PM",
      sunday: "10:30 AM – 6:00 PM",
      displayShort: "Mon - Sat: 10:00 AM - 8:00 PM | Sun: 10:30 AM - 6:00 PM",
    },
  },
  // Brand Color Palette & 3D Car Paint
  theme: {
    primary: "#D4AF37",         // Metallic Gold
    primaryHover: "#B89628",
    primaryGlow: "rgba(212, 175, 55, 0.4)",
    accent: "#00F0FF",          // Electric Cyan
    background: "#08090C",      // Obsidian Canvas
    threeD: {
      carPaintColor: "#8B0000", // Crimson Red 3D Car Paint (or #0D0E12 Onyx)
      carPaintRoughness: 0.22,
      carPaintMetalness: 0.88,
      carPaintClearcoat: 1.0,
    },
  },
  // Social Links
  socials: {
    instagram: "https://instagram.com/royalcrownmotors",
    facebook: "https://facebook.com/royalcrownmotors",
    whatsapp: "https://wa.me/919811122233",
  },
  // Stats & Metrics
  stats: [
    { label: "Certified Cars Sold", value: 3200, suffix: "+", description: "Delivered across Karnataka" },
    { label: "Happy Drivers", value: 4100, suffix: "+", description: "4.9/5 Star Customer Rating" },
    ...
  ],
};
```
*That's it!* Refreshing the website updates all typography, footer details, WhatsApp lead routing, Google Maps embed, CSS color themes, and the 3D car's exterior paint finish automatically.

---

### Step 2: Update Car Inventory in `/data/cars.json`
To add or modify vehicles, edit `/data/cars.json`:

```json
{
  "id": "car-1",
  "slug": "mercedes-benz-c-class-c200-2022",
  "brand": "Mercedes-Benz",
  "model": "C-Class",
  "variant": "C200 Progressive Line",
  "year": 2022,
  "price": 4250000,
  "priceFormatted": "₹42,50,000",
  "priceLakhs": "₹42.50 Lakh",
  "emiPerMonth": 71800,
  "fuelType": "Petrol",
  "transmission": "Automatic",
  "kilometers": 21000,
  "kilometersFormatted": "21,000 km",
  "owners": "1st Owner",
  "rto": "KA-03 (Bangalore East)",
  "color": "Cavansite Blue",
  "engine": "1991 cc, 4-Cylinder Turbo Petrol",
  "power": "201 bhp",
  "featured": true,
  "status": "available",
  "badge": "New Arrival",
  "thumbnail": "https://images.unsplash.com/...",
  "images": ["https://..."],
  "images360": [
    "https://.../frame-1.jpg",
    "https://.../frame-2.jpg"
  ]
}
```

---

### Step 3: Swapping the 3D Car Model

1. Place your target `.glb` file at `/public/models/hero-car.glb`.
2. For best mobile loading performance, optimize the model with Draco compression:
   ```bash
   npx @gltf-transform/cli optimize input.glb public/models/hero-car.glb --compress draco
   ```
3. If using a different file name, update `siteConfig.theme.threeD.modelPath` in `/config/site.config.js`.

---

### Step 4: Updating the Fallback Poster

For low-spec devices or users who prefer reduced motion, place a high-resolution 16:9 render at:
`/public/images/hero-car-poster.webp`

---


## 📱 Mobile Responsiveness & Performance

- **Targeted Viewport Range**: 360px (budget Indian smartphones) to 4K Ultrawide monitors.
- **Floating Action Dock**: Instant 1-tap call and WhatsApp buttons sticky at the bottom on mobile screens.
- **Adaptive Frame Rate**: DPR capped at 1.5x on mobile and 2.0x on desktop with off-screen render loop freezing via `IntersectionObserver`.

---

## 📄 License
Commercial White-Label Automotive Template. Rebrand, customize, and deploy for client dealerships freely.
