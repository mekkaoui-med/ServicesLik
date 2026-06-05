import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FiCalendar, FiTrash2, FiMapPin } from "react-icons/fi";
import ProtectedRoute from "@/components/ProtectedRoute";
import { WORKSPACES } from "@/data/workspaces";
import { getBookings, removeBooking, type Booking } from "@/lib/storage";

export const Route = createFileRoute("/bookings")({
  head: () => ({ meta: [{ title: "Bookings — ServicesLik" }] }),
  component: () => <ProtectedRoute><Bookings /></ProtectedRoute>,
});

function Bookings() {
  const [list, setList] = useState<Booking[]>([]);
  useEffect(() => setList(getBookings()), []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-display font-bold flex items-center gap-3"><FiCalendar className="text-primary" /> Your bookings</h1>
      <p className="text-muted-foreground mt-2">{list.length} booking{list.length !== 1 && "s"}.</p>

      {list.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">No bookings yet.</p>
          <Link to="/explore" className="mt-4 inline-flex px-4 py-2 rounded-lg bg-primary text-primary-foreground">Find a workspace</Link>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {list.map((b) => {
            const w = WORKSPACES.find((x) => x.id === b.workspaceId);
            if (!w) return null;
            return (
              <div key={b.id} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card shadow-soft">
                <img src={w.image} alt={w.name} className="w-24 h-24 object-cover rounded-xl" />
                <div className="flex-1 min-w-0">
                  <Link to="/workspace/$id" params={{ id: String(w.id) }} className="font-display font-semibold hover:text-primary">{w.name}</Link>
                  <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><FiMapPin /> {w.city} · {w.category}</div>
                  <div className="text-sm mt-1">📅 {new Date(b.date).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold font-display">{w.price} MAD</div>
                  <button onClick={() => setList(removeBooking(b.id))} className="mt-2 p-2 rounded-lg hover:bg-destructive/10 text-destructive">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
