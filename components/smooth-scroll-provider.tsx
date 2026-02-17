"use client";

import { useEffect, useRef, ReactNode } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);

  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    const updateScroll = () => {
      targetRef.current = window.scrollY;
      currentRef.current += (targetRef.current - currentRef.current) * 0.08;
      scroll.style.transform = `translateY(${-currentRef.current}px)`;
      requestAnimationFrame(updateScroll);
    };

    const setBodyHeight = () => {
      document.body.style.height = `${scroll.scrollHeight}px`;
    };

    setBodyHeight();
    window.addEventListener("resize", setBodyHeight);
    requestAnimationFrame(updateScroll);

    return () => {
      window.removeEventListener("resize", setBodyHeight);
      document.body.style.height = "";
    };
  }, []);

  return (
    <div ref={scrollRef} className="fixed top-0 left-0 w-full will-change-transform">
      {children}
    </div>
  );
}
