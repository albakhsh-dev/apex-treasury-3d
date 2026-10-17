import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

export const FintechCard: React.FC = () => {
  const cardGroupRef = useRef<THREE.Group>(null)
  const chipRef = useRef<THREE.Group>(null)

  // Track mouse pointer and apply smooth lerp parallax tilt
  useFrame((state, delta) => {
    if (!cardGroupRef.current) return

    // state.pointer coordinates range from -1 to 1
    const targetX = -state.pointer.y * 0.35 + Math.sin(state.clock.elapsedTime * 0.7) * 0.04
    const targetY = state.pointer.x * 0.45 + Math.cos(state.clock.elapsedTime * 0.5) * 0.05
    const targetZ = Math.sin(state.clock.elapsedTime * 0.9) * 0.08

    // Smooth lerp interpolation for cinematic inertia
    const lerpSpeed = 4.5 * delta
    cardGroupRef.current.rotation.x = THREE.MathUtils.lerp(cardGroupRef.current.rotation.x, targetX, lerpSpeed)
    cardGroupRef.current.rotation.y = THREE.MathUtils.lerp(cardGroupRef.current.rotation.y, targetY, lerpSpeed)
    cardGroupRef.current.position.y = THREE.MathUtils.lerp(cardGroupRef.current.position.y, targetZ, lerpSpeed)

    // Subtle gentle shimmer on the EMV chip
    if (chipRef.current) {
      chipRef.current.position.z = 0.033 + Math.sin(state.clock.elapsedTime * 2) * 0.001
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
