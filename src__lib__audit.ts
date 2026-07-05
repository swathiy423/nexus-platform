import { prisma } from "./prisma";

export async function logAudit(entry: {
  userId?: string;
  action: string;
  target?: string;
  metadata?: Record<string, unknown>;
  ip?: string;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: entry.userId,
        action: entry.action,
        target: entry.target,
        metadata: entry.metadata as any,
        ip: entry.ip,
      },
    });
  } catch (err) {
    // Audit logging must never crash the calling request.
    console.error("audit log failed", err);
  }
}
