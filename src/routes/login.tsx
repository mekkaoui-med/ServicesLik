import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — ServicesLik" }] }),
  component: Login,
});

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@serviceslik.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = login(email, password);
    if (r.ok) navigate({ to: "/" });
    else setError(r.error || "Login failed");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] grid md:grid-cols-2">
      <div className="relative hidden md:block overflow-hidden">
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_50%)]" />
        <div className="relative h-full flex flex-col justify-between p-12 text-primary-foreground">
          <Link to="/" className="font-display font-bold text-xl">Services<span className="text-white">Lik</span></Link>
          <div>
            <h2 className="text-4xl font-display font-bold leading-tight">Your next great workspace is one click away.</h2>
            <p className="mt-4 text-white/80">Join thousands of creators discovering inspiring places to work across Morocco.</p>
          </div>
          <div className="text-sm text-white/60">© {new Date().getFullYear()} ServicesLik</div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <h1 className="text-3xl font-display font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Sign in to continue to ServicesLik.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="mt-1.5 relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-border bg-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="mt-1.5 relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-border bg-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</div>}
            <button type="submit" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 flex items-center justify-center gap-2 shadow-soft">
              Sign in <FiArrowRight />
            </button>
            <button type="button" className="w-full py-2.5 rounded-lg border border-border bg-card font-medium hover:bg-secondary flex items-center justify-center gap-2">
              <FcGoogle className="text-xl" /> Continue with Google
            </button>
          </form>

          <div className="mt-6 p-3 rounded-lg bg-accent/40 text-xs text-accent-foreground">
            <strong>Demo:</strong> demo@serviceslik.com / 123456
          </div>
        </motion.div>
      </div>
    </div>
  );
}
