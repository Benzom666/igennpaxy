"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const keywords = [
  { text: "SEO Strategy", size: "lg", position: { x: 50, y: 30 }, rank: 1 },
  { text: "Content Marketing", size: "md", position: { x: 25, y: 45 }, rank: 3 },
  { text: "Link Building", size: "md", position: { x: 75, y: 50 }, rank: 2 },
  { text: "Technical SEO", size: "sm", position: { x: 15, y: 25 }, rank: 5 },
  { text: "Local SEO", size: "sm", position: { x: 85, y: 25 }, rank: 4 },
  { text: "Keyword Research", size: "md", position: { x: 35, y: 70 }, rank: 2 },
  { text: "Analytics", size: "sm", position: { x: 65, y: 75 }, rank: 6 },
  { text: "On-Page", size: "xs", position: { x: 20, y: 60 }, rank: 8 },
  { text: "Off-Page", size: "xs", position: { x: 80, y: 65 }, rank: 7 },
  { text: "Core Web Vitals", size: "sm", position: { x: 50, y: 85 }, rank: 4 },
];

const sizeClasses = {
  xs: "text-xs px-2 py-1",
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-6 py-3 font-bold",
};

export function KeywordConstellation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeKeyword, setActiveKeyword] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full h-[400px] max-w-3xl mx-auto">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {keywords.slice(0, -1).map((keyword, i) => {
          const next = keywords[i + 1];
          return (
            <line
              key={`line-${i}`}
              x1={`${keyword.position.x}%`}
              y1={`${keyword.position.y}%`}
              x2={`${next.position.x}%`}
              y2={`${next.position.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              className={cn(
                "transition-all duration-1000",
                isVisible ? "opacity-100" : "opacity-0"
              )}
              style={{ transitionDelay: `${i * 100 + 500}ms` }}
            />
          );
        })}
      </svg>

      {/* Keywords */}
      {keywords.map((keyword, index) => (
        <div
          key={keyword.text}
          className={cn(
            "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 cursor-pointer",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )}
          style={{
            left: `${keyword.position.x}%`,
            top: `${keyword.position.y}%`,
            transitionDelay: `${index * 100}ms`,
          }}
          onMouseEnter={() => setActiveKeyword(keyword.text)}
          onMouseLeave={() => setActiveKeyword(null)}
        >
          <div
            className={cn(
              "relative rounded-full border transition-all duration-300",
              sizeClasses[keyword.size as keyof typeof sizeClasses],
              activeKeyword === keyword.text
                ? "bg-primary text-primary-foreground border-primary scale-110 shadow-lg shadow-primary/30"
                : "bg-secondary/50 text-foreground border-border hover:border-primary/50"
            )}
          >
            <span className="relative z-10 whitespace-nowrap">{keyword.text}</span>
            
            {/* Rank badge */}
            <div className={cn(
              "absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center transition-all duration-300",
              activeKeyword === keyword.text ? "scale-110" : "scale-100"
            )}>
              #{keyword.rank}
            </div>
            
            {/* Glow effect */}
            {activeKeyword === keyword.text && (
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10 animate-pulse" />
            )}
          </div>
        </div>
      ))}

      {/* Center indicator */}
      <div className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-1000 delay-1000",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
      )}>
        <div className="w-32 h-32 rounded-full border border-dashed border-primary/20 animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-dashed border-primary/30 animate-spin-slow" style={{ animationDirection: "reverse" }} />
      </div>
    </div>
  );
}
