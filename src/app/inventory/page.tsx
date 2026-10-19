"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import carsData from "@/data/cars.json";
import { CarCard, CarItem } from "@/components/CarCard";
import { FilterPanel, FilterState } from "@/components/FilterPanel";
import { ShowroomCanvas } from "@/components/ShowroomCanvas";
import {
  Sparkles,
  ArrowUpDown,
  Car,
  RotateCcw,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { createWhatsAppLeadLink } from "@/lib/formatters";

export default function InventoryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08090C] pt-32 text-center text-slate-400">Loading Fleet...</div>}>
      <InventoryContent />
    </Suspense>
  );
}

function InventoryContent() {
  const searchParams = useSearchParams();
  const allCars = carsData as CarItem[];

  // Extract unique brands for filter options
  const uniqueBrands = useMemo(() => {
    return Array.from(new Set(allCars.map((c) => c.brand))).sort();
  }, [allCars]);

  // Initial Filter State
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get("search") || "",
    brand: searchParams.get("brand") || "",
    maxPrice: 2500000,
    fuel: searchParams.get("fuel") || "",
    transmission: searchParams.get("transmission") || "",
    yearMin: 2014,
    maxKm: 999999,
    owners: "",
    sortBy: "price-asc",
  });

  // Handle URL budget preset if present
  useEffect(() => {
    const budgetParam = searchParams.get("budget");
    if (budgetParam === "under5") {
      setFilters((prev) => ({ ...prev, maxPrice: 500000 }));
    } else if (budgetParam === "5to10") {
      setFilters((prev) => ({ ...prev, maxPrice: 1000000 }));
    } else if (budgetParam === "10to15") {
      setFilters((prev) => ({ ...prev, maxPrice: 1500000 }));
    }
  }, [searchParams]);

  // Reset Filters
  const handleReset = () => {
    setFilters({
      search: "",
      brand: "",
      maxPrice: 2500000,
      fuel: "",
      transmission: "",
      yearMin: 2014,
      maxKm: 999999,
      owners: "",
      sortBy: "price-asc",
    });
  };

  // Filter and Sort Processing
  const filteredCars = useMemo(() => {
    return allCars
      .filter((car) => {
        // Keyword search
        if (filters.search) {
          const query = filters.search.toLowerCase();
          const matchTitle = `${car.brand} ${car.model} ${car.variant}`.toLowerCase();
          if (!matchTitle.includes(query)) return false;
        }

        // Brand
        if (filters.brand && car.brand !== filters.brand) return false;

        // Max Price
        if (car.price > filters.maxPrice) return false;

        // Fuel Type
        if (filters.fuel && car.fuelType !== filters.fuel) return false;

        // Transmission
        if (filters.transmission && car.transmission !== filters.transmission)
          return false;

        // Odometer
        if (car.kilometers > filters.maxKm) return false;

        // Owners
        if (filters.owners && car.owners !== filters.owners) return false;

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-asc") return a.price - b.price;
        if (filters.sortBy === "price-desc") return b.price - a.price;
        if (filters.sortBy === "year-desc") return b.year - a.year;
        if (filters.sortBy === "km-asc") return a.kilometers - b.kilometers;
        return 0;
      });
  }, [allCars, filters]);

  const customOrderWhatsAppUrl = createWhatsAppLeadLink(
    siteConfig.contact.whatsappNumber,
    `Hi ${siteConfig.brand.name}, I am searching for a specific car with criteria: Brand: ${filters.brand || "Any"}, Budget: under ₹${(filters.maxPrice / 100000).toFixed(1)} Lakh, Fuel: ${filters.fuel || "Any"}. Can you help procure one for me?`
  );

  return (
    <div className="min-h-screen bg-[#08090C] text-white pt-28 pb-24 relative overflow-hidden">
      <ShowroomCanvas />

      {/* Top Header Banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Inventory</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
              Curated Certified Fleet
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Every vehicle includes comprehensive RTO background checks, zero structural damage guarantee, and 1-year powertrain warranty.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-3 self-start md:self-auto">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center">
              <ArrowUpDown className="w-3.5 h-3.5 mr-1 text-brand-accent" />
              Sort:
            </span>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
              }
              className="bg-[#0E1017] border border-white/10 rounded-xl py-2 px-3 text-xs text-white appearance-none focus:outline-none focus:border-brand-primary transition-colors cursor-pointer"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Year: Newest First</option>
              <option value="km-asc">Odometer: Lowest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters & Results */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Column: Facet Filters */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              onReset={handleReset}
              brands={uniqueBrands}
              totalResults={filteredCars.length}
            />
          </div>

          {/* Right Column: Cars Results */}
          <div className="lg:col-span-3">
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              /* Empty Search State */
              <div className="rounded-3xl bg-[#0E1017]/80 border border-white/10 p-12 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                  <Car className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  No Vehicles Match Your Current Filters
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
                  We frequently acquire certified vehicles not yet listed online. Reset your filters or let our procurement concierge source your dream vehicle.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wider uppercase border border-white/10 flex items-center space-x-1.5 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-brand-primary" />
                    <span>Clear All Filters</span>
                  </button>

                  <a
                    href={customOrderWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-emerald-600/30 flex items-center space-x-1.5 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Request Custom Car On WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
