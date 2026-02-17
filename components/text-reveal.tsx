"use client";

import React from "react"

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  children,
  className,
  delay = 0,
  as: Component = "span",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = children.split(" ");

  return (
    <Component ref={ref as React.RefObject<HTMLHeadingElement>} className={cn("overflow-hidden", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span
            className={cn(
              "inline-block transition-transform duration-700 ease-out",
              isVisible ? "translate-y-0" : "translate-y-full"
            )}
            style={{
              transitionDelay: `${delay + i * 50}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}

interface CharRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function CharReveal({ children, className, delay = 0 }: CharRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const chars = children.split("");

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {chars.map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span
            className={cn(
              "inline-block transition-all duration-500 ease-out",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            )}
            style={{
              transitionDelay: `${delay + i * 30}ms`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}
