"use client";

import { useEffect, useState, useRef } from "react";
import { siteConfig } from "@/config/site.config";

export function StatsCounter() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-16 bg-[#0B0D12] border-y border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {siteConfig.stats.map((stat, idx) => (
            <CounterCard
              key={idx}
              stat={stat}
              startCounting={isVisible}
              delay={idx * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CounterCard({
  stat,
  startCounting,
  delay,
}: {
  stat: { label: string; value: number; suffix: string; description: string };
  startCounting: boolean;
  delay: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let start = 0;
    const duration = 1800;
    const steps = 60;
    const increment = stat.value / steps;
    const intervalTime = duration / steps;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        start += increment;
        if (start >= stat.value) {
          setCount(stat.value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, intervalTime);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [startCounting, stat.value, delay]);

  return (
    <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand-primary/30 transition-colors">
      <div className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight flex items-baseline">
        <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          {count.toLocaleString("en-IN")}
        </span>
        <span className="text-xl sm:text-2xl text-brand-primary ml-1 font-bold">
          {stat.suffix}
        </span>
      </div>
      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-accent mt-2">
        {stat.label}
      </h4>
      <p className="text-[11px] text-slate-400 mt-1 max-w-[200px] leading-relaxed">
        {stat.description}
      </p>
    </div>
  );
}
