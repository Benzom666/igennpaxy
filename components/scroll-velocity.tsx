"use client";

import React from "react"

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollVelocityProps {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
}

export function ScrollVelocity({
  children,
  baseVelocity = 5,
  className,
}: ScrollVelocityProps) {
  const [velocity, setVelocity] = useState(baseVelocity);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const directionRef = useRef(1);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateVelocity = () => {
      const scrollY = window.scrollY;
      const diff = scrollY - lastScrollY;
      directionRef.current = diff > 0 ? 1 : -1;
      const newVelocity = baseVelocity + Math.abs(diff) * 0.1;
      setVelocity(Math.min(newVelocity, baseVelocity * 3));
      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateVelocity);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    const decay = setInterval(() => {
      setVelocity((v) => Math.max(v * 0.95, baseVelocity));
    }, 50);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(decay);
    };
  }, [baseVelocity]);

  useEffect(() => {
    let animationId: number;
    const content = contentRef.current;
    if (!content) return;

    const animate = () => {
      scrollRef.current += velocity * directionRef.current * 0.05;
      const contentWidth = content.scrollWidth / 2;
      if (Math.abs(scrollRef.current) >= contentWidth) {
        scrollRef.current = 0;
      }
      content.style.transform = `translateX(${-scrollRef.current}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [velocity]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <div ref={contentRef} className="flex whitespace-nowrap">
        {children}
        {children}
      </div>
    </div>
  );
}
