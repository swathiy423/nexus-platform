"use client";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ArrowUpRight, Users, Zap, ShieldAlert } from "lucide-react";

const usageData = [
  { d: "Mon", v: 240 }, { d: "Tue", v: 310 }, { d: "Wed", v: 280 },
  { d: "Thu", v: 420 }, { d: "Fri", v: 390 }, { d: "Sat", v: 200 }, { d: "Sun", v: 260 },
];

const STATS = [
  { label: "Active users", value: "2,481", delta: "+12.4%", icon: Users },
  { label: "AI requests today", value: "9,204", delta: "+31.2%", icon: Zap },
  { label: "Security events", value: "3", delta: "-2", icon: ShieldAlert },
];

export function StatGrid() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl2 p-5"
          >
            <div className="flex items-center justify-between text-ink-500">
              <span className="text-xs uppercase tracking-wide">{s.label}</span>
              <s.icon size={16} />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-white">{s.value}</span>
              <span className="flex items-center gap-0.5 text-xs text-signal-cyan">
                <ArrowUpRight size={12} /> {s.delta}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass rounded-xl2 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display font-semibold text-white">AI usage — last 7 days</h3>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={usageData}>
            <defs>
              <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C5CFF" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#7C5CFF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="d" stroke="#565D75" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#11151F", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8 }} />
            <Area type="monotone" dataKey="v" stroke="#7C5CFF" fill="url(#usageGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
