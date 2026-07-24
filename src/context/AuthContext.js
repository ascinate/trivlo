"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { auth as authApi, getToken, setToken, removeToken } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await authApi.me();
      setUser(res.data);
    } catch {
      removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email, password) => {
    const res = await authApi.login(email, password);
    setToken(res.data.token);
    setUser(res.data.user);
    return res;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore logout API errors
    } finally {
      removeToken();
      setUser(null);
      router.push("/");
    }
  };

  const isAuthenticated = !!user;

  const hasRole = (role) => {
    if (!user || !user.roles) return false;
    if (Array.isArray(role)) {
      return role.some((r) => user.roles.some((ur) => ur.name === r));
    }
    return user.roles.some((ur) => ur.name === role);
  };

  const isSuperAdmin = () => hasRole("platform_super_admin") || user?.is_super_admin;
  const isAgencyOwner = () => hasRole("agency_owner");

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated,
        hasRole,
        isSuperAdmin,
        isAgencyOwner,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
