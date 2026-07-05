"use client";
import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Users, ShieldCheck, MessageSquare, Sun, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

/**
 * Global command palette — Ctrl/Cmd+K from anywhere in the app.
 * This is also the natural home for other keyboard shortcuts' documentation.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-start justify-center bg-black/60 pt-[15vh]" onClick={() => setOpen(false)}>
      <Command
        className="glass w-full max-w-lg rounded-xl2 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        label="Command palette"
      >
        <Command.Input
          autoFocus
          placeholder="Type a command or search…"
          className="w-full bg-transparent px-4 py-3 text-ink-100 placeholder:text-ink-500 outline-none border-b border-white/5"
        />
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-ink-500 text-sm">No results found.</Command.Empty>

          <Command.Group heading="Navigate" className="text-xs text-ink-500 px-2 py-1">
            <Item icon={<LayoutDashboard size={16} />} label="Go to Dashboard" onSelect={() => go("/dashboard")} />
            <Item icon={<Users size={16} />} label="Go to Admin · Users" onSelect={() => go("/admin")} />
            <Item icon={<MessageSquare size={16} />} label="Open AI Assistant" onSelect={() => go("/dashboard?panel=ai")} />
            <Item icon={<ShieldCheck size={16} />} label="Security settings" onSelect={() => go("/dashboard?panel=security")} />
          </Command.Group>

          <Command.Group heading="Actions" className="text-xs text-ink-500 px-2 py-1 mt-2">
            <Item
              icon={<Sun size={16} />}
              label="Toggle theme"
              onSelect={() => document.documentElement.classList.toggle("light")}
            />
            <Item icon={<LogOut size={16} />} label="Sign out" onSelect={() => signOut()} />
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}

function Item({ icon, label, onSelect }: { icon: React.ReactNode; label: string; onSelect: () => void }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-ink-300 aria-selected:bg-signal-violet/15 aria-selected:text-white cursor-pointer"
    >
      {icon}
      {label}
    </Command.Item>
  );
}
