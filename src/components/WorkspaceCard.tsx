import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiStar, FiMapPin, FiHeart } from "react-icons/fi";
import { useEffect, useState } from "react";
import type { Workspace } from "@/data/workspaces";
import { getFavorites, toggleFavorite } from "@/lib/storage";

export default function WorkspaceCard({ w, index = 0 }: { w: Workspace; index?: number }) {
  const [fav, setFav] = useState(false);
  useEffect(() => setFav(getFavorites().includes(w.id)), [w.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group relative rounded-2xl overflow-hidden bg-card-gradient border border-border shadow-soft hover:shadow-glow transition-all"
    >
      <Link to="/workspace/$id" params={{ id: String(w.id) }}>
        <div className="aspect-[4/3] overflow-hidden">
          <img src={w.image} alt={w.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      </Link>
      <button
        onClick={(e) => { e.preventDefault(); const f = toggleFavorite(w.id); setFav(f.includes(w.id)); }}
        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${fav ? "bg-destructive text-destructive-foreground" : "bg-background/70 text-foreground hover:bg-background"}`}
        aria-label="Toggle favorite"
      >
        <FiHeart className={fav ? "fill-current" : ""} />
      </button>
      <div className="p-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span className="px-2 py-1 rounded-md bg-accent text-accent-foreground font-medium">{w.category}</span>
          <span className="flex items-center gap-1"><FiStar className="fill-current text-amber-500" /> {w.rating}</span>
        </div>
        <Link to="/workspace/$id" params={{ id: String(w.id) }}>
          <h3 className="font-display font-semibold text-lg leading-tight hover:text-primary transition">{w.name}</h3>
        </Link>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
          <FiMapPin className="text-xs" /> {w.city}
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold font-display">{w.price}</span>
            <span className="text-sm text-muted-foreground"> MAD / day</span>
          </div>
          <Link to="/workspace/$id" params={{ id: String(w.id) }} className="text-sm font-medium px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90">
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
