"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { Sparkles, Zap } from "lucide-react";

export function HeroFallback() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: -y * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-center justify-center overflow-hidden perspective-1000"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-[#08090C]/80 z-10" />

      {/* Behind-Car Huge 3D Depth Typography */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
        <span className="text-[14vw] font-black tracking-tighter uppercase text-white/[0.04] font-display whitespace-nowrap">
          {siteConfig.brand.logoText}
        </span>
      </div>

      {/* Cinematic Car Poster with CSS 3D Perspective Tilt */}
      <div
        className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden transition-transform duration-200 ease-out z-10 shadow-2xl"
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.02)`,
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src={siteConfig.theme.threeD.fallbackPoster}
          alt={siteConfig.brand.name}
          fill
          priority
          className="object-cover object-center filter contrast-105 brightness-95"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />

        {/* Cinematic Rim Light & Floor Reflections */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 via-transparent to-brand-accent/20 mix-blend-screen pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#08090C] via-[#08090C]/60 to-transparent" />
      </div>

      {/* Low-End Detection Badge Indicator */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 font-medium">
        <Zap className="w-3.5 h-3.5 text-amber-400" />
        <span>Performance Mode Active</span>
      </div>
    </div>
  );
}
