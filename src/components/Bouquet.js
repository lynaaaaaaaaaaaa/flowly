// src/components/Bouquet.js
import React from "react";
import ButtonBuy from "./ButtonBuy";

function Bouquet({ bouquet, onLike }) {
  const flowers = bouquet.flowers ?? bouquet.Fleurs ?? [];

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden relative">
      <img
        src={bouquet.image}
        alt={bouquet.nom}
        className="w-full h-52 object-cover"
      />

      {/* Bouton Like */}
      <button
  onClick={() => onLike(bouquet.id)}
  disabled={bouquet.liked}
  className={`absolute top-3 right-3 text-2xl ${
    bouquet.liked ? "text-red-500" : "text-gray-400"
  }`}
>
  {bouquet.liked ? "❤️" : "🤍"}
</button>


      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{bouquet.nom}</h3>
        <p className="text-gray-600 text-sm mb-2">{bouquet.descr}</p>

        <p className="text-pink-600 font-bold text-lg mb-3">
          Prix final : {bouquet.prix} €
        </p>

        <h4 className="font-semibold text-gray-700 mb-2">Composition :</h4>

        {flowers.length === 0 ? (
          <p className="text-gray-500 text-sm">Non renseignée.</p>
        ) : (
          <ul className="text-sm text-gray-700 space-y-1">
            {flowers.map((f) => (
              <li key={f.id} className="flex justify-between">
                <span>
                  {f.nom} <span className="text-gray-400">x{f.BouquetFleur?.quantite}</span>
                </span>
                <span className="text-gray-500 text-xs">{f.prix_unitaire} €</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-between items-center mt-4">
          <ButtonBuy />
          <span className="text-gray-600 text-sm">❤️ {bouquet.likes}</span>
        </div>
      </div>
    </div>
  );
}

export default Bouquet;
