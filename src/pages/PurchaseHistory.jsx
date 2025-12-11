// src/pages/PurchaseHistory.jsx
import { useEffect, useState } from "react";
import { myFetch } from "../comm/myFetch";

export default function PurchaseHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await myFetch("/api/my-transactions", {
        method: "GET",
      });
      setTransactions(res);
    }
    load();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">

      <h2 className="text-3xl font-bold text-pink-600 mb-6">
        🧾 Historique de mes achats
      </h2>

      {transactions.length === 0 ? (
        <p className="text-gray-600">Aucun achat effectué pour le moment.</p>
      ) : (
        <div className="space-y-6">
          {transactions.map((t) => (
            <div key={t.id} className="border p-4 rounded shadow-sm">
              <h3 className="text-xl font-semibold text-pink-700">
                Transaction #{t.id}
              </h3>

              <p className="text-gray-500 text-sm">
                📅 Date : {new Date(t.date).toLocaleString()}
              </p>

              <p className="text-gray-700 font-semibold mt-2">Bouquets :</p>

              <ul className="ml-4 mt-1 space-y-1">
                {t.Bouquets.map((b) => (
                  <li key={b.id} className="text-gray-700">
                    • {b.nom} — x{b.TransactionBouquet.quantite}
                  </li>
                ))}
              </ul>

              <p className="text-right text-lg font-bold text-pink-600 mt-4">
                Total : {t.total} €
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
