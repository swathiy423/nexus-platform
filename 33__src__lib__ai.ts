import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "./prisma";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/**
 * AI Model Router — one call site that can route to whichever provider/model
 * is configured. Only Claude is wired up for real here; the others are
 * documented seams so you can drop in OpenAI/Gemini/DeepSeek SDK calls later
 * without touching call sites.
 */
export async function routeCompletion(opts: {
  provider?: "claude" | "openai" | "gemini" | "deepseek";
  system: string;
  messages: { role: "user" | "assistant"; content: string }[];
}) {
  const provider = opts.provider ?? "claude";

  if (provider === "claude") {
    const res = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: opts.system,
      messages: opts.messages,
    });
    const text = res.content.map((b) => (b.type === "text" ? b.text : "")).join("\n");
    return { text, provider: "claude" as const };
  }

  throw new Error(`Provider "${provider}" is not wired up yet — add its SDK call here.`);
}

// --- Naive embedding + cosine similarity RAG (swap for pgvector/pinecone at scale) ---

function hashEmbed(text: string, dims = 256): number[] {
  // Deterministic lightweight embedding stand-in so RAG works with zero external
  // dependencies out of the box. Replace with a real embeddings API in production.
  const vec = new Array(dims).fill(0);
  for (let i = 0; i < text.length; i++) {
    vec[text.charCodeAt(i) % dims] += 1;
  }
  const norm = Math.sqrt(vec.reduce((s, v) => s + v * v, 0)) || 1;
  return vec.map((v) => v / norm);
}

function cosineSim(a: number[], b: number[]) {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot;
}

export async function indexDocument(sourceId: string, content: string) {
  const chunks = content.match(/(.|[\r\n]){1,800}/g) ?? [content];
  await prisma.$transaction(
    chunks.map((chunk) =>
      prisma.knowledgeChunk.create({
        data: { sourceId, content: chunk, embedding: hashEmbed(chunk) },
      })
    )
  );
  return chunks.length;
}

export async function retrieveContext(query: string, topK = 4) {
  const queryVec = hashEmbed(query);
  const all = await prisma.knowledgeChunk.findMany({ take: 500 });
  const scored = all
    .map((c) => ({ chunk: c, score: cosineSim(queryVec, c.embedding as number[]) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
  return scored.map((s) => s.chunk.content);
}

// --- Long-term memory ---

export async function recallMemories(userId: string, limit = 10) {
  return prisma.aiMemory.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: limit });
}

export async function saveMemory(userId: string, content: string, kind: "episodic" | "fact" | "preference" = "episodic") {
  return prisma.aiMemory.create({ data: { userId, content, kind } });
}
