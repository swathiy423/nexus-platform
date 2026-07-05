"use client";
import { useState } from "react";
import { toast } from "sonner";

export function RoleSelect({ userId, currentRole }: { userId: string; currentRole: string }) {
  const [role, setRole] = useState(currentRole);
  const [saving, setSaving] = useState(false);

  async function update(newRole: string) {
    setSaving(true);
    setRole(newRole);
    const res = await fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role: newRole }),
    });
    setSaving(false);
    if (res.ok) toast.success(`Role updated to ${newRole}`);
    else toast.error("Couldn't update role");
  }

  return (
    <select
      value={role}
      disabled={saving}
      onChange={(e) => update(e.target.value)}
      className="focus-ring rounded-lg bg-base-700 px-2 py-1 text-xs text-ink-100"
    >
      <option value="ADMIN">Admin</option>
      <option value="MEMBER">Member</option>
      <option value="VIEWER">Viewer</option>
    </select>
  );
}
