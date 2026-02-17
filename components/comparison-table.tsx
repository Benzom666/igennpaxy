"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonFeature {
  name: string;
  us: boolean | string;
  others: boolean | string;
}

interface ComparisonTableProps {
  features: ComparisonFeature[];
  ourName?: string;
  othersName?: string;
  className?: string;
}

export function ComparisonTable({
  features,
  ourName = "IGEN & PAXY",
  othersName = "Other Agencies",
  className,
}: ComparisonTableProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-4 font-medium text-muted-foreground">
              Feature
            </th>
            <th className="text-center py-4 px-4 font-bold text-primary">
              {ourName}
            </th>
            <th className="text-center py-4 px-4 font-medium text-muted-foreground">
              {othersName}
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <motion.tr
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
            >
              <td className="py-4 px-4 font-medium">{feature.name}</td>
              <td className="py-4 px-4 text-center">
                {typeof feature.us === "boolean" ? (
                  feature.us ? (
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )
                ) : (
                  <span className="text-primary font-semibold">{feature.us}</span>
                )}
              </td>
              <td className="py-4 px-4 text-center">
                {typeof feature.others === "boolean" ? (
                  feature.others ? (
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                      <Check className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-destructive/20">
                      <X className="w-4 h-4 text-destructive" />
                    </div>
                  )
                ) : (
                  <span className="text-muted-foreground">{feature.others}</span>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Pre-built comparison for the "Us vs Others" section
export function UsVsOthersComparison({ className }: { className?: string }) {
  const features: ComparisonFeature[] = [
    { name: "Revenue-Focused Strategy", us: true, others: false },
    { name: "Dedicated Growth Team", us: true, others: false },
    { name: "Weekly Strategy Calls", us: true, others: false },
    { name: "Real-Time Analytics Dashboard", us: true, others: false },
    { name: "Conversion Rate Optimization", us: true, others: false },
    { name: "Average Response Time", us: "<2 hours", others: "24-48 hours" },
    { name: "Client Retention Rate", us: "98%", others: "60-70%" },
    { name: "Results Guarantee", us: true, others: false },
    { name: "Custom Tech Solutions", us: true, others: false },
    { name: "Transparent Pricing", us: true, others: false },
  ];

  return (
    <div className={cn("py-8", className)}>
      <ComparisonTable features={features} />
    </div>
  );
}
