"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

export function ChatPanel() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi — I'm the Nexus assistant. I can pull from your knowledge base and remember context across sessions. What do you need?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId: "default", message: userMsg.content }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply ?? data.error ?? "Something went wrong." }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Connection error — please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass flex h-[520px] flex-col rounded-xl2 overflow-hidden">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "assistant" && (
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal-violet/20 text-signal-violet">
                  <Bot size={14} />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-xl2 px-4 py-2 text-sm leading-relaxed ${
                  m.role === "user" ? "bg-signal-violet text-white" : "bg-base-700 text-ink-100"
                }`}
              >
                {m.content}
              </div>
              {m.role === "user" && (
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-ink-300">
                  <User size={14} />
                </div>
              )}
            </motion.div>
          ))}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-ink-500 text-sm pl-10">
              <span className="h-2 w-2 animate-pulse-ring rounded-full bg-signal-cyan" /> thinking…
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-2 border-t border-white/5 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask Nexus anything…"
          aria-label="Message the AI assistant"
          className="focus-ring flex-1 rounded-lg bg-base-700 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500"
        />
        <button
          onClick={send}
          disabled={loading}
          aria-label="Send message"
          className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg bg-signal-violet text-white disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
