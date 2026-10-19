import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import carsData from "@/data/cars.json";
import { CarItem, CarCard } from "@/components/CarCard";
import { CarViewer360 } from "@/components/CarViewer360";
import { EMICalculator } from "@/components/EMICalculator";
import { JsonLd } from "@/components/JsonLd";
import { formatINR, formatKM, createWhatsAppLeadLink } from "@/lib/formatters";
import {
  ShieldCheck,
  Fuel,
  Gauge,
  Calendar,
  Zap,
  MapPin,
  FileCheck,
  Award,
  Phone,
  MessageCircle,
  Share2,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export async function generateStaticParams() {
  const cars = carsData as CarItem[];
  return cars.map((car) => ({
    id: car.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cars = carsData as CarItem[];
  const car = cars.find((c) => c.id === id);

  if (!car) {
    return {
      title: "Car Not Found",
    };
  }

  const title = `${car.year} ${car.brand} ${car.model} ${car.variant} for Sale | ${siteConfig.brand.name}`;
  const description = `Certified ${car.year} ${car.brand} ${car.model} in ${car.color}. Driven ${formatKM(car.kilometers)}, 1-owner, 175-point certified with 1-year warranty and low EMI options.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: car.thumbnail }],
    },
  };
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cars = carsData as CarItem[];
  const car = cars.find((c) => c.id === id);

  if (!car) {
    notFound();
  }

  const isSold = car.status === "sold";
  const similarCars = cars
    .filter((c) => c.id !== car.id && (c.brand === car.brand || c.fuelType === car.fuelType))
    .slice(0, 3);

  const whatsappMessage = `Hi ${siteConfig.brand.name}, I am interested in purchasing the ${car.year} ${car.brand} ${car.model} ${car.variant} (${car.priceFormatted}) listed on your website. Please share the complete inspection report and availability for a test drive.`;
  const whatsappUrl = createWhatsAppLeadLink(
    siteConfig.contact.whatsappNumber,
    whatsappMessage
  );

  return (
    <div className="min-h-screen bg-[#08090C] text-white pt-28 pb-24">
      <JsonLd car={car} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/inventory"
            className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Inventory</span>
          </Link>

          <div className="flex items-center space-x-2">
            {isSold ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-950/80 text-rose-300 border border-rose-500/40">
                Vehicle Sold
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                In Stock & Certified
              </span>
            )}
          </div>
        </div>

        {/* Top Hero Layout: 360 Viewer on Left, Purchase Panel on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: 360 Viewer or Image Gallery */}
          <div className="lg:col-span-7">
            <CarViewer360
              images360={car.images360}
              images={car.images}
              title={`${car.year} ${car.brand} ${car.model}`}
            />
          </div>

          {/* Right Column: Title, Pricing & Lead Generation */}
          <div className="lg:col-span-5 space-y-6 bg-[#0E1017]/90 rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            {/* Header Identity */}
            <div className="space-y-2 border-b border-white/10 pb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-brand-primary font-bold">
                  {car.brand} Certified Pre-Owned
                </span>
                <span className="text-xs font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  {car.rto}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
                {car.model}
              </h1>
              <p className="text-sm text-slate-400">{car.variant}</p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-widest text-slate-400">
                  Drive-Away Price
                </span>
                <span className="text-xs font-bold text-brand-primary">
                  {car.priceLakhs}
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
                {car.priceFormatted}
              </div>
              <div className="text-xs text-emerald-400 font-semibold pt-1 flex items-center justify-between">
                <span>Estimated Low EMI: ₹{car.emiPerMonth.toLocaleString("en-IN")}/mo</span>
                <span className="text-[10px] text-slate-400">Zero down-payment schemes avail.</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              {!isSold ? (
                <>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp About This Car</span>
                  </a>

                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="w-full py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider border border-white/10 flex items-center justify-center space-x-2 transition-all"
                  >
                    <Phone className="w-4 h-4 text-brand-primary" />
                    <span>Call Dealership ({siteConfig.contact.phone})</span>
                  </a>
                </>
              ) : (
                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-center text-sm">
                  This vehicle has been sold. Browse our other available cars below or request a custom procurement.
                </div>
              )}
            </div>

            {/* Trust Assurance Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0" />
                <span>175-Point Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>1-Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-brand-accent shrink-0" />
                <span>NOC & RC Transfer</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Doorstep Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Description & Overview */}
        <div className="rounded-3xl bg-[#0E1017]/80 border border-white/10 p-8 sm:p-10 space-y-4">
          <h3 className="text-xl font-bold uppercase tracking-wide text-white font-display">
            Vehicle Overview & Pedigree
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
            {car.description}
          </p>
        </div>

        {/* Technical Specification Matrix */}
        <div className="rounded-3xl bg-[#0E1017]/80 border border-white/10 p-8 sm:p-10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold uppercase tracking-wide text-white font-display">
              Technical Specifications
            </h3>
            <span className="text-xs text-brand-accent font-mono">
              Certified Diagnostic Verified
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-sm">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Engine
              </span>
              <p className="font-bold text-white">{car.engine}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Max Power
              </span>
              <p className="font-bold text-white">{car.power}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Max Torque
              </span>
              <p className="font-bold text-white">{car.torque}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Certified Mileage
              </span>
              <p className="font-bold text-white">{car.mileage}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Odometer
              </span>
              <p className="font-bold text-white">{formatKM(car.kilometers)}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Transmission
              </span>
              <p className="font-bold text-white">{car.transmission}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Fuel Type
              </span>
              <p className="font-bold text-white">{car.fuelType}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Ownership
              </span>
              <p className="font-bold text-white">{car.owners}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Exterior Color
              </span>
              <p className="font-bold text-white">{car.color}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Ground Clearance
              </span>
              <p className="font-bold text-white">{car.groundClearance}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Seating Capacity
              </span>
              <p className="font-bold text-white">{car.seatingCapacity}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Insurance Status
              </span>
              <p className="font-bold text-white">{car.insuranceValidity}</p>
            </div>
          </div>
        </div>

        {/* 175-Point Inspection Highlights */}
        {car.inspectionHighlights && (
          <div className="rounded-3xl bg-[#0E1017]/80 border border-white/10 p-8 sm:p-10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-brand-primary font-bold">
                  Forensic Diagnostic Audit
                </span>
                <h3 className="text-xl font-bold uppercase tracking-wide text-white font-display">
                  175-Point Inspection Results
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                Certified 100% Passed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {car.inspectionHighlights.map((point, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{point.part}</span>
                    <span className="font-mono text-xs font-bold text-brand-accent">
                      {point.score}% Score
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-brand-primary to-brand-accent h-full"
                      style={{ width: `${point.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400">{point.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vehicle-Specific EMI Calculator */}
        <EMICalculator
          initialPrice={car.price}
          carTitle={`${car.year} ${car.brand} ${car.model}`}
        />

        {/* Similar Cars Recommendation */}
        {similarCars.length > 0 && (
          <div className="space-y-6 pt-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-primary font-bold">
                Alternative Recommendations
              </span>
              <h3 className="text-2xl font-bold text-white font-display">
                Similar Certified Vehicles
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarCars.map((simCar) => (
                <CarCard key={simCar.id} car={simCar} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
