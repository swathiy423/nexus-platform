import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-base-950 bg-mesh-glow px-6 text-center">
      <span className="font-mono text-sm text-signal-cyan">404 / signal lost</span>
      <h1 className="mt-3 font-display text-4xl font-bold text-white">This route doesn't exist in Nexus.</h1>
      <p className="mt-3 max-w-md text-ink-500">
        The page may have moved, or the link is stale. Try the command palette — <kbd className="font-mono">⌘K</kbd> — or head back to the dashboard.
      </p>
      <Link href="/dashboard" className="focus-ring mt-8 rounded-lg bg-signal-violet px-6 py-3 text-sm font-medium text-white shadow-glow">
        Back to dashboard
      </Link>
    </div>
  );
}
