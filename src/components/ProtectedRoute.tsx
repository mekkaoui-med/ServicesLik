import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (typeof window !== "undefined" && !isAuthenticated && localStorage.getItem("isAuthenticated") !== "true") {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
