"use client";

import {
  Target,
  Zap,
  Award,
  Users,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { EnhancedCursor } from "@/components/enhanced-cursor";
import { FluidBackground } from "@/components/fluid-background";
import { GrainOverlay } from "@/components/grain-overlay";
import { SmoothScrollProvider } from "@/components/lenis-provider";
import { StickyCTA } from "@/components/sticky-cta";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/page-transition";
import { AnimatedCounter } from "@/components/animated-counter";
import { trackCTAClick } from "@/lib/analytics";

const stats = [
  { value: 200, suffix: "+", label: "Projects Delivered" },
  { value: 50, prefix: "$", suffix: "M+", label: "Revenue Generated" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 15, suffix: "+", label: "Industry Awards" },
];

const values = [
  {
    icon: Target,
    title: "Outcome Obsessed",
    description:
      "We measure success by revenue growth, not vanity metrics. Every decision is made with your bottom line in mind.",
  },
  {
    icon: Zap,
    title: "Move Fast",
    description:
      "Speed is a competitive advantage. We execute quickly, iterate constantly, and never let perfect be the enemy of good.",
  },
  {
    icon: Award,
    title: "Excellence Always",
    description:
      "We hold ourselves to the highest standards. From strategy to execution, we deliver work we&apos;re proud of.",
  },
  {
    icon: Users,
    title: "Partnership First",
    description:
      "We&apos;re not vendors—we&apos;re partners. Your success is our success, and we treat your business like our own.",
  },
];

const team = [
  {
    name: "Alex Rivera",
    role: "Founder & CEO",
    bio: "Former growth lead at Shopify. Obsessed with conversion optimization and scalable acquisition strategies.",
  },
  {
    name: "Jordan Chen",
    role: "Creative Director",
    bio: "Award-winning designer with 10+ years building brands for Fortune 500 companies and startups alike.",
  },
  {
    name: "Maya Patel",
    role: "Head of Growth",
    bio: "Ex-Meta growth strategist. Managed $50M+ in ad spend and specializes in performance marketing at scale.",
  },
  {
    name: "Chris Thompson",
    role: "Technical Director",
    bio: "Full-stack developer and CRO specialist. Built platforms processing $100M+ in annual transactions.",
  },
];

const differentiators = [
  {
    title: "Revenue-First Approach",
    description:
      "While other agencies focus on impressions and clicks, we focus on the metrics that matter: revenue, CAC, LTV, and ROI.",
  },
  {
    title: "Technical Excellence",
    description:
      "We don&apos;t just run ads—we build the infrastructure for sustainable growth. From custom tracking to full-stack development.",
  },
  {
    title: "Speed of Execution",
    description:
      "Our average campaign launch time is 48 hours. We move fast, test aggressively, and scale what works.",
  },
  {
    title: "Transparent Partnership",
    description:
      "Real-time dashboards, weekly strategy calls, and no black boxes. You always know what we&apos;re doing and why.",
  },
];

export default function AboutPage() {
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
                  About Us
                </span>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
                We Don&apos;t Do
                <br />
                <span className="text-gradient">Vanity Metrics</span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p className="max-w-2xl text-xl text-muted-foreground leading-relaxed">
                We drive revenue. Period. Founded in 2020, IGEN & PAXY has grown
                from a two-person team to a full-service digital agency by doing
                one thing exceptionally well: delivering measurable business
                results for our clients.
              </p>
            </SectionReveal>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <SectionReveal key={stat.label} delay={index * 0.1}>
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <SectionReveal>
                <div>
                  <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                    Our Mission
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Transforming How Businesses Grow Online
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We believe that digital marketing shouldn&apos;t be a black box.
                    Our mission is to bring transparency, accountability, and
                    measurable results to an industry that too often prioritizes
                    activity over outcomes.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div className="p-8 md:p-12 rounded-3xl bg-primary/5 border border-primary/10">
                  <blockquote className="text-2xl md:text-3xl font-medium italic">
                    "We started IGEN & PAXY because we were tired of seeing
                    businesses get burned by agencies that prioritized awards
                    over results."
                  </blockquote>
                  <footer className="mt-6">
                    <div className="font-semibold">Alex Rivera</div>
                    <div className="text-sm text-muted-foreground">
                      Founder & CEO
                    </div>
                  </footer>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <SectionReveal>
              <div className="text-center mb-16">
                <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                  Our Values
                </span>
                <h2 className="text-4xl md:text-5xl font-bold">
                  How We Work
                </h2>
              </div>
            </SectionReveal>

            <StaggerContainer className="grid md:grid-cols-2 gap-8">
              {values.map((value) => (
                <StaggerItem key={value.title}>
                  <div className="p-8 rounded-2xl bg-card border border-border">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Differentiators */}
        <section className="px-6 md:px-12 lg:px-24 py-24">
          <div className="max-w-7xl mx-auto">
            <SectionReveal>
              <div className="text-center mb-16">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  What Makes Us Different
                </h2>
              </div>
            </SectionReveal>

            <div className="grid md:grid-cols-2 gap-8">
              {differentiators.map((item, index) => (
                <SectionReveal key={item.title} delay={index * 0.1}>
                  <div className="p-8 rounded-2xl bg-card border border-border">
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <SectionReveal>
              <div className="text-center mb-16">
                <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                  Our Team
                </span>
                <h2 className="text-4xl md:text-5xl font-bold">
                  Meet The Experts
                </h2>
              </div>
            </SectionReveal>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <StaggerItem key={member.name}>
                  <div className="p-6 rounded-2xl bg-card border border-border text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <div className="text-primary text-sm mb-4">{member.role}</div>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <SectionReveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to work with us?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Let&apos;s discuss how we can drive growth for your business.
              </p>
              <Link
                href="/contact"
                onClick={() => trackCTAClick("about_cta", "about_page")}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </SectionReveal>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
