import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Falls back to a permissive no-op if Upstash env vars aren't set, so local
// dev works without extra setup — swap in real credentials for production.
const hasRedis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = hasRedis
  ? new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! })
  : undefined;

const limiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(60, "1 m"), analytics: true, prefix: "nexus:ratelimit" })
  : undefined;

export async function checkRateLimit(identifier: string) {
  if (!limiter) return { success: true, remaining: 9999 };
  const result = await limiter.limit(identifier);
  return { success: result.success, remaining: result.remaining };
}
