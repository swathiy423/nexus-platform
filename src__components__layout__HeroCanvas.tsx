"use client";
import { useEffect, useRef } from "react";

/**
 * Signature visual: a slow field of connected nodes (a "neural mesh") drifting
 * behind the hero copy. Deliberately calm — this is ambient atmosphere, not a
 * demo of what canvas can do.
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const NODE_COUNT = Math.min(60, Math.floor((width * height) / 25000));

    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }));

    function resize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);

    let raf: number;
    function draw() {
      ctx!.clearRect(0, 0, width, height);
      for (const n of nodes) {
        if (!reduceMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx!.strokeStyle = `rgba(124,92,255,${0.12 * (1 - dist / 140)})`;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
        ctx!.fillStyle = "rgba(0,229,199,0.5)";
        ctx!.beginPath();
        ctx!.arc(nodes[i].x, nodes[i].y, 1.5, 0, Math.PI * 2);
        ctx!.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 opacity-70" aria-hidden />;
}
