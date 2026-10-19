"use client";

import { siteConfig } from "@/config/site.config";
import { Phone, MessageCircle } from "lucide-react";
import { createWhatsAppLeadLink } from "@/lib/formatters";

export function FloatingMobileDock() {
  const whatsappUrl = createWhatsAppLeadLink(
    siteConfig.contact.whatsappNumber,
    `Hi ${siteConfig.brand.name}, I am browsing your cars on your website and would like assistance.`
  );

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
      <div className="bg-[#0E1017]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-2 flex items-center space-x-2 shadow-floating-dock">
        <a
          href={`tel:${siteConfig.contact.phoneRaw}`}
          className="flex-1 flex items-center justify-center py-3 px-3 rounded-xl bg-white/10 text-white font-semibold text-xs tracking-wider uppercase border border-white/10 active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 mr-1.5 text-brand-primary" />
          <span>Call Us</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center py-3 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-emerald-600/30 active:scale-95 transition-all"
        >
          <MessageCircle className="w-4 h-4 mr-1.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
