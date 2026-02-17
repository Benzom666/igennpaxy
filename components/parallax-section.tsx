"use client";

import React from "react"

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxSection({
  children,
  className,
  speed = 0.5,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      setOffset(scrolled * speed);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div
        style={{
          transform: `translateY(${offset}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.3,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = elementCenter - windowHeight / 2;
      setOffset(distanceFromCenter * speed * -1);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className="w-full h-[120%] object-cover transition-transform duration-100"
        style={{
          transform: `translateY(${offset}px) scale(1.1)`,
        }}
      />
    </div>
  );
}
