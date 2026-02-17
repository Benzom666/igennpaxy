"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { TiltCard } from "./tilt-card";
import { trackCTAClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export interface ServiceData {
  slug: string;
  name: string;
  headline: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  features: string[];
  price: string;
  popular?: boolean;
}

interface ServiceCardProps {
  service: ServiceData;
  index?: number;
  variant?: "default" | "compact";
}

export function ServiceCard({
  service,
  index = 0,
  variant = "default",
}: ServiceCardProps) {
  const handleClick = () => {
    trackCTAClick(`service_${service.slug}`, "services_grid");
  };

  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <TiltCard tiltAmount={5}>
        <Link
          href={`/services/${service.slug}`}
          onClick={handleClick}
          className={cn(
            "group block relative overflow-hidden rounded-2xl border transition-all duration-500",
            service.popular
              ? "bg-primary/5 border-primary/30"
              : "bg-card border-border hover:border-primary/30"
          )}
        >
          {/* Popular badge */}
          {service.popular && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
              Most Popular
            </div>
          )}

          <div className={cn("relative z-10", variant === "default" ? "p-8" : "p-6")}>
            {/* Icon */}
            <div
              className={cn(
                "rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110",
                variant === "default" ? "w-16 h-16" : "w-12 h-12"
              )}
              style={{ background: `${service.color}15` }}
            >
              <Icon
                className={cn(
                  "transition-colors",
                  variant === "default" ? "w-8 h-8" : "w-6 h-6"
                )}
                style={{ color: service.color }}
              />
            </div>

            {/* Content */}
            <h3
              className={cn(
                "font-bold mb-2 group-hover:text-primary transition-colors",
                variant === "default" ? "text-2xl" : "text-xl"
              )}
            >
              {service.name}
            </h3>

            <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
              {service.description}
            </p>

            {/* Features */}
            {variant === "default" && (
              <ul className="space-y-2 mb-6">
                {service.features.slice(0, 3).map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: service.color }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            {/* Price and CTA */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-muted-foreground">Starting from</span>
                <div className="text-xl font-bold" style={{ color: service.color }}>
                  {service.price}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="group-hover:text-primary transition-colors">
                  Learn More
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>

          {/* Hover gradient */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at 50% 0%, ${service.color}08, transparent 50%)`,
            }}
          />
        </Link>
      </TiltCard>
    </motion.div>
  );
}
