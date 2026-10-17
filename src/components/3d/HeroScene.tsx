import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { FintechCard } from './FintechCard'

// Floating abstract accents (Orb & Cyan Torus Ring)
const FloatingAccents: React.FC = () => {
  const orbRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const smallRingRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    if (orbRef.current) {
      orbRef.current.position.y = 1.25 + Math.sin(t * 1.2) * 0.18
      orbRef.current.position.x = -2.15 + Math.cos(t * 0.9) * 0.12
      orbRef.current.rotation.y += delta * 0.4
    }

    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.6
      ringRef.current.rotation.y += delta * 0.8
      ringRef.current.position.y = -1.1 + Math.sin(t * 1.4) * 0.15
      ringRef.current.position.x = 2.05 + Math.cos(t * 1.1) * 0.1
    }

    if (smallRingRef.current) {
      smallRingRef.current.rotation.x -= delta * 0.8
      smallRingRef.current.rotation.z += delta * 0.5
      smallRingRef.current.position.y = 1.5 + Math.sin(t * 1.0) * 0.12
    }
  })

  return (
    <>
      {/* Floating Holographic Distorted Sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={orbRef} position={[-2.15, 1.25, -0.6]}>
          <sphereGeometry args={[0.55, 64, 64]} />
          <MeshDistortMaterial
            color="#6366f1"
            speed={2}
            distort={0.35}
            roughness={0.15}
            metalness={0.85}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>

      {/* Floating Cyan Ring with Emissive Glow */}
      <mesh ref={ringRef} position={[2.05, -1.1, 0.4]} rotation={[0.8, 0.5, 0.2]}>
        <torusGeometry args={[0.6, 0.07, 24, 64]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={1.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Tiny Secondary Satellite Ring for extra optical depth */}
      <mesh ref={smallRingRef} position={[-1.6, -1.4, -0.4]} rotation={[1.2, -0.3, 0.4]}>
        <torusGeometry args={[0.28, 0.035, 16, 48]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={1.4}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Ambient Micro-Sparkles */}
      <Sparkles
        count={35}
        scale={6.5}
        size={2.2}
        speed={0.4}
        opacity={0.5}
        color="#818cf8"
      />
    </>
  )
}

export const HeroScene: React.FC = () => {
  return (
    <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] xl:h-[700px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing touch-pan-y">
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full touch-pan-y"
      >
        {/* Studio Lighting Setup as requested */}
        {/* Ambient Light: intensity 0.6 */}
        <ambientLight intensity={0.6} />

        {/* Key Directional Light: position [4, 5, 4], intensity 2.5 */}
        <directionalLight position={[4, 5, 4]} intensity={2.5} color="#ffffff" />

        {/* Indigo Rim PointLight: position [-4, 3, 2], intensity 6, color #818cf8 */}
        <pointLight position={[-4, 3, 2]} intensity={6} color="#818cf8" distance={15} decay={2} />

        {/* Cyan Rim PointLight: position [3, -3, 2], intensity 5, color #06b6d4 */}
        <pointLight position={[3, -3, 2]} intensity={5} color="#06b6d4" distance={15} decay={2} />

        {/* Magenta Accent PointLight: position [0, -2, -2], intensity 4, color #ec4899 */}
        <pointLight position={[0, -2, -2]} intensity={4} color="#ec4899" distance={12} decay={2} />

        {/* Front Soft Fill for embossed text readability */}
        <pointLight position={[0, 0, 4]} intensity={1.5} color="#ffffff" distance={10} decay={2} />

        {/* The 3D Procedural Fintech Card */}
        <FintechCard />

        {/* Floating Abstract Accents */}
        <FloatingAccents />
      </Canvas>
    </div>
  )
}
