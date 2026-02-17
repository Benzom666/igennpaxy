"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface CalendlyEmbedProps {
  url?: string;
  className?: string;
  height?: string;
  prefill?: {
    name?: string;
    email?: string;
  };
}

export function CalendlyEmbed({
  url = "https://calendly.com/igenpaxy/strategy-call",
  className,
  height = "700px",
  prefill,
}: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if Calendly is loaded
    const checkCalendly = () => {
      if (window.Calendly) {
        setIsLoaded(true);
      }
    };

    checkCalendly();
    // Retry after a short delay
    const timeout = setTimeout(checkCalendly, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isLoaded && containerRef.current && window.Calendly) {
      window.Calendly.initInlineWidget({
        url: url,
        parentElement: containerRef.current,
        prefill: prefill || {},
      });
    }
  }, [isLoaded, url, prefill]);

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => setIsLoaded(true)}
      />
      <div
        ref={containerRef}
        className={className}
        style={{ minHeight: height }}
      >
        {!isLoaded && (
          <div className="flex items-center justify-center h-full min-h-[500px] bg-secondary rounded-2xl">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading calendar...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Calendly popup button
interface CalendlyButtonProps {
  url?: string;
  children: React.ReactNode;
  className?: string;
  prefill?: {
    name?: string;
    email?: string;
  };
}

export function CalendlyButton({
  url = "https://calendly.com/igenpaxy/strategy-call",
  children,
  className,
  prefill,
}: CalendlyButtonProps) {
  const handleClick = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url,
        prefill: prefill || {},
      });
    }
  };

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <button onClick={handleClick} className={className}>
        {children}
      </button>
    </>
  );
}

// Type declarations for Calendly
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (config: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, string>;
      }) => void;
      initPopupWidget: (config: {
        url: string;
        prefill?: Record<string, string>;
      }) => void;
    };
  }
}
