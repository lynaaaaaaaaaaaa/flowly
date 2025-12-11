import React, { useState, useEffect, useContext } from "react";
import Bouquets from "../components/Bouquets";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { myFetch } from "../comm/myFetch";

function BouquetsPage() {
  const [bouquets, setBouquets] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/bouquets", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) =>
        setBouquets(
          data.map((b) => ({
            ...b,
            flowers: b.Fleurs ?? [],
          }))
        )
      )
      .catch((err) => console.error("Erreur chargement bouquets", err));
  }, []);

  const handleLike = async (id) => {
    if (!user) {
      alert("Tu dois être connectée pour liker 🌸");
      navigate("/login");
      return;
    }

    const data = await myFetch("/api/like", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    setBouquets((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              liked: data.liked,
              likes: data.likes,
            }
          : b
      )
    );
  };

  const handleDelete = async (id) => {
    if (!user || user.role !== "employe") {
      alert("Seul un employé peut supprimer un bouquet.");
      return;
    }

    const ok = window.confirm("Supprimer ce bouquet ?");
    if (!ok) return;

    const res = await myFetch(`/api/bouquets/${id}`, {
      method: "DELETE",
    });

    if (res.success) {
      setBouquets((prev) => prev.filter((b) => b.id !== id));
    } else {
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <div className="bg-white/70 backdrop-blur-sm min-h-screen p-8">
        <h2 className="text-4xl text-center font-bold text-pink-700 mb-10">
          🌸 Nos Bouquets 🌸
        </h2>

        <Bouquets
          bouquets={bouquets}
          onLike={handleLike}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default BouquetsPage;
