"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Users, DollarSign } from "lucide-react";
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
    icon: TrendingUp,
  },
  {
    id: "flowstate",
    client: "FlowState",
    industry: "SaaS",
    metric: "4x",
    metricLabel: "Demo Bookings",
    description:
      "Product-led growth strategy for B2B project management tool, achieving 40% churn reduction.",
    icon: Users,
  },
  {
    id: "metro-fitness",
    client: "Metro Fitness",
    industry: "Local Business",
    metric: "320%",
    metricLabel: "Lead Increase",
    description:
      "Local SEO and paid acquisition for gym chain expansion, resulting in 12 new locations.",
    icon: DollarSign,
  },
];

export function CaseStudyPreview() {
  const handleClick = (client: string) => {
    trackCTAClick(`case_study_${client}`, "home_preview");
  };

  return (
    <section className="py-32 relative bg-[#0a0a0b]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-px w-12 bg-[#c9a962]" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#c9a962]">
                Case Studies
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-medium text-[#faf8f5]"
            >
              Real Results,{" "}
              <span className="text-gradient-gold">Real Revenue</span>
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
              className="group inline-flex items-center gap-3 text-[#c9a962] font-medium text-sm tracking-wide hover:gap-4 transition-all duration-300"
            >
              View All Case Studies
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
              transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard tiltAmount={4}>
                <Link
                  href={`/case-studies/${study.id}`}
                  onClick={() => handleClick(study.id)}
                  className="group block relative overflow-hidden rounded-xl p-8 h-full transition-all duration-500"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  {/* Hover gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: "linear-gradient(135deg, rgba(201, 169, 98, 0.05) 0%, transparent 50%)",
                    }}
                  />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                        style={{ 
                          background: "rgba(201, 169, 98, 0.08)",
                          border: "1px solid rgba(201, 169, 98, 0.15)",
                        }}
                      >
                        <study.icon className="w-6 h-6 text-[#c9a962]" />
                      </div>
                      <span className="text-xs tracking-[0.1em] uppercase text-[#6b6863]">
                        {study.industry}
                      </span>
                    </div>

                    {/* Metric */}
                    <div className="mb-6">
                      <div className="font-[family-name:var(--font-playfair)] text-5xl lg:text-6xl font-medium text-gradient-gold mb-2">
                        {study.metric}
                      </div>
                      <div className="text-xs tracking-[0.15em] uppercase text-[#6b6863]">
                        {study.metricLabel}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-[#faf8f5] mb-3 group-hover:text-gradient-gold transition-all duration-500">
                      {study.client}
                    </h3>
                    <p className="text-sm text-[#a8a5a0] leading-relaxed mb-8">
                      {study.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-xs font-medium tracking-[0.1em] uppercase text-[#c9a962]"
                    >
                      <span className="transition-all duration-300">
                        Read Case Study
                      </span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
