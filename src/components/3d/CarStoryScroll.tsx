"use client";

import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/config/site.config";
import { ShieldCheck, BadgePercent, Banknote, FileCheck, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function CarStoryScroll() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    let isIntersecting = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleScroll = () => {
      if (!isIntersecting || !containerRef.current || ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        if (!containerRef.current) {
          ticking = false;
          return;
        }
        const rect = containerRef.current.getBoundingClientRect();
        const containerHeight = rect.height - window.innerHeight;
        if (containerHeight > 0) {
          const progress = Math.min(Math.max(0, -rect.top / containerHeight), 1);
          const stepIndex = Math.min(
            Math.floor(progress * siteConfig.storySteps.length),
            siteConfig.storySteps.length - 1
          );
          setActiveStep((prev) => (prev !== stepIndex ? stepIndex : prev));
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const storyIcons = [ShieldCheck, BadgePercent, Banknote, FileCheck];

  return (
    <section
      ref={containerRef}
      className="relative h-[220vh] bg-[#06070A] text-white"
    >
      {/* Sticky Showcase Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-6 py-20 z-10">
        {/* Background Visual Studio Perspective */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-radial-vignette opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06070A] via-transparent to-[#06070A]" />
          
          {/* Subtle Dynamic Ambient Lighting per Step */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
              activeStep === 0
                ? "bg-brand-primary/10"
                : activeStep === 1
                ? "bg-brand-accent/10"
                : activeStep === 2
                ? "bg-emerald-500/10"
                : "bg-purple-600/10"
            }`}
          />
        </div>

        {/* Top Header */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-primary font-bold">
              The Journey of Trust
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-display">
              Why India Buys From{" "}
              <span className="text-brand-accent">{siteConfig.brand.name}</span>
            </h2>
          </div>

          {/* Progress Indicators */}
          <div className="hidden sm:flex items-center space-x-2">
            {siteConfig.storySteps.map((step, idx) => (
              <div
                key={step.step}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeStep === idx
                    ? "w-8 bg-brand-primary"
                    : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Center 3D Car Perspective Simulation */}
        <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-center my-auto">
          <div
            className="relative w-full max-w-2xl aspect-[16/9] transition-transform duration-700 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${
                activeStep === 0
                  ? "20deg"
                  : activeStep === 1
                  ? "50deg"
                  : activeStep === 2
                  ? "-40deg"
                  : "0deg"
              }) scale(${activeStep === 3 ? "1.08" : "1.0"})`,
            }}
          >
            <Image
              src={siteConfig.theme.threeD.fallbackPoster}
              alt="Car Story Angle"
              fill
              className="object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            />
            {/* Ground Reflection */}
            <div className="absolute -bottom-8 inset-x-10 h-10 bg-brand-accent/20 blur-xl rounded-full" />
          </div>
        </div>

        {/* Bottom Story Cards Carousel / Fading Steps */}
        <div className="relative z-20 max-w-4xl mx-auto w-full">
          {siteConfig.storySteps.map((step, index) => {
            const Icon = storyIcons[index] || ShieldCheck;
            const isActive = activeStep === index;

            return (
              <div
                key={step.step}
                className={`transition-all duration-500 ${
                  isActive
                    ? "opacity-100 translate-y-0 relative"
                    : "opacity-0 translate-y-4 absolute inset-x-0 pointer-events-none"
                }`}
              >
                <div className="bg-[#0E1017]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center text-brand-primary shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-brand-accent font-mono">
                        {step.badge}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center space-x-3 text-xs font-semibold text-slate-400">
                    <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-mono">
                      0{index + 1}
                    </span>
                    <span className="uppercase tracking-widest text-[10px]">
                      Stage {index + 1} of 4
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
