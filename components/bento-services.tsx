"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Palette, 
  Globe, 
  TrendingUp, 
  Share2, 
  Video, 
  Megaphone,
  ArrowUpRight,
  Sparkles
} from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Complete visual systems including logos, color palettes, typography, and brand guidelines that resonate.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
    color: "#1aff80",
    size: "large",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "High-performance websites built with modern technologies.",
    features: ["React/Next.js", "E-commerce", "Web Apps", "CMS"],
    color: "#ff6b35",
    size: "small",
  },
  {
    icon: TrendingUp,
    title: "Growth Marketing",
    description: "Data-driven campaigns that scale your business.",
    features: ["PPC", "CRO", "Analytics", "Attribution"],
    color: "#00d4ff",
    size: "small",
  },
  {
    icon: Share2,
    title: "Social Media",
    description: "Engaging content that builds community and drives engagement across platforms.",
    features: ["Content Strategy", "Community", "Paid Social", "Influencers"],
    color: "#ff00ff",
    size: "medium",
  },
  {
    icon: Video,
    title: "Content Production",
    description: "Professional video, motion graphics, and photography.",
    features: ["Video Production", "Motion Design", "Photography", "Animation"],
    color: "#ffd700",
    size: "medium",
  },
  {
    icon: Megaphone,
    title: "SEO & Content",
    description: "Own the search results with strategic content.",
    features: ["Technical SEO", "Content Strategy", "Link Building", "Local SEO"],
    color: "#8b5cf6",
    size: "large",
  },
];

function BentoCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const sizeClasses = {
    small: "md:col-span-1 md:row-span-1",
    medium: "md:col-span-1 md:row-span-2",
    large: "md:col-span-2 md:row-span-1",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative p-6 md:p-8 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] ${sizeClasses[service.size as keyof typeof sizeClasses]}`}
      style={{
        background: `linear-gradient(135deg, ${service.color}08 0%, ${service.color}03 100%)`,
        border: `1px solid ${service.color}15`,
      }}
    >
      {/* Hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${service.color}10, transparent 40%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${service.color}15`,
            boxShadow: `0 0 30px ${service.color}20`,
          }}
        >
          <service.icon className="w-6 h-6" style={{ color: service.color }} />
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-2 group-hover:text-gradient transition-all">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-[var(--muted-foreground)] text-sm mb-4 flex-grow">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-1.5 mb-4">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]"
            >
              <div
                className="w-1 h-1 rounded-full"
                style={{ background: service.color }}
              />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3 mt-auto"
          style={{ color: service.color }}
        >
          Learn More
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

export function BentoServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-sm font-medium text-[var(--foreground)]/80">Our Services</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-6">
            Everything You Need{" "}
            <span className="text-gradient">To Succeed</span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-lg text-[var(--muted-foreground)]">
            Comprehensive digital solutions tailored to your unique business goals
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {services.map((service, index) => (
            <BentoCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
