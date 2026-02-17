"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ScrollVelocity } from "./scroll-velocity";
import { MagneticButton } from "./magnetic-button";
import { TextReveal } from "./text-reveal";
import { ArrowUpRight, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

const footerLinks = {
  services: ["SEO & Growth", "Brand Identity", "Web Development", "Social Media", "Analytics"],
  company: ["About Us", "Our Work", "Careers", "Blog", "Contact"],
};

export function Footer() {
  const [time, setTime] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "America/Los_Angeles",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
    <footer ref={ref} className="bg-foreground text-background relative overflow-hidden">
      {/* CTA Section */}
      <div className="py-32 md:py-48 px-6 md:px-12 lg:px-24 relative">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[200px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div
            className={cn(
              "flex flex-col items-center text-center transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}
          >
            <span className="text-sm font-medium tracking-[0.3em] uppercase text-background/50 mb-8">
              Ready to dominate digital?
            </span>
            
            <h2 className="text-5xl md:text-7xl lg:text-[9rem] font-bold tracking-[-0.04em] mb-12 leading-[0.9]">
              <TextReveal>{"LET'S WORK"}</TextReveal>
              <br />
              <span className="text-primary">
                <TextReveal delay={300}>TOGETHER</TextReveal>
              </span>
            </h2>
            
            <MagneticButton className="group px-12 py-7 bg-primary text-primary-foreground rounded-full text-xl font-semibold flex items-center gap-4 relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-4">
                Start a Project
                <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
              <div className="absolute inset-0 bg-background translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="absolute inset-0 flex items-center justify-center gap-4 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 z-20">
                Start a Project
                <ArrowUpRight className="w-6 h-6" />
              </span>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="border-t border-background/10">
        <ScrollVelocity baseVelocity={2} className="py-8">
          {["STRATEGY", "DESIGN", "DEVELOPMENT", "MARKETING", "GROWTH", "INNOVATION"].map((text, i) => (
            <span key={i} className={cn(
              "text-6xl md:text-8xl font-bold tracking-[-0.02em] mx-8",
              i % 2 === 0 ? "text-background/5" : "text-primary/20"
            )}>
              {text}
            </span>
          ))}
        </ScrollVelocity>
      </div>

      {/* Footer content */}
      <div className="py-20 px-6 md:px-12 lg:px-24 border-t border-background/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {/* Logo & description */}
            <div className="lg:col-span-2">
              <a href="#" className="flex items-center gap-3 mb-6">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-primary rounded-lg rotate-45" />
                  <span className="absolute inset-0 flex items-center justify-center text-primary-foreground font-bold text-lg">
                    I
                  </span>
                </div>
                <span className="text-2xl font-bold tracking-tight">
                  IGEN<span className="text-primary">&</span>PAXY
                </span>
              </a>
              <p className="text-background/50 max-w-md leading-relaxed mb-8">
                Award-winning digital marketing agency crafting immersive
                experiences that transform brands and drive exponential growth.
              </p>
              
              {/* Social links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 rounded-full border border-background/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-background/50 group-hover:text-primary-foreground transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-6 text-background/40 uppercase text-xs tracking-[0.2em]">
                Services
              </h4>
              <nav className="space-y-4">
                {footerLinks.services.map((link) => (
                  <a
                    key={link}
                    href="#services"
                    className="block text-background/60 hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-6 text-background/40 uppercase text-xs tracking-[0.2em]">
                Company
              </h4>
              <nav className="space-y-4">
                {footerLinks.company.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="block text-background/60 hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-background/10 gap-4">
            <p className="text-background/30 text-sm">
              &copy; {new Date().getFullYear()} Igen & Paxy. All rights reserved.
            </p>
            <div className="flex items-center gap-8 text-sm text-background/30">
              <span>San Francisco, CA</span>
              <span className="font-mono tabular-nums">{time} PST</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
