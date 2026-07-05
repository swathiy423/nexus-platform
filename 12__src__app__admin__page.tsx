import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { RoleSelect } from "@/components/dashboard/RoleSelect";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") redirect("/dashboard?denied=1");

  const [users, logs] = await Promise.all([
    prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, twoFactorEnabled: true }, orderBy: { createdAt: "desc" } }),
    prisma.auditLog.findMany({ take: 20, orderBy: { createdAt: "desc" }, include: { user: { select: { email: true } } } }),
  ]);

  return (
    <DashboardShell>
      <h1 className="mb-8 font-display text-2xl font-bold text-white">Admin</h1>

      <section className="glass mb-8 rounded-xl2 p-5">
        <h2 className="mb-4 font-display font-semibold text-white">Team members</h2>
        <table className="w-full text-left text-sm">
          <thead className="text-ink-500">
            <tr>
              <th className="pb-2 font-normal">Name</th>
              <th className="pb-2 font-normal">Email</th>
              <th className="pb-2 font-normal">2FA</th>
              <th className="pb-2 font-normal">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-white/5">
                <td className="py-2 text-ink-100">{u.name ?? "—"}</td>
                <td className="py-2 text-ink-300">{u.email}</td>
                <td className="py-2 text-ink-300">{u.twoFactorEnabled ? "Enabled" : "—"}</td>
                <td className="py-2"><RoleSelect userId={u.id} currentRole={u.role} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="glass rounded-xl2 p-5">
        <h2 className="mb-4 font-display font-semibold text-white">Recent audit events</h2>
        <ul className="space-y-2 text-sm">
          {logs.map((l) => (
            <li key={l.id} className="flex justify-between border-b border-white/5 pb-2 text-ink-300">
              <span>
                <span className="text-ink-100">{l.action}</span> · {l.user?.email ?? "system"}
              </span>
              <span className="text-ink-500">{new Date(l.createdAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </section>
    </DashboardShell>
  );
}
