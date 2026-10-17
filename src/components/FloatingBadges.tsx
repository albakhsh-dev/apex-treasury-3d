import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react'

export const FloatingBadges: React.FC = () => {
  return (
    <>
      {/* Top-Right Badge: Transaction Notification */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{
          opacity: 1,
          y: [0, -8, 0],
          scale: 1,
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 5,
            ease: 'easeInOut',
          },
          opacity: { duration: 0.8, delay: 0.2 },
          scale: { duration: 0.8, delay: 0.2 },
        }}
        className="absolute top-2 sm:top-6 right-2 sm:right-4 z-20 pointer-events-auto"
      >
        <div className="backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-3.5 sm:p-4 shadow-2xl shadow-black/60 hover:border-indigo-500/40 transition-all duration-300 group max-w-[270px] sm:max-w-[310px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-500/20 transition-all">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Instant Inflow
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">Just now</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white tracking-tight flex items-baseline gap-1 mt-0.5">
                <span>+$24,850.00</span>
                <span className="text-xs font-mono text-zinc-400 font-normal">USD</span>
              </div>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400">
            <span className="font-mono text-[10px] text-zinc-400">TX #8924-FEDWIRE</span>
            <span className="flex items-center gap-1 text-emerald-400/90 text-[10px]">
              <CheckCircle2 className="w-3 h-3" /> Settled in 240ms
            </span>
          </div>
        </div>
      </motion.div>

      {/* Bottom-Left Pill: Security & SLA Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{
          opacity: 1,
          y: [0, 8, 0],
          scale: 1,
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 6,
            ease: 'easeInOut',
            delay: 0.5,
          },
          opacity: { duration: 0.8, delay: 0.4 },
          scale: { duration: 0.8, delay: 0.4 },
        }}
        className="absolute bottom-10 sm:bottom-14 left-2 sm:left-6 z-20 pointer-events-auto"
      >
        <div className="backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-full px-4 py-2.5 shadow-2xl shadow-black/60 hover:border-cyan-500/40 transition-all duration-300 flex items-center gap-2.5 group">
          <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs sm:text-sm font-medium text-zinc-200 tracking-wide flex items-center gap-1.5">
            <span className="font-semibold text-white">Zero-Knowledge Ledger</span>
            <span className="text-zinc-400">•</span>
            <span className="text-cyan-400 font-mono text-xs">99.999% SLA</span>
          </div>
        </div>
      </motion.div>
    </>
  )
}
