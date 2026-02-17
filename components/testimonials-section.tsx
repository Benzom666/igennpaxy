"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { TextReveal } from "./text-reveal";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "Igen & Paxy completely transformed our digital presence. The results exceeded every expectation we had. Our conversion rates tripled within months, and the brand recognition is unprecedented.",
    author: "Marcus Johnson",
    role: "CEO",
    company: "Nexus Finance",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    metric: "+420%",
    metricLabel: "Growth",
  },
  {
    quote:
      "Working with this team was an absolute game-changer. Their strategic approach and creative execution are unmatched in the industry. They don't just deliver projects - they deliver transformations.",
    author: "Sarah Chen",
    role: "CMO",
    company: "Pulse Health",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    metric: "2.5M",
    metricLabel: "Downloads",
  },
  {
    quote:
      "The attention to detail and commitment to excellence is remarkable. They understand that great marketing isn't about noise - it's about creating genuine connections that drive lasting results.",
    author: "David Park",
    role: "Founder",
    company: "Verde Sustainable",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    metric: "$12M",
    metricLabel: "Revenue",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const navigate = (dir: "prev" | "next") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir === "next" ? "right" : "left");
    setCurrent((prev) => {
      if (dir === "next") {
        return (prev + 1) % testimonials.length;
      }
      return (prev - 1 + testimonials.length) % testimonials.length;
    });
    setTimeout(() => setIsAnimating(false), 600);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      navigate("next");
    }, 7000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={ref}
      className="py-32 md:py-48 bg-secondary/20 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-border/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-border/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-border/5 pointer-events-none" />

      {/* Large quote icon */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02]">
        <Quote className="w-[400px] h-[400px] text-foreground" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 relative">
        {/* Header */}
        <div className={cn(
          "text-center mb-20 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-medium tracking-[0.3em] uppercase text-primary">
              Testimonials
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            <TextReveal>Client love stories</TextReveal>
          </h2>
        </div>

        {/* Testimonial */}
        <div
          className={cn(
            "relative transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          <div className="relative min-h-[400px] md:min-h-[350px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-all duration-600 text-center flex flex-col items-center justify-center",
                  current === index
                    ? "opacity-100 translate-x-0 scale-100"
                    : direction === "right"
                    ? "opacity-0 translate-x-12 scale-95 pointer-events-none"
                    : "opacity-0 -translate-x-12 scale-95 pointer-events-none"
                )}
              >
                {/* Rating */}
                <div className="flex gap-1 mb-8">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-2xl md:text-4xl font-medium leading-relaxed mb-12 text-balance max-w-4xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author & Metric */}
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/20">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-lg">{testimonial.author}</p>
                      <p className="text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>

                  {/* Metric */}
                  <div className="h-12 w-px bg-border hidden md:block" />
                  <div className="text-center md:text-left">
                    <p className="text-4xl font-bold text-gradient">{testimonial.metric}</p>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">{testimonial.metricLabel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-16">
            <button
              onClick={() => navigate("prev")}
              className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all group"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            </button>

            <div className="flex items-center gap-3 px-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? "right" : "left");
                    setCurrent(index);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-500",
                    current === index
                      ? "w-10 bg-primary"
                      : "w-2 bg-border hover:bg-muted-foreground"
                  )}
                />
              ))}
            </div>

            <button
              onClick={() => navigate("next")}
              className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all group"
            >
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
