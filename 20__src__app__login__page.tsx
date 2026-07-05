"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totp, setTotp] = useState("");
  const [needsTotp, setNeedsTotp] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", { email, password, totp, redirect: false });
    setLoading(false);
    if (res?.error) {
      setNeedsTotp(true);
      toast.error("Check your credentials — or 2FA code if enabled.");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-mesh-glow bg-base-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass w-full max-w-sm rounded-xl2 p-8"
      >
        <h1 className="font-display text-xl font-bold text-white">Sign in to Nexus</h1>
        <p className="mb-6 text-sm text-ink-500">Your AI operations console.</p>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="mb-1 block text-xs text-ink-500">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus-ring w-full rounded-lg bg-base-700 px-3 py-2 text-sm text-ink-100"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-xs text-ink-500">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus-ring w-full rounded-lg bg-base-700 px-3 py-2 text-sm text-ink-100"
            />
          </div>
          {needsTotp && (
            <div>
              <label htmlFor="totp" className="mb-1 block text-xs text-ink-500">2FA code</label>
              <input
                id="totp"
                inputMode="numeric"
                value={totp}
                onChange={(e) => setTotp(e.target.value)}
                className="focus-ring w-full rounded-lg bg-base-700 px-3 py-2 text-sm text-ink-100"
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="focus-ring w-full rounded-lg bg-signal-violet py-2 text-sm font-medium text-white shadow-glow disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-2 text-xs text-ink-700">
          <div className="h-px flex-1 bg-white/5" /> or <div className="h-px flex-1 bg-white/5" />
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="focus-ring w-full rounded-lg border border-white/10 py-2 text-sm text-ink-300 hover:bg-white/5"
        >
          Continue with Google
        </button>
      </motion.div>
    </div>
  );
}
