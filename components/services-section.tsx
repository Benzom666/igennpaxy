"use client";

import React from "react"

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TextReveal } from "./text-reveal";
import { ScrollVelocity } from "./scroll-velocity";
import {
  TrendingUp,
  Palette,
  Code2,
  Megaphone,
  BarChart3,
  Zap,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "SEO & Growth",
    description: "Dominate search rankings with data-driven strategies that deliver measurable results and sustainable organic growth.",
    stats: "+340%",
    statsLabel: "Avg Traffic",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Craft memorable visual identities that resonate with your audience and stand out in crowded markets.",
    stats: "150+",
    statsLabel: "Brands",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: Code2,
    title: "Web Development",
    description: "Build lightning-fast, conversion-optimized websites with cutting-edge technology and flawless UX.",
    stats: "99.9%",
    statsLabel: "Uptime",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Megaphone,
    title: "Social Media",
    description: "Create viral campaigns that build engaged communities and drive meaningful conversations.",
    stats: "2.5M+",
    statsLabel: "Reach",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: BarChart3,
    title: "Analytics & Data",
    description: "Transform raw data into actionable insights with real-time dashboards and predictive analytics.",
    stats: "100+",
    statsLabel: "Metrics",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Zap,
    title: "Performance Ads",
    description: "Maximize ROI with precision-targeted campaigns across all channels and platforms.",
    stats: "5.2x",
    statsLabel: "Avg ROAS",
    gradient: "from-yellow-500 to-lime-500",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Icon = service.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative rounded-3xl border border-border bg-card/50 overflow-hidden transition-all duration-700 cursor-pointer backdrop-blur-sm",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      )}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
      data-cursor="View"
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--primary) 0%, transparent 40%)`,
          opacity: isHovered ? 0.1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10 h-full flex flex-col min-h-[360px]">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div
            className={cn(
              "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
              service.gradient
            )}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div
            className={cn(
              "flex items-center gap-2 transition-all duration-500",
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            )}
          >
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Explore</span>
            <ArrowUpRight className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Stats */}
        <div className="pt-8 border-t border-border/50 mt-auto">
          <div className="flex items-end gap-2">
            <span className={cn("text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent", service.gradient)}>
              {service.stats}
            </span>
            <span className="text-sm text-muted-foreground mb-1">{service.statsLabel}</span>
          </div>
        </div>
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-3xl border-2 border-primary/0 group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
      
      {/* Corner accent */}
      <div className={cn(
        "absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-all duration-700 blur-2xl",
        service.gradient
      )} />
    </div>
  );
}

export function ServicesSection() {
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-32 md:py-48 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      {/* Large background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="text-[20vw] font-bold text-foreground/[0.02] tracking-tighter whitespace-nowrap">
          SERVICES
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
        {/* Section header */}
        <div ref={titleRef} className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className={cn(
            "transition-all duration-1000",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-medium tracking-[0.3em] uppercase text-primary">
                What We Do
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <TextReveal>Services that</TextReveal>
              <br />
              <TextReveal delay={200} className="text-gradient">
                drive results
              </TextReveal>
            </h2>
          </div>
          <p className={cn(
            "max-w-md text-muted-foreground text-lg leading-relaxed transition-all duration-1000 delay-300",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            We combine creativity with data-driven strategies to deliver
            exceptional digital experiences that transform businesses and
            accelerate growth.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Bottom marquee */}
        <div className="mt-24 -mx-6 md:-mx-12 lg:-mx-24">
          <ScrollVelocity baseVelocity={-3} className="py-8 border-y border-border/30">
            {services.map((service, i) => (
              <span key={i} className="text-2xl md:text-4xl font-bold tracking-tight mx-8 text-muted-foreground/20 uppercase">
                {service.title}
              </span>
            ))}
          </ScrollVelocity>
        </div>
      </div>
    </section>
  );
}
