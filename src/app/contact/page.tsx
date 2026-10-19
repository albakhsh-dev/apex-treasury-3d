"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site.config";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { createWhatsAppLeadLink } from "@/lib/formatters";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Buying a Certified Vehicle");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMsg = `Hi ${siteConfig.brand.name}, I am reaching out from your website contact page.
- Name: ${name}
- Phone: ${phone}
- Email: ${email || "Not provided"}
- Purpose: ${subject}
- Message: ${message || "I would like to schedule a showroom visit."}`;

    const whatsappUrl = createWhatsAppLeadLink(
      siteConfig.contact.whatsappNumber,
      formattedMsg
    );
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-white pt-28 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showroom & Client Concierge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display">
            Connect With Our Team
          </h1>
          <p className="text-sm text-slate-400">
            Schedule an exclusive private viewing, book a doorstep test drive, or discuss custom procurement.
          </p>
        </div>

        {/* Contact Matrix: Info Cards on Left, Interactive Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Showroom Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="p-6 rounded-3xl bg-[#0E1017]/90 border border-white/10 space-y-2">
              <div className="flex items-center space-x-3 text-brand-primary">
                <MapPin className="w-5 h-5" />
                <h3 className="font-bold text-white uppercase text-xs tracking-wider">
                  Showroom Location
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed pl-8">
                {siteConfig.contact.address.full}
              </p>
            </div>

            {/* Direct Lines */}
            <div className="p-6 rounded-3xl bg-[#0E1017]/90 border border-white/10 space-y-4">
              <div className="flex items-center space-x-3 text-brand-accent">
                <Phone className="w-5 h-5" />
                <h3 className="font-bold text-white uppercase text-xs tracking-wider">
                  Direct Phone & WhatsApp
                </h3>
              </div>
              <div className="space-y-3 pl-8 text-sm">
                <div>
                  <span className="text-xs text-slate-400 block">General Enquiries</span>
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="font-bold text-white hover:text-brand-primary transition-colors text-base"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">24/7 WhatsApp Concierge</span>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {siteConfig.contact.whatsappDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="p-6 rounded-3xl bg-[#0E1017]/90 border border-white/10 space-y-3">
              <div className="flex items-center space-x-3 text-amber-400">
                <Clock className="w-5 h-5" />
                <h3 className="font-bold text-white uppercase text-xs tracking-wider">
                  Showroom Hours
                </h3>
              </div>
              <div className="pl-8 space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Monday – Friday</span>
                  <span className="font-semibold text-white">
                    {siteConfig.contact.workingHours.weekdays}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Saturday</span>
                  <span className="font-semibold text-white">
                    {siteConfig.contact.workingHours.saturday}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Sunday</span>
                  <span className="font-semibold text-white">
                    {siteConfig.contact.workingHours.sunday}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Email */}
            <div className="p-6 rounded-3xl bg-[#0E1017]/90 border border-white/10 space-y-2">
              <div className="flex items-center space-x-3 text-brand-primary">
                <Mail className="w-5 h-5" />
                <h3 className="font-bold text-white uppercase text-xs tracking-wider">
                  Electronic Correspondence
                </h3>
              </div>
              <div className="pl-8 text-xs sm:text-sm text-slate-300 space-y-1">
                <p>
                  General:{" "}
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-white hover:underline">
                    {siteConfig.contact.email}
                  </a>
                </p>
                <p>
                  Sales:{" "}
                  <a href={`mailto:${siteConfig.contact.salesEmail}`} className="text-white hover:underline">
                    {siteConfig.contact.salesEmail}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Lead Enquiry Form */}
          <div className="lg:col-span-7 bg-[#0E1017]/95 rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            <div className="space-y-2 mb-8">
              <span className="text-xs uppercase tracking-widest text-brand-primary font-bold">
                Online Enquiry Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                Send A Direct Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Responses typically delivered via WhatsApp or phone within 15 minutes during showroom hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aditya Verma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="aditya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Nature of Enquiry
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-primary"
                  >
                    <option value="Buying a Certified Vehicle" className="bg-[#0E1017]">Buying a Certified Vehicle</option>
                    <option value="Selling My Car" className="bg-[#0E1017]">Selling My Car</option>
                    <option value="Car Financing & Low EMI" className="bg-[#0E1017]">Car Financing & Low EMI</option>
                    <option value="Schedule Doorstep Test Drive" className="bg-[#0E1017]">Schedule Doorstep Test Drive</option>
                    <option value="General Question" className="bg-[#0E1017]">General Question</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Your Message or Car Requirement
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us which car you are considering or your target delivery date..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Submit & Chat on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>

        {/* Embedded Interactive Google Map */}
        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[21/9] w-full">
          <iframe
            src={siteConfig.contact.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(110%)" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Dealership Showroom Location Map"
          />
        </div>
      </div>
    </div>
  );
}
