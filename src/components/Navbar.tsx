import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FiMoon, FiSun, FiMenu, FiX, FiLogOut, FiUser, FiHeart, FiCalendar } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
    activeProps={{ className: "text-foreground" }}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
          <span className="w-8 h-8 rounded-lg bg-hero shadow-glow flex items-center justify-center text-primary-foreground">S</span>
          <span>Services<span className="text-gradient">Lik</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/bookings">Bookings</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggle} className="p-2 rounded-lg hover:bg-secondary transition" aria-label="Toggle theme">
            {dark ? <FiSun /> : <FiMoon />}
          </button>
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-secondary text-sm">
                <span className="w-7 h-7 rounded-full bg-hero text-primary-foreground flex items-center justify-center text-xs font-bold">
                  {user?.name?.[0]}
                </span>
                {user?.name}
              </Link>
              <button onClick={() => { logout(); navigate({ to: "/" }); }} className="p-2 rounded-lg hover:bg-secondary" aria-label="Logout">
                <FiLogOut />
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 shadow-soft">
              Sign in
            </Link>
          )}
          <button className="md:hidden p-2" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-3" onClick={() => setOpen(false)}>
              <Link to="/" className="py-1">Home</Link>
              <Link to="/explore" className="py-1">Explore</Link>
              <Link to="/favorites" className="py-1 flex items-center gap-2"><FiHeart /> Favorites</Link>
              <Link to="/bookings" className="py-1 flex items-center gap-2"><FiCalendar /> Bookings</Link>
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="py-1 flex items-center gap-2"><FiUser /> Profile</Link>
                  <button onClick={() => { logout(); navigate({ to: "/" }); }} className="text-left py-1 flex items-center gap-2"><FiLogOut /> Logout</button>
                </>
              ) : (
                <Link to="/login" className="py-2 px-4 rounded-lg bg-primary text-primary-foreground text-center">Sign in</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
