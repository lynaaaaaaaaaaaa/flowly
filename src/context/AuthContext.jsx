import { createContext, useEffect, useState } from "react";
import { myFetch } from "../comm/myFetch";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Charger l'utilisateur si un token existe
  useEffect(() => {
    async function checkUser() {
      try {
        const me = await myFetch("/api/me");
        if (me?.id) setUser(me);
      } catch {
        setUser(null);
      }
    }
    checkUser();
  }, []);

  // -----------------------------
  // 🔐 LOGIN
  // -----------------------------
  async function login(login, password) {
    try {
      const res = await myFetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ login, password }),
      });

      if (!res.success) return false;

      const me = await myFetch("/api/me");
      setUser(me);
      return true;
    } catch {
      return false;
    }
  }

  // -----------------------------
  // 📝 REGISTER
  // -----------------------------
  async function register(login, password, nom_complet) {
    try {
      const res = await myFetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ login, password, nom_complet }),
      });

      return res.success;
    } catch {
      return false;
    }
  }

  // -----------------------------
  // 🔓 LOGOUT (avec backend + reset user)
  // -----------------------------
  async function logout() {
    try {
      await myFetch("/api/logout", { method: "POST" });
    } catch (e) {
      console.log("Erreur logout :", e);
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
