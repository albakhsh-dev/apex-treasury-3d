import React, { useState } from 'react'
import { ArrowUpRight, Menu, X, ChevronRight, Shield } from 'lucide-react'

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Infrastructure', href: '#infrastructure' },
    { name: 'Treasury', href: '#treasury' },
    { name: 'Quantum Core', href: '#quantum-core' },
    { name: 'Developers', href: '#developers' },
    { name: 'Security', href: '#security' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#08090d]/80 border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Status Pill */}
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all">
              <div className="w-full h-full bg-[#08090d] rounded-[7px] flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-cyan-400 font-bold text-base leading-none">
                  ▲
                </span>
              </div>
            </div>
            <span className="font-bold text-lg tracking-tight text-white group-hover:text-indigo-200 transition-colors">
              Apex<span className="text-indigo-400">Pay</span>
            </span>
          </a>

          {/* Institutional Status Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-zinc-400">v2.4</span>
            <span className="text-zinc-500">|</span>
            <span className="text-emerald-400 font-medium">99.999% Operational</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-sm font-medium text-zinc-300 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="#contact"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Institutional Portal
          </a>

          <a
            href="#app"
            className="relative group overflow-hidden rounded-full p-[1px] font-medium text-sm text-white"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full group-hover:opacity-100 opacity-80 blur-[2px] transition-opacity" />
            <span className="relative flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#0b0f19] transition-colors group-hover:bg-[#131926]">
              <span>Launch App</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="#app"
            className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            Launch
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#08090d]/95 backdrop-blur-2xl px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-zinc-200 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href="#app"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-center font-semibold text-white shadow-lg shadow-indigo-500/20"
            >
              Launch Institutional App
            </a>
            <div className="flex items-center justify-center gap-2 text-xs text-zinc-400 pt-2">
              <Shield className="w-3.5 h-3.5 text-cyan-400" /> SOC2 Type II Certified
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
