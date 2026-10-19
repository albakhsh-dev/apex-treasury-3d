"use client";

import { Environment, ContactShadows } from "@react-three/drei";
import { siteConfig } from "@/config/site.config";

export function StudioLighting() {
  const { theme } = siteConfig;

  return (
    <>
      {/* Realistic HDRI Studio Environment Reflections */}
      <Environment preset="city" environmentIntensity={0.65} />

      {/* Ambient Fill */}
      <ambientLight intensity={theme.threeD.ambientLightIntensity} />

      {/* Main Overhead Key Light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Frontal Soft Fill */}
      <directionalLight position={[-4, 4, 6]} intensity={0.8} />

      {/* Dramatic Brand Colored Rim Lights */}
      <pointLight
        position={[-6, 2, -4]}
        color={theme.accent}
        intensity={2.5}
        distance={14}
      />
      <pointLight
        position={[6, 2, -4]}
        color={theme.primary}
        intensity={2.2}
        distance={14}
      />

      {/* Under-glow soft floor reflection */}
      <pointLight
        position={[0, -0.6, 0]}
        color={theme.accent}
        intensity={0.6}
        distance={4}
      />

      {/* Contact Shadow on Floor */}
      <ContactShadows
        position={[0, -0.42, 0]}
        opacity={0.75}
        scale={10}
        blur={2.4}
        far={3.5}
        resolution={1024}
        color="#000000"
      />
    </>
  );
}
