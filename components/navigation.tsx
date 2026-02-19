"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MagneticButton } from "./magnetic-button";
import { ArrowUpRight } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services", href: "/services", number: "01" },
  { label: "Case Studies", href: "/case-studies", number: "02" },
  { label: "About", href: "/about", number: "03" },
  { label: "Learn More", href: "/learn-more", number: "04" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleCTAClick = () => {
    trackCTAClick("nav_start_project", "navigation");
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          isScrolled || isMenuOpen
            ? "bg-[#0a0a0b]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]"
            : "bg-transparent"
        )}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-5">
          {/* Logo - Luxury Style */}
          <Link href="/" className="relative group flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-[#c9a962] rounded-sm rotate-45 transition-all duration-700 group-hover:rotate-[225deg] group-hover:scale-90" />
              <span className="absolute inset-0 flex items-center justify-center text-[#0a0a0b] font-[family-name:var(--font-playfair)] font-bold text-lg">
                I
              </span>
            </div>
            <span className="font-[family-name:var(--font-playfair)] text-lg font-medium tracking-tight hidden sm:block text-[#faf8f5]">
              IGEN<span className="text-[#c9a962]">&</span>PAXY
            </span>
          </Link>

          {/* Desktop Nav - Luxury Minimal */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 group flex items-center gap-3",
                  isActive(link.href)
                    ? "text-[#c9a962]"
                    : "text-[#a8a5a0] hover:text-[#faf8f5]"
                )}
              >
                <span className="text-[10px] text-[#6b6863] font-[family-name:var(--font-mono)]">{link.number}</span>
                <span className="relative">
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-[#c9a962] transition-all duration-500",
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </span>
              </Link>
            ))}
          </div>

          {/* CTA Button - Luxury Style */}
          <div className="hidden lg:block">
            <Link href="/contact" onClick={handleCTAClick}>
              <MagneticButton className="group relative px-7 py-3 rounded-lg font-medium text-xs tracking-wide overflow-hidden border border-[rgba(201,169,98,0.3)] hover:border-[#c9a962] transition-all duration-500">
                <span className="relative z-10 flex items-center gap-2 text-[#faf8f5] group-hover:text-[#0a0a0b] transition-colors duration-500">
                  Start Project
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <div className="absolute inset-0 bg-[#c9a962] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-lg" />
              </MagneticButton>
            </Link>
          </div>

          {/* Mobile Menu Button - Luxury */}
          <button
            className="lg:hidden relative z-50 w-12 h-12 flex items-center justify-center rounded-lg border border-[rgba(255,255,255,0.1)] hover:border-[rgba(201,169,98,0.4)] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-4">
              <span
                className={cn(
                  "absolute left-0 w-full h-px bg-[#c9a962] transition-all duration-500",
                  isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-[#c9a962] transition-all duration-500",
                  isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 w-full h-px bg-[#c9a962] transition-all duration-500",
                  isMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                )}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Full-screen Mobile Menu - Luxury */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-[#0a0a0b] lg:hidden"
          >
            {/* Animated background gradient */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[rgba(201,169,98,0.05)] blur-[150px]" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[rgba(107,45,60,0.08)] blur-[120px]" />
            </motion.div>

            <div className="relative flex flex-col justify-center items-center h-full px-6">
              <nav className="flex flex-col items-center gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "relative group flex items-center gap-4",
                        isActive(link.href) ? "text-[#c9a962]" : "text-[#faf8f5]"
                      )}
                    >
                      <span className="text-[10px] text-[#6b6863] font-[family-name:var(--font-mono)]">
                        {link.number}
                      </span>
                      <span className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-medium tracking-tight transition-colors hover:text-[#c9a962]">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-16"
              >
                <Link href="/contact" onClick={handleCTAClick}>
                  <MagneticButton className="px-10 py-5 bg-[#c9a962] text-[#0a0a0b] rounded-lg font-medium text-sm tracking-wide hover:shadow-[0_0_40px_rgba(201,169,98,0.3)] transition-shadow">
                    Start a Project
                  </MagneticButton>
                </Link>
              </motion.div>

              {/* Contact info in menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute bottom-12 left-6 right-6 flex justify-between text-xs tracking-[0.1em] uppercase text-[#6b6863]"
              >
                <span>hello@igenpaxy.com</span>
                <span>San Francisco, CA</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
