"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FunnelVisual } from "./funnel-visual";
import { GrowthChart } from "./growth-chart";
import { KeywordConstellation } from "./keyword-constellation";
import { MagneticButton } from "./magnetic-button";
import { ArrowRight, Search, Filter, TrendingUp } from "lucide-react";

const sections = [
  {
    id: "seo",
    icon: Search,
    label: "SEO Excellence",
    title: "Dominate Search Rankings",
    subtitle: "Data-driven strategies that put you on top",
    description: "Our SEO approach combines technical expertise with content strategy to build sustainable organic growth. We don't just chase rankings – we build authority.",
    visual: "keywords",
    stats: [
      { value: "340%", label: "Avg. Traffic Increase" },
      { value: "Top 3", label: "Ranking Positions" },
    ],
  },
  {
    id: "funnels",
    icon: Filter,
    label: "Sales Funnels",
    title: "Convert Visitors to Customers",
    subtitle: "Strategic funnels that maximize revenue",
    description: "We design conversion-focused funnels that guide prospects through their buying journey. Every touchpoint is optimized for engagement and action.",
    visual: "funnel",
    stats: [
      { value: "5.2x", label: "Conversion Rate" },
      { value: "2.1%", label: "Avg. CTR" },
    ],
  },
  {
    id: "growth",
    icon: TrendingUp,
    label: "Growth Marketing",
    title: "Accelerate Your Growth",
    subtitle: "Measurable results, not vanity metrics",
    description: "We focus on the metrics that matter – revenue, customer acquisition cost, and lifetime value. Our growth strategies are built for sustainable scale.",
    visual: "chart",
    stats: [
      { value: "$12M+", label: "Revenue Generated" },
      { value: "150+", label: "Brands Scaled" },
    ],
  },
];

function ShowcaseCard({ section, index, isReversed }: { section: typeof sections[0]; index: number; isReversed: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const Icon = section.icon;

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

  const renderVisual = (type: string) => {
    switch (type) {
      case "keywords":
        return <KeywordConstellation />;
      case "funnel":
        return <FunnelVisual />;
      case "chart":
        return <GrowthChart />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20 md:py-32",
        isReversed && "lg:[&>*:first-child]:order-2"
      )}
    >
      {/* Content */}
      <div
        className={cn(
          "transition-all duration-1000",
          isVisible 
            ? "opacity-100 translate-x-0" 
            : isReversed 
              ? "opacity-0 translate-x-12" 
              : "opacity-0 -translate-x-12"
        )}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
            "bg-primary text-primary-foreground"
          )}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="h-px flex-1 max-w-16 bg-primary/30" />
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
            {section.label}
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          {section.title}
        </h2>
        
        <p className="text-xl text-muted-foreground mb-6">
          {section.subtitle}
        </p>
        
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
          {section.description}
        </p>

        {/* Stats */}
        <div className="flex gap-10 mb-8">
          {section.stats.map((stat, i) => (
            <div 
              key={stat.label}
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: `${i * 100 + 300}ms` }}
            >
              <div className="text-4xl font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <MagneticButton className="group px-8 py-4 rounded-full border-2 border-foreground font-semibold hover:bg-foreground hover:text-background transition-all duration-500">
          <span className="flex items-center gap-2">
            Learn More
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </MagneticButton>
      </div>

      {/* Visual */}
      <div
        className={cn(
          "relative min-h-[400px] flex items-center justify-center transition-all duration-1000 delay-200",
          isVisible 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-90"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl" />
        <div className="relative w-full h-full min-h-[400px]">
          {renderVisual(section.visual)}
        </div>
      </div>
    </div>
  );
}

export function StickyScrollSection() {
  return (
    <section className="relative bg-background overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
        {sections.map((section, index) => (
          <ShowcaseCard 
            key={section.id} 
            section={section} 
            index={index} 
            isReversed={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
