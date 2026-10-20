"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  RotateCw,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
} from "lucide-react";

interface CarViewer360Props {
  images360?: string[];
  images: string[];
  title: string;
}

export function CarViewer360({ images360, images, title }: CarViewer360Props) {
  const has360 = images360 && images360.length > 0;
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const getImageSrc = (src: string | undefined) => {
    if (!src || failedImages[src]) {
      return "/images/placeholder-car.svg";
    }
    return src;
  };

  const handleImageError = (src: string | undefined) => {
    if (src) {
      setFailedImages((prev) => ({ ...prev, [src]: true }));
    }
  };

  const totalFrames = has360 ? images360!.length : 0;

  // Auto rotation loop
  useEffect(() => {
    if (!autoRotate || !has360) return;
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % totalFrames);
    }, 120);
    return () => clearInterval(interval);
  }, [autoRotate, has360, totalFrames]);

  // Pointer drag scrubber for 360 view
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!has360) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setAutoRotate(false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!has360 || !isDragging) return;
    const deltaX = e.clientX - startX;
    const sensitivity = 15; // pixels per frame

    if (Math.abs(deltaX) > sensitivity) {
      const step = Math.sign(deltaX);
      setCurrentFrame((prev) => (prev - step + totalFrames) % totalFrames);
      setStartX(e.clientX);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // 3D tilt for regular gallery
  const handleGalleryMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: -y * 8 });
  };

  const handleGalleryMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full rounded-3xl bg-[#0B0D12] border border-white/10 overflow-hidden shadow-2xl">
      {has360 ? (
        /* --- 360° Interactive Scrubber --- */
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative aspect-[16/10] w-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing bg-black/60 overflow-hidden"
        >
          {/* Active 360 Frame */}
          <div className="relative w-full h-full">
            <Image
              src={getImageSrc(images360![currentFrame])}
              alt={`${title} - 360 Frame ${currentFrame + 1}`}
              fill
              priority
              className="object-contain"
              onError={() => handleImageError(images360![currentFrame])}
              sizes="(max-width: 1200px) 100vw, 1000px"
            />
          </div>

          {/* Floor Reflection and Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-transparent to-transparent pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-primary text-white shadow-lg flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              Interactive 360° View
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono text-slate-300 bg-black/60 backdrop-blur-md border border-white/10">
              Frame {currentFrame + 1} / {totalFrames}
            </span>
          </div>

          {/* Control Bar Overlay */}
          <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between pointer-events-auto">
            <button
              type="button"
              onClick={() => setAutoRotate(!autoRotate)}
              className="px-4 py-2 rounded-xl bg-black/70 hover:bg-black/90 text-white border border-white/15 backdrop-blur-md text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-all"
            >
              {autoRotate ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pause Spin</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Auto Rotate</span>
                </>
              )}
            </button>

            {/* Drag Hint */}
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 hidden sm:inline-block">
              ↔ Drag Horizontally to Spin
            </span>

            {/* Frame step buttons */}
            <div className="flex items-center space-x-1.5 bg-black/70 backdrop-blur-md p-1 rounded-xl border border-white/15">
              <button
                type="button"
                onClick={() =>
                  setCurrentFrame((prev) => (prev - 1 + totalFrames) % totalFrames)
                }
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300"
                aria-label="Previous frame"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentFrame((prev) => (prev + 1) % totalFrames)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300"
                aria-label="Next frame"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* --- High-Res Gallery with 3D Tilt Fallback --- */
        <div className="space-y-3 p-4">
          <div
            onMouseMove={handleGalleryMouseMove}
            onMouseLeave={handleGalleryMouseLeave}
            onClick={() => setLightboxOpen(true)}
            className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-transform duration-200"
            style={{
              transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src={getImageSrc(images[activeGalleryIndex] || images[0])}
              alt={title}
              fill
              priority
              className="object-cover"
              onError={() => handleImageError(images[activeGalleryIndex] || images[0])}
              sizes="(max-width: 1200px) 100vw, 1000px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-black/70 text-white text-xs font-semibold backdrop-blur-md flex items-center space-x-1.5 border border-white/15">
              <Maximize2 className="w-3.5 h-3.5 text-brand-accent" />
              <span>Click to Enlarge</span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveGalleryIndex(idx)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  activeGalleryIndex === idx
                    ? "border-brand-primary scale-105 shadow-md"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={getImageSrc(img)}
                  alt={`Thumb ${idx + 1}`}
                  fill
                  className="object-cover"
                  onError={() => handleImageError(img)}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-5xl w-full aspect-[16/10]">
            <Image
              src={getImageSrc(images[activeGalleryIndex] || images[0])}
              alt={title}
              fill
              className="object-contain"
              onError={() => handleImageError(images[activeGalleryIndex] || images[0])}
            />
          </div>
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <Minimize2 className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
