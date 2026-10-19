"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";
import { siteConfig } from "@/config/site.config";

interface CarModelProps {
  pointerPosition: { x: number; y: number };
  isDragging?: boolean;
  manualRotation?: number;
}

export function CarModel({
  pointerPosition,
  isDragging = false,
  manualRotation = 0,
}: CarModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(siteConfig.theme.threeD.modelPath);

  // Clone scene and apply dynamic paint color from config
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    const paintColor = new THREE.Color(siteConfig.theme.threeD.carPaintColor);

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Check if material is body paint or primary shell
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          const name = (mat.name || "").toLowerCase();
          const meshName = (mesh.name || "").toLowerCase();

          // If material or mesh belongs to body/paint
          if (
            name.includes("body") ||
            name.includes("paint") ||
            name.includes("car") ||
            meshName.includes("body") ||
            name.includes("exterior")
          ) {
            mat.color = paintColor;
            mat.roughness = siteConfig.theme.threeD.carPaintRoughness;
            mat.metalness = siteConfig.theme.threeD.carPaintMetalness;
            // @ts-ignore - clearcoat is supported on MeshPhysicalMaterial
            if ("clearcoat" in mat) {
              // @ts-ignore
              mat.clearcoat = siteConfig.theme.threeD.carPaintClearcoat;
              // @ts-ignore
              mat.clearcoatRoughness = siteConfig.theme.threeD.carPaintClearcoatRoughness;
            }
          }
        }
      }
    });

    return clone;
  }, [scene]);

  // Frame loop for parallax rotation and idle animation
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!isDragging) {
      // Gentle idle spin + mouse parallax
      const targetRotationY =
        manualRotation +
        state.clock.getElapsedTime() * 0.08 +
        pointerPosition.x * 0.35;
      const targetRotationX = -pointerPosition.y * 0.12;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.05
      );
    } else {
      groupRef.current.rotation.y = manualRotation;
    }
  });

  return (
    <Float
      speed={1.4}
      rotationIntensity={0.06}
      floatIntensity={0.06}
      floatingRange={[-0.04, 0.04]}
    >
      <group
        ref={groupRef}
        position={[0, -0.4, 0]}
        rotation={[0, -Math.PI / 4, 0]}
        scale={[0.85, 0.85, 0.85]}
      >
        <primitive object={clonedScene} />
      </group>
    </Float>
  );
}

// Preload the 3D model
useGLTF.preload(siteConfig.theme.threeD.modelPath);
