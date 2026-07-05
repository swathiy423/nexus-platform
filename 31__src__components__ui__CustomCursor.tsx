"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Signature interaction element: a two-part cursor (a tight dot + a lazy
 * trailing ring). The ring eases toward the dot, and both scale up over
 * links/buttons — signals "this console is alive" without shouting about it.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return; // touch devices keep native cursor

    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setHidden(false);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
      const target = e.target as HTMLElement;
      setIsPointer(!!target.closest("a, button, [role='button'], input, textarea"));
    };

    let raf: number;
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      raf = requestAnimationFrame(animateRing);
    };
    animateRing();

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-0 z-[200] ${hidden ? "opacity-0" : "opacity-100"} hidden md:block`} aria-hidden>
      <div
        ref={dotRef}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-signal-cyan transition-transform duration-100"
      />
      <div
        ref={ringRef}
        className={`absolute rounded-full border transition-all duration-200 ${
          isPointer ? "-ml-5 -mt-5 h-10 w-10 border-signal-violet bg-signal-violet/10" : "-ml-3 -mt-3 h-6 w-6 border-white/30"
        }`}
      />
    </div>
  );
}
