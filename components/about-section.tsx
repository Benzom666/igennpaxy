"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TextReveal } from "./text-reveal";
import { MagneticButton } from "./magnetic-button";
import { AnimatedCounter } from "./animated-counter";
import Image from "next/image";
import { Linkedin, Twitter, ArrowUpRight, Quote } from "lucide-react";

const team = [
  {
    name: "Alex Rivera",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    quote: "Building the future of digital marketing.",
  },
  {
    name: "Jordan Chen",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
    quote: "Design is how it works, not just how it looks.",
  },
  {
    name: "Sam Williams",
    role: "Tech Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    quote: "Code is poetry written for machines.",
  },
  {
    name: "Taylor Morgan",
    role: "Strategy Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face",
    quote: "Strategy without execution is hallucination.",
  },
];

const stats = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 12, suffix: "M+", label: "Revenue Generated" },
  { value: 50, suffix: "+", label: "Team Members" },
];

function TeamMember({ member, index }: { member: typeof team[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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
    <div
      ref={ref}
      className={cn(
        "group relative transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6">
        <Image
          src={member.image || "/placeholder.svg"}
          alt={member.name}
          fill
          className={cn(
            "object-cover transition-all duration-700",
            isHovered ? "scale-110 brightness-50" : "scale-100 grayscale brightness-90"
          )}
        />

        {/* Gradient overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-0"
        )} />

        {/* Quote on hover */}
        <div className={cn(
          "absolute inset-0 flex flex-col justify-center items-center p-6 transition-all duration-500",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <Quote className="w-8 h-8 text-primary-foreground/50 mb-4" />
          <p className="text-primary-foreground text-center text-sm leading-relaxed italic">
            {member.quote}
          </p>
        </div>

        {/* Social links */}
        <div
          className={cn(
            "absolute bottom-6 left-6 right-6 flex gap-3 transition-all duration-500",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center hover:bg-foreground/40 transition-colors"
          >
            <Twitter className="w-4 h-4 text-foreground" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center hover:bg-foreground/40 transition-colors"
          >
            <Linkedin className="w-4 h-4 text-foreground" />
          </a>
        </div>

        {/* Border effect */}
        <div className={cn(
          "absolute inset-0 rounded-3xl border-2 transition-colors duration-500",
          isHovered ? "border-primary" : "border-transparent"
        )} />
      </div>

      <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
      <p className="text-muted-foreground">{member.role}</p>
    </div>
  );
}

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
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
    <section id="about" className="py-32 md:py-48 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -top-[400px] -right-[400px] w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* About intro */}
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-medium tracking-[0.3em] uppercase text-primary">
                About Us
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <TextReveal>We are digital</TextReveal>
              <br />
              <TextReveal delay={200} className="text-gradient">
                craftspeople
              </TextReveal>
            </h2>
          </div>

          <div
            className={cn(
              "flex flex-col justify-end transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}
          >
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
              Founded in 2019, Igen & Paxy has evolved from a small creative studio to an
              <span className="text-foreground font-medium"> award-winning agency</span>. We believe in the power of 
              <span className="text-primary font-medium"> design thinking</span> and data-driven strategies to create meaningful digital experiences.
            </p>
            <MagneticButton className="self-start flex items-center gap-3 px-8 py-5 rounded-full border-2 border-foreground font-semibold hover:bg-foreground hover:text-background transition-all duration-500 group">
              Our Story
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </MagneticButton>
          </div>
        </div>

        {/* Stats section */}
        <div className={cn(
          "grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-32 py-16 border-y border-border/50 transition-all duration-1000 delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-6xl font-bold mb-3 text-gradient">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-muted-foreground text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Team section */}
        <div>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
              The Minds Behind
              <br />
              <span className="text-gradient">the Magic</span>
            </h3>
            <span className="text-muted-foreground font-mono">
              {team.length} Creatives
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, index) => (
              <TeamMember key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
