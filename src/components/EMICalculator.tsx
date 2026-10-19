"use client";

import { useState, useMemo } from "react";
import { siteConfig } from "@/config/site.config";
import { formatINR, calculateEMI, createWhatsAppLeadLink } from "@/lib/formatters";
import {
  Banknote,
  Percent,
  Calendar,
  Wallet,
  Sparkles,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

interface EMICalculatorProps {
  initialPrice?: number;
  carTitle?: string;
}

export function EMICalculator({
  initialPrice = 1450000,
  carTitle = "Certified Vehicle",
}: EMICalculatorProps) {
  const [carPrice, setCarPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [tenureMonths, setTenureMonths] = useState(48);
  const [interestRate, setInterestRate] = useState(9.5);

  const downPaymentAmount = useMemo(() => {
    return Math.round((carPrice * downPaymentPercent) / 100);
  }, [carPrice, downPaymentPercent]);

  const loanAmount = useMemo(() => {
    return Math.max(0, carPrice - downPaymentAmount);
  }, [carPrice, downPaymentAmount]);

  const calculation = useMemo(() => {
    return calculateEMI(loanAmount, interestRate, tenureMonths);
  }, [loanAmount, interestRate, tenureMonths]);

  // Donut SVG circumference math
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const principalDash = (circumference * calculation.principalPercentage) / 100;
  const interestDash = (circumference * calculation.interestPercentage) / 100;

  const whatsappMessage = `Hi ${siteConfig.brand.name}, I would like to apply for car finance on ${carTitle}. Loan Amount: ${formatINR(loanAmount)}, Down Payment: ${formatINR(downPaymentAmount)}, Tenure: ${tenureMonths} Months. Estimated EMI: ${formatINR(calculation.monthlyEMI)}/month.`;
  const whatsappUrl = createWhatsAppLeadLink(
    siteConfig.contact.whatsappNumber,
    whatsappMessage
  );

  return (
    <div className="w-full rounded-3xl bg-[#0E1017]/95 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-white/10 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-primary font-bold">
            Transparent Car Financing
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
            Interactive EMI Calculator
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Instant approvals with 15+ top Indian banking partners starting from 8.25% p.a.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold w-fit">
          <ShieldCheck className="w-4 h-4" />
          <span>Zero Processing Fee on Select Banks</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8">
        {/* Sliders Left Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Slider 1: Vehicle Price */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 font-medium flex items-center">
                <Wallet className="w-4 h-4 mr-2 text-brand-primary" />
                Vehicle Price
              </span>
              <span className="text-base font-black text-white font-display">
                {formatINR(carPrice)}
              </span>
            </div>
            <input
              type="range"
              min="200000"
              max="5000000"
              step="25000"
              value={carPrice}
              onChange={(e) => setCarPrice(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>₹2 Lakh</span>
              <span>₹25 Lakh</span>
              <span>₹50 Lakh</span>
            </div>
          </div>

          {/* Slider 2: Down Payment */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 font-medium flex items-center">
                <Banknote className="w-4 h-4 mr-2 text-brand-accent" />
                Down Payment ({downPaymentPercent}%)
              </span>
              <span className="text-base font-black text-white font-display">
                {formatINR(downPaymentAmount)}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-accent"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>10% (Min)</span>
              <span>40%</span>
              <span>80% (Max)</span>
            </div>
          </div>

          {/* Slider 3: Loan Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 font-medium flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-amber-400" />
                Loan Tenure
              </span>
              <span className="text-base font-black text-white font-display">
                {tenureMonths} Months ({Math.round(tenureMonths / 12)} Years)
              </span>
            </div>
            <input
              type="range"
              min="12"
              max="84"
              step="6"
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>12 Mos (1 Yr)</span>
              <span>48 Mos (4 Yrs)</span>
              <span>84 Mos (7 Yrs)</span>
            </div>
          </div>

          {/* Slider 4: Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 font-medium flex items-center">
                <Percent className="w-4 h-4 mr-2 text-emerald-400" />
                Interest Rate (p.a.)
              </span>
              <span className="text-base font-black text-white font-display">
                {interestRate.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="7.5"
              max="16.0"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>7.5%</span>
              <span>11.0%</span>
              <span>16.0%</span>
            </div>
          </div>
        </div>

        {/* 3D-Style Donut Chart & Breakdown Right Column */}
        <div className="lg:col-span-5 bg-[#090A0E] rounded-2xl border border-white/10 p-6 flex flex-col justify-between space-y-6">
          {/* Large Monthly EMI Metric */}
          <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-xs uppercase tracking-widest text-slate-400 block font-semibold">
              Estimated Monthly EMI
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-display mt-1 tracking-tight">
              {formatINR(calculation.monthlyEMI)}
              <span className="text-xs text-slate-400 font-normal ml-1">/ month</span>
            </div>
          </div>

          {/* Animated 3D-Styled Donut Chart */}
          <div className="relative flex items-center justify-center py-2">
            <svg
              className="w-44 h-44 -rotate-90 transform drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              viewBox="0 0 160 160"
            >
              {/* Background Ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-white/5 stroke-current"
                strokeWidth="16"
                fill="transparent"
              />
              {/* Principal Stroke (Electric Cyan) */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#00F0FF"
                strokeWidth="16"
                strokeDasharray={`${principalDash} ${circumference}`}
                strokeDashoffset="0"
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500"
              />
              {/* Interest Stroke (Crimson Red) */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#E11D48"
                strokeWidth="16"
                strokeDasharray={`${interestDash} ${circumference}`}
                strokeDashoffset={`-${principalDash}`}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500"
              />
            </svg>

            {/* Center Donut Hole */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Total Loan
              </span>
              <span className="text-sm font-black text-white font-display">
                {formatINR(loanAmount)}
              </span>
            </div>
          </div>

          {/* Legend and Summary Breakdown */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-accent shadow-[0_0_8px_#00F0FF]" />
                <span className="text-slate-300">Principal Amount ({calculation.principalPercentage}%)</span>
              </div>
              <span className="font-bold text-white">{formatINR(calculation.principal)}</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-primary shadow-[0_0_8px_#E11D48]" />
                <span className="text-slate-300">Total Interest ({calculation.interestPercentage}%)</span>
              </div>
              <span className="font-bold text-white">{formatINR(calculation.totalInterest)}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-slate-300">
              <span className="font-semibold">Total Amount Payable</span>
              <span className="font-black text-white text-sm">{formatINR(calculation.totalPayment)}</span>
            </div>
          </div>

          {/* CTA: Apply on WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Apply for Loan on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
