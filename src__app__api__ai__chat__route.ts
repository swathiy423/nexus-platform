import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { routeCompletion, retrieveContext, recallMemories, saveMemory } from "@/lib/ai";
import { checkRateLimit } from "@/lib/ratelimit";
import { logAudit } from "@/lib/audit";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const bodySchema = z.object({
  threadId: z.string().min(1),
  message: z.string().min(1).max(4000),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id ?? session.user.email!;
  const { success } = await checkRateLimit(`ai-chat:${userId}`);
  if (!success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  const parsed = bodySchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const { threadId, message } = parsed.data;

  // RAG: pull relevant knowledge chunks
  const context = await retrieveContext(message);

  // Long-term memory: pull recent memories about this user
  const memories = await recallMemories(userId);

  const system = [
    "You are Nexus, an AI assistant embedded in a product dashboard.",
    context.length ? `Relevant knowledge base context:\n${context.join("\n---\n")}` : "",
    memories.length ? `Known long-term facts about this user:\n${memories.map((m) => `- ${m.content}`).join("\n")}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  await prisma.chatMessage.create({ data: { userId, threadId, role: "user", content: message } });

  const { text } = await routeCompletion({
    system,
    messages: [{ role: "user", content: message }],
  });

  await prisma.chatMessage.create({ data: { userId, threadId, role: "assistant", content: text } });

  // Naive long-term memory write: remember user statements that look like preferences/facts.
  if (/\b(i (like|prefer|am|work|use)|my name is)\b/i.test(message)) {
    await saveMemory(userId, message, "preference");
  }

  await logAudit({ userId, action: "ai.chat", metadata: { threadId } });

  return NextResponse.json({ reply: text });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id ?? session.user.email!;
  const threadId = req.nextUrl.searchParams.get("threadId") ?? "default";

  const messages = await prisma.chatMessage.findMany({
    where: { userId, threadId },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json({ messages });
}
