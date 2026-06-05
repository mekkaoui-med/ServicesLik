import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type User = { name: string; email: string; role: string; avatar?: string };

type AuthCtx = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  updateUser: (u: Partial<User>) => void;
};

const Ctx = createContext<AuthCtx | null>(null);

const DEMO = { email: "demo@serviceslik.com", password: "123456" };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("isAuthenticated") === "true") {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    }
  }, []);

  const login = (email: string, password: string) => {
    if (email === DEMO.email && password === DEMO.password) {
      const u: User = { name: "Mohamed", email, role: "user" };
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(u));
      setUser(u);
      return { ok: true };
    }
    return { ok: false, error: "Invalid credentials. Try demo@serviceslik.com / 123456" };
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUser = (u: Partial<User>) => {
    setUser((prev) => {
      const next = { ...(prev as User), ...u };
      localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
  };

  return (
    <Ctx.Provider value={{ user, isAuthenticated: !!user, login, logout, updateUser }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
};
