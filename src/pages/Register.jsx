import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    login: "",
    password: "",
    nom_complet: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ok = await register(form.login, form.password, form.nom_complet);
    if (ok) navigate("/login");
    else setError("Login déjà utilisé");
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-2xl text-center font-bold text-pink-600 mb-6">
        Créer un compte
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full p-3 border rounded"
          placeholder="Nom complet"
          value={form.nom_complet}
          onChange={(e) =>
            setForm({ ...form, nom_complet: e.target.value })
          }
        />

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
          Créer le compte
        </button>
      </form>
    </div>
  );
}

export default Register;
