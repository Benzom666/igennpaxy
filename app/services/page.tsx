"use client";

import {
  Palette,
  Globe,
  TrendingUp,
  Share2,
  Video,
  Search,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { EnhancedCursor } from "@/components/enhanced-cursor";
import { FluidBackground } from "@/components/fluid-background";
import { GrainOverlay } from "@/components/grain-overlay";
import { SmoothScrollProvider } from "@/components/lenis-provider";
import { ServiceCard, ServiceData } from "@/components/service-card";
import { StickyCTA } from "@/components/sticky-cta";
import { SectionReveal } from "@/components/page-transition";

const services: ServiceData[] = [
  {
    slug: "brand-identity",
    name: "Brand Identity",
    headline: "Stand Out. Be Remembered.",
    description:
      "Complete visual systems including logos, color palettes, typography, and brand guidelines that resonate with your target audience and differentiate you from competitors.",
    icon: Palette,
    color: "#1aff80",
    features: [
      "Logo Design & Brand Marks",
      "Visual Identity Systems",
      "Brand Guidelines",
      "Packaging Design",
      "Brand Strategy",
      "Market Positioning",
    ],
    price: "$15,000",
    popular: true,
  },
  {
    slug: "web-development",
    name: "Web Development",
    headline: "High-Performance Digital Experiences",
    description:
      "Custom websites and web applications built with cutting-edge technologies for speed, scalability, and conversion optimization.",
    icon: Globe,
    color: "#ff6b35",
    features: [
      "React/Next.js Development",
      "E-commerce Solutions",
      "Custom Web Applications",
      "Headless CMS Integration",
      "Performance Optimization",
      "Accessibility Compliance",
    ],
    price: "$25,000",
  },
  {
    slug: "growth-marketing",
    name: "Growth Marketing",
    headline: "Scale Fast. Spend Smart.",
    description:
      "Data-driven paid acquisition and conversion rate optimization that maximizes ROI and accelerates customer acquisition.",
    icon: TrendingUp,
    color: "#00d4ff",
    features: [
      "PPC Campaign Management",
      "Conversion Rate Optimization",
      "Attribution Modeling",
      "Landing Page Optimization",
      "A/B Testing Programs",
      "Marketing Automation",
    ],
    price: "$10,000/mo",
    popular: true,
  },
  {
    slug: "social-media",
    name: "Social Media",
    headline: "Build Community. Drive Engagement.",
    description:
      "Strategic social media management and paid social campaigns that build authentic connections and drive measurable business results.",
    icon: Share2,
    color: "#ff00ff",
    features: [
      "Content Strategy",
      "Community Management",
      "Paid Social Campaigns",
      "Influencer Partnerships",
      "Social Listening",
      "Performance Analytics",
    ],
    price: "$8,000/mo",
  },
  {
    slug: "content-production",
    name: "Content Production",
    headline: "Content That Converts",
    description:
      "Professional video, photography, and motion graphics that tell your brand story and drive engagement across all channels.",
    icon: Video,
    color: "#ffd700",
    features: [
      "Video Production",
      "Motion Graphics",
      "Photography",
      "Animation",
      "Podcast Production",
      "Content Strategy",
    ],
    price: "Project-based",
  },
  {
    slug: "seo",
    name: "SEO & Content",
    headline: "Own The Search Results",
    description:
      "Comprehensive SEO strategies and content marketing that drive organic traffic, improve rankings, and establish thought leadership.",
    icon: Search,
    color: "#8b5cf6",
    features: [
      "Technical SEO Audits",
      "Content Strategy",
      "Link Building",
      "Local SEO",
      "Content Creation",
      "Rank Tracking",
    ],
    price: "$7,500/mo",
  },
];

export default function ServicesPage() {
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
                  Our Services
                </span>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
                Digital Solutions
                <br />
                <span className="text-gradient">That Drive Revenue</span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p className="max-w-2xl text-xl text-muted-foreground leading-relaxed">
                We don&apos;t just build pretty websites or run ads. We create
                comprehensive digital strategies that directly impact your
                bottom line. Every service is designed with one goal: driving
                measurable business growth.
              </p>
            </SectionReveal>
          </div>
        </section>

        {/* Services Grid */}
        <section className="px-6 md:px-12 lg:px-24 pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <SectionReveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Not sure what you need?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Let&apos;s talk through your goals and we&apos;ll recommend the right
                combination of services for your business.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
              >
                Book a Free Strategy Call
                <TrendingUp className="w-5 h-5" />
              </a>
            </SectionReveal>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
