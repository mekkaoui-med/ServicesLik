import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiSearch, FiArrowRight, FiCoffee, FiBookOpen, FiUsers, FiBriefcase, FiZap, FiBook, FiHome } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CATEGORIES, CITIES, WORKSPACES } from "@/data/workspaces";
import WorkspaceCard from "@/components/WorkspaceCard";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "ServicesLik — Find your perfect workspace" }] }),
  component: Home,
});

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Coworking Space": <FiUsers />,
  "Shared Office": <FiBriefcase />,
  "Startup Hub": <FiZap />,
  "Meeting Room": <FiHome />,
  "Library": <FiBook />,
  "Study Space": <FiBookOpen />,
  "Work-Friendly Café": <FiCoffee />,
};

function Home() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const featured = WORKSPACES.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_40%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 text-primary-foreground">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-medium border border-white/20">
              ✦ 200+ workspaces across Morocco
            </span>
            <h1 className="mt-6 text-5xl md:text-7xl font-display font-bold leading-[1.05]">
              Find the perfect place to <em className="not-italic text-white/95">work</em>, create and grow.
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl">
              Discover coworking spaces, shared offices, work-friendly cafés, startup hubs, libraries and meeting rooms — all in one place.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); navigate({ to: "/explore", search: { q } as any }); }}
              className="mt-10 flex items-center bg-background rounded-2xl p-2 shadow-glow max-w-xl"
            >
              <FiSearch className="mx-3 text-muted-foreground" />
              <input
                value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Search by city, name or category..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground py-2 outline-none"
              />
              <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 flex items-center gap-2">
                Search <FiArrowRight />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Cities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {CITIES.map((c, i) => (
            <Link key={c} to="/explore" search={{ city: c } as any}
              className="group rounded-2xl bg-card border border-border p-4 text-center shadow-soft hover:shadow-glow hover:border-primary transition">
              <div className="text-2xl">{["🏛️","🌊","🌴","⚓","🏖️","🕌"][i]}</div>
              <div className="mt-2 text-sm font-medium">{c}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold">Browse by category</h2>
            <p className="text-muted-foreground mt-2">Whatever your work style, we have a space for it.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {CATEGORIES.map((c) => (
            <Link key={c} to="/explore" search={{ category: c } as any}
              className="rounded-xl bg-card border border-border p-4 hover:border-primary hover:-translate-y-1 transition group">
              <div className="w-10 h-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition">
                {CATEGORY_ICONS[c]}
              </div>
              <div className="text-sm font-medium leading-tight">{c}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold">Featured workspaces</h2>
            <p className="text-muted-foreground mt-2">Hand-picked spaces our community loves.</p>
          </div>
          <Link to="/explore" className="text-sm font-medium text-primary hover:underline hidden md:flex items-center gap-1">
            View all <FiArrowRight />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((w, i) => <WorkspaceCard key={w.id} w={w} index={i} />)}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center">Loved by founders & freelancers</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { n: "Salma K.", r: "Founder, Pixel Studio", t: "Found my new HQ in Casablanca in 10 minutes. ServicesLik is a game-changer." },
            { n: "Karim B.", r: "Freelance Designer", t: "I work from a different café every week — this app makes it effortless." },
            { n: "Hassan M.", r: "Remote Engineer", t: "Beautifully designed and finally accurate info about workspaces in Morocco." },
          ].map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card-gradient p-6 shadow-soft">
              <p className="text-foreground/90">"{t.t}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-hero text-primary-foreground flex items-center justify-center font-bold">{t.n[0]}</div>
                <div>
                  <div className="font-semibold text-sm">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
