"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function UpgradedHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (!headlineRef.current || !subheadRef.current) return;

    // Split text into characters for animation
    const headline = new SplitType(headlineRef.current, { types: "chars" });
    const subhead = new SplitType(subheadRef.current, { types: "words" });

    // GSAP animation for headline - elegant reveal
    gsap.fromTo(
      headline.chars,
      {
        y: 80,
        opacity: 0,
        rotateX: -45,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.4,
        stagger: 0.03,
        ease: "power3.out",
        delay: 0.5,
      }
    );

    // GSAP animation for subhead
    gsap.fromTo(
      subhead.words,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.04,
        ease: "power2.out",
        delay: 1.2,
      }
    );

    return () => {
      headline.revert();
      subhead.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0b]"
    >
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gold gradient orb - subtle luxury */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(201,169,98,0.15) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Burgundy accent */}
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(107,45,60,0.3) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(201,169,98,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(201,169,98,0.3) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center"
        style={{ y, opacity }}
      >
        {/* Luxury Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-10"
          style={{
            background: "rgba(201, 169, 98, 0.08)",
            border: "1px solid rgba(201, 169, 98, 0.15)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a962] animate-pulse" />
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#c9a962]">
            Digital Excellence
          </span>
        </motion.div>

        {/* Main Headline - Luxury Typography */}
        <h1
          ref={headlineRef}
          className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium leading-[0.95] tracking-[-0.02em] mb-8 perspective-1000"
        >
          <span className="block text-[#faf8f5]">We Craft</span>
          <span className="block text-gradient-gold mt-2">Digital</span>
          <span className="block text-[#faf8f5] mt-2">Luxury</span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-[#a8a5a0] mb-14 leading-relaxed font-[family-name:var(--font-inter)]"
        >
          Award-winning digital marketing agency transforming premium brands through 
          innovative strategies, data-driven campaigns, and uncompromising excellence.
        </p>

        {/* CTA Buttons - Luxury Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-[#c9a962] text-[#0a0a0b] font-medium text-sm tracking-wide rounded-lg overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,169,98,0.3)] hover:-translate-y-0.5"
            data-cursor-text="Let's Go"
          >
            <span className="relative z-10">Start Your Project</span>
            <svg
              className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-[#e8d5a3] to-[#c9a962] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>

          <a
            href="#work"
            className="group inline-flex items-center gap-3 px-10 py-5 text-[#faf8f5] font-medium text-sm tracking-wide rounded-lg border border-[rgba(201,169,98,0.25)] transition-all duration-500 hover:border-[#c9a962] hover:bg-[rgba(201,169,98,0.05)] hover:-translate-y-0.5"
          >
            <span>View Our Work</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </a>
        </motion.div>

        {/* Stats Row - Premium Display */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-24 pt-12 border-t border-[rgba(255,255,255,0.06)]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "$50M+", label: "Revenue Generated" },
              { value: "200+", label: "Premium Clients" },
              { value: "98%", label: "Retention Rate" },
              { value: "15+", label: "Industry Awards" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + i * 0.1 }}
                className="text-center group cursor-default"
              >
                <div className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl text-gradient-gold mb-2 transition-transform duration-500 group-hover:scale-105">
                  {stat.value}
                </div>
                <div className="text-xs tracking-[0.15em] uppercase text-[#6b6863]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - Minimal Luxury */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#6b6863]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#c9a962] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
