"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TextReveal } from "./text-reveal";
import { Lightbulb, PenTool, Rocket, BarChart3, ArrowRight } from "lucide-react";

const processSteps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Discovery",
    description: "We dive deep into your business, audience, and goals. Understanding your unique challenges is the foundation of every winning strategy.",
    details: ["Market Research", "Competitor Analysis", "Goal Definition", "Audience Mapping"],
  },
  {
    number: "02",
    icon: PenTool,
    title: "Strategy",
    description: "We craft a custom roadmap designed for maximum impact. Every tactic is chosen with your specific objectives in mind.",
    details: ["Channel Selection", "Content Strategy", "Campaign Planning", "KPI Setting"],
  },
  {
    number: "03",
    icon: Rocket,
    title: "Execution",
    description: "Our expert team brings the strategy to life with precision and creativity. We move fast without cutting corners.",
    details: ["Campaign Launch", "Content Creation", "Technical Implementation", "A/B Testing"],
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Optimization",
    description: "Data drives every decision. We continuously refine and improve to maximize your ROI and sustain growth.",
    details: ["Performance Analysis", "Iterative Testing", "Scaling Winners", "Monthly Reporting"],
  },
];

function ProcessStep({ step, index }: { step: typeof processSteps[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const Icon = step.icon;

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
    <div
      ref={ref}
      className={cn(
        "group relative transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Connection line */}
      {index < processSteps.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 left-full w-full h-px">
          <div className={cn(
            "h-full bg-gradient-to-r from-primary to-transparent transition-all duration-1000",
            isVisible ? "scale-x-100" : "scale-x-0"
          )} style={{ transformOrigin: "left", transitionDelay: `${index * 150 + 300}ms` }} />
          <ArrowRight className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-primary transition-all duration-500",
            isVisible ? "opacity-100" : "opacity-0"
          )} style={{ transitionDelay: `${index * 150 + 500}ms` }} />
        </div>
      )}

      <div className={cn(
        "relative p-8 rounded-3xl border transition-all duration-500 h-full",
        isHovered 
          ? "bg-primary/5 border-primary/30 scale-[1.02]" 
          : "bg-card/50 border-border"
      )}>
        {/* Number badge */}
        <div className="absolute -top-4 -left-4 w-14 h-14 rounded-2xl bg-foreground text-background font-bold text-xl flex items-center justify-center shadow-xl">
          {step.number}
        </div>

        {/* Icon */}
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500",
          isHovered ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
        )}>
          <Icon className="w-7 h-7" />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{step.description}</p>

        {/* Details */}
        <div className="flex flex-wrap gap-2">
          {step.details.map((detail) => (
            <span
              key={detail}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-all duration-300",
                isHovered 
                  ? "bg-primary/20 text-primary" 
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {detail}
            </span>
          ))}
        </div>

        {/* Hover glow */}
        <div className={cn(
          "absolute -inset-px rounded-3xl transition-opacity duration-500 pointer-events-none",
          isHovered ? "opacity-100" : "opacity-0"
        )} style={{
          background: "linear-gradient(135deg, var(--primary) 0%, transparent 50%)",
          filter: "blur(20px)",
          zIndex: -1,
        }} />
      </div>
    </div>
  );
}

export function ProcessSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-32 md:py-48 bg-background relative overflow-hidden">
      {/* Background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="text-[15vw] font-bold text-foreground/[0.015] tracking-tighter whitespace-nowrap">
          PROCESS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
        {/* Header */}
        <div ref={ref} className="max-w-3xl mb-20">
          <div className={cn(
            "flex items-center gap-4 mb-6 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-medium tracking-[0.3em] uppercase text-primary">
              Our Process
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <TextReveal>How we deliver</TextReveal>
            <br />
            <TextReveal delay={200} className="text-gradient">
              exceptional results
            </TextReveal>
          </h2>
          <p className={cn(
            "text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            A proven methodology refined over years of delivering transformative 
            digital experiences for ambitious brands.
          </p>
        </div>

        {/* Process steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {processSteps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
