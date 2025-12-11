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
    role: "client",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ok = await register(
      form.login,
      form.password,
      form.nom_complet,
      form.role
    );

    if (ok) {
      alert("Compte créé !");
      navigate("/login");
    } else {
      setError("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-pink-600 mb-4">
        Créer un compte
      </h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="nom_complet"
          className="w-full p-3 border rounded"
          placeholder="Nom complet"
          value={form.nom_complet}
          onChange={handleChange}
        />

        <input
          name="login"
          className="w-full p-3 border rounded"
          placeholder="Login"
          value={form.login}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          className="w-full p-3 border rounded"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
        />

        <div>
          <label className="block mb-1 font-medium">Rôle :</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="client">Client</option>
            <option value="employe">Employé</option>
          </select>
        </div>

        <button className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
          S'inscrire
        </button>
      </form>
    </div>
  );
}

export default Register;
