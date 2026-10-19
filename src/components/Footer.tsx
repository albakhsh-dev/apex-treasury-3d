import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  FileCheck,
  Award,
} from "lucide-react";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050608] border-t border-white/10 pt-16 pb-28 md:pb-16 text-slate-400 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-gradient-to-b from-brand-primary/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary/20 via-brand-surface to-brand-primary/10 border border-brand-primary/40 flex items-center justify-center shadow-lg group-hover:border-brand-primary transition-all">
                <ShieldCheck className="w-5 h-5 text-brand-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-wider uppercase text-white font-display">
                  {siteConfig.brand.name}
                </span>
                <span className="text-[10px] tracking-widest text-slate-500 uppercase">
                  {siteConfig.brand.tagline}
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {siteConfig.brand.subTagline}. Every vehicle is 175-point certified with 1-year warranty and complete nationwide RTO documentation.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              {siteConfig.socials.instagram && (
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-brand-primary hover:border-brand-primary/40 hover:bg-white/10 transition-all"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
              {siteConfig.socials.facebook && (
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-brand-primary hover:border-brand-primary/40 hover:bg-white/10 transition-all"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              )}
              {siteConfig.socials.youtube && (
                <a
                  href={siteConfig.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-brand-primary hover:border-brand-primary/40 hover:bg-white/10 transition-all"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              )}
              {siteConfig.socials.linkedin && (
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-brand-primary hover:border-brand-primary/40 hover:bg-white/10 transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {siteConfig.socials.twitter && (
                <a
                  href={siteConfig.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-brand-primary hover:border-brand-primary/40 hover:bg-white/10 transition-all"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Explore Showroom
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/inventory"
                  className="hover:text-white transition-colors flex items-center group"
                >
                  <span>All Inventory</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/inventory?badge=New Arrival"
                  className="hover:text-white transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/sell"
                  className="hover:text-white transition-colors"
                >
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link
                  href="/finance"
                  className="hover:text-white transition-colors"
                >
                  EMI Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  Our Verification Standard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Trust & Assurance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Our Assurance
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start">
                <ShieldCheck className="w-4 h-4 mr-2 text-brand-primary shrink-0 mt-0.5" />
                <span>175-Point Diagnostic Check</span>
              </li>
              <li className="flex items-start">
                <Award className="w-4 h-4 mr-2 text-amber-400 shrink-0 mt-0.5" />
                <span>1-Year Powertrain Warranty</span>
              </li>
              <li className="flex items-start">
                <FileCheck className="w-4 h-4 mr-2 text-brand-accent shrink-0 mt-0.5" />
                <span>Zero RTO Hassles & NOC</span>
              </li>
              <li className="text-xs text-slate-500 pt-1">
                License No: {siteConfig.brand.licenseNumber}
              </li>
            </ul>
          </div>

          {/* Col 4: Showroom & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Showroom & Hub
            </h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 text-brand-primary shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address.full}</span>
              </div>
              <div className="flex items-start">
                <Clock className="w-4 h-4 mr-2 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <p>Mon - Sat: {siteConfig.contact.workingHours.weekdays}</p>
                  <p className="text-xs text-slate-500">
                    Sunday: {siteConfig.contact.workingHours.sunday}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-brand-primary shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-brand-accent shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>
            © {currentYear} {siteConfig.brand.name}. All rights reserved. White-Label Automotive Template.
          </p>
          <div className="flex items-center space-x-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>RTO Compliance Disclaimers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
