import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Activity,
  Cpu,
  RefreshCw,
  ShieldAlert,
  Sliders,
  Flame,
  Droplets,
  Sun,
  Eye
} from 'lucide-react'
import CrystalizedBall from './CrystalizedBall'

type PresetKey = 'nebula' | 'plasma' | 'aurora' | 'solar' | 'abyss'

interface PresetInfo {
  id: PresetKey
  name: string
  subtitle: string
  color: string
  icon: React.ReactNode
  stats: {
    throughput: string
    settlement: string
    poolSize: string
    encryption: string
  }
  description: string
}

const PRESETS: Record<PresetKey, PresetInfo> = {
  nebula: {
    id: 'nebula',
    name: 'Nebula Core',
    subtitle: 'Institutional Multi-Currency Mesh',
    color: '#9478FF',
    icon: <Sparkles className="w-4 h-4" />,
    stats: {
      throughput: '185,000 TPS',
      settlement: '160 ms',
      poolSize: '$1.85B Active',
      encryption: 'Kyber-1024 Quantum-Safe'
    },
    description: 'Autonomous liquidity rebalancing across 40+ Tier-1 clearinghouses with real-time volatility dampening.'
  },
  plasma: {
    id: 'plasma',
    name: 'Plasma Settle',
    subtitle: 'High-Frequency Arbitrage Engine',
    color: '#F25BD0',
    icon: <Zap className="w-4 h-4" />,
    stats: {
      throughput: '320,000 TPS',
      settlement: '85 ms',
      poolSize: '$940M Hot Pool',
      encryption: 'Zero-Knowledge SNARK'
    },
    description: 'Sub-100ms algorithmic execution pipes tuned for programmatic arbitrage and high-velocity liquidity provision.'
  },
  aurora: {
    id: 'aurora',
    name: 'Aurora ESG',
    subtitle: 'Green Bond & Carbon Clearing',
    color: '#5CFFC8',
    icon: <Droplets className="w-4 h-4" />,
    stats: {
      throughput: '120,000 TPS',
      settlement: '210 ms',
      poolSize: '$620M Verified',
      encryption: 'Proof-of-Integrity'
    },
    description: 'Verifiable green capital rails with embedded carbon-credit offset validation at the block consensus level.'
  },
  solar: {
    id: 'solar',
    name: 'Solar Reserve',
    subtitle: 'Tokenized RWA & Gold Treasury',
    color: '#FFD36E',
    icon: <Sun className="w-4 h-4" />,
    stats: {
      throughput: '95,000 TPS',
      settlement: '240 ms',
      poolSize: '$2.4B Bullion Backed',
      encryption: 'Dual-Custody HSM'
    },
    description: 'Audited physical asset tokenization with continuous real-time Proof of Reserves (PoR) oracle feeds.'
  },
  abyss: {
    id: 'abyss',
    name: 'Abyss Vault',
    subtitle: 'Deep Cold Storage & Dark Liquidity',
    color: '#3F7BFF',
    icon: <Eye className="w-4 h-4" />,
    stats: {
      throughput: '68,000 TPS',
      settlement: '310 ms',
      poolSize: '$3.8B Isolated',
      encryption: 'Threshold MPC Air-Gap'
    },
    description: 'Military-grade air-gapped cryptographic vaults designed for sovereign reserves and confidential dark-pool settlements.'
  }
}

export const QuantumCoreShowcase: React.FC = () => {
  const [activePreset, setActivePreset] = useState<PresetKey>('nebula')
  const [fillLevel, setFillLevel] = useState<number>(0.5)
  const [crackleStrength, setCrackleStrength] = useState<number>(0.85)
  const current = PRESETS[activePreset]

  return (
    <section className="relative z-10 mt-28 sm:mt-36 pt-16 pb-20 border-t border-white/[0.08]">
      {/* Background radial glow matching active preset color */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] blur-[160px] opacity-20 rounded-full transition-colors duration-700"
        style={{ backgroundColor: current.color }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 mb-3">
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: current.color }} />
              <span className="uppercase tracking-widest text-[11px]">Interactive Quantum Core</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              The Singularity Engine.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Interact directly with the algorithmic liquidity sphere below. Move your cursor to stir the dust wake or click the sphere to discharge quantum arcs.
            </p>
          </div>

          {/* Preset Selector Badges */}
          <div className="flex flex-wrap items-center gap-2 bg-[#0c1017] p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl">
            {(Object.keys(PRESETS) as PresetKey[]).map((key) => {
              const item = PRESETS[key]
              const isActive = activePreset === key
              return (
                <button
                  key={key}
                  onClick={() => setActivePreset(key)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white/10 text-white shadow-lg border border-white/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                  style={{
                    borderColor: isActive ? `${item.color}60` : undefined,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: item.color,
                      boxShadow: isActive ? `0 0 10px ${item.color}` : 'none',
                    }}
                  />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Interactive Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0c1017]/80 rounded-3xl border border-white/10 p-4 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          
          {/* Subtle Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Left Column: Interactive CrystalizedBall Stage */}
          <div className="lg:col-span-7 relative w-full h-[420px] sm:h-[500px] md:h-[540px] rounded-2xl overflow-hidden bg-black/40 border border-white/[0.06] flex items-center justify-center group select-none">
            
            <CrystalizedBall
              key={activePreset}
              preset={activePreset}
              color={current.color}
              size={0.78}
              crackle={crackleStrength}
              fill={fillLevel}
              glow={1.1}
              flares={0.75}
              sparks={0.7}
              particleCount={18000}
              speed={1.1}
              interactive={true}
              hoverStrength={0.8}
            />

            {/* Stage HUD Badges Overlaid on top of ball */}
            <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-[11px] font-mono text-zinc-300">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>LIVE HARMONIC MESH</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 sm:right-auto pointer-events-none flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-xs text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: current.color }} />
              <span>Click ball to discharge electric arc • Drag to stir dust wake</span>
            </div>
          </div>

          {/* Right Column: Telemetry & Controls Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Header info for selected preset */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePreset}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: current.color }}
                  />
                  <span>{current.subtitle}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {current.name}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Real-time Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[11px] font-mono text-zinc-400 uppercase">Throughput</div>
                <div className="text-base sm:text-lg font-bold text-white mt-0.5 font-mono">
                  {current.stats.throughput}
                </div>
                <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400" /> Non-blocking consensus
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[11px] font-mono text-zinc-400 uppercase">Finality Time</div>
                <div className="text-base sm:text-lg font-bold text-cyan-400 mt-0.5 font-mono">
                  {current.stats.settlement}
                </div>
                <div className="text-[10px] text-zinc-400 mt-1">Global average</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[11px] font-mono text-zinc-400 uppercase">Liquidity Depth</div>
                <div className="text-base sm:text-lg font-bold text-white mt-0.5 font-mono">
                  {current.stats.poolSize}
                </div>
                <div className="text-[10px] text-indigo-400 mt-1">Auto-rebalanced</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[11px] font-mono text-zinc-400 uppercase">Security Scheme</div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-1 leading-snug">
                  {current.stats.encryption}
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Zero-knowledge proof</div>
              </div>
            </div>

            {/* Interactive Physics Tuners */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Real-Time Energy Modulator
                </span>
                <span className="font-mono text-zinc-400">WebGL2 GLSL</span>
              </div>

              {/* Plasma Crackle Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>Strand Crackle & Jitter</span>
                  <span className="font-mono text-white">{Math.round(crackleStrength * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1.3"
                  step="0.05"
                  value={crackleStrength}
                  onChange={(e) => setCrackleStrength(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-white/10 rounded-lg h-1.5 cursor-pointer"
                />
              </div>

              {/* Dust Pool Fill Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>Dust Volume & Float Height</span>
                  <span className="font-mono text-white">{Math.round(fillLevel * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={fillLevel}
                  onChange={(e) => setFillLevel(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-white/10 rounded-lg h-1.5 cursor-pointer"
                />
              </div>
            </div>

            {/* Quick Action */}
            <div className="pt-2">
              <a
                href="#app"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white font-medium text-sm transition-all shadow-lg"
              >
                <span>Deploy Node with {current.name}</span>
                <span className="text-cyan-400">→</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
