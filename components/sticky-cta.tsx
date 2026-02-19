"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { trackCTAClick } from "@/lib/analytics";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approximately 100vh)
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    trackCTAClick("sticky_cta_start_project", "sticky_header");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0b]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-[#c9a962] rounded-sm rotate-45" />
                <span className="absolute inset-0 flex items-center justify-center text-[#0a0a0b] font-[family-name:var(--font-playfair)] font-bold text-sm">
                  I
                </span>
              </div>
              <span className="font-[family-name:var(--font-playfair)] text-lg font-medium tracking-tight hidden sm:block text-[#faf8f5]">
                IGEN<span className="text-[#c9a962]">&</span>PAXY
              </span>
            </Link>

            <div className="flex items-center gap-6">
              <span className="text-sm text-[#a8a5a0] hidden md:block">
                Ready to elevate your brand?
              </span>
              <Link
                href="/contact"
                onClick={handleClick}
                className="group inline-flex items-center gap-2 px-6 py-2.5 bg-[#c9a962] text-[#0a0a0b] font-medium rounded-lg text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,169,98,0.3)]"
              >
                Start Project
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
