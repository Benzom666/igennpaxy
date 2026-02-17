"use client";

import {
  Target,
  TrendingUp,
  Users,
  Code2,
  BarChart3,
  Layers,
  X,
  AlertTriangle,
  CheckCircle2,
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
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/page-transition";
import { FAQSection, commonFAQs } from "@/components/faq-section";
import { UsVsOthersComparison } from "@/components/comparison-table";
import { trackCTAClick } from "@/lib/analytics";

const methodologySteps = [
  {
    icon: Target,
    title: "Acquisition",
    description:
      "We identify and target your ideal customers through data-driven channel selection and precise audience segmentation.",
  },
  {
    icon: TrendingUp,
    title: "Conversion",
    description:
      "Optimize every touchpoint to transform visitors into customers through CRO, compelling creative, and seamless UX.",
  },
  {
    icon: Users,
    title: "Retention",
    description:
      "Maximize customer lifetime value through email marketing, loyalty programs, and ongoing engagement strategies.",
  },
];

const techStack = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Google Analytics 4", category: "Analytics" },
  { name: "Meta Business Manager", category: "Ads" },
  { name: "HubSpot", category: "CRM" },
  { name: "Shopify Plus", category: "E-commerce" },
  { name: "Stripe", category: "Payments" },
  { name: "AWS", category: "Cloud" },
];

const whyOthersFail = [
  {
    title: "They Focus on Vanity Metrics",
    description:
      "Most agencies report on impressions, clicks, and engagement. We focus on revenue, customer acquisition cost, and lifetime value.",
  },
  {
    title: "Cookie-Cutter Strategies",
    description:
      "Every business is unique. We develop custom strategies based on your specific goals, market position, and competitive landscape.",
  },
  {
    title: "Set It and Forget It",
    description:
      "Digital marketing requires constant optimization. We&apos;re in your accounts daily, making adjustments and improvements.",
  },
  {
    title: "No Technical Expertise",
    description:
      "Many agencies can run ads but can&apos;t optimize the underlying technology. We build and optimize the entire funnel.",
  },
  {
    title: "Poor Communication",
    description:
      "You shouldn&apos;t have to chase your agency for updates. We provide weekly reports and are available within 2 hours.",
  },
];

const insights = [
  {
    title: "The Death of Third-Party Cookies",
    content:
      "With cookies disappearing, first-party data strategies are critical. We help you build owned audiences through email, SMS, and community.",
  },
  {
    title: "AI-Powered Marketing",
    content:
      "We leverage AI for creative testing, copy optimization, and predictive analytics—giving you a competitive advantage.",
  },
  {
    title: "The Rise of Short-Form Video",
    content:
      "TikTok, Reels, and Shorts are dominating attention. We create thumb-stopping content that converts.",
  },
  {
    title: "Privacy-First Analytics",
    content:
      "With iOS privacy changes, attribution is harder than ever. We implement server-side tracking and advanced modeling.",
  },
];

export default function LearnMorePage() {
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
                  Learn More
                </span>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
                How We
                <br />
                <span className="text-gradient">Think</span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p className="max-w-2xl text-xl text-muted-foreground leading-relaxed">
                We don&apos;t follow trends—we set them. Our methodology has been
                refined through 200+ projects and $50M+ in generated revenue.
                Here&apos;s how we approach every engagement.
              </p>
            </SectionReveal>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <SectionReveal>
              <div className="text-center mb-16">
                <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                  Our Framework
                </span>
                <h2 className="text-4xl md:text-5xl font-bold">
                  The Growth Loop
                </h2>
              </div>
            </SectionReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {methodologySteps.map((step, index) => (
                <SectionReveal key={step.title} delay={index * 0.1}>
                  <div className="relative p-8 rounded-2xl bg-card border border-border">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>

                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>

                    {index < methodologySteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-border" />
                    )}
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24">
          <div className="max-w-7xl mx-auto">
            <SectionReveal>
              <div className="text-center mb-16">
                <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                  Our Stack
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Technology That Delivers
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  We use industry-leading tools and custom-built solutions to
                  drive results.
                </p>
              </div>
            </SectionReveal>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {techStack.map((tech) => (
                <StaggerItem key={tech.name}>
                  <div className="p-6 rounded-xl bg-card border border-border text-center hover:border-primary/30 transition-colors">
                    <div className="text-sm text-muted-foreground mb-1">{tech.category}</div>
                    <div className="font-semibold">{tech.name}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Why Others Fail Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <SectionReveal>
              <div className="text-center mb-16">
                <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Why Other Agencies Fail
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  We&apos;ve seen it all. Here&apos;s why most digital marketing agencies
                  don&apos;t deliver the results they promise.
                </p>
              </div>
            </SectionReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyOthersFail.map((item, index) => (
                <SectionReveal key={item.title} delay={index * 0.1}>
                  <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/10">
                    <div className="flex items-start gap-3 mb-4">
                      <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24">
          <div className="max-w-7xl mx-auto">
            <SectionReveal>
              <div className="text-center mb-16">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Us vs. The Competition
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  See how IGEN & PAXY compares to typical digital marketing
                  agencies.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <UsVsOthersComparison />
            </SectionReveal>
          </div>
        </section>

        {/* Strategic Insights */}
        <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <SectionReveal>
              <div className="text-center mb-16">
                <Layers className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Strategic Insights
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Key trends and insights shaping digital marketing in 2026.
                </p>
              </div>
            </SectionReveal>

            <div className="grid md:grid-cols-2 gap-8">
              {insights.map((insight, index) => (
                <SectionReveal key={insight.title} delay={index * 0.1}>
                  <div className="p-8 rounded-2xl bg-card border border-border">
                    <BarChart3 className="w-8 h-8 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">{insight.title}</h3>
                    <p className="text-muted-foreground">{insight.content}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
          <div className="max-w-3xl mx-auto">
            <SectionReveal>
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-muted-foreground">
                  Everything you need to know about working with us.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <FAQSection items={commonFAQs} />
            </SectionReveal>
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
                Let&apos;s discuss how our methodology can drive growth for your
                business.
              </p>
              <Link
                href="/contact"
                onClick={() => trackCTAClick("learn_more_cta", "learn_more_page")}
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
