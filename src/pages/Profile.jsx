import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { myFetch } from "../comm/myFetch";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  // Charger l'historique des achats
  useEffect(() => {
    async function loadTransactions() {
      try {
        const data = await myFetch("/api/my-transactions");
        setTransactions(data);
      } catch (err) {
        console.error("Erreur récupération transactions:", err);
      }
    }
    loadTransactions();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-white p-10 rounded-3xl shadow-xl border border-pink-200">

      {/* HEADER PROFIL */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-20 h-20 rounded-full bg-pink-200 flex items-center justify-center text-4xl">
          🌸
        </div>
        <div>
          <h1 className="text-4xl font-bold text-pink-700">Mon Profil</h1>
          <p className="text-gray-600 text-lg">Bienvenue, {user.nom_complet}</p>
        </div>
      </div>

      {/* Identité */}
      <div className="bg-pink-50 p-6 rounded-xl border border-pink-200 shadow-sm mb-10">
        <h2 className="text-2xl font-semibold text-pink-700 mb-3">Informations personnelles</h2>

        <p className="text-lg"><b>Nom complet :</b> {user.nom_complet}</p>
        <p className="text-lg"><b>Login :</b> {user.login}</p>
      </div>

      {/* Historique d'achats */}
      <h2 className="text-3xl font-bold text-pink-700 mb-4">Historique de mes achats 🛍️</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500 italic text-lg">
          Tu n’as encore rien acheté… mais ça va changer ✨😉
        </p>
      ) : (
        <div className="space-y-8">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-xl border border-pink-200 bg-pink-50 shadow-sm hover:shadow-md transition"
            >
              {/* Informations transaction */}
              <div className="flex justify-between items-center mb-3">
                <p className="text-gray-600 text-sm">
                  <b>Transaction :</b> #{t.id}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Date :</b> {new Date(t.date).toLocaleString()}
                </p>
              </div>

              {/* Total */}
              <p className="text-xl font-bold text-pink-700">
                Total payé : {t.total} €
              </p>

              {/* Bouquets */}
              <h4 className="text-lg font-semibold mt-3 mb-2 text-gray-800">
                Bouquets achetés :
              </h4>

              <ul className="ml-3 space-y-1">
                {t.Bouquets.map((b) => (
                  <li key={b.id} className="flex justify-between text-gray-700">
                    <span>{b.nom}</span>
                    <span>x{b.TransactionBouquet.quantite}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
