"use client";
import confetti from "canvas-confetti";
import { toast } from "sonner";

/** Fires confetti + a toast, and persists the unlock via the API (idempotent on the server). */
export async function unlockAchievement(key: string, label: string) {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.7 },
    colors: ["#7C5CFF", "#00E5C7", "#FF6B4A"],
  });
  toast.success(`Achievement unlocked: ${label}`);
  try {
    await fetch("/api/users/achievements", { method: "POST", body: JSON.stringify({ key }) });
  } catch {
    // Non-critical — the celebration already happened client-side.
  }
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} aria-hidden />;
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading dashboard">
      <Skeleton className="h-8 w-56" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
      <Skeleton className="h-64" />
    </div>
  );
}
