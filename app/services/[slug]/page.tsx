import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Palette,
  Globe,
  TrendingUp,
  Share2,
  Video,
  Search,
  ArrowRight,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { EnhancedCursor } from "@/components/enhanced-cursor";
import { FluidBackground } from "@/components/fluid-background";
import { GrainOverlay } from "@/components/grain-overlay";
import { SmoothScrollProvider } from "@/components/lenis-provider";
import { StickyCTA } from "@/components/sticky-cta";
import {
  SectionReveal,
  FadeInLeft,
  FadeInRight,
} from "@/components/page-transition";
import { ServiceData } from "@/components/service-card";
import { constructMetadata, generateServiceSchema } from "@/lib/seo";
import Link from "next/link";
import { trackCTAClick } from "@/lib/analytics";

// Service data - same as services page
const servicesData: Record<string, ServiceData> = {
  "brand-identity": {
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
  "web-development": {
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
  "growth-marketing": {
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
  "social-media": {
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
  "content-production": {
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
  seo: {
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
};

const processSteps = [
  {
    number: "01",
    title: "Discovery & Audit",
    description:
      "We analyze your current situation, competitors, and opportunities to build a strategic foundation.",
  },
  {
    number: "02",
    title: "Strategy Development",
    description:
      "Custom roadmap created specifically for your business goals, timeline, and budget.",
  },
  {
    number: "03",
    title: "Implementation",
    description:
      "Our expert team executes the strategy with precision, keeping you informed throughout.",
  },
  {
    number: "04",
    title: "Optimize & Scale",
    description:
      "Continuous improvement based on data, scaling what works and refining what doesn&apos;t.",
  },
];

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    return constructMetadata({
      title: "Service Not Found",
    });
  }

  return constructMetadata({
    title: `${service.name} | ${service.headline}`,
    description: service.description,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  const serviceSchema = generateServiceSchema(
    service.name,
    service.description,
    `/services/${slug}`
  );

  const Icon = service.icon;

  return (
    <SmoothScrollProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
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
                href="/services"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Services
              </Link>
            </SectionReveal>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeInLeft>
                <div>
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
                    style={{ background: `${service.color}15` }}
                  >
                    <Icon className="w-10 h-10" style={{ color: service.color }} />
                  </div>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                    {service.name}
                  </h1>

                  <p className="text-2xl md:text-3xl font-medium mb-6" style={{ color: service.color }}>
                    {service.headline}
                  </p>

                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      onClick={() => trackCTAClick(`service_${slug}_cta`, "service_page")}
                      className="inline-flex items-center gap-3 px-8 py-4 font-semibold rounded-full transition-colors"
                      style={{
                        background: service.color,
                        color: "#0a0f0c",
                      }}
                    >
                      Get Started
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>

                    <div className="flex items-center gap-2 px-6 py-4">
                      <span className="text-sm text-muted-foreground">Starting from</span>
                      <span className="text-xl font-bold">{service.price}</span>
                    </div>
                  </div>
                </div>
              </FadeInLeft>

              <FadeInRight delay={0.2}>
                <div
                  className="rounded-3xl p-8 md:p-12"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}10 0%, transparent 100%)`,
                    border: `1px solid ${service.color}20`,
                  }}
                >
                  <h3 className="text-2xl font-bold mb-6">What&apos;s Included</h3>
                  <ul className="space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${service.color}20` }}
                        >
                          <Check className="w-4 h-4" style={{ color: service.color }} />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInRight>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <SectionReveal>
              <div className="text-center mb-16">
                <span
                  className="text-sm font-medium tracking-[0.2em] uppercase mb-4 block"
                  style={{ color: service.color }}
                >
                  Our Process
                </span>
                <h2 className="text-4xl md:text-5xl font-bold">
                  How We Deliver Results
                </h2>
              </div>
            </SectionReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <SectionReveal key={step.number} delay={index * 0.1}>
                  <div
                    className="relative p-6 rounded-2xl"
                    style={{
                      background: `${service.color}05`,
                      border: `1px solid ${service.color}15`,
                    }}
                  >
                    <span
                      className="text-4xl font-bold mb-4 block"
                      style={{ color: `${service.color}40` }}
                    >
                      {step.number}
                    </span>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
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
              <div
                className="rounded-3xl p-8 md:p-16 text-center"
                style={{
                  background: `linear-gradient(135deg, ${service.color}10 0%, transparent 100%)`,
                  border: `1px solid ${service.color}20`,
                }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to transform your business?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  Join 200+ companies that have scaled with our {service.name.toLowerCase()}{" "}
                  services.
                </p>
                <Link
                  href="/contact"
                  onClick={() => trackCTAClick(`service_${slug}_bottom_cta`, "service_page")}
                  className="inline-flex items-center gap-3 px-8 py-4 font-semibold rounded-full transition-transform hover:scale-105"
                  style={{
                    background: service.color,
                    color: "#0a0f0c",
                  }}
                >
                  Start Your Project
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </SectionReveal>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
