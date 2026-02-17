"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const dataPoints = [
  { month: "Jan", organic: 12, paid: 8 },
  { month: "Feb", organic: 19, paid: 12 },
  { month: "Mar", organic: 28, paid: 15 },
  { month: "Apr", organic: 35, paid: 22 },
  { month: "May", organic: 48, paid: 28 },
  { month: "Jun", organic: 62, paid: 35 },
  { month: "Jul", organic: 78, paid: 42 },
  { month: "Aug", organic: 95, paid: 52 },
];

export function GrowthChart() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  const maxValue = Math.max(...dataPoints.map((d) => d.organic + d.paid));

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto">
      {/* Chart container */}
      <div className="relative h-64 flex items-end justify-between gap-2 px-4">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground font-mono">
          <span>100K</span>
          <span>50K</span>
          <span>0</span>
        </div>

        {/* Bars */}
        <div className="flex-1 h-full flex items-end justify-around gap-2 ml-10">
          {dataPoints.map((point, index) => {
            const organicHeight = (point.organic / maxValue) * 100;
            const paidHeight = (point.paid / maxValue) * 100;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={point.month}
                className="flex flex-col items-center gap-2 flex-1"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Bar stack */}
                <div className="relative w-full flex flex-col items-center">
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-foreground text-background px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap z-10 animate-fade-in">
                      <div>Organic: {point.organic}K</div>
                      <div>Paid: {point.paid}K</div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground" />
                    </div>
                  )}
                  
                  {/* Bars */}
                  <div className="w-full flex flex-col items-center gap-0.5">
                    {/* Organic bar */}
                    <div
                      className={cn(
                        "w-full max-w-8 rounded-t-md bg-gradient-to-t from-primary to-primary/60 transition-all duration-700 ease-out",
                        isHovered && "scale-105"
                      )}
                      style={{
                        height: isVisible ? `${organicHeight * 2}px` : "0px",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    />
                    {/* Paid bar */}
                    <div
                      className={cn(
                        "w-full max-w-8 rounded-t-md bg-gradient-to-t from-accent to-accent/60 transition-all duration-700 ease-out",
                        isHovered && "scale-105"
                      )}
                      style={{
                        height: isVisible ? `${paidHeight * 2}px` : "0px",
                        transitionDelay: `${index * 100 + 50}ms`,
                      }}
                    />
                  </div>
                </div>

                {/* Month label */}
                <span className="text-xs text-muted-foreground font-mono">
                  {point.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className={cn(
        "mt-8 flex items-center justify-center gap-8 transition-all duration-700 delay-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-primary to-primary/60" />
          <span className="text-sm text-muted-foreground">Organic Traffic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-accent to-accent/60" />
          <span className="text-sm text-muted-foreground">Paid Traffic</span>
        </div>
      </div>

      {/* Growth indicator */}
      <div className={cn(
        "mt-6 text-center transition-all duration-700 delay-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        <span className="text-4xl font-bold text-gradient">+692%</span>
        <span className="text-muted-foreground ml-2">8-month growth</span>
      </div>
    </div>
  );
}
