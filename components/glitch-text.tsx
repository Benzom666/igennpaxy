"use client";

import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: string;
  className?: string;
}

export function GlitchText({ children, className }: GlitchTextProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute top-0 left-0 -z-10 text-primary/80 animate-glitch-1"
        aria-hidden="true"
      >
        {children}
      </span>
      <span
        className="absolute top-0 left-0 -z-10 text-accent/80 animate-glitch-2"
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}
