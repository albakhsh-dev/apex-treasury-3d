# ▲ Apex Treasury 3D

> **Global Capital Engineered for Speed.**  
> A high-performance, dark-mode 3D Fintech Landing Page Hero & Singularity Engine inspired by luxury Dribbble designs (Alex Bender / FANCY fintech aesthetic).

![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r0.174-000000?logo=three.js&logoColor=white)
![OGL](https://img.shields.io/badge/OGL-WebGL2-FF5722)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)

---

## ✦ Key Highlights

### 1. Procedural 3D Obsidian Fintech Card (Zero External Models)
- **Geometry**: Precision `<RoundedBox args={[3.35, 2.12, 0.06]} radius={0.12} smoothness={8}>` matching physical ISO card proportions.
- **Obsidian Glass Material**: Tuned `<meshPhysicalMaterial>` with `metalness={0.85}`, `roughness={0.15}`, `clearcoat={1.0}`, `iridescence={0.75}`, `iridescenceIOR={1.3}`, and `reflectivity={0.9}`.
- **Surface Accents**:
  - Golden EMV Chip with micro-circuit division lines.
  - Overlapping translucent magenta and indigo brand identity circles with contactless RFID wave geometry.
  - 3D embossed typography for Bank Name (`APEX BLACK TREASURY`), card number (`•••• •••• •••• 8924`), cardholder name, and expiration date.
- **Cinematic Mouse Parallax**: Smooth `useFrame` pointer lerping with momentum inertia tilt on X and Y axes.

### 2. Dual WebGL Physics: Studio Scene & Crystalized Singularity Engine
- **Studio Lighting**: Key directional light (`2.5`), cyan and indigo dual-rim point lights, and magenta backfill.
- **Living Plasma Aura**: Procedural `<CrystalizedBall />` component layered behind the 3D card for depth and atmospheric energy.
- **The Singularity Engine (Interactive Quantum Core)**:
  - 5 Interactive Liquidity Presets: **Nebula Core** (Multi-Currency), **Plasma Settle** (HFT Arbitrage), **Aurora ESG** (Green Capital), **Solar Reserve** (Tokenized Gold), and **Abyss Vault** (Air-Gapped MPC).
  - WebGL2 GPGPU particle simulation with fluid dust wake stirring on mouse drag.
  - Interactive click-to-discharge quantum lightning arcs across the rim.
  - Real-time physics sliders for strand crackle and dust pool float height.

### 3. Glassmorphic HUD & Design System
- Frosted glass navigation bar with live status pill (`v2.4 | 99.999% Operational`) and Launch App glowing CTA.
- Floating Framer Motion HUD badges: Instant Inflow notification (`+$24,850.00 USD Settled in 240ms`) and Zero-Knowledge Ledger SLA pill.
- Curated luxury dark palette: `bg-dark` (`#08090d`), `card-dark` (`#0f131a`), `accent-primary` (`#6366f1`), `accent-cyan` (`#06b6d4`).

---

## ✦ Tech Stack

| Domain | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **3D Engine** | [Three.js](https://threejs.org/) + [@react-three/fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://github.com/pmndrs/drei) |
| **Shaders & GPGPU** | [OGL](https://github.com/oframe/ogl) WebGL2 Pipeline |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + Custom Glassmorphism |
| **Micro-Interactions** | [Framer Motion](https://www.framer.com/motion/) + [Lucide Icons](https://lucide.dev/) |

---

## ✦ Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/albakhsh-dev/apex-treasury-3d.git
   cd apex-treasury-3d
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## ✦ Deploying to Vercel

This repository is optimized for one-click deployment on [Vercel](https://vercel.com):

1. Go to **[vercel.com/new](https://vercel.com/new)**.
2. Import the `albakhsh-dev/apex-treasury-3d` repository.
3. Framework Preset: **Vite** (auto-detected).
4. Build Command: `npm run build` (auto-detected).
5. Output Directory: `dist` (auto-detected).
6. Click **Deploy**.

---

## ✦ License

MIT © 2026 [ALBAKHSH KHAN](https://github.com/albakhsh-dev).
