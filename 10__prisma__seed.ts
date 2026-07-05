import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@nexus.dev" },
    update: {},
    create: { email: "admin@nexus.dev", name: "Admin", passwordHash, role: "ADMIN" },
  });
  console.log("Seeded admin user:", admin.email, "(password: ChangeMe123!) — change this immediately.");
}

main().finally(() => prisma.$disconnect());
