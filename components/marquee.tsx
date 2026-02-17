"use client";

import React from "react"

import { useEffect, useRef } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth / 2;
    let animationId: number;
    let position = direction === "left" ? 0 : -scrollWidth;

    const animate = () => {
      if (direction === "left") {
        position -= speed / 60;
        if (position <= -scrollWidth) position = 0;
      } else {
        position += speed / 60;
        if (position >= 0) position = -scrollWidth;
      }
      container.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [speed, direction]);

  return (
    <div
      className={`overflow-hidden ${pauseOnHover ? "[&:hover_>_div]:pause" : ""} ${className}`}
    >
      <div ref={containerRef} className="flex whitespace-nowrap">
        {children}
        {children}
      </div>
    </div>
  );
}
