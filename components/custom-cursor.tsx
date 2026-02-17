"use client";

import { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      requestAnimationFrame(animate);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.dataset.cursor) {
        setIsHovering(true);
        setCursorText(target.dataset.cursor);
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText("");
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor]"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out mix-blend-difference hidden md:flex items-center justify-center ${
          isHovering ? "w-24 h-24" : "w-10 h-10"
        } ${isClicking ? "scale-75" : "scale-100"}`}
      >
        <div
          className={`rounded-full bg-white transition-all duration-300 ${
            isHovering ? "w-full h-full" : "w-full h-full"
          }`}
        />
        {cursorText && (
          <span className="absolute text-black text-xs font-bold uppercase tracking-wider">
            {cursorText}
          </span>
        )}
      </div>
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      />
    </>
  );
}
