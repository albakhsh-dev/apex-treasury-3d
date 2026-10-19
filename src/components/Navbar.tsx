"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import {
  Car,
  Phone,
  MessageCircle,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { createWhatsAppLeadLink } from "@/lib/formatters";

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled past threshold for glass effect
      setIsScrolled(currentScrollY > 40);

      // Scroll direction detection
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY && !mobileMenuOpen) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Inventory", href: "/inventory", badge: "12 Cars" },
    { label: "Sell Your Car", href: "/sell", badge: "Instant Quote" },
    { label: "EMI Calculator", href: "/finance" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const whatsappGeneralUrl = createWhatsAppLeadLink(
    siteConfig.contact.whatsappNumber,
    `Hi ${siteConfig.brand.name}, I would like to enquire about your available verified cars and schedule a showroom visit.`
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Top Info Bar (Desktop) */}
        <div className="hidden lg:block bg-black/60 border-b border-white/5 py-1.5 px-6 text-xs text-brand-muted">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <span className="flex items-center text-slate-300">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-brand-accent" />
                {siteConfig.contact.workingHours.displayShort}
              </span>
              <span className="text-white/20">|</span>
              <span className="text-slate-400">
                {siteConfig.brand.subTagline}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="hover:text-brand-accent transition-colors flex items-center text-slate-300"
              >
                <Phone className="w-3 h-3 mr-1 text-brand-primary" />
                {siteConfig.contact.phone}
              </a>
              <span className="text-white/20">|</span>
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1" />
                WhatsApp Desk
              </a>
            </div>
          </div>
        </div>

        {/* Main Glass Navbar */}
        <nav
          className={`transition-all duration-300 ${
            isScrolled
              ? "bg-[#08090C]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5"
              : "bg-transparent py-5"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 group cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary/20 via-brand-surface to-brand-primary/10 border border-brand-primary/40 flex items-center justify-center shadow-lg group-hover:border-brand-primary transition-all duration-300">
                <ShieldCheck className="w-5 h-5 text-brand-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-wider uppercase text-white font-display flex items-center">
                  {siteConfig.brand.logoText}
                  <span className="ml-1 text-[10px] tracking-widest px-1.5 py-0.5 rounded bg-brand-primary/20 text-brand-primary border border-brand-primary/30">
                    {siteConfig.brand.logoAccent}
                  </span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase font-medium">
                  {siteConfig.brand.tagline}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
                      isActive
                        ? "text-white bg-white/10 shadow-sm"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="ml-1.5 text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-brand-primary/20 text-brand-primary border border-brand-primary/30">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Action CTAs */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 rounded-lg overflow-hidden group border border-brand-primary/40 bg-gradient-to-r from-brand-primary/80 to-brand-primary hover:from-brand-primary hover:to-brand-primary-hover shadow-luxury-glow hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1.5 text-white animate-pulse" />
                <span>Book Test Drive</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#08090C]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium ${
                      isActive
                        ? "bg-brand-primary/20 text-brand-primary border border-brand-primary/30"
                        : "text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="flex items-center justify-center w-full py-3 px-4 rounded-xl bg-white/5 text-white border border-white/10 font-semibold text-sm"
              >
                <Phone className="w-4 h-4 mr-2 text-brand-primary" />
                Call Showroom: {siteConfig.contact.phone}
              </a>
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat on WhatsApp Desk
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
