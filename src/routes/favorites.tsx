import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import ProtectedRoute from "@/components/ProtectedRoute";
import WorkspaceCard from "@/components/WorkspaceCard";
import { WORKSPACES } from "@/data/workspaces";
import { getFavorites } from "@/lib/storage";

export const Route = createFileRoute("/favorites")({
  head: () => ({ meta: [{ title: "Favorites — ServicesLik" }] }),
  component: () => <ProtectedRoute><Favorites /></ProtectedRoute>,
});

function Favorites() {
  const [ids, setIds] = useState<number[]>([]);
  useEffect(() => setIds(getFavorites()), []);
  const items = WORKSPACES.filter((w) => ids.includes(w.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-display font-bold flex items-center gap-3"><FiHeart className="text-primary" /> Your favorites</h1>
      <p className="text-muted-foreground mt-2">{items.length} saved workspace{items.length !== 1 && "s"}.</p>

      {items.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">No favorites yet.</p>
          <Link to="/explore" className="mt-4 inline-flex px-4 py-2 rounded-lg bg-primary text-primary-foreground">Browse workspaces</Link>
        </div>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((w, i) => <WorkspaceCard key={w.id} w={w} index={i} />)}
        </div>
      )}
    </div>
  );
}
