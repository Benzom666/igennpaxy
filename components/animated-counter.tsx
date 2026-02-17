"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  label?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
  label,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest)
  );

  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, springValue, value]);

  useEffect(() => {
    const unsubscribe = displayValue.on("change", (latest) => {
      setCurrentValue(latest);
    });
    return unsubscribe;
  }, [displayValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={cn("text-center", className)}
    >
      <div className={cn("text-4xl md:text-5xl lg:text-6xl font-bold text-gradient")}>
        {prefix}
        {currentValue.toLocaleString()}
        {suffix}
      </div>
      {label && (
        <p className="text-muted-foreground mt-2">{label}</p>
      )}
    </motion.div>
  );
}

// Stats grid component
interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface AnimatedStatsProps {
  stats: Stat[];
  className?: string;
}

export function AnimatedStats({ stats, className }: AnimatedStatsProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-8", className)}>
      {stats.map((stat, index) => (
        <AnimatedCounter
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          prefix={stat.prefix}
          label={stat.label}
          className="group"
          // Stagger animation
        />
      ))}
    </div>
  );
}
