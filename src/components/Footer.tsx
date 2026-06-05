import { Link } from "@tanstack/react-router";
import { FiTwitter, FiInstagram, FiLinkedin, FiGithub } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="w-8 h-8 rounded-lg bg-hero text-primary-foreground flex items-center justify-center">S</span>
            Services<span className="text-gradient">Lik</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Find the perfect place to work, create and grow — anywhere in Morocco.</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/explore">All workspaces</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            <li><Link to="/bookings">Bookings</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>About</li><li>Careers</li><li>Press</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Follow</h4>
          <div className="flex gap-3 text-muted-foreground">
            <FiTwitter className="hover:text-foreground cursor-pointer" />
            <FiInstagram className="hover:text-foreground cursor-pointer" />
            <FiLinkedin className="hover:text-foreground cursor-pointer" />
            <FiGithub className="hover:text-foreground cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ServicesLik. All rights reserved.
      </div>
    </footer>
  );
}
