"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollVelocity } from "./scroll-velocity";
import { MagneticButton } from "./magnetic-button";
import { TextReveal } from "./text-reveal";
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Send,
} from "lucide-react";
import { trackCTAClick, trackFormSubmit } from "@/lib/analytics";
import { motion } from "framer-motion";

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

const footerLinks = {
  services: [
    { label: "Brand Identity", href: "/services/brand-identity" },
    { label: "Web Development", href: "/services/web-development" },
    { label: "Growth Marketing", href: "/services/growth-marketing" },
    { label: "Social Media", href: "/services/social-media" },
    { label: "Content Production", href: "/services/content-production" },
    { label: "SEO & Content", href: "/services/seo" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Learn More", href: "/learn-more" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  const [time, setTime] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      trackFormSubmit("newsletter_signup");
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const handleCTAClick = () => {
    trackCTAClick("footer_start_project", "footer_cta");
  };

  return (
    <footer ref={ref} className="relative overflow-hidden bg-[#faf8f5]">
      {/* CTA Section */}
      <div className="py-32 lg:py-48 px-6 lg:px-16 relative">
        {/* Background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(201,169,98,0.3) 0%, transparent 70%)",
            filter: "blur(150px)",
          }}
        />

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#6b6863] mb-8">
              Ready to elevate your brand?
            </span>

            <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-[8rem] font-medium tracking-[-0.03em] mb-12 leading-[0.9] text-[#0a0a0b]">
              <TextReveal>{"Let's Create"}</TextReveal>
              <br />
              <span className="text-gradient-gold">
                <TextReveal delay={300}>{"Together"}</TextReveal>
              </span>
            </h2>

            <Link href="/contact" onClick={handleCTAClick}>
              <MagneticButton className="group px-12 py-6 bg-[#0a0a0b] text-[#faf8f5] rounded-lg text-sm font-medium tracking-wide flex items-center gap-4 relative overflow-hidden hover:shadow-[0_0_60px_rgba(0,0,0,0.2)] transition-shadow duration-500">
                <span className="relative z-10 flex items-center gap-4">
                  Start a Project
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
                <div className="absolute inset-0 bg-[#c9a962] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="absolute inset-0 flex items-center justify-center gap-4 text-[#0a0a0b] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 z-20">
                  Start a Project
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Marquee - Dark background */}
      <div className="bg-[#0a0a0b] py-10 overflow-hidden">
        <ScrollVelocity baseVelocity={2} className="py-4">
          {["STRATEGY", "DESIGN", "DEVELOPMENT", "MARKETING", "GROWTH", "EXCELLENCE", "INNOVATION", "LUXURY"].map(
            (text, i) => (
              <span
                key={i}
                className={cn(
                  "font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-medium tracking-tight mx-12 select-none",
                  i % 2 === 0 ? "text-[rgba(255,255,255,0.03)]" : "text-[rgba(201,169,98,0.15)]"
                )}
              >
                {text}
              </span>
            )
          )}
        </ScrollVelocity>
      </div>

      {/* Footer content - Dark background */}
      <div className="bg-[#0a0a0b] py-20 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            {/* Logo & description + Newsletter */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-[#c9a962] rounded-sm rotate-45" />
                  <span className="absolute inset-0 flex items-center justify-center text-[#0a0a0b] font-[family-name:var(--font-playfair)] font-bold text-lg">
                    I
                  </span>
                </div>
                <span className="font-[family-name:var(--font-playfair)] text-xl font-medium tracking-tight text-[#faf8f5]">
                  IGEN<span className="text-[#c9a962]">&</span>PAXY
                </span>
              </Link>
              <p className="text-[#a8a5a0] max-w-md leading-relaxed mb-10">
                Award-winning digital marketing agency crafting immersive
                experiences that transform premium brands and drive exponential growth.
              </p>

              {/* Newsletter signup */}
              <div className="max-w-md">
                <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-[#6b6863] mb-5">
                  Subscribe to our newsletter
                </h4>
                <form onSubmit={handleSubscribe} className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-5 py-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#faf8f5] placeholder:text-[#6b6863] text-sm outline-none focus:border-[rgba(201,169,98,0.4)] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribed}
                    className="px-5 py-4 bg-[#c9a962] text-[#0a0a0b] rounded-lg font-medium text-sm hover:bg-[#d4b876] disabled:opacity-70 transition-colors flex items-center justify-center"
                  >
                    {isSubscribed ? (
                      "Subscribed!"
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </form>
                <p className="text-[10px] text-[#6b6863] mt-4">
                  Get growth tips and industry insights delivered to your inbox.
                </p>
              </div>

              {/* Social links */}
              <div className="flex gap-3 mt-10">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 rounded-lg border border-[rgba(255,255,255,0.08)] flex items-center justify-center hover:bg-[rgba(201,169,98,0.1)] hover:border-[rgba(201,169,98,0.3)] transition-all group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-[#6b6863] group-hover:text-[#c9a962] transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-[#6b6863] mb-8">
                Services
              </h4>
              <nav className="space-y-4">
                {footerLinks.services.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-[#a8a5a0] hover:text-[#c9a962] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-[#6b6863] mb-8">
                Company
              </h4>
              <nav className="space-y-4">
                {footerLinks.company.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-[#a8a5a0] hover:text-[#c9a962] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-[rgba(255,255,255,0.06)] gap-6">
            <p className="text-xs text-[#6b6863]">
              &copy; {new Date().getFullYear()} Igen & Paxy. All rights reserved.
            </p>
            <div className="flex items-center gap-8 text-xs text-[#6b6863]">
              <span>San Francisco, CA</span>
              <span className="font-[family-name:var(--font-mono)] tabular-nums text-[#a8a5a0]">{time} PST</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
