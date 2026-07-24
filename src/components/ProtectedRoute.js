"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children, roles = [] }) {
  const { user, loading, isAuthenticated, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (!loading && isAuthenticated && roles.length > 0 && !hasRole(roles)) {
      router.push("/dashboard");
    }
  }, [loading, isAuthenticated, roles, hasRole, router]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="text-center">
          <div
            className="spinner-border"
            role="status"
            style={{ width: "3rem", height: "3rem", color: "#3B82F6" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-secondary fw-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (roles.length > 0 && !hasRole(roles)) {
    return null;
  }

  return children;
}
