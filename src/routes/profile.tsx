import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FiEdit2, FiCheck, FiHeart, FiCalendar } from "react-icons/fi";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { WORKSPACES } from "@/data/workspaces";
import { getBookings, getFavorites } from "@/lib/storage";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — ServicesLik" }] }),
  component: () => <ProtectedRoute><Profile /></ProtectedRoute>,
});

function Profile() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [favIds, setFavIds] = useState<number[]>([]);
  const [bookings, setBookings] = useState<ReturnType<typeof getBookings>>([]);

  useEffect(() => { setFavIds(getFavorites()); setBookings(getBookings()); }, []);
  useEffect(() => { if (user) { setName(user.name); setEmail(user.email); } }, [user]);

  const save = () => { updateUser({ name, email }); setEditing(false); };

  const favs = WORKSPACES.filter((w) => favIds.includes(w.id)).slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-3xl bg-hero p-8 text-primary-foreground shadow-glow">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur border-4 border-white/30 flex items-center justify-center text-3xl font-bold">
            {user?.name?.[0]}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-display font-bold">{user?.name}</h1>
            <p className="text-white/80">{user?.email}</p>
          </div>
          <button onClick={() => setEditing((e) => !e)} className="px-4 py-2 rounded-lg bg-white/15 backdrop-blur hover:bg-white/25 flex items-center gap-2 text-sm">
            <FiEdit2 /> {editing ? "Cancel" : "Edit profile"}
          </button>
        </div>
      </div>

      {editing && (
        <div className="mt-6 p-6 rounded-2xl border border-border bg-card grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 w-full px-3 py-2 rounded-lg border border-border bg-card focus:border-primary focus:outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full px-3 py-2 rounded-lg border border-border bg-card focus:border-primary focus:outline-none" />
          </div>
          <button onClick={save} className="sm:col-span-2 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2"><FiCheck /> Save changes</button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="p-6 rounded-2xl border border-border bg-card">
          <h3 className="font-display font-semibold flex items-center gap-2"><FiHeart className="text-primary" /> Favorite workspaces</h3>
          {favs.length === 0 ? (
            <p className="text-sm text-muted-foreground mt-3">No favorites yet.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {favs.map((w) => (
                <li key={w.id}>
                  <Link to="/workspace/$id" params={{ id: String(w.id) }} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary">
                    <img src={w.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <div className="font-medium text-sm">{w.name}</div>
                      <div className="text-xs text-muted-foreground">{w.city}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link to="/favorites" className="mt-4 inline-block text-sm text-primary hover:underline">View all favorites →</Link>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card">
          <h3 className="font-display font-semibold flex items-center gap-2"><FiCalendar className="text-primary" /> Booking history</h3>
          {bookings.length === 0 ? (
            <p className="text-sm text-muted-foreground mt-3">No bookings yet.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {bookings.slice(0, 4).map((b) => {
                const w = WORKSPACES.find((x) => x.id === b.workspaceId);
                if (!w) return null;
                return (
                  <li key={b.id} className="flex items-center gap-3 p-2 rounded-lg">
                    <img src={w.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <div className="font-medium text-sm">{w.name}</div>
                      <div className="text-xs text-muted-foreground">{new Date(b.date).toLocaleDateString()}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <Link to="/bookings" className="mt-4 inline-block text-sm text-primary hover:underline">View all bookings →</Link>
        </div>
      </div>
    </div>
  );
}
