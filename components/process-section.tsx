"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TextReveal } from "./text-reveal";
import { Lightbulb, PenTool, Rocket, BarChart3, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
            "h-full bg-gradient-to-r from-[#c9a962] to-transparent transition-all duration-1000",
            isVisible ? "scale-x-100" : "scale-x-0"
          )} style={{ transformOrigin: "left", transitionDelay: `${index * 150 + 300}ms` }} />
          <ArrowRight className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a962] transition-all duration-500",
            isVisible ? "opacity-100" : "opacity-0"
          )} style={{ transitionDelay: `${index * 150 + 500}ms` }} />
        </div>
      )}

      <div className={cn(
        "relative p-8 rounded-xl transition-all duration-500 h-full",
        isHovered 
          ? "bg-[rgba(201,169,98,0.03)] border-[rgba(201,169,98,0.2)] scale-[1.02]" 
          : "bg-[rgba(255,255,255,0.01)] border-[rgba(255,255,255,0.06)]"
      )}
      style={{ border: "1px solid" }}
      >
        {/* Number badge */}
        <div className="absolute -top-4 -left-4 w-12 h-12 rounded-lg bg-[#0a0a0b] border border-[rgba(201,169,98,0.3)] text-[#c9a962] font-[family-name:var(--font-playfair)] font-medium text-lg flex items-center justify-center"
        >
          {step.number}
        </div>

        {/* Icon */}
        <div className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500",
          isHovered 
            ? "bg-[rgba(201,169,98,0.1)] text-[#c9a962]" 
            : "bg-[rgba(255,255,255,0.03)] text-[#a8a5a0]"
        )}
        >
          <Icon className="w-6 h-6" />
        </div>

        {/* Content */}
        <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-[#faf8f5] mb-4">{step.title}</h3>
        <p className="text-sm text-[#a8a5a0] leading-relaxed mb-6">{step.description}</p>

        {/* Details */}
        <div className="flex flex-wrap gap-2">
          {step.details.map((detail) => (
            <span
              key={detail}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[10px] font-medium tracking-wide uppercase transition-all duration-300",
                isHovered 
                  ? "bg-[rgba(201,169,98,0.1)] text-[#c9a962]" 
                  : "bg-[rgba(255,255,255,0.03)] text-[#6b6863]"
              )}
            >
              {detail}
            </span>
          ))}
        </div>

        {/* Hover glow */}
        <div className={cn(
          "absolute -inset-px rounded-xl transition-opacity duration-500 pointer-events-none",
          isHovered ? "opacity-100" : "opacity-0"
        )} style={{
          background: "linear-gradient(135deg, rgba(201,169,98,0.1) 0%, transparent 50%)",
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
    <section className="py-32 lg:py-40 bg-[#0a0a0b] relative overflow-hidden">
      {/* Background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="font-[family-name:var(--font-playfair)] text-[15vw] font-medium text-[rgba(255,255,255,0.015)] tracking-tighter whitespace-nowrap">
          PROCESS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div ref={ref} className="max-w-3xl mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-12 bg-[#c9a962]" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-[#c9a962]">
              Our Process
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-medium text-[#faf8f5] mb-6"
          >
            How we deliver
            <br />
            <span className="text-gradient-gold">exceptional results</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg text-[#a8a5a0] leading-relaxed"
          >
            A proven methodology refined over years of delivering transformative 
            digital experiences for ambitious brands.
          </motion.p>
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
