import { DashboardShell } from "@/components/layout/DashboardShell";
import { StatGrid } from "@/components/dashboard/StatGrid";
import { ChatPanel } from "@/components/ai/ChatPanel";

export default function DashboardPage({ searchParams }: { searchParams: { panel?: string } }) {
  const showAi = searchParams.panel === "ai";

  return (
    <DashboardShell>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Overview</h1>
          <p className="text-sm text-ink-500">Real-time snapshot of your workspace.</p>
        </div>
      </header>

      {showAi ? <ChatPanel /> : <StatGrid />}
    </DashboardShell>
  );
}
