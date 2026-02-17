"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  className?: string;
  variant?: "default" | "compact";
}

function FAQItemComponent({
  item,
  isOpen,
  onToggle,
  variant,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  variant: "default" | "compact";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "border-b border-border",
        variant === "compact" && "last:border-b-0"
      )}
    >
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between text-left transition-colors",
          variant === "default" ? "py-6" : "py-4"
        )}
      >
        <span
          className={cn(
            "font-semibold pr-4",
            variant === "default" ? "text-lg" : "text-base",
            isOpen && "text-primary"
          )}
        >
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex-shrink-0 rounded-full flex items-center justify-center",
            variant === "default"
              ? "w-10 h-10 bg-secondary"
              : "w-8 h-8 bg-primary/10"
          )}
        >
          {variant === "default" ? (
            <ChevronDown className="w-5 h-5" />
          ) : isOpen ? (
            <Minus className="w-4 h-4 text-primary" />
          ) : (
            <Plus className="w-4 h-4 text-primary" />
          )}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              className={cn(
                "text-muted-foreground",
                variant === "default"
                  ? "pb-6 text-base"
                  : "pb-4 text-sm"
              )}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection({
  items,
  className,
  variant = "default",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("divide-y divide-border", className)}>
      {items.map((item, index) => (
        <FAQItemComponent
          key={index}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
          variant={variant}
        />
      ))}
    </div>
  );
}

// Pre-built FAQ data for common questions
export const commonFAQs: FAQItem[] = [
  {
    question: "What makes IGEN & PAXY different from other agencies?",
    answer:
      "We focus exclusively on revenue-generating outcomes, not vanity metrics. Every strategy we implement is measured against its impact on your bottom line. Our 98% client retention rate and $50M+ in revenue generated speak for themselves.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Most clients see initial improvements within 30-60 days. However, significant transformations typically take 3-6 months depending on your starting point and goals. We set realistic expectations upfront and provide monthly progress reports.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We work across multiple industries including e-commerce, SaaS, professional services, and consumer brands. Our methodologies are adaptable, but our focus is always on businesses ready to scale aggressively.",
  },
  {
    question: "Do you require long-term contracts?",
    answer:
      "We offer both project-based and retainer arrangements. While we recommend minimum 6-month engagements for optimal results, we don&apos;t lock clients into lengthy contracts. Our work speaks for itself.",
  },
  {
    question: "How do you measure success?",
    answer:
      "We establish clear KPIs at the start of every engagement—typically revenue growth, customer acquisition cost, conversion rates, and ROI. You&apos;ll have access to real-time dashboards showing exactly how we&apos;re performing.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "Our fees are based on the scope of work and projected value we deliver. We offer performance-based arrangements where appropriate. Most projects start at $10,000/month for comprehensive growth programs.",
  },
  {
    question: "Do you work with startups or only established businesses?",
    answer:
      "We work with growth-stage companies that have product-market fit and are ready to scale. Whether you&apos;re a startup with funding or an established business, we look for partners committed to aggressive growth.",
  },
  {
    question: "What does your onboarding process look like?",
    answer:
      "Our onboarding includes a comprehensive audit of your current digital presence, competitor analysis, and strategy development. This typically takes 2-3 weeks, after which we move into execution.",
  },
  {
    question: "Can you work with our existing team?",
    answer:
      "Absolutely. We often complement internal teams, providing specialized expertise in areas like CRO, paid acquisition, or technical development. We integrate seamlessly with your existing workflows.",
  },
  {
    question: "How do we get started?",
    answer:
      "Simply fill out our contact form or book a strategy call. We&apos;ll discuss your goals, challenges, and determine if we&apos;re the right fit. If so, we&apos;ll provide a detailed proposal within 48 hours.",
  },
];
