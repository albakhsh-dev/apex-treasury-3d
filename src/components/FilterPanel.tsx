"use client";

import {
  Search,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  X,
} from "lucide-react";
import { formatINR } from "@/lib/formatters";

export interface FilterState {
  search: string;
  brand: string;
  maxPrice: number;
  fuel: string;
  transmission: string;
  yearMin: number;
  maxKm: number;
  owners: string;
  sortBy: string;
}

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  brands: string[];
  totalResults: number;
}

export function FilterPanel({
  filters,
  onChange,
  onReset,
  brands,
  totalResults,
}: FilterPanelProps) {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <aside className="w-full bg-[#0E1017]/95 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-xl space-y-6">
      {/* Header and Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Refine Fleet
          </h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-brand-primary flex items-center space-x-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* 1. Keyword Search */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Search Model
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="e.g. Thar, Creta, Hybrid..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary transition-colors"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {filters.search && (
            <button
              onClick={() => updateFilter("search", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Brand Selector */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Manufacturer
        </label>
        <div className="relative">
          <select
            value={filters.brand}
            onChange={(e) => updateFilter("brand", e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-sm text-white appearance-none focus:outline-none focus:border-brand-primary transition-colors cursor-pointer"
          >
            <option value="" className="bg-[#0E1017] text-white">All Manufacturers</option>
            {brands.map((b) => (
              <option key={b} value={b} className="bg-[#0E1017] text-white">
                {b}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* 3. Max Price Range Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-400">
            Budget Ceiling
          </span>
          <span className="text-sm font-black text-brand-primary font-display">
            {filters.maxPrice >= 2500000 ? "Any Budget" : formatINR(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="300000"
          max="2500000"
          step="50000"
          value={filters.maxPrice}
          onChange={(e) => updateFilter("maxPrice", Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>₹3 Lakh</span>
          <span>₹14 Lakh</span>
          <span>₹25 Lakh+</span>
        </div>
      </div>

      {/* 4. Fuel Type Pills */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
          Fuel Type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {["", "Petrol", "Diesel", "CNG", "Electric", "Hybrid"].map((fuel) => {
            const isSelected = filters.fuel === fuel;
            return (
              <button
                key={fuel}
                type="button"
                onClick={() => updateFilter("fuel", fuel)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-brand-primary text-white shadow-md border border-brand-primary"
                    : "bg-white/5 text-slate-300 border border-white/5 hover:border-white/20"
                }`}
              >
                {fuel || "All Fuels"}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Transmission */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
          Transmission
        </label>
        <div className="flex flex-wrap gap-1.5">
          {["", "Manual", "Automatic", "DCT", "CVT"].map((trans) => {
            const isSelected = filters.transmission === trans;
            return (
              <button
                key={trans}
                type="button"
                onClick={() => updateFilter("transmission", trans)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-brand-accent text-slate-900 font-bold shadow-md border border-brand-accent"
                    : "bg-white/5 text-slate-300 border border-white/5 hover:border-white/20"
                }`}
              >
                {trans || "All Gearboxes"}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Kilometers Cap */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Odometer Filter
        </label>
        <div className="relative">
          <select
            value={filters.maxKm}
            onChange={(e) => updateFilter("maxKm", Number(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-sm text-white appearance-none focus:outline-none focus:border-brand-primary transition-colors cursor-pointer"
          >
            <option value={999999} className="bg-[#0E1017] text-white">Any Kilometers</option>
            <option value={30000} className="bg-[#0E1017] text-white">Under 30,000 km</option>
            <option value={50000} className="bg-[#0E1017] text-white">Under 50,000 km</option>
            <option value={75000} className="bg-[#0E1017] text-white">Under 75,000 km</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* 7. Ownership Filter */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Ownership History
        </label>
        <div className="grid grid-cols-2 gap-2">
          {["", "1st Owner"].map((own) => (
            <button
              key={own}
              type="button"
              onClick={() => updateFilter("owners", own)}
              className={`py-2 px-3 rounded-xl text-xs font-semibold text-center border transition-all ${
                filters.owners === own
                  ? "bg-white/10 text-white border-brand-primary"
                  : "bg-white/5 text-slate-400 border-white/5 hover:border-white/15"
              }`}
            >
              {own || "Any Owner"}
            </button>
          ))}
        </div>
      </div>

      {/* Active Count Badge */}
      <div className="pt-2 text-center">
        <span className="text-xs text-slate-400">
          Showing <span className="text-white font-bold">{totalResults}</span> certified cars
        </span>
      </div>
    </aside>
  );
}
