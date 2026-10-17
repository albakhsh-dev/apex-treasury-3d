import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Terminal,
  Shield,
  Zap,
  CheckCircle,
  Globe,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react'
import { Navbar } from './components/Navbar'
import { HeroScene } from './components/3d/HeroScene'
import { FloatingBadges } from './components/FloatingBadges'
import CrystalizedBall from './components/CrystalizedBall'
import { QuantumCoreShowcase } from './components/QuantumCoreShowcase'

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#08090d] text-white selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden font-sans">
      {/* 1. Ambient Background Glow Meshes */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Primary Radial Glow Mesh */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[650px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/10 to-cyan-500/10 blur-[140px] rounded-full" />
        
        {/* Subtle Cyan Rim Glow on the right for 3D depth */}
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-cyan-500/10 blur-[130px] rounded-full" />
        
        {/* Subtle Indigo Accent on bottom-left */}
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-indigo-600/10 blur-[120px] rounded-full" />

        {/* Fine-grid subtle background lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* 2. Top Navigation */}
      <Navbar />

      {/* 3. Hero Section Container */}
      <main className="relative z-10 pt-24 sm:pt-28 lg:pt-32 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content & Typography */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start space-y-6 sm:space-y-8">
            
            {/* Status Pill: "✦ Institutional Treasury v2.4 Live" */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-indigo-500/40 backdrop-blur-md transition-all group cursor-pointer"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-medium tracking-wide text-zinc-300 group-hover:text-white transition-colors">
                <span className="text-indigo-400 font-semibold">✦ Institutional Treasury v2.4</span> Live
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
            </motion.div>

            {/* Main H1: "Global Capital Engineered for Speed." */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08]">
                Global Capital{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-cyan-300">
                  Engineered
                </span>{' '}
                for Speed.
              </h1>
            </motion.div>

            {/* Subtitle: High-contrast muted typography describing sub-second settlements */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl font-normal"
            >
              Next-generation algorithmic liquidity and multi-currency clearing infrastructure. Settle multi-million dollar institutional flows in under 240 milliseconds with zero slippage and cryptographic finality.
            </motion.p>

            {/* CTAs: Primary glowing pill button & Secondary glass button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
            >
              {/* Primary Glowing Pill Button ("Start Integration") */}
              <a
                href="#integration"
                className="relative group overflow-hidden rounded-full p-[1px] transition-all duration-300 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full opacity-90 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#08090d] text-white font-semibold text-sm transition-all group-hover:bg-[#0e121c]">
                  <span>Start Integration</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              {/* Secondary Glass Button ("Schedule Architecture Call") */}
              <a
                href="#schedule"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white font-medium text-sm backdrop-blur-lg transition-all group"
              >
                <Terminal className="w-4 h-4 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                <span>Schedule Architecture Call</span>
              </a>
            </motion.div>

            {/* Feature Micro-Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2 text-xs text-zinc-400"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Direct FedNow & RTGS Pipes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                <span>Automated FX Hedging</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Counterparty Risk</span>
              </div>
            </motion.div>

            {/* Social Proof Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-full pt-6 mt-4 border-t border-white/[0.08] grid grid-cols-3 gap-4"
            >
              <div>
                <div className="text-xs font-mono font-medium tracking-wider uppercase text-zinc-400">
                  Compliance
                </div>
                <div className="text-sm sm:text-base font-bold text-white tracking-tight mt-1">
                  SOC2 TYPE II
                </div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">CERTIFIED</div>
              </div>

              <div>
                <div className="text-xs font-mono font-medium tracking-wider uppercase text-zinc-400">
                  Standard
                </div>
                <div className="text-sm sm:text-base font-bold text-white tracking-tight mt-1">
                  PCI-DSS
                </div>
                <div className="text-[11px] text-cyan-400 font-mono mt-0.5">LEVEL 1 AUDITED</div>
              </div>

              <div>
                <div className="text-xs font-mono font-medium tracking-wider uppercase text-zinc-400">
                  Volume
                </div>
                <div className="text-sm sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200 tracking-tight mt-1">
                  $4.2B+
                </div>
                <div className="text-[11px] text-emerald-400 font-mono mt-0.5">SETTLED (Q3)</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 3D Scene + Crystalized Energy Ball + Floating Badges */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center">
            
            {/* Visual Backlight Glow specifically highlighting the 3D Card */}
            <div className="absolute w-[440px] h-[440px] bg-gradient-to-tr from-indigo-500/25 via-cyan-500/15 to-purple-500/15 blur-[110px] rounded-full pointer-events-none" />
            
            {/* Living Crystalized Plasma Aura behind the 3D card */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-85 scale-90 sm:scale-100 transition-all">
              <CrystalizedBall
                preset="nebula"
                color="#6366f1"
                size={0.76}
                crackle={0.85}
                glow={1.15}
                flares={0.7}
                sparks={0.65}
                particleCount={14000}
                fill={0.5}
                interactive={false}
              />
            </div>

            {/* 3D Canvas Scene */}
            <div className="relative w-full z-10">
              <HeroScene />
              {/* Glassmorphic Floating Badges Overlaid on top of 3D Canvas */}
              <FloatingBadges />
            </div>

            {/* Interactive 3D Cursor Hint Pill */}
            <div className="absolute -bottom-2 sm:bottom-1 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md pointer-events-none text-[11px] text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span>Interactive 3D Obsidian Card + Plasma Singularity Halo</span>
            </div>

          </div>

        </div>

        {/* 4. Interactive Quantum Core / Singularity Engine Section */}
        <div id="quantum-core">
          <QuantumCoreShowcase />
        </div>

        {/* 4. Architectural Highlights Row */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 sm:mt-28 pt-12 border-t border-white/[0.08]"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono tracking-widest uppercase text-cyan-400 font-semibold">
              // INSTITUTIONAL INFRASTRUCTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-2">
              Engineered for Tier-1 Banks & Fintech Unicorns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Sub-Second Settlement</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Direct integration with SWIFT GPI, FedNow, and SEPA Instant. Guaranteed atomic transactions with zero counterparty wait times.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Cryptographic Custody</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Multi-party computation (MPC) and hardware security modules (HSM) guarantee multi-signature treasury isolation for enterprise assets.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-purple-500/40 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Omni-Currency Liquidity</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Single unified treasury account spanning 40+ fiat currencies and stablecoins with real-time automated rebalancing corridors.
              </p>
            </div>
          </div>
        </motion.section>
      </main>

      {/* 5. Minimal Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] py-8 text-center text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-300">▲ ApexPay Technologies Inc.</span>
            <span>© 2026. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-zinc-200 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-zinc-200 transition-colors">Terms of Protocol</a>
            <a href="#security" className="hover:text-zinc-200 transition-colors">Security Whitepaper</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
