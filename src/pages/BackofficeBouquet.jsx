// src/pages/BackofficeBouquet.jsx
import { useEffect, useState } from "react";
import { myFetch } from "../comm/myFetch";

export default function BackofficeBouquet() {
  const [loading, setLoading] = useState(true);
  const [fleurs, setFleurs] = useState([]);
  const [bouquet, setBouquet] = useState(null);

  const [info, setInfo] = useState({
    nom: "",
    descr: "",
    image: "",
    prix: 0,
  });

  const [newFlower, setNewFlower] = useState({
    FleurId: "",
    quantite: 1,
  });

  const [message, setMessage] = useState("");

  // Charger fleurs + état courant du bouquet
  useEffect(() => {
    async function init() {
      try {
        const fleursData = await myFetch("/api/fleurs");
        setFleurs(fleursData);

        const current = await myFetch("/api/backoffice/bouquet/current");

        if (current.exists) {
          setBouquet(current.data);
          setInfo({
            nom: current.data.nom,
            descr: current.data.descr,
            image: current.data.image,
            prix: current.data.prix || 0,
          });
        } else {
          const started = await myFetch("/api/backoffice/bouquet/start", {
            method: "POST",
            body: JSON.stringify({}),
          });
          setBouquet(started.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  async function saveInfo(e) {
    e.preventDefault();
    setMessage("");

    const res = await myFetch("/api/backoffice/bouquet/set-info", {
      method: "POST",
      body: JSON.stringify(info),
    });

    setBouquet(res.data);
    setMessage("Infos du bouquet enregistrées ✅");
  }

  // ⭐ Upload image corrigé
  async function uploadImage(file) {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:5000/api/backoffice/bouquet/upload-image", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (data.url) {
      setInfo((prev) => ({ ...prev, image: data.url }));
      setMessage("Image uploadée avec succès 📸");
    } else {
      setMessage("Erreur upload image ❌");
    }
  }

  async function addFlower(e) {
    e.preventDefault();
    setMessage("");

    if (!newFlower.FleurId) {
      setMessage("Choisis une fleur avant d'ajouter.");
      return;
    }

    const res = await myFetch("/api/backoffice/bouquet/add-flower", {
      method: "POST",
      body: JSON.stringify({
        FleurId: Number(newFlower.FleurId),
        quantite: Number(newFlower.quantite),
      }),
    });

    setBouquet(res.data);
    setNewFlower({ FleurId: "", quantite: 1 });
    setMessage("Fleur ajoutée à la composition 🌸");
  }

  async function removeFlower(index) {
    const res = await myFetch("/api/backoffice/bouquet/remove-flower", {
      method: "POST",
      body: JSON.stringify({ index }),
    });
    setBouquet(res.data);
  }

  async function finishBouquet() {
    setMessage("");

    const res = await myFetch("/api/backoffice/bouquet/finish", {
      method: "POST",
      body: JSON.stringify({}),
    });

    if (res.success) {
      setMessage("Bouquet créé avec succès 💐");
      setBouquet(null);
      setInfo({ nom: "", descr: "", image: "", prix: 0 });
    } else {
      setMessage("Erreur lors de la création ❌");
    }
  }

  if (loading) return <p className="p-10">Chargement backoffice...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        Backoffice – Création de bouquet 💼
      </h1>

      {message && (
        <p className="mb-4 text-sm text-center text-pink-700 font-semibold">
          {message}
        </p>
      )}

      {/* FORM INFOS BOUQUET */}
      <form onSubmit={saveInfo} className="space-y-4 mb-8">
        <div>
          <label className="block font-semibold mb-1">Nom du bouquet</label>
          <input
            className="w-full border rounded p-2"
            value={info.nom}
            onChange={(e) => setInfo({ ...info, nom: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="w-full border rounded p-2"
            value={info.descr}
            onChange={(e) => setInfo({ ...info, descr: e.target.value })}
          />
        </div>

        {/* ⭐ UPLOAD IMAGE */}
        <div>
          <label className="block font-semibold mb-1">Image du bouquet</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadImage(e.target.files[0])}
          />

          {info.image && (
            <img
              src={info.image}
              className="w-32 h-32 object-cover rounded mt-2 border"
              alt="Aperçu"
            />
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Prix (€)</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={info.prix}
            onChange={(e) => setInfo({ ...info, prix: Number(e.target.value) })}
          />
        </div>

        <button
          type="submit"
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Enregistrer les infos
        </button>
      </form>

      {/* COMPOSITION EN FLEURS */}
      <div className="border-t pt-6">
        <h2 className="text-2xl font-semibold text-pink-600 mb-4">
          Composition en fleurs 🌺
        </h2>

        <form onSubmit={addFlower} className="flex flex-wrap gap-4 items-end mb-6">
          <div className="flex-1 min-w-[150px]">
            <label className="block font-semibold mb-1">Fleur</label>
            <select
              className="w-full border rounded p-2"
              value={newFlower.FleurId}
              onChange={(e) =>
                setNewFlower({ ...newFlower, FleurId: e.target.value })
              }
            >
              <option value="">-- Choisir une fleur --</option>
              {fleurs.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nom} ({f.prix_unitaire}€)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Quantité</label>
            <input
              type="number"
              min={1}
              className="w-24 border rounded p-2"
              value={newFlower.quantite}
              onChange={(e) =>
                setNewFlower({
                  ...newFlower,
                  quantite: Number(e.target.value),
                })
              }
            />
          </div>

          <button
            type="submit"
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            Ajouter cette fleur
          </button>
        </form>

        {!bouquet || bouquet.fleurs.length === 0 ? (
          <p className="text-gray-500 text-sm">
            Aucune fleur ajoutée pour l’instant.
          </p>
        ) : (
          <ul className="space-y-2">
            {bouquet.fleurs.map((f, index) => (
              <li
                key={index}
                className="flex justify-between items-center border rounded p-2"
              >
                <span>
                  {f.nomFleur} – x{f.quantite}
                </span>
                <button
                  className="text-red-500 text-sm"
                  type="button"
                  onClick={() => removeFlower(index)}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* FINALISER */}
      <div className="mt-8 text-right">
        <button
          onClick={finishBouquet}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Finaliser le bouquet ✅
        </button>
      </div>
    </div>
  );
}
