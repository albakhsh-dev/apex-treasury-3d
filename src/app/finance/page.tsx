import { siteConfig } from "@/config/site.config";
import { EMICalculator } from "@/components/EMICalculator";
import {
  Banknote,
  CheckCircle2,
  FileCheck,
  Percent,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: `Low-EMI Car Financing & Loans | ${siteConfig.brand.name}`,
  description:
    "Calculate your monthly car EMI, explore custom low-interest financing packages, and get instant digital approvals with 15+ top Indian banks.",
};

export default function FinancePage() {
  const bankingPartners = [
    { name: "HDFC Bank", rate: "Starting 8.40%", logoText: "HDFC" },
    { name: "ICICI Bank", rate: "Starting 8.50%", logoText: "ICICI" },
    { name: "SBI Car Loans", rate: "Starting 8.65%", logoText: "SBI" },
    { name: "Kotak Prime", rate: "Starting 8.75%", logoText: "KOTAK" },
    { name: "Axis Bank", rate: "Starting 8.60%", logoText: "AXIS" },
  ];

  return (
    <div className="min-h-screen bg-[#08090C] text-white pt-28 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Automotive Fintech Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display">
            Tailored Low-EMI Financing
          </h1>
          <p className="text-sm text-slate-400">
            Enjoy transparent interest rates, zero hidden processing charges, and instant digital sanctions with India's premier banking institutions.
          </p>
        </div>

        {/* Interactive 3D Donut EMI Calculator */}
        <EMICalculator initialPrice={1500000} carTitle="Luxury Fleet" />

        {/* Banking Partners Ribbon */}
        <div className="rounded-3xl bg-[#0E1017]/80 border border-white/10 p-8 sm:p-10 space-y-6">
          <div className="text-center max-w-lg mx-auto">
            <span className="text-xs uppercase tracking-widest text-brand-accent font-bold">
              Approved Lending Consortium
            </span>
            <h3 className="text-xl font-bold text-white font-display mt-1">
              Our Banking & NBFC Partners
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {bankingPartners.map((bank, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-primary/40 flex flex-col items-center justify-center text-center space-y-1 transition-colors"
              >
                <div className="text-lg font-black tracking-wider text-white font-display">
                  {bank.logoText}
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {bank.name}
                </div>
                <div className="text-[11px] text-emerald-400 font-semibold font-mono">
                  {bank.rate}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-[#0E1017]/80 border border-white/10 space-y-4">
            <div className="flex items-center space-x-3 text-brand-primary">
              <FileCheck className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white font-display">
                For Salaried Individuals
              </h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
                <span>Last 3 months salary slips with official company seal</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
                <span>Last 6 months bank statement (salary credited account)</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
                <span>PAN Card & Aadhaar Card (e-KYC verified)</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
                <span>Current residence address proof (Electricity / Rent Agreement)</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-[#0E1017]/80 border border-white/10 space-y-4">
            <div className="flex items-center space-x-3 text-brand-accent">
              <FileCheck className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white font-display">
                For Self-Employed & Business Owners
              </h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
                <span>Last 2 years Income Tax Returns (ITR) with computation of income</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
                <span>Last 6 months primary business current bank account statements</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
                <span>GST Registration Certificate & Business proof</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
                <span>PAN Card & Aadhaar of the applicant / partners</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
