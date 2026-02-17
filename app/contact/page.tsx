"use client";

import { Mail, MapPin, Phone, Clock, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { EnhancedCursor } from "@/components/enhanced-cursor";
import { FluidBackground } from "@/components/fluid-background";
import { GrainOverlay } from "@/components/grain-overlay";
import { SmoothScrollProvider } from "@/components/lenis-provider";
import { StickyCTA } from "@/components/sticky-cta";
import { SectionReveal, FadeInLeft, FadeInRight } from "@/components/page-transition";
import { MultiStepForm } from "@/components/multi-step-form";
import { CalendlyEmbed } from "@/components/calendly-embed";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@igenpaxy.com",
    href: "mailto:hello@igenpaxy.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (415) 555-1234",
    href: "tel:+14155551234",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: "#",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: "#",
  },
];

const trustIndicators = [
  { value: "24h", label: "Avg. Response" },
  { value: "200+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "$50M+", label: "Revenue Generated" },
];

export default function ContactPage() {
  return (
    <SmoothScrollProvider>
      <EnhancedCursor />
      <FluidBackground />
      <GrainOverlay />
      <StickyCTA />
      <main className="min-h-screen overflow-x-hidden pt-32">
        <Navigation />

        {/* Hero Section */}
        <section className="px-6 md:px-12 lg:px-24 mb-24">
          <div className="max-w-7xl mx-auto">
            <SectionReveal>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-primary" />
                <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary">
                  Get in Touch
                </span>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
                Let&apos;s Create
                <br />
                <span className="text-gradient">Something Epic</span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p className="max-w-2xl text-xl text-muted-foreground leading-relaxed">
                Have a project in mind? We&apos;d love to hear about it. Fill out the
                form below or book a call directly on our calendar. We respond to
                all inquiries within 24 hours.
              </p>
            </SectionReveal>

            {/* Trust Indicators */}
            <SectionReveal delay={0.3}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 p-8 rounded-2xl bg-card border border-border">
                {trustIndicators.map((indicator) => (
                  <div key={indicator.label} className="text-center">
                    <div className="text-3xl font-bold text-gradient mb-1">
                      {indicator.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{indicator.label}</div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-16">
              <FadeInLeft className="lg:col-span-3">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <h2 className="text-3xl font-bold">Tell Us About Your Project</h2>
                  </div>
                  <p className="text-muted-foreground mb-8">
                    Complete this quick form and we&apos;ll get back to you within 24
                    hours with a detailed proposal.
                  </p>

                  <MultiStepForm />
                </div>
              </FadeInLeft>

              <FadeInRight delay={0.2} className="lg:col-span-2">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-6">Contact Info</h3>
                    <div className="space-y-6">
                      {contactInfo.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-4 group"
                        >
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                            <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider">
                              {item.label}
                            </div>
                            <div className="font-medium group-hover:text-primary transition-colors">
                              {item.value}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Lead Magnet */}
                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                    <h4 className="font-bold mb-2">Free Growth Framework</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get our proprietary framework that has generated $50M+ in
                      revenue for our clients.
                    </p>
                    <Link
                      href="/learn-more"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </FadeInRight>
            </div>
          </div>
        </section>

        {/* Calendly Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24">
          <div className="max-w-4xl mx-auto">
            <SectionReveal>
              <div className="text-center mb-12">
                <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                  Book a Call
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Schedule a Free Strategy Call
                </h2>
                <p className="text-xl text-muted-foreground">
                  Pick a time that works for you. We&apos;ll discuss your goals and
                  how we can help you achieve them.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <CalendlyEmbed height="800px" />
            </SectionReveal>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
