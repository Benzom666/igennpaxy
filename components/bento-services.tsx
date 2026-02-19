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
    description: "Complete visual systems including logos, color palettes, typography, and brand guidelines that resonate with luxury audiences.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
    size: "large",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "High-performance websites built with modern technologies for premium user experiences.",
    features: ["React/Next.js", "E-commerce", "Web Apps", "CMS Integration"],
    size: "small",
  },
  {
    icon: TrendingUp,
    title: "Growth Marketing",
    description: "Data-driven campaigns that scale your business with measurable ROI.",
    features: ["PPC Management", "CRO", "Analytics", "Attribution"],
    size: "small",
  },
  {
    icon: Share2,
    title: "Social Media",
    description: "Engaging content that builds community and drives engagement across platforms.",
    features: ["Content Strategy", "Community Management", "Paid Social", "Influencer Marketing"],
    size: "medium",
  },
  {
    icon: Video,
    title: "Content Production",
    description: "Professional video, motion graphics, and photography for luxury brands.",
    features: ["Video Production", "Motion Design", "Photography", "Animation"],
    size: "medium",
  },
  {
    icon: Megaphone,
    title: "SEO & Content",
    description: "Own the search results with strategic content that converts.",
    features: ["Technical SEO", "Content Strategy", "Link Building", "Local SEO"],
    size: "large",
  },
];

function BentoCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const sizeClasses = {
    small: "md:col-span-1 md:row-span-1",
    medium: "md:col-span-1 md:row-span-2",
    large: "md:col-span-2 md:row-span-1",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative p-8 md:p-10 rounded-xl overflow-hidden transition-all duration-700 hover:-translate-y-1 ${sizeClasses[service.size as keyof typeof sizeClasses]}`}
      style={{
        background: "linear-gradient(135deg, rgba(201, 169, 98, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
        e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
      }}
    >
      {/* Spotlight hover effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(201, 169, 98, 0.08), transparent 40%)",
        }}
      />

      {/* Card shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, transparent 50%)",
          transform: "translateX(-100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
          style={{
            background: "rgba(201, 169, 98, 0.08)",
            border: "1px solid rgba(201, 169, 98, 0.15)",
          }}
        >
          <service.icon className="w-5 h-5 text-[#c9a962]" />
        </div>

        {/* Title */}
        <h3 className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl font-medium text-[#faf8f5] mb-3 group-hover:text-gradient-gold transition-all duration-500">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-[#a8a5a0] text-sm leading-relaxed mb-6 flex-grow">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 text-xs text-[#6b6863]"
            >
              <div className="w-1 h-1 rounded-full bg-[#c9a962]" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.1em] uppercase text-[#c9a962] transition-all duration-500 group-hover:gap-4 mt-auto"
        >
          Learn More
          <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </div>
    </motion.div>
  );
}

export function BentoServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 lg:py-40 relative bg-[#0a0a0b]" ref={containerRef}>
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(ellipse, rgba(201,169,98,0.05) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section Header - Luxury Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-8"
            style={{
              background: "rgba(201, 169, 98, 0.08)",
              border: "1px solid rgba(201, 169, 98, 0.15)",
            }}
          >
            <Sparkles className="w-4 h-4 text-[#c9a962]" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#c9a962]">Our Services</span>
          </div>
          
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-medium text-[#faf8f5] mb-6 tracking-tight">
            Everything You Need{" "}
            <span className="text-gradient-gold">To Excel</span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-lg text-[#a8a5a0] leading-relaxed">
            Comprehensive digital solutions tailored to elevate premium brands 
            and drive exceptional results.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[280px]">
          {services.map((service, index) => (
            <BentoCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
