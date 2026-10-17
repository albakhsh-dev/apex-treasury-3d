import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

export const FintechCard: React.FC = () => {
  const cardGroupRef = useRef<THREE.Group>(null)
  const chipRef = useRef<THREE.Group>(null)
  const touchState = useRef({
    x: 0,
    y: 0,
    active: false,
    gyroX: 0,
    gyroY: 0,
    hasGyro: false,
  })

  // Listen to mobile touch gestures and gyroscope orientation
  useEffect(() => {
    let startX = 0
    let startY = 0

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        startX = e.touches[0].clientX
        startY = e.touches[0].clientY
        touchState.current.active = true
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0]
        // Normalized delta from center or viewport
        const nx = (touch.clientX / window.innerWidth) * 2 - 1
        const ny = -(touch.clientY / window.innerHeight) * 2 + 1
        touchState.current.x = nx * 1.2
        touchState.current.y = ny * 1.2
        touchState.current.active = true
      }
    }

    const handleTouchEnd = () => {
      // Smoothly let autonomous float take over
      touchState.current.active = false
    }

    // Mobile Gyroscope support for tilting physical phone
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: left-to-right tilt [-90, 90]
        // beta: front-to-back tilt [-180, 180]
        const gx = THREE.MathUtils.clamp(e.gamma / 35, -1, 1)
        const gy = THREE.MathUtils.clamp((e.beta - 40) / 35, -1, 1)
        touchState.current.gyroX = gx
        touchState.current.gyroY = gy
        touchState.current.hasGyro = true
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true })

    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true })
    }

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', handleTouchEnd)
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        window.removeEventListener('deviceorientation', handleOrientation)
      }
    }
  }, [])

  // Track mouse pointer & touch coordinates with smooth lerp parallax tilt
  useFrame((state, delta) => {
    if (!cardGroupRef.current) return

    const t = state.clock.elapsedTime
    const touch = touchState.current

    // Autonomous cinematic idle float (amplified on mobile so it's always alive)
    const autoX = Math.sin(t * 0.9) * 0.16
    const autoY = Math.cos(t * 0.7) * 0.22
    const autoZ = Math.sin(t * 1.2) * 0.12

    // Determine input source: Active touch > Gyroscope > Mouse Pointer > Idle Float
    let inputX = state.pointer.x
    let inputY = state.pointer.y

    if (touch.active) {
      inputX = touch.x
      inputY = touch.y
    } else if (touch.hasGyro) {
      inputX = touch.gyroX * 0.8
      inputY = -touch.gyroY * 0.8
    }

    // Target rotation: combines input tilt with organic floating wave
    const targetX = -inputY * 0.42 + autoX
    const targetY = inputX * 0.52 + autoY
    const targetZ = autoZ

    // Smooth lerp interpolation for cinematic physical weight
    const lerpSpeed = Math.min(6 * delta, 0.2)
    cardGroupRef.current.rotation.x = THREE.MathUtils.lerp(cardGroupRef.current.rotation.x, targetX, lerpSpeed)
    cardGroupRef.current.rotation.y = THREE.MathUtils.lerp(cardGroupRef.current.rotation.y, targetY, lerpSpeed)
    cardGroupRef.current.rotation.z = THREE.MathUtils.lerp(cardGroupRef.current.rotation.z, Math.sin(t * 0.6) * 0.03 - inputX * 0.05, lerpSpeed)
    cardGroupRef.current.position.y = THREE.MathUtils.lerp(cardGroupRef.current.position.y, targetZ, lerpSpeed)

    // Subtle gentle shimmer on the golden EMV chip
    if (chipRef.current) {
      chipRef.current.position.z = 0.033 + Math.sin(t * 2) * 0.001
    }
  })

  return (
    <group ref={cardGroupRef} position={[0, 0, 0]} rotation={[0.08, -0.15, 0.02]}>
      {/* Primary Card Body: Obsidian Glass Physical Material */}
      <RoundedBox args={[3.35, 2.12, 0.06]} radius={0.12} smoothness={8}>
        <meshPhysicalMaterial
          color="#0b0f19"
          metalness={0.85}
          roughness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          iridescence={0.75}
          iridescenceIOR={1.3}
          reflectivity={0.9}
        />
      </RoundedBox>

      {/* Subtle Inner Bevel / Rim Accent for high-end refraction highlight */}
      <mesh position={[0, 0, 0.031]}>
        <planeGeometry args={[3.15, 1.92]} />
        <meshBasicMaterial
          color="#1e293b"
          transparent
          opacity={0.08}
          wireframe={false}
        />
      </mesh>

      {/* Golden EMV Chip */}
      <group ref={chipRef} position={[-1.0, 0.22, 0.033]}>
        <RoundedBox args={[0.55, 0.42, 0.02]} radius={0.03} smoothness={4}>
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.9}
            roughness={0.2}
            envMapIntensity={1.5}
          />
        </RoundedBox>
        {/* Micro-circuit divider lines on EMV Chip */}
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[0.51, 0.015]} />
          <meshBasicMaterial color="#78350f" />
        </mesh>
        <mesh position={[0, 0.09, 0.012]}>
          <planeGeometry args={[0.51, 0.015]} />
          <meshBasicMaterial color="#78350f" />
        </mesh>
        <mesh position={[0, -0.09, 0.012]}>
          <planeGeometry args={[0.51, 0.015]} />
          <meshBasicMaterial color="#78350f" />
        </mesh>
        <mesh position={[0.08, 0, 0.012]}>
          <planeGeometry args={[0.015, 0.38]} />
          <meshBasicMaterial color="#78350f" />
        </mesh>
        <mesh position={[-0.08, 0, 0.012]}>
          <planeGeometry args={[0.015, 0.38]} />
          <meshBasicMaterial color="#78350f" />
        </mesh>
      </group>

      {/* Contactless RFID Icon Waves near the chip */}
      <group position={[-0.45, 0.22, 0.032]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[0.06, 0.075, 24, 1, 0, Math.PI]} />
          <meshBasicMaterial color="#475569" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <ringGeometry args={[0.11, 0.125, 24, 1, 0, Math.PI]} />
          <meshBasicMaterial color="#475569" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <ringGeometry args={[0.16, 0.175, 24, 1, 0, Math.PI]} />
          <meshBasicMaterial color="#475569" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Overlapping Brand Logo Circles (Mastercard / Fintech style) */}
      <group position={[1.15, 0.68, 0.033]}>
        {/* Left Circle: Magenta/Rose */}
        <mesh position={[-0.15, 0, 0]}>
          <circleGeometry args={[0.26, 32]} />
          <meshBasicMaterial
            color="#ec4899"
            transparent
            opacity={0.88}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Right Circle: Indigo */}
        <mesh position={[0.15, 0, 0.001]}>
          <circleGeometry args={[0.26, 32]} />
          <meshBasicMaterial
            color="#6366f1"
            transparent
            opacity={0.88}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Bank Name: "APEX" (top-left) */}
      <Text
        position={[-1.15, 0.72, 0.034]}
        fontSize={0.2}
        font={undefined}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.12}
        fontWeight="bold"
      >
        APEX
      </Text>

      {/* Institutional Tier Subtitle */}
      <Text
        position={[-1.14, 0.54, 0.034]}
        fontSize={0.065}
        color="#818cf8"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.2}
      >
        BLACK TREASURY
      </Text>

      {/* Card Number: "••••  ••••  ••••  8924" (center) */}
      <Text
        position={[-1.15, -0.15, 0.034]}
        fontSize={0.16}
        color="#e2e8f0"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.1}
      >
        {"••••   ••••   ••••   8924"}
      </Text>

      {/* Cardholder Label */}
      <Text
        position={[-1.15, -0.56, 0.034]}
        fontSize={0.055}
        color="#64748b"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.15}
      >
        CARDHOLDER
      </Text>

      {/* Cardholder Name: "ALEXANDER CHEN" (bottom-left) */}
      <Text
        position={[-1.15, -0.72, 0.034]}
        fontSize={0.105}
        color="#cbd5e1"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.08}
        fontWeight="bold"
      >
        ALEXANDER CHEN
      </Text>

      {/* Expiry Label */}
      <Text
        position={[0.9, -0.56, 0.034]}
        fontSize={0.055}
        color="#64748b"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.15}
      >
        EXPIRES
      </Text>

      {/* Expiry: "08/29" (bottom-right) */}
      <Text
        position={[0.9, -0.72, 0.034]}
        fontSize={0.105}
        color="#cbd5e1"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.08}
        fontWeight="bold"
      >
        08/29
      </Text>

      {/* Back Surface Elements (Magnetic stripe and hologram if tilted) */}
      <group position={[0, 0, -0.032]} rotation={[0, Math.PI, 0]}>
        {/* Magnetic Stripe */}
        <mesh position={[0, 0.45, 0]}>
          <planeGeometry args={[3.34, 0.45]} />
          <meshStandardMaterial color="#020408" roughness={0.3} metalness={0.9} />
        </mesh>
        {/* Signature & CVV Panel */}
        <mesh position={[-0.4, -0.1, 0]}>
          <planeGeometry args={[1.8, 0.3]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>
        <Text
          position={[0.7, -0.1, 0.002]}
          fontSize={0.08}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
        >
          CVV 492
        </Text>
      </group>
    </group>
  )
}
