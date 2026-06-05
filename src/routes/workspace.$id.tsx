import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiStar, FiMapPin, FiHeart, FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import { WORKSPACES } from "@/data/workspaces";
import { addBooking, getFavorites, toggleFavorite } from "@/lib/storage";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/workspace/$id")({
  head: ({ params }) => {
    const w = WORKSPACES.find((x) => x.id === Number(params.id));
    return { meta: [{ title: w ? `${w.name} — ServicesLik` : "Workspace — ServicesLik" }] };
  },
  component: WorkspaceDetails,
});

function WorkspaceDetails() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const w = WORKSPACES.find((x) => x.id === Number(id));
  const [fav, setFav] = useState(getFavorites().includes(Number(id)));
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [booked, setBooked] = useState(false);

  if (!w) return <div className="p-12 text-center">Workspace not found.</div>;

  const book = () => {
    if (!isAuthenticated) { navigate({ to: "/login" }); return; }
    addBooking(w.id, date);
    setBooked(true);
    setTimeout(() => setBooked(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/explore" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><FiArrowLeft /> Back to explore</Link>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={w.gallery[0]} alt={w.name}
          className="md:col-span-2 w-full h-[400px] object-cover rounded-2xl" />
        <div className="grid grid-rows-2 gap-4">
          <img src={w.gallery[1]} alt="" className="w-full h-full object-cover rounded-2xl" />
          <img src={w.gallery[2]} alt="" className="w-full h-full object-cover rounded-2xl" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 mt-10">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-3 text-sm">
              <span className="px-2 py-1 rounded-md bg-accent text-accent-foreground font-medium">{w.category}</span>
              <span className="flex items-center gap-1 text-amber-500"><FiStar className="fill-current" /> {w.rating}</span>
              <span className="flex items-center gap-1 text-muted-foreground"><FiMapPin /> {w.address}</span>
            </div>
            <h1 className="mt-3 text-4xl font-display font-bold">{w.name}</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">{w.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Amenities</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {w.amenities.map((a) => (
                <div key={a} className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card">
                  <FiCheckCircle className="text-primary" /> {a}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Reviews</h3>
            <div className="space-y-4">
              {w.reviews.map((r, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-card">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{r.user}</div>
                    <div className="flex items-center gap-1 text-amber-500 text-sm"><FiStar className="fill-current" /> {r.rating}</div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 h-fit p-6 rounded-2xl border border-border bg-card-gradient shadow-soft">
          <div className="flex items-baseline justify-between">
            <div><span className="text-3xl font-bold font-display">{w.price}</span><span className="text-muted-foreground"> MAD/day</span></div>
            <button onClick={() => { const f = toggleFavorite(w.id); setFav(f.includes(w.id)); }}
              className={`p-2 rounded-lg ${fav ? "bg-destructive text-destructive-foreground" : "bg-secondary"}`}>
              <FiHeart className={fav ? "fill-current" : ""} />
            </button>
          </div>
          <label className="block text-sm font-medium mt-6">Select date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="mt-1.5 w-full px-3 py-2 rounded-lg border border-border bg-card focus:border-primary focus:outline-none" />
          <button onClick={book} className="mt-4 w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 shadow-soft">
            Book Now
          </button>
          {booked && <div className="mt-3 p-3 rounded-lg bg-primary/10 text-primary text-sm text-center">Booking confirmed!</div>}
          <p className="mt-3 text-xs text-muted-foreground text-center">You won't be charged — this is a demo booking.</p>
        </aside>
      </div>
    </div>
  );
}
