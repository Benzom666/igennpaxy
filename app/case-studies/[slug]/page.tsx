import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  TrendingUp,
  Users,
  DollarSign,
  ArrowRight,
  ArrowUpRight,
  Target,
  Lightbulb,
  Zap,
  BarChart3,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { EnhancedCursor } from "@/components/enhanced-cursor";
import { FluidBackground } from "@/components/fluid-background";
import { GrainOverlay } from "@/components/grain-overlay";
import { SmoothScrollProvider } from "@/components/lenis-provider";
import { StickyCTA } from "@/components/sticky-cta";
import { SectionReveal, FadeInLeft, FadeInRight } from "@/components/page-transition";
import { constructMetadata } from "@/lib/seo";
import { trackCTAClick } from "@/lib/analytics";

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  color: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  hero: {
    headline: string;
    subheadline: string;
  };
  challenge: {
    title: string;
    description: string;
    stats: { label: string; value: string }[];
  };
  strategy: {
    title: string;
    description: string;
    points: string[];
  };
  execution: {
    title: string;
    steps: { title: string; description: string }[];
  };
  results: {
    title: string;
    stats: { label: string; before: string; after: string; change: string }[];
    quote?: {
      text: string;
      author: string;
      role: string;
    };
  };
}

const caseStudiesData: Record<string, CaseStudy> = {
  "nova-fashion": {
    id: "nova-fashion",
    client: "Nova Fashion",
    industry: "E-commerce / DTC Fashion",
    color: "#1aff80",
    icon: TrendingUp,
    hero: {
      headline: "From $50K to $340K Monthly Revenue",
      subheadline:
        "How we helped a struggling DTC fashion brand achieve 580% revenue growth through full-funnel optimization.",
    },
    challenge: {
      title: "The Challenge",
      description:
        "Nova Fashion was struggling with unsustainable customer acquisition costs and poor conversion rates. Despite having quality products, their digital presence was not converting browsers into buyers.",
      stats: [
        { label: "Customer Acquisition Cost", value: "$2.00" },
        { label: "Conversion Rate", value: "0.8%" },
        { label: "Monthly Revenue", value: "$50K" },
      ],
    },
    strategy: {
      title: "Our Strategy",
      description:
        "We implemented a comprehensive full-funnel overhaul focusing on creative refresh, conversion rate optimization, and retention marketing.",
      points: [
        "Complete website redesign with CRO best practices",
        "Creative strategy refresh across all ad platforms",
        "Email marketing automation and flows",
        "Retention and loyalty program implementation",
      ],
    },
    execution: {
      title: "Execution",
      steps: [
        {
          title: "Discovery and Audit",
          description:
            "Analyzed customer journey, identified drop-off points, and audited existing creative assets.",
        },
        {
          title: "Website Redesign",
          description:
            "Built a conversion-focused Shopify Plus store with optimized product pages and checkout flow.",
        },
        {
          title: "Creative Refresh",
          description:
            "Produced new photo and video assets highlighting product quality and lifestyle fit.",
        },
        {
          title: "Campaign Launch",
          description:
            "Deployed Meta and Google campaigns with new creative and audience targeting.",
        },
      ],
    },
    results: {
      title: "The Results",
      stats: [
        { label: "Customer Acquisition Cost", before: "$2.00", after: "$0.45", change: "-77%" },
        { label: "Conversion Rate", before: "0.8%", after: "3.2%", change: "+300%" },
        { label: "Monthly Revenue", before: "$50K", after: "$340K", change: "+580%" },
      ],
      quote: {
        text: "IGEN and PAXY completely transformed our business. The results speak for themselves.",
        author: "Sarah Chen",
        role: "CEO, Nova Fashion",
      },
    },
  },
  flowstate: {
    id: "flowstate",
    client: "FlowState",
    industry: "SaaS / Productivity",
    color: "#00d4ff",
    icon: Users,
    hero: {
      headline: "4x Demo Bookings, 40% Less Churn",
      subheadline:
        "Product-led growth strategy that transformed a B2B SaaS company's acquisition and retention.",
    },
    challenge: {
      title: "The Challenge",
      description:
        "FlowState had a great product but struggled with low demo bookings and high customer churn. Their free-to-paid conversion was underperforming industry benchmarks.",
      stats: [
        { label: "Demo Bookings/Month", value: "12" },
        { label: "Monthly Churn", value: "8%" },
        { label: "Free-to-Paid Rate", value: "3%" },
      ],
    },
    strategy: {
      title: "Our Strategy",
      description:
        "We implemented a product-led growth strategy focusing on onboarding optimization, in-app engagement, and automated nurture sequences.",
      points: [
        "Onboarding flow redesign with progressive disclosure",
        "In-app guidance and feature adoption campaigns",
        "Automated email nurture sequences",
        "Product-qualified lead (PQL) scoring system",
      ],
    },
    execution: {
      title: "Execution",
      steps: [
        {
          title: "User Research",
          description:
            "Interviewed 50+ users to identify friction points in onboarding and product adoption.",
        },
        {
          title: "Onboarding Redesign",
          description:
            "Created contextual onboarding with interactive walkthroughs and milestone celebrations.",
        },
        {
          title: "Email Automation",
          description:
            "Built behavior-triggered email sequences based on user actions and inactivity.",
        },
        {
          title: "PQL System",
          description:
            "Implemented scoring model to identify sales-ready users based on product engagement.",
        },
      ],
    },
    results: {
      title: "The Results",
      stats: [
        { label: "Demo Bookings/Month", before: "12", after: "48", change: "+300%" },
        { label: "Monthly Churn", before: "8%", after: "4.8%", change: "-40%" },
        { label: "Free-to-Paid Rate", before: "3%", after: "7.5%", change: "+150%" },
      ],
      quote: {
        text: "They understood our product and our users better than we did. Game-changing partnership.",
        author: "Michael Torres",
        role: "Head of Growth, FlowState",
      },
    },
  },
  "metro-fitness": {
    id: "metro-fitness",
    client: "Metro Fitness",
    industry: "Local Business / Fitness",
    color: "#ff6b35",
    icon: DollarSign,
    hero: {
      headline: "320% More Leads, 12 New Locations",
      subheadline:
        "Local SEO and paid acquisition strategy that powered a regional gym chain's expansion.",
    },
    challenge: {
      title: "The Challenge",
      description:
        "Metro Fitness had ambitious expansion plans but was struggling with low membership signups and poor visibility in local search. Each new location was underperforming.",
      stats: [
        { label: "Monthly Leads", value: "45" },
        { label: "Cost Per Lead", value: "$120" },
        { label: "Local Search Visibility", value: "15%" },
      ],
    },
    strategy: {
      title: "Our Strategy",
      description:
        "Comprehensive local marketing strategy combining SEO, Google Ads, and location-specific landing pages.",
      points: [
        "Local SEO optimization for each location",
        "Google Business Profile management",
        "Location-specific paid campaigns",
        "Conversion-optimized landing pages",
      ],
    },
    execution: {
      title: "Execution",
      steps: [
        {
          title: "Local SEO Audit",
          description:
            "Identified ranking opportunities and technical issues across all existing locations.",
        },
        {
          title: "Landing Pages",
          description:
            "Created conversion-optimized, location-specific landing pages with local imagery and offers.",
        },
        {
          title: "Google Ads Setup",
          description:
            "Built geo-targeted campaigns with location extensions and call-only ads.",
        },
        {
          title: "Review Generation",
          description:
            "Implemented automated review request system to build social proof.",
        },
      ],
    },
    results: {
      title: "The Results",
      stats: [
        { label: "Monthly Leads", before: "45", after: "189", change: "+320%" },
        { label: "Cost Per Lead", before: "$120", after: "$55", change: "-54%" },
        { label: "New Locations", before: "3", after: "15", change: "+12" },
      ],
      quote: {
        text: "They turned our local marketing from a cost center into our growth engine.",
        author: "David Park",
        role: "Marketing Director, Metro Fitness",
      },
    },
  },
};

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudiesData[slug];

  if (!study) {
    return constructMetadata({
      title: "Case Study Not Found",
    });
  }

  return constructMetadata({
    title: `${study.client} Case Study | ${study.hero.headline}`,
    description: study.hero.subheadline,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudiesData[slug];

  if (!study) {
    notFound();
  }

  const Icon = study.icon;

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
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Case Studies
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${study.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: study.color }} />
                </div>
                <span className="text-sm text-muted-foreground">{study.industry}</span>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                {study.hero.headline}
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
                {study.hero.subheadline}
              </p>
            </SectionReveal>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <FadeInLeft>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="w-6 h-6" style={{ color: study.color }} />
                    <span
                      className="text-sm font-medium tracking-[0.2em] uppercase"
                      style={{ color: study.color }}
                    >
                      The Challenge
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-6">{study.challenge.title}</h2>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {study.challenge.description}
                  </p>
                </div>
              </FadeInLeft>

              <FadeInRight delay={0.2}>
                <div
                  className="p-8 rounded-2xl"
                  style={{
                    background: `${study.color}05`,
                    border: `1px solid ${study.color}15`,
                  }}
                >
                  <h3 className="text-lg font-semibold mb-6">Before We Started</h3>

                  <div className="space-y-6">
                    {study.challenge.stats.map((stat) => (
                      <div key={stat.label}>
                        <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                        <div className="text-3xl font-bold" style={{ color: study.color }}>
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInRight>
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24">
          <div className="max-w-7xl mx-auto">
            <SectionReveal>
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-6 h-6" style={{ color: study.color }} />
                <span
                  className="text-sm font-medium tracking-[0.2em] uppercase"
                  style={{ color: study.color }}
                >
                  Our Strategy
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">{study.strategy.title}</h2>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-12">
                {study.strategy.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {study.strategy.points.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 rounded-xl"
                    style={{
                      background: `${study.color}05`,
                      border: `1px solid ${study.color}10`,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${study.color}15` }}
                    >
                      <span className="text-sm font-bold" style={{ color: study.color }}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Execution Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <SectionReveal>
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6" style={{ color: study.color }} />
                <span
                  className="text-sm font-medium tracking-[0.2em] uppercase"
                  style={{ color: study.color }}
                >
                  Execution
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-12">{study.execution.title}</h2>
            </SectionReveal>

            <div className="space-y-8">
              {study.execution.steps.map((step, index) => (
                <SectionReveal key={index} delay={index * 0.1}>
                  <div className="flex gap-8">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                        style={{ background: `${study.color}15`, color: study.color }}
                      >
                        {index + 1}
                      </div>
                      {index < study.execution.steps.length - 1 && (
                        <div
                          className="w-px flex-1 my-4"
                          style={{ background: `${study.color}20` }}
                        />
                      )}
                    </div>

                    <div className="flex-1 pb-8">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24">
          <div className="max-w-7xl mx-auto">
            <SectionReveal>
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-6 h-6" style={{ color: study.color }} />
                <span
                  className="text-sm font-medium tracking-[0.2em] uppercase"
                  style={{ color: study.color }}
                >
                  {study.results.title}
                </span>
              </div>
            </SectionReveal>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {study.results.stats.map((stat, index) => (
                <SectionReveal key={stat.label} delay={index * 0.1}>
                  <div
                    className="p-8 rounded-2xl text-center"
                    style={{
                      background: `${study.color}05`,
                      border: `1px solid ${study.color}15`,
                    }}
                  >
                    <div className="text-sm text-muted-foreground mb-4">{stat.label}</div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Before</div>
                        <div className="text-xl font-semibold text-muted-foreground">
                          {stat.before}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">After</div>
                        <div className="text-xl font-bold" style={{ color: study.color }}>
                          {stat.after}
                        </div>
                      </div>
                    </div>

                    <div
                      className="inline-block px-4 py-1 rounded-full text-sm font-bold"
                      style={{ background: `${study.color}20`, color: study.color }}
                    >
                      {stat.change}
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>

            {/* Quote */}
            {study.results.quote && (
              <SectionReveal delay={0.4}>
                <blockquote
                  className="p-8 md:p-12 rounded-2xl text-center"
                  style={{
                    background: `${study.color}05`,
                    border: `1px solid ${study.color}15`,
                  }}
                >
                  <p className="text-xl md:text-2xl font-medium italic mb-6">
                    "{study.results.quote.text}"
                  </p>
                  <footer>
                    <div className="font-semibold">{study.results.quote.author}</div>
                    <div className="text-sm text-muted-foreground">{study.results.quote.role}</div>
                  </footer>
                </blockquote>
              </SectionReveal>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <SectionReveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready for similar results?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Let us discuss how we can drive growth for your business.
              </p>
              <Link
                href="/contact"
                onClick={() => trackCTAClick(`case_study_${slug}_cta`, "case_study_page")}
                className="inline-flex items-center gap-3 px-8 py-4 font-semibold rounded-full transition-transform hover:scale-105"
                style={{ background: study.color, color: "#0a0f0c" }}
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
