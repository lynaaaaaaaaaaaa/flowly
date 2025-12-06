// src/comm/myFetch.js
import axios from "axios";
import { API_BASE_URL, USE_AXIOS } from "../config/appConfig";

// ⚠️ VERSION CORRIGÉE : ajoute withCredentials pour le JWT
export async function myFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  if (USE_AXIOS) {
    const method = options.method || "GET";
    const data = options.body ? JSON.parse(options.body) : null;

    const res = await axios({
      url,
      method,
      data,
      withCredentials: true, // 🔥 INDISPENSABLE pour envoyer le cookie JWT
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
    });

    return res.data;
  }

  // ------------------ VERSION fetch ------------------
  const res = await fetch(url, {
    ...options,
    credentials: "include", // 🔥 OBLIGATOIRE aussi pour fetch
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
  });

  return await res.json();
}
