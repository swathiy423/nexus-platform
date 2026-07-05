import Link from "next/link";
import { HeroCanvas } from "@/components/layout/HeroCanvas";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-base-950">
      <HeroCanvas />
      <section className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 rounded-full border border-white/10 px-3 py-1 text-xs text-ink-500">
          AI-native operations console
        </span>
        <h1 className="font-display text-5xl font-bold leading-tight text-white md:text-6xl">
          Run your team's work<br /> through one live console.
        </h1>
        <p className="mt-6 max-w-xl text-ink-300">
          Dashboards, an AI assistant with real memory, and role-based access —
          wired together instead of bolted on.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/login" className="focus-ring rounded-lg bg-signal-violet px-6 py-3 text-sm font-medium text-white shadow-glow">
            Get started
          </Link>
          <button
            onClick={undefined}
            className="focus-ring rounded-lg border border-white/10 px-6 py-3 text-sm text-ink-300"
          >
            <kbd className="font-mono text-xs">⌘K</kbd> to explore
          </button>
        </div>
      </section>
    </div>
  );
}
