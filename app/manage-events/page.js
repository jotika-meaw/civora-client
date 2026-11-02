"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { apiFetch, formatDate } from "@/lib/api";
import { TableSkeleton } from "@/components/skeletons";

export default function ManageEventsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.push("/login");
      return;
    }
    apiFetch("/api/my-events", { auth: true })
      .then((d) => setItems(d.items || []))
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, [isPending, session, router]);

  async function remove(id) {
    if (!confirm("Delete this event?")) return;
    try {
      await apiFetch(`/api/events/${id}`, { method: "DELETE", auth: true });
      setItems((prev) => prev.filter((e) => e._id !== id));
      toast.success("Event deleted");
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function saveEdit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await apiFetch(`/api/events/${editing._id}`, {
        method: "PATCH",
        auth: true,
        body: { title: editing.title, description: editing.description, location: editing.location },
      });
      setItems((prev) => prev.map((x) => (x._id === updated._id ? { ...x, ...updated } : x)));
      setEditing(null);
      toast.success("Event updated");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (isPending || loading) {
    return <div className="mx-auto max-w-5xl px-4 py-10"><TableSkeleton /></div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Manage Events</h1>
          <p className="mt-1 text-slate-500">Only events you organized. Edit or delete them here.</p>
        </div>
        <Link href="/create-event" className="rounded-full bg-[#3569E8] px-5 py-2 text-sm font-semibold text-white">+ New</Link>
      </div>

      {!items.length ? (
        <div className="mt-6 rounded-3xl border border-dashed p-10 text-center text-slate-500">
          You have not organized any events yet.
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {items.map((e) => (
            <div key={e._id} className="civora-card flex flex-col gap-3 rounded-3xl bg-white p-4 md:flex-row md:items-center dark:bg-[#111d42]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={e.image} alt={e.title} className="h-20 w-full rounded-2xl object-cover md:w-28" />
              <div className="flex-1">
                <p className="font-display font-bold">{e.title}</p>
                <p className="text-xs text-slate-500">{e.location} • {formatDate(e.eventDate)} • {e.participantCount ?? 0} joined • {e.category}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/events/${e._id}`} className="rounded-full border px-4 py-1.5 text-sm">View</Link>
                <button onClick={() => setEditing(e)} className="rounded-full border px-4 py-1.5 text-sm">Edit</button>
                <button onClick={() => remove(e._id)} className="rounded-full bg-red-50 px-4 py-1.5 text-sm text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <form onSubmit={saveEdit} className="w-full max-w-lg space-y-3 rounded-3xl bg-white p-6 dark:bg-[#111d42]">
            <h2 className="font-display text-xl font-bold">Edit event</h2>
            <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full rounded-2xl border px-4 py-2 text-sm" />
            <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={4} className="w-full rounded-2xl border px-4 py-2 text-sm" />
            <input value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className="w-full rounded-2xl border px-4 py-2 text-sm" />
            <div className="flex gap-2">
              <button disabled={saving} className="flex-1 rounded-full bg-[#3569E8] py-2 text-sm font-semibold text-white">{saving ? "Saving..." : "Save"}</button>
              <button type="button" onClick={() => setEditing(null)} className="rounded-full border px-5 py-2 text-sm">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
