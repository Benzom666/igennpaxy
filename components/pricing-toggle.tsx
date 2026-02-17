"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PricingToggleProps {
  options: { value: string; label: string }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function PricingToggle({
  options,
  defaultValue,
  onChange,
  className,
}: PricingToggleProps) {
  const [selected, setSelected] = useState(defaultValue || options[0]?.value);

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 p-1 bg-secondary rounded-full",
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleSelect(option.value)}
          className={cn(
            "relative px-6 py-2 text-sm font-medium rounded-full transition-colors duration-300",
            selected === option.value
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {selected === option.value && (
            <motion.div
              layoutId="pricing-toggle"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            />
          )}
          <span className="relative z-10">{option.label}</span>
        </button>
      ))}
    </div>
  );
}

// Pre-built monthly/yearly toggle for pricing pages
interface MonthlyYearlyToggleProps {
  onChange?: (isYearly: boolean) => void;
  className?: string;
  yearlyDiscount?: string;
}

export function MonthlyYearlyToggle({
  onChange,
  className,
  yearlyDiscount = "Save 20%",
}: MonthlyYearlyToggleProps) {
  const [isYearly, setIsYearly] = useState(false);

  const handleToggle = (value: string) => {
    const yearly = value === "yearly";
    setIsYearly(yearly);
    onChange?.(yearly);
  };

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <PricingToggle
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly" },
        ]}
        defaultValue="monthly"
        onChange={handleToggle}
      />
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: isYearly ? 1 : 0, x: isYearly ? 0 : -10 }}
        className="text-sm text-primary font-medium"
      >
        {yearlyDiscount}
      </motion.span>
    </div>
  );
}
