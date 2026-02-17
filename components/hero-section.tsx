"use client";

import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "./magnetic-button";
import { TextReveal, CharReveal } from "./text-reveal";
import { ScrollVelocity } from "./scroll-velocity";
import { ArrowDownRight, Play } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-background"
    >
      {/* Animated gradient mesh with motion grid effect */}
      <div className="absolute inset-0">
        {/* Primary glow */}
        <div
          className="absolute top-1/4 left-1/4 w-[1000px] h-[1000px] rounded-full bg-primary/20 blur-[200px] animate-morph"
          style={{
            transform: `translate(${mousePosition.x * 150}px, ${mousePosition.y * 150}px)`,
            transition: "transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
        {/* Secondary glow */}
        <div
          className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] rounded-full bg-accent/15 blur-[180px] animate-morph"
          style={{
            animationDelay: "-4s",
            transform: `translate(${mousePosition.x * -120}px, ${mousePosition.y * -120}px)`,
            transition: "transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      {/* Motion grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          transition: "transform 0.5s ease-out",
        }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-noise mix-blend-overlay" />

      {/* Abstract growth lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,600 Q400,400 800,500 T1600,300"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2"
          className={`transition-all duration-[2s] ${isLoaded ? "opacity-100" : "opacity-0"}`}
          style={{ strokeDasharray: 2000, strokeDashoffset: isLoaded ? 0 : 2000 }}
        />
        <path
          d="M0,700 Q500,500 1000,600 T2000,400"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          className={`transition-all duration-[2.5s] delay-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          style={{ strokeDasharray: 2500, strokeDashoffset: isLoaded ? 0 : 2500 }}
        />
      </svg>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[15%] right-[10%] w-4 h-4 rounded-full bg-primary/60 animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-[30%] left-[8%] w-3 h-3 rounded-full bg-accent/50 animate-float"
          style={{ animationDelay: "-2s" }}
        />
        <div
          className="absolute bottom-[25%] right-[20%] w-2 h-2 rounded-full bg-primary animate-pulse-glow"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen px-6 md:px-12 lg:px-24 pt-32 pb-12">
        {/* Top bar */}
        <div
          className={`flex justify-between items-start transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
            </div>
            <span className="text-[11px] font-semibold tracking-[0.25em] text-muted-foreground uppercase">
              Digital Marketing Excellence
            </span>
          </div>
          <div className="hidden md:flex items-center gap-16">
            <div className="text-right">
              <p className="text-[9px] text-muted-foreground/60 uppercase tracking-[0.3em] mb-0.5">Based in</p>
              <p className="text-sm font-medium">San Francisco</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-muted-foreground/60 uppercase tracking-[0.3em] mb-0.5">Founded</p>
              <p className="text-sm font-medium">2019</p>
            </div>
          </div>
        </div>

        {/* Hero text - Typography-led design */}
        <div className="flex-1 flex items-center py-12 md:py-20">
          <div className="max-w-full w-full">
            {/* Main headline */}
            <div className="relative mb-8">
              <h1 className="text-[clamp(3rem,12vw,14rem)] font-bold leading-[0.85] tracking-[-0.05em]">
                <span className="block overflow-hidden">
                  <TextReveal className="block" delay={100}>
                    WE BUILD
                  </TextReveal>
                </span>
                <span className="block overflow-hidden">
                  <span className="block text-gradient">
                    <CharReveal delay={400}>GROWTH</CharReveal>
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <TextReveal className="block" delay={700}>
                    ENGINES
                  </TextReveal>
                </span>
              </h1>
            </div>

            {/* Subtext with staggered fade */}
            <div
              className={`max-w-xl ml-auto mr-0 md:mr-24 transition-all duration-1000 delay-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
                We transform ambitious brands into
                <span className="text-foreground font-semibold"> market leaders </span>
                through strategic SEO, high-converting funnels, and
                <span className="text-primary font-semibold"> data-driven growth</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA section */}
        <div
          className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-8 transition-all duration-1000 delay-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex flex-wrap gap-4">
            {/* Primary CTA with micro-interaction */}
            <MagneticButton className="group relative overflow-hidden px-10 py-6 bg-foreground text-background rounded-full font-semibold text-base">
              <span className="relative z-10 flex items-center gap-3">
                Book Strategy Call
                <ArrowDownRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
              </span>
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="absolute inset-0 flex items-center justify-center gap-3 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                Book Strategy Call
                <ArrowDownRight className="w-5 h-5" />
              </span>
            </MagneticButton>

            {/* Secondary CTA */}
            <MagneticButton className="group flex items-center gap-4 px-6 py-6 border border-border/50 rounded-full hover:border-primary/50 transition-all duration-500 backdrop-blur-sm bg-background/30">
              <div className="relative w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                <Play className="w-4 h-4 text-primary fill-primary ml-0.5 relative z-10" />
                <div className="absolute inset-0 bg-primary scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                <Play className="absolute w-4 h-4 text-primary-foreground fill-primary-foreground ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
              </div>
              <span className="font-medium pr-2">Watch Showreel</span>
            </MagneticButton>
          </div>

          {/* Scroll indicator */}
          <div
            className="hidden md:flex flex-col items-center gap-3"
            style={{
              transform: `translateY(${scrollY * 0.4}px)`,
              opacity: Math.max(0, 1 - scrollY / 300),
            }}
          >
            <span className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/60 font-medium">
              Scroll
            </span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-primary via-primary/50 to-transparent relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-6 bg-primary animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Velocity marquee at bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border/30 bg-background/80 backdrop-blur-xl">
        <ScrollVelocity baseVelocity={3} className="py-5">
          {["SEO", "FUNNELS", "GROWTH", "LEADS", "REVENUE", "STRATEGY", "ANALYTICS", "CONVERSION"].map((text, i) => (
            <span key={i} className={`text-5xl md:text-7xl font-bold tracking-[-0.03em] mx-8 ${i % 2 === 0 ? "text-foreground/5" : "text-primary/20"}`}>
              {text}
            </span>
          ))}
        </ScrollVelocity>
      </div>
    </section>
  );
}
