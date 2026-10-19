"use client";

import { useState, useRef, Suspense, useEffect } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { CarModel } from "./CarModel";
import { StudioLighting } from "./StudioLighting";
import { HeroLoader } from "./HeroLoader";
import { HeroFallback } from "./HeroFallback";
import { useDeviceCapability } from "@/lib/device";
import { siteConfig } from "@/config/site.config";
import {
  ArrowRight,
  ShieldCheck,
  Search,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function Hero3D() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { canRender3D, isChecking, dpr } = useDeviceCapability();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [rotation, setRotation] = useState(0);

  // Quick Search Bar state
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");

  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setPointer({ x, y });

    if (isDragging) {
      const deltaX = e.clientX - startX;
      setRotation((prev) => prev + deltaX * 0.008);
      setStartX(e.clientX);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedBrand) params.set("brand", selectedBrand);
    if (selectedBudget) params.set("budget", selectedBudget);
    if (selectedFuel) params.set("fuel", selectedFuel);
    router.push(`/inventory?${params.toString()}`);
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative w-full h-[95vh] min-h-[720px] max-h-[1050px] bg-[#08090C] overflow-hidden flex flex-col justify-between pt-24 pb-8"
    >
      {/* 1. Behind-Car Huge 3D Depth Typography */}
      <div className="absolute inset-x-0 top-1/4 -translate-y-1/2 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden">
        <h1 className="text-[17vw] font-black uppercase tracking-tighter text-white/[0.035] font-display whitespace-nowrap text-center leading-none">
          {siteConfig.brand.logoText}
        </h1>
      </div>

      {/* Atmospheric Ambient Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-primary/15 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-brand-accent/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* 2. 3D WebGL Canvas or Fallback View */}
      <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
        {isChecking ? (
          <HeroLoader />
        ) : canRender3D ? (
          <Suspense fallback={<HeroLoader />}>
            <Canvas
              shadows
              frameloop={isInView ? "always" : "never"}
              dpr={dpr}
              camera={{ position: [0, 1.1, 5.2], fov: 42 }}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              className="w-full h-full"
            >
              <StudioLighting />
              <CarModel
                pointerPosition={pointer}
                isDragging={isDragging}
                manualRotation={rotation}
              />
            </Canvas>
          </Suspense>
        ) : (
          <HeroFallback />
        )}
      </div>

      {/* 3. Top Foreground Copy (Header Overlay) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-4 pointer-events-none">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold text-slate-200">
              175-Point Certified Pre-Owned
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-display leading-[1.05]">
            Experience The Pinnacle of{" "}
            <span className="bg-gradient-to-r from-brand-primary via-white to-brand-accent bg-clip-text text-transparent">
              Automotive Luxury
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg pointer-events-auto">
            Forensically inspected, guaranteed non-accidental, and delivered with 1-year warranty and effortless nationwide RTO registration.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 pointer-events-auto">
            <Link
              href="/inventory"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold text-sm tracking-wide shadow-luxury-glow transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <span>Explore 12 Certified Cars</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/sell"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm tracking-wide border border-white/15 backdrop-blur-md transition-all duration-200 hover:border-white/30"
            >
              <span>Sell In 45 Mins</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Interactive Drag Hint on Desktop */}
      <div className="relative z-20 text-center pointer-events-none hidden md:block">
        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/5">
          ↔ Drag to Rotate Car & Explore Aerodynamics
        </span>
      </div>

      {/* 5. Bottom Floating Quick Search Bar */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 w-full">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-[#0E1017]/90 backdrop-blur-2xl border border-white/15 rounded-2xl p-3 sm:p-4 shadow-glass-card grid grid-cols-1 sm:grid-cols-4 gap-3 items-center"
        >
          {/* Brand Selector */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block px-1">
              Brand
            </label>
            <div className="relative">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-sm text-white appearance-none focus:outline-none focus:border-brand-primary transition-colors cursor-pointer"
              >
                <option value="" className="bg-[#0E1017] text-white">All Brands</option>
                <option value="Mahindra" className="bg-[#0E1017] text-white">Mahindra</option>
                <option value="Hyundai" className="bg-[#0E1017] text-white">Hyundai</option>
                <option value="Tata" className="bg-[#0E1017] text-white">Tata</option>
                <option value="Toyota" className="bg-[#0E1017] text-white">Toyota</option>
                <option value="Honda" className="bg-[#0E1017] text-white">Honda</option>
                <option value="Kia" className="bg-[#0E1017] text-white">Kia</option>
                <option value="Maruti Suzuki" className="bg-[#0E1017] text-white">Maruti Suzuki</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Budget Selector */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block px-1">
              Budget
            </label>
            <div className="relative">
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-sm text-white appearance-none focus:outline-none focus:border-brand-primary transition-colors cursor-pointer"
              >
                <option value="" className="bg-[#0E1017] text-white">Any Budget</option>
                <option value="under5" className="bg-[#0E1017] text-white">Under ₹5 Lakh</option>
                <option value="5to10" className="bg-[#0E1017] text-white">₹5 Lakh - ₹10 Lakh</option>
                <option value="10to15" className="bg-[#0E1017] text-white">₹10 Lakh - ₹15 Lakh</option>
                <option value="above15" className="bg-[#0E1017] text-white">Above ₹15 Lakh</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Fuel Type */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block px-1">
              Fuel Type
            </label>
            <div className="relative">
              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-sm text-white appearance-none focus:outline-none focus:border-brand-primary transition-colors cursor-pointer"
              >
                <option value="" className="bg-[#0E1017] text-white">All Fuels</option>
                <option value="Petrol" className="bg-[#0E1017] text-white">Petrol</option>
                <option value="Diesel" className="bg-[#0E1017] text-white">Diesel</option>
                <option value="Electric" className="bg-[#0E1017] text-white">Electric</option>
                <option value="Hybrid" className="bg-[#0E1017] text-white">Hybrid</option>
                <option value="CNG" className="bg-[#0E1017] text-white">CNG</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Search Button */}
          <div className="pt-4 sm:pt-5">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold text-sm tracking-wide shadow-luxury-glow flex items-center justify-center space-x-2 transition-all active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>Search Cars</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
