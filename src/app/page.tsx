import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import carsData from "@/data/cars.json";
import { Hero3D } from "@/components/3d/Hero3D";
import { CarStoryScroll } from "@/components/3d/CarStoryScroll";
import { CarCard, CarItem } from "@/components/CarCard";
import { StatsCounter } from "@/components/StatsCounter";
import { EMICalculator } from "@/components/EMICalculator";
import { ShowroomCanvas } from "@/components/ShowroomCanvas";
import {
  ShieldCheck,
  BadgePercent,
  Banknote,
  FileCheck,
  Award,
  RefreshCw,
  ArrowRight,
  Star,
  Quote,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
} from "lucide-react";
import { createWhatsAppLeadLink } from "@/lib/formatters";

export default function HomePage() {
  const cars = carsData as CarItem[];
  const featuredCars = cars.filter((c) => c.featured);

  const featureIcons: Record<string, any> = {
    ShieldCheck,
    BadgePercent,
    Banknote,
    FileCheck,
    Award,
    RefreshCw,
  };

  const generalWhatsAppUrl = createWhatsAppLeadLink(
    siteConfig.contact.whatsappNumber,
    `Hi ${siteConfig.brand.name}, I would like to schedule a showroom visit and test drive.`
  );

  return (
    <div className="relative w-full bg-[#08090C] text-white">
      {/* 1. 3D Hero Scene with Quick Search */}
      <Hero3D />

      {/* 2. Scroll-Driven Camera Storytelling */}
      <CarStoryScroll />

      {/* 3. Featured Inventory Showroom */}
      <section className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
        <ShowroomCanvas />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked Vehicles</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
              Featured Showroom Fleet
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Inspected across 175 forensic checkpoints. Available for immediate test drive and same-day delivery.
            </p>
          </div>

          <Link
            href="/inventory"
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-brand-primary/40 text-xs font-semibold uppercase tracking-wider transition-all self-start md:self-auto group"
          >
            <span>View All 12 Cars</span>
            <ArrowRight className="w-4 h-4 text-brand-primary group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Cars Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* 4. Why Choose Us Trust Matrix */}
      <section className="relative py-24 bg-[#0A0C11] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-brand-primary font-bold">
              The Gold Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
              Uncompromising Quality in Every Detail
            </h2>
            <p className="text-sm text-slate-400">
              Why discerning automobile buyers across India choose {siteConfig.brand.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteConfig.features.map((item) => {
              const Icon = featureIcons[item.icon] || ShieldCheck;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#0F121A]/80 border border-white/5 hover:border-brand-primary/40 p-8 transition-all duration-300 hover:shadow-luxury-glow group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Animated Number Counters */}
      <StatsCounter />

      {/* 6. Light-Section Variant for Contrast & Readability: Client Reviews & VIP Concierge */}
      <section className="relative py-24 bg-[#F1F5F9] text-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-primary font-black">
                Client Testimonials
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight mt-1">
                Stories From The Driver’s Seat
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-lg">
                Over 2,400 satisfied luxury drivers across Delhi, Mumbai, Bangalore, and Hyderabad.
              </p>
            </div>

            <div className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-200">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800">
                4.9 / 5.0 Google Rating
              </span>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/80 flex flex-col justify-between space-y-6 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-slate-200" />
                  </div>

                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {review.name}
                    </h4>
                    <span className="text-[11px] text-slate-500 block">
                      {review.designation}
                    </span>
                    <span className="text-[11px] font-semibold text-brand-primary block mt-0.5">
                      Purchased: {review.carBought}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Sell Your Car in 45 Mins Banner */}
      <section className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-primary via-rose-700 to-brand-secondary p-8 sm:p-14 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-white/80 font-bold bg-black/20 px-3 py-1 rounded-full border border-white/20">
              Instant Car Valuation
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display leading-tight">
              Sell Your Car in 45 Minutes. Instant Bank Transfer.
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Skip endless phone calls and lowball offers. Get a free digital valuation, doorstep inspection, and same-day payment with zero RC transfer paperwork hassles.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/sell"
                className="px-6 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-slate-100 transition-all active:scale-95 flex items-center space-x-2"
              >
                <span>Get Instant Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-black/40 hover:bg-black/60 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Appraisal</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Finance & EMI Calculator Section */}
      <section className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <EMICalculator initialPrice={1450000} carTitle="Luxury Fleet" />
      </section>

      {/* 9. Dealership Location & Showroom Teaser */}
      <section className="relative py-20 bg-[#0B0D12] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-brand-primary font-bold">
                  Visit Our Showroom
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white font-display mt-1">
                  Experience The Collection in Person
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                  Our private client lounge features espresso bar hospitality, high-definition digital inspection screens, and dedicated test drive routes.
                </p>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start space-x-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white">Dealership Address</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {siteConfig.contact.address.full}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <Clock className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white">Showroom Hours</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {siteConfig.contact.workingHours.weekdays} (Mon-Sat) | {siteConfig.contact.workingHours.sunday} (Sun)
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-2">
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wider uppercase border border-white/10 flex items-center justify-center space-x-2 transition-all"
                  >
                    <Phone className="w-4 h-4 text-brand-primary" />
                    <span>Call Concierge</span>
                  </a>
                  <a
                    href={generalWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp VIP</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="relative aspect-[16/11] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <iframe
                src={siteConfig.contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(110%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Showroom Location Map"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
