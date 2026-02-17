"use client";

import { AnimatedCounter } from "./animated-counter";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const stats = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 12, suffix: "M+", label: "Revenue Generated" },
  { value: 50, suffix: "+", label: "Team Members" },
];

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/20 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "text-center transition-all duration-700",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                />
              </div>
              <p className="text-background/60 text-sm md:text-base uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
