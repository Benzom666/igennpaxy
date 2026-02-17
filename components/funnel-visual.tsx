"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Users, Zap, Target, TrendingUp, DollarSign } from "lucide-react";

const funnelStages = [
  { icon: Users, label: "Traffic", value: "100K", color: "from-blue-500 to-cyan-500", width: "100%" },
  { icon: Zap, label: "Visitors", value: "45K", color: "from-cyan-500 to-teal-500", width: "70%" },
  { icon: Target, label: "Leads", value: "12K", color: "from-teal-500 to-emerald-500", width: "50%" },
  { icon: TrendingUp, label: "Qualified", value: "4.8K", color: "from-emerald-500 to-green-500", width: "35%" },
  { icon: DollarSign, label: "Customers", value: "2.1K", color: "from-green-500 to-lime-500", width: "25%" },
];

export function FunnelVisual() {
  const [activeStage, setActiveStage] = useState(0);
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

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % funnelStages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto">
      {/* Funnel stages */}
      <div className="space-y-3">
        {funnelStages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = index === activeStage;
          const isPast = index < activeStage;
          
          return (
            <div
              key={stage.label}
              className={cn(
                "relative mx-auto transition-all duration-700 cursor-pointer",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ 
                width: stage.width,
                transitionDelay: `${index * 150}ms`
              }}
              onMouseEnter={() => setActiveStage(index)}
            >
              <div
                className={cn(
                  "relative h-16 rounded-2xl overflow-hidden transition-all duration-500",
                  isActive ? "scale-105 shadow-2xl" : "scale-100"
                )}
              >
                {/* Background gradient */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r transition-opacity duration-500",
                  stage.color,
                  isActive || isPast ? "opacity-100" : "opacity-30"
                )} />
                
                {/* Animated flow */}
                {isActive && (
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer-flow" />
                  </div>
                )}
                
                {/* Content */}
                <div className="relative h-full flex items-center justify-between px-6 text-white">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center transition-transform duration-300",
                      isActive && "scale-110"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">{stage.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold">{stage.value}</span>
                    <span className="text-white/60 text-sm ml-1">/mo</span>
                  </div>
                </div>
              </div>
              
              {/* Connector line */}
              {index < funnelStages.length - 1 && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-px h-6 bg-gradient-to-b from-border to-transparent" />
              )}
            </div>
          );
        })}
      </div>

      {/* Conversion rate indicator */}
      <div className={cn(
        "mt-8 text-center transition-all duration-700 delay-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium">
            <span className="text-primary font-bold">2.1%</span> Overall Conversion Rate
          </span>
        </div>
      </div>
    </div>
  );
}
