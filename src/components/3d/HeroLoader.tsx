"use client";

import { useProgress } from "@react-three/drei";
import { siteConfig } from "@/config/site.config";
import { Gauge } from "lucide-react";

export function HeroLoader() {
  const { progress } = useProgress();

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#08090C]/90 backdrop-blur-md">
      <div className="flex flex-col items-center space-y-4 max-w-xs w-full px-6 text-center">
        {/* RPM / Speedometer style icon */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-white/5 animate-pulse">
            <Gauge className="w-7 h-7 text-brand-primary" />
          </div>
          <div className="absolute -inset-1 rounded-full border border-brand-accent/40 animate-ping opacity-25" />
        </div>

        {/* Brand loading text */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-white">
            {siteConfig.brand.name}
          </h3>
          <p className="text-[10px] tracking-wider text-slate-400 uppercase mt-0.5">
            Calibrating 3D Showroom Experience
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden p-0">
          <div
            className="h-full bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary transition-all duration-200"
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <span className="text-xs font-mono font-bold text-brand-accent">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
