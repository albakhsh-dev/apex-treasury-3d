/**
 * WHITE-LABEL SITE CONFIGURATION
 * -------------------------------------------------------------
 * This is the SINGLE SOURCE OF TRUTH for the entire dealership platform.
 * Editing this file rebrands every aspect of the website:
 * - Brand name, logo, tagline, and badges
 * - Contact information, WhatsApp lead links, phone, and address
 * - Business hours and Google Maps embed
 * - Brand colors (injected dynamically as CSS variables)
 * - 3D Hero Car paint color and lighting style
 * - SEO meta tags, OpenGraph data, and Schema.org JSON-LD structured data
 * - Social profiles, statistics, client reviews, and About content
 *
 * NOTE: DO NOT hardcode any business names or contacts in any React components.
 * Always import and reference this config object.
 */

export const siteConfig = {
  // Brand Identity
  brand: {
    name: "Your Dealership",
    shortName: "YD Motors",
    tagline: "Drive Your Dream.",
    subTagline: "India's Most Trusted Luxury & Certified Pre-Owned Automobile Destination",
    logoText: "YOUR DEALERSHIP",
    logoAccent: "MOTORS",
    logoIcon: "ShieldCheck", // Lucide icon name
    establishedYear: 2012,
    yearsInBusiness: 12,
    licenseNumber: "DL-RTO-CERT-2024-8842",
  },

  // Contact & Localization (India Format)
  contact: {
    phone: "+91 98765 43210",
    phoneRaw: "+919876543210",
    whatsappNumber: "919876543210", // wa.me target without '+'
    whatsappDisplay: "+91 98765 43210",
    email: "contact@yourdealership.in",
    salesEmail: "sales@yourdealership.in",
    supportEmail: "support@yourdealership.in",
    address: {
      line1: "Plot 42, Premium Auto Hub",
      line2: "Main Road, Automotive District",
      city: "Your City",
      state: "Your State",
      pincode: "000000",
      full: "Plot 42, Premium Auto Hub, Main Road, Your City, Your State 000000",
    },
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114827173315!2d77.2090!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjAiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
    workingHours: {
      weekdays: "9:30 AM – 7:30 PM",
      saturday: "9:30 AM – 8:00 PM",
      sunday: "10:00 AM – 5:00 PM",
      displayShort: "Mon - Sat: 9:30 AM - 7:30 PM | Sun: 10:00 AM - 5:00 PM",
    },
  },

  // Dynamic Theme & 3D Materials (injected into CSS vars and WebGL shaders)
  theme: {
    // Primary brand identity (e.g., Luxury Red / Amber / Cyber Gold)
    primary: "#E11D48", // Rose Red
    primaryHover: "#BE123C",
    primaryGlow: "rgba(225, 29, 72, 0.4)",

    // Secondary deep contrast tone
    secondary: "#0F172A", // Deep Slate
    secondaryHover: "#1E293B",

    // High-tech accent highlight (Glows, badges, subtle lasers)
    accent: "#00F0FF", // Electric Cyan / Hyper Teal
    accentGlow: "rgba(0, 240, 255, 0.35)",

    // Dark cinematic canvas tones
    background: "#08090C", // Pure Onyx Canvas
    backgroundElevated: "#0E1017", // Card Surface
    backgroundGlass: "rgba(14, 16, 23, 0.75)",
    border: "rgba(255, 255, 255, 0.08)",
    borderHover: "rgba(225, 29, 72, 0.4)",

    // Typography colors
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    textMuted: "#64748B",

    // 3D Car Model Paint & Studio Settings
    threeD: {
      // Body paint color applied to the 3D car's PBR coat shader
      carPaintColor: "#0D0E12", // Deep Metallic Onyx (can be #8B0000 Crimson or #1E3A8A Midnight Navy)
      carPaintRoughness: 0.22,
      carPaintMetalness: 0.88,
      carPaintClearcoat: 1.0,
      carPaintClearcoatRoughness: 0.1,
      // Floor & Studio setup
      floorReflectivity: 0.6,
      ambientLightIntensity: 0.5,
      spotlightColor: "#FFFFFF",
      rimLightColor: "#00F0FF",
      modelPath: "/models/hero-car.glb",
      fallbackPoster: "/images/hero-car-poster.webp",
    },
  },

  // Social Channels
  socials: {
    instagram: "https://instagram.com/yourdealership",
    facebook: "https://facebook.com/yourdealership",
    youtube: "https://youtube.com/@yourdealership",
    linkedin: "https://linkedin.com/company/yourdealership",
    twitter: "https://x.com/yourdealership",
    whatsapp: "https://wa.me/919876543210",
  },

  // Dealership Metrics & Verified Proof
  stats: [
    { label: "Certified Cars Sold", value: 1850, suffix: "+", description: "Delivered across India with spotless RC transfer" },
    { label: "Happy Drivers", value: 2400, suffix: "+", description: "Rated 4.9/5 stars on customer satisfaction" },
    { label: "Quality Checkpoints", value: 175, suffix: " Pts", description: "Multi-point certified diagnostic inspection" },
    { label: "Years of Trust", value: 12, suffix: "+ Years", description: "Serving automotive enthusiasts since 2012" },
  ],

  // Value Proposition / "Why Choose Us"
  features: [
    {
      id: "certified",
      icon: "ShieldCheck",
      title: "175-Point Diagnostic Check",
      description: "Every vehicle undergoes exhaustive physical, mechanical, and OBD computer scans by certified technicians.",
    },
    {
      id: "pricing",
      icon: "BadgePercent",
      title: "Transparent Fixed Pricing",
      description: "No hidden charges, no sudden dealer fees. The price you see is the final drive-away price.",
    },
    {
      id: "finance",
      icon: "Banknote",
      title: "Instant Low-EMI Financing",
      description: "Partnered with 15+ top Indian banks (HDFC, ICICI, SBI) for instant approvals down to 8.25% ROI.",
    },
    {
      id: "paperwork",
      icon: "FileCheck",
      title: "Hassle-Free RC Transfer",
      description: "Complete ownership transfer, NOC generation, and documentation handled entirely by our in-house RTO team.",
    },
    {
      id: "warranty",
      icon: "Award",
      title: "1-Year Comprehensive Warranty",
      description: "Includes 12 months comprehensive powertrain warranty and 24/7 nationwide roadside assistance.",
    },
    {
      id: "buyback",
      icon: "RefreshCw",
      title: "7-Day Money-Back Guarantee",
      description: "Drive your car for up to 7 days or 300 kms. If it doesn't fit your dream, return it for a 100% refund.",
    },
  ],

  // Scroll Storytelling Milestones (3D Hero Pinned Steps)
  storySteps: [
    {
      step: 1,
      badge: "ENGINEERED PERFECTION",
      title: "175-Point Quality Assurance",
      subtitle: "Aerodynamic precision meets forensic inspection. Engine, transmission, chassis, and electronics thoroughly certified.",
      cameraPosition: { x: 0, y: 1.2, z: 4.8 },
      cameraTarget: { x: 0, y: 0.5, z: 0 },
    },
    {
      step: 2,
      badge: "ABSOLUTE INTEGRITY",
      title: "Zero Hidden Charges, Transparent Pricing",
      subtitle: "We believe buying a luxury automobile should be as pure as the drive itself. Full service records provided.",
      cameraPosition: { x: 3.8, y: 1.0, z: 2.2 },
      cameraTarget: { x: 0, y: 0.4, z: 0 },
    },
    {
      step: 3,
      badge: "EFFORTLESS ONBOARDING",
      title: "Tailored Low-EMI Financing",
      subtitle: "Flexible down-payment structures and customized repayment tenures from India's most reputable private and nationalized lenders.",
      cameraPosition: { x: 2.2, y: 1.5, z: -3.8 },
      cameraTarget: { x: 0, y: 0.5, z: 0 },
    },
    {
      step: 4,
      badge: "WHITE-GLOVE SERVICE",
      title: "Doorstep Delivery & Complete Paperwork",
      subtitle: "From RTO registration to instant NOC and doorstep delivery anywhere in the country with red-carpet handoff.",
      cameraPosition: { x: -3.2, y: 1.1, z: 2.5 },
      cameraTarget: { x: 0, y: 0.5, z: 0 },
    },
  ],

  // Customer Reviews / Testimonials
  reviews: [
    {
      id: 1,
      name: "Rajesh Malhotra",
      designation: "Tech Entrepreneur, Bangalore",
      rating: 5,
      carBought: "2021 BMW 3 Series Gran Limousine",
      comment:
        "The buying experience at Your Dealership was nothing short of extraordinary. The 175-point certification was meticulous, and they delivered the car right to my villa with all RTO papers sorted in 3 days.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      name: "Pooja Singhania",
      designation: "Architect & Partner, Mumbai",
      rating: 5,
      carBought: "2022 Hyundai Tucson Signature",
      comment:
        "Transparent pricing, zero pushy salesmanship, and incredible finance guidance. The 360 degree virtual tour gave me complete confidence before stepping into the showroom.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      name: "Vikramaditya Rao",
      designation: "Managing Director, Hyderabad",
      rating: 5,
      carBought: "2023 Toyota Fortuner Legender 4x4",
      comment:
        "Sold my old car within 45 minutes on WhatsApp with a fair market valuation, and upgraded to a pristine Fortuner. Highly recommended for busy executives who value their time.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
  ],

  // About Page Narrative & Timeline
  about: {
    heroHeading: "Redefining the Luxury Pre-Owned Automotive Experience",
    heroDescription:
      "Founded with a singular mission: to eliminate ambiguity, provide uncompromised engineering quality, and make owning a luxury car in India an exhilarating, transparent journey.",
    mission:
      "To be the gold standard of automobile retail by combining digital innovation, forensic vehicle evaluation, and white-glove customer hospitality.",
    vision:
      "A world where buying a pre-owned luxury or certified vehicle feels just as prestigious, secure, and celebratory as driving a brand-new car off the showroom floor.",
    timeline: [
      { year: "2012", title: "Inception", description: "Founded with a curated collection of 10 certified sports cars and a commitment to zero-compromise transparency." },
      { year: "2016", title: "State-of-the-Art Diagnostics", description: "Inaugurated our 15,000 sq.ft diagnostic workshop equipped with computerized laser wheel alignment and paint depth gauges." },
      { year: "2020", title: "Digital-First Showroom", description: "Pioneered high-definition 360-degree digital inspection tours and 100% remote contactless car booking." },
      { year: "2024", title: "1,800+ Milestone", description: "Crossed 1,850+ luxury deliveries across 24 Indian states with a spotless 100% RC transfer compliance rate." },
    ],
    leadership: [
      {
        name: "Arjun Vardhan",
        role: "Managing Director & Co-Founder",
        bio: "Former automotive engineer with 18+ years of expertise in luxury vehicle diagnostics and dealership management.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Ananya Deshmukh",
        role: "Head of Customer Experience & Finance",
        bio: "Specialist in automotive fintech with extensive banking partnerships across HDFC, ICICI, and Kotak Prime.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Devendra Rawat",
        role: "Chief Technical Inspector",
        bio: "Certified master technician supervising our 175-point physical and OBD computerized inspection protocol.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
      },
    ],
  },

  // SEO & Structured Metadata
  seo: {
    siteTitle: "Your Dealership | Luxury & Certified Pre-Owned Cars in India",
    titleTemplate: "%s | Your Dealership",
    description:
      "Explore verified luxury & certified pre-owned cars with 175-point quality inspection, instant low-EMI financing, 1-year warranty, and doorstep delivery across India.",
    keywords: [
      "luxury cars india",
      "certified pre-owned cars",
      "second hand luxury cars",
      "used BMW Mercedes Audi India",
      "best car dealership",
      "car finance low emi",
      "buy verified cars online",
    ],
    siteUrl: "https://www.yourdealership.in",
    ogImage: "/images/og-preview.jpg",
    twitterHandle: "@yourdealership",
  },
};

export default siteConfig;
