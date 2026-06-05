import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { z } from "zod";
import SearchBar from "@/components/SearchBar";
import WorkspaceCard from "@/components/WorkspaceCard";
import { CATEGORIES, CITIES, WORKSPACES } from "@/data/workspaces";

const searchSchema = z.object({
  q: z.string().optional(),
  city: z.string().optional(),
  category: z.string().optional(),
});

export const Route = createFileRoute("/explore")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Explore workspaces — ServicesLik" }] }),
  component: Explore,
});

function Explore() {
  const initial = Route.useSearch();
  const [q, setQ] = useState(initial.q || "");
  const [city, setCity] = useState(initial.city || "");
  const [category, setCategory] = useState(initial.category || "");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  useEffect(() => { setQ(initial.q || ""); setCity(initial.city || ""); setCategory(initial.category || ""); }, [initial.q, initial.city, initial.category]);

  const filtered = useMemo(() => WORKSPACES.filter((w) =>
    (!q || w.name.toLowerCase().includes(q.toLowerCase())) &&
    (!city || w.city === city) &&
    (!category || w.category === category) &&
    w.rating >= minRating &&
    w.price <= maxPrice
  ), [q, city, category, minRating, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-display font-bold">Explore workspaces</h1>
      <p className="text-muted-foreground mt-2">{filtered.length} spaces matching your filters.</p>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8 mt-8">
        <aside className="space-y-6 lg:sticky lg:top-20 h-fit">
          <SearchBar value={q} onChange={setQ} />
          <Filter label="City" value={city} options={["", ...CITIES]} onChange={setCity} />
          <Filter label="Category" value={category} options={["", ...CATEGORIES]} onChange={setCategory} />
          <div>
            <label className="text-sm font-medium">Max price: {maxPrice} MAD</label>
            <input type="range" min={50} max={500} step={10} value={maxPrice}
              onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-primary mt-2" />
          </div>
          <div>
            <label className="text-sm font-medium">Min rating: {minRating}</label>
            <input type="range" min={0} max={5} step={0.5} value={minRating}
              onChange={(e) => setMinRating(+e.target.value)} className="w-full accent-primary mt-2" />
          </div>
          <button onClick={() => { setQ(""); setCity(""); setCategory(""); setMinRating(0); setMaxPrice(500); }}
            className="w-full py-2 rounded-lg border border-border hover:bg-secondary text-sm">Reset filters</button>
        </aside>
        <div>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No workspaces match your filters.</div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((w, i) => <WorkspaceCard key={w.id} w={w} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Filter({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-sm font-medium block mb-1.5">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-border bg-card focus:border-primary focus:outline-none">
        {options.map((o) => <option key={o} value={o}>{o || `All ${label.toLowerCase()}`}</option>)}
      </select>
    </div>
  );
}
