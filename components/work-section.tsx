"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TextReveal } from "./text-reveal";
import { MagneticButton } from "./magnetic-button";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Nexus Finance",
    category: "Fintech",
    description: "Complete digital transformation for a leading fintech startup, resulting in 10x user acquisition",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    stats: { metric: "+420%", label: "User Growth" },
    gradient: "from-emerald-500/80 to-teal-500/80",
    year: "2024",
    services: ["SEO", "Development", "Analytics"],
  },
  {
    id: 2,
    title: "Pulse Health",
    category: "Healthcare",
    description: "Brand identity and digital platform for revolutionary healthcare innovation",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=800&fit=crop",
    stats: { metric: "2.5M", label: "App Downloads" },
    gradient: "from-blue-500/80 to-cyan-500/80",
    year: "2024",
    services: ["Branding", "UX Design", "Marketing"],
  },
  {
    id: 3,
    title: "Verde Eco",
    category: "E-commerce",
    description: "Sustainable marketplace that disrupted the eco-conscious retail industry",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
    stats: { metric: "$12M", label: "Revenue" },
    gradient: "from-lime-500/80 to-emerald-500/80",
    year: "2023",
    services: ["E-commerce", "Social Media", "PPC"],
  },
  {
    id: 4,
    title: "Orbit Labs",
    category: "SaaS",
    description: "Next-gen project management platform for distributed global teams",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    stats: { metric: "500K", label: "Active Users" },
    gradient: "from-violet-500/80 to-purple-500/80",
    year: "2023",
    services: ["Strategy", "Development", "Growth"],
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative transition-all duration-1000",
        index % 2 === 1 && "lg:mt-32",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="View"
    >
      {/* Image container */}
      <div className="relative overflow-hidden rounded-3xl aspect-[4/5] mb-8">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className={cn(
            "object-cover transition-all duration-1000",
            isHovered ? "scale-110 blur-sm" : "scale-100"
          )}
        />

        {/* Gradient overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t transition-opacity duration-700",
            project.gradient,
            isHovered ? "opacity-90" : "opacity-0"
          )}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Hover content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          {/* Top - Category & Year */}
          <div className="flex justify-between items-start">
            <span className={cn(
              "px-4 py-2 rounded-full text-sm font-medium bg-foreground/10 backdrop-blur-sm text-foreground border border-foreground/10 transition-all duration-500",
              isHovered ? "bg-background text-foreground" : ""
            )}>
              {project.category}
            </span>
            <span className={cn(
              "px-3 py-1.5 rounded-full text-sm font-mono transition-all duration-500",
              isHovered ? "bg-background/90 text-foreground" : "bg-foreground/10 backdrop-blur-sm text-foreground"
            )}>
              {project.year}
            </span>
          </div>

          {/* Bottom - Stats */}
          <div className={cn(
            "transition-all duration-700",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="mb-6">
              <div className="text-6xl md:text-7xl font-bold text-background mb-2">{project.stats.metric}</div>
              <div className="text-background/70 uppercase tracking-wider text-sm">{project.stats.label}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.services.map((service) => (
                <span key={service} className="px-3 py-1 rounded-full bg-background/20 text-background text-xs font-medium">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* View button */}
        <div className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500",
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
        )}>
          <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center">
            <ExternalLink className="w-8 h-8 text-foreground" />
          </div>
        </div>
      </div>

      {/* Title and description */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <ArrowUpRight
            className={cn(
              "w-8 h-8 transition-all duration-500 mt-2",
              isHovered
                ? "opacity-100 translate-x-0 text-primary"
                : "opacity-0 -translate-x-4"
            )}
          />
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
          {project.description}
        </p>
      </div>
    </div>
  );
}

export function WorkSection() {
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
    <section id="work" className="py-32 md:py-48 bg-secondary/20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

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
                Selected Work
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <TextReveal>Projects that</TextReveal>
              <br />
              <TextReveal delay={200} className="text-gradient">
                speak volumes
              </TextReveal>
            </h2>
          </div>
          <MagneticButton 
            className={cn(
              "self-start lg:self-auto px-8 py-5 rounded-full border-2 border-foreground font-semibold hover:bg-foreground hover:text-background transition-all duration-500",
              titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="flex items-center gap-3">
              View All Work
              <ArrowUpRight className="w-5 h-5" />
            </span>
          </MagneticButton>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
