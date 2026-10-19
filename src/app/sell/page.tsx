"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site.config";
import { formatINR, createWhatsAppLeadLink } from "@/lib/formatters";
import {
  Car,
  Calendar,
  Fuel,
  Gauge,
  ShieldCheck,
  Banknote,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  User,
  Phone,
  MapPin,
} from "lucide-react";

export default function SellCarPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "2021",
    fuel: "Petrol",
    transmission: "Manual",
    variant: "",
    kilometers: "35000",
    owners: "1st Owner",
    condition: "Excellent (Zero Scratches)",
    ownerName: "",
    ownerPhone: "",
    city: "Delhi NCR",
  });

  const [submitted, setSubmitted] = useState(false);

  // Approximate instant quote range calculation
  const calculateEstimatedQuote = () => {
    const yearFactor = Math.max(0.4, 1 - (2024 - Number(formData.year)) * 0.08);
    const baseValue =
      formData.brand === "Mahindra" || formData.brand === "Toyota"
        ? 1200000
        : formData.brand === "Hyundai" || formData.brand === "Tata" || formData.brand === "Kia"
        ? 900000
        : 600000;

    const conditionFactor =
      formData.condition.includes("Excellent")
        ? 1.05
        : formData.condition.includes("Good")
        ? 0.95
        : 0.85;

    const estimated = Math.round(baseValue * yearFactor * conditionFactor);
    const low = Math.round(estimated * 0.95);
    const high = Math.round(estimated * 1.05);

    return { low, high };
  };

  const quote = calculateEstimatedQuote();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
      // Generate WhatsApp lead
      const message = `Hi ${siteConfig.brand.name}, I would like to sell my car for an instant payout.
Details:
- Vehicle: ${formData.year} ${formData.brand} ${formData.model} (${formData.variant || "Standard"})
- Fuel & Gear: ${formData.fuel} | ${formData.transmission}
- Odometer: ${Number(formData.kilometers).toLocaleString("en-IN")} km
- Ownership: ${formData.owners}
- Condition: ${formData.condition}
- Location: ${formData.city}
- Owner Name: ${formData.ownerName}
- Phone: ${formData.ownerPhone}
Estimated Valuation Range: ${formatINR(quote.low)} - ${formatINR(quote.high)}. Please arrange doorstep inspection.`;

      const whatsappUrl = createWhatsAppLeadLink(
        siteConfig.contact.whatsappNumber,
        message
      );
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-white pt-28 pb-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Valuation Wizard</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display">
            Sell Your Car in 45 Minutes
          </h1>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            Doorstep inspection anywhere in India, instant full bank transfer, and 100% free RC transfer.
          </p>

          {/* Step Progress Bar */}
          <div className="flex items-center justify-center space-x-3 pt-6 max-w-md mx-auto">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s
                      ? "bg-brand-primary text-white shadow-luxury-glow"
                      : "bg-white/5 text-slate-500 border border-white/10"
                  }`}
                >
                  {s}
                </div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 mt-1">
                  {s === 1
                    ? "Model"
                    : s === 2
                    ? "Specs"
                    : s === 3
                    ? "Condition"
                    : "Contact"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Step Wizard Card */}
        <div className="bg-[#0E1017]/95 rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleNext} className="space-y-6">
            {/* STEP 1: Brand & Model */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-white font-display flex items-center">
                  <Car className="w-5 h-5 mr-2 text-brand-primary" />
                  Step 1: Vehicle Make & Model
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Brand / Manufacturer *
                    </label>
                    <select
                      required
                      value={formData.brand}
                      onChange={(e) =>
                        setFormData({ ...formData, brand: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-primary"
                    >
                      <option value="" className="bg-[#0E1017]">Select Brand</option>
                      <option value="Maruti Suzuki" className="bg-[#0E1017]">Maruti Suzuki</option>
                      <option value="Hyundai" className="bg-[#0E1017]">Hyundai</option>
                      <option value="Tata" className="bg-[#0E1017]">Tata</option>
                      <option value="Mahindra" className="bg-[#0E1017]">Mahindra</option>
                      <option value="Toyota" className="bg-[#0E1017]">Toyota</option>
                      <option value="Honda" className="bg-[#0E1017]">Honda</option>
                      <option value="Kia" className="bg-[#0E1017]">Kia</option>
                      <option value="BMW" className="bg-[#0E1017]">BMW</option>
                      <option value="Mercedes-Benz" className="bg-[#0E1017]">Mercedes-Benz</option>
                      <option value="Audi" className="bg-[#0E1017]">Audi</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Car Model *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Swift, Creta, Thar, Fortuner"
                      value={formData.model}
                      onChange={(e) =>
                        setFormData({ ...formData, model: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Manufacturing Year *
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) =>
                        setFormData({ ...formData, year: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-primary"
                    >
                      {Array.from({ length: 12 }, (_, i) => 2024 - i).map((yr) => (
                        <option key={yr} value={yr} className="bg-[#0E1017]">
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Variant (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SX (O), LX, ZXi, V"
                      value={formData.variant}
                      onChange={(e) =>
                        setFormData({ ...formData, variant: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Fuel & Transmission */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-white font-display flex items-center">
                  <Fuel className="w-5 h-5 mr-2 text-brand-accent" />
                  Step 2: Powertrain & Gearbox
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                      Fuel Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {["Petrol", "Diesel", "CNG", "Electric", "Hybrid"].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setFormData({ ...formData, fuel: f })}
                          className={`p-3 rounded-xl text-xs font-semibold border transition-all ${
                            formData.fuel === f
                              ? "bg-brand-primary text-white border-brand-primary shadow-md"
                              : "bg-white/5 text-slate-300 border-white/10 hover:border-white/20"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                      Transmission
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["Manual", "Automatic", "DCT", "CVT"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setFormData({ ...formData, transmission: t })}
                          className={`p-3 rounded-xl text-xs font-semibold border transition-all ${
                            formData.transmission === t
                              ? "bg-brand-accent text-slate-900 font-bold border-brand-accent shadow-md"
                              : "bg-white/5 text-slate-300 border-white/10 hover:border-white/20"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Odometer & Condition */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-white font-display flex items-center">
                  <Gauge className="w-5 h-5 mr-2 text-amber-400" />
                  Step 3: Kilometers & Condition
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Approximate Kilometers Driven
                    </label>
                    <select
                      value={formData.kilometers}
                      onChange={(e) =>
                        setFormData({ ...formData, kilometers: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-primary"
                    >
                      <option value="15000" className="bg-[#0E1017]">Under 20,000 km</option>
                      <option value="35000" className="bg-[#0E1017]">20,000 - 40,000 km</option>
                      <option value="55000" className="bg-[#0E1017]">40,000 - 60,000 km</option>
                      <option value="75000" className="bg-[#0E1017]">60,000 - 80,000 km</option>
                      <option value="95000" className="bg-[#0E1017]">Above 80,000 km</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Ownership Status
                    </label>
                    <select
                      value={formData.owners}
                      onChange={(e) =>
                        setFormData({ ...formData, owners: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-primary"
                    >
                      <option value="1st Owner" className="bg-[#0E1017]">1st Owner (Single Handed)</option>
                      <option value="2nd Owner" className="bg-[#0E1017]">2nd Owner</option>
                      <option value="3rd+ Owner" className="bg-[#0E1017]">3rd+ Owner</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Physical Condition Rating
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        "Excellent (Zero Scratches)",
                        "Good (Minor Cosmetic Wear)",
                        "Fair (Needs Detailing / Touchup)",
                      ].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setFormData({ ...formData, condition: c })}
                          className={`p-3 rounded-xl text-xs font-semibold text-left border transition-all ${
                            formData.condition === c
                              ? "bg-white/10 text-white border-brand-primary shadow-md"
                              : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Owner Details & Instant Quote Calculation */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-white font-display flex items-center">
                  <User className="w-5 h-5 mr-2 text-emerald-400" />
                  Step 4: Contact & Instant Quote
                </h3>

                {/* Instant Quote Highlight Box */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-primary/20 via-brand-surface to-brand-accent/20 border border-brand-primary/40 text-center space-y-2">
                  <span className="text-xs uppercase tracking-widest text-brand-accent font-mono font-bold">
                    Estimated Dealership Valuation
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white font-display">
                    {formatINR(quote.low)} – {formatINR(quote.high)}
                  </div>
                  <p className="text-xs text-slate-300">
                    Subject to physical diagnostic evaluation. Same-day full payout via RTGS/IMPS.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Sharma"
                      value={formData.ownerName}
                      onChange={(e) =>
                        setFormData({ ...formData, ownerName: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      WhatsApp / Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 XXXXX"
                      value={formData.ownerPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, ownerPhone: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      City / RTO Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Delhi NCR, Mumbai, Bangalore, Pune"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-wider border border-white/10 flex items-center space-x-1.5 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-luxury-glow flex items-center space-x-2 transition-all active:scale-95"
              >
                {step < 4 ? (
                  <>
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm & Send on WhatsApp</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Reassurance Footer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
          <div className="p-6 rounded-2xl bg-[#0E1017]/60 border border-white/5 flex items-start space-x-4">
            <Banknote className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">Instant Payment</h4>
              <p className="text-xs text-slate-400 mt-1">
                Full amount transferred to your verified bank account before you release the keys.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0E1017]/60 border border-white/5 flex items-start space-x-4">
            <ShieldCheck className="w-6 h-6 text-brand-primary shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">Free Doorstep Pickup</h4>
              <p className="text-xs text-slate-400 mt-1">
                Our certified evaluators come to your home or office at your scheduled convenience.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0E1017]/60 border border-white/5 flex items-start space-x-4">
            <CheckCircle2 className="w-6 h-6 text-brand-accent shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">100% Legal Indemnity</h4>
              <p className="text-xs text-slate-400 mt-1">
                Signed delivery receipt and legal agreement protecting you against any liabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
