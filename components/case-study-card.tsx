"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Users, DollarSign, Award } from "lucide-react";
import Link from "next/link";
import { TiltCard } from "./tilt-card";
import { trackCTAClick } from "@/lib/analytics";

const caseStudies = [
  {
    id: "nova-fashion",
    client: "Nova Fashion",
    industry: "E-commerce",
    metric: "580%",
    metricLabel: "Revenue Increase",
    description:
      "Full-funnel overhaul for a DTC fashion brand, reducing CAC by 77% and increasing conversion rate 4x.",
    image: "/images/case-study-1.jpg",
    icon: TrendingUp,
    color: "#1aff80",
  },
  {
    id: "flowstate",
    client: "FlowState",
    industry: "SaaS",
    metric: "4x",
    metricLabel: "Demo Bookings",
    description:
      "Product-led growth strategy for B2B project management tool, achieving 40% churn reduction.",
    image: "/images/case-study-2.jpg",
    icon: Users,
    color: "#00d4ff",
  },
  {
    id: "metro-fitness",
    client: "Metro Fitness",
    industry: "Local Business",
    metric: "320%",
    metricLabel: "Lead Increase",
    description:
      "Local SEO and paid acquisition for gym chain expansion, resulting in 12 new locations.",
    image: "/images/case-study-3.jpg",
    icon: DollarSign,
    color: "#ff6b35",
  },
];

export function CaseStudyPreview() {
  const handleClick = (client: string) => {
    trackCTAClick(`case_study_${client}`, "home_preview");
  };

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary">
                Case Studies
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold"
            >
              Real Results,<br />
              <span className="text-gradient">Real Revenue</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/case-studies"
              onClick={() => trackCTAClick("view_all_case_studies", "home_preview")}
              className="group inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              View All Case Studies
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Case study cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TiltCard tiltAmount={5}>
                <Link
                  href={`/case-studies/${study.id}`}
                  onClick={() => handleClick(study.id)}
                  className="group block relative overflow-hidden rounded-2xl bg-card border border-border p-6 h-full"
                >
                  {/* Background gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${study.color}10 0%, transparent 50%)`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
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

                    {/* Metric */}
                    <div className="mb-4">
                      <div
                        className="text-5xl font-bold mb-1"
                        style={{ color: study.color }}
                      >
                        {study.metric}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {study.metricLabel}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {study.client}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      {study.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm font-medium"
                    >
                      <span className="group-hover:text-primary transition-colors">
                        Read Case Study
                      </span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
