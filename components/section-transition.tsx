"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SectionTransitionProps {
  direction?: "up" | "down";
  color?: string;
  className?: string;
}

export function SectionTransition({ 
  direction = "down", 
  color = "var(--background)",
  className 
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Calculate progress when element enters viewport
      const start = windowHeight;
      const end = -elementHeight;
      const current = elementTop;
      const progress = 1 - (current - end) / (start - end);
      
      setProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className={cn("relative h-32 overflow-hidden", className)}>
      {/* Morphing wave */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 128"
        preserveAspectRatio="none"
        style={{
          transform: direction === "up" ? "rotate(180deg)" : "none",
        }}
      >
        <path
          fill={color}
          d={`M0,${128 - progress * 64} 
              C360,${128 - progress * 128} 
              720,${progress * 64} 
              1080,${64 + progress * 32} 
              S1440,${128 - progress * 48} 
              1440,${128 - progress * 32} 
              L1440,128 L0,128 Z`}
          style={{
            transition: "d 0.1s ease-out",
          }}
        />
      </svg>
    </div>
  );
}

export function ParallaxDivider({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distance = elementCenter - viewportCenter;
      setOffset(distance * 0.1);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className={cn("relative h-px overflow-visible", className)}>
      <div 
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        style={{ transform: `translateY(${offset}px)` }}
      />
      {/* Glow effect */}
      <div 
        className="absolute left-1/4 right-1/4 h-8 -top-4 blur-2xl bg-primary/20"
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      />
    </div>
  );
}
