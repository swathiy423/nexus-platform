"use client";
import { useEffect, useRef } from "react";
import { unlockAchievement } from "./Achievements";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/** Classic Konami code → unlocks a hidden achievement with confetti. Drop this once near the root. */
export function EasterEgg() {
  const progress = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const expected = KONAMI[progress.current];
      if (e.key.toLowerCase() === expected.toLowerCase()) {
        progress.current += 1;
        if (progress.current === KONAMI.length) {
          progress.current = 0;
          unlockAchievement("konami", "Old-school");
        }
      } else {
        progress.current = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
