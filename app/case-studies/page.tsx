"use client";

import Link from "next/link";
import {
  TrendingUp,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { EnhancedCursor } from "@/components/enhanced-cursor";
import { FluidBackground } from "@/components/fluid-background";
import { GrainOverlay } from "@/components/grain-overlay";
import { SmoothScrollProvider } from "@/components/lenis-provider";
import { StickyCTA } from "@/components/sticky-cta";
import { SectionReveal } from "@/components/page-transition";
import { TiltCard } from "@/components/tilt-card";
import { trackCTAClick } from "@/lib/analytics";

const caseStudies = [
  {
    id: "nova-fashion",
    client: "Nova Fashion",
    industry: "E-commerce / DTC Fashion",
    metric: "580%",
    metricLabel: "Revenue Increase",
    summary:
      "Full-funnel overhaul reducing customer acquisition cost by 77% and increasing conversion rate 4x.",
    image: "/images/case-study-1.jpg",
    icon: TrendingUp,
    color: "#1aff80",
    stats: [
      { value: "$0.45", label: "Final CAC", change: "-77%" },
      { value: "3.2%", label: "Conversion Rate", change: "+300%" },
      { value: "$340K", label: "Monthly Revenue", change: "+580%" },
    ],
  },
  {
    id: "flowstate",
    client: "FlowState",
    industry: "SaaS / Productivity",
    metric: "4x",
    metricLabel: "Demo Bookings",
    summary:
      "Product-led growth strategy for B2B project management tool achieving 40% churn reduction.",
    image: "/images/case-study-2.jpg",
    icon: Users,
    color: "#00d4ff",
    stats: [
      { value: "4x", label: "Demo Bookings", change: "+300%" },
      { value: "-40%", label: "Churn Rate", change: "Improvement" },
      { value: "2.5x", label: "Activation Rate", change: "+150%" },
    ],
  },
  {
    id: "metro-fitness",
    client: "Metro Fitness",
    industry: "Local Business / Fitness",
    metric: "320%",
    metricLabel: "Lead Increase",
    summary:
      "Local SEO and paid acquisition strategy enabling expansion from 3 to 15 locations.",
    image: "/images/case-study-3.jpg",
    icon: DollarSign,
    color: "#ff6b35",
    stats: [
      { value: "320%", label: "Lead Increase", change: "+320%" },
      { value: "12", label: "New Locations", change: "Expansion" },
      { value: "-45%", label: "Cost Per Lead", change: "Reduction" },
    ],
  },
];

export default function CaseStudiesPage() {
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
                  Case Studies
                </span>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
                Real Results,
                <br />
                <span className="text-gradient">Real Revenue</span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p className="max-w-2xl text-xl text-muted-foreground leading-relaxed mb-12">
                We don&apos;t do vanity metrics. Every case study here shows actual
                revenue growth, cost reductions, and business transformation.
                These are real numbers from real clients.
              </p>
            </SectionReveal>

            {/* Overall Stats */}
            <SectionReveal delay={0.3}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl bg-card border border-border">
                {[
                  { value: "$50M+", label: "Revenue Generated" },
                  { value: "200+", label: "Projects Delivered" },
                  { value: "300%", label: "Avg. Growth Rate" },
                  { value: "98%", label: "Client Retention" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="px-6 md:px-12 lg:px-24 pb-32">
          <div className="max-w-7xl mx-auto space-y-24">
            {caseStudies.map((study, index) => (
              <SectionReveal key={study.id}>
                <TiltCard tiltAmount={3}>
                  <Link
                    href={`/case-studies/${study.id}`}
                    onClick={() =>
                      trackCTAClick(`case_study_${study.id}`, "case_studies_grid")
                    }
                    className="group block"
                  >
                    <div
                      className="grid lg:grid-cols-2 gap-8 p-8 md:p-12 rounded-3xl border transition-all duration-500 hover:border-primary/30"
                      style={{
                        background: `linear-gradient(135deg, ${study.color}05 0%, transparent 100%)`,
                      }}
                    >
                      {/* Content */}
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-6">
                          <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center"
                            style={{ background: `${study.color}15` }}
                          >
                            <study.icon
                              className="w-7 h-7"
                              style={{ color: study.color }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {study.industry}
                          </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-4 group-hover:text-primary transition-colors">
                          {study.client}
                        </h2>

                        <p className="text-lg text-muted-foreground mb-8">
                          {study.summary}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mb-8">
                          {study.stats.map((stat) => (
                            <div key={stat.label}>
                              <div
                                className="text-2xl md:text-3xl font-bold mb-1"
                                style={{ color: study.color }}
                              >
                                {stat.value}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {stat.label}
                              </div>
                              <div
                                className="text-xs font-medium mt-1"
                                style={{ color: study.color }}
                              >
                                {stat.change}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-primary font-medium">
                          <span>View Full Case Study</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                        </div>
                      </div>

                      {/* Visual Placeholder */}
                      <div
                        className="aspect-[4/3] rounded-2xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${study.color}10 0%, ${study.color}05 100%)`,
                          border: `1px solid ${study.color}20`,
                        }}
                      >
                        <div className="text-center">
                          <study.icon
                            className="w-24 h-24 mx-auto mb-4 opacity-30"
                            style={{ color: study.color }}
                          />
                          <div
                            className="text-6xl md:text-8xl font-bold"
                            style={{ color: `${study.color}30` }}
                          >
                            {study.metric}
                          </div>
                          <div
                            className="text-lg"
                            style={{ color: `${study.color}50` }}
                          >
                            {study.metricLabel}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <SectionReveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to be our next success story?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Let&apos;s discuss how we can drive similar results for your business.
              </p>
              <Link
                href="/contact"
                onClick={() => trackCTAClick("case_studies_cta", "case_studies_page")}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
              >
                Start Your Project
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </SectionReveal>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
