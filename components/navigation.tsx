"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MagneticButton } from "./magnetic-button";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

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
            ? "bg-background/80 backdrop-blur-2xl border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 lg:px-24 py-5">
          {/* Logo */}
          <Link href="/" className="relative group flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-primary rounded-lg rotate-45 transition-transform duration-500 group-hover:rotate-[225deg]" />
              <span className="absolute inset-0 flex items-center justify-center text-primary-foreground font-bold text-lg">
                I
              </span>
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:block">
              IGEN<span className="text-primary">&</span>PAXY
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium tracking-wide transition-colors group flex items-center gap-2",
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="text-[10px] text-primary/50 font-mono">{link.number}</span>
                <span className="relative">
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-primary transition-all duration-500",
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/contact" onClick={handleCTAClick}>
              <MagneticButton className="group relative px-6 py-3 rounded-full font-medium text-sm overflow-hidden border border-border hover:border-primary transition-colors duration-500">
                <span className="relative z-10 flex items-center gap-2 text-foreground group-hover:text-primary-foreground transition-colors duration-500">
                  Start Project
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <div className="absolute inset-0 bg-primary scale-0 group-hover:scale-100 transition-transform duration-500 origin-center rounded-full" />
              </MagneticButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-50 w-12 h-12 flex items-center justify-center rounded-full border border-border hover:border-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-5 h-4">
              <span
                className={cn(
                  "absolute left-0 w-full h-0.5 bg-foreground transition-all duration-300",
                  isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-foreground transition-all duration-300",
                  isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 w-full h-0.5 bg-foreground transition-all duration-300",
                  isMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                )}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Full-screen Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background transition-all duration-700 lg:hidden",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div
            className={cn(
              "absolute top-0 left-0 w-full h-full bg-primary/10 transition-transform duration-1000",
              isMenuOpen ? "translate-y-0" : "-translate-y-full"
            )}
          />
        </div>

        <div className="relative flex flex-col justify-center items-center h-full px-6">
          <nav className="flex flex-col items-center gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative group transition-all duration-700",
                  isMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                )}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 100 + 200}ms` : "0ms",
                }}
              >
                <span
                  className={cn(
                    "text-6xl md:text-8xl font-bold tracking-tight transition-colors",
                    isActive(link.href) ? "text-primary" : "hover:text-primary"
                  )}
                >
                  {link.label}
                </span>
                <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-xs font-mono text-primary/50">
                  {link.number}
                </span>
              </Link>
            ))}
          </nav>

          <div
            className={cn(
              "mt-16 transition-all duration-700",
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
            style={{ transitionDelay: isMenuOpen ? "600ms" : "0ms" }}
          >
            <Link href="/contact" onClick={handleCTAClick}>
              <MagneticButton className="px-10 py-5 bg-primary text-primary-foreground rounded-full font-semibold text-lg">
                Start a Project
              </MagneticButton>
            </Link>
          </div>

          {/* Contact info in menu */}
          <div
            className={cn(
              "absolute bottom-12 left-6 right-6 flex justify-between text-sm text-muted-foreground transition-all duration-700",
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
            style={{ transitionDelay: isMenuOpen ? "700ms" : "0ms" }}
          >
            <span>hello@igenpaxy.com</span>
            <span>San Francisco, CA</span>
          </div>
        </div>
      </div>
    </>
  );
}
