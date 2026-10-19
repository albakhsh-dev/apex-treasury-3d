"use client";

import { useState, useEffect } from "react";

export interface DeviceCapability {
  isLowEnd: boolean;
  isWebGLSupported: boolean;
  prefersReducedMotion: boolean;
  canRender3D: boolean;
  dpr: number;
  isMobile: boolean;
  isChecking: boolean;
}

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    isLowEnd: false,
    isWebGLSupported: true,
    prefersReducedMotion: false,
    canRender3D: true,
    dpr: 1.5,
    isMobile: false,
    isChecking: true,
  });

  useEffect(() => {
    // 1. Motion Preferences
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = motionQuery.matches;

    // 2. Mobile Detection
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

    // 3. Hardware Concurrency & Memory (Budget phone detection)
    const concurrency = navigator.hardwareConcurrency || 4;
    // @ts-ignore - deviceMemory is available in Chrome/Edge
    const memory = navigator.deviceMemory || 8;
    const isLowSpecs = concurrency <= 3 || memory <= 3;

    // 4. WebGL Support Verification
    let isWebGLSupported = false;
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      isWebGLSupported = !!(gl && gl instanceof WebGLRenderingContext || gl instanceof WebGL2RenderingContext);
      if (gl && "getExtension" in gl) {
        const loseContext = (gl as any).getExtension("WEBGL_lose_context");
        if (loseContext) loseContext.loseContext();
      }
    } catch (e) {
      isWebGLSupported = false;
    }

    // 5. Pixel Ratio Limiter (capping at 2 for performance)
    const rawDpr = window.devicePixelRatio || 1;
    const dpr = isMobile ? Math.min(rawDpr, 1.5) : Math.min(rawDpr, 2.0);

    // Can we render full 3D?
    // Must have WebGL, not explicitly low-end, and user hasn't requested reduced motion
    const canRender3D = isWebGLSupported && !prefersReducedMotion && !isLowSpecs;

    setCapability({
      isLowEnd: isLowSpecs,
      isWebGLSupported,
      prefersReducedMotion,
      canRender3D,
      dpr,
      isMobile,
      isChecking: false,
    });
  }, []);

  return capability;
}
