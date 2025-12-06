import { useEffect } from "react";

function DataLoader() {
  useEffect(() => {
    const savedBouquets = localStorage.getItem("myBouquets");

    if (!savedBouquets) {
      // 🔗 Connexion au back-end
     fetch("/api/bouquets.json")
        .then((response) => {
          if (!response.ok) throw new Error("Erreur de chargement des bouquets");
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("myBouquets", JSON.stringify(data));
          console.log("✅ Bouquets enregistrés dans localStorage :", data);
        })
        .catch((error) => console.error("❌ Erreur :", error));
    } else {
      console.log("📦 Bouquets déjà présents dans localStorage");
    }
  }, []);

  return null; // Ne rend rien à l'écran
}

export default DataLoader;
