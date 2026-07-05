"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, MessageSquare, ShieldCheck, Command } from "lucide-react";
import { useEffect } from "react";
import { EasterEgg } from "@/components/ui/EasterEgg";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, shortcut: "g d" },
  { href: "/dashboard?panel=ai", label: "AI Assistant", icon: MessageSquare, shortcut: "g a" },
  { href: "/admin", label: "Admin", icon: Users, shortcut: "g u" },
  { href: "/dashboard?panel=security", label: "Security", icon: ShieldCheck, shortcut: "g s" },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // "g then <letter>" style shortcuts, the GitHub/Linear convention.
  useEffect(() => {
    let awaitingSecond = false;
    const map: Record<string, string> = { d: "/dashboard", a: "/dashboard?panel=ai", u: "/admin", s: "/dashboard?panel=security" };
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && ["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "g") {
        awaitingSecond = true;
        setTimeout(() => (awaitingSecond = false), 800);
        return;
      }
      if (awaitingSecond && map[e.key]) {
        router.push(map[e.key]);
        awaitingSecond = false;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <div className="min-h-screen bg-mesh-glow flex">
      <EasterEgg />
      <aside className="hidden md:flex w-64 flex-col gap-1 p-4 border-r border-white/5 glass">
        <div className="px-2 py-3 font-display font-bold text-lg tracking-tight text-white">Nexus</div>
        {NAV.map(({ href, label, icon: Icon, shortcut }) => (
          <Link
            key={href}
            href={href}
            className={`focus-ring flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
              pathname === href.split("?")[0] ? "bg-signal-violet/15 text-white" : "text-ink-300 hover:bg-white/5"
            }`}
          >
            <span className="flex items-center gap-3">
              <Icon size={16} /> {label}
            </span>
            <kbd className="text-[10px] text-ink-500 font-mono">{shortcut}</kbd>
          </Link>
        ))}
        <button
          onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
          className="focus-ring mt-auto flex items-center gap-2 rounded-lg border border-white/5 px-3 py-2 text-xs text-ink-500 hover:text-ink-300"
        >
          <Command size={14} /> ⌘K to search
        </button>
      </aside>
      <div className="flex-1 p-6 md:p-10">{children}</div>
    </div>
  );
}
