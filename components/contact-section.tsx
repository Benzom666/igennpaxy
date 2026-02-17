"use client";

import React from "react"

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TextReveal } from "./text-reveal";
import { MagneticButton } from "./magnetic-button";
import { ArrowUpRight, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setFormState({ name: "", email: "", company: "", budget: "", message: "" });
  };

  const inputClasses = "w-full px-0 py-5 bg-transparent border-b-2 border-border focus:border-primary outline-none transition-all duration-300 text-lg placeholder:text-transparent peer";
  const labelClasses = (field: string, value: string) => cn(
    "absolute left-0 transition-all duration-300 pointer-events-none",
    focusedField === field || value
      ? "-top-2 text-xs text-primary font-medium tracking-wider uppercase"
      : "top-5 text-base text-muted-foreground"
  );

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 md:py-48 bg-background relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[200px] pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      {/* Large background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="text-[15vw] font-bold text-foreground/[0.02] tracking-tighter whitespace-nowrap">
          CONTACT
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className={cn(
            "flex items-center gap-4 mb-6 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-medium tracking-[0.3em] uppercase text-primary">
              Get in Touch
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            <TextReveal>{"Let's create"}</TextReveal>
            <br />
            <TextReveal delay={200} className="text-gradient">
              something epic
            </TextReveal>
          </h2>
          <p className={cn(
            "text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            Have a project in mind? We&apos;d love to hear about it. Drop us a line
            and let&apos;s start building your digital empire.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className={cn(
              "lg:col-span-3 space-y-10 transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}
          >
            <div className="grid md:grid-cols-2 gap-10">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses}
                  required
                />
                <label htmlFor="name" className={labelClasses("name", formState.name)}>
                  Your Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses}
                  required
                />
                <label htmlFor="email" className={labelClasses("email", formState.email)}>
                  Email Address
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="relative">
                <input
                  type="text"
                  id="company"
                  value={formState.company}
                  onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                  onFocus={() => setFocusedField("company")}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses}
                />
                <label htmlFor="company" className={labelClasses("company", formState.company)}>
                  Company Name
                </label>
              </div>

              <div className="relative">
                <select
                  id="budget"
                  value={formState.budget}
                  onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                  onFocus={() => setFocusedField("budget")}
                  onBlur={() => setFocusedField(null)}
                  className={cn(inputClasses, "appearance-none cursor-pointer")}
                >
                  <option value="">Select Budget Range</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k+">$100,000+</option>
                </select>
                <label htmlFor="budget" className={cn(
                  "absolute left-0 -top-2 text-xs text-primary font-medium tracking-wider uppercase pointer-events-none"
                )}>
                  Budget Range
                </label>
              </div>
            </div>

            <div className="relative">
              <textarea
                id="message"
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                className={cn(inputClasses, "resize-none")}
                required
              />
              <label htmlFor="message" className={labelClasses("message", formState.message)}>
                Tell us about your project
              </label>
            </div>

            <MagneticButton
              className="group w-full md:w-auto px-12 py-6 bg-primary text-primary-foreground rounded-full font-semibold text-lg flex items-center justify-center gap-3 relative overflow-hidden"
            >
              <span className={cn(
                "flex items-center gap-3 transition-all duration-300",
                isSubmitting ? "opacity-0" : "opacity-100"
              )}>
                Send Message
                <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
              <span className={cn(
                "absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300",
                isSubmitting ? "opacity-100" : "opacity-0"
              )}>
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Sending...
              </span>
              <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10" />
            </MagneticButton>
          </form>

          {/* Contact info */}
          <div
            className={cn(
              "lg:col-span-2 space-y-12 transition-all duration-1000 delay-300",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}
          >
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                Contact Info
                <Sparkles className="w-5 h-5 text-primary" />
              </h3>
              <div className="space-y-6">
                <a href="mailto:hello@igenpaxy.com" className="flex items-center gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                    <Mail className="w-5 h-5 group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                    <p className="font-medium group-hover:text-primary transition-colors">hello@igenpaxy.com</p>
                  </div>
                </a>

                <a href="tel:+14155551234" className="flex items-center gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                    <Phone className="w-5 h-5 group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Phone</p>
                    <p className="font-medium group-hover:text-primary transition-colors">+1 (415) 555-1234</p>
                  </div>
                </a>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Location</p>
                    <p className="font-medium">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="pt-8 border-t border-border">
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4">
                {["Careers", "Press Kit", "Privacy", "Terms"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    {link}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
