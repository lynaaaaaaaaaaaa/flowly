import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ login: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(form.login, form.password);
    if (ok) navigate("/");
    else setError("Login ou mot de passe incorrect");
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-2xl text-center font-bold text-pink-600 mb-6">
        Se connecter
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full p-3 border rounded"
          placeholder="Login"
          value={form.login}
          onChange={(e) => setForm({ ...form, login: e.target.value })}
        />

        <input
          type="password"
          className="w-full p-3 border rounded"
          placeholder="Mot de passe"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-pink-600 text-white py-2 rounded">
          Connexion
        </button>
      </form>
    </div>
  );
}

export default Login;
