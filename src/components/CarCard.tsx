"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { formatINR, formatLakhs, formatKM, createWhatsAppLeadLink } from "@/lib/formatters";
import {
  Fuel,
  Gauge,
  Sparkles,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Zap,
} from "lucide-react";

export interface CarItem {
  id: string;
  slug: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  priceFormatted: string;
  priceLakhs: string;
  emiPerMonth: number;
  fuelType: string;
  transmission: string;
  kilometers: number;
  kilometersFormatted: string;
  owners: string;
  rto: string;
  color: string;
  engine: string;
  power: string;
  torque: string;
  mileage: string;
  groundClearance: string;
  seatingCapacity: string;
  insuranceValidity: string;
  featured: boolean;
  status: "available" | "sold";
  badge?: string;
  thumbnail: string;
  images: string[];
  images360?: string[];
  inspectionHighlights?: { part: string; score: number; status: string }[];
  description: string;
}

interface CarCardProps {
  car: CarItem;
}

export function CarCard({ car }: CarCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgSrc, setImgSrc] = useState(car.thumbnail || "/images/placeholder-car.svg");
  const isSold = car.status === "sold";
  const animFrameRef = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const clientX = e.clientX;
    const clientY = e.clientY;
    requestAnimationFrame(() => {
      const rect = target.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: x * 8, y: -y * 8 });
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const whatsappMessage = `Hi ${siteConfig.brand.name}, I am interested in the ${car.year} ${car.brand} ${car.model} ${car.variant} (${car.priceFormatted}) listed on your website. Is it available for a test drive?`;
  const whatsappUrl = createWhatsAppLeadLink(
    siteConfig.contact.whatsappNumber,
    whatsappMessage
  );

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl bg-[#0E1017]/90 border border-white/10 hover:border-brand-primary/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-luxury-glow flex flex-col justify-between"
      style={{
        transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
        <Image
          src={imgSrc}
          alt={`${car.year} ${car.brand} ${car.model}`}
          fill
          onError={() => setImgSrc("/images/placeholder-car.svg")}
          className={`object-cover object-center group-hover:scale-105 transition-transform duration-500 ${
            isSold ? "grayscale contrast-125 opacity-60" : ""
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Shading Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017] via-transparent to-black/30" />

        {/* Status / Feature Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {isSold ? (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-950/90 text-rose-300 border border-rose-500/40">
              Sold Out
            </span>
          ) : car.badge ? (
            <span
              className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                car.badge === "New Arrival"
                  ? "bg-brand-primary/80 text-white border-brand-primary"
                  : car.badge === "Hot Deal"
                  ? "bg-amber-500/80 text-black border-amber-400 font-black"
                  : "bg-brand-accent/20 text-brand-accent border-brand-accent/40"
              }`}
            >
              {car.badge}
            </span>
          ) : null}

          {car.images360 && car.images360.length > 0 && !isSold && (
            <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 text-brand-accent border border-brand-accent/40 backdrop-blur-md flex items-center">
              <Sparkles className="w-3 h-3 mr-1" />
              360° Tour
            </span>
          )}
        </div>

        {/* Year & Owner Tag */}
        <div className="absolute bottom-3 left-3 text-[11px] font-medium text-slate-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
          {car.year} • {car.owners}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Brand & Model Title */}
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {car.brand}
              </span>
              <h3 className="text-lg font-bold text-white font-display group-hover:text-brand-accent transition-colors leading-snug">
                {car.model}{" "}
                <span className="text-xs font-normal text-slate-400 block truncate max-w-[220px]">
                  {car.variant}
                </span>
              </h3>
            </div>
            <div className="text-right">
              <span className="text-base font-black text-white font-display block">
                {formatINR(car.price)}
              </span>
              <span className="text-[11px] text-brand-primary font-semibold block">
                {car.priceLakhs}
              </span>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-2 pt-3 text-xs text-slate-300">
            <div className="bg-white/5 rounded-lg p-2 flex flex-col items-center justify-center text-center">
              <Gauge className="w-3.5 h-3.5 text-brand-primary mb-1" />
              <span className="text-[10px] text-slate-400">Mileage</span>
              <span className="font-semibold text-[11px]">{formatKM(car.kilometers)}</span>
            </div>
            <div className="bg-white/5 rounded-lg p-2 flex flex-col items-center justify-center text-center">
              <Fuel className="w-3.5 h-3.5 text-brand-accent mb-1" />
              <span className="text-[10px] text-slate-400">Fuel</span>
              <span className="font-semibold text-[11px]">{car.fuelType}</span>
            </div>
            <div className="bg-white/5 rounded-lg p-2 flex flex-col items-center justify-center text-center">
              <Zap className="w-3.5 h-3.5 text-amber-400 mb-1" />
              <span className="text-[10px] text-slate-400">Gearbox</span>
              <span className="font-semibold text-[11px]">{car.transmission}</span>
            </div>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
              Estimated EMI
            </span>
            <span className="text-xs font-bold text-emerald-400">
              ₹{car.emiPerMonth.toLocaleString("en-IN")}/mo
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            {!isSold && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/30 transition-all active:scale-95"
                title="WhatsApp about this car"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            )}

            <Link
              href={`/cars/${car.id}`}
              className="px-3.5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-semibold tracking-wider uppercase flex items-center space-x-1 transition-all shadow-md group-hover:shadow-luxury-glow"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
