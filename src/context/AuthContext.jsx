import { createContext, useEffect, useState } from "react";
import { myFetch } from "../comm/myFetch";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Vérifier si on est déjà connecté
  useEffect(() => {
    async function checkUser() {
      try {
        const me = await myFetch("/api/me", {
          method: "GET",
          credentials: "include",
        });
        setUser(me);
      } catch {
        setUser(null);
      }
    }
    checkUser();
  }, []);

  async function login(login, password) {
    try {
      const res = await myFetch("/api/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ login, password }),
      });

      if (!res.success) return false;

      const me = await myFetch("/api/me", {
        method: "GET",
        credentials: "include",
      });
      setUser(me);
      return true;
    } catch {
      return false;
    }
  }

  async function register(login, password, nom_complet, role) {
    try {
      const res = await myFetch("/api/register", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ login, password, nom_complet, role }),
      });

      return res.success;
    } catch {
      return false;
    }
  }

  async function logout() {
    try {
      await myFetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {}
    document.cookie = "token=; Max-Age=0; path=/;";
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
