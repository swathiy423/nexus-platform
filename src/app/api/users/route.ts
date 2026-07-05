import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { z } from "zod";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") return null;
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, twoFactorEnabled: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ users });
}

const patchSchema = z.object({ userId: z.string(), role: z.enum(["ADMIN", "MEMBER", "VIEWER"]) });

export async function PATCH(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const parsed = patchSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const updated = await prisma.user.update({
    where: { id: parsed.data.userId },
    data: { role: parsed.data.role },
  });

  await logAudit({
    userId: (session.user as any).id,
    action: "user.role_changed",
    target: updated.id,
    metadata: { newRole: parsed.data.role },
  });

  return NextResponse.json({ user: updated });
}
