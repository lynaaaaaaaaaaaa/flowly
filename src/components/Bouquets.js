// src/components/Bouquets.js
import React from "react";
import Bouquet from "./Bouquet";

function Bouquets({ bouquets, onLike }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
      {bouquets.length === 0 ? (
        <p className="text-center text-gray-600 w-full">
          Aucun bouquet trouvé.
        </p>
      ) : (
        bouquets.map((bouquet) => (
          <Bouquet key={bouquet.id} bouquet={bouquet} onLike={onLike} />
        ))
      )}
    </div>
  );
}

export default Bouquets;
